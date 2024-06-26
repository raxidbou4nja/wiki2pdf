<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pdf;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Drnxloc\LaravelHtmlDom\HtmlDomParser;
use mikehaertl\wkhtmlto\Pdf as converter;
class PdfController extends Controller
{

    public function __construct()
    {
        $this->wk_binary = "C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf";
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(cr $cr)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cr $cr)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, cr $cr)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cr $cr)
    {
        //
    }

    // checkUrl
    public function checkUrl(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|min:10|max:80',
        ]);

        if (!$validator->passes()) 
        {
            $result['error'] = "YOU HAVE AN ERROR";
            
        }

        if (strpos($request->input('url'), '.wikipedia.org/wiki/') == 0 ) 
        { 
           $result['error'] = "Please Enter A Wikipedia Page Url";
            return response()->json($result);
        }

        $url =  str_replace('wikipedia.org/wiki/','wikipedia.org/api/rest_v1/page/summary/',$request->input('url')).'?redirect=true';

        $options  = array('http' => array('user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0'));
        $context  = stream_context_create($options);
        $content = @file_get_contents("$url", false, $context);

        if ($content === false) 
        {
            $result['error'] = "Page Not Found OR UnAvailable";
            return response()->json($result);
        }

        $json_content = json_decode($content);

        $image = @$json_content->thumbnail->source;
        $pageId = $json_content->pageid;
        $title = $json_content->title;
        $extract = $json_content->extract;
        $description = @$json_content->description;
        $mobile_url = $json_content->content_urls->mobile->page;

        $lang = preg_replace('/https:\/\/(.*?).m.wikipedia.org\/wiki\/(.*)/', "$1", $mobile_url);


        return response()->json([
            'image' => $image,
            'pageId' => $pageId,
            'title' => $title,
            'extract' => $extract,
            'description' => $description,
            'mobile_url' => $mobile_url,
            'lang' => $lang
        ]);

    }


    public function getEditor(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pageId' => 'required|numeric',
            'lang' => 'required',
            'title' => 'required',
        ]);

        if (!$validator->passes()) 
        {
            return response()->json(['error'=> $validator->errors()->all()]);
        }

        $url = 'https://'.
                $request->lang.
                '.m.wikipedia.org/wiki/?curid='.
                $request->pageId;

        $pdf = new Pdf();

        $pdf->userid = auth()->user()->id ?? 0;
        $pdf->ip = request()->ip();
        $pdf->url = $url;
        $pdf->title = $request->title;
        $pdf->lang = $request->lang;
        $pdf->code = $request->pageId . now()->timestamp;
        $pdf->updated_at = Null;
        $pdf->save();


        $themes = Theme::select('images', 'title', 'id')->get();


        $apiUrl = "https://".$request->lang.".wikipedia.org/w/api.php?action=parse&format=json&prop=sections&pageid=".$request->pageId."";


        $options  = array('http' => array('user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0'));
        $context  = stream_context_create($options);
        $content = @file_get_contents($apiUrl, false, $context);


        if ($content === false) {
            $result['text'] = $apiUrl;
            $result['error'] = "YOU HAVE An ERROR";
            return json_encode($result);
        }


        $json_content = json_decode($content);

        $sections = $json_content->parse->sections;


        return response()->json([
            'code' => $pdf->code,
            'themes' => $themes,
            'toc' => $sections,
        ]);
    }


    public function generatePdf(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code'          => 'required|numeric',
            'theme'         => 'required|numeric|min:1',
            'links'         => 'required|boolean',
            'images'         => 'required|boolean',
            'showInfobox'       => 'required|boolean',
            'showPagination'    => 'required|boolean',
            'showToc'           => 'required|boolean',
        ]);

        if (!$validator->passes()) 
        {
            return response()->json(['error'=>$validator->errors()->all()]);
        }


        if (is_array($request->sections)) 
        {
            $sections = $request->sections;
        } 
        else {
            $sections = json_decode($request->sections);
        }


        $pdf = Pdf::where('code', $request->code)->first();

        if (!$pdf) 
        {
            return response()->json(['error' => 'Pdf Not Found']);
        }

        $pdf->theme = $request->theme;
        $pdf->links = $request->links;
        $pdf->images = $request->images;
        $pdf->sections = $sections;
        $pdf->infobox = $request->showInfobox;
        $pdf->pagination = $request->showPagination;
        $pdf->toc = $request->showToc;
        
        $pdf->save();

        

        return response()->json([
            'downloadUrl' => config('app.url') . "/download-pdf/". $pdf->code ."/". $pdf->updated_at->timestamp,
            'previewUrl' => config('app.url') . "/preview-pdf/". $pdf->code ."/". $pdf->updated_at->timestamp,
        ]);
    }

    public function wikipediaHandler($code)
    {
        if (!isset($code) OR !is_numeric($code)) 
        {
            return false;
        }

        $pdf = Pdf::where('code', $code)->get();

        if ($pdf->isEmpty()) 
        {
            return false;
        }

        $pdf = $pdf[0];


        $full_source_html =  HtmlDomParser::file_get_html( $pdf->url );

        $source_html = $full_source_html->find('body',0);


        @$source_html->find('header',0)->outertext = '';
        @$source_html->find('footer',0)->outertext = '';

        foreach ($source_html->find('script') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('noscript') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('nav') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('.mw-ui-icon') as $tag) {
            $tag->outertext = '';
        }

        foreach ($source_html->find('sup[class=reference]') as $tag) {
            $tag->outertext = '';
        }


        foreach ($source_html->find('table[role=presentation]') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('meta') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('.minerva__tab-container') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('div[role=note]') as $tag) {
            $tag->outertext = '';
        }

        foreach ($source_html->find('.mw-editsection') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('.printfooter') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('.side-box') as $tag) {
            $tag->outertext = '';
        }
        foreach ($source_html->find('.mw-cite-backlink') as $tag) {
            $tag->outertext = '';
        }



        if ($pdf->links == '0') 
        {
            $source_html = preg_replace('/<a[^>]*>(.*?)<\/a>/','<span>$1</span>',$source_html);
            $source_html = preg_replace('/<a[^>]*>/','<span>',$source_html);
        }


        if ($pdf->images == '1') 
        {
            $source_html = preg_replace('/data-src="\/\/(.*?)"/','> <img src="https://$1" class="thumbimage image-lazy-loaded"></span><span class="displaynone" ',$source_html);
            $source_html = str_ireplace('src="/api', 'src="https://en.wikipedia.org/api', $source_html);
        }
        else
        {
            $source_html = preg_replace('/<img[^>]*>/','<span $1></span>',$source_html);
        }

        $source_html = str_ireplace('href="/wiki/', 'href="https://'.$pdf->lang.'.wikipedia.org/wiki/', $source_html);
        $source_html = str_replace('data-class="thumbimage"', 'class="pthumbimage"', $source_html);
        $source_html = str_replace('mw-references-columns', '', $source_html);
        $source_html = preg_replace('/class="reflist4(.*?)>/','>',$source_html);

        $source_html = preg_replace('/class="reflist4(.*?)>/','>',$source_html);


        $source_html = preg_replace('/onclick="mfTempOpenSection\((.*?)\)"/','number="$1"',$source_html);

        $source_html = preg_replace('/<li class="toclevel-(.*?) tocsection-(.*?)">/i', '<li toc>', $source_html);
           

        if (!empty($pdf->sections)) 
        {

            $source_html = preg_replace('/<li toc>(.*?)<span class=\"tocnumber\">(.*?)<\/span>/i', "<li id=\"toc-order-$2\">$1<span class=\"tocnumber\">$2</span>", $source_html);



            $sections = json_decode($pdf->sections, true);


            $source_html = HtmlDomParser::str_get_html( $source_html );

            sort($sections);

            $toc_arr = array();
            $toc_ul = array();
            $toc_rep = array();

            $count = 0;
            foreach ($sections as $section) {

                $toc_arr[$count++] = "/<li><span><span class=\"tocnumber\">$section<\/span>(.*?)<\/li>/i";

                @$source_html->find('.mf-section-'.$section, 0)->outertext = '';
                
                @$source_html->find('.section-heading[number='.$section.']', 0)->outertext = '';

                @$source_html->find('#toc-order-'.$section, 0)->outertext = '';

                $section1 = $section+1;
                $toc_ul[$count++] = "/<li id=\"toc-order-$section\">(.*?)<span class=\"tocnumber\">$section<\/span>(.*?)<\/ul><\/li><li id=\"toc-order-$section1\">(.*?)<span class=\"tocnumber\">$section1<\/span>/i";
                $toc_rep[$count++] = "<li id=\"toc-order-$section1\"><span><span class=\"tocnumber\">$section1</span>";


            }

            $source_html = preg_replace($toc_ul, $toc_rep, $source_html);


            $toc_ord = array();
            $toc_num = array();
            $h2_ord = array();
            $h2_num = array();
            $toc_ord_ul = array();
            $toc_num_ul = array();

            preg_match_all('/<span class="tocnumber">(.*?)<\/span>/', $source_html, $matches);
            $count = 1;
            foreach ($matches[1] as $match) {
                if (strpos($match, '.') == 0) {
                    $countt = $count++;
                    $toc_ord[$countt] = "/<span class=\"tocnumber\">$match<\/span>/i";
                    $toc_num[$countt] = "<span class=\"tocnumber\">$countt</span>";

                    $toc_ord_ul[$countt] = "/<span class=\"tocnumber\">$match\.(.*?)<\/span>/i";
                    $toc_num_ul[$countt] = "<span class=\"tocnumber\">$countt.$1</span>";

                    $h2_ord[$countt] = "/<h2 class=\"section-heading\" number=\"$match\">/i";
                    $h2_num[$countt] = "<h2 class=\"section-heading\" number=\"$countt\">";
                }}



                $source_html =  preg_replace($toc_ord, $toc_num, $source_html);
                $source_html =  preg_replace($h2_ord, $h2_num, $source_html);
                $source_html =  preg_replace($toc_ord_ul, $toc_num_ul, $source_html);
            }



        $infobox = ($pdf->infobox == 0)? ".infobox {display: none !important;}" : "";

        $toc = ($pdf->toc == 0)? ".toc {display: none !important;}" : "";

            $title = $pdf->title .' - ' . config("app.url");

            $theme_css = Theme::find($pdf->theme);

            echo   '<!DOCTYPE html>
                        <html>
                        <head>
                        <meta charset="utf8">
                        <style>
                        .madeby{padding: 12px 8px;background: beige;border-left: 5px solid;margin: 9px;}.ambox{display: none !important;}.madeby strong{background: #00BCD4;padding: 2px 12px;border-radius: 50%;font-size: 160%;margin-right: 6px;}.madeby a {font-size: 130%;}
                        '. $theme_css->css . $infobox . $toc .'
                        </style>
                        <title>'.$pdf->title.'</title>
                        </head>
                    ';
            echo   $source_html;
            echo   '</html>';

    }




    public function downloadPdf($code, $timestamp)
    {

        $pdf = Pdf::where('code', $code)->get();

        if ($pdf->isEmpty()) 
        {
            return response()->json(['error' => 'Pdf Not Found']);
        }


        $pdf = $pdf[0];

        $title = $pdf->title .' - ' . config("app.name");
        
        ob_start();
        $this->wikipediaHandler($pdf->code);
        $html = ob_get_clean();

        $options =  array();
        $options[0] = 'disable-smart-shrinking';
        $options['page-size'] = 'A4';
        $options['title'] = $title;

        if ($pdf->pagination == 1) {
            $options['footer-center']  = 'Page [page] of [toPage]';
        }

        $converter = new converter($options);
        $converter->addPage($html);
        $converter->binary = $this->wk_binary;


        if (!$converter->send()) {
            $error = $converter->getError();
        }
    }


}
