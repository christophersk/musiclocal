<div id="aboutcontainer" class="container-fluid startprojectcontentcontainer fullheight nopadding">
<div id="aboutbackground" class="fullheight sectionbackgroundcontainer" style="display:block;position:absolute;z-index:-9999;width:100%;height:100%;padding:0px;margin:0px;"></div>
<?php include($startprojectcontentcontainer); ?>
<div class="col-xs-12" style="text-align:center;">
<?php
         if ($project->project_type == 3) { $abouttext = 'Bio'; }
         else { $abouttext = 'About'; }
         echo '<h1 style="font-variant:small-caps;">' . $abouttext . '</h1>';
?>

</div>
    <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">

        <a class="btn btn-link" href="#top"><i class="fa fa-chevron-up"></i></a>
        <a class="btn btn-link" href="<?php
        if ($project->projectsettings->tour_active == 1){ echo '#tour"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->video_active == 1){ echo '#video"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->audio_active == 1){ echo '#audio"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->social_active == 1) { echo '#social"><i class="fa fa-chevron-down"></i>'; }
        else if ($project->projectsettings->contact_active == 1) { echo '#contact"><i class="fa fa-chevron-down"></i>'; }
        else {echo '#top"><i class="fa fa-circle-o"></i>';}
    ?></a>
    </div>
<div class="col-xs-12">
<div id="info"></div>
<div class="abouttext">

        <?php
        if ($project->about != null){
            $projectaboutcontent = $project->about->about_content;
            echo $projectaboutcontent;
            echo '<hr/>';
        }
        ?>
</div></div>
<?php
//if ($project->project_type == 2) {
    $childprojects = $project->childprojects;
    if ($childprojects != '[]') {
        echo '<div class="col-xs-12"><div id="members"></div><br><h3 style="text-align: center;">Members</h3><br></div><div class="abouttext">';
        echo '
            <script>
            /*
            $(document).ready(function(){
                function hideoverflow(){
                    $(".memberimage").each(function(index){
                        var h = $(this).height();
                        var thismemberabout = document.getElementById("memberabout-" + index);

                        var scrollheight = thismemberabout.scrollHeight;

                        if (scrollheight > h) {
                            function makemore() {
                            if (document.getElementById("membermorelink-" + index).dataset.state != "1"){
                                $("#memberabout-" + index).height(h);
                                $("#memberabout-" + index).css({ "overflow": "hidden" });
                                $("#membermore-" + index).html(\'<a style="text-align:center;" id="membermorelink-\' + index + \'" data-state="0">More</a>\');
                            }
                            else if (document.getElementById("membermorelink-" + index).dataset.state == "1"){
                                $("#memberabout-" + index).height(h);
                                $("#memberabout-" + index).css({ "overflow": "visible" });
                                var newscrollheight = h;
                                while (scrollheight > newscrollheight) {
                                    newscrollheight += 5;
                                    $("#memberabout-" + index).height(newscrollheight);
                                    scrollheight = thismemberabout.scrollHeight;
                                }
                                $("#membermore-" + index).html(\'<a style="text-align:center;" id="membermorelink-\' + index + \'" data-state="1">Less</a>\');
                            }
                                $("#membermorelink-" + index).on("click", function(){
                                    if (document.getElementById("membermorelink-" + index).dataset.state == "0") {
                                        $("#memberabout-" + index).css({ "overflow": "visible" });
                                        var newscrollheight = h;
                                        while (scrollheight > newscrollheight) {
                                            newscrollheight += 5;
                                            $("#memberabout-" + index).height(newscrollheight);
                                            scrollheight = thismemberabout.scrollHeight;
                                        }
                                        $("#membermore-" + index).html(\'<a style="text-align:center;" id="membermorelink-\' + index + \'" data-state="1">Less</a>\');
                                    }

                                    else if (document.getElementById("membermorelink-" + index).dataset.state == "1") {

                                            $("#memberabout-" + index).height(h);
                                            $("#memberabout-" + index).css({ "overflow": "hidden" });
                                            $("#membermore-" + index).html(\'<a style="text-align:center;" id="membermorelink-\' + index + \'" data-state="0">More</a>\');

                                    }


                                })
                                $("#membermorelink-" + index).click(function(){makemore()});
                            }
                            makemore();
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
                    $(".memberimage").each(function(index) {
                        var h = $(this).height();
                        if (($("#memberabout-" + index).height() - h) < h) {
                            console.log("toggle for " + index + " should go away");
                            $("#membermore-" + index).html(\'<a style="text-align:center;" id="membermorelink-\' + index + \'" data-state="2"></a>\');
                            $("#memberabout-" + index).css({ "height": "", "overflow": "visible" });
                        }
                    })

                });
            })
            */
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

            if ($childproject->about != null){
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

            if ($project->projectsettings->custom_domain == 1) {
                $childurlstring = $childproject->project_url;
            }
            else { $childurlstring = env('PROJECT_URL') . $childproject->project_url; }

            $imagecontent = '
                    <div class="col-xs-12">
                    <div class="col-xs-12 col-sm-6" style="position:relative;margin-bottom:10px;float:right;display:inline-block;">
                        <a href="' . $childurlstring . '">
                            <img class="img img-responsive memberimage" src="//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($bimageid) . '.jpg">
                            <div class="titlebackground border-radius-bottom" style="position:absolute;bottom:0px;width:100%; padding-bottom:10px;">
                                <h2 class="projectnameheader2" style="text-align:center;">' . $childproject->project_name . '</h2>
                                <p class="projecttaglineheader" style="text-align:center;letter-spacing:.4px;color:#333333;display:none;"><em>' . $taglinestring . '</em></p>
                            </div>
                        </a>
                    </div>';

            $textcontent = '<div class="memberabout" id="memberabout-'. $x . '" style="overflow:visible;padding-left:15px;padding-right:15px;"><strong>' . $childproject->project_name . '</strong><div style="padding-top:8px;"></div>' . $aboutstring . '</div>
                        </div><div id="membermore-' . $x . '" style="display:block;text-align:center;"><a style="text-align:center;" id="membermorelink-' . $x . '" data-state="2"></a></div>
                        ';

            $endcontent = '
                    <div class="col-xs-12">
                        <hr/>
                    </div>';
            if (($x % 2) == 1){
                echo '<div>' . $imagecontent . $textcontent . $endcontent . '</div>';
            }
            else {
                echo '<div>' . $imagecontent . $textcontent . $endcontent . '</div>';
            }
                $x++;
            }
        }
    }
    if ($childprojects != '[]') { echo '</div>'; }
