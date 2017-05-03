<div class="container container-fixed" style="">
    <div class="row" style="border-top-left-radius:20px; border-top-right-radius:20px; background-color:rgba(255,255,255,0.0);">

        <div class="hidden-xs hidden-sm col-md-12" style="padding-bottom:0px;padding-left:0px;padding-right:0px;text-align:center;">
<?php
if (1 == 1){}
else{
echo '
<span style="padding:10px;">
<a href=""><i class="fa fa-instagram fa-2x"></i></a>
</span>';
}

if ($project->facebookwidget === null){}
else {
echo '
<span class="fa-stack fa-lg" style="margin:10px;">
<i class="fa fa-square fa-stack-2x" style="color:#ffffff"></i>
<a href="https://facebook.com/' . $project->facebookwidget->facebookwidget_path . '" target="new">
    <i class="fa fa-facebook fa-stack-1x"></i></a>
</span>';
}
if ($project->twitterwidget === null){}
else {
echo '
<span class="fa-stack fa-lg" style="margin:10px;">
<i class="fa fa-square fa-stack-2x" style="color:#ffffff"></i>
<a href="https://twitter.com/' . $project->twitterwidget->twitterwidget_path . '" target="new">
    <i class="fa fa-twitter fa-stack-1x"></i></a>
</span>';
}

if ($project->instagramwidget === null){}
else {
    if ($project->instagramwidget->instagramwidget_path === null) {}
    else {
        echo '
<span class="fa-stack fa-lg" style="margin:10px;">
<i class="fa fa-square fa-stack-2x" style="color:#ffffff"></i>
            <a href="https://instagram.com/' . $project->instagramwidget->instagramwidget_path . '" target="new">
            <i class="fa fa-instagram fa-stack-1x"></i>
            </a>
        </span>';
    }
}

if ($project->youtubewidget === null){}
else {
echo '
<span class="fa-stack fa-lg" style="margin:10px;">
<i class="fa fa-square fa-stack-2x" style="color:#ffffff"></i>
<a href="https://youtube.com/' . $project->youtubewidget->youtubewidget_path . '" target="new">
    <i class="fa fa-youtube fa-stack-1x"></i></a>
</span>';
}

if ($project->soundcloudwidget === null){}
else {
    if ($project->soundcloudwidget->soundcloudwidget_path === null) {}
    else {
        echo '
<span class="fa-stack fa-lg" style="margin:10px;">
<i class="fa fa-square fa-stack-2x" style="color:#ffffff"></i>
        <a href="https://soundcloud.com/' . $project->soundcloudwidget->soundcloudwidget_path . '" target="new">
            <i class="fa fa-soundcloud fa-stack-1x"></i></a>
        </span>';
    }
}

$rn_widget = $project->reverbnationwidget;
if ($rn_widget === null) {}
else {
    if ($rn_widget->reverbnationwidget_path === null){}
    else {

        echo '
        <span class="fa-stack fa-lg" style="margin:10px;">
        <i class="fa fa-square fa-stack-2x" style="color:#ffffff"></i>
        <a href="https://www.reverbnation.com/' . $rn_widget->reverbnationwidget_path . '" target="new">
            <i class="fa fa-star fa-stack-1x"></i></a>
        </span>';

    }
}
?>

        </div>
    </div>
</div>