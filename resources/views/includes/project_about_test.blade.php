<div id="aboutcontainer" class="container-fluid startprojectcontentcontainer fullheight nopadding">
<div id="aboutbackground" class="fullheight sectionbackgroundcontainer" style="display:block;position:absolute;z-index:-9999;width:100%;height:100%;padding:0px;margin:0px;"></div>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<h1 style="font-variant:small-caps;">About</h1>
</div>
    <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">

        <a class="btn btn-link" href="<?php
        if ($project->projectsettings->tour_active == 1) { echo '#tour'; }
        else { echo '#top'; }
    ?>"><i class="fa fa-chevron-up"></i></a>
        <a class="btn btn-link" href="<?php
        if ($project->projectsettings->audio_active == 1){ echo '#audio'; }
        else if ($project->projectsettings->video_active == 1){ echo '#video'; }
        else if ($project->projectsettings->images_active == 1){ echo '#images'; }
        else if ($project->projectsettings->social_active == 1) { echo '#social'; }
        else if ($project->projectsettings->contact_active == 1) { echo '#contact'; }
    ?>"><i class="fa fa-chevron-down"></i></a>
    </div>
<div class="col-xs-12">
<div id="info"></div>
<div class="abouttext twocolumn">

        <?php
        if ($project->about != null){
            $projectaboutcontent = $project->about->about_content;
            echo $projectaboutcontent;
            echo '<hr/>';
        }
        ?>

