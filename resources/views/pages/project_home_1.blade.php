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

foreach ($project->backgroundimages as $backgroundimage) {
    if ($backgroundimage->pivot->section_id == 1) {$backgroundimage_about = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 2) {$backgroundimage_tour = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 3) {$backgroundimage_video = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 4) { $backgroundimage_audio = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 5) { $backgroundimage_images = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 6) { $backgroundimage_contact = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 7) { $backgroundimage_social = $backgroundimage; }
}
?>

<!doctype html>
<html style="max-width:100%;">

@include ('includes.project_head')
<?php include($head_linkedresources_project01); ?>
<body id="top" style="padding:0;max-width:100%;">
<div style="overflow:hidden;max-width:100%;">
<?php echo $nav_top; ?>

<script>
$(document).ready(function(){
    var w = window.innerWidth;
    if (w > 768){
    var bgimages = {
        'aboutbackground': {
            'filename': '<?php if (isset($backgroundimage_about)) { echo md5($backgroundimage_about->backgroundimage_uniqueid); } ?>',
            'align_horizontal': '<?php if (isset($backgroundimage_about)) { echo $backgroundimage_about->pivot->align_horizontal; } ?>',
            'align_vertical': '<?php if (isset($backgroundimage_about)) { echo $backgroundimage_about->pivot->align_horizontal; } ?>'
            },
        'tourbackground': {
            'filename': '<?php if (isset($backgroundimage_tour)) { echo md5($backgroundimage_tour->backgroundimage_uniqueid); } ?>',
            'align_horizontal': '<?php if (isset($backgroundimage_tour)) { echo $backgroundimage_tour->pivot->align_horizontal; } ?>',
            'align_vertical': '<?php if (isset($backgroundimage_tour)) { echo $backgroundimage_tour->pivot->align_horizontal; } ?>'
            },
        'videobackground': {
            'filename': '<?php if (isset($backgroundimage_video)) { echo md5($backgroundimage_video->backgroundimage_uniqueid); } ?>',
            'align_horizontal': '<?php if (isset($backgroundimage_video)) { echo $backgroundimage_video->pivot->align_horizontal; } ?>',
            'align_vertical': '<?php if (isset($backgroundimage_video)) { echo $backgroundimage_video->pivot->align_horizontal; } ?>'
            },
        'audiobackground': {
            'filename': '<?php if (isset($backgroundimage_audio)) { echo md5($backgroundimage_audio->backgroundimage_uniqueid); } ?>',
            'align_horizontal': '<?php if (isset($backgroundimage_audio)) { echo $backgroundimage_audio->pivot->align_horizontal; } ?>',
            'align_vertical': '<?php if (isset($backgroundimage_audio)) { echo $backgroundimage_audio->pivot->align_horizontal; } ?>'
            },
        'imagesbackground': {
            'filename': '<?php if (isset($backgroundimage_images)) { echo md5($backgroundimage_images->backgroundimage_uniqueid); } ?>',
            'align_horizontal': '<?php if (isset($backgroundimage_images)) { echo $backgroundimage_images->pivot->align_horizontal; } ?>',
            'align_vertical': '<?php if (isset($backgroundimage_images)) { echo $backgroundimage_images->pivot->align_horizontal; } ?>'
            },
        'contactbackground': {
            'filename': '<?php if (isset($backgroundimage_contact)) { echo md5($backgroundimage_contact->backgroundimage_uniqueid); } ?>',
            'align_horizontal': '<?php if (isset($backgroundimage_contact)) { echo $backgroundimage_contact->pivot->align_horizontal; } ?>',
            'align_vertical': '<?php if (isset($backgroundimage_contact)) { echo $backgroundimage_contact->pivot->align_horizontal; } ?>'
            },
        'socialbackground': {
            'filename': '<?php if (isset($backgroundimage_social)) { echo md5($backgroundimage_social->backgroundimage_uniqueid); } ?>',
            'align_horizontal': '<?php if (isset($backgroundimage_social)) { echo $backgroundimage_social->pivot->align_horizontal; } ?>',
            'align_vertical': '<?php if (isset($backgroundimage_social)) { echo $backgroundimage_social->pivot->align_horizontal; } ?>'
            }
        };


    $.each(bgimages, function(key, item){
    console.log(key);
    console.log(item);
        if (item.filename == '') {}
        else {
            var selectbackgroundimagefunction = function(){
                var align_horizontal = item.align_horizontal;
                var align_vertical = item.align_vertical;

                    if (align_horizontal == 0) { var align_horizontal_string = '0%'; }
                    else if (align_horizontal == 2 ) { var align_horizontal_string = '100%'; }
                    else { var align_horizontal_string = '50%'; }

                    if (align_vertical == 0) { var align_vertical_string = '0%'; }
                    else if (align_vertical == 2 ) { var align_vertical_string = '100%'; }
                    else { var align_vertical_string = '50%'; }

                    if (key == 'videobackground1') {
                        $("#" + key).css({"background-position": align_horizontal_string + " " + align_vertical_string, "background-size": "cover", "filter": "grayscale(100%) opacity(80%) brightness(5%)", "-webkit-filter": "grayscale(100%) opacity(80%) brightness(5%)" });
                    }
                    else {
                        $("#" + key).css({"background-position": align_horizontal_string + " " + align_vertical_string, "background-size": "cover", "filter": "grayscale(90%) opacity(5%) brightness(200%)", "-webkit-filter": "grayscale(90%) opacity(5%) brightness(200%)" });
                    }
                if (w < 768) {
                    var backgroundimage_video_url = "//d1y0bevpkkhybk.cloudfront.net/bt/" + item.filename + ".jpg";
                    $("#" + key).css({"background-image": 'url("' + backgroundimage_video_url + '")'});
                }
                else if (w < 992) {
                    var backgroundimage_video_url = "//d1y0bevpkkhybk.cloudfront.net/bsm/" + item.filename + ".jpg";
                    $("#" + key).css({"background-image": 'url("' + backgroundimage_video_url + '")'});
                }
                else if (w < 1200) {
                    var backgroundimage_video_url = "//d1y0bevpkkhybk.cloudfront.net/bmd/" + item.filename + ".jpg";
                    $("#" + key).css({"background-image": 'url("' + backgroundimage_video_url + '")'});
                }
                else {
                    var backgroundimage_video_url = "//d1y0bevpkkhybk.cloudfront.net/b/" + item.filename + ".jpg";
                    $("#" + key).css({"background-image": 'url("' + backgroundimage_video_url + '")'});
                    }
            };

            selectbackgroundimagefunction();

            $(window).resize(function(){
                selectbackgroundimagefunction();
            });

        }
    });
    }
});
</script>

