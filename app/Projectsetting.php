<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Projectsetting extends Model
{
    protected $table = 'projectsettings';

    protected $primaryKey = 'projectsetting_id';

    protected $fillable = [
        'project_id',
        'about_active',
        'tour_active',
        'video_active',
        'social_active',
        'audio_active',
        'images_active',
        'contact_active',
        'lessons_active',
        'tourwidget_selection',
        'custom_domain'
    ];

    public function project()
    {
        return $this->belongsTo('App\Project');
    }
}
