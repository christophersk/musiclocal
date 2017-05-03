<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use SammyK\LaravelFacebookSdk\SyncableGraphNodeTrait;

class Facebookphoto extends Model {

    use SyncableGraphNodeTrait;

    protected static $graph_node_field_aliases = [
        'id' => 'facebookphoto_identifier'
        //'picture.url' => 'facebook_picture_url'
        //'facebook_access_token' => 'access_token'
    ];

    protected $table = 'facebookphotos';

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $primaryKey = 'facebookphoto_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['facebookphoto_identifier', 'path0', 'path1', 'path2', 'path3', 'path4', 'path5', 'path6', 'picture', 'source', 'from_name', 'from_id', 'fb_created_time'];

    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

}
