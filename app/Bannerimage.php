<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Bannerimage extends Model {

    protected $table = 'bannerimages';

    protected $primaryKey = 'bannerimage_id';

    public $timestamps = false;

    public static function boot()
    {
        static::creating(function($model)
        {
            $model->created_at = $model->freshTimestamp();
        });
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['facebookphoto_id', 'bannerimage_uniqueid', 'user_id',];

    public function projects()
    {
        return $this->belongsToMany('App\Project')->withPivot('bannerheadline_id', 'bannerheadline_style')->withTimestamps();
    }

    public function users()
    {
        return $this->belongsTo('App\User');
    }

}
