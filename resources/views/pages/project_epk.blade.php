<?php
$page = 'EPK';
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

?>

<!doctype html>
<html>

@include ('includes.project_head')
<?php include($head_linkedresources_project01); ?>
<?php echo $nav_top; ?>
<body id="top">
<script>

$(document).ready(function(){
    var fbwp = '<?php echo $projectfacebookwidgetpath; ?>';
    var pid = '<?php $projectid = $project->project_id; echo $projectid;?>';
    localStorage.setItem("facebookwidgetpath", fbwp);
    localStorage.setItem("projectid", pid);
});

$(window).load(function(){
    console.log($(window).scrollTop());
    if ( $(window).scrollTop() == 0) {
        console.log("scrolling...");
        $('html,body').animate({
             scrollTop: $('#epk').offset().top
        }, 500);
    }
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

<div class="container-fluid startprojectcontentcontainer" style="background-color:#ffffff;">
<div class="container container-fixed contentcolor">
<div class="row outershadow" style="padding-left:5px; padding-right:5px; padding-top:20px; padding-bottom:20px;">
<div id="epk" style="position:relative; top:-55px;"></div>
<div class="col-sm-12" style="text-align:center;">
<h1 style="padding-bottom: 10px; font-variant:small-caps;">EPK</h1>
</div>
<div id="info"></div>


<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>
<div class="container container-fixed contentcolor">
<div class="row outershadow" style="padding-left:5px; padding-right:5px; padding-top:20px; padding-bottom:20px;">
<div class="col-sm-8">

<?php
if ($project->projectsettings->video_active == 1) {
    echo '<h3>Video</h3>';
    include($latestvideos);
}
?>

    <?php
        if ($project->about != null){
        $projectaboutcontent = $project->about->about_content;
        echo '<div><h3>About</h3></div><div style="line-height:1.75em;letter-spacing:.4px;-webkit-column-count:2;-webkit-column-gap:60px;-webkit-column-rule:1px solid #333333;-moz-column-count:2;-moz-column-gap:60px;-moz-column-rule:1px solid #333333;column-count:2;column-gap:60px;column-rule:1px solid #333333;">' . $projectaboutcontent . '</div>';
        }
    ?>
<div class="row">
<div class="col-sm-6">
    <?php
        if ($project->pastvenuelist != null){
        $projectpastvenuelistcontent = $project->pastvenuelist->pastvenuelist_content;
        echo '<div><h3>Past Venues</h3><div style="line-height:1.75em;letter-spacing:.4px;">' . $projectpastvenuelistcontent . '</div></div>';
        }
    ?>
</div>
<div class="col-sm-6">
<?php
    if ($project->endorsements != null){
        $projectendorsements = $project->endorsements;
        echo '<div><h3>Comments</h3>';
        foreach ($projectendorsements as $projectendorsement){
            $endorsementcontent = $projectendorsement->endorsement_content;
            $endorsementendorser = $projectendorsement->endorsement_endorser;
            $endorsementendorserbusiness = $projectendorsement->endorsement_endorserbusiness;
            echo '
                <p><em>' . $endorsementcontent . '</em></p>
                <p>&mdash;' . $endorsementendorser . '
                <br/>
                ' . $endorsementendorserbusiness . '</p>
            ';
        }
        echo '</div>';
    }
?>
</div>
</div>


    </div>
    <div class="col-sm-4">
    <?php
$contactinfo = Project::find($project->project_id)->contactinfo()->first();
if($contactinfo === null){}
else {
    echo '<div><h3>Contact</h3>' . substr_replace($contactinfo->contactinfo_email, '<span style="display:none;">n-spm</span>', 4, 0) . '</div>';
}

?>

<?php

if ($project->bandsintownwidget_active == 1){
echo '<div><h3>Upcoming Shows</h3><script src="http://widget.bandsintown.com/javascripts/bit_widget.js"></script>';
echo '<a href="https://www.bandsintown.com/' . rawurlencode($project->bandsintownwidget->bandsintownwidget_artistname) . '" class="bit-widget-initializer" data-prefix="fbjs" data-display-limit="20" data-artist="' . $project->bandsintownwidget->bandsintownwidget_artistname . '" data-force-narrow-layout="false" data-text-color="#333333">' . $project->bandsintownwidget->bandsintownwidget_artistname . ' Tour Dates</a>
</div>';

}
elseif ($project->events != null){
    $projectevents = $project->events;
    foreach ($projectevents as $projectevent){
        $projecteventparticipants = $projectevent->projects;
        echo '
        <div class="row">
            <div class="col-sm-6" style="text-align:left;">
                <p>' . $projectevent->event_start->toFormattedDateString() . '   |   '; foreach ($projecteventparticipants as $projecteventparticipant){ echo $projecteventparticipant->project_name; } echo ' - ' . $projectevent->event_name . '</p>
        </div>
        <div class="col-sm-6" style="text-align:right;">
            <p>' . $projectevent->event_location . '   |   ' . $projectevent->event_city . ',' . $projectevent->event_state . '</p></div>
        </div>';
    }
}
?>



</div>


<?php include($endcontentcontainer); ?>
<div id="contentbottom"></div>
</div>
<!--
<?php include($middlespacer); ?>
<div class="container container-fixed contentcolor">
<div class="row outershadow" style="padding-left:5px; padding-right:5px; padding-top:20px; padding-bottom:20px;">
<div id="artwork" style="position:relative; top:-55px;"></div>
<div class="col-sm-12" style="text-align:center;">
<h1 style="padding-bottom: 30px; font-variant:small-caps;">Artwork</h1>
</div>
<div class="col-sm-10 col-sm-offset-1 col-xs-12">
<div id="artwork"></div>
<h4>Banners</h4>
<?php
foreach ($projectbannerimages as $projectbannerimage){
        echo '<img class="img img-responsive bannerslide" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg"><div style="display:block;padding-top:5px;"></div>';
}
?>
</div>

<div class="col-sm-10 col-sm-offset-1 col-xs-12">
<h4>Images</h4>
<?php
$latestphotoalbum = Project::find($project->project_id)->photoalbums()->orderBy('photoalbum_id', 'desc')->first();
if ($latestphotoalbum === null){}
else {
    echo '<div><iframe src="/embeddables/photoalbum?photoalbum_id=' . $latestphotoalbum->photoalbum_id . '" style="width:100%; height:600px; overflow-x:hidden; border:none"></iframe></div>';
}
?>
</div>

<?php include($endcontentcontainer); ?>
-->
<div class="container-fluid startprojectcontentcontainer" style="background-color:#c1c8c8;">
<?php include($middlespacer); ?>
@include ('includes.project_footer')
<?php include_once($scripts); ?>
</div>
</body>

</html>