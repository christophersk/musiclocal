<div class="container-fluid contentcolor" style="padding-left:0px;padding-right:0px;background-color:transparent;max-width:100%;">
    <!--<div class="row" style="display:table; height:100%;">
        <div class="col-sm-12">-->

            <!--<div class="row outershadow" style="padding:5px; padding-bottom:0px; box-sizing:border-box; max-width:3840px;">--> <!--data-spy="affix" data-offset-top="420" id="affixedbanner"-->
                <div class="" style="padding:0px;padding-bottom:0px;background-color:transparent;max-width:100%;">
                    <div id="carousel-header" class="carousel slide" data-ride="carousel" data-interval="10000" style="background-color:transparent;max-width:100%;">
                        <!-- Indicators -->
                        <ol class="carousel-indicators" id="carouselindicators" style="position:absolute;bottom:10px;margin-top:0px;margin-bottom:30px;">
                            <?php $ii = 0; ?>
                            @foreach($projectbackgroundimages as $projectbackgroundimage)
                            <li data-target="#carousel-header" data-slide-to="<?php echo $ii . '"'; if ($ii == 0){ echo ' class="active"'; } else {} ?>></li>
                            <?php $ii++; ?>
                            @endforeach
                        </ol>

                        <!-- Wrapper for slides -->
                        <div class="carousel-inner headerheight" style="background-color:transparent;max-width:100%;">
                            <!--
                              <div class="item">
                                <img src="/transparent.png" alt="Chris Skene Music">
                                <div class="carousel-caption">

                                </div>
                              </div>
                              -->
<?php
                            $i = 0;
                            foreach ($projectbackgroundimages as $projectbackgroundimage) {
                                    if ($i == 0) {
                                        $itemactive = ' active';
                                        $initialloadbgimage = '//d1y0bevpkkhybk.cloudfront.net/bt/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg';
                                    }
                                    else {
                                        $itemactive = ''; $initialloadbgimage = '';
                                    }
                                    echo '<div class="item' . $itemactive . '" style="background-color:transparent;max-width:100%;">
                                        <div style="background-color:transparent;max-width:100%;" id="img-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '">
                                            <div id="imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" class="bannerslidecontainer headerheight" style="position:relative;max-width:100%;overflow-x:hidden;overflow-y:hidden;background-size:cover;background-image:url(\'' . $initialloadbgimage . '\')">
                                            </div>
                                        </div>

                                        <noscript>
                                            <div style="display:inline;position:relative;" id="noscript-img-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '">
                                                    <img class="img img-responsive bannerslide" id="xsimg-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" src="//d1y0bevpkkhybk.cloudfront.net/b/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg">
                                            </div>
                                        </noscript>
                                        <script>
                                            $(document).ready(function(){
                                                var align_horizontal = ' . $projectbackgroundimage->pivot->align_horizontal . ';
                                                var align_vertical = ' . $projectbackgroundimage->pivot->align_vertical . ';
                                                var align_horizontal_string = "" + align_horizontal + "%";
                                                var align_vertical_string = "" + align_vertical + "%";

                                                $(\'#imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({\'background-position\': align_horizontal_string + \' \' + align_vertical_string});
                                            });
                                            <!--<img class="img img-responsive bannerslide" id="xsimg-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" src="//d1y0bevpkkhybk.cloudfront.net/bt/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg">-->

                                            $(document).ready(function(){
                                                var selectbackgroundimagefunction = function(){
                                                    var w = window.innerWidth;
                                                    var h = window.innerHeight;

                                                    if (w <= 768 && h <= 480) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w <= 992 && h <= 620) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bsm/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w <= 1200 && h <= 750) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bmd/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/b/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                }

                                                selectbackgroundimagefunction();

                                                $(window).resize(function(){
                                                    selectbackgroundimagefunction();
                                                });
                                            });
                                            </script>

                                    </div>';
                                $i++;
                            }
                            ?>

                        </div>
                    </div>

                    <!-- Controls -->
                    <!--
                    <a class="left carousel-control" href="#carousel-example-generic" style="background-image:none;" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" style="background-image:none;" href="#carousel-example-generic" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>-->
                </div>

</div>