//}
?>
<?php
//if ($project->project_type == 2) {
    $parentprojects = $project->parentprojects;
    if ($parentprojects != '[]') {
        echo '<div class="col-xs-12"><div id="projects"></div><br><h3 style="text-align: center;">Projects</h3><br></div><div class="abouttext">';
        echo '
            <script>/*

            $(document).ready(function(){
                function projecthideoverflow(){
                    $(".projectimage").each(function(index){
                        var h = $(this).height();
                        var thisprojectabout = document.getElementById("projectabout-" + index);
                        var scrollheight = thisprojectabout.scrollHeight;
                        if (scrollheight > h) {
                            function projectmakemore() {
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
            })*/
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

            if ($parentproject->about != null){ $aboutstring = $parentproject->about->about_content; }
            else { $aboutstring = '&nbsp;'; }

            if ($parentproject->projectsettings->custom_domain == 1) {
                $parentprojecturlstring = '//www.' . $parentproject->customdomain->customdomain_url;
            }
            else { $parentprojecturlstring = env('PROJECT_URL') . $parentproject->project_url; }

            $imagecontent = '
                    <div class="col-xs-12">
                    <div class="col-xs-12 col-sm-6" style="position:relative;margin-bottom:10px;float:right;display:inline-block;">
                        <a href="' . $parentprojecturlstring . '">
                            <img class="img img-responsive projectimage" src="//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($bimageid) . '.jpg">
                            <div class="titlebackground border-radius-bottom" style="position:absolute;bottom:0px;width:100%; padding-bottom:10px;">
                                <h2 class="projectnameheader2" style="text-align:center;">' . $parentproject->project_name . '</h2>
                                <p class="projecttaglineheader" style="text-align:center;letter-spacing:.4px;color:#333333;display:none;"><em>' . $taglinestring . '</em></p>
                            </div>
                        </a>
                    </div>';

            $textcontent = '<div class="projectabout" id="projectabout-'. $x . '" style="overflow:visible;padding-left:15px;padding-right:15px;"><strong>' . $parentproject->project_name . '</strong><div style="padding-top:8px;"></div>' . $aboutstring . '</div>
                        </div><div id="projectmore-' . $x . '" style="display:block;text-align:center;"></div>';

            $endcontent = '
                    <div class="col-xs-12">
                        <hr/>
                    </div>';
            if (($x % 2) == 1){
                echo '<div>' . $imagecontent . $textcontent . $endcontent . '</div>';
            }
            else {
                echo '<div>' . $imagecontent . $textcontent . $endcontent . '</div>';
            }
            }
        }
        $x++;
    }
    if ($parentprojects != '[]') { echo '</div>'; }
//}
?>


<?php include($endcontentcontainer); ?>
</div>