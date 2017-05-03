<div class="container container-fixed" id="footer">
    <div class="row bottomround contentcolor" style="padding-top:30px;">

        <div class="col-sm-12 " style="padding-top:10px;padding-bottom:10px;">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1" style="border-top:1px; border-top-color:#333333; border-top-style:solid; padding-top:20px;">
                    <div class="row">
                        <div class="col-xs-3">
                            <h4 style="color:#9d9d9d"><?php echo $project->project_name; ?></h4>

                            <?php
                                if ($project->projectsettings->tour_active == 1) {
                                echo '<p><a href="#tour">Tour</a></p>';
                                }
                                if ($project->projectsettings->about_active == 1) {
                                    echo '<p><a href="#about">About</a></p>';
                                }
                                if ($project->projectsettings->video_active == 1) {
                                    echo '<p><a href="#video">Video</a></p>';
                                }
                                if ($project->projectsettings->images_active == 1) {
                                    echo '<p><a href="#images">Images</a></p>';
                                }
                                if ($project->projectsettings->social_active == 1) {
                                    echo '<p><a href="#social">Social</a></p>';
                                }
                                ?>
                        </div>

                        <div class="col-xs-3">
                            <h4 style="color:#9d9d9d">Booking</h4>
                            <p><a href="#contact">Contact</a></p>
                            {{--<p><a href="{{ url($project->project_url) }}/artwork">Artwork</a></p>--}}
                        </div>

                        <div class="col-xs-3">
                            <h4 style="color:#9d9d9d">Contact</h4>
                            <?php
                                if ($project->projectsettings->contact_active == 1) {
                                    echo '<p><a href="#contact">Contact</a></p>';
                                }
                            ?>
                            <!--<p><a href="/blog">Blog</a></p>-->
                        </div>

                        <div class="col-xs-3">
                        <?php
                            if ($project->facebookwidget === null && $project->instagramwidget === null && $project->youtubewidget === null && $project->soundcloudwidget === null && $project->twitterwidget === null) {}
                            else { echo '<h4 style="color:#9d9d9d">Social Media</h4>'; }
                        ?>
                            <!--<p><a href="" target="_blank">Instagram</a></p>-->
                            <?php
                                if ($project->facebookwidget === null){}
                                else {
                                    echo '
                                    <p>
                                        <a href="https://facebook.com/' . $project->facebookwidget->facebookwidget_path . '" target="new">Facebook</a>
                                    </p>';
                                }
                                if ($project->instagramwidget === null){}
                                else {
                                    if ($project->instagramwidget->instagramwidget_path === null) {}
                                    else {
                                        echo '
                                        <p>
                                        <a href="https://instagram.com/' . $project->instagramwidget->instagramwidget_path . '" target="new">
                                            Instagram</a>
                                        </p>';
                                    }
                                }
                                if ($project->youtubewidget === null){}
                                else {
                                    echo '
                                    <p>
                                    <a href="https://youtube.com/' . $project->youtubewidget->youtubewidget_path . '" target="new">
                                        Youtube</a>
                                    </p>';
                                }
                                if ($project->soundcloudwidget === null){}
                                else {
                                    if ($project->soundcloudwidget->soundcloudwidget_path === null) {}
                                    else {
                                        echo '
                                        <p>
                                        <a href="https://soundcloud.com/' . $project->soundcloudwidget->soundcloudwidget_path . '" target="new">
                                            Soundcloud</a>
                                        </p>';
                                    }
                                }
                                if ($project->twitterwidget === null){}
                                else {
                                    echo '
                                    <p>
                                    <a href="https://twitter.com/' . $project->twitterwidget->twitterwidget_path . '" target="new">
                                        Twitter</a>
                                    </p>';
                                }
                            ?>
                            <!--<p><a href="" target="_blank">Flickr</a></p>-->
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12" style="padding-top:30px; padding-bottom:5px;">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container container-fixed startprojectcontentcontainer" style="margin-top:10px;">
    <div class="row">
        <div class="col-md-10 col-md-offset-1" style="color:rgba(255,255,255,.70);">
            <div class="text-muted" style="display:block; text-align:center;">
                <small>Created by {{ $project->project_name }} with MusicLocal.</small>
            </div>
            <footer style="padding-top:20px; padding-bottom:20px; color:rgba(255,255,255,0.70);"></footer>
        </div>
    </div>
    <div id="contentend" style="padding-top:70px;"></div>
</div>

