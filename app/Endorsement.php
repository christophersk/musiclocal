<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Endorsement extends Model
{
    protected $table = 'endorsements';

    protected $primaryKey = 'endorsement_id';

    protected $fillable = ['endorsement_content', 'project_id', 'endorsement_endorser', 'endorsement_endorserbusiness'];
}
