<?php

?>

<div class="container-fluid contentcolor" style="padding-left:0px;padding-right:0px;">
    <!--<div class="row" style="display:table; height:100%;">
        <div class="col-sm-12">-->

            <!--<div class="row outershadow" style="padding:5px; padding-bottom:0px; box-sizing:border-box; max-width:3840px;">--> <!--data-spy="affix" data-offset-top="420" id="affixedbanner"-->
                <div class="" style="padding:0px;padding-bottom:0px;">
                    <div id="carousel-header" class="carousel slide" data-ride="carousel" data-interval="12000">
                        <!-- Indicators -->
                        <ol class="carousel-indicators" style="position:absolute;bottom:0px;">
                            <?php $ii = 0; ?>
                            @foreach($projectbannerimages as $projectbannerimage)
                            <li data-target="#carousel-example-generic" data-slide-to="<?php echo $ii . '"'; if ($ii == 0){ echo 'class="active"'; } else {} ?>></li>
                            <?php $ii++; ?>
                            @endforeach
                        </ol>

                        <!-- Wrapper for slides -->
                        <div class="carousel-inner">
                            <!--
                              <div class="item">
                                <img src="/transparent.png" alt="Chris Skene Music">
                                <div class="carousel-caption">

                                </div>
                              </div>
                              -->
                            <?php
                            $i = 0;
                            foreach ($projectbannerimages as $projectbannerimage) {
                                if ($i == 0) {
                                    $bid = $projectbannerimage->pivot->bannerheadline_id;
                                    $bannerheadline = \App\Bannerheadline::find($bid);
                                    $bannerheadline_h1 = htmlentities($bannerheadline->bannerheadline_h1, ENT_QUOTES, "utf-8");
                                    $bannerheadline_h2 = htmlentities($bannerheadline->bannerheadline_h2, ENT_QUOTES, "utf-8");
                                    $bannerheadline_h3 = htmlentities($bannerheadline->bannerheadline_h3, ENT_QUOTES, "utf-8");
                                    $bannerheadline_h3link = htmlentities($bannerheadline->bannerheadline_h3link, ENT_QUOTES, "utf-8");
                                    $bannerheadline_style = $projectbannerimage->pivot->bannerheadline_style;
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
                                    echo '<div class="item active">
                                        <div style="display:inline;position:relative;" id="img-' . md5($projectbannerimage->bannerimage_uniqueid) . '"></div>
                                        <noscript>
                                            <div style="display:inline;position:relative;" id="img-' . md5($projectbannerimage->bannerimage_uniqueid) . '">
                                                    <img class="img img-responsive bannerslide" id="xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg">
                                            </div>
                                        </noscript>
                                        <script>
                                            $(\'#img-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').html(\'<div><div class="header_text_container"><h1 class="' . $bannerheadline_h1_style . '">' . $bannerheadline_h1 . '</h1><h2 class="' . $bannerheadline_h2_style . '">' . $bannerheadline_h2 . '</h2><a href="' . $bannerheadline_h3link . '"><h3 class="' . $bannerheadline_h3_style . '">' . $bannerheadline_h3 . '</h3></a></div><img class="img img-responsive bannerslide" id="xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '" src="//d1y0bevpkkhybk.cloudfront.net/t/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg"></div>\');
                                            $(document).ready(function(){
                                                var selectbannerimagefunction = function(){
                                                    var w = window.innerWidth;
                                                    if (w < 768) {
                                                        var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                                                        });
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/xs/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w < 992) {
                                                        var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                                                        });
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/sm/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w < 1200) {
                                                        var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                                                        });
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/md/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
                                                    }
                                                    else {
                                                        var imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#xsimg-' . md5($projectbannerimage->bannerimage_uniqueid) . '\').attr("src", imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src);
                                                        });
                                                        imgload' . md5($projectbannerimage->bannerimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg";
                                                    }
                                                }

                                                selectbannerimagefunction();

                                                $(window).resize(function(){
                                                    selectbannerimagefunction();
                                                });
                                            });
                                            </script>

                                    </div>';
                                    }
                                    else {
                                    echo'<div class="item">
                                    <div style="display:inline" id="img-' . md5($projectbannerimage->bannerimage_uniqueid) . '"></div>
                                    <noscript>
                                    <img class="img img-responsive bannerslide" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg">
                                    </noscript>
                                    <script>
                                        $(document).ready(function(){
                                            var selectbannerimagefunction = function(){
                                                var w = window.innerWidth;
                                                if (w < 768) {
                                                    $(window).load(function(){
                                                        $("#img-' . md5($projectbannerimage->bannerimage_uniqueid) . '").html(\'<img class="img img-responsive bannerslide" src="//d1y0bevpkkhybk.cloudfront.net/xs/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg">\');
                                                    });
                                                }
                                                else if (w < 992) {
                                                    $(window).load(function(){
                                                        $("#img-' . md5($projectbannerimage->bannerimage_uniqueid) . '").html(\'<img class="img img-responsive bannerslide" src="//d1y0bevpkkhybk.cloudfront.net/sm/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg">\');
                                                    });
                                                }
                                                else if (w < 1200) {
                                                    $(window).load(function(){
                                                        $("#img-' . md5($projectbannerimage->bannerimage_uniqueid) . '").html(\'<img class="img img-responsive bannerslide" src="//d1y0bevpkkhybk.cloudfront.net/md/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg">\');
                                                    });
                                                }
                                                else {
                                                    $(window).load(function(){
                                                        $("#img-' . md5($projectbannerimage->bannerimage_uniqueid) . '").html(\'<img class="img img-responsive bannerslide" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbannerimage->bannerimage_uniqueid) . '.jpg">\');
                                                    });
                                                }
                                            }
                                            selectbannerimagefunction();

                                            $(window).resize(function(){
                                                selectbannerimagefunction();
                                            });
                                        });
                                        </script>

                                </div>';}
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

            <!--</div>-->
</div>

<script>
$(document).ready(function(){
    var w = window.innerWidth;
    if (w < 768) {

    }
    else if (w < 992) {

    }
    else if (w < 1200) {

    }
    else {

    }
});
</script>


<!--
</div>
</div>-->