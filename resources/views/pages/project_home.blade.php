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
     $locurl = env('PROJECT_SUBDOMAIN_PREFIX') . $locname . '.' . env('PROJECT_ROOT_DOMAIN');

require_once($project_navbar);
require_once($project_navbar_top);
require_once($navbar_bottom);

$projectbannerimages = $project->bannerimages;


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
<html>

@include ('includes.project_head')
<?php include($head_linkedresources_project01); ?>
<body id="top" style="padding:0;">
<?php echo $nav_top; ?>

<script>

$(document).ready(function(){
    var fbwp = '<?php echo $projectfacebookwidgetpath; ?>';
    var pid = '<?php $projectid = $project->project_id; echo $projectid;?>';
    var h = window.innerHeight;
    function positionFunction() {
        $('.fullheight').animate({'min-height': h}, 0, function(){
            var h = $(this).height() + 80; //add padding to height to avoid child element positioning problem
            //console.log(h);
            $(this).css({'display':'flex', 'display': '-webkit-flex', 'align-items':'center'});
            //setting fixed height here causes issue with "images" section, which renders after window.load.
        });
    }
    positionFunction();
    $(window).resize(function(){
        var h = window.innerHeight;
        $('.fullheight').animate({'min-height': h, 'display':'flex', 'display': '-webkit-flex', 'align-items':'center'}, 0);
    });
    localStorage.setItem("facebookwidgetpath", fbwp);
    localStorage.setItem("projectid", pid);
});
</script>

<?php echo $nav_bottom; ?>

<!--
    '#imageheadertext' gets filled by $.html() in the image header.
    The text must be printed outside of the imageheadercontainer, which is position:fixed and z-index:-1 (fixed is relative to parent element (body))
 -->
<div id="imageheadertext" class="container-fluid" style="position:absolute;z-index:1000"></div>

<div id="imageheadercontainer" class="container-fluid" style="padding:0px;">
@include ('includes.project_image-header')
</div>

<div id="socialheadercontainer" class="container-fluid" style="background-color:#ffffff;">
@include ('includes.project_top-spacer')
</div>

<div id="titleandactioncontainer" style="background-color:#ffffff;">
    <div class="container-fluid" style="background-color:#c1c8c8;">
    @include ('includes.title-header_project')
    </div>

    <div class="container-fluid" style="background-color:#ffffff;">
    @include ('includes.project_action-header')
    </div>
</div>

@include ('includes.project_spacer-line')

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


</body>

</html>