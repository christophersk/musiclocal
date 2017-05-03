<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bannerheadline extends Model
{
    protected $table = 'bannerheadlines';

    protected $primaryKey = 'bannerheadline_id';

    protected $fillable = ['user_id', 'bannerheadline_h1', 'bannerheadline_h2', 'bannerheadline_h3', 'bannerheadline_h3link'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
