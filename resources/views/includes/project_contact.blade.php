<div class="container-fluid startprojectcontentcontainer fullheight nopadding">
<div id="contactbackground" class="fullheight sectionbackgroundcontainer" style="display:block;position:absolute;z-index:-9999;width:100%;height:100%;padding:0px;margin:0px;"></div>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Contact</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="<?php
        if ($project->projectsettings->social_active == 1){ echo '#social'; }
        else if ($project->projectsettings->images_active == 1){ echo '#images'; }
        else if ($project->projectsettings->video_active == 1) { echo '#video'; }
        else if ($project->projectsettings->audio_active == 1) { echo '#audio'; }
        else if ($project->projectsettings->about_active == 1) { echo '#about'; }
        else if ($project->projectsettings->tour_active == 1) { echo '#tour'; }
        else { echo '#top'; }
    ?>"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="#top"><i class="fa fa-circle-o"></i></a>
</div>
<div class="col-xs-12">
<p style="text-align:center;">
<?php
use App\Project;
$contactinfo = Project::find($project->project_id)->contactinfo()->first();
if($contactinfo === null){}
else {
    echo substr_replace($contactinfo->contactinfo_email, '<span style="display:none;">n-spm</span>', 4, 0);
}

?>

</p>
</div>

<?php include($endcontentcontainer); ?>
</div>