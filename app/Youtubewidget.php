<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Youtubewidget extends Model
{
    protected $table = 'youtubewidgets';

    protected $primaryKey = 'youtubewidget_id';

    protected $fillable = ['youtubewidget_path', 'project_id'];
}
