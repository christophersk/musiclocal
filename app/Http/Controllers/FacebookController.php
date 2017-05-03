<?php namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;
use SammyK\FacebookQueryBuilder\FQB;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Facebook;
use Illuminate\Support\Facades\Session;
use App\Facebookphoto;
use Facebook\FacebookRequest;
use Facebook\FacebookBatchRequest;
use Facebook\FacebookApp;

class FacebookController extends Controller {

    public function home(LaravelFacebookSdk $fb){
        $user = Auth::user();

        $login_url = $fb->getLoginUrl(['email,user_photos']);

        return view('pages.home', compact('user', 'project', 'login_url'));
    }

    public function get_current_user_photos(){
        $fb = new Facebook([
            'app-id' => env('FACEBOOK_APP_ID'),
            'app-secret' => env('FACEBOOK_APP_SECRET'),
        ]);
        $fb->setDefaultAccessToken(Session::get('fb_user_access_token'));
        $fqb = new FQB([]);
        $user = Auth::user();

        $facebookphotoids = Auth::user()->facebookphotos()->take(2)->lists('facebookphoto_identifier');

        $app1 = new FacebookApp(env('FACEBOOK_APP_ID'), env('FACEBOOK_APP_SECRET'));

        $batchrequest = new FacebookBatchRequest($app1, [], [],'v2.3');

        static $batch = array();
        foreach ($facebookphotoids as $key => $facebookphotoid) {
            $batchrequest->add(new FacebookRequest(null, Session::get('fb_user_access_token'), "GET", '/' . $facebookphotoid, ['source']));

            $req = $fb->request('GET', $facebookphotoid , ['from'], Session::get('fb_user_access_token'));
            //dd($req);
            array_push($batch, $req);

        }

        try {
            $responses = $fb->sendBatchRequest($batch);
        } catch (FacebookSDKException $e) {
            //echo $e->getMessage();
            echo 'No photos to display.';
            exit;
        }

        foreach ($responses as $key => $response) {
            if ($response->isError()) {
                $e = $response->getThrownException();
                echo '<p>Error! Facebook SDK Said: ' . $e->getMessage() . "\n\n";
                echo '<p>Graph Said: ' . "\n\n";
                var_dump($e->getResponse());
            } else {
                $testest = $response->getDecodedBody();
                static $responsearray = array();
                array_push($responsearray, [$key => $testest]);
            }
        }

        $getcurrentuserphotosdotarray = array_dot($responsearray);


        //dd($getcurrentuserphotosdotarray);
        $user = Auth::user();

        return view('includes.user_photos_getcurrentphotos', compact('getcurrentuserphotosdotarray', 'user', 'project'));

        }

    public function get_user_photos(){
        $fb = new Facebook([]);
        $fqb = new FQB([]);

        $photosEdge = $fqb->edge('photos')->fields(['photo-id', 'source'])->limit(6);
        $request = $fqb->node('me')->fields([$photosEdge])->accessToken(Session::get('fb_user_access_token'));

        try {
            $response = $fb->get($request->asEndpoint());
        } catch (FacebookSDKException $e) {
            echo $e->getMessage();
            exit;
        }

        $object = $response->getGraphNode();
        $FacebookphotoNodeResults = $response->getDecodedBody();

        $user = Auth::user();

        return view('includes.user_photos_getphotos', compact('FacebookphotoNodeResults', 'user', 'project', 'response', 'object'));

    }

    public function get_more_user_photos($query){

        if ($query == 'next'){
            $nextorprevious = 'nextfbquery';
        }
        elseif ($query == 'previous'){
            $nextorprevious = "previousfbquery";
        }
        else {
        return redirect('get_user_photos');
        }

        $request = Session::get($nextorprevious);

        try {
            $response = file_get_contents($request);
        }
        catch (FacebookSDKException $e) {
            echo $e->getMessage();
            exit;
        }

        $responseJSONtoPHP = json_decode($response, true);

        $FacebookphotoNodeResults = $responseJSONtoPHP;

        $user = Auth::user();

        return view('includes.user_photos_getphotos', compact('FacebookphotoNodeResults', 'user', 'project', 'response'));
    }

    public function add_user_photos(Requests\AddFacebookphoto $request){
        Facebookphoto::create(Request::all());

    }
}