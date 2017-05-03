<?php

	$logolink = $images . 'headerlogo.png';
     $class1 = ($page == 'NotHome') ? 'class="active"' : '';
	 $class2 = ($page == 'Shows') ? 'class="active"' : '';
	 $class3 = ($page == 'Media') ? 'class="active"' : '';
	 $class4 = ($page == 'Contact') ? 'class="active"' : '';
	 $class5 = ($page == 'Blog') ? 'class="active"' : '';
	 $class6 = ($page == 'EPK') ? 'class="active"' : '';
     $url = url($project->project_url);
     if ($project->project_url == 'chrisskene') {
     $epkstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a class="btn" style="color:#337ab7;" href="' . $url . '/epk" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-play-circle" style="padding-right:10px;"></span>EPK</a></li>';
     }
     else { $epkstring = '';}
     if ($project->projectsettings->about_active == 0) { $aboutstring = ''; }
     else {
         if ($project->about != null){
             $aboutstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a class="btn" style="color:#337ab7;" href="' . $url . '#about" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-align-left" style="padding-right:10px;"></span>About</a></li>';
         }
         else { $aboutstring = ''; }
     }
     if ($project->projectsettings->contact_active == 0) {$contactstring = '';}
     else {
        $contactstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a class="btn" style="color:#337ab7;" href="' . $url . '#contact" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-envelope" style="padding-right:10px;"></span>Contact</a></li>';
     }

     if ($project->projectsettings->tour_active == 0) {$tourstring = '';}
     else {
        $tourstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a class="btn" style="color:#337ab7;" href="' . $url . '#tour" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-envelope" style="padding-right:10px;"></span>Tour</a></li>';
     }

     if ($project->projectsettings->social_active == 0) {$socialstring = '';}
     else {
        $socialstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a class="btn" style="color:#337ab7;" href="' . $url . '#social" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-envelope" style="padding-right:10px;"></span>Social</a></li>';
     }

     $nav_top = <<<EOD
<div style="height:50px;width:100%;background-color:transparent;border-style:none;position:absolute;top:0px;left:0px;z-index:-1">
<!--this div corrects background color of transparent top navbar on mobile devices, but it scrolls away for better viewing -->
</div>

<!-- JS for making bar transparent on mobile located in bottom navbar-->

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="background-color:transparent;border-style:none;">
      <div class="container container-fixed" style="background-color:#222;border-bottom-right-radius:6px;border-bottom-left-radius:6px;">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle navbar-color-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" style="text-align:center;">
            <ul class="nav navbar-nav" style="text-align:center;width:100%;">
                <li class="btn-link-color" style="float:none;display:inline-block;"><a class="btn" style="color:#337ab7;" href="$url#top" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-arrow-up"></span></a></li>
                $tourstring
                $aboutstring
                <li class="btn-link-color" style="float:none;display:inline-block;"><a class="btn" style="color:#337ab7;" href="$url#media" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-film" style="padding-right:10px;"></span>Media</a></li>
                $socialstring
                $epkstring
                $contactstring
            </ul>
        </div>
      </div>
    </div>

    <script>

    function navButtonClickFunction() {
        $('.collapse').collapse('hide');
        navbarTransparentToggle();
    }

    $(document).ready(function(){

        $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top
	            }, 500);
	            return false;
	            }
	        }
	    });

    });
    </script>
EOD;
?>