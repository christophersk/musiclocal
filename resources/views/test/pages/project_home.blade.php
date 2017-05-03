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

?>

<!doctype html>
<html>

@include ('includes.project_head')
<?php include($head_linkedresources_project01); ?>
<?php echo $nav_top; ?>
<body id="top" <?php if ($project->project_name == 'Chris Skenes'){ echo 'style="background-image:url(http://www.musiclocal.org/DSC_8366.jpg)"';} else {echo 'style="<!--background-color:#c1c8c8;-->"';} ?>>
<script>

$(document).ready(function(){
    var fbwp = '<?php echo $projectfacebookwidgetpath; ?>';
    var pid = '<?php $projectid = $project->project_id; echo $projectid;?>';
    var h = window.innerHeight;
    $('.fullheight').css({'min-height': h, 'display':'flex','align-items':'center'});
    $(window).resize(function(){
        var h = window.innerHeight;
        $('.fullheight').css({'min-height': h, 'display':'flex','align-items':'center'});
    });
    localStorage.setItem("facebookwidgetpath", fbwp);
    localStorage.setItem("projectid", pid);
});

$(document).ready(function(){
   var header_text_container_height = $('.header_text_container').height();
   console.log('text container height is ' + header_text_container_height);
   var carousel_height = $('#carousel-header').height();
   console.log('carousel height is ' + carousel_height);
   var calc_header_text_container_top_margin = (carousel_height - header_text_container_height) / 2.2;
   console.log('calculated top position is ' + calc_header_text_container_top_margin);
   $('.header_text_container').css({'top':calc_header_text_container_top_margin + 'px'});
   $(window).resize(function(){
        var header_text_container_height = $('.header_text_container').height();
        var carousel_height = $('#carousel-header').height();
        var calc_header_text_container_top_margin = (carousel_height - header_text_container_height) / 2.2;
        $('.header_text_container').css({'top':calc_header_text_container_top_margin + 'px'});
   });
});
/*
$(document).ready(function(){
    var coverresize = function(){
        var h = window.innerHeight;
        console.log(h);
        var ihh = $('#imageheadercontainer').height();
        var shch = $('#socialheadercontainer').height();
        console.log(ihh);
        var tach = h - shch - ihh - 100;
        console.log(tach);
        $('#titleandactioncontainer').css({'height': tach});
    };
    coverresize();
    $(window).resize(function(){
       coverresize();
    });

});
*/
</script>

<?php echo $nav_bottom; ?>

<div id="imageheadercontainer" class="container-fluid" style="padding:0px;">
@include ('test.includes.project_image-header')
</div>

<div id="socialheadercontainer" class="container-fluid" style="background-color:#ffffff;">
@include ('includes.project_top-spacer')
</div>
<script>
$(document).ready(function(){
var h = $('#titleandactioncontainer').height();



})



</script>
<div id="titleandactioncontainer" style="background-color:#ffffff;">
    <div class="container-fluid" style="background-color:#c1c8c8;">
    @include ('includes.title-header_project')
    </div>

    <div class="container-fluid" style="background-color:#ffffff;">
    @include ('includes.project_action-header')
    </div>
</div>

<div class="container-fluid" style="background-color:#ffffff;">
<div class="container container-fixed" style="background-color:#ffffff;">
    <div class="row nopadding">

        <div class="col-xs-10 col-xs-offset-1" style="padding:0px;height:1px;background-color:#333333;">
        <!--spacer line-->
        </div>

    </div>
</div>
</div>


<div id="tour" class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#ffffff;">

<?php //include($middlespacer); ?>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Tour</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="#top"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="#about"><i class="fa fa-chevron-down"></i></a>
</div>

<div class="col-xs-12">

<?php

if ($project->project_url == 'katieskene') {
echo '<div class="row"><div class="col-xs-12" style="text-align:center;padding-top:4%; padding-bottom:7%;"><h1>EP Release Party</h1><h2 style="padding-top:1%;">January 2, 2016</h2><h4 style="padding-top:1%;"><b><a href="http://www.bradfordvilleblues.com/" target="new">Bradfordville Blues Club</a></b> | <em>Tallahassee, FL</em></h4></div></div>';
}

