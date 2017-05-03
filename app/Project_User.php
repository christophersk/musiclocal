<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project_User extends Model {

    protected $table = 'project_user';

    protected $primaryKey = 'project_user_id';

    protected $fillable = ['user_id', 'project_id', 'project_user_permission'];

    use SoftDeletes;

    protected $dates = ['deleted_at'];

}
