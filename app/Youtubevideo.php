<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Youtubevideo extends Model
{
    protected $table = 'youtubevideos';

    protected $primaryKey = 'youtubevideo_id';

    protected $fillable = ['youtubevideo_identifier', 'user_id'];

    public function Users()

    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    public function Projects()

    {
        return $this->belongsToMany('App\Project')->withTimestamps();
    }

    public function bookinglistings()
    {
        return $this->belongsToMany('App\Bookinglisting')->withTimestamps();
    }

}