<?php

	$logolink = $images . 'headerlogo.png';
     $class1 = ($page == 'NotHome') ? 'class="active"' : '';
	 $class2 = ($page == 'Shows') ? 'class="active"' : '';
	 $class3 = ($page == 'Media') ? 'class="active"' : '';
	 $class4 = ($page == 'Contact') ? 'class="active"' : '';
	 $class5 = ($page == 'Blog') ? 'class="active"' : '';
	 $class6 = ($page == 'EPK') ? 'class="active"' : '';

     if ($project->projectsettings->about_active == 0) { $aboutstring = ''; }
     else {
         if ($project->project_type == 3) { $abouttext = 'Bio'; }
         else { $abouttext = 'About'; }
         
         $aboutstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a id="about-link" class="btn project-top-navbar-link-glow" style="color:#ffffff;" href="#about" onclick="navButtonClickFunction()">' . $abouttext . '</a></li>';

     }
     if ($project->projectsettings->contact_active == 0) {$contactstring = '';}
     else {
        $contactstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a id="contact-link" class="btn project-top-navbar-link-glow" style="color:#ffffff;" href="#contact" onclick="navButtonClickFunction()">Contact</a></li>';
     }

     if ($project->projectsettings->tour_active == 0) {$tourstring = '';}
     else {
        $tourstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a id="tour-link" class="btn project-top-navbar-link-glow" style="color:#ffffff;" href="#tour" onclick="navButtonClickFunction()">Shows</a></li>';
     }

     if ($project->projectsettings->social_active == 0) {$socialstring = '';}
     else {
        $socialstring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a id="social-link" class="btn project-top-navbar-link-glow" style="color:#ffffff;" href="#social" onclick="navButtonClickFunction()">Social</a></li>';
     }

     if ($project->projectsettings->video_active == 0 && $project->projectsettings->audio_active == 0) {
        $mediastring = '';
     }
     else {
        $mediastring = '<li class="btn-link-color" style="float:none;display:inline-block;"><a id="media-link" class="btn project-top-navbar-link-glow" style="color:#ffffff;" href="#media" onclick="navButtonClickFunction()">Media</a></li>';
     }

     $nav_top = <<<EOD
<div style="height:50px;width:100%;background-color:transparent;border-style:none;position:absolute;top:0px;left:0px;z-index:-1">
<!--this div corrects background color of transparent top navbar on mobile devices, but it scrolls away for better viewing -->
</div>

<!-- JS for making bar transparent on mobile located in bottom navbar-->

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation" style="background-color:transparent;border-style:none;">
      <div class="container container-fixed" id="top-navbar-container-fixed" style="background-color:#222;border-bottom-right-radius:6px;border-bottom-left-radius:6px;">
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
                <li class="btn-link-color" style="float:none;display:inline-block;"><a id="top-link" class="btn project-top-navbar-link-glow" style="color:#63a0d4;" href="#top" onclick="navButtonClickFunction()"><span class="glyphicon glyphicon-th-large"></span></a></li>
                $aboutstring
                $tourstring
                $mediastring
                $socialstring
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
        var w = window.innerWidth;
        if (w < 768) { var scrolltime = 200; }
        else { var scrolltime = 500; }

        $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top
	            }, scrolltime);
	            return false;
	            }
	        }
	    });

        function activenavbarlink() {
            var scrollposition = $(document).scrollTop() + 20;
            var topposition = 0;
            var aboutposition = $("#about").offset().top;
            var tourposition = $("#tour").offset().top;
            var mediaposition = $("#media").offset().top;
            var socialposition = $("#social").offset().top;
            var contactposition = $("#contact").offset().top;
            var footerposition = $("#footer").offset().top;
            if (scrollposition > topposition && scrollposition <= aboutposition) {
                $("#top-link").css({"color":"#63a0d4"});
            }
            else { $("#top-link").css({"color":"#ffffff"}); }            
            if (scrollposition > aboutposition && scrollposition <= tourposition) {
                $("#about-link").css({"color":"#63a0d4"});
            }
            else { $("#about-link").css({"color":"#ffffff"}); }            
            if (scrollposition > tourposition && scrollposition <= mediaposition) {
                $("#tour-link").css({"color":"#63a0d4"});
            }
            else { $("#tour-link").css({"color":"#ffffff"}); }            
            if (scrollposition > mediaposition && scrollposition <= socialposition) {
                $("#media-link").css({"color":"#63a0d4"});
            }
            else { $("#media-link").css({"color":"#ffffff"}); }            
            if (scrollposition > socialposition && scrollposition <= contactposition) {
                $("#social-link").css({"color":"#63a0d4"});
            }
            else { $("#social-link").css({"color":"#ffffff"}); }            
            if (scrollposition > contactposition && scrollposition <= footerposition) {
                $("#contact-link").css({"color":"#63a0d4"});
            }
            else { $("#contact-link").css({"color":"#ffffff"}); }
        }
        
        $(window).scroll(function(){
            activenavbarlink();
        });
        
        $(window).resize(function(){
            activenavbarlink();
        });
    });
    </script>
EOD;
?>