<?php
	$logolink = $images . 'headerlogo.png';
     $class1 = ($page == 'NotHome') ? 'class="active"' : '';
	 $class2 = ($page == 'Shows') ? 'class="active"' : '';
	 $class3 = ($page == 'Media') ? 'class="active"' : '';
	 $class4 = ($page == 'Contact') ? 'class="active"' : '';
	 $class5 = ($page == 'Blog') ? 'class="active"' : '';
	 $class6 = ($page == 'EPK') ? 'class="active"' : '';
     $url = url($project->project_url);
     $nav = <<<EOD
     <div class="projectnavbar" data-spy="affix" data-offset-top="570" id="affixedbanner1" style="z-index:99999;background-color:#222222;margin-right:-5px;">

      <div class="container container-fixed">

        <div style="padding-top:5px;text-align:center;">
            <a class="btn btn-link" href="$url#top"><span class="glyphicon glyphicon-arrow-up""></span></a>
            <a class="btn btn-link" href="$url#tour"><span class="glyphicon glyphicon-music" style="padding-right:10px;"></span>Tour</a>
            <a class="btn btn-link" href="$url#about"><span class="glyphicon glyphicon-align-left" style="padding-right:10px;"></span>About</a>
            <a class="btn btn-link" href="$url#video"><span class="glyphicon glyphicon-film" style="padding-right:10px;"></span>Video</a>
            <a class="btn btn-link" href="$url#images"><span class="glyphicon glyphicon-picture" style="padding-right:10px;"></span>Images</a>
            <a class="btn btn-link" href="$url#social"><span class="glyphicon glyphicon-user" style="padding-right:10px;"></span>Social</a>
			<a class="btn btn-link" href="$url/epk"><span class="glyphicon glyphicon-play-circle" style="padding-right:10px;"></span>EPK</a>
       		<a class="btn btn-link" href="$url#contact"><span class="glyphicon glyphicon-envelope" style="padding-right:10px;"></span>Contact</a>
        </div>
      </div>

    </div>
        <script>
    $(window).load(function(){
        $('#affixedbanner1').on("affixed.bs.affix", function(){
            $('.startprojectcontentcontainer').addClass('container-affix-fix');
            console.log('affixed');
        });
        $('#affixedbanner1').on("affixed-top.bs.affix", function(){
            $('.startprojectcontentcontainer').removeClass('container-affix-fix');
        });

        $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top
	            }, 1000);
	            return false;
	        }
	    }
	});

    });
    </script>
EOD;
?>