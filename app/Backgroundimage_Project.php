<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Backgroundimage_Project extends Model
{
    protected $table = 'backgroundimage_project';

    protected $primaryKey = 'backgroundimage_project_id';

    protected $fillable = ['backgroundimage_id', 'section_id', 'project_id', 'bannerheadline_id', 'bannerheadline_style', 'align_horizontal', 'align_vertical', 'cover_active'];
}


//note: this model is for filling additional fields AFTER the pivot table entry has been created.