if ($project->bandsintownwidget_active == 1){
echo '<script defer src="http://widget.bandsintown.com/javascripts/bit_widget.js"></script>';
echo '<a href="https://www.bandsintown.com/' . rawurlencode($project->bandsintownwidget->bandsintownwidget_artistname) . '" class="bit-widget-initializer" data-prefix="fbjs" data-display-limit="20" data-artist="' . $project->bandsintownwidget->bandsintownwidget_artistname . '" data-force-narrow-layout="false" data-text-color="#333333">' . $project->bandsintownwidget->bandsintownwidget_artistname . ' Tour Dates</a>';

}
else if ($project->events != null){
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
<br/><br/>
</div>

<?php include($endcontentcontainer); ?>

<?php //include($middlespacer); ?>
</div>
<div id="about"></div>
<div <?php if ($project->project_url == 'katieskene'){echo 'style="display:none;"';} ?>>
<div class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#c1c8c8;">

<?php //include($middlespacer); ?>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">About</h1>
</div>
    <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
        <a class="btn btn-link" href="#tour"><i class="fa fa-chevron-up"></i></a>
        <a class="btn btn-link" href="#video"><i class="fa fa-chevron-down"></i></a>
    </div>
<div class="col-xs-12">
<div id="info"></div>


        <?php
        if ($project->about != null){
        $projectaboutcontent = $project->about->about_content;
        echo '<div style="line-height:1.75em;letter-spacing:.4px;-webkit-column-count:2;-webkit-column-gap:60px;-webkit-column-rule:1px solid #333333;-moz-column-count:2;-moz-column-gap:60px;-moz-column-rule:1px solid #333333;column-count:2;column-gap:60px;column-rule:1px solid #333333;">' . $projectaboutcontent . '</div>';
        }
        ?>

</div>

<?php include($endcontentcontainer); ?>
<?php //include($middlespacer); ?>
</div>
</div>
<div id="media"></div>
<div id="audio">
    <?php if ($project->soundcloudwidget->soundcloudwidget_script === null) {}
    else {
    echo '<div class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#ffffff;">';
    include($startprojectcontentcontainer);
    echo '<div class="col-xs-12" style="text-align:center;">
        <h1 style="font-variant:small-caps;">Audio</h1>
    </div>
        <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
        <a class="btn btn-link" href="#about"><i class="fa fa-chevron-up"></i></a>
        <a class="btn btn-link" href="#images"><i class="fa fa-chevron-down"></i></a>
    </div>
    <div class="col-xs-12" style="padding-top:2%;">' . $project->soundcloudwidget->soundcloudwidget_script . '</div>';
    include ($endcontentcontainer);
    echo '</div></div>';
    }
     ?>

</div>
<div id="video"></div>
<div <?php if ($project->project_url == 'katieskene'){echo 'style="display:none;"';} ?>>
<div class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#ffffff;">
    <?php //include($middlespacer); ?>
    <?php include($startprojectcontentcontainer); ?>
    <div class="col-xs-12" style="text-align:center;">
        <h1 style="font-variant:small-caps;">Video</h1>
    </div>
    <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
        <a class="btn btn-link" href="#about"><i class="fa fa-chevron-up"></i></a>
        <a class="btn btn-link" href="#images"><i class="fa fa-chevron-down"></i></a>
    </div>

    <div class="col-xs-12">
        <?php include $latestvideos; ?>
        <br/><br/>
    </div>

        <?php include($endcontentcontainer); ?>
        <?php //include($middlespacer); ?>


</div>
</div>
<div id="images"></div>
<div <?php if ($project->project_url == 'katieskene'){echo 'style="display:none;"';} ?>>
<div class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#c1c8c8;">

<?php //include($middlespacer); ?>
<?php include($startprojectcontentcontainer); ?>
<div id="content-modal"></div>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Images</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="#video"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="#social"><i class="fa fa-chevron-down"></i></a>
</div>
<div class="col-xs-12"><noscript>You must have javascript enabled to view images.</noscript>
<?php
$latestphotoalbum = Project::find($project->project_id)->photoalbums()->orderBy('photoalbum_id', 'desc')->first();
if ($latestphotoalbum === null){}
else {
    //echo '<div><iframe src="/embeddables/photoalbum?photoalbum_id=' . $latestphotoalbum->photoalbum_id . '" scrolling="no" style="width:100%; height:600px; overflow:hidden; border:none"></iframe></div>';
    echo '

    <div id="datadiv" data-photoalbumid="' . $latestphotoalbum->photoalbum_id . '"></div>
        <div id="testcontainer4">
        </div>
        <script defer src="' . url('js/musiclocal_embeddedphotoalbum.js') . '"></script>';
    }
?>
</div>
</div>

<?php include($endcontentcontainer); ?>
<?php //include($middlespacer); ?>
</div>

<div id="social"></div>
<div class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#ffffff;">
<?php //include($middlespacer); ?>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Social</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="<?php if ($project->project_url == 'katieskene'){ echo '#tour'; } else { echo '#images'; } ?>"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="#contact"><i class="fa fa-chevron-down"></i></a>
</div>
<?php
if ($project->instagramwidget === null){}
else { echo '<div class="col-xs-12" style="text-align:center;padding-top:3%;"><h3>Instagram</h3>' . $projectinstagramwidgetpath = $project->instagramwidget->instagramwidget_script . '</div>'; }
?>
<div class="col-xs-12" style="text-align:center;">

    <?php include($facebook); ?>
    <div id="contentbottom"></div>
    <br/><br/>
</div>

<div class="col-sm-4 col-xs-5">
<?php //include($twitter); ?>
</div>

<?php include($endcontentcontainer); ?>
<?php //include($middlespacer); ?>
</div>

<div id="contact"></div>
<div class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#c1c8c8;">

<?php //include($middlespacer); ?>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Contact</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="#social"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="#"><i class="fa fa-circle-o"></i></a>
</div>
<div class="col-xs-12">
<p style="text-align:center;">
<?php
$contactinfo = Project::find($project->project_id)->contactinfo()->first();
if($contactinfo === null){}
else {
    echo substr_replace($contactinfo->contactinfo_email, '<span style="display:none;">n-spm</span>', 4, 0);
}

?>

</p>
</div>

<?php include($endcontentcontainer); ?>
<?php //include($middlespacer); ?>
</div>

<div class="container-fluid startprojectcontentcontainer" style="background-color:#ffffff;">
<?php //include($middlespacer); ?>
@include ('includes.project_footer')
<?php include_once($scripts); ?>
</div>
</body>

</html>