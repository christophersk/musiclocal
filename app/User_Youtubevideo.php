<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User_Youtubevideo extends Model {

    protected $table = 'user_youtubevideo';

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $primaryKey = 'user_youtubevideo_id';

    protected $fillable = ['user_id', 'youtubevideo_id'];

}
