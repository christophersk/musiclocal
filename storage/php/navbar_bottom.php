<?php

	$logolink = $images . 'headerlogo.png';
    $class1 = ($page == 'index') ? 'class="active"' : '';
    $class2 = ($page == 'Shows') ? 'class="active"' : '';
    $class3 = ($page == 'Media') ? 'class="active"' : '';
    $class4 = ($page == 'Contact') ? 'class="active"' : '';
    $class5 = ($page == 'Blog') ? 'class="active"' : '';
    $class6 = ($page == 'EPK') ? 'class="active"' : '';
    /*
    $logout = '<a href="' . env('PROJECT_URL') . 'logout">Logout</a>';
    */
    $user_home = env('PROJECT_URL') . 'user';
    /*
    $printusername = isset($user->user_last_name, $user->user_first_name) ? 'Logged in as ' . $user->user_first_name . ' ' . $user->user_last_name . '': 'Not logged in.';
    $loginoutlink = (Auth::check()) ? $logout : '<a href="' . env('PROJECT_URL') . 'home">Login</a>';
    */

    $siteurl = env('PROJECT_URL');
    $subdomainprefix = env('PROJECT_SUBDOMAIN_PREFIX');
    $rootdomain = env('PROJECT_ROOT_DOMAIN');

/*
    if (isset($user)) {
        $locid = $user->user_location;
        $locname = Location::find($locid)->location_name;
        $locurl = env('PROJECT_SUBDOMAIN_PREFIX') . $locname . '.' . env('PROJECT_ROOT_DOMAIN');
        $locstring = '<li class=""><a href="' . $locurl . '">' . $locname . '</a></li>';
    }
    else {

    $locstring = '';

    }
*/

    $nav_bottom = <<<EOD
<div class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle navbar-color-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-left">
            <li id="support-button" onclick="$('.collapse').collapse('hide')"><a href="mailto:cnskene@gmail.com">Support</a></li>
            <li id="loginoutcontainer" onclick="$('.collapse').collapse('hide')"><a href="$siteurl/home">Login</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="locationcontainer"></li>
            <li class="active"><a href="$user_home" class="userfullnamecontainer" onclick="$('.collapse').collapse('hide')"><span>Not logged in.</span></a></li>
          </ul>
        </div>
      </div>
    </div>

    <script>

    function navbarTransparentToggle() {
        var w = window.innerWidth;
        if (w < 768) {
            if ( $('.navbar').css('background-color') != 'rgb(34, 34, 34)' ){
                $('.navbar').css({'background-color':'rgb(34, 34, 34)'});
            }
            else {
                $('.navbar').css({'background-color':'rgba(0,0,0,0)'});
            }
        }
    };

    $(document).ready(function(){
        var w = window.innerWidth;
        if (w < 768) {
            $('body').css({'padding-bottom':'0px'});
            $('.navbar').css({'background-color': 'rgba(0,0,0,0)', 'border-color': 'rgba(0,0,0,0)', 'margin-bottom': '0px'});
            $('.collapse').css({'background-color': '#222'});
            $('.navbar-toggle').css({'background-color': '#222'});

            $('.navbar-color-toggle').click(function() {
                navbarTransparentToggle();
            });
        }

        var siteurl = '$siteurl';
        var dashboardurl = siteurl + 'user';
        var locurl = '$subdomainprefix'
        var ajaxroute = 'user/ajax/get/navbar_bottom_info';
        var ajaxurl = siteurl + ajaxroute;

        $.ajax({
         type: "GET",
            url: ajaxurl,
            data: {

            },
            error: (function (response) {
                console.log(response);
            }),
            success: (function (response) {
                if (response == 0) {
                }
                else {
                    $("#loginoutcontainer").html('<a href="' + siteurl + 'logout">Logout</a>');
                    var parsedresponse = JSON.parse(response);
                    $(".locationcontainer").html('<a href="$subdomainprefix' + parsedresponse.locname + '.$rootdomain">' + parsedresponse.locname + '</a>');
                    $(".userfullnamecontainer").html('<span>Logged in as ' + parsedresponse.user_first_name + ' ' + parsedresponse.user_last_name + '.</span>');
                    $(".landingusercontainer").append('<div><br/><a class="btn btn-primary" href="' + dashboardurl + '">User Dashboard</a></div>');
                    $("#userfirstnamecontainer").html(parsedresponse.user_first_name);
                }
            })
        });
    });
    </script>

EOD;
?>