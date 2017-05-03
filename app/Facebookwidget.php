<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Facebookwidget extends Model {

    protected $table = 'facebookwidgets';

    protected $primaryKey = 'facebookwidget_id';

    protected $fillable = ['facebookwidget_path', 'project_id'];

}
