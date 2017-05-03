<?php namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\AuthenticateUser;

/*
class AuthController extends Controller {

    public function login(AuthenticateUser $authenticateUser, Request $request)
    {
        return $authenticateUser->execute($request->has('code'), $this);
    }
    
    public function userHasLoggedIn()
    {
        return redirect('/');
    }

    public function logout(AuthenticateUser $authenticateUser, Request $request)
    {
        return $authenticateUser->logoutuser($request->has('code'), $this);
    }
    
}
*/