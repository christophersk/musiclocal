<?php
use Illuminate\Support\Facades\Auth;


	$logolink = $images . 'headerlogo.png';
     $class1 = ($page == 'Home') ? 'class="active"' : '';
	 $class2 = ($page == 'Shows') ? 'class="active"' : '';
	 $class3 = ($page == 'Media') ? 'class="active"' : '';
	 $class4 = ($page == 'Contact') ? 'class="active"' : '';
	 $class5 = ($page == 'Blog') ? 'class="active"' : '';
	 $class6 = ($page == 'EPK') ? 'class="active"' : '';
     $user_home = env('PROJECT_URL') . 'user';
    $user = Auth::user();

     $printusername = isset($user->user_last_name, $user->user_first_name) ? '' . $user->user_first_name . '': 'Join MusicLocal.';
     //location variables are defined on main project view page

     $nav_top = <<<EOD
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation" >
      <div class="container container-fixed">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class=""><a href="$user_home">$printusername</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class=""><a href="$locurl">$locname</a></li>
          </ul>
        </div>
      </div>
    </div>
EOD;
?>