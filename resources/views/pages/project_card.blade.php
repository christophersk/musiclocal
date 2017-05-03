<?php
$page = 'Home';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);


        use App\Project;
        use App\Location;
        $locid = $project->location_id;
        $loc = Location::find($locid);//$project->location->location_name;
        $locname = $loc->location_name;
        $locstate = $loc->location_state;
     $locurl = env('PROJECT_SUBDOMAIN_PREFIX') . $locname . '.' . env('PROJECT_ROOT_DOMAIN');


?>

<!--
    '#imageheadertext' gets filled by $.html() in the image header.
    The text must be printed outside of the imageheadercontainer, which is position:fixed and z-index:-1 (fixed is relative to parent element (body))
 -->

<div id="imageheadercontainer" class="" style="padding:0px;">
    <!--<div class="row" style="display:table; height:100%;">
        <div class="col-sm-12">-->

            <!--<div class="row outershadow" style="padding:5px; padding-bottom:0px; box-sizing:border-box; max-width:3840px;">--> <!--data-spy="affix" data-offset-top="420" id="affixedbanner"-->
                <div class="" style="padding:0px;padding-bottom:0px;background-color:transparent;">
                    <div id="carousel-header" class="carousel slide" data-ride="carousel" data-interval="10000" style="background-color:transparent;">
                        <!-- Indicators -->
                        <ol class="carousel-indicators" id="carouselindicators" style="position:absolute;bottom:10px;margin-top:0px;margin-bottom:30px;">
                            <?php $ii = 0; ?>
                            @foreach($projectbackgroundimages as $projectbackgroundimage)
                            <li data-target="#carousel-header" data-slide-to="<?php echo $ii . '"'; if ($ii == 0){ echo ' class="active"'; } else {} ?>></li>
                            <?php $ii++; ?>
                            @endforeach
                        </ol>

                        <!-- Wrapper for slides -->
                        <div class="carousel-inner headerheight" style="background-color:transparent;">
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
                                    echo '<div class="item' . $itemactive . '" style="background-color:transparent;">
                                        <div style="background-color:transparent;" id="img-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '">
                                            <div style="background-color:transparent;position:absolute;left:50%;top:0%;width:100%;height:100%">
                                            </div>
                                            <div id="imgdiv-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" class="bannerslidecontainer headerheight" style="position:relative;background-size:cover;background-image:url(\'' . $initialloadbgimage . '\')">
                                            </div>
                                        </div>

                                        <noscript>
                                            <div style="display:inline;position:relative;" id="noscript-img-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '">
                                                    <img class="img img-responsive bannerslide" id="xsimg-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg">
                                            </div>
                                        </noscript>
                                        <script>
                                            var align_horizontal = ' . $projectbackgroundimage->pivot->align_horizontal . ';
                                            var align_vertical = ' . $projectbackgroundimage->pivot->align_vertical . ';

                                            if (align_horizontal == 0) { var align_horizontal_string = "0%"; }
                                            else if (align_horizontal == 2 ) { var align_horizontal_string = "100%"; }
                                            else { var align_horizontal_string = "50%"; }

                                            if (align_vertical == 0) { var align_vertical_string = "0%"; }
                                            else if (align_vertical == 2 ) { var align_vertical_string = "100%"; }
                                            else { var align_vertical_string = "50%"; }

                                            $(document).ready(function(){
                                                $(\'#imgdiv-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({\'background-position\': align_horizontal_string + \' \' + align_vertical_string});
                                            });
                                            <!--<img class="img img-responsive bannerslide" id="xsimg-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '" src="//d1y0bevpkkhybk.cloudfront.net/bt/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg">-->

                                            $(document).ready(function(){
                                                var selectbackgroundimagefunction = function(){
                                                    var w = window.innerWidth;

                                                    if (w < 768) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bxs/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w < 992) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bsm/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else if (w < 1200) {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
                                                        });
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src = "//d1y0bevpkkhybk.cloudfront.net/bmd/' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.jpg";
                                                    }
                                                    else {
                                                        var imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '= new Image();
                                                        imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.addEventListener("load", function(){
                                                            $(\'#imgdiv-' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '\').css({"background-image": "url(\'" + imgload' . md5($projectbackgroundimage->backgroundimage_uniqueid) . '.src + "\')"});
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

<div id="socialheadercontainer" class="" style="background-color:#ffffff;">

</div>
<div id="titleandactioncontainer" style="background-color:#ffffff;">
    <div class="" style="background-color:#c1c8c8;">
    @include ('includes.title-header_project')
    </div>
</div>