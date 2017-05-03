<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Instagramwidget extends Model
{
    protected $table = 'instagramwidgets';

    protected $primaryKey = 'instagramwidget_id';

    protected $fillable = ['instagramwidget_path', 'instagramwidget_script', 'project_id'];

    public function setInstagramwidgetScriptAttribute($value)
    {
        $this->attributes['instagramwidget_script'] = trim($value) !== '' ? $value : null;
    }
}
