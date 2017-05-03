<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facebookphoto_User extends Model {

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $table = 'facebookphoto_user';

    protected $primaryKey = 'facebookphoto_user_id';

    protected $fillable = ['user_id', 'facebookphoto_id'];

}
