<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Twitterwidget extends Model {

    protected $table = 'twitterwidgets';

    protected $primaryKey = 'twitterwidget_id';

    protected $fillable = ['twitterwidget_path', 'project_id'];

}
