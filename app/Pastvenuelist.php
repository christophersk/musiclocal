<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pastvenuelist extends Model
{
    protected $table = 'pastvenuelists';

    protected $primaryKey = 'pastvenuelist_id';

    protected $fillable = ['pastvenuelist_content', 'project_id'];
}
