<?php
$page = 'Media';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($project_navbar);
require_once($project_navbar_top);
require_once($navbar_bottom);

        use App\Project;
        use App\Event;
        use Carbon\Carbon;


        $projectphotoalbums = $project->photoalbums;
        $projectbannerimages = $project->bannerimages;
        $projectyoutubevideos = $project->youtubevideos;

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


<?php include($middlespacer); ?>

<?php include($startprojectcontentcontainer); ?>
@include('includes.project_titlebar')

<div class="col-sm-4 col-sm-offset-1">

<?php
foreach ($projectyoutubevideos as $projectyoutubevideo){
    echo '<div style="height:54px;"></div><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" id="ytplayer" type="text/html" src="//www.youtube.com/embed/' . $projectyoutubevideo->youtubevideo_identifier . '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0" allowFullScreen frameBorder="0"></iframe></div>';
}
?>

</div>

<div class="col-sm-6">

<?php
foreach ($projectphotoalbums as $projectphotoalbum){
    echo '<div><iframe src="//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' . $projectphotoalbum->photoalbum_id . '" style="width:100%; height:600px; overflow-x:hidden; border:none"></iframe></div>';
}
?>

</div>





<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>
@include ('includes.project_footer')
<?php include_once($scripts); ?>

</body>

</html>