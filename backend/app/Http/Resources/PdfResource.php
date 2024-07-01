<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PdfResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userid' => $this->userid,
            'ip' => $this->ip,
            'url' => $this->url,
            'title' => $this->title,
            'lang' => $this->lang,
            'themes' => new ThemeResource($this->themes),
            'links' => $this->links,
            'images' => $this->images,
            'code' => $this->code,
            'explored' => $this->explored,
            'sections' => $this->sections,
            'infobox' => $this->infobox,
            'pagination' => $this->pagination,
            'toc' => $this->toc,
            'created_at' => \Carbon\Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->timestamp,
        ];
    }
}
