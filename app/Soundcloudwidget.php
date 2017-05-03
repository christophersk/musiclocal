<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Soundcloudwidget extends Model
{
    protected $table = 'soundcloudwidgets';

    protected $primaryKey = 'soundcloudwidget_id';

    protected $fillable = ['soundcloudwidget_path', 'soundcloudwidget_script', 'project_id'];

    public function setSoundcloudwidgetScriptAttribute($value)
    {
        $this->attributes['soundcloudwidget_script'] = trim($value) !== '' ? $value : null;
    }
}
