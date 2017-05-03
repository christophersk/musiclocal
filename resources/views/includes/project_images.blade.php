<div class="container-fluid startprojectcontentcontainer fullheight">

<?php include($startprojectcontentcontainer); ?>
<div id="content-modal"></div>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">Images</h1>
</div>
<div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
    <a class="btn btn-link" href="<?php
        if ($project->projectsettings->video_active == 1) { echo '#video'; }
        else if ($project->projectsettings->audio_active == 1) { echo '#audio'; }
        else if ($project->projectsettings->about_active == 1) { echo '#about'; }
        else if ($project->projectsettings->tour_active == 1) { echo '#tour'; }
        else { echo '#top'; }
    ?>"><i class="fa fa-chevron-up"></i></a>
    <a class="btn btn-link" href="<?php
        if ($project->projectsettings->social_active == 1) { echo '#social'; }
        else if ($project->projectsettings->contact_active == 1) { echo '#contact'; }
    ?>"><i class="fa fa-chevron-down"></i></a>
</div>
<div class="col-xs-12"><noscript>You must have javascript enabled to view images.</noscript>
<?php
$latestphotoalbum = $project->photoalbums()->orderBy('photoalbum_id', 'desc')->first();
if ($latestphotoalbum === null){}
else {
    //echo '<div><iframe src="/embeddables/photoalbum?photoalbum_id=' . $latestphotoalbum->photoalbum_id . '" scrolling="no" style="width:100%; height:600px; overflow:hidden; border:none"></iframe></div>';
    echo '

    <div id="datadiv" data-photoalbumid="' . $latestphotoalbum->photoalbum_id . '"></div>
        <div id="testcontainer4">
        </div>
        <script src="' . url('js/react/musiclocal_embeddedphotoalbum.js') . '"></script>
        <script>
        $(document).ready(function(){
            ReactDOM.render(React.createElement(CurrentAlbum, { url: "" }), document.getElementById("testcontainer4"));
        });
        </script>
        ';

    }
?>
</div>

<?php include($endcontentcontainer); ?>
</div>