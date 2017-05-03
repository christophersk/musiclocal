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
                                    if ($projectbackgroundimage->pivot->bannerheadline_id == null){
                                    $bannerheadline = '';
                                    $bannerheadline_h1 = '';
                                    $bannerheadline_h2 = '';
                                    $bannerheadline_h3 = '';
                                    $bannerheadline_h3link = '';
                                    $bannerheadline_style = null;
                                    }
                                    else {
                                    $bid = $projectbackgroundimage->pivot->bannerheadline_id;
                                    $bannerheadline = \App\Bannerheadline::find($bid);
                                    $bannerheadline_h1 = htmlentities($bannerheadline->bannerheadline_h1, ENT_QUOTES, "utf-8");
                                    $bannerheadline_h2 = htmlentities($bannerheadline->bannerheadline_h2, ENT_QUOTES, "utf-8");
                                    $bannerheadline_h3 = htmlentities($bannerheadline->bannerheadline_h3, ENT_QUOTES, "utf-8");
                                    $bannerheadline_h3link = htmlentities($bannerheadline->bannerheadline_h3link, ENT_QUOTES, "utf-8");
                                    $bannerheadline_style = $projectbackgroundimage->pivot->bannerheadline_style;
                                    }
                                    if ($bannerheadline_style === null) {
                                        $bannerheadline_h1_style = '';
                                        $bannerheadline_h2_style = '';
                                        $bannerheadline_h3_style = '';
                                    }
                                    elseif ($bannerheadline_style == 1) {
                                        $bannerheadline_h1_style = 'bannerheadline_style_1_h1';
                                        $bannerheadline_h2_style = 'bannerheadline_style_1_h2';
                                        $bannerheadline_h3_style = 'bannerheadline_style_1_h3';
                                    }
                                    echo '<div class="item' . $itemactive . '" style="background-color:transparent;max-width:100%;">
                                        <div style="background-color:transparent;max-width:100%;" id="img-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '">
                                            <div style="background-color:transparent;position:absolute;left:50%;top:0%;width:100%;height:100%">
                                                <div class="header_text_container hidden-xs" style="position:relative;left:-50%;">
                                                    <h1 class="' . $bannerheadline_h1_style . '">' . $bannerheadline_h1 . '</h1>
                                                    <h2 class="' . $bannerheadline_h2_style . '">' . $bannerheadline_h2 . '</h2>
                                                    <a href="' . $bannerheadline_h3link . '">
                                                        <h3 class="' . $bannerheadline_h3_style . '">' . $bannerheadline_h3 . '</h3>
                                                    </a>
                                                </div>
                                            </div>
                                            <div id="imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" class="bannerslidecontainer headerheight" style="position:relative;max-width:100%;overflow-x:hidden;overflow-y:hidden;background-size:cover;background-image:url(\'' . $initialloadbgimage . '\')">
                                            </div>
                                        </div>

                                        <noscript>
                                            <div style="display:inline;position:relative;" id="noscript-img-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '">
                                                    <img class="img img-responsive bannerslide" id="xsimg-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg">
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

                                                    if (w < 768) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w < 992) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . $i . '-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bsm/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w < 1200) {
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