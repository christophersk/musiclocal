<?php namespace App\Http\Controllers;

use App\Bandsintownwidget;
use App\Bannerheadline;
use App\Bannerimage;
use App\Event;
use App\Facebookwidget;
use App\Instagramwidget;
use App\Location;
use App\Mailinglistwidget;
use App\Photoalbum;
use App\Projectsetting;
use App\Reverbnationwidget;
use App\Soundcloudwidget;
use App\Tagline;
use App\Twitterwidget;
use App\User;
use App\Facebookphoto;
use App\Facebookphoto_User;
use App\Http\Requests;
use App\Project;
use App\Project_User;
use App\User_Youtubevideo;
use App\Youtubevideo;
use App\About;
use App\Contactinfo;
use App\Bookinglisting;
use App\Backgroundimage;
use App\Backgroundimage_Project;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;
use SammyK\FacebookQueryBuilder\FQB;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Facebook;
use Facebook\FacebookRequest;
use Facebook\FacebookBatchRequest;
use Facebook\FacebookApp;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Response;
use Imagick;
use ImagickDraw;
use ImagickPixel;

class UsersController extends Controller {

    public function user_home()
    {
        $user = Auth::user();

        return view('react.user_home', compact('user'));
    }

    public function get_userinfo()
    {
        $user = Auth::user();
        $user_first_name = $user->user_first_name;
        $user_last_name = $user->user_last_name;
        $email = $user->email;
        $user_location = $user->location;

        $userinfoarray = [
            'user_first_name' => $user_first_name,
            'user_last_name' => $user_last_name,
            //'email' => $email,
            'user_location' => $user_location
        ];
        $objectstring = json_encode($userinfoarray);
        return $objectstring;
    }

    public function set_userinfo(Requests\UpdateUserInfo $request)
    {
        $user = Auth::user();
        $requestarray = $request->only('user_first_name', 'user_last_name', 'email', 'user_location');
        extract($requestarray, EXTR_OVERWRITE);

        $user->user_first_name = $user_first_name;
        $user->user_last_name = $user_last_name;
        //$user->email = $email;
        //$user->user_location = $user_location; //probably easiest just to post location ID back from client?
        $user->save();

        return 'User information updated successfully.';
    }

    public function user_projects_list()
    {
        $projects = Auth::user()->projects;

        $projectarray = [];
        foreach ($projects as $projecttolist){
            $projecttolistname = $projecttolist->project_name;
            $projecttolisturl = $projecttolist->project_url;
            $projecttolistid = $projecttolist->project_id;
            $thisbackgroundimage = $projecttolist->backgroundimages()->value('backgroundimage_uniqueid');

            if ($thisbackgroundimage == null) { $backgroundimage_filename = null; }
            else { $backgroundimage_filename = md5($thisbackgroundimage); }
            //dd($thisbannerimage);
            //$thisuuid = $thisbannerimage->bannerimage_uniqueid;
            //$bannerfilename = md5($thisuuid);
            array_push($projectarray, ['project_name' => $projecttolistname, 'project_url' => $projecttolisturl, 'project_id' => $projecttolistid, 'backgroundimage_filename' => $backgroundimage_filename]);
        }
        /*
        $string = '';
        $projectdataarray = [];
        foreach ($projectarray as $key => $projectentry){
            extract($projectentry, EXTR_OVERWRITE);
            $line = '<li><a class="manageprojectlink" data-projectid="' . $projecttolistid . '" href="' . url('user/projects/' . $projecttolisturl) . '" style="padding-left:10px;">' . $projecttolistname . '</a></li>';
            $object = 'project_id:' . $projecttolistid . ', project_url:' . $projecttolisturl . ', projectname:' . $projecttolistname . '';
            $string .= $line;
            //$objectstringtemp .= $object;
            array_push($projectdataarray, ['project_id' => $projecttolistid, 'project_url' => $projecttolisturl, 'project_name' => $projecttolistname]);
        }
        //dd($projectdataarray);
        */
        $objectstring = json_encode($projectarray);
        return $objectstring;
    }

    public function user_projects()
    {
        $user = Auth::user();
        //$user = User::findOrFail($id);
        return view('pages.user_projects', compact('user', 'project'));
    }

    public function user_projects_create()
    {
        $user = Auth::user();
        //$user = User::findOrFail($id);
        return view('pages.user_projects_create', compact('user'));
    }

    public function user_projects_delete(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id');
        extract($requestarray, EXTR_OVERWRITE);
        $user = Auth::user();
        //dd($project_id);
        $project = Project::find($project_id);
        //dd($project);
        $project_user = Project_User::whereRaw('user_id = ' . $user->user_id . ' and project_id = ' . $project_id . '')->get();
        foreach ($project_user as $project_user_1){
            $projectuserpermissionis = ($project_user_1->project_user_permission);
                    }
        if ($projectuserpermissionis == 7){
            $project->delete();
            return 'success';
        }
        else {
            return 'User is not authorized to delete project.';
        }
    }

    public function user_project_active_status(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id');
        extract($requestarray, EXTR_OVERWRITE);
        //$user = Auth::user();
        //dd($project_id);
        $project = Project::find($project_id);
        //dd($project);
        $projectactivestatus = $project->project_active;
        //dd($projectactivestatus);
            return $projectactivestatus;
    }

    public function user_project_projectsection_active_status(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id', 'projectsection_id');
        extract($requestarray, EXTR_OVERWRITE);

        if ($projectsection_id == 1) {
            $projectsettingvalue = Project::find($project_id)->projectsettings->about_active;
        }
        else if ($projectsection_id == 2) {
            $projectsettingvalue = Project::find($project_id)->projectsettings->tour_active;
        }
        else if ($projectsection_id == 3) {
            $projectsettingvalue = Project::find($project_id)->projectsettings->video_active;
        }
        else if ($projectsection_id == 4) {
            $projectsettingvalue = Project::find($project_id)->projectsettings->audio_active;
        }
        else if ($projectsection_id == 5) {
            $projectsettingvalue = Project::find($project_id)->projectsettings->images_active;
        }
        else if ($projectsection_id == 6) {
            $projectsettingvalue = Project::find($project_id)->projectsettings->contact_active;
        }
        else if ($projectsection_id == 7) {
            $projectsettingvalue = Project::find($project_id)->projectsettings->social_active;
        }
        else {
            $projectsettingvalue = null;
        }
        return $projectsettingvalue;
    }

