<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model {

    protected $table = 'locations';

    protected $primaryKey = 'location_id';

    protected $guarded = ['location_name', 'location_state', 'location_url'];

    public function projects()
    {
        return $this->hasMany('App\Project');
    }

}
