<?php
$page = 'Shows';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($project_navbar);
require_once($project_navbar_top);
require_once($navbar_bottom);

        use App\Project;
        use App\Event;
        use Carbon\Carbon;



        $projectbannerimages = $project->bannerimages;

?>

<!doctype html>
<html>
@include ('includes.project_head')
@include ('includes.head_linkedresources')

<body>

<?php echo $nav_top; ?>
<?php echo $nav_bottom; ?>

@include ('includes.project_top-spacer')

@include ('includes.title-header_project')

<?php include($middlespacer); ?>

@include ('includes.project_image-header')

<?php //include($middlespacer); ?>

<div class="container container-fixed">
<div class="row outershadow" style="padding-left:5px; padding-right:5px;border-top:0px;">
<div class="col-xs-12 nopadding">

</div>
</div>
</div>

<?php //include($middlespacer); ?>



<?php include($middlespacer); ?>

<?php include($startprojectcontentcontainer); ?>
@include('includes.project_titlebar')
<div class="col-sm-10 col-sm-offset-1 col-xs-12">

<?php

if ($project->bandsintownwidget_active == 1){
echo '<script src="http://widget.bandsintown.com/javascripts/bit_widget.js"></script>';
echo '<a href="https://www.bandsintown.com/' . rawurlencode($project->bandsintownwidget->bandsintownwidget_artistname) . '" class="bit-widget-initializer" data-prefix="fbjs" data-artist="' . $project->bandsintownwidget->bandsintownwidget_artistname . '" data-force-narrow-layout="true" data-text-color="#ffffff">' . $project->bandsintownwidget->bandsintownwidget_artistname . ' Tour Dates</a>';

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

<?php include($middlespacer); ?>
@include ('includes.project_footer')
<?php include_once($scripts); ?>

</body>

</html>