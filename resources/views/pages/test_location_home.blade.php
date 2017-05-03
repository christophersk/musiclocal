<?php
$page = 'Home';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);

$locname = $subdomain->location_name;
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

@include ('includes.section_head')
<?php include($head_linkedresources_project01); ?>
<?php //echo $nav_top; ?>
<body id="top" style="background-color:#c1c8c8;">

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

</div>

<?php include($endcontentcontainer); ?>
<?php include($middlespacer); ?>
</div>

<div class="container-fluid startprojectcontentcontainer" style="background-color:#ffffff;">
<?php include($middlespacer); ?>
<?php //include($startprojectcontentcontainer); ?>
<div>
<div class="row">
<div class="col-sm-10">
<div class="row">
<?php

    $locationprojects = $subdomain->projects()->where('project_active', 1)->get();

    if (is_null($locationprojects)){
        echo '<p>No live music listings are available at this time.</p>';
    }
?>
    @foreach ($locationprojects as $project)
        <div class="col-md-4 col-xs-6">
        <?php $projectbackgroundimages = $project->backgroundimages;


foreach ($project->backgroundimages as $backgroundimage) {
    if ($backgroundimage->pivot->section_id == 1) {$backgroundimage_about = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 2) {$backgroundimage_tour = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 3) {$backgroundimage_video = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 4) { $backgroundimage_audio = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 5) { $backgroundimage_images = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 6) { $backgroundimage_contact = $backgroundimage; }
    else if ($backgroundimage->pivot->section_id == 7) { $backgroundimage_social = $backgroundimage; }
} ?>
        @include('pages.project_card', ['project' => 'project'])
        </div>
    @endforeach

    </div>
</div>
<div class="col-sm-2">

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