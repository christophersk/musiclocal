<?php namespace App;

use SammyK\FacebookQueryBuilder\FQB;
use Facebook\Facebook;

class FacebookFunctions {

    public function get_user_photos{
        $fb = new Facebook([]);
        $fqb = new FQB([]);

        $photosEdge = $fqb->edge('photos')->fields(['source'])->limit(1);
        $request = $fqb->node('me')->fields(['name', $photosEdge])->accessToken(Session::get('fb_user_access_token'));
    }

}


