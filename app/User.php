<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use SammyK\LaravelFacebookSdk\SyncableGraphNodeTrait;
use Illuminate\Database\Eloquent\SoftDeletes;


//class User extends Model implements AuthenticatableContract, CanResetPasswordContract {
class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use SyncableGraphNodeTrait;

    protected static $graph_node_field_aliases = [
        'id' => 'facebook_user_id',
        'first_name' => 'user_first_name',
        'last_name' => 'user_last_name',
        'email' => 'email',
        'picture.url' => 'facebook_picture_url',
        //'access_token' => 'remember_token'
    ];

	use Authenticatable, CanResetPassword;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

    use SoftDeletes;

    protected $dates = ['deleted_at', 'created_at', 'updated_at'];

    protected $primaryKey = 'user_id';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */

    //protected $maps = ['user_email' => 'email'];

	protected $fillable = ['user_first_name', 'user_last_name', 'email', 'password', 'facebook_user_id', 'remember_token', 'facebook_picture_url', 'access_token'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['facebook_user_id'];


    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }

    public function projects()
    {
        return $this->belongsToMany('App\Project')->withPivot('project_user_permission')->withTimestamps();
    }

    public function projectsusers()
    {
        return $this->hasManyThrough('App\User', 'App\Project', 'user_id', 'project_id');
    }

    public function facebookphotos()
    {
        return $this->belongsToMany('App\Facebookphoto')->withTimestamps();
    }

    public function youtubevideos()
    {
        return $this->belongsToMany('App\Youtubevideo')->withTimestamps();
    }

    public function bannerimages()
    {
        return $this->hasMany('App\Bannerimage');
    }

    public function bannerheadlines()
    {
        return $this->hasMany('App\Bannerheadline');
    }

    public function project_bannerheadlines()
    {
        return $this->hasManyThrough('App\Bannerheadline', 'App\Project');
    }

    public function backgroundimages()
    {
        return $this->hasMany('App\Backgroundimage');
    }

    public function events()
    {
        return $this->belongsToMany('App\Event');
    }

    public function eventflyers()
    {
        return $this->belongsToMany('App\Eventflyer');
    }

    public function bookinglistings()
    {
        return $this->hasMany('App\Bookinglisting');
    }
}
