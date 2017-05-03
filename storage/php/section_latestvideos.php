<?php
use App\Project;

$latestvideos = Project::find($project->project_id)->youtubevideos()->orderBy('youtubevideo_id', 'desc')->get();

if ($latestvideos === null){}
else if ($latestvideos->count() == 1) {
foreach ($latestvideos as $latestvideo) {
    echo '
<div class="col-xs-12">
<div class="embed-responsive embed-responsive-16by9">
<iframe class="embed-responsive-item" id="ytplayer" type="text/html" src="//www.youtube.com/embed/' . $latestvideo->youtubevideo_identifier . '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0" allowFullScreen frameBorder="0"></iframe>
</div><br/></div>';
}
}
else {
$i = 0;
echo '<div class="row">';
foreach ($latestvideos as $latestvideo) {
if ($i == 0) {
    echo '
<div class="col-xs-12 center-block">
<div class="embed-responsive embed-responsive-16by9">
<iframe class="embed-responsive-item" id="ytplayer" type="text/html" src="//www.youtube.com/embed/' . $latestvideo->youtubevideo_identifier . '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0" allowFullScreen frameBorder="0"></iframe>
</div><br/></div>';
}
else {
    echo '
<div class="col-xs-12 col-sm-6">
    <div class="embed-responsive embed-responsive-16by9">
<iframe class="embed-responsive-item" id="ytplayer" type="text/html" src="//www.youtube.com/embed/' . $latestvideo->youtubevideo_identifier . '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0" allowFullScreen frameBorder="0"></iframe>
</div><br/></div>
    ';
}
$i++;
}
echo '</div>';
}

?>