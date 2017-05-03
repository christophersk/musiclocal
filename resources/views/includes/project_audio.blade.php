
    <?php if ($project->soundcloudwidget === null) {}
    else {
        if ($project->soundcloudwidget->soundcloudwidget_script === null) {}
        else {
            echo '<div id="audiocontainer" class="container-fluid startprojectcontentcontainer fullheight nopadding">';
            echo '<div id="audiobackground" class="fullheight sectionbackgroundcontainer" style="display:block;position:absolute;z-index:-9999;width:100%;height:100%;padding:0px;margin:0px;"></div>';
            include($startprojectcontentcontainer);
?>
                <div class="col-xs-12" style="text-align:center;">
                <h1 style="font-variant:small-caps;">Audio</h1>
            </div>
                <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
                <a class="btn btn-link" href="<?php
        if ($project->projectsettings->video_active == 1) { echo '#video'; }
        else if ($project->projectsettings->tour_active == 1) { echo '#tour'; }
        else if ($project->projectsettings->about_active == 1) { echo '#about'; }
        else { echo '#top'; }
    ?>"><i class="fa fa-chevron-up"></i></a>
                <a class="btn btn-link" href="<?php
        if ($project->projectsettings->social_active == 1) { echo '#social"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->contact_active == 1) { echo '#contact"><i class="fa fa-chevron-down"></i>'; }
        else {echo '#top"><i class="fa fa-circle-o"></i>';}
    ?></a>
            </div>

            <?php echo '<div class="col-xs-12" style="padding-top:2%;">' . $project->soundcloudwidget->soundcloudwidget_script . '</div>';
            include ($endcontentcontainer);
            echo '</div>';
        }
    }
     ?>