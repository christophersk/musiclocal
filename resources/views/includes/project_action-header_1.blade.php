<div class="hidden-xs hidden-sm container container-fixed">
    <div class="row" style="border-top-left-radius:20px; border-top-right-radius:20px; background-color:rgba(255,255,255,0.0); padding-top:10px;">
        <div class="col-md-12" style="padding-bottom:0px;text-align:center;">
            <noscript><p>Please enable javascript.</p></noscript>

<?php
                if ($project->facebookwidget === null){}
                else {
                    $projectfacebookwidgetpath = $project->facebookwidget->facebookwidget_path;

                    $facebookwidget = <<<EOD
                        <div class="actionbutton btn btn-default" style="position:relative;right:10px;">
                        <div class="fb-like" data-href="https://www.facebook.com/$projectfacebookwidgetpath" data-width="225" data-layout="standard" data-action="like" data-show-faces="false" data-share="false" style="vertical-align:middle;padding-left:10px;"></div>
                        <div id="fb-root"></div>
                        </div>
                        <script>(function(d, s, id) {
                          var js, fjs = d.getElementsByTagName(s)[0];
                          if (d.getElementById(id)) return;
                          js = d.createElement(s); js.id = id;
                          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=1618708688367645";
                          fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));</script>
EOD;

                    echo $facebookwidget;

                }

?>
        </div>
    </div>
</div>