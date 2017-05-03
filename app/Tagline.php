<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tagline extends Model
{
    protected $table = 'taglines';

    protected $primaryKey = 'tagline_id';

    protected $fillable = ['tagline_content', 'project_id'];
}