<script>
$(document).ready(function(){
    jQuery.fx.interval = 18;
});

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
                //console.log(h);
                $(this).css({'display':'flex', 'display': '-webkit-flex', 'align-items':'center'});
                //setting fixed height here causes issue with "images" section, which renders after window.load.
            });

        callback(options);

        }
        positionFunction({},fixBackgroundHeight);

        function fixBackgroundHeight(){
            $('.sectionbackgroundcontainer').each(function(index, value){
                var hmax = $(this).parent().height();
                //console.log(hmax);
                $(this).height(hmax);
                });

                $('.aboutmembers').each(function(index, value){
                var ahmax = $(this).height();
                //console.log(hmax);
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

<?php echo $nav_bottom; ?>

<!--
    '#imageheadertext' gets filled by $.html() in the image header.
    The text must be printed outside of the imageheadercontainer, which is position:fixed and z-index:-1 (fixed is relative to parent element (body))
 -->


<div class="headerheight container-fluid" style="position:relative;margin:0;padding:0;">
<div id="imageheadertext" class="container-fluid" style="position:absolute;z-index:1000;"></div>
<div id="imageheadercontainer" class="container-fluid" style="padding:0px;">
@include ('includes.project_image-header_1')
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

<div id="tour"></div>
@if ($project->projectsettings->tour_active == 1)
@include('includes.project_tour')
@endif

<div id="about"></div>
@if ($project->projectsettings->about_active == 1)
@include ('includes.project_about')
@endif

<div id="media"></div>
<div id="audio"></div>
@if ($project->projectsettings->audio_active == 1)
@include ('includes.project_audio')
@endif

<div id="video"></div>
@if ($project->projectsettings->video_active == 1)
@include ('includes.project_video')
@endif

<div id="images"></div>
@if ($project->projectsettings->images_active == 1)
@include ('includes.project_images')
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
</body>

</html>