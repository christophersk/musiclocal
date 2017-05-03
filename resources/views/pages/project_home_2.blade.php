<?php
$page = 'Home';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);


        use App\Project;
        use App\Location;
        $locid = $project->location_id;
        $loc = Location::find($locid);//$project->location->location_name;
        $locname = $loc->location_name;
        $locstate = $loc->location_state;
     $locurl = env('PROJECT_SUBDOMAIN_PREFIX') . $loc->location_url . '.' . env('PROJECT_ROOT_DOMAIN');

//require_once($project_navbar);
require_once($project_navbar_top);
require_once($project_navbar_bottom);

$projectbannerimages = $project->bannerimages;

$projectbackgroundimages = $project->backgroundimages;

if ($project->facebookwidget === null){
$projectfacebookwidgetpath = '';
}
else {
$projectfacebookwidgetpath = $project->facebookwidget->facebookwidget_path;
}

?>

<!doctype html>
<html style="max-width:100%;">

@include ('includes.project_head')
<?php include($head_linkedresources_project01); ?>
<body id="top" style="padding:0;max-width:100%;">
<div style="overflow:hidden;max-width:100%;">
<?php echo $nav_top; ?>

<script type="text/javascript">
if (parent.frames.length > 0) {
parent.location.href = self.document.location;
}
</script>

<script>
document.addEventListener("orientationchange", function(){
window.dispatchEvent(new Event('resize'));
    moveCarouselIndicatorsFunction();
    setHeaderSizeFunction();
    //alert('device rotated.');
}, true);
    function moveCarouselIndicatorsFunction() {
        var w = window.innerHeight;
        var calc = $('#socialheadercontainer').offset().top;
        var soctop = w - calc;
        $('#carouselindicators').css({"bottom": soctop});
    }

    function setHeaderSizeFunction() {

        function positionFunction(options, callback) {
        var h = window.innerHeight;
        var w = window.innerWidth;
        if ( w < 768 ) {
            var k = 0;
        }
        else {
            var k = 50;
        }
            $('.headerheight').animate({'height': h, 'overflow':'hidden'}, 0);
            $('.fullheight').animate({'min-height': h}, 0, function(){
                var h = $(this).height(); //add padding to height to avoid child element positioning problem
                $(this).css({'display':'flex', 'display': '-webkit-flex', 'align-items':'center'});
                //setting fixed height here causes issue with "images" section, which renders after window.load.
            });

        callback(options);

        }
        positionFunction({},fixBackgroundHeight);

        function fixBackgroundHeight(){
            $('.sectionbackgroundcontainer').each(function(index, value){
                var hmax = $(this).parent().height();
                $(this).height(hmax);
                });

                $('.aboutmembers').each(function(index, value){
                var ahmax = $(this).height();
                $(this).height(ahmax);
                });
        }
    }

document.addEventListener("deviceready", function(){
    moveCarouselIndicatorsFunction();
    setHeaderSizeFunction();
});

$(document).ready(function(){
        $(window).resize(function(){
            var h = window.innerHeight;
            var w = window.innerWidth;

            if ($(window).width() != w) {

            if ( w < 768 ) {
                var k = 0;
            }
            else {
                var k = 50;
            }
            $('.headerheight').animate({'height': h }, 0);
            $('.fullheight').animate({'min-height': h, 'display':'flex', 'display': '-webkit-flex', 'align-items':'center'}, 0, function(){
                moveCarouselIndicatorsFunction();
                setHeaderSizeFunction();
            });

            // Update the window width for next time
            windowWidth = $(window).width();

            // Do stuff here

            }
        });

    var fbwp = '<?php echo $projectfacebookwidgetpath; ?>';
    var pid = '<?php $projectid = $project->project_id; echo $projectid;?>';

    setHeaderSizeFunction();
    moveCarouselIndicatorsFunction();

    localStorage.setItem("facebookwidgetpath", fbwp);
    localStorage.setItem("projectid", pid);

        var isPaused = false;
        var i = 0;
    var interval = setInterval(function(){
        if (!isPaused){
            setHeaderSizeFunction();
            moveCarouselIndicatorsFunction();
            i++;
            if (i == 30) {
                clearInterval(interval);
            }
        }
    }, 300);

    $('.btn').on('click', function(){
        clearInterval(interval);
        setTimeout(interval, 800);
    });

});

$(window).load(function(){
    setHeaderSizeFunction();
    moveCarouselIndicatorsFunction();
});

</script>

<?php //echo $nav_bottom; ?>

<!--
    '#imageheadertext' gets filled by $.html() in the image header.
    The text must be printed outside of the imageheadercontainer, which is position:fixed and z-index:-1 (fixed is relative to parent element (body))
 -->


<div class="headerheight container-fluid" style="position:relative;margin:0;padding:0;">
<div id="imageheadertext" class="container-fluid" style="position:absolute;z-index:1000;"></div>
<div id="imageheadercontainer" class="container-fluid" style="padding:0px;">
@include ('includes.project_image-header_2')
</div>

<div style="position:absolute;z-index:100;bottom:55px;width:100%">
<div id="socialheadercontainer" class="container-fluid" style="background-color:rgba(255,255,255,0.0);">
@include ('includes.project_top-spacer')
</div>

<div id="titleandactioncontainer">
    <div class="container-fluid titlebackground" style="">
    @include ('includes.title-header_project')
    </div>

    <div class="container-fluid" style="background-color:rgba(255,255,255,0.0);">
    @include ('includes.project_action-header_1')
    </div>
</div>
</div>
</div>

<div id="about"></div>
@if ($project->projectsettings->about_active == 1)
@include ('includes.project_about')
@endif

<div id="tour"></div>
@if ($project->projectsettings->tour_active == 1)
@include('includes.project_tour')
@endif

<div id="media"></div>
<div id="video"></div>
@if ($project->projectsettings->video_active == 1)
@include ('includes.project_video')
@endif
<div id="audio"></div>
@if ($project->projectsettings->audio_active == 1)
@include ('includes.project_audio')
@endif

<div id="social"></div>
@if ($project->projectsettings->social_active == 1)
@include ('includes.project_social')
@endif

<div id="contact"></div>
@if ($project->projectsettings->contact_active == 1)
@include ('includes.project_contact')
@endif

<div class="container-fluid startprojectcontentcontainer" style="background-color:#ffffff;">
@include ('includes.project_footer')
<?php include_once($scripts); ?>
</div>

</div>
@if ($project->project_id == 12)
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-42762239-2', 'auto');
  ga('send', 'pageview');

</script>
@endif

</body>

</html>