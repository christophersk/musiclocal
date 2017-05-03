<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contacts';

    protected $primaryKey = 'contact_id';

    protected $fillable = ['contact_email', 'project_id'];


    public function project()
    {
        return $this->belongsTo('App\Project');
    }
}
