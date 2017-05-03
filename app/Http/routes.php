<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Request;
use App\Location;
use App\Project;
use App\Customdomain;
use SammyK\FacebookQueryBuilder\FQB;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;
use Illuminate\Database\Eloquent\ModelNotFoundException;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
Route::get('/', 'WelcomeController@index');
*/

Route::controllers([
	//'auth' => 'Auth\AuthController',
	//'password' => 'Auth\PasswordController',
]);

Route::group(['domain' => 'www.chrisskenemusic.com'], function () {
    Route::get('/', ['uses' =>'ProjectsController@project_chrisskenemusicdotcom']);
    Route::get('/epk', ['uses' =>'ProjectsController@project_chrisskenemusicdotcom_epk']);
    Route::get('/lessons', ['uses' =>'ProjectsController@project_chrisskenemusicdotcom_lessons']);
    Route::get('user/ajax/get/navbar_bottom_info', ['uses' => 'UsersController@get_navbar_bottom_info']);
    Route::get('{project_url}', ['uses' =>'ProjectsController@childproject_chrisskenemusicdotcom']);
});

Route::group(['domain' => 'www.chrisskeneband.com'], function () {
    Route::get('/', ['uses' =>'ProjectsController@project_chrisskenebanddotcom']);
    Route::post('project/subscribe/contact', ['uses' => 'ProjectsController@project_subscribe']);
    Route::get('user/ajax/get/navbar_bottom_info', ['uses' => 'UsersController@get_navbar_bottom_info']);
    Route::get('{project_url}', ['uses' =>'ProjectsController@childproject_chrisskenebanddotcom']);
});

Route::group(['domain' => 'www.katieskenemusic.com'], function () {
    Route::get('/', ['uses' =>'ProjectsController@project_katieskenemusicdotcom']);
    Route::get('/epk', ['uses' =>'ProjectsController@project_katieskenemusicdotcom']); //temp set to remove epk
    Route::get('/lessons', ['uses' =>'ProjectsController@project_katieskenemusicdotcom']); //temp set to remove lessons
    Route::get('user/ajax/get/navbar_bottom_info', ['uses' => 'UsersController@get_navbar_bottom_info']);
    Route::get('{project_url}', ['uses' =>'ProjectsController@childproject_katieskenemusicdotcom']);
});

Route::group(['domain' => 'www.skeneabraham.com'], function () {
    Route::get('/', ['uses' =>'ProjectsController@project_skeneabrahamdotcom']);
    Route::get('/epk', ['uses' =>'ProjectsController@project_skeneabrahamdotcom']); //temp set to remove epk
    Route::get('/lessons', ['uses' =>'ProjectsController@project_skeneabrahamdotcom']); //temp set to remove lessons
    Route::get('user/ajax/get/navbar_bottom_info', ['uses' => 'UsersController@get_navbar_bottom_info']);
    Route::get('{project_url}', ['uses' =>'ProjectsController@childproject_skeneabrahamdotcom']);
});

Route::group(['domain' => 'www.themidtowners.com'], function () {
    Route::get('/', ['uses' =>'ProjectsController@project_themidtownersdotcom']);
    Route::get('/epk', ['uses' =>'ProjectsController@project_themidtownersdotcom']); //temp set to remove epk
    Route::get('/lessons', ['uses' =>'ProjectsController@project_themidtownersdotcom']); //temp set to remove lessons
    Route::get('user/ajax/get/navbar_bottom_info', ['uses' => 'UsersController@get_navbar_bottom_info']);
    Route::get('{project_url}', ['uses' =>'ProjectsController@childproject_themidtownersdotcom']);
});

