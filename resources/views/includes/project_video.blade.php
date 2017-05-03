<div id="videocontainer" class="container-fluid startprojectcontentcontainer fullheight nopadding">
<div id="videobackground" class="fullheight sectionbackgroundcontainer" style="display:block;position:absolute;z-index:-9999;width:100%;min-height:100%;padding:0px;margin:0px;"></div>
<div class="container-fluid contentcolor verticalcenterchild variablewidth">
<div class="row outershadow" style="padding-left:5px; padding-right:5px; padding-top:20px; padding-bottom:20px;">
    <div id="video-header" class="col-xs-12" style="text-align:center;">
        <h1 style="font-variant:small-caps;">Video</h1>
    </div>
    <div id="video-nav" class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
        <a class="btn btn-link" href="<?php
        if ($project->projectsettings->tour_active == 1) { echo '#tour'; }
        else if ($project->projectsettings->about_active == 1) { echo '#about'; }
        else { echo '#top'; }
    ?>"><i class="fa fa-chevron-up"></i></a>
        <a class="btn btn-link" href="<?php
        if ($project->projectsettings->audio_active == 1) { echo '#audio"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->social_active == 1) { echo '#social"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->contact_active == 1) { echo '#contact"><i class="fa fa-chevron-down"></i>'; }
        else {echo '#top"><i class="fa fa-circle-o"></i>';}
    ?></a>
    </div>

    <div class="col-xs-12">
        <?php include $latestvideos; ?>
        <br/><br/>
    </div>

        <?php include($endcontentcontainer); ?>

</div>