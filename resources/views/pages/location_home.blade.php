<?php
$page = 'Home';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);

$locname = $subdomain->location_name;
$locstate = $subdomain->location_state;
$locurl = env('PROJECT_SUBDOMAIN_PREFIX') . $locname . '.' . env('PROJECT_ROOT_DOMAIN');


require_once($navbar_bottom);

use App\Location;
use App\Project;
use App\Tagline;
use App\Bannerimage;
use App\User;

?>

<!doctype html>
<html>

@include ('includes.location_head')
<?php include($head_linkedresources_project01); ?>
<?php //echo $nav_top; ?>
<body id="top">

<?php echo $nav_bottom; ?>
<div class="container-fluid startprojectcontentcontainer" style="background-color:#c1c8c8;">

<?php include($middlespacer); ?>
</div>
<div class="container-fluid startprojectcontentcontainer" style="background-color:#ffffff;">
<?php include($middlespacer); ?>
<?php //include($startprojectcontentcontainer); ?>
<div>
<div class="row nopadding">
<div class="col-sm-10 col-sm-offset-1">

    <h1 style="text-align:center;"><?php echo $locname; ?></h1>
    <h3 style="text-align:center;">Live music listings for <?php echo $locname . ', ' . $locstate . '.'; ?></h3>

</div>

<?php include($endcontentcontainer); ?>
<?php include($middlespacer); ?>
</div>

<div class="container-fluid startprojectcontentcontainer" style="background-color:#ffffff;">
<?php include($middlespacer); ?>
<?php //include($startprojectcontentcontainer); ?>
<div>
<div class="row">
<div class="col-xs-12 col-md-10">
<div class="row">
    <?php

    $locationprojects = $subdomain->projects()->where('project_active', 1)->get();
    $locationjustprojects = $locationprojects->where('project_type', "2")->shuffle();
    $locationjustmusicians = $locationprojects->where('project_type', "3")->shuffle();

    if (is_null($locationprojects)){
        echo '<p>No live music listings are available at this time.</p>';
    }

    echo '<div class="col-xs-12 col-sm-8"><div class="row"><div class="col-xs-12"><h4 style="text-align:center;">Bands/Music Projects</h4><hr/></div>';

    foreach ($locationjustprojects as $locationproject){
        //if ($locationproject->project_type == 2) {

            if ($locationproject->projectsettings->custom_domain == 1) {
                $projecturlstring = '//www.' . $locationproject->customdomain->customdomain_url;
            }
            else { $projecturlstring = env('PROJECT_URL') . $locationproject->project_url; }

            $backgroundimg = $locationproject->backgroundimages()/*->orderBy('bannerimage_id', 'desc')*/->first();
            if ($backgroundimg === null){}
            else {
            $bimageid = $backgroundimg['backgroundimage_uniqueid'];

            if ($locationproject->tagline != null){ $taglinestring = $locationproject->tagline->tagline_content; }
            else { $taglinestring = '&nbsp;'; }

            $childbgimagestring = '';
            if ($locationproject->childprojects != null) {
                foreach ($locationproject->childprojects as $childproject) {
                    $childbgimage = $childproject->backgroundimages()->first();
                    if ($childbgimage === null) { $childbgimagestring = ''; }
                    else {
                        $childbgimagefilename = md5($childbgimage['backgroundimage_uniqueid']);
                        $childbgimagestring .= '<div class="col-xs-2 col-sm-3 col-md-2" style="padding-left:0;padding-right:1%;padding-top:1%;"><a href="' . $projecturlstring . '"><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/bt/' . $childbgimagefilename . '.jpg"></a></div>';
                        }
                }
            }
            else { $childbgimagestring = ''; }

            echo '
                <div class="col-xs-12 border-radius-all" style="position:relative;margin-bottom:10px;">
                    <div class="row">

                        <div class="hidden-xs col-sm-6 col-md-5 col-lg-4">
                            <a href="' . $projecturlstring . '">
                                <img class="img img-responsive border-radius-diagonal" src="//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($bimageid) . '.jpg">
                            </a>
                        </div>

                        <div class="col-xs-12 col-sm-6 col-md-7 col-lg-8">
                            <a href="' . $projecturlstring . '">
                                <h4 class="" style="margin-top:0px;margin-bottom:3px;display:inline-block;">' . $locationproject->project_name . '</h4>
                            </a><br/>
                            <em>' . $taglinestring . '</em>
                            <div class="row" style="padding-left:15px;padding-right:15px;">' . $childbgimagestring . '
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>';
            }
    }

/*  Prior design for project thumbnails:
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 border-radius-all" style="position:relative;margin-bottom:10px;">
                    <a href="' . $projecturlstring . '">

                        <img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($bimageid) . '.jpg">
                        <div class="titlebackground border-radius-bottom" style="position:absolute;bottom:0px;width:100%; padding-bottom:10px;">
                            <h2 class="projectnameheader2" style="text-align:center;">' . $locationproject->project_name . '</h2>
                            <p class="projecttaglineheader" style="text-align:center;letter-spacing:.4px;color:#333333;display:none;"><em>' . $taglinestring . '</em></p>
                        </div>
                    </a>
                </div>
 */

    echo '</div></div>';
    echo '<div class="col-xs-12 col-sm-4"><div class="row"><div class="col-xs-12"><h4 style="text-align:center;">Musicians/Solo Artists</h4><hr/></div>';
    foreach ($locationjustmusicians as $locationproject){
        //if ($locationproject->project_type == 2) {

            $backgroundimg = $locationproject->backgroundimages()/*->orderBy('bannerimage_id', 'desc')*/->first();
            if ($backgroundimg === null){}
            else {
            $bimageid = $backgroundimg['backgroundimage_uniqueid'];

            if ($locationproject->projectsettings->about_active == 1) {
                $musicianaboutstring = '';
                //$locationproject->about->about_content;
            }
            else {
                $musicianaboutstring = ''; //$locationproject->about->about_content;
            }

            if ($locationproject->tagline != null and $locationproject->tagline->tagline_content != ''){ $taglinestring = '<br/><em>' . $locationproject->tagline->tagline_content . '</em>'; }
            else { $taglinestring = ''; }
            echo '
                <div class="col-xs-12 border-radius-all nopadding" style="position:relative;margin-bottom:10px;">

                        <div class="row">
                        <div class="col-xs-12">
                        <div class="col-sm-4 col-xs-5">
                        <a href="' . env('PROJECT_URL') . $locationproject->project_url . '">
                        <img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/bt/' . md5($bimageid) . '.jpg" style="display:inline-block;border-top-left-radius:5px;border-bottom-left-radius:5px;">
                        </a>
                        </div><a href="' . env('PROJECT_URL') . $locationproject->project_url . '"><strong>

                            ' . $locationproject->project_name . '</strong></a>' . $taglinestring . '<br/>' . $musicianaboutstring . '

                        </div>
                        </div>
                    </a>
                </div>';
            }
    }
    echo '</div></div>';
//
    ?>
    </div>
</div>
<div class="col-md-2">

</div>
<?php include($endcontentcontainer); ?>
<?php include($middlespacer); ?>
</div>

<div class="container-fluid startprojectcontentcontainer" style="background-color:#ffffff;">
<?php include($middlespacer); ?>
<?php include_once($scripts); ?>
</div>
</body>

</html>