    public function user_project_projectsection_activate(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id', 'projectsection_id');
        extract($requestarray, EXTR_OVERWRITE);
        $user = Auth::user();

        foreach ($user->projects as $project) {
            if ($project->project_id == $project_id) {
                $permission = $project->pivot->project_user_permission;
            }
        }

        if ($permission == null) { abort(403, 'project setting not found.'); return; }
        else if ($permission < 6) { abort(403, 'you do not have permission to change this setting.'); return; }
        else {
            if ($projectsection_id == 1) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->about_active = 1;
                $projectsetting->save();
                return 'section activated.';
            }
            else if ($projectsection_id == 2) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->tour_active = 1;
                $projectsetting->save();
                return 'section activated.';
            }
            else if ($projectsection_id == 3) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->video_active = 1;
                $projectsetting->save();
                return 'section activated.';
            }
            else if ($projectsection_id == 4) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->audio_active = 1;
                $projectsetting->save();
                return 'section activated.';
            }
            else if ($projectsection_id == 5) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->images_active = 1;
                $projectsetting->save();
                return 'section activated.';
            }
            else if ($projectsection_id == 6) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->contact_active = 1;
                $projectsetting->save();
                return 'section activated.';
            }
            else if ($projectsection_id == 7) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->social_active = 1;
                $projectsetting->save();
                return 'section activated.';
            }
            else {
                abort(403, 'request could not be completed');
                return;
            }

        }

        abort(403, 'request could not be completed');
        return;

    }

    public function user_project_projectsection_deactivate(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id', 'projectsection_id');
        extract($requestarray, EXTR_OVERWRITE);
        $user = Auth::user();

        foreach ($user->projects as $project) {
            if ($project->project_id == $project_id) {
                $permission = $project->pivot->project_user_permission;
            }
        }

        if ($permission == null) { abort(403, 'project setting not found.'); return; }
        else if ($permission < 6) { abort(403, 'you do not have permission to change this setting.'); return; }
        else {
            if ($projectsection_id == 1) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->about_active = 0;
                $projectsetting->save();
                return 'section deactivated.';
            }
            else if ($projectsection_id == 2) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->tour_active = 0;
                $projectsetting->save();
                return 'section deactivated.';
            }
            else if ($projectsection_id == 3) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->video_active = 0;
                $projectsetting->save();
                return 'section deactivated.';
            }
            else if ($projectsection_id == 4) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->audio_active = 0;
                $projectsetting->save();
                return 'section deactivated.';
            }
            else if ($projectsection_id == 5) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->images_active = 0;
                $projectsetting->save();
                return 'section deactivated.';
            }
            else if ($projectsection_id == 6) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->contact_active = 0;
                $projectsetting->save();
                return 'section deactivated.';
            }
            else if ($projectsection_id == 7) {
                $projectsetting = Project::find($project_id)->projectsettings;
                $projectsetting->social_active = 0;
                $projectsetting->save();
                return 'section deactivated.';
            }
            else {
                abort(403, 'request could not be completed');
                return;
            }

        }

        abort(403, 'request could not be completed');
        return;

    }

    public function user_projects_deactivate(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id');
        extract($requestarray, EXTR_OVERWRITE);
        $user = Auth::user();
        //dd($project_id);
        $project = Project::find($project_id);
        //dd($project);
        $project_user = Project_User::whereRaw('user_id = ' . $user->user_id . ' and project_id = ' . $project_id . '')->get();
        foreach ($project_user as $project_user_1){
            $projectuserpermissionis = ($project_user_1->project_user_permission);
                    }
        if ($projectuserpermissionis == 7){
            $project->project_active = 0;
            $project->save();
            return 'success';
        }
        else {
            return 'User is not authorized to update project.';
        }
    }

    public function user_projects_activate(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id');
        extract($requestarray, EXTR_OVERWRITE);
        $user = Auth::user();
        //dd($project_id);
        $project = Project::find($project_id);
        //dd($project);
        $project_user = Project_User::whereRaw('user_id = ' . $user->user_id . ' and project_id = ' . $project_id . '')->get();
        foreach ($project_user as $project_user_1){
            $projectuserpermissionis = ($project_user_1->project_user_permission);
        }
        if ($projectuserpermissionis == 7){
            $project->project_active = 1;
            $project->save();
            return 'success';
        }
        else {
            return 'User is not authorized to update project.';
        }
    }

    public function user_projects_editproject($project_url)
    {
        //return $project_url;
        $user = Auth::user();

        $project = $user->projects()->where('project_url', $project_url)->first();
        //return $project;
        $thisprojectid = $project->project_id;

        return view('pages.user_projects_editproject', compact('user', 'project', 'thisprojectid'));
    }

    public function user_projects_social_get(Requests\UnrestrictedRequest $request)
    {
        $projectinfo = $request->only('project_id');
        extract($projectinfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);
        $facebookwidget = $project->facebookwidget;
        $twitterwidget = $project->twitterwidget;
        $instagramwidget = $project->instagramwidget;

        if ($facebookwidget === null){
            $facebookwidgetpath = '';
        }
        else {
        $facebookwidgetpath = $facebookwidget->facebookwidget_path;
        }

        if ($twitterwidget === null){
            $twitterwidgetpath = '';
        }
        else {
        $twitterwidgetpath = $twitterwidget->twitterwidget_path;
        }

        if ($instagramwidget === null){
            $instagramwidgetpath = '';
            $instagramwidgetscript = '';
        }
        else {
        $instagramwidgetpath = $instagramwidget->instagramwidget_path;
        $instagramwidgetscript = $instagramwidget->instagramwidget_script;
        }

        $socialarray = ['facebook' => $facebookwidgetpath, 'twitter' => $twitterwidgetpath, 'instagram' => $instagramwidgetpath, 'instagramscript' => $instagramwidgetscript];

        return json_encode($socialarray);

    }

    public function user_projects_audio_get(Requests\UnrestrictedRequest $request)
    {
        $projectinfo = $request->only('project_id');
        extract($projectinfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);
        $soundcloudwidget = $project->soundcloudwidget;

        if ($soundcloudwidget === null){
            $soundcloudwidgetpath = '';
            $soundcloudwidgetscript = '';
        }
        else {
        $soundcloudwidgetpath = $soundcloudwidget->soundcloudwidget_path;
        $soundcloudwidgetscript = $soundcloudwidget->soundcloudwidget_script;
        }

        $audioarray = ['soundcloudwidget_path' => $soundcloudwidgetpath, 'soundcloudwidget_script' => $soundcloudwidgetscript];

        return json_encode($audioarray);

    }

    public function user_schedule()
    {
        $user = Auth::user();
        //$user = User::findOrFail($id);
        return view('pages.user_schedule', compact('user', 'project'));
    }

    public function user_schedule_createevent(Requests\CreateEvent $request)
    {
        $eventinfo = $request->all();
        extract($eventinfo, EXTR_OVERWRITE);
        $user = Auth::user();

        $datetimeformatstring = 'j n Y g:i a';
        $datetimestartstring = $event_start_day . ' ' . $event_start_month . ' ' . $event_start_year . ' ' . $event_start_hour . ':' . $event_start_minute . ' ' . $event_start_ampm;
        $startdatetime = date_create_from_format($datetimeformatstring, $datetimestartstring);

        $datetimeendtring = $event_end_day . ' ' . $event_end_month . ' ' . $event_end_year . ' ' . $event_end_hour . ':' . $event_end_minute . ' ' . $event_end_ampm;        //dd($startdatetime);
        $enddatetime = date_create_from_format($datetimeformatstring, $datetimeendtring);

        $newevent = Event::create(['creator_user_id' => $user->user_id, 'event_name' => $event_name, 'event_location' => $event_location, 'event_city' => $event_city, 'event_state' => $event_state, 'event_zip' => $event_zip, 'event_start' => $startdatetime, 'event_end' => $enddatetime]);

        $invited_user_array = [];
        foreach ($eventinfo as $key => $val){
            if (str_contains($key, 'invited_user')){
                array_push($invited_user_array, $val);
            }
        }

        foreach ($invited_user_array as $key => $val){
            $newevent->users()->attach($val);
        }

        //only('event_name', 'event_location', 'event_city', 'event_state', 'event_zip', 'event_start', 'event_end', 'event_users', 'event_projects');


        //dd($eventinfo);
        //$user = User::findOrFail($id);
        return view('pages.user_schedule', compact('user', 'project'));
    }

    public function user_projects_about_get(Requests\UnrestrictedRequest $request){
        $projectinfo = $request->only('project_id');
        extract($projectinfo, EXTR_OVERWRITE);

        $user = Auth::user();
        $userid = $user->user_id;
        //return $userid;
        $about = Project::find($project_id)->about;

        if ($about === null){
            return json_encode(array('about_content' => ''));
        }
        return json_encode(array('about_content' => $about->about_content));
	}

    public function user_projects_about_change(Requests\UnrestrictedRequest $request){
        $aboutinfo = $request->only('project_id', 'about_content');
        extract($aboutinfo, EXTR_OVERWRITE);
        //return $about_content;
        $user = Auth::user();
        $userid = $user->user_id;

        $about = Project::find($project_id)->about;
        if ($about === null){
            $newabout = new About;
            $newabout->project_id = $project_id;
            $newabout->about_content = nl2br($about_content);
            $newabout->save();
        }
        else {
            $about->about_content = $about_content;
            $about->save();
        }

        return 'success';
	}

    public function user_photos(){
        $user = Auth::user();

        return view ('pages.user_photos', compact('user', 'project'));
    }

    public function user_photos_react(){
        $user = Auth::user();

        return view ('pages.user_photos_react_addalbum', compact('user'));
    }

    public function user_projects_videos_get(Requests\UnrestrictedRequest $request){
        $projectinfo = $request->only('projectid');
        extract($projectinfo, EXTR_OVERWRITE);

        $user = Auth::user();
        $userid = $user->user_id;
        //return $userid;
        $project = Project::find($projectid);
        //return $project;
        $projectvideos = $project->youtubevideos;
        //return $projectphotoalbums;
        //$photoalbums = Photoalbum::where('user_id', '=', $user->user_id )->get()->sortByDesc('photoalbum_id');

        $usercreatedvideos = $user->youtubevideos->sortByDesc('youtubevideo_id');
        //Youtubevideo::where('user_id', '=', $userid)->get()->sortByDesc('youtubevideo_id');

        $uniquevideos = $usercreatedvideos->diff($projectvideos);
        $videoarray = [];
        foreach ($uniquevideos as $key => $video){
            array_push($videoarray, ['youtubevideo_identifier' => $video->youtubevideo_identifier, 'youtubevideo_id' => $video->youtubevideo_id]);
        }
        //dd($bannerimagearray);

        $projectvideoarray = [];
        foreach ($projectvideos as $projectvideo){
            array_push($projectvideoarray, ['youtubevideo_identifier' => $projectvideo->youtubevideo_identifier, 'youtubevideo_id' => $projectvideo->youtubevideo_id]);
        }

        return json_encode(array('projectvideos' => $projectvideoarray, 'uniquevideos' => $videoarray));
	}

    public function user_projects_videos_add(Requests\UnrestrictedRequest $request){
        $youtubevideoinfo = $request->only('youtubevideo_id', 'project_id');
        extract($youtubevideoinfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);

        if(!$project->youtubevideos->contains($youtubevideo_id)){
        $project->youtubevideos()->attach($youtubevideo_id);
        return 'success';
        }

        //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

        return 'already attached';
    }

    public function user_projects_videos_remove(Requests\UnrestrictedRequest $request){
        $youtubevideoinfo = $request->only('youtubevideo_id', 'project_id');
        extract($youtubevideoinfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);

        $project->youtubevideos()->detach($youtubevideo_id);
        return 'success';

    }

    public function user_videos_youtubevideos_manage_delete(Requests\UnrestrictedRequest $request){
        $videotodelete = $request->only('youtubevideo_id');
        extract($videotodelete, EXTR_OVERWRITE);

        $user = Auth::user();

        $youtubevideo = Youtubevideo::find($youtubevideo_id);

        if ($youtubevideo->user_id == $user->user_id){
            $youtubevideo->delete();
            return 'success';
        }

        return 'The album was not deleted. Only the user who made the album can unmake it.';

    }

    public function get_current_user_youtubevideos(Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $userid = $user->user_id;

        $usercreatedyoutubevideos = Youtubevideo::where('user_id', '=', $userid)->orderBy('youtubevideo_id', 'desc')->get();

        $youtubevideoarray = [];
        foreach ($usercreatedyoutubevideos as $key => $usercreatedyoutubevideo){

            array_push($youtubevideoarray, ['youtubevideo_identifier' => $usercreatedyoutubevideo->youtubevideo_identifier,
            'youtubevideo_id' => $usercreatedyoutubevideo->youtubevideo_id]);
        }

        return json_encode(array('youtubevideoarray' => $youtubevideoarray));
    }

    public function get_current_user_photoalbums(Requests\UnrestrictedRequest $request){
        //$projectinfo = $request->only('projectid');
        //extract($projectinfo, EXTR_OVERWRITE);

        $user = Auth::user();
        $userid = $user->user_id;
        //return $userid;
        //$project = Project::find($projectid);
        //$projectbannerimages = $project->bannerimages;
        //return $projectbannerimages;
        //$bannerimages = Auth::user()->bannerimages->sortByDesc('bannerimage_id');

        $usercreatedphotoalbums = Photoalbum::where('user_id', '=', $userid)->orderBy('photoalbum_id', 'desc')->get();

        //dd($usercreatedphotoalbums);

        //$uniquebannerimages = $bannerimages->diff($projectbannerimages);
        $photoalbumarray = [];
        foreach ($usercreatedphotoalbums as $key => $usercreatedphotoalbum){
            $currentalbumphotos = $usercreatedphotoalbum->facebookphotos()->take(6)->get();

            $filenamearray = [];
            foreach ($currentalbumphotos as $currentalbumphoto){
                $photofilename = md5($currentalbumphoto->facebookphoto_identifier);
                array_push($filenamearray, ['facebookphoto_filename' => $photofilename, 'facebookphoto_identifier' => $currentalbumphoto->facebookphoto_identifier]);
            }
            //return json_encode($currentalbumphotos);

            array_push($photoalbumarray, ['photoalbum_name' => $usercreatedphotoalbum->photoalbum_name,
            'photoalbum_active' => $usercreatedphotoalbum->photoalbum_active,
            'photoalbum_id' => $usercreatedphotoalbum->photoalbum_id,
            'photoalbum_currentphotos' => $filenamearray ]);
        }

        return json_encode(array('photoalbumarray' => $photoalbumarray));
    }

    public function bookinglisting_create(Requests\CreateBookinglisting $request){

        $newbookinglistingvars = $request->only('bookinglisting_title', 'bookinglisting_content');
        extract($newbookinglistingvars, EXTR_OVERWRITE);

        $user = Auth::user();
        $userid = $user->user_id;

        $newbookinglisting = Bookinglisting::create(['bookinglisting_title' => $bookinglisting_title, 'user_id' => $userid, 'bookinglisting_content' => $bookinglisting_content]);

        return 'success';
    }

    public function get_user_bookinglistings_all (Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $bookinglistings = Auth::user()->bookinglistings->sortByDesc('bookinglisting_id');

        $bookinglistingsarray = [];
        foreach ($bookinglistings as $key => $bookinglisting){
            array_push($bookinglistingsarray, [
                'bookinglisting_title' => $bookinglisting->bookinglisting_title,
                'bookinglisting_content' => $bookinglisting->bookinglisting_content,
                'bookinglisting_id' => $bookinglisting->bookinglisting_id
                ]);
        }

        return json_encode(array('bookinglistings' => $bookinglistingsarray));
    }

    public function delete_current_bookinglisting (Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $deleteinfo = $request->only(
            'bookinglisting_id'
        );
        extract($deleteinfo, EXTR_OVERWRITE);

        $todelete = Bookinglisting::findOrFail($bookinglisting_id);

        if ($user->user_id != $todelete->user_id) {
            return 'Listing is not owned by user.';
        }
        else {
            Bookinglisting::destroy($bookinglisting_id);
            return 'success';
        }
    }

    public function edit_or_create_current_bannerheadline (Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $editinfo = $request->only(
            'bannerheadline_id', 'bannerheadline_h1', 'bannerheadline_h2', 'bannerheadline_h3', 'bannerheadline_h3link'
        );
        extract($editinfo, EXTR_OVERWRITE);

        $toedit = Bannerheadline::firstOrNew($bannerheadline_id);

/*
        if ($user->user_id != $toedit->user_id) {
            return 'Listing is not owned by user.';
        }
        else {
*/
            $toedit->bannerheadline_h1 = $bannerheadline_h1;
            $toedit->bannerheadline_h2 = $bannerheadline_h2;
            $toedit->bannerheadline_h3 = $bannerheadline_h3;
            $toedit->bannerheadline_h3link = $bannerheadline_h3link;
            $toedit->save();
            return 'success';
        //}
    }

    public function delete_current_bannerheadline (Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $deleteinfo = $request->only(
            'bannerheadline_id'
        );
        extract($deleteinfo, EXTR_OVERWRITE);

        $todelete = Bannerheadline::findOrFail($bannerheadline_id);

        if ($user->user_id != $todelete->user_id) {
            return 'Listing is not owned by user.';
        }
        else {
            try {
                Bannerheadline::destroy($bannerheadline_id);
            } catch (QueryException $e) {
                abort(403, 'This headline is in use on a project. To delete this headline, first remove it from all projects.');
            }
            return 'success';
        }
    }

    public function add_photoalbum(Requests\UnrestrictedRequest $request){

        $newphotoalbumname = $request->only('photoalbum_name');
        extract($newphotoalbumname, EXTR_OVERWRITE);

        $user = Auth::user();
        $userid = $user->user_id;

        $newphotoalbum = Photoalbum::firstOrCreate(['photoalbum_name' => $photoalbum_name, 'user_id' => $userid, 'photoalbum_active' => '1']);

        return json_encode(array('photoalbum_name' => $newphotoalbum->photoalbum_name, 'photoalbum_active' => $newphotoalbum->photoalbum_active));
    }

    public function user_photos_albums_manage(Requests\UnrestrictedRequest $request){
		$photoalbuminfo = $request->only('photoalbum_id');
        extract($photoalbuminfo, EXTR_OVERWRITE);

		return view ('pages.user_embeddables_photoalbum', compact('photoalbum_id'));
	}

    public function get_photoalbum_photos(Requests\UnrestrictedRequest $request){
		$photoalbuminfo = $request->only('photoalbum_id');
        extract($photoalbuminfo, EXTR_OVERWRITE);

        $photoalbum = Photoalbum::find($photoalbum_id);
        $photoobjects = $photoalbum->facebookphotos()->get();

        $filenamearray = [];
        foreach ($photoobjects as $photoobject){
        	$filename = md5($photoobject->facebookphoto_identifier);
        	array_push($filenamearray, ['filename' => $filename, 'facebookphoto_id' => $photoobject->facebookphoto_id, 'photoalbum_id' => $photoobject->pivot->photoalbum_id]);
        }

        return json_encode(['filenames' => $filenamearray, 'albumname' => $photoalbum->photoalbum_name]);
	}

    public function user_projects_photoalbums_get(Requests\UnrestrictedRequest $request){
        $projectinfo = $request->only('projectid');
        extract($projectinfo, EXTR_OVERWRITE);

        $user = Auth::user();
        $userid = $user->user_id;
        $project = Project::find($projectid);
        $projectphotoalbums = $project->photoalbums;

        $usercreatedphotoalbums = Photoalbum::where('user_id', '=', $userid)->get()->sortByDesc('photoalbum_id');

        $uniquephotoalbums = $usercreatedphotoalbums->diff($projectphotoalbums);
        $photoalbumarray = [];
        foreach ($uniquephotoalbums as $key => $photoalbum){
            array_push($photoalbumarray, ['photoalbum_name' => $photoalbum->photoalbum_name, 'photoalbum_id' => $photoalbum->photoalbum_id]);
        }

        $projectphotoalbumarray = [];
        foreach ($projectphotoalbums as $projectphotoalbum){
            array_push($projectphotoalbumarray, ['photoalbum_name' => $projectphotoalbum->photoalbum_name, 'photoalbum_id' => $projectphotoalbum->photoalbum_id]);
        }

        return json_encode(array('projectphotoalbums' => $projectphotoalbumarray, 'uniquephotoalbums' => $photoalbumarray));
	}

    public function user_projects_photoalbums_add(Requests\UnrestrictedRequest $request){
        $photoalbuminfo = $request->only('photoalbum_id', 'project_id');
        extract($photoalbuminfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);

        if(!$project->photoalbums->contains($photoalbum_id)){
        $project->photoalbums()->attach($photoalbum_id);
        return 'success';
        }

        return 'already attached';
    }

    public function user_projects_photoalbums_remove(Requests\UnrestrictedRequest $request){
        $photoalbuminfo = $request->only('photoalbum_id', 'project_id');
        extract($photoalbuminfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);

        $project->photoalbums()->detach($photoalbum_id);
        return 'success';

    }

    public function changephotoalbumname(Requests\UnrestrictedRequest $request){

        $newphotoalbumname = $request->only('photoalbum_name', 'photoalbum_id');
        extract($newphotoalbumname, EXTR_OVERWRITE);

        $user = Auth::user();
        $userid = $user->user_id;
        $photoalbumtochange = Photoalbum::find($photoalbum_id);
        $photoalbumtochange->photoalbum_name = $photoalbum_name;
        $photoalbumtochange->save();

        return 'success';
    }

    public function user_photos_albums_manage_remove(Requests\UnrestrictedRequest $request){
        $removephotofromalbum = $request->only('photoalbum_id', 'facebookphoto_id');
        extract($removephotofromalbum, EXTR_OVERWRITE);

        $user = Auth::user();

        $photoalbumfromwhichtodetach = Photoalbum::find($photoalbum_id);

        $photoalbumfromwhichtodetach->facebookphotos()->detach($facebookphoto_id);

        //$addedfacebookphoto = Facebookphoto::firstOrCreate(['facebookphoto_identifier' => $facebookphoto_identifier, 'from_name' => $from_name, 'from_id' => $from_id, 'fb_created_time' => $fb_created_time]);
        //$albumtowhichtoadd = Photoalbum::find($photoalbum_id);
        //$albumtowhichtoadd->facebookphotos()->attach($addedfacebookphoto->facebookphoto_id);

        //return $addedfacebookphoto;
        //$filename = '0/' . md5($facebookphoto_identifier) . '.jpg';
        //if (Storage::exists($filename)){
            //return $returnfilename;
        //}
        //else {
            //Storage::disk('s3')->put($filename, $annotatedimage);
            //$returnfilename = md5($facebookphoto_identifier);
        //}

        return 'success';
    }

    public function user_photos_albums_manage_delete(Requests\UnrestrictedRequest $request){
        $albumtodelete = $request->only('photoalbum_id');
        extract($albumtodelete, EXTR_OVERWRITE);

        $user = Auth::user();

        $photoalbum = Photoalbum::find($photoalbum_id);

        if ($photoalbum->user_id == $user->user_id){
            $photoalbum->delete();
            return 'success';
        }

        return 'The album was not deleted. Only the user who made the album can unmake it.';

    }

    public function add_phototophotoalbum(Requests\UnrestrictedRequest $request){
        $addphototoalbum = $request->only('facebookphoto_identifier', 'facebookphoto_link0', 'photoalbum_id', 'from_name', 'from_id', 'fb_created_time');
        extract($addphototoalbum, EXTR_OVERWRITE);

        $user = Auth::user();

        $img = Image::make($facebookphoto_link0)->encode('jpg', 60);
        $imgwidth = $img->width();
        $imgheight = $img->height();
        //return $imgwidth . $imgheight;
        //return '<img src="' . $img . '">';
        //$img->crop(960, 355, 0, $dragpositiontop)->encode();

        $musiclocalcaptionverticalposition = $imgheight - 7;
        $fromnamecaptionverticalposition = $imgheight - 27;
        $lineverticalposition = $imgheight - 21;
        $uniqueid = uniqid();
        $im = new Imagick();

        $im->readImageBlob($img);

        if (isset($from_name)){
            $draw = new ImagickDraw();
            $color = new ImagickPixel('#ffffff');
            $draw->setFont(public_path('fonts/vladimir_script.ttf'));
            $draw->setFontSize(16);
            $draw->setFillColor($color);
            //$draw->setStrokeAntialias(true);
            //$draw->setStrokeColor('#000000');
            //$draw->setStrokeWidth(0);
            //$draw->setTextAntialias(true);
            $text = "Original by " . $from_name;
            $metrics = $im->queryFontMetrics($draw, $text);
            $draw->annotation(5, $fromnamecaptionverticalposition, $text);

            $im->drawImage($draw);

            $drawline = new ImagickDraw();
            $color3 = new ImagickPixel('#ffffff');
            $drawline->setFontSize(12);
            $drawline->setFillColor($color3);
            $drawline->setStrokeAntialias(true);
            $drawline->line(5,$lineverticalposition,140,$lineverticalposition);
            $im->drawImage($drawline);
        }

        $draw2 = new ImagickDraw();
        $color2 = new ImagickPixel('#ffffff');
        $draw2->setFont(public_path('fonts/OpenSans-Italic.ttf'));
        $draw2->setFontSize(12);
        $draw2->setFillColor($color2);
        $draw2->setStrokeAntialias(true);
        $text2 = "created with musiclocal";
        $metrics = $im->queryFontMetrics($draw2, $text2);
        $draw2->annotation(5, $musiclocalcaptionverticalposition, $text2);
        $im->drawImage($draw2);

        $imcloneforthumb = clone $im;

        $annotatedimage = Image::make($im)->encode('jpg', 60);
        $annotatedimagethumb = Image::make($imcloneforthumb)->widen(307)->encode('jpg', 60);

        $addedfacebookphoto = Facebookphoto::firstOrCreate(['facebookphoto_identifier' => $facebookphoto_identifier, 'from_name' => $from_name, 'from_id' => $from_id, 'fb_created_time' => $fb_created_time]);
        $albumtowhichtoadd = Photoalbum::find($photoalbum_id);
        $albumtowhichtoadd->facebookphotos()->attach($addedfacebookphoto->facebookphoto_id);

        //return $addedfacebookphoto;
        $filename = '0/' . md5($facebookphoto_identifier) . '.jpg';
        $filenamethumb = '0t/' . md5($facebookphoto_identifier) . '.jpg';
        if (Storage::exists($filename)){
            return $returnfilename;
        }
        else {
            Storage::disk('s3')->getDriver()->put($filenamethumb, $annotatedimagethumb->__toString(), ['CacheControl' => 'max-age=31536000']);
            Storage::disk('s3')->getDriver()->put($filename, $annotatedimage->__toString(), ['CacheControl' => 'max-age=31536000']);
            $returnfilename = md5($facebookphoto_identifier);
        }

        //return $facebookphoto_identifier . $facebookphoto_link0;
    }

    public function user_photos_addphototoalbum(){
    $user = Auth::user();
    //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

    return view ('pages.user_photos_addphototoalbum', compact('user', 'project'));
    }

    public function get_current_user_photos(){
        $user = Auth::user();

        return view ('includes.user_photos_getcurrentphotos', compact('user', 'project'));
    }

    public function get_navbar_bottom_info(){

        if (Auth::check()) {
            $user = Auth::user();

            $locid = $user->user_location;
            $locname = Location::find($locid)->location_name;
            //$locurl = env('PROJECT_SUBDOMAIN_PREFIX') . $locname . '.' . env('PROJECT_ROOT_DOMAIN');
            //$locstring = '<li class=""><a href="' . $locurl . '">' . $locname . '</a></li>';

            $user_first_name = $user->user_first_name;
            $user_last_name = $user->user_last_name;
            $content = json_encode(['locname' => $locname, 'user_first_name' => $user_first_name, 'user_last_name' => $user_last_name]);
            $response = response($content);
            $response->header('Access-Control-Allow-Origin', '*');
            return $response;
        }

        else {
            $content = 0;
            $response = response($content);
            $response->header('Access-Control-Allow-Origin', '*');
            return $response;
        }

    }

    public function get_current_user_banners(){
        $user = Auth::user();

        return view ('includes.user_banners_getcurrentbanners', compact('user', 'project'));
    }

    public function get_current_user_banners_links(Requests\UnrestrictedRequest $request){
        $projectinfo = $request->only('projectid');
        extract($projectinfo, EXTR_OVERWRITE);

        $user = Auth::user();
        $project = Project::find($projectid);
        $projectbannerimages = $project->bannerimages;
        //return $projectbannerimages;
        $bannerimages = Auth::user()->bannerimages->sortByDesc('bannerimage_id');

        $uniquebannerimages = $bannerimages->diff($projectbannerimages);
        $bannerimagearray = [];
        foreach ($uniquebannerimages as $key => $bannerimage){
            array_push($bannerimagearray, ['banner_filename' => md5($bannerimage->bannerimage_uniqueid), 'banner_id' => $bannerimage->bannerimage_id]);
        }
        //dd($bannerimagearray);

        $projectbannerimagearray = [];
        foreach ($projectbannerimages as $projectbannerimage){
            array_push($projectbannerimagearray, ['banner_filename' => md5($projectbannerimage->bannerimage_uniqueid), 'banner_id' => $projectbannerimage->bannerimage_id]);
        }

        return json_encode(array('projectbannerimages' => $projectbannerimagearray, 'uniquebannerimages' => $bannerimagearray));
    }

    public function get_current_user_banners_all(Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $bannerimages = Auth::user()->bannerimages->sortByDesc('bannerimage_id');

        $bannerimagearray = [];
        foreach ($bannerimages as $key => $bannerimage){
            array_push($bannerimagearray, ['banner_filename' => md5($bannerimage->bannerimage_uniqueid), 'banner_id' => $bannerimage->bannerimage_id]);
        }

        return json_encode(array('bannerimages' => $bannerimagearray));
    }

    public function add_change_section_background_image (Requests\UnrestrictedRequest $request){
        $addchangeinfo = $request->only('projectid', 'backgroundimageid');
        extract($addchangeinfo, EXTR_OVERWRITE);

        $project = Project::find($projectid);
        $projectbackgroundimages = $project->backgroundimages;

        //if ($projectbackgroundimages->contains('section_id', $sectionid)){
            //return 'true';
        //}
        /*
        foreach($projectbackgroundimages as $projectbackgroundimage) {
            if ($projectbackgroundimage->pivot->section_id == $sectionid) {
                if ($projectbackgroundimage->pivot->backgroundimage_id == $backgroundimageid) {
                    return 'Backgroundimage already added to this section.';
                }
                else {
                    $tofind = $projectbackgroundimage->pivot->backgroundimage_project_id;
                    //dd($tofind);
                    $pivot = Backgroundimage_Project::find($tofind);
                    $pivot->backgroundimage_id = $backgroundimageid;
                    $pivot->save();
                    return 'success';
                }
            }
        }*/

        $project->backgroundimages()->attach($backgroundimageid, ['align_horizontal' => 50, 'align_vertical' => 50]);

        return 'success';
    }

    public function remove_section_background_image (Requests\UnrestrictedRequest $request){
        $removeinfo = $request->only('projectid', 'sectionid');
        extract($removeinfo, EXTR_OVERWRITE);

        $project = Project::find($projectid);
        $projectbackgroundimages = $project->backgroundimages;

        foreach($projectbackgroundimages as $projectbackgroundimage) {
            if ($projectbackgroundimage->pivot->section_id == $sectionid) {
                $toremove = $projectbackgroundimage->pivot->backgroundimage_project_id;
                $pivot = Backgroundimage_Project::find($toremove);
                $pivot->delete();
                return 'successfully deleted';
            }
        }

        return 'Matching database entry could not be found.';
    }

    public function get_section_background_image_position (Requests\UnrestrictedRequest $request){
        $changeinfo = $request->only('backgroundimage_project_id');
        extract($changeinfo, EXTR_OVERWRITE);

        try {
            $pivot = Backgroundimage_Project::find($backgroundimage_project_id);
        }
        catch (ModelNotFoundException $e) {
            return abort(404, 'entry not found.');
        }

        $alignvertical = $pivot->align_vertical;
        $alignhorizontal = $pivot->align_horizontal;
        $toreturn = ['align_vertical' => $alignvertical, 'align_horizontal' => $alignhorizontal];
        return json_encode($toreturn);
    }

    public function change_section_background_image_position (Requests\BackgroundimagePosition $request){

        $changeinfo = $request->only('backgroundimage_project_id', 'alignvertical', 'alignhorizontal');
        extract($changeinfo, EXTR_OVERWRITE);

        try {
        $pivot = Backgroundimage_Project::find($backgroundimage_project_id);
        }
        catch (ModelNotFoundException $e) {
            return abort(404, 'entry not found.');
        }
        $pivot->align_vertical = $alignvertical;
        $pivot->align_horizontal = $alignhorizontal;
        $pivot->save();
        return 'successfully changed';

    }

    public function get_current_user_backgroundimages_all(Requests\UnrestrictedRequest $request){

        $backgroundimages = Auth::user()->backgroundimages->sortByDesc('backgroundimage_id');

        $backgroundimagearray = [];
        foreach ($backgroundimages as $key => $backgroundimage){
            array_push($backgroundimagearray, ['backgroundimage_filename' => md5($backgroundimage->backgroundimage_uniqueid), 'backgroundimage_id' => $backgroundimage->backgroundimage_id]);
        }

        return json_encode(array('backgroundimages' => $backgroundimagearray));
    }

    public function get_user_bannerheadlines_all(Requests\UnrestrictedRequest $request){

        $user = Auth::user();

        $bannerheadlines = $user->bannerheadlines->sortByDesc('bannerheadline_id');

        //$project_bannerheadlines = $user->project_backgroundimages->sortbyDesc('bannerheadline_id');

        $unique_bannerheadlines = $bannerheadlines;//$bannerheadlines->diff($project_bannerheadlines);

        $bannerheadlinesarray = [];
        foreach ($unique_bannerheadlines as $key => $bannerheadline){
            array_push($bannerheadlinesarray, ['bannerheadline_id' => $bannerheadline->bannerheadline_id, 'bannerheadline_h1' => $bannerheadline->bannerheadline_h1, 'bannerheadline_h2' => $bannerheadline->bannerheadline_h2, 'bannerheadline_h3' => $bannerheadline->bannerheadline_h3, 'bannerheadline_h3link' => $bannerheadline->bannerheadline_h3link]);
        }

        return json_encode(array('bannerheadlines' => $bannerheadlinesarray));
    }

    public function user_bannerdelete(Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $deleteinfo = $request->only(
            'bannerimage_id',
            'bannerimage_filename'

        ); //quirk of layout, padding must be subtracted from values top and left.
        extract($deleteinfo, EXTR_OVERWRITE);

        $todelete = Bannerimage::destroy($bannerimage_id);

        $filename = 'c/' . $bannerimage_filename . '.jpg';
        Storage::disk('s3')->delete($filename);

        $filenamemd = 'md/' . $bannerimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamemd);

        $filenamesm = 'sm/' . $bannerimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamesm);

        $filenamexs = 'xs/' . $bannerimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamexs);

        $filenamethumb = 't/' . $bannerimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamethumb);

        return 'success';

        //$filename = 'c/' . md5($facebookphoto_identifier . '_' . $user->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $adjust_id . '.jpg';
        //Storage::disk('s3')->put($filename, $croppedimage);

        //return '<div class="returnedbanner" data-bannerid="' . $Newbannerimage->bannerimage_id . '" projectid=""><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($Newbannerimage->facebookphoto_identifier . '_' . $Newbannerimage->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $Newbannerimage->adjust_id . '.jpg" style="padding:1%;"></div>';
    }

    public function user_backgroundimagedelete(Requests\UnrestrictedRequest $request){

        //$user = Auth::user();
        $deleteinfo = $request->only(
            'backgroundimageimage_id',
            'backgroundimageimage_filename'
        );
        extract($deleteinfo, EXTR_OVERWRITE);

        $todelete = Backgroundimage::destroy($backgroundimageimage_id);

        $filename = 'b/' . $backgroundimageimage_filename . '.jpg';
        Storage::disk('s3')->delete($filename);

        $filenamemd = 'bmd/' . $backgroundimageimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamemd);

        $filenamesm = 'bsm/' . $backgroundimageimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamesm);

        $filenamexs = 'bxs/' . $backgroundimageimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamexs);

        $filenamethumb = 'bt/' . $backgroundimageimage_filename . '.jpg';
        Storage::disk('s3')->delete($filenamethumb);

        return 'success';

        //$filename = 'c/' . md5($facebookphoto_identifier . '_' . $user->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $adjust_id . '.jpg';
        //Storage::disk('s3')->put($filename, $croppedimage);

        //return '<div class="returnedbanner" data-bannerid="' . $Newbannerimage->bannerimage_id . '" projectid=""><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($Newbannerimage->facebookphoto_identifier . '_' . $Newbannerimage->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $Newbannerimage->adjust_id . '.jpg" style="padding:1%;"></div>';
    }

    public function user_banners(){
    $user = Auth::user();
    //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

    return view ('pages.user_banners_manage', compact('user', 'project'));
    }

    public function user_banners_create(){
    $user = Auth::user();
    //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

    return view ('pages.user_banners_react', compact('user', 'project'));
    }

    public function user_flyers(){
        $user = Auth::user();
        //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

        return view ('pages.user_flyers', compact('user', 'project'));
    }

    public function user_flyersreact(){
        $user = Auth::user();
        //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

        return view ('pages.user_flyers_react', compact('user', 'project'));
    }

    public function user_projects_addbannertoproject(Requests\UnrestrictedRequest $request){
        $bannerinfo = $request->only('bannerimage_id', 'project_id');
        extract($bannerinfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);

        if(!$project->bannerimages->contains($bannerimage_id)){
        $project->bannerimages()->attach($bannerimage_id);
        return 'success';
        }

        //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

        return 'already attached';
    }

    public function user_projects_removebannerfromproject(Requests\UnrestrictedRequest $request){
        $bannerinfo = $request->only('bannerimage_id', 'project_id');
        extract($bannerinfo, EXTR_OVERWRITE);
        $bannerimage_id_trimmed = ltrim($bannerimage_id, 'p');
        //return $bannerimage_id_trimmed;
        $project = Project::find($project_id);

        if($project->bannerimages->contains($bannerimage_id_trimmed)){
        $project->bannerimages()->detach($bannerimage_id_trimmed);
        return 'success';
        }

        //$bannerimages = Auth::user()->bannerimages->list('facebookphoto_id', 'facebookphoto_identifier');

        return 'Was not attached to the project!';
    }

    public function user_videos(){
        $user = Auth::user();
        $videos = Auth::user()->youtubevideos()->lists('youtubevideo_identifier');
        //dd($videos);
        return view ('pages.user_videos', compact('user', 'project', 'videos'));
    }

    public function user_videos_youtube(){
        $user = Auth::user();
        $videos = Auth::user()->youtubevideos()->lists('youtubevideo_identifier');

        //dd($videos);
        return view ('includes.user_videos_youtube', compact('user', 'project', 'videos'));
        //return view ('includes.user_videos_youtube', compact('user', 'project'));
    }

    public function user_videos_addyoutube(Requests\UnrestrictedRequest $request){

        $youtubevideo = $request->only(['youtubevideo_identifier']);
        extract($youtubevideo, EXTR_OVERWRITE);
        $user = Auth::user();

        $youtubevideoquerystr = parse_url($youtubevideo_identifier, PHP_URL_QUERY);

        $addedyoutubepathwithslash = parse_url($youtubevideo_identifier, PHP_URL_PATH);

        if (str_contains($addedyoutubepathwithslash, 'iframe')){
            $explodediframe = explode('"', $addedyoutubepathwithslash);
            foreach ($explodediframe as $key => $value){
                if (str_contains($value, '//') AND str_contains($value, '/embed/')){
                    $parsediframeurl = parse_url($value, PHP_URL_PATH);
                    $addedyoutubevideoid = substr($parsediframeurl, 7);
                }
            }
        }

        elseif (str_contains($addedyoutubepathwithslash, '/embed/')) {
            $addedyoutubevideoid = substr($addedyoutubepathwithslash, 7);
        }

        else {
            if ($youtubevideoquerystr == null) {
                $addedyoutubevideoid = substr($addedyoutubepathwithslash, 1);
            }
            else {
                $youtubevideoquerystrvars = parse_str($youtubevideoquerystr);
                //this will get $v from the string, which is the id of the full youtube video URL
                if (isset($v)) {
                    $addedyoutubevideoid = $v;
                }
                else {
                    $addedyoutubevideoid = substr($addedyoutubepathwithslash, 1);
                }
            }
        }

        $getorcreateyoutube = Youtubevideo::firstOrCreate(['youtubevideo_identifier' => $addedyoutubevideoid, 'user_id' => $user->user_id]);

        $manytomany = User_Youtubevideo::firstOrCreate(['user_id' => $user->user_id, 'youtubevideo_id' => $getorcreateyoutube->youtubevideo_id]);

        return redirect()->route('user/videos');
    }

    public function user_projects_facebookwidget_addchange(Requests\UnrestrictedRequest $request){

        $facebookwidgetinfo = $request->only(['facebookwidget_url', 'project_id']);
        extract($facebookwidgetinfo, EXTR_OVERWRITE);
        $user = Auth::user();

        $facebookwidgetpath = parse_url($facebookwidget_url, PHP_URL_PATH);

        $facebookwidgetpathnoslash = substr($facebookwidgetpath, 1); //removes the first character of the path

        $facebookwidget = Project::find($project_id)->facebookwidget;
        if ($facebookwidget === null){
            $newfacebookwidget = new Facebookwidget;
            $newfacebookwidget->project_id = $project_id;
            $newfacebookwidget->facebookwidget_path = $facebookwidgetpathnoslash;
            $newfacebookwidget->save();
        }
        else {
            $facebookwidget->facebookwidget_path = $facebookwidgetpathnoslash;
            $facebookwidget->save();
        }

        return 'success';
    }

    public function user_projects_twitterwidget_addchange(Requests\UnrestrictedRequest $request){

        $twitterwidgetinfo = $request->only(['twitterwidget_url', 'project_id']);
        extract($twitterwidgetinfo, EXTR_OVERWRITE);
        $user = Auth::user();

        $twitterwidgetpath = parse_url($twitterwidget_url, PHP_URL_PATH);

        $twitterwidgetpathnoslash = substr($twitterwidgetpath, 1); //removes the first character of the path

        $twitterwidget = Project::find($project_id)->twitterwidget;
        //return $twitterwidget;
        if ($twitterwidget === null){
            $newtwitterwidget = new Twitterwidget;
            $newtwitterwidget->project_id = $project_id;
            $newtwitterwidget->twitterwidget_path = $twitterwidgetpathnoslash;
            $newtwitterwidget->save();
        }
        else {
            $twitterwidget->twitterwidget_path = $twitterwidgetpathnoslash;
            $twitterwidget->save();
        }

        return 'success';
    }

    public function user_projects_instagramwidget_addchange(Requests\Social $request){

        $instagramwidgetinfo = $request->only(['instagramwidget_url', 'instagramwidget_script', 'project_id']);
        extract($instagramwidgetinfo, EXTR_OVERWRITE);
        $user = Auth::user();

        $instagramwidgetpath = parse_url($instagramwidget_url, PHP_URL_PATH);

        $instagramwidgetpathnoslash = substr($instagramwidgetpath, 1); //removes the first character of the path

        //empty string for script is mutated to null or stripped of whitespace in Instagramwidget model

        $instagramwidget = Project::find($project_id)->instagramwidget;
        //return $twitterwidget;
        if ($instagramwidget === null){
            $newinstagramwidget = new Instagramwidget;
            $newinstagramwidget->project_id = $project_id;
            $newinstagramwidget->instagramwidget_path = $instagramwidgetpathnoslash;
            $newinstagramwidget->instagramwidget_script = $instagramwidget_script;
            $newinstagramwidget->save();
        }
        else {
            $instagramwidget->instagramwidget_path = $instagramwidgetpathnoslash;
            $instagramwidget->instagramwidget_script = $instagramwidget_script;
            $instagramwidget->save();
        }

        return 'success';
    }

    public function user_projects_soundcloudwidget_addchange(Requests\Social $request){

        $soundcloudwidgetinfo = $request->only(['soundcloudwidget_path', 'soundcloudwidget_script', 'project_id']);
        extract($soundcloudwidgetinfo, EXTR_OVERWRITE);
        $user = Auth::user();

        $soundcloudwidgetpath = parse_url($soundcloudwidget_path, PHP_URL_PATH);

        $soundcloudwidgetpathnoslash = substr($soundcloudwidgetpath, 1); //removes the first character of the path

        //empty string for script is mutated to null or stripped of whitespace in Instagramwidget model

        $soundcloudwidget = Project::find($project_id)->soundcloudwidget;
        //return $twitterwidget;
        if ($soundcloudwidget === null){
            $newsoundcloudwidget = new Soundcloudwidget;
            $newsoundcloudwidget->project_id = $project_id;
            $newsoundcloudwidget->soundcloudwidget_path = $soundcloudwidgetpathnoslash;
            $newsoundcloudwidget->soundcloudwidget_script = $soundcloudwidget_script;
            $newsoundcloudwidget->save();
        }
        else {
            $soundcloudwidget->soundcloudwidget_path = $soundcloudwidgetpathnoslash;
            $soundcloudwidget->soundcloudwidget_script = $soundcloudwidget_script;
            $soundcloudwidget->save();
        }

        return 'success';
    }

    public function user_projects_contactinfo_get(Requests\UnrestrictedRequest $request){

        $requestinfo = $request->only(['project_id']);
        extract($requestinfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);
        $contactinfo = $project->contactinfo;

        if ($contactinfo === null){
            return json_encode(['contactinfo_email' => []]);
        }
        else {
            $retrievedcontactinfoemail = $contactinfo->contactinfo_email;
            return json_encode(['contactinfo_email' => $retrievedcontactinfoemail]);
        }
    }

    public function user_projects_contactinfo_addchange(Requests\UnrestrictedRequest $request){

        $requestinfo = $request->only(['contactinfo_email', 'project_id']);
        extract($requestinfo, EXTR_OVERWRITE);

        $project = Project::find($project_id);
        $contactinfo = $project->contactinfo;

        if ($contactinfo === null){
            $newcontactinfo = new Contactinfo;
            $newcontactinfo->project_id = $project_id;
            $newcontactinfo->contactinfo_email = $contactinfo_email;
            $newcontactinfo->save();
        }
        else {
            $contactinfo->contactinfo_email = $contactinfo_email;
            $contactinfo->save();
        }

        return 'success';
    }

    public function edit_project_icon_media_get(Requests\UnrestrictedRequest $request){
        $requestinfo = $request->only(['project_id']);
        extract($requestinfo, EXTR_OVERWRITE);

        try {
            $project = Project::find($project_id);
        } catch (ModelNotFoundException $e) {
            return abort(404, 'project not found.');
        }

        $sectionsarray = [
            ['section_id' => '1', 'section_name' => 'Cover', 'backgroundimage_filename' => '' ],
            ['section_id' => '2', 'section_name' => 'About', 'backgroundimage_filename' => '' ],
            ['section_id' => '3', 'section_name' => 'Tour', 'backgroundimage_filename' => '' ],
            ['section_id' => '4', 'section_name' => 'Video', 'backgroundimage_filename' => '' ],
            ['section_id' => '5', 'section_name' => 'Audio', 'backgroundimage_filename' => '' ],
            ['section_id' => '6', 'section_name' => 'Social', 'backgroundimage_filename' => '' ],
            ['section_id' => '7', 'section_name' => 'Contact', 'backgroundimage_filename' => '' ]
        ];

        $sectionscollection = collect($sectionsarray);

        $sectionsarraykeyed = $sectionscollection->keyBy('section_id');


        //return $test;

        $backgroundimages_array = [];
        $backgroundimages = $project->backgroundimages;
        if ($backgroundimages == null) {return '';}
        else {
            foreach ($backgroundimages as $backgroundimage) {
                $backgroundimage_section = $backgroundimage->pivot->section_id;
                $backgroundimage_filename = md5($backgroundimage->backgroundimage_uniqueid);
                array_push($backgroundimages_array, ['section_id' => $backgroundimage_section, 'backgroundimage_filename' => $backgroundimage_filename, 'backgroundimage_project_id' => $backgroundimage->pivot->backgroundimage_project_id]);
            }
        }

        $final = array_replace($sectionsarray, $backgroundimages_array);
        //return $final;
        $backgroundimages_collection = collect($backgroundimages_array);




        $bgimages_collection_keyed = $backgroundimages_collection->keyBy('section_id');


        //return $bgimages_collection_keyed;
        //return $sectionsarraykeyed;
        $test = $sectionsarraykeyed->map(function($item,$key){
                    //return $item;
            });
        //return json_encode(['sections_project' => $sectionsarray]);
        return json_encode(['sections_project' => $backgroundimages_array]);

    }

    public function user_projects_bandsintownwidget_get(Requests\UnrestrictedRequest $request){

        $requestinfo = $request->only(['project_id']);
        extract($requestinfo, EXTR_OVERWRITE);
        $user = Auth::user();

        $project = Project::find($project_id);
        $bandsintownwidget = $project->bandsintownwidget;

        $bandsintownwidget_activeint = $project->bandsintownwidget_active;
        if ($bandsintownwidget_activeint == 1){
        $bandsintownwidget_active = true;
        }
        else {
        $bandsintownwidget_active = false;
        }

        if ($bandsintownwidget === null){
            return json_encode(['bandsintownwidget_artistname' => [], 'bandsintownwidget_active' => []]);
        }
        else {
            $retrievedbitwartistname = $bandsintownwidget->bandsintownwidget_artistname;
            $retrievedactivestatus = $bandsintownwidget_active;
            return json_encode(['bandsintownwidget_artistname' => $retrievedbitwartistname, 'bandsintownwidget_active' => $retrievedactivestatus]);
        }
    }
    public function user_projects_tourwidgets_get(Requests\UnrestrictedRequest $request){

        $requestinfo = $request->only(['project_id']);
        extract($requestinfo, EXTR_OVERWRITE);

        try {
            $project = Project::findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            abort(404, 'Project not found.');
        }

        $tourwidget_selection = $project->projectsettings->tourwidget_selection;

        $reverbnationwidget = $project->reverbnationwidget;
        if ($reverbnationwidget == null) {
            $reverbnationwidget_path = '';
            $reverbnationwidget_script = '';
        }
        else {
            $reverbnationwidget_path = $reverbnationwidget->reverbnationwidget_path;
            $reverbnationwidget_script = $reverbnationwidget->reverbnationwidget_script;
        }

        $bandsintownwidget = $project->bandsintownwidget;
        if ($bandsintownwidget == null) {
            $bandsintownwidget_artistname = '';
        }
        else {
            $bandsintownwidget_artistname = $bandsintownwidget->bandsintownwidget_artistname;
        }

        return json_encode(['bandsintownwidget_artistname' => $bandsintownwidget_artistname, 'reverbnationwidget_path' => $reverbnationwidget_path, 'reverbnationwidget_script' => $reverbnationwidget_script, 'tourwidget_selection' => $tourwidget_selection]);

    }

    public function user_projects_settings_get(Requests\UnrestrictedRequest $request){

        $requestinfo = $request->only(['project_id']);
        extract($requestinfo, EXTR_OVERWRITE);

        try {
            $project = Project::findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            abort(404, 'Project not found.');
        }

        $mailinglistwidget = $project->mailinglistwidget;
        if ($mailinglistwidget == null) {
            $mailinglistwidget_script = '';
        }
        else {
            $mailinglistwidget_script = $mailinglistwidget->mailinglistwidget_script;
        }

        $tagline = $project->tagline;
        if ($tagline == null) {
            $project_tagline = '';
        }
        else {
            $project_tagline = $tagline->tagline_content;
        }
        
        $project_type = $project->project_type;
        $project_location = $project->location_id;

        return json_encode(['mailinglistwidget_script' => $mailinglistwidget_script, 'project_tagline' => $project_tagline, 'project_type' => $project_type, 'project_location' => $project_location]);

    }

    public function user_projects_bandsintownwidget_addchange(Requests\UnrestrictedRequest $request){

        $bandsintownwidgetinfo = $request->only(['bandsintownwidget_artistname', 'bandsintownwidget_active', 'project_id']);
        extract($bandsintownwidgetinfo, EXTR_OVERWRITE);

        if ($bandsintownwidget_active == 'true'){
            $bandsintownwidget_activeint = 1;
        }
        else {
            $bandsintownwidget_activeint = 0;
        }

        try {
            $project = Project::findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            abort(404, 'Project not found.');
        }

        $bandsintownwidget = $project->bandsintownwidget;

        if ($bandsintownwidget === null){
            $newbandsintownwidget = new Bandsintownwidget;
            $newbandsintownwidget->project_id = $project_id;
            $newbandsintownwidget->bandsintownwidget_artistname = $bandsintownwidget_artistname;
            $newbandsintownwidget->save();
        }
        else {
            $bandsintownwidget->bandsintownwidget_artistname = $bandsintownwidget_artistname;
            $bandsintownwidget->save();
        }

        if ($project->bandsintownwidget_active == $bandsintownwidget_activeint){}
        else {
            $project->bandsintownwidget_active = $bandsintownwidget_activeint;
            $project->save();
        }

        return 'success';
    }

    public function user_projects_tourwidgets_addchange(Requests\UnrestrictedRequest $request){

        $tourwidgetinfo = $request->only(['bandsintownwidget_artistname', 'project_id', 'reverbnationwidget_url', 'reverbnationwidget_script', 'tourwidget_selection']);
        extract($tourwidgetinfo, EXTR_OVERWRITE);

        try {
            $project = Project::findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            abort(404, 'Project not found.');
        }

        $bandsintownwidget = $project->bandsintownwidget;
        if ($bandsintownwidget === null){
            $newbandsintownwidget = new Bandsintownwidget;
            $newbandsintownwidget->project_id = $project_id;
            $newbandsintownwidget->bandsintownwidget_artistname = $bandsintownwidget_artistname;
            $newbandsintownwidget->save();
        }
        else {
            $bandsintownwidget->bandsintownwidget_artistname = $bandsintownwidget_artistname;
            $bandsintownwidget->save();
        }

        $reverbnationwidget_url_parsed = parse_url($reverbnationwidget_url, PHP_URL_PATH);

        $reverbnationwidget_path = substr($reverbnationwidget_url_parsed, 1); //removes the first character of the path

        $reverbnationwidget = $project->reverbnationwidget;
        if ($reverbnationwidget === null){
            $newreverbnationwidget = new Reverbnationwidget;
            $newreverbnationwidget->project_id = $project_id;
            $newreverbnationwidget->reverbnationwidget_path = $reverbnationwidget_path;
            $newreverbnationwidget->reverbnationwidget_script = $reverbnationwidget_script;
            $newreverbnationwidget->save();
        }
        else {
            $reverbnationwidget->reverbnationwidget_path = $reverbnationwidget_path;
            $reverbnationwidget->reverbnationwidget_script = $reverbnationwidget_script;
            $reverbnationwidget->save();
        }

        if ($project->projectsettings->tourwidget_selection == $tourwidget_selection){}
        else {
            $project->projectsettings->tourwidget_selection = $tourwidget_selection;
            $project->projectsettings->save();
        }

        return 'success';
    }

    public function user_projects_mailinglistwidget_addchange(Requests\UnrestrictedRequest $request){

        $mailinglistwidgetinfo = $request->only(['project_id', 'mailinglistwidget_script']);
        extract($mailinglistwidgetinfo, EXTR_OVERWRITE);

        try {
            $project = Project::findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            abort(404, 'Project not found.');
        }

        $mailinglistwidget = $project->mailinglistwidget;
        if ($mailinglistwidget === null){
            $newmailinglistwidget = new Mailinglistwidget;
            $newmailinglistwidget->project_id = $project_id;
            $newmailinglistwidget->mailinglistwidget_script = $mailinglistwidget_script;
            $newmailinglistwidget->save();
        }
        else {
            $mailinglistwidget->mailinglistwidget_script = $mailinglistwidget_script;
            $mailinglistwidget->save();
        }

        return 'success';
    }

    public function user_projects_settings_addchange(Requests\UnrestrictedRequest $request){

        $settingsinfo = $request->only(['project_id', 'project_tagline', 'project_name', 'project_url', 'project_type', 'project_location']);
        extract($settingsinfo, EXTR_OVERWRITE);

        try {
            $project = Project::findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            abort(404, 'Project not found.');
        }

        $project->project_name = $project_name;
        $project->project_url = $project_url;
        $project->project_type = $project_type;
        $project->location_id = $project_location;
        $project->save();

        $tagline = $project->tagline;
        if ($tagline === null){
            $newtagline = new Tagline;
            $newtagline->project_id = $project_id;
            $newtagline->tagline_content = $project_tagline;
            $newtagline->save();
        }
        else {
            $tagline->tagline_content = $project_tagline;
            $tagline->save();
        }

        return 'success';
    }

    public function search_users(Requests\SearchUsers $request){

        $query = $request->only('input');
        extract($query, EXTR_OVERWRITE);
        list($first, $last) = explode(' ', "$input ");
        //$last = ltrim($_last, ' ');
        //dd($last);
        //$keystroke = chr($keycode);
        //dd($last);
        //if ($last == null){
            //$result = User::whereRaw("user_first_name LIKE '" . $first . "%'")->lists('user_first_name', 'user_last_name');
        //
        //else {
            $result = User::whereRaw("user_first_name LIKE '" . $first . "%' AND user_last_name LIKE '" . $last . "%'")->select('user_first_name', 'user_last_name', 'user_id')->get();//where('user_first_name', '=', $input)->lists('user_first_name');
        //}
        //dd($result);
        return $result;

       //return redirect(asset('html/test.html'));
    }

    public function search_users_addusertoproject(Requests\UnrestrictedRequest $request)
    {
        $requestarray = $request->only('project_id', 'add_user_id');
        extract($requestarray, EXTR_OVERWRITE);
        $user = Auth::user();

        $project = Project::find($project_id);

        if ($project->users->contains($add_user_id)){
            return 'This user is already a member of this project.';
        }
        else {

            //probably should pull this into session

            $project_user = Project_User::whereRaw('user_id = ' . $user->user_id . ' and project_id = ' . $project_id . '')->firstOrFail();

            $projectuserpermissionis = $project_user->project_user_permission;

            if ($projectuserpermissionis == 7) {

                $project->users()->attach($add_user_id);

                return 'success';
                }
            else {
                return 'You are not authorized to add a user to this project.';
            }
        }
    }

    public function user_create_project(Requests\CreateProject $request)
    {
        //taking $request from validation class CreateProject, Requests facade removed
        $input = $request->only('project_name', 'project_url', 'location_id', 'project_type');

        extract($input, EXTR_OVERWRITE);

        $newproject = Auth::user()->projects()->create(['project_name' => $project_name, 'project_url' => $project_url, 'project_type' => $project_type, 'location_id' => $location_id, 'project_layout' => 1], ['project_user_permission' => '7']);

        Projectsetting::create(['project_id' => $newproject->project_id]);

        return redirect()->route('user');
    }

    public function user_photo_addphoto(Requests\AddFacebookphoto $request){

        $user = Auth::user();
        $facebookphotoids = $request->only(['facebookphoto_identifier']);

        $facebookphoto_identifier = implode('', $facebookphotoids);
        $md5_facebookphoto_identifier = md5($facebookphoto_identifier, false);

        $fb = new Facebook([
            'app-id' => env('FACEBOOK_APP_ID'),
            'app-secret' => env('FACEBOOK_APP_SECRET'),
        ]);
        $fb->setDefaultAccessToken(Session::get('fb_user_access_token'));

        $fqb = new FQB([]);

        $request = $fqb->node($facebookphoto_identifier)->fields([])->accessToken(Session::get('fb_user_access_token'))->graphVersion('v2.3');

        try {
            $response = file_get_contents((string) $request);
        } catch (FacebookSDKException $e) {
            echo $e->getMessage();
            exit;
        }

        $responsetoarray = json_decode($response, true);

        $getcurrentuserphotosdotarray = array_dot($responsetoarray);

            $fixed1 = $getcurrentuserphotosdotarray;
            ksort($fixed1);
            foreach ($fixed1 as $key1 => $fix1){
                $nosource0 = strpos($key1, 'images.0.source');
                $nosource1 = strpos($key1, 'images.1.source');
                $nosource2 = strpos($key1, 'images.2.source');
                $nosource3 = strpos($key1, 'images.3.source');
                $nosource4 = strpos($key1, 'images.4.source');
                $nosource5 = strpos($key1, 'images.5.source');
                $nosource6 = strpos($key1, 'images.6.source');
                $picture = strpos($key1, 'picture');
                $source = strpos($key1, 'source');
                $fromname = strpos($key1, 'from.name');
                $fromid = strpos($key1, 'from.id');
                $createdtime = strpos($key1, 'created_time');

                if ($nosource0 !== false){
                    $file0 = file_get_contents($fix1);

                    $filename0 = '0/' . $md5_facebookphoto_identifier . '_0.jpg';

                    Storage::disk('s3')->put($filename0, $file0);
                }

                elseif ($nosource1 !== false){
                    $file1 = file_get_contents($fix1);

                    $filename1 = '1/' . $md5_facebookphoto_identifier . '_1.jpg';

                    Storage::disk('s3')->put($filename1, $file1);
                }

                elseif ($nosource2 !== false){
                    $file2 = file_get_contents($fix1);

                    $filename2 = '2/' . $md5_facebookphoto_identifier . '_2.jpg';

                    Storage::disk('s3')->put($filename2, $file2);
                }

                elseif ($nosource3 !== false){
                    $file3 = file_get_contents($fix1);

                    $filename3 = '3/' . $md5_facebookphoto_identifier . '_3.jpg';

                    Storage::disk('s3')->put($filename3, $file3);
                }
                elseif ($nosource4 !== false){
                    $file4 = file_get_contents($fix1);

                    $filename4 = '4/' . $md5_facebookphoto_identifier . '_4.jpg';

                    Storage::disk('s3')->put($filename4, $file4);
                }

                elseif ($nosource5 !== false){
                    $file5 = file_get_contents($fix1);

                    $filename5 = '5/' . $md5_facebookphoto_identifier . '_5.jpg';

                    Storage::disk('s3')->put($filename5, $file5);
                }

                elseif ($nosource6 !== false){
                    $file6 = file_get_contents($fix1);

                    $filename6 = '6/' . $md5_facebookphoto_identifier . '_6.jpg';

                    Storage::disk('s3')->put($filename6, $file6);
                }

                elseif ($picture !== false){
                    $filepicture = file_get_contents($fix1);

                    $filenamepicture = 'p/' . $md5_facebookphoto_identifier . '_p.jpg';

                    Storage::disk('s3')->put($filenamepicture, $filepicture);
                }

                elseif ($source !== false){
                    $filesource = file_get_contents($fix1);

                    $filenamesource = 's/' . $md5_facebookphoto_identifier . '_s.jpg';

                    Storage::disk('s3')->put($filenamesource, $filesource);
                }

                elseif ($fromname !== false){
                    $fromname_cellcontent = $fix1;
                }

                elseif ($fromid !== false){
                    $fromid_cellcontent = $fix1;
                }

                elseif ($createdtime !== false){
                    $createdtime_cellcontent = $fix1;
                }

                else {
                    null;
                }
        }
        $newobject = Auth::user()->facebookphotos()->create([
            'facebookphoto_identifier' => $facebookphoto_identifier,
            //'path0' => $filename0,
            //'path1' => $filename1,
            //'path2' => $filename2,
            //'path3' => $filename3,
            //'path4' => $filename4,
            //'path5' => $filename5,
            //'path6' => $filename6,
            //'picture' => $filenamepicture,
            //'source' => $filenamesource,
            'from_name' => $fromname_cellcontent,
            'from_id' => $fromid_cellcontent,
            'fb_created_time' => $createdtime_cellcontent
        ]);

        //$photos = Auth::user()->facebookphotos()->get()->sortByDesc('fb_created_time');

        return '<div class="grid-item grid-item--width4"><img class="currentphotos" photoid="' . $newobject->facebookphoto_id . '" data-photoidentifier="' . $facebookphoto_identifier . '" src="//d1y0bevpkkhybk.cloudfront.net/5/' . md5($facebookphoto_identifier, false) . '_5.jpg" style="padding:1%"></div>';
    }

    public function user_photos_upload(Requests\SearchUsers $request){

        $file = Request::file('photo');
        $file->move(public_path(), 'photo.jpg');

        return redirect()->route('user/photos');
    }

    public function user_photoadjust(Requests\UnrestrictedRequest $request){

        $adjustinfo = $request->only('facebookphoto_identifier', 'photoid');
        extract($adjustinfo, EXTR_OVERWRITE);

        //$filename = 'bpa/' . md5($facebookphoto_identifier) . '_0_' . $submitadjustchoice . '.jpg';

        /*
        *****IMPORTANT! database table 'bannerimages' uniqueness validation depends in part upon the 'adjust_id' column,
        which is set with the key value in the $adjustedimages table below. This is why $adjustedimages array key values are set manually. DO NOT REPEAT KEY VALUES!
        If adjust choice is removed, comment out--DO NOT DELETE--and leave a comment for record keeping purposes.********
        */

        $path = Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg');

        $adjustedimages = [
            '1' => Image::cache(function($image1) use ($path){return $image1->make($path)->blur(2)->sharpen(10);}, 10, true)->encode('data-url', 60),
            '3' => Image::cache(function($image3) use ($path){return $image3->make($path)->blur(100)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '4' => Image::cache(function($image4) use ($path){return $image4->make($path)->blur(99)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '5' => Image::cache(function($image5) use ($path){return $image5->make($path)->blur(98)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '6' => Image::cache(function($image6) use ($path){return $image6->make($path)->blur(97)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '7' => Image::cache(function($image7) use ($path){return $image7->make($path)->blur(96)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '8' => Image::cache(function($image8) use ($path){return $image8->make($path)->blur(95)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '9' => Image::cache(function($image9) use ($path){return $image9->make($path)->blur(94)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '10' => Image::cache(function($image10) use ($path){return $image10->make($path)->blur(93)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '11' => Image::cache(function($image11) use ($path){return $image11->make($path)->blur(92)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '12' => Image::cache(function($image12) use ($path){return $image12->make($path)->blur(91)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            '13' => Image::cache(function($image13) use ($path){return $image13->make($path)->blur(90)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60)
            ];

        $result = '';
        foreach ($adjustedimages as $key => $adjustedimage) {
        $result .= '<img class="bannerimage img img-responsive" style="display:none;max-width:960px;" data-photoid="' . $photoid . '" data-photoidentifier="' . $facebookphoto_identifier . '" data-adjustid="' . $key . '" src="' . $adjustedimage . '">';
        }

        //return $result;
        return $result;

        /*
        if ($submitadjustchoice == null){
            return '<img id="drag" style="width:960px; position:relative; left:' . ($left - $paddingint) . 'px; top: ' .  ($top - $paddingint) . 'px;" data-photoidentifier="' . $facebookphoto_identifier . '" src="//d1y0bevpkkhybk.cloudfront.net/0/' . md5($facebookphoto_identifier) . '_0.jpg">';
        }

        if (Storage::disk('s3')->exists($filename)){
            return '<img id="drag" style="width:960px; position:relative; left:' . ($left - $paddingint) . 'px; top: ' .  ($top - $paddingint) . 'px;" data-adjusted="' . $submitadjustchoice . '" data-photoidentifier="' . $facebookphoto_identifier . '" src="' . asset('e19f57a03b4e466b8f210eff624ccd8e/' . $filename) . '">';
        }
        else {
            $adjustedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->blur(39)->sharpen(25)->contrast(6)->encode('jpg', 60);

            Storage::disk('s3')->put($filename, $adjustedimage);
            return '<img id="drag" style="width:960px; position:relative; left:' . ($left - $paddingint) . 'px; top: ' .  ($top - $paddingint) . 'px;" data-adjusted="' . $submitadjustchoice . '" data-photoidentifier="' . $facebookphoto_identifier . '" src="' . asset('e19f57a03b4e466b8f210eff624ccd8e/' . $filename) . '">';
        }
        */
    }

    public function user_flyeradjust(Requests\UnrestrictedRequest $request){

        $adjustinfo = $request->only('facebookphoto_identifier', 'facebookphoto_link0', 'from_name', 'from_id', 'fb_created_time');

        extract($adjustinfo, EXTR_OVERWRITE);

        $user = Auth::user();
/*
        if (! $user->whereHas('facebookphotos', function($q) use($facebookphoto_identifier) {$q->where('facebookphoto_identifier', '=', '' . $facebookphoto_identifier . '');})->get()->isEmpty()){
        $photoid = Facebookphoto::where('facebookphoto_identifier', '=', $facebookphoto_identifier)->first()->facebookphoto_id;
        }
        else {

        //$facebookphoto_identifier = implode('', $facebookphotoids);
        $md5_facebookphoto_identifier = md5($facebookphoto_identifier, false);

                    $file0 = file_get_contents($facebookphoto_link0);

                    $file0width = Image::make($file0)->width();

                    if ($file0width > 960){
                    $file0sizecheck = Image::make($file0)->widen(960)->encode('jpg', 60);
                    }
                    else {
                    $file0sizecheck = $file0;
                    }

                    $filename0 = '0/' . $md5_facebookphoto_identifier . '_0.jpg';

                    Storage::disk('s3')->put($filename0, $file0sizecheck);

                    /*

                    $file6 = file_get_contents($facebookphoto_link6);

                    $filename6 = '6/' . $md5_facebookphoto_identifier . '_6.jpg';

                    Storage::disk('s3')->put($filename6, $file6);
                    */

/*
        $newobject = Auth::user()->facebookphotos()->create([
            'facebookphoto_identifier' => $facebookphoto_identifier,
            //'path0' => $filename0,
            //'path1' => $filename1,
            //'path2' => $filename2,
            //'path3' => $filename3,
            //'path4' => $filename4,
            //'path5' => $filename5,
            //'path6' => $filename6,
            //'picture' => $filenamepicture,
            //'source' => $filenamesource,
            'from_name' => $from_name,
            'from_id' => $from_id,
            'fb_created_time' => $fb_created_time
        ]);

        //$photos = Auth::user()->facebookphotos()->get()->sortByDesc('fb_created_time');
        $photoid = $newobject->facebookphoto_id;
        }
*/
        //$filename = 'bpa/' . md5($facebookphoto_identifier) . '_0_' . $submitadjustchoice . '.jpg';

        /*
        *****IMPORTANT! database table 'bannerimages' uniqueness validation depends in part upon the 'adjust_id' column,
        which is set with the key value in the $adjustedimages table below. This is why $adjustedimages array key values are set manually. DO NOT REPEAT KEY VALUES!
        If adjust choice is removed, comment out--DO NOT DELETE--and leave a comment for recordkeeping purposes.********
        */


//        $path = Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg');
        $link0 = file_get_contents($facebookphoto_link0);
        $link0width = Image::make($link0)->width();
        if ($link0width > 960){
            $path = Image::cache(function($imager) use ($link0) {$imager->make($link0)->widen(960);}, 10, true)->encode();
        }
        else {
            $path = $link0;//Image::cache(function($imager) use ($link0) {$imager->make($link0);}, 10, true)->encode();
        }

        //$p = public_path('e19f57a03b4e466b8f210eff624ccd8e/0/' . md5($facebookphoto_identifier) . '_0.jpg');
        $im = new Imagick();
        $im->readImageBlob($path);
        //return $im;
        $im->despeckleImage();

        $im2 = new Imagick();
        $im2->readImageBlob($path);

        $im2->despeckleImage();
        $im2->contrastImage(5);
        $im3 = new Imagick();
        $im3->readImageBlob($path);
        $im3->despeckleImage();
        $im3->normalizeImage();
        $im3->contrastImage(35);
        $im4 = new Imagick();
        $im4->readImageBlob($im3);
        $im4->colorizeImage('#000000', 0.35);

        $draw = new ImagickDraw();
        $color = new ImagickPixel('#ffffff');
        $draw->setFont(public_path('fonts/OpenSans-Bold.ttf'));
        $draw->setFontSize(12);
        $draw->setFillColor($color);
        $draw->setStrokeAntialias(true);
        //$draw->setStrokeColor('#000000');
       //$draw->setStrokeWidth(0);
        //$draw->setTextAntialias(true);
        $text = "Photo by Jessica M. Gaboury";
        $metrics = $im3->queryFontMetrics($draw, $text);

/* Create text */
        $draw->annotation(5, $metrics['ascender'], $text);

        $im3->drawImage($draw);

        //oilPaintImage(0);
        //reduceNoiseImage(0);

        $width = Image::make($path)->width();
        $height= Image::make($path)->height();

        $adjustedimages = [
            '0' => Image::cache(function($image0) use ($path){return $image0->make($path);}, 10, true)->encode('data-url', 60),
            '1' => Image::cache(function($image1) use ($path){return $image1->make($path)->blur(2)->sharpen(10);}, 10, true)->encode('data-url', 60),
            '3' => Image::make($im)->encode('data-url', 60),
            '4' => Image::make($im2)->encode('data-url', 60),
            '5' => Image::make($im3)->encode('data-url', 60),
            '6' => Image::make($im4)->encode('data-url', 60)
            //Image::cache(function($image3) use ($path){return $image3->make($path)->blur(4)->sharpen(30)->contrast(6);}, 10, true)->encode('data-url', 60) //->text('foobar', 5, 5, function($font){$font->file(public_path('fonts/ARIALUNI.TTF'));$font->color('#ffffff');$font->stroke_width(3);$font->stroke_color('#000000');})
            //'4' => Image::cache(function($image4) use ($path){return $image4->make($path)->blur(99)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'5' => Image::cache(function($image5) use ($path){return $image5->make($path)->blur(98)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'6' => Image::cache(function($image6) use ($path){return $image6->make($path)->blur(97)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'7' => Image::cache(function($image7) use ($path){return $image7->make($path)->blur(96)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'8' => Image::cache(function($image8) use ($path){return $image8->make($path)->blur(95)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'9' => Image::cache(function($image9) use ($path){return $image9->make($path)->blur(94)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'10' => Image::cache(function($image10) use ($path){return $image10->make($path)->blur(93)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'11' => Image::cache(function($image11) use ($path){return $image11->make($path)->blur(92)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'12' => Image::cache(function($image12) use ($path){return $image12->make($path)->blur(91)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60),
            //'13' => Image::cache(function($image13) use ($path){return $image13->make($path)->blur(90)->sharpen(25)->contrast(6);}, 10, true)->encode('data-url', 60)
        ];

        $adjustedthumbs = [];
        foreach ($adjustedimages as $key => $adjustedimage){

        array_push($adjustedthumbs, ['src' => Image::cache(function($thumb0) use ($adjustedimage){return $thumb0->make(file_get_contents($adjustedimage))->fit(155, 110);}, 10, true)->encode('data-url', 40), 'adjustid' => $key]);

        }

        $result = [];

        foreach ($adjustedimages as $key => $adjustedimage) {

            //list ($width, $height)
            array_push($result, ['photoidentifier' => $facebookphoto_identifier, 'adjustid' => $key, 'src' => $adjustedimage]);

        }

        $adjustdimensions = ['width' => $width, 'height' => $height, 'from_name' => $from_name, 'from_id' => $from_id];

/*      This is the old result returner, pre-react (and before handling the result array client side
        $result = '';
        foreach ($adjustedimages as $key => $adjustedimage) {
            if ($key == '0'){
            $result .= '<img class="bannerimage" style="width:100%;height:100%" data-photoid="' . $photoid . '" data-photoidentifier="' . $facebookphoto_identifier . '" data-adjustid="' . $key . '" src="' . $adjustedimage . '">';
            }
            else {
            $result .= '<img class="bannerimage" style="width:100%;height:100%;display:none;" data-photoid="' . $photoid . '" data-photoidentifier="' . $facebookphoto_identifier . '" data-adjustid="' . $key . '" src="' . $adjustedimage . '">';
            }
        }
*/

        $resultwithdimensionsandthumbs = ['result' => $result, 'adjustdimensions' => $adjustdimensions, 'adjustedthumbs' => $adjustedthumbs];
        return json_encode($resultwithdimensionsandthumbs);

        /*
        if ($submitadjustchoice == null){
            return '<img id="drag" style="width:960px; position:relative; left:' . ($left - $paddingint) . 'px; top: ' .  ($top - $paddingint) . 'px;" data-photoidentifier="' . $facebookphoto_identifier . '" src="//d1y0bevpkkhybk.cloudfront.net/0/' . md5($facebookphoto_identifier) . '_0.jpg">';
        }

        if (Storage::disk('s3')->exists($filename)){
            return '<img id="drag" style="width:960px; position:relative; left:' . ($left - $paddingint) . 'px; top: ' .  ($top - $paddingint) . 'px;" data-adjusted="' . $submitadjustchoice . '" data-photoidentifier="' . $facebookphoto_identifier . '" src="' . asset('e19f57a03b4e466b8f210eff624ccd8e/' . $filename) . '">';
        }
        else {
            $adjustedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->blur(39)->sharpen(25)->contrast(6)->encode('jpg', 60);

            Storage::disk('s3')->put($filename, $adjustedimage);
            return '<img id="drag" style="width:960px; position:relative; left:' . ($left - $paddingint) . 'px; top: ' .  ($top - $paddingint) . 'px;" data-adjusted="' . $submitadjustchoice . '" data-photoidentifier="' . $facebookphoto_identifier . '" src="' . asset('e19f57a03b4e466b8f210eff624ccd8e/' . $filename) . '">';
        }
        */
    }

    public function user_bannerphotocrop(Requests\CreateBannerimage $request){

        $user = Auth::user();
        $cropinfo = $request->only('top', 'left', 'paddingint', 'adjust_id', 'facebookphoto_id', 'facebookphoto_identifier'); //quirk of layout, padding must be subtracted from values top and left.
        extract($cropinfo, EXTR_OVERWRITE);
        //dd($submitadjustchoice);

        $Newbannerimage = Bannerimage::create(['facebookphoto_id' => $facebookphoto_id, 'facebookphoto_identifier' => $facebookphoto_identifier, 'user_id' => $user->user_id, 'adjust_id' => $adjust_id]);

        //$asdfg = $Newbsnnerimage->created_at->toDateTimeString();
        //dd($asdfg);

        if ($adjust_id == '0') {
            $croppedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->crop(960, 300, -($left - $paddingint), -($top - $paddingint))->encode('jpg', 60);
        }
        elseif ($adjust_id == '1') {
            $croppedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->crop(960, 300, -($left - $paddingint), -($top - $paddingint))->blur(2)->sharpen(10)->encode('jpg', 60);
        }
        elseif ($adjust_id == '3') {
            $croppedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->crop(960, 300, -($left - $paddingint), -($top - $paddingint))->blur(100)->sharpen(25)->contrast(6)->encode('jpg', 60);
        }

        else {
            $croppedimage = Image::make('http://d1y0bevpkkhybk.cloudfront.net/photos_fb/0/3279c6c8b63a4346ded94d701433c8cc_0.jpg')/*->crop(960, 300, 0, 190)*/
            ->blur(3)->sharpen(25)->contrast(6); //just get url and pull image from CDN
            return $croppedimage->response('jpg');
        }

        $filename = 'c/' . md5($facebookphoto_identifier . '_' . $user->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $adjust_id . '.jpg';
        Storage::disk('s3')->put($filename, $croppedimage);

        return '<div class="returnedbanner" data-bannerid="' . $Newbannerimage->bannerimage_id . '" projectid=""><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($Newbannerimage->facebookphoto_identifier . '_' . $Newbannerimage->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $Newbannerimage->adjust_id . '.jpg" style="padding:1%;"></div>';
    }

    public function user_bannercropreact(Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $cropinfo = $request->only(
            'imagedata',
            'dragpositiontop',
            'left',
            'paddingint',
            'adjust_id',
            'facebookphoto_id',
            'facebookphoto_link0',
            'from_name'

        ); //quirk of layout, padding must be subtracted from values top and left.
        extract($cropinfo, EXTR_OVERWRITE);

        $img = Image::make($imagedata);
        $img->crop(960, 355, 0, $dragpositiontop)->encode();
        $uniqueid = uniqid();
        $im = new Imagick();

        $im->readImageBlob($img);

        if (isset($from_name)){
            //$drawrectangle = new ImagickDraw();
            //$rectanglefill = new ImagickPixel('#000000');
            //$drawrectangle->setFillColor($rectanglefill);
            //$drawrectangle->rectangle(3, 312, 165, 352);
            //$im->drawImage($drawrectangle);

            $draw = new ImagickDraw();
            $color = new ImagickPixel('#ffffff');
            $draw->setFont(public_path('fonts/vladimir_script.ttf'));
            $draw->setFontSize(16);
            $draw->setFillColor($color);
            //$draw->setStrokeAntialias(true);
            //$draw->setStrokeColor('#000000');
            //$draw->setStrokeWidth(0);
            //$draw->setTextAntialias(true);
            $text = "Original by " . $from_name;
            $metrics = $im->queryFontMetrics($draw, $text);
            $draw->annotation(5, 328, $text);

            $im->drawImage($draw);

            $drawline = new ImagickDraw();
            $color3 = new ImagickPixel('#ffffff');
            $drawline->setFontSize(12);
            $drawline->setFillColor($color3);
            $drawline->setStrokeAntialias(true);
            $drawline->line(5,334,140,334);
            $im->drawImage($drawline);


        }


        $draw2 = new ImagickDraw();
        $color2 = new ImagickPixel('#ffffff');
        $draw2->setFont(public_path('fonts/OpenSans-Italic.ttf'));
        $draw2->setFontSize(12);
        $draw2->setFillColor($color2);
        $draw2->setStrokeAntialias(true);
        $text2 = "created with musiclocal";
        $metrics = $im->queryFontMetrics($draw2, $text2);
        $draw2->annotation(5, 348, $text2);
        $im->drawImage($draw2);

        $imthumb = new Imagick();
        $imthumb->readImageBlob($im);

        //$annotatedimage_unencoded = Image::cache(function($image1) use ($im){return $image1->make($im);}, 5, true);
        $annotatedimage = Image::make($im)->encode('jpg', 60);
        $annotatedimagethumb = Image::make($imthumb)->widen(320)->encode('jpg', 60);


        $Newbannerimage = Bannerimage::create(['facebookphoto_identifier' => '', 'bannerimage_uniqueid' => $uniqueid, 'user_id' => $user->user_id,]);

        $filename = 'c/' . md5($uniqueid) . '.jpg';
        Storage::disk('s3')->put($filename, $annotatedimage->__toString());

        $filenamethumb = 't/' . md5($uniqueid) . '.jpg';
        Storage::disk('s3')->put($filenamethumb, $annotatedimagethumb->__toString());

        $returnfilename = md5($uniqueid);

        return $returnfilename;

        //$filename = 'c/' . md5($facebookphoto_identifier . '_' . $user->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $adjust_id . '.jpg';
        //Storage::disk('s3')->put($filename, $croppedimage);

        //return '<div class="returnedbanner" data-bannerid="' . $Newbannerimage->bannerimage_id . '" projectid=""><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($Newbannerimage->facebookphoto_identifier . '_' . $Newbannerimage->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $Newbannerimage->adjust_id . '.jpg" style="padding:1%;"></div>';
    }

        public function user_create_banner_full (Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $cropinfo = $request->only(
            'imagedata',
            'adjustdragpositiontop',
            'adjustdragpositionleft',
            'image_zoom',
            'aspectratio',
            'credit'
        );
        extract($cropinfo, EXTR_OVERWRITE);

        $img = Image::make($imagedata);
        $imgfullheight = $img->height();
        $imgcorrectedheight = intval($imgfullheight * $image_zoom);
        $img->heighten($imgcorrectedheight);

        if ($aspectratio == 0.375) {

            $img->crop(1920, 720, $adjustdragpositionleft, $adjustdragpositiontop)->encode('png');

            $im = new Imagick();
            $im->readImageBlob($img);

            if (isset($credit)){
                $draw = new ImagickDraw();
                $color = new ImagickPixel('#ffffff');
                $draw->setFont(public_path('fonts/vladimir_script.ttf'));
                $draw->setFontSize(20);
                $draw->setFillColor($color);

                $text = $credit;
                $metrics = $im->queryFontMetrics($draw, $text);
                $draw->annotation(5, 710, $text);

                $im->drawImage($draw);
            }

            $immd = new Imagick();
            $immd->readImageBlob($im);

            $imsm = new Imagick();
            $imsm->readImageBlob($im);

            $imxs = new Imagick();
            $imxs->readImageBlob($im);

            $imt = new Imagick();
            $imt->readImageBlob($im);

            $uniqueid = uniqid();

            $imglg = Image::make($im)->encode('jpg', 60);
            $filename = 'c/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filename, $imglg->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgmd = Image::make($immd)->widen(1200)->encode('jpg', 60);
            $filenamemd = 'md/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamemd, $imgmd->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgsm = Image::make($imsm)->widen(992)->encode('jpg', 60);
            $filenamesm = 'sm/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamesm, $imgsm->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgxs = Image::make($imxs)->widen(768)->encode('jpg', 60);
            $filenamexs = 'xs/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamexs, $imgxs->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgt = Image::make($imt)->widen(320)->encode('jpg', 60);
            $filenamet = 't/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamet, $imgt->__toString(), ['CacheControl' => 'max-age=31536000']);

            $Newbannerimage = Bannerimage::create(['facebookphoto_identifier' => '', 'bannerimage_uniqueid' => $uniqueid, 'user_id' => $user->user_id,]);

            $returnfilename = md5($uniqueid);

            return $returnfilename;

        }

        else if ($aspectratio == 0.625) {

            $img->crop(1920, 1200, $adjustdragpositionleft, $adjustdragpositiontop)->encode('bmp');

            $im = new Imagick();
            $im->readImageBlob($img);

            if (isset($credit)){
                //return 'credit detected';
                $draw = new ImagickDraw();
                $color = new ImagickPixel('#ffffff');
                $draw->setFont(public_path('fonts/vladimir_script.ttf'));
                $draw->setFontSize(20);
                $draw->setFillColor($color);

                $text = $credit;
                $metrics = $im->queryFontMetrics($draw, $text);
                $draw->annotation(5, 1190, $text);

                $im->drawImage($draw);
            }

            $immd = new Imagick();
            $immd->readImageBlob($im);

            $imsm = new Imagick();
            $imsm->readImageBlob($im);

            $imxs = new Imagick();
            $imxs->readImageBlob($im);

            $imt = new Imagick();
            $imt->readImageBlob($im);

            $uniqueid = uniqid();

            $imglg = Image::make($im)->encode('jpg', 60);
            $filename = 'b/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filename, $imglg->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgmd = Image::make($immd)->widen(1200)->encode('jpg', 60);
            $filenamemd = 'bmd/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamemd, $imgmd->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgsm = Image::make($imsm)->widen(992)->encode('jpg', 60);
            $filenamesm = 'bsm/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamesm, $imgsm->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgxs = Image::make($imxs)->widen(768)->encode('jpg', 60);
            $filenamexs = 'bxs/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamexs, $imgxs->__toString(), ['CacheControl' => 'max-age=31536000']);

            $imgt = Image::make($imt)->widen(320)->encode('jpg', 60);
            $filenamet = 'bt/' . md5($uniqueid) . '.jpg';
            Storage::disk('s3')->getDriver()->put($filenamet, $imgt->__toString(), ['CacheControl' => 'max-age=31536000']);

            $Newbannerimage = Backgroundimage::create(['backgroundimage_uniqueid' => $uniqueid, 'user_id' => $user->user_id,]);

            $returnfilename = md5($uniqueid);

            return $returnfilename;
        }

        return 'adjust size not specified';
        //$filename = 'c/' . md5($facebookphoto_identifier . '_' . $user->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $adjust_id . '.jpg';
        //Storage::disk('s3')->put($filename, $croppedimage);

        //return '<div class="returnedbanner" data-bannerid="' . $Newbannerimage->bannerimage_id . '" projectid=""><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($Newbannerimage->facebookphoto_identifier . '_' . $Newbannerimage->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $Newbannerimage->adjust_id . '.jpg" style="padding:1%;"></div>';
    }

    public function user_flyercrop(Requests\UnrestrictedRequest $request){

        $user = Auth::user();
        $cropinfo = $request->only(
            'top',
            'left',
            'paddingint',
            'adjust_id',
            'facebookphoto_id',
            'facebookphoto_link0'

        ); //quirk of layout, padding must be subtracted from values top and left.
        extract($cropinfo, EXTR_OVERWRITE);
        //return $cropinfo;
        //dd($submitadjustchoice);

        $Newbannerimage = Eventflyer::create(['facebookphoto_id' => $facebookphoto_id, 'facebookphoto_identifier' => $facebookphoto_identifier, 'user_id' => $user->user_id, 'adjust_id' => $adjust_id]);

        //$asdfg = $Newbsnnerimage->created_at->toDateTimeString();
        //dd($asdfg);

        if ($adjust_id == '0') {
            $croppedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->crop(960, 300, -($left - $paddingint), -($top - $paddingint))->encode('jpg', 60);
        }
        elseif ($adjust_id == '1') {
            $croppedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->crop(960, 300, -($left - $paddingint), -($top - $paddingint))->blur(2)->sharpen(10)->encode('jpg', 60);
        }
        elseif ($adjust_id == '3') {
            $croppedimage = Image::make(Storage::disk('s3')->get('0/' . md5($facebookphoto_identifier) . '_0.jpg'))->crop(960, 300, -($left - $paddingint), -($top - $paddingint))->blur(100)->sharpen(25)->contrast(6)->encode('jpg', 60);
        }
        elseif ($adjust_id == '5') {

        }

        else {
            $croppedimage = Image::make('http://d1y0bevpkkhybk.cloudfront.net/photos_fb/0/3279c6c8b63a4346ded94d701433c8cc_0.jpg')/*->crop(960, 300, 0, 190)*/
            ->blur(3)->sharpen(25)->contrast(6); //just get url and pull image from CDN
            return $croppedimage->response('jpg');
        }

        $filename = 'c/' . md5($facebookphoto_identifier . '_' . $user->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $adjust_id . '.jpg';
        Storage::disk('s3')->put($filename, $croppedimage);

        return '<div class="returnedbanner" data-bannerid="' . $Newbannerimage->bannerimage_id . '" projectid=""><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($Newbannerimage->facebookphoto_identifier . '_' . $Newbannerimage->user_id . '_' . $Newbannerimage->created_at->toDateTimeString()) . '_' . $Newbannerimage->adjust_id . '.jpg" style="padding:1%;"></div>';
    }

    public function getLogout1()
    {
        Auth::logout();
        //return 'You have been logged out. <a href="' . url('logout') . '">Go to login page</a>.';
        return redirect ('home');
    }

}
