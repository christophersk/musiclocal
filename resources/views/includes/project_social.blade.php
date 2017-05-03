<div id="socialcontainer" class="container-fluid startprojectcontentcontainer fullheight nopadding">
<div id="socialbackground" class="fullheight sectionbackgroundcontainer" style="display:block;position:absolute;z-index:-9999;width:100%;height:100%;padding:0px;margin:0px;background-color:#ffffff;"></div>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Social</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="<?php
        if ($project->projectsettings->images_active == 1){ echo '#images'; }
        else if ($project->projectsettings->video_active == 1) { echo '#video'; }
        else if ($project->projectsettings->audio_active == 1) { echo '#audio'; }
        else if ($project->projectsettings->about_active == 1) { echo '#about'; }
        else if ($project->projectsettings->tour_active == 1) { echo '#tour'; }
        else { echo '#top'; }
    ?>"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="<?php
    if ($project->projectsettings->contact_active) { echo '#contact"><i class="fa fa-chevron-down"></i>'; }
    else {echo '#top"><i class="fa fa-circle-o"></i>';}
    ?></a>
</div>
<?php
if ($project->instagramwidget === null){}
else {
    if ($project->instagramwidget->instagramwidget_script === null) {}
    else {
        echo '<div class="col-xs-12" style="text-align:center;padding-top:3%;"><h3>Instagram</h3>' . $projectinstagramwidgetpath = $project->instagramwidget->instagramwidget_script . '</div>';
    }
}
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
</div>