<?php
        use Illuminate\Support\Facades\Auth;
        use Illuminate\Support\Facades\Session;
        use App\Http\Requests;
        use SammyK\FacebookQueryBuilder\FQB;
        use Facebook\Facebook;
        use Facebook\FacebookResponse;
        use App\Bannerimage;
        use App\User;
        use App\Project;

$page = 'user_banners';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
        $user = Auth::user();
    $projects = Auth::user()->projects->lists('project_name', 'project_url');
    $bannerimages = Auth::user()->bannerimages;
?>
<!doctype html>
<html>
<?php include($head); ?>
<?php include($head_linkedresources); ?>
        <style>
        .flash {
            display: none;
            position:absolute;
            bottom:50px;
            right:15px;
            z-index:100;
        }

    </style>


<body>
<?php include($flash); ?>

<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

<?php include($topspacer); ?>

<?php include($user_title_header); ?>

<?php include($middlespacer); ?>

<?php include($middlespacer); ?>

<div id="createnewbanner">
    <div class="container container-fixed">
        <div class="row contentcolor outershadow" style="padding:0px;">

            <div class="col-sm-12" style="padding:0px;">
                <div style="padding:5px;" id="padding-div">
                    <div style="width:960px; height:100%; overflow:hidden;" id="drag-container">
                        <div id="drag">
                        <div style="text-align:center;"><h3>To begin making a flyer, click on one of your photos.</h3><p><em>To assign existing banners to projects, visit your <a href="{{ url('user/projects') }}">projects</a> page.</em></p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div id="adjustbuttons" style="display:none;">
                <a href="javascript:void(0)" class="btn btn-default submit-adjust" id="submit0" data-submitadjustid="0">Original Image</a>
                <a href="javascript:void(0)" class="btn btn-default submit-adjust" id="submit1" data-submitadjustid="1">Adjustment 1</a>
                <a href="javascript:void(0)" class="btn btn-default submit-adjust" id="submit3" data-submitadjustid="3">Adjustment 3</a>
                </div>
            </div>
            <div class="col-sm-12"><div id="cropbutton" style="display:none;">
                <a href="javascript:void(0)" class="btn btn-default" id="submit-crop" adjustid="0">Crop</a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include($startcontentcontainer); ?>

<div class="col-sm-12">

    <h2>Your Photos</h2>

    <div class="grid" id="get-user-photos-from-facebook">
        <div class="grid-sizer"></div>

</div>
</div>

<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>
<?php //include($footer); ?>
<br><br><br><br>

<?php include($scripts); ?>


<script>
    $(window).on('load',function() {
        $('#drag').draggable({
            stop: function(ev, ui) {
                var hel = ui.helper, pos = ui.position;
                //horizontal
                var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
                if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }
                // vertical
                var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
                if (pos.left >= 0) {
                    hel.animate({ left: 0 });
                } else if (pos.left <= v) {
                    hel.animate({ left: v });
                }
            }
        });
    });

$(document).ready( function() {

        var $grid = $('.grid').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        // layout Masonry after each image loads
        $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout');
        });

        $.ajaxSetup({cache: true});
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: '1618708688367645',
                version: 'v2.3',
                cookie: true
            });
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    FB.api('/me/photos', 'get', {limit: 24}, function (response) {
                        console.log(response);
                        var nextlink = response.paging.next;
                        $.each(response.data, function () {
                        var id = (this.id);
                        var link = (this.images[3].source);
                        //onefunction(nextlink);
                        console.log(nextlink);
                                //$("#get-user-photos-from-facebook").append('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '"><img src="' + link + '" style="padding:1%;"></div>');
                                var $items = $('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '" data-url="' + link + '"><img src="' + link + '" style="padding:1%;"></div>');

                                var $grid = $('.grid').masonry({
                                    // options
                                    itemSelector: '.grid-item',
                                    columnWidth: '.grid-sizer',
                                    percentPosition: true
                                });

                                $grid.append($items).imagesLoaded(function() {
                                    $grid.masonry('appended', $items, true);
                                });
                        });

                                $_token = "<?php echo csrf_token(); ?>";
        $('.photofromfacebook').on('click', function ($e) {
            var facebookphoto_identifier = $(this).data('photoidentifier');
            var facebookphoto_url = $(this).data('url');
            var photoid = $(this).data('photoid');
            var urlhash = $(this).data('urlhash');
            $('html, body').animate({ scrollTop: 0 }, 300);
            $('#drag-container').animate({height: "100%"}, 800);
            $("#drag").animate({top: "0px"}, 800);
            $("#adjustbuttons").delay(10).hide(300);
            $("#cropbutton").delay(10).hide(300);
            $('#drag').empty();
            $('<img class="bannerimage" style="width:960px; height:0px;" data-photoid="' + photoid + '" data-photoidentifier="' + facebookphoto_identifier + '" data-adjustid="0" src="' + facebookphoto_url + '">').appendTo('#drag').animate({height: "100%"}, 3000).delay(3000);
            $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Generating adjusted photos...').addClass('alert-info').fadeIn(300).removeClass('hidden');
            $.ajax({
                type: "POST",
                url: "user/ajax/any/user_flyeradjust",
                data: {
                    "facebookphoto_identifier": facebookphoto_identifier,
                    "facebookphoto_link": facebookphoto_url,
                    "photoid": photoid,
                    _token: $_token
                },
                error: (function () {
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Drag the photo to position it.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    $('#drag').append(response);
                    $('#drag-container').animate({height: "300px"}, 700);
                    var dragheight = parseInt($('#drag').css('height'), 10);
                    var dragtopadjust = -(dragheight / 2 - 150);
                    $("#drag").animate({top: dragtopadjust + "px"}, 700);
                    $("#adjustbuttons").delay(800).show(300);
                    $("#cropbutton").delay(800).show(300);
                })
            });

        });

                        });

                }
                else {
                    alert('You are not logged in.');
                    //FB.login();
                }

            });

        });
    });

    $('.submit-adjust').click(function($e){
        $e.preventDefault();
        $('.bannerimage').hide();
        var id = $(this).data('submitadjustid');
        $('*[data-adjustid=' + id + ']').show();
        $('#submit-crop').attr('adjustid', $(this).data('submitadjustid'));
        });

    $('#submit-crop').click(function($e){
        $e.preventDefault();
        var adjust_id = $(this).attr('adjustid');
        var photoid = $('.bannerimage').data('photoid');
        var photoidentifier = $('.bannerimage').data('photoidentifier');
        var position = $('#drag').position();
        var positiontop = position.top;
        var positionleft = position.left;
        var paddingint = parseInt($('#padding-div').css('padding'), 10);
        $("#adjustbuttons").hide(10);
        $("#cropbutton").hide(10);
        $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        $.ajax({
            type: "POST",
            url: "user/ajax/post/user_bannerphotocrop",
            //dataType: "text"
            data: {"top": positiontop, left: positionleft, "paddingint": paddingint, "facebookphoto_id": photoid, "facebookphoto_identifier": photoidentifier, "adjust_id": adjust_id, _token: $_token, "user_id": $_user_id},
            error: (function(){
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('This photo has already been added.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                $("#adjustbuttons").delay(800).show(300);
                $("#cropbutton").delay(800).show(300);
            }),
            success: (function(response){
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('This photo has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                $('#drag').empty();
                $('#drag-container').animate({height: "100%"}, 800);
                $('#yourreturnedbanners').prepend(response);
            })
        });
    });

</script>
</body>
</html>