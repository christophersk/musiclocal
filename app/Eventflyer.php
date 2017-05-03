<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Eventflyer extends Model {

	protected $table = 'eventflyers';

    protected $primaryKey = 'eventflyer_id';

    public $timestamps = false;

    public static function boot()
    {
        static::creating(function($model)
        {
            $model->created_at = $model->freshTimestamp();
        });
    }

    protected $fillable = ['eventflyer_start', 'adjust_id', 'user_id'];

/*
    public function projects()
    {
        return $this->belongsToMany('App\Project')->withTimestamps();
    }
*/

    public function users()
    {
        return $this->belongsTo('App\User');
    }

}
