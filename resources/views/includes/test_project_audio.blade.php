<div id="audio">
    <?php if ($project->soundcloudwidget === null) {}
    else {
        if ($project->soundcloudwidget->soundcloudwidget_script === null) {}
        else {

            if ($project->project_url == 'katieskene'){$previd = '#tour';} else {$previd = '#about';}
            echo '<div id="audiocontainer" class="container-fluid startprojectcontentcontainer fullheight nopadding">';
            echo '<div id="audiobackground" style="position:absolute;z-index:-9999;width:100%;height:100%;padding:0px;margin:0px;"></div>';
            include($startprojectcontentcontainer);
            echo '
                <div class="col-xs-12" style="text-align:center;">
                <h1 style="font-variant:small-caps;">Audio</h1>
            </div>
                <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
                <a class="btn btn-link" href="' . $previd . '"><i class="fa fa-chevron-up"></i></a>
                <a class="btn btn-link" href="#images"><i class="fa fa-chevron-down"></i></a>
            </div>
            <div class="col-xs-12" style="padding-top:2%;">' . $project->soundcloudwidget->soundcloudwidget_script . '</div>';
            include ($endcontentcontainer);
            echo '</div></div>';
        }
    }
     ?>

</div>

<script>
$(document).ready(function(){

    var w = window.innerWidth;
    var filename = '<?php if (isset($backgroundimage_audio)) { echo md5($backgroundimage_audio->backgroundimage_uniqueid); } ?>';
    console.log('filename is ' + filename);
    if (filename != '') {
        var selectbackgroundimagefunction = function(){
            var align_horizontal = '<?php if (isset($backgroundimage_audio)) { echo $backgroundimage_audio->pivot->align_horizontal; } ?>';
            var align_vertical = '<?php if (isset($backgroundimage_audio)) { echo $backgroundimage_audio->pivot->align_vertical; } ?>';

            console.log('align horizontal is ' + align_horizontal);
            console.log('align vertical is ' + align_vertical);
            //function getbackgroundposition(){
                if (align_horizontal == 0) { var align_horizontal_string = '0%'; }
                else if (align_horizontal == 2 ) { var align_horizontal_string = '100%'; }
                else { var align_horizontal_string = '50%'; }

                if (align_vertical == 0) { var align_vertical_string = '0%'; }
                else if (align_vertical == 2 ) { var align_vertical_string = '100%'; }
                else { var align_vertical_string = '50%'; }

                //function setbackgroundposition(){
                    console.log(align_horizontal_string);
                    console.log(align_vertical_string);
                    $("#audiobackground").css({"background-position": align_horizontal_string + " " + align_vertical_string });

                //}

                //setbackgroundposition();
            //}

            //getbackgroundposition();




            if (w < 768) {
                //var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                //imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                //    $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                //});
                //imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/xs/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
            }
            else if (w < 992) {
            /*
                var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                    $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                });
                imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/sm/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
            */
            }
            else if (w < 1200) {
            /*
                var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                    $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                });
                imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/md/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
                */
            }
            else {
                console.log('large detected');
                var backgroundimage_audio_url = "//d1y0bevpkkhybk.cloudfront.net/b/" + filename + ".jpg";
                $("#audiobackground").css({"background-image": 'url("' + backgroundimage_audio_url + '")', "filter": "grayscale(90%) opacity(5%) brightness(200%)", "-webkit-filter": "grayscale(90%) opacity(5%) brightness(200%)"});
                /*
                var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                    $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                });
                imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
                */
                }
        };

        selectbackgroundimagefunction();

        $(window).resize(function(){
            selectbackgroundimagefunction();
        });

    }
});
</script>