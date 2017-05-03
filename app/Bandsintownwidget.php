<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Bandsintownwidget extends Model {

    protected $table = 'bandsintownwidgets';

    protected $primaryKey = 'bandsintownwidget_id';

    protected $fillable = ['bandsintownwidget_artistname', 'project_id'];

}