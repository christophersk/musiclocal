<div id="tourcontainer" class="container-fluid startprojectcontentcontainer fullheight nopadding">
<div id="tourbackground" class="fullheight sectionbackgroundcontainer" style="display:block;position:absolute;z-index:-9999;width:100%;height:100%;padding:0px;margin:0px;background-color:#ffffff;"></div>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Shows</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="<?php
        if ($project->projectsettings->about_active == 1) { echo '#about'; }
        else { echo '#top'; }
    ?>"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="<?php
        if ($project->projectsettings->audio_active == 1){ echo '#audio"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->video_active == 1){ echo '#video"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->images_active == 1){ echo '#images"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->social_active == 1) { echo '#social"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->contact_active == 1) { echo '#contact"><i class="fa fa-chevron-down"></i>'; }
        else {echo '#top"><i class="fa fa-circle-o"></i>';}
    ?></a>
</div>

<div class="col-xs-12">

<?php

$tourwidget_selection = $project->projectsettings->tourwidget_selection;
if ($tourwidget_selection == 0){

}

else if ($tourwidget_selection == 1){
    $bandsintownwidget_artistname = $project->bandsintownwidget->bandsintownwidget_artistname;
    if ($bandsintownwidget_artistname != null) {
        echo '<script async src="http://widget.bandsintown.com/javascripts/bit_widget.js"></script>';
        echo '<a href="https://www.bandsintown.com/' . rawurlencode($bandsintownwidget_artistname) . '" class="bit-widget-initializer" data-prefix="fbjs" data-display-limit="20" data-artist="' . $project->bandsintownwidget->bandsintownwidget_artistname . '" data-force-narrow-layout="false" data-text-color="#333333">' . $project->bandsintownwidget->bandsintownwidget_artistname . ' Tour Dates</a>';
    }
}

else if ($tourwidget_selection == 2){
    $rn_script = $project->reverbnationwidget->reverbnationwidget_script;
    if ($rn_script != null) {
        echo $rn_script;
    }
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

</div>