<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Photoalbum extends Model {

    protected $table = 'photoalbums';

    protected $primaryKey = 'photoalbum_id';

    protected $fillable = ['photoalbum_name', 'user_id', 'photoalbum_active'];

    public function facebookphotos()
    {
        return $this->belongsToMany('App\Facebookphoto')->withTimestamps();
    }

    public function projects()
    {
        return $this->belongsToMany('App\Project');
    }

}
