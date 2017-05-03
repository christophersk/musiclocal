<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reverbnationwidget extends Model
{
    protected $table = 'reverbnationwidgets';

    protected $primaryKey = 'reverbnationwidget_id';

    protected $fillable = ['reverbnationwidget_path', 'reverbnationwidget_script', 'project_id'];

        public function setReverbnationwidgetScriptAttribute($value)
    {
        $this->attributes['reverbnationwidget_script'] = trim($value) !== '' ? $value : null;
    }
}
