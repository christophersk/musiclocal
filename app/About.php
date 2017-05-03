<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class About extends Model {

    protected $table = 'abouts';

    protected $primaryKey = 'about_id';

    protected $fillable = ['about_content', 'project_id'];

}
