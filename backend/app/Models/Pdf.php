<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pdf extends Model
{
    use HasFactory;

    protected $fillable = [
        'userid',
        'ip',
        'url',
        'title',
        'lang',
        'theme',
        'links',
        'images',
        'code',
        'explored',
        'sections',
        'infobox',
        'pagination',
        'toc',
    ];
}
