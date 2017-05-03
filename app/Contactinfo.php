<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Contactinfo extends Model {

    protected $table = 'contactinfo';

    protected $primaryKey = 'contactinfo_id';

    protected $fillable = ['contactinfo_email', 'project_id'];

    public function project()
    {
        return $this->belongsTo('App\Project');
    }

}
