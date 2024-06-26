<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pdf;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PdfController extends Controller
{
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


    // getEditor
    public function getEditor(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pageId' => 'required|numeric',
            'lang' => 'required',
            'title' => 'required',
        ]);

        /// CHECK IF URL IS INPUTED AND IS MORE THAN TEN CHARS.
        if (!$validator->passes()) 
        {
            $result['error'] = "AN ERROR ACCURED! PLEASE TRY LATER";
            return json_encode($result); // ERROR Return
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


    // generatePdf
    public function generatePdf(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code'          => 'required|numeric',
            'theme'         => 'required|numeric|min:1',
            'links'         => 'required|boolean',
            'images'         => 'required|boolean',
            // 'infobox'       => 'required|boolean',
            // 'pagination'    => 'required|boolean',
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
        
        $pdf->save();

        

        return response()->json([
            'downloadUrl' => config('app.url') . "/download-pdf/". $pdf->code ."/". $pdf->updated_at->timestamp,
            'previewUrl' => config('app.url') . "/preview-pdf/". $pdf->code ."/". $pdf->updated_at->timestamp,
        ]);
    }
}
