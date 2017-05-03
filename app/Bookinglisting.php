<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookinglisting extends Model
{
    protected $table = 'bookinglistings';

    protected $primaryKey = 'bookinglisting_id';

    protected $fillable = ['bookinglisting_title', 'bookinglisting_content', 'user_id'];

    public function projects()
    {
        return $this->belongsToMany('App\Projects');
    }

    public function users()
    {
        return $this->belongsTo('App\User');
    }

    public function youtubevideos()
    {
        return $this->belongsToMany('App\Youtubevideo');
    }

}