<?php
//if ($project->project_type == 2) {
    $childprojects = $project->childprojects;
    if ($childprojects != '[]') {
        echo '<div id="members"></div><h4><strong>' . $project->project_name . ':</strong></h4>';
        echo '
            <script>
            $(document).ready(function(){
                function hideoverflow(){
                    $(".memberimage").each(function(index){
                        var h = $(this).height();
                        var thismemberabout = document.getElementById("memberabout-" + index);
                        var scrollheight = thismemberabout.scrollHeight;
                        console.log(index);
                        if (scrollheight > h) {
                            console.log("overflow detected");
                            console.log(h);



                            function makemore() {
                            console.log("makemore triggered");
                            $("#memberabout-" + index).height(h - 20);
                            $("#memberabout-" + index).css({ "overflow": "hidden" });
                                $("#membermore-" + index).html(\'<a style="text-align:center;" id="membermorelink-\' + index + \'">More</a>\');
                                $("#membermorelink-" + index).on("click", function(){
                                    $("#memberabout-" + index).css({ "overflow": "visible" });
                                    $("#memberabout-" + index).height(scrollheight);
                                    $("#membermore-" + index).html(\'<a style="text-align:center;" id="membermorelink-\' + index + \'">Less</a>\');
                                    //$("#membermorelink-" + index).off("click");
                                    $("#membermorelink-" + index).click(function(){makemore()});
                                })
                            }
                            makemore();
                        }
                        else {
                            $("#membermore-" + index).html("");
                            $("#memberabout-" + index).css({ "height": "" });
                        }
                })
                }
                $(".memberimage").load(function(){
                    hideoverflow();
                })

                $(window).load(function(){
                    hideoverflow();
                })

                $(window).resize(function(){
                    hideoverflow();
                });
            })
            </script>';
    }
    $x = 0;
    foreach ($childprojects as $childproject) {
        if ($childproject->project_active == 1) {
            $backgroundimg = $childproject->backgroundimages()->first();
            if ($backgroundimg === null){}
            else {
            $bimageid = $backgroundimg['backgroundimage_uniqueid'];

            if ($childproject->tagline != null){ $taglinestring = $childproject->tagline->tagline_content; }
            else { $taglinestring = '&nbsp;'; }

            if ($childproject->about != null && $childproject->projectsettings->about_active == 1){
                $aboutstring = $childproject->about->about_content;
                /*
                if (strlen($aboutstring) > 300) {
                    $aboutsubstring = substr($aboutstring, 0, strrpos(substr($aboutstring, 0, 300), ' '));
                }
                else {
                    $aboutsubstring = $aboutstring;
                }
                */
            }
            else { $aboutstring = '&nbsp;'; }

            echo '
                <div style="display:inline-block;width:100%;">
                    <div style="position:relative;margin-bottom:10px;">
                        <a href="' . env('PROJECT_URL') . $childproject->project_url . '">
                            <img class="img img-responsive memberimage" src="//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($bimageid) . '.jpg">
                            <div class="titlebackground border-radius-bottom" style="position:absolute;bottom:0px;width:100%; padding-bottom:10px;">
                                <h2 class="projectnameheader2" style="text-align:center;">' . $childproject->project_name . '</h2>
                                <p class="projecttaglineheader" style="text-align:center;letter-spacing:.4px;color:#333333;display:none;"><em>' . $taglinestring . '</em></p>
                            </div>
                        </a>
                    </div>
                    <div class="memberabout" id="memberabout-'. $x . '" style="overflow:hidden;">' . $aboutstring . '</div>
                    <div id="membermore-' . $x . '" style="display:block;text-align:center;"></div>
                    <hr/>
                </div>
                ';
                $x++;
            }
        }
    }
//}
?>
</div></div>
<?php
//if ($project->project_type == 2) {
    $parentprojects = $project->parentprojects;
    if ($parentprojects != '[]') {
        echo '<div class="col-xs-12"><div id="projects"></div><br><h3 style="text-align: center;">Projects</h3><br><div class="abouttext twocolumn">';
        echo '
            <script>

            $(document).ready(function(){
                function projecthideoverflow(){
                    $(".projectimage").each(function(index){
                        var h = $(this).height();
                        var thisprojectabout = document.getElementById("projectabout-" + index);
                        var scrollheight = thisprojectabout.scrollHeight;
                        console.log(index);
                        if (scrollheight > h) {
                            console.log("overflow detected");
                            console.log(h);

                            function projectmakemore() {
                            console.log("projectmakemore triggered");
                            $("#projectabout-" + index).height(h - 20);
                            $("#projectabout-" + index).css({ "overflow": "hidden" });
                                $("#projectmore-" + index).html(\'<a style="text-align:center;" id="projectmorelink-\' + index + \'">More</a>\');
                                $("#projectmorelink-" + index).on("click", function(){
                                    $("#projectabout-" + index).css({ "overflow": "visible" });
                                    $("#projectabout-" + index).height(scrollheight);
                                    $("#projectmore-" + index).html(\'<a style="text-align:center;" id="projectmorelink-\' + index + \'">Less</a>\');
                                    //$("#membermorelink-" + index).off("click");
                                    $("#projectmorelink-" + index).click(function(){projectmakemore()});
                                })
                            }
                            projectmakemore();
                        }
                        else {
                            $("#projectmore-" + index).html("");
                            $("#projectabout-" + index).css({ "height": "" });
                        }
                })
                }

                $(".projectimage").load(function(){
                    projecthideoverflow();
                })

                $(window).load(function(){
                    projecthideoverflow();
                })

                $(window).resize(function(){
                    projecthideoverflow();
                });
            })
            </script>';
    }
    $x = 0;
    foreach ($parentprojects as $parentproject) {
        if ($parentproject->project_active == 1) {
            $backgroundimg = $parentproject->backgroundimages()->first();
            if ($backgroundimg === null){}
            else {
            $bimageid = $backgroundimg['backgroundimage_uniqueid'];

            if ($parentproject->tagline != null){ $taglinestring = $parentproject->tagline->tagline_content; }
            else { $taglinestring = '&nbsp;'; }

            if ($parentproject->about != null && $parentproject->projectsettings->about_active == 1){ $aboutstring = $parentproject->about->about_content; }
            else { $aboutstring = '&nbsp;'; }

            echo '
                <div style="display:inline-block">
                    <div style="position:relative;margin-bottom:10px;">
                        <a href="' . env('PROJECT_URL') . $parentproject->project_url . '">
                            <img class="img img-responsive projectimage" src="//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($bimageid) . '.jpg">
                            <div class="titlebackground border-radius-bottom" style="position:absolute;bottom:0px;width:100%; padding-bottom:10px;">
                                <h2 class="projectnameheader2" style="text-align:center;">' . $parentproject->project_name . '</h2>
                                <p class="projecttaglineheader" style="text-align:center;letter-spacing:.4px;color:#333333;display:none;"><em>' . $taglinestring . '</em></p>
                            </div>
                        </a>
                    </div>
                    <div class="projectabout" id="projectabout-'. $x . '" style="overflow:hidden;">' . $aboutstring . '</div>
                    <div id="projectmore-' . $x . '" style="display:block;text-align:center;"></div>
                    <hr/>
                </div>
                ';
            }
        }
        $x++;
    }
    if ($parentprojects != '[]') { echo '</div></div>'; }
//}
?>


<?php include($endcontentcontainer); ?>
</div>