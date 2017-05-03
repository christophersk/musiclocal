<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customdomain extends Model
{
    protected $table = 'customdomains';

    protected $primaryKey = 'customdomain_id';

    protected $fillable = ['customdomain_url', 'project_id'];
}
