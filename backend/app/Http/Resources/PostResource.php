<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'title' => $this->title,
            'content' => $this->content ?? null,
            'published' => $this->published,
            'image' => public_path('images/'.$this->image) ?? null,
            'created_at' => \Carbon\Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
        ];
    }
}
