<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Backgroundimage extends Model
{
    protected $table = 'backgroundimages';

    protected $primaryKey = 'backgroundimage_id';

    protected $fillable = ['backgroundimage_uniqueid', 'user_id'];

    public function projects()
    {
        return $this->belongsToMany('App\Project')->withPivot('backgroundimage_project_id', 'bannerheadline_id', 'section_id', 'bannerheadline_style', 'align_horizontal', 'align_vertical', 'cover_active')->withTimestamps();
    }

    public function users()
    {
        return $this->belongsTo('App\User');
    }
}
