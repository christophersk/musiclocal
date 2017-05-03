<?php namespace App;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model {

	protected $table = 'projects';

    //use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $primaryKey = 'project_id';

    protected $fillable = ['project_name', 'project_url', 'location_id', 'project_type', 'project_active', 'project_deleted', 'bandsintownwidget_active', 'project_layout'];

    protected $hidden = ['project_active', 'project_deleted'];

    public function users()
    {
        return $this->belongsToMany('App\User')->withPivot('project_user_permission')->withTimestamps();
    }

    public function youtubevideos()
    {
        return $this->belongsToMany('App\Youtubevideo')->withTimestamps();
    }

    public function bannerimages()
    {
        return $this->belongsToMany('App\Bannerimage')->withPivot('bannerheadline_id', 'bannerheadline_style')->withTimestamps();
    }

    public function backgroundimages()
    {
        return $this->belongsToMany('App\Backgroundimage')->withPivot('backgroundimage_project_id', 'bannerheadline_id', 'section_id', 'bannerheadline_style', 'align_vertical', 'align_horizontal', 'cover_active')->withTimestamps();
    }

    public function events()
    {
        return $this->belongsToMany('App\Event');
    }

    public function photoalbums()
    {
        return $this->belongsToMany('App\Photoalbum');
    }

    public function projectsettings()
    {
        return $this->hasOne('App\Projectsetting');
    }

    public function about()
    {
        return $this->hasOne('App\About');
    }

    public function facebookwidget()
    {
        return $this->hasOne('App\Facebookwidget');
    }

    public function twitterwidget()
    {
        return $this->hasOne('App\Twitterwidget');
    }

    public function youtubewidget()
    {
        return $this->hasOne('App\Youtubewidget');
    }

    public function instagramwidget()
    {
        return $this->hasOne('App\Instagramwidget');
    }

    public function soundcloudwidget()
    {
        return $this->hasOne('App\Soundcloudwidget');
    }

    public function reverbnationwidget()
    {
        return $this->hasOne('App\Reverbnationwidget');
    }

    public function mailinglistwidget()
    {
        return $this->hasOne('App\Mailinglistwidget');
    }

    public function bandsintownwidget()
    {
        return $this->hasOne('App\Bandsintownwidget');
    }

    public function contactinfo()
    {
        return $this->hasOne('App\Contactinfo');
    }

    public function location()
    {
        return $this->hasOne('App\Location');
    }

    public function tagline()
    {
        return $this->hasOne('App\Tagline');
    }

    public function endorsements()
    {
        return $this->hasMany('App\Endorsement');
    }

    public function pastvenuelist()
    {
        return $this->hasOne('App\Pastvenuelist');
    }

    public function customdomain()
    {
        return $this->hasOne('App\Customdomain');
    }

    public function contacts()
    {
        return $this->hasMany('App\Contact');
    }

    public function bookinglistings()
    {
        return $this->belongsToMany('App\Bookinglisting');
    }

    public function parentprojects()
    {
        return $this->belongsToMany('App\Project', 'project_project', 'child_project_id', 'parent_project_id');
    }

    public function childprojects()
    {
        return $this->belongsToMany('App\Project', 'project_project', 'parent_project_id', 'child_project_id');
    }

}