Route::group(['domain' => env('PROJECT_DOMAIN')], function () {
    
    // Authentication routes...
    Route::get('auth/login', 'Auth\AuthController@getLogin');
    Route::post('auth/login', 'Auth\AuthController@postLogin');
    Route::get('auth/logout', 'Auth\AuthController@getLogout');

    // Registration routes...
    //Route::get('auth/register', 'Auth\AuthController@getRegister');
    //Route::post('auth/register', 'Auth\AuthController@postRegister');
    Route::post('auth/register', function(){ return response('MusicLocal is in closed alpha. Only authorized users may register at this time. <a href="' . env('PROJECT_URL') . '">Go to home page.</a>'); });
    // End registration routes

    // Password reset link request routes...
    Route::get('password/email', 'Auth\PasswordController@getEmail');
    Route::post('password/email', 'Auth\PasswordController@postEmail');

    // Password reset routes...
    Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
    Route::post('password/reset', 'Auth\PasswordController@postReset');

    Route::get('user/ajax/account/userinfo', ['middleware' => 'auth', 'uses' => 'UsersController@get_userinfo']);
    Route::post('user/ajax/account/userinfo', ['middleware' => 'auth', 'uses' => 'UsersController@set_userinfo']);

    Route::get('embeddables/photoalbum', ['uses' => 'EmbeddablesController@get_photoalbum_page']);
    Route::get('embeddables/photoalbum/photos', ['uses' => 'EmbeddablesController@get_photoalbum_photos']);

    Route::get('user/photos', ['as' => 'user/photos', 'middleware' => 'auth', 'uses' => 'UsersController@user_photos_react']);
    Route::get('user/photos/albums', ['as' => 'user/photos/albums', 'middleware' => 'auth', 'uses' => 'UsersController@user_photos_addphototoalbum']);
    Route::get('user/photos/albums/manage', ['as' => 'user/photos/albums/manage', 'middleware' => 'auth', 'uses' => 'UsersController@user_photos_albums_manage']);
    Route::get('user/photos/albums/manage/getphotos', ['uses' => 'UsersController@get_photoalbum_photos']);

    Route::get('/user/projects/list', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_list']);
    Route::get('/user/projects/videos/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_videos_get']);
    Route::get('/user/projects/about/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_about_get']);
    Route::get('/user/projects/social/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_social_get']);
    Route::get('/user/projects/audio/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_audio_get']);

    Route::post('/user/projects/about/change', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_about_change']);

    Route::get('/user/projects/bandsintownwidget/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_bandsintownwidget_get']);
    Route::get('/user/projects/tourwidgets/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_tourwidgets_get']);
    Route::post('/user/projects/bandsintownwidget/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_bandsintownwidget_addchange']);
    Route::post('/user/projects/tourwidgets/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_tourwidgets_addchange']);

    Route::get('/user/projects/settings/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_settings_get']);
    Route::post('/user/projects/mailinglistwidget/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_mailinglistwidget_addchange']);
    Route::post('/user/projects/settings/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_settings_addchange']);

    Route::get('/user/projects/contactinfo/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_contactinfo_get']);
    Route::post('/user/projects/contactinfo/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_contactinfo_addchange']);

    Route::post('/user/projects/facebookwidget/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_facebookwidget_addchange']);
    Route::post('/user/projects/twitterwidget/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_twitterwidget_addchange']);
    Route::post('/user/projects/instagramwidget/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_instagramwidget_addchange']);
    Route::post('/user/projects/soundcloudwidget/addchange', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_soundcloudwidget_addchange']);

    Route::get('/user/projects/create', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_create']);
    Route::post('/user/projects/delete', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_delete']);
    Route::get('/user/project/ajax/active_status', ['middleware' => 'auth', 'uses' => 'UsersController@user_project_active_status']);

    Route::get('/user/project/projectsection/active_status', ['middleware' => 'auth', 'uses' => 'UsersController@user_project_projectsection_active_status']);
    Route::post('/user/project/projectsection/activate', ['middleware' => 'auth', 'uses' => 'UsersController@user_project_projectsection_activate']);
    Route::post('/user/project/projectsection/deactivate', ['middleware' => 'auth', 'uses' => 'UsersController@user_project_projectsection_deactivate']);

    Route::get('/user/projects/ajax/get/edit_project_icon_media_get', ['middleware' => 'auth', 'uses' => 'UsersController@edit_project_icon_media_get']);

    Route::get('/user/projects/photoalbums/get', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_photoalbums_get']);
    Route::post('/user/projects/photoalbums/add', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_photoalbums_add']);
    Route::post('/user/projects/photoalbums/remove', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_photoalbums_remove']);
    Route::post('user/photos/albums/manage/remove', ['middleware' => 'auth', 'uses' => 'UsersController@user_photos_albums_manage_remove']);
    Route::post('user/photos/albums/manage/delete', ['middleware' => 'auth', 'uses' => 'UsersController@user_photos_albums_manage_delete']);

    Route::post('project/subscribe/contact', ['uses' => 'ProjectsController@project_subscribe']);

    Route::post('user/videos/youtubevideos/manage/delete', ['middleware' => 'auth', 'uses' => 'UsersController@user_videos_youtubevideos_manage_delete']);
    Route::post('/user/projects/videos/add', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_videos_add']);
    Route::post('/user/projects/videos/remove', ['middleware' => 'auth', 'uses' => 'UsersController@user_projects_videos_remove']);

    Route::get('user/banners', ['as' => 'user/banners', 'middleware' => 'auth', 'uses' => 'UsersController@user_banners']);
    Route::get('user/banners/create', ['as' => 'user/banners/create', 'middleware' => 'auth', 'uses' => 'UsersController@user_banners_create']);
    Route::get('user/flyers', ['as' => 'user/flyers', 'middleware' => 'auth', 'uses' => 'UsersController@user_flyersreact']);
    Route::get('user/flyersreact', ['as' => 'user/flyers/react', 'middleware' => 'auth', 'uses' => 'UsersController@user_flyersreact']);

    Route::get('home', 'FacebookController@home');
    Route::get('user', ['as' => 'user', 'middleware' => 'auth', 'uses' => 'UsersController@user_home']);
    Route::post('user/projects/create', ['middleware' => 'auth', 'uses' => 'UsersController@user_create_project']);
    Route::post('user/schedule/createevent', ['middleware' => 'auth', 'uses' => 'UsersController@user_schedule_createevent']);
    Route::get('user/projects', ['as' => 'user/projects', 'middleware' => 'auth', 'uses' => 'UsersController@user_projects']);
    Route::get('user/projects/{project_url}', ['as' => 'user/projects', 'middleware' => 'auth', 'uses' => 'UsersController@user_projects_editproject']);
    Route::get('user/schedule', ['as' => 'user/schedule', 'middleware' => 'auth', 'uses' => 'UsersController@user_schedule']);
    Route::get('user/videos', ['as' => 'user/videos', 'middleware' => 'auth', 'uses' => 'UsersController@user_videos']);
    Route::get('user/videos/youtube', ['as' => 'user/videos/youtube', 'middleware' => 'auth', 'uses' => 'UsersController@user_videos_youtube']);
    Route::get('user/ajax/get/search/users', ['as' => 'search/users', 'middleware' => 'auth', 'uses' => 'UsersController@search_users']);
    Route::post('user/ajax/post/search/users/addusertoproject', ['as' => 'search/users/addusertoproject', 'middleware' => 'auth', 'uses' => 'UsersController@search_users_addusertoproject']);

    Route::get('user/ajax/get/navbar_bottom_info', ['uses' => 'UsersController@get_navbar_bottom_info']);

    Route::get('logout', ['middleware' => 'auth', 'uses' => 'UsersController@getLogout1']);
    Route::get('user/ajax/get_current_user_photos', ['middleware' => 'auth', 'uses' => 'UsersController@get_current_user_photos']);
    Route::get('user/ajax/get/get_current_user_youtubevideos', ['middleware' => 'auth', 'uses' => 'UsersController@get_current_user_youtubevideos']);
    Route::get('user/ajax/get/get_current_user_banners', ['middleware' => 'auth', 'uses' => 'UsersController@get_current_user_banners']);
    Route::get('user/ajax/get/get_current_user_banners_links', ['middleware' => 'auth', 'uses' => 'UsersController@get_current_user_banners_links']);
    Route::get('user/ajax/get/get_current_user_banners_all', ['middleware' => 'auth', 'uses' => 'UsersController@get_current_user_banners_all']);
    Route::post('user/ajax/post/user_bannerdelete', ['as' => 'user_bannerdelete', 'middleware' => 'auth', 'uses' => 'UsersController@user_bannerdelete']);
    Route::post('user/ajax/post/user_backgroundimagedelete', ['as' => 'user_backgroundimagedelete', 'middleware' => 'auth', 'uses' => 'UsersController@user_backgroundimagedelete']);

    Route::get('user/ajax/get/get_current_user_backgroundimages_all', ['middleware' => 'auth', 'uses' => 'UsersController@get_current_user_backgroundimages_all']);

    Route::get('user/ajax/get/get_user_bannerheadlines_all', ['middleware' => 'auth', 'uses' => 'UsersController@get_user_bannerheadlines_all']);
    Route::post('user/ajax/post/delete_current_bannerheadline', ['middleware' => 'auth', 'uses' => 'UsersController@delete_current_bannerheadline']);
    Route::post('user/ajax/post/edit_or_create_bannerheadline', ['middleware' => 'auth', 'uses' => 'UsersController@edit_or_create_bannerheadline']);

    Route::post('user/ajax/post/add_change_section_background_image', ['middleware' => 'auth', 'uses' => 'UsersController@add_change_section_background_image']);
    Route::post('user/ajax/post/remove_section_background_image', ['middleware' => 'auth', 'uses' => 'UsersController@remove_section_background_image']);

    Route::get('user/ajax/get/get_section_background_image_position', ['middleware' => 'auth', 'uses' => 'UsersController@get_section_background_image_position']);
    Route::post('user/ajax/post/change_section_background_image_position', ['middleware' => 'auth', 'uses' => 'UsersController@change_section_background_image_position']);

    Route::post('user/ajax/bookinglisting_create', ['middleware' => 'auth', 'uses' => 'UsersController@bookinglisting_create']);
    Route::get('user/ajax/get/get_user_bookinglistings_all', ['middleware' => 'auth', 'uses' => 'UsersController@get_user_bookinglistings_all']);
    Route::post('user/ajax/post/delete_current_bookinglisting', ['middleware' => 'auth', 'uses' => 'UsersController@delete_current_bookinglisting']);

    Route::post('user/ajax/post/add_photoalbum', ['middleware' => 'auth', 'uses' => 'UsersController@add_photoalbum']);
    Route::post('user/ajax/post/add_phototophotoalbum', ['middleware' => 'auth', 'uses' => 'UsersController@add_phototophotoalbum']);
    Route::post('user/ajax/post/changephotoalbumname', ['middleware' => 'auth', 'uses' => 'UsersController@changephotoalbumname']);
    Route::get('user/ajax/get/get_current_user_photoalbums', ['middleware' => 'auth', 'uses' => 'UsersController@get_current_user_photoalbums']);

    Route::post('user/projects/activate', ['as' => 'user/projects/activate', 'middleware' => 'auth', 'uses' => 'UsersController@user_projects_activate']);
    Route::post('user/projects/deactivate', ['as' => 'user/projects/deactivate', 'middleware' => 'auth', 'uses' => 'UsersController@user_projects_deactivate']);

    Route::post('user/photos/upload', ['as' => 'user/photos/upload', 'middleware' => 'auth', 'uses' => 'UsersController@user_photos_upload']);
    Route::post('user/videos', ['as' => 'user/videos/addyoutube', 'middleware' => 'auth', 'uses' => 'UsersController@user_videos_addyoutube']);

    Route::post('user/photo/addphoto', ['as' => 'user/photo/addphoto', 'middleware' => 'auth', 'uses' => 'UsersController@user_photo_addphoto']);
    Route::post('user/projects/addbannertoproject', ['as' => 'user/projects/addbannertoproject', 'middleware' => 'auth', 'uses' => 'UsersController@user_projects_addbannertoproject']);
    Route::post('user/projects/removebannerfromproject', ['as' => 'user/projects/removebannerfromproject', 'middleware' => 'auth', 'uses' => 'UsersController@user_projects_removebannerfromproject']);

    Route::post('user/ajax/post/user_photoadjust', ['as' => 'user_photoadjust', 'middleware' => 'auth', 'uses' => 'UsersController@user_photoadjust']);
    Route::any('user/ajax/any/user_flyeradjust', ['as' => 'user_flyeradjust', 'middleware' => 'auth', 'uses' => 'UsersController@user_flyeradjust']);
    Route::post('user/ajax/post/user_bannerphotocrop', ['as' => 'user_bannerphotocrop', 'middleware' => 'auth', 'uses' => 'UsersController@user_bannerphotocrop']);
    Route::post('user/ajax/post/user_flyercrop', ['as' => 'user_flyercrop', 'middleware' => 'auth', 'uses' => 'UsersController@user_flyercrop']);
    Route::post('user/ajax/post/user_bannercropreact', ['as' => 'user_bannercropreact', 'middleware' => 'auth', 'uses' => 'UsersController@user_bannercropreact']);
    Route::post('user/ajax/create_banner_full', ['as' => 'user_create_banner_full', 'middleware' => 'auth', 'uses' => 'UsersController@user_create_banner_full']);

    //Route::resource('user/sections', 'UserSectionsController');


    Route::get('get_more_user_photos/{query}', ['as' => 'get_user_photos', 'middleware' => 'auth', 'uses' => 'FacebookController@get_more_user_photos']);

    Route::get('/login/return', function(){
        return redirect('home');
    });

    // Generate a login URL
    Route::get('/', function(SammyK\LaravelFacebookSdk\LaravelFacebookSdk $fb)
    {
        //return file_get_contents('https://www.facebook.com');
        if (Auth::check()) return redirect('user');

        return redirect('home');

    });

    // Endpoint that is redirected to after an authentication attempt
    Route::get('/login', function(LaravelFacebookSdk $fb)
    {
        // Obtain an access token.
        try {
            $token = $fb->getAccessTokenFromRedirect();
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            dd($e->getMessage());
        }

        // Access token will be null if the user denied the request
        // or if someone just hit this URL outside of the OAuth flow.
        if (! $token) {
            // Get the redirect helper
            $helper = $fb->getRedirectLoginHelper();

            if (! $helper->getError()) {
                abort(403, 'Unauthorized action.');
            }

            // User denied the request
            dd(
                $helper->getError(),
                $helper->getErrorCode(),
                $helper->getErrorReason(),
                $helper->getErrorDescription()
            );
        }

        if (! $token->isLongLived()) {
            // OAuth 2.0 client handler
            $oauth_client = $fb->getOAuth2Client();

            // Extend the access token.
            try {
                $token = $oauth_client->getLongLivedAccessToken($token);
            } catch (Facebook\Exceptions\FacebookSDKException $e) {
                dd($e->getMessage());
            }
        }

        $fb->setDefaultAccessToken($token);

        // Save for later
        Session::put('fb_user_access_token', (string) $token);

        // Get basic info on the user from Facebook.
        try {
            $response = $fb->get('/me?fields=id,email,first_name,last_name'); //,picture{url}
            //dd($response);
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            dd($e->getMessage());
        }

        // Convert the response to a `Facebook/GraphNodes/GraphUser` collection
        $facebook_user = $response->getGraphUser();
        //$fbusertodot = array_dot($facebook_user);
        //var_dump($fbusertodot);
        // Create the user if it does not exist or update the existing entry.
        // This will only work if you've added the SyncableGraphNodeTrait to your User model.
        $user = App\User::createOrUpdateGraphNode($facebook_user);
        //if ($user->user_id >= 1){
        //mail('cnskene@gmail.com', 'MusicLocal User Logged in.', "A user logged in!");
        //}
        // Log the user into Laravel
        Auth::login($user);

        return redirect('/user')->with('message', 'Successfully logged in with Facebook');
    });

    Route::get('get_user_photos', ['middleware' => 'auth', 'uses' => 'FacebookController@get_user_photos']);

    Route::get('test/{project_url}', ['uses' =>'ProjectsController@test_project']);

    Route::get('{project_url}', ['uses' =>'ProjectsController@Project']);

    Route::get('{project_url}/epk', 'ProjectsController@Project_epk');
    Route::get('{project_url}/lessons', 'ProjectsController@Project_lessons');
    Route::get('{project_url}/media', 'ProjectsController@Project_media');
    Route::get('{project_url}/{page}', 'ProjectsController@Project');
    //Route::get('{project_url}/preview', 'UserssController@preview_project');

});

Route::group(['domain' => '{subdomain}.' . env('PROJECT_ROOT_DOMAIN')], function () {
    Route::get('/', function($subdomain_url){
        try {
			$subdomain = Location::where('location_name', $subdomain_url)->firstOrFail();
            if (Auth::check()){
                $user = Auth::user();
                return view ('pages.location_home', compact('subdomain', 'user'));
            }
            else {
                return view ('pages.location_home', compact('subdomain'));
            }
		}
		catch(ModelNotFoundException $e){
            try {
			$subdomain = Project::where('project_url', $subdomain_url)->firstOrFail();
			return redirect(env('PROJECT_URL') . $subdomain->project_url);
		    }
		catch(ModelNotFoundException $e){
			return redirect(env('PROJECT_URL') . 'user');
		    }
        }
    });
});

Route::group(['domain' => 'www.{subdomain}.' . env('PROJECT_ROOT_DOMAIN')], function () {
    Route::get('/', function($subdomain_url){
        try {
			$subdomain = Location::where('location_url', $subdomain_url)->firstOrFail();
            if (Auth::check()){
                $user = Auth::user();
                $content = view('pages.location_home', compact('subdomain', 'user'));
                $response = response($content);
                $response->header('Cache-Control', 'max-age=10, public');
                return $response;
            }
            else {
                $content =  view('pages.location_home', compact('subdomain'));
                $response = response($content);
                $response->header('Cache-Control', 'max-age=10, public');
                return $response;
            }
		}
		catch(ModelNotFoundException $e){
            try {
			$subdomain = Project::where('project_url', $subdomain_url)->firstOrFail();
            return redirect(env('PROJECT_URL') . $subdomain->project_url);
            }
		catch(ModelNotFoundException $e){
			return redirect(env('PROJECT_URL') . 'user');
		    }
        }

    });
});

Route::group(['domain' => 'www.test.{subdomain}.' . env('PROJECT_ROOT_DOMAIN')], function () {
    Route::get('/', function($subdomain_url){
        try {
			$subdomain = Location::where('location_name', $subdomain_url)->firstOrFail();
            if (Auth::check()){
                $user = Auth::user();
                return view ('pages.test_location_home', compact('subdomain', 'user'));
            }
            else {
                return view ('pages.test_location_home', compact('subdomain'));
            }
		}
		catch(ModelNotFoundException $e){
            try {
			$subdomain = Project::where('project_url', $subdomain_url)->firstOrFail();
            return redirect(env('PROJECT_URL') . $subdomain->project_url);
            }
		catch(ModelNotFoundException $e){
			return redirect(env('PROJECT_URL') . 'user');
		    }
        }

    });
});