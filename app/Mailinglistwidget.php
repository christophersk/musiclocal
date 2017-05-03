<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mailinglistwidget extends Model
{
    protected $table = 'mailinglistwidgets';

    protected $primaryKey = 'mailinglistwidget_id';

    protected $fillable = ['mailinglistwidget_script', 'project_id'];

        public function setMailinglistwidgetScriptAttribute($value)
    {
        $this->attributes['mailinglistwidget_script'] = trim($value) !== '' ? $value : null;
    }
}
