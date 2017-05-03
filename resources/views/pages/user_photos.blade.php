<?php
        use Illuminate\Support\Facades\Auth;
        use Illuminate\Support\Facades\Session;
        use App\Http\Requests;
        use SammyK\FacebookQueryBuilder\FQB;
        use Facebook\Facebook;
        use Facebook\FacebookResponse;

$page = 'user_photos';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
//$project_names = Auth::user()->projects->lists('project_name');
//$project_urls = Auth::user()->projects->lists('project_url');
//$project = User::find(2)->projects;
        //$projects = Auth::user()->projects->lists('project_name', 'project_url');

        $userphotos = Auth::user()->facebookphotos->lists('facebookphoto_identifier');
        //$fbr = new FacebookResponse([]);
        //$fqb = new FQB([]);

//$edge = $fqb->edge('photos')->fields('id');
?>

<!doctype html>
<html>
@include('includes.section_head')
@include ('includes.head_linkedresources')

<body>
@include ('flash')


<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

@include ('includes.top-spacer')

@include ('includes.user_title-header')

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>


<div class="col-sm-5" style="text-align:left;">

    <h2>Your Photos</h2>

    <div id="your-photos"></div>

</div>

<div class="col-sm-7" style="text-align:right;">
    <h2>Add Photos</h2>
    <h4>
            From Facebook
            <!--<span start-get-user-photos-from-facebook="javascript:void(0)"><a href="javascript:void(0)">From Facebook</a></span>-->

    </h4>
    <div class="grid" id="get-user-photos-from-facebook">
        <div class="grid-sizer"></div>

</div>



    {{--<div class="collapse" id="collapseCreatePhotoAlbum">
        @include ('includes.user_photos_create-photo-album')
    </div>


    <div>
        @include ('includes.user_photos_upload-photo')
        </div>
    </div>--}}
</div>



<div class="col-md-4 section">

</div>

<div class="col-md-4 section">

</div>

<?php include($endcontentcontainer); ?>


<?php include($middlespacer); ?>
<?php //include($footer); ?>
<br><br><br><br>
<?php include($scripts); ?>

<script>
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


    $("#your-photos").load("user/ajax/get_current_user_photos", function () {
        $.ajaxSetup({cache: true});
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: '1618708688367645',
                version: 'v2.3',
                cookie: true
            });
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    FB.api('/me/photos', 'get', {limit: 12}, function (response) {
                        console.log(response);
                        var nextlink = response.paging.next;
                        //onefunction(nextlink);
                        console.log(nextlink);

                        var cphotos = new Array();
                        $('.currentphotos').each(function () {
                            cphotos.push(String($(this).data('photoidentifier')));
                        });

                        $.each(response.data, function () {
                            var id = (this.id);
                            var link = (this.images[3].source);

                            if ($.inArray(id, cphotos) > -1) {
                            }
                            else {
                                //$("#get-user-photos-from-facebook").append('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '"><img src="' + link + '" style="padding:1%;"></div>');
                                var $items = $('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '"><img src="' + link + '" style="padding:1%;"></div>');

                                var $grid = $('.grid').masonry({
                                    // options
                                    itemSelector: '.grid-item',
                                    columnWidth: '.grid-sizer',
                                    percentPosition: true
                                });

                                $grid.append($items).imagesLoaded(function() {
                                    $grid.masonry('appended', $items, true);
                                });

                            }
                        });

/*
                        var loadcount = $('.photofromfacebook').length;
                        onefunction(loadcount, nextlink, cphotos);
                        function onefunction(loadcount, nextlink, cphotos) {

                            $('.currentphotos').each(function () {
                                if (in_array((String($(this).data('photoidentifier'))), cphotos)){

                                }
                                else {
                                    cphotos.push(String($(this).data('photoidentifier')));
                                }
                            });
                            //twofunctionwrapper(nextlink);
                            console.log('onefunction triggered, loadcount is ' + loadcount);
                            if (loadcount < 7) {
                                FB.init({
                                    appId: '1618708688367645',
                                    version: 'v2.3',
                                    cookie: true
                                });
                                FB.getLoginStatus(function (response) {
                                    if (response.authResponse) {
                                        FB.api(nextlink, 'get', {limit: 6}, function (response) {
                                            console.log(response.data);
                                            console.log('gotmore');
                                            var cphotos = new Array();
                                            $('.currentphotos').each(function () {
                                                cphotos.push(String($(this).data('photoidentifier')));
                                            });

                                            var id = response.data[0].id;
                                            var nextlink = response.paging.next;

                                            //console.log(typeof id);
                                            //console.log(typeof String($('.currentphotos').data('photoidentifier')));
                                            var link = response.data[0].images[3].source;

                                            if ($.inArray(id, cphotos) > -1) {
                                                onefunction(loadcount, nextlink);
                                                //console.log('found');
                                                //console.log(id);
                                                //console.log(cphotos);
                                            }
                                            else {
                                                loadcount++;
                                                onefunction(loadcount, nextlink);
                                                console.log('bar');
                                                var $grid = $('.grid').masonry({
                                                    // options
                                                    itemSelector: '.grid-item',
                                                    columnWidth: '.grid-sizer',
                                                    percentPosition: true
                                                });
                                                var $items = $('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '"><img src="' + link + '" style="padding:1%;"></div>');
                                                $grid.append($items).imagesLoaded(function() {
                                                    $grid.masonry('appended', $items, true);
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        console.log('did not run if');
                                        //alert('You are not logged in.');
                                        FB.login();
                                    }
                                });
                            }
                            else {
                                Cookies.set('nextlink', nextlink);
                            }
                        }*/



                        var loadcount = $('.photofromfacebook').length;
                        onefunction(loadcount, nextlink);
                        function onefunction(loadcount, nextlink) {
                            //twofunctionwrapper(nextlink);
                            console.log('onefunction triggered, loadcount is ' + loadcount);
                            if (loadcount < 12) {
                                FB.init({
                                    appId: '1618708688367645',
                                    version: 'v2.3',
                                    cookie: true
                                });
                                FB.getLoginStatus(function (response) {
                                    if (response.authResponse) {
                                        FB.api(nextlink, 'get', {limit: 1}, function (response) {
                                            console.log(response.data);
                                            console.log('gotmore');
                                            var cphotos = new Array();
                                            $('.currentphotos').each(function () {
                                                cphotos.push(String($(this).data('photoidentifier')));
                                            });

                                            var id = response.data[0].id;
                                            var nextlink = response.paging.next;

                                            //console.log(typeof id);
                                            //console.log(typeof String($('.currentphotos').data('photoidentifier')));
                                            var link = response.data[0].images[3].source;

                                            if ($.inArray(id, cphotos) > -1) {
                                                onefunction(loadcount, nextlink);
                                                //console.log('found');
                                                //console.log(id);
                                                //console.log(cphotos);
                                            }
                                            else {
                                                loadcount++;
                                                onefunction(loadcount, nextlink);
                                                console.log('bar');
                                                var $grid = $('.grid').masonry({
                                                    // options
                                                    itemSelector: '.grid-item',
                                                    columnWidth: '.grid-sizer',
                                                    percentPosition: true
                                                });
                                                var $items = $('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '"><img src="' + link + '" style="padding:1%;"></div>');
                                                $grid.append($items).imagesLoaded(function() {
                                                    $grid.masonry('appended', $items, true);
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        console.log('did not run if');
                                        //alert('You are not logged in.');
                                        FB.login();
                                    }
                                });
                            }
                            else {
                                Cookies.set('nextlink', nextlink);
                            }
                        }




                    });
                }
                else {
                    alert('You are not logged in.');
                    //FB.login();
                }

            });

        });
    });


});


        $_token = "<?php echo csrf_token(); ?>";
        $_user_id = "<?php if (isset($user)){echo $user->user_id;}; ?>";
        $('#get-user-photos-from-facebook').on('click', '.photofromfacebook', function ($e) {
            $e.preventDefault();
            //alert('foo');
            var tohide = $(this).data('photoidentifier');
            $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
            $.ajax({
                type: "POST",
                url: "/user/photo/addphoto",
                //dataType: "text"
                data: {
                    "facebookphoto_identifier": $(this).data('photoidentifier'),
                    _token: $_token,
                    "user_id": $_user_id
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('This photo has already been added.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    console.log('%c Photo has been added.', 'background: #000000; color: #ffffff;');
                    $('.photofromfacebook[data-photoidentifier="' + tohide + '"]').remove();
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('This photo has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                    firstappendcurrentphoto();
                    function firstappendcurrentphoto() {
                        var $grid2 = $('.grid2').masonry({
                            // options
                            itemSelector: '.grid-item',
                            columnWidth: '.grid-sizer',
                            percentPosition: true
                        });
                        var $postresponse = $(response);
                        $grid2.prepend($postresponse).imagesLoaded(function () {
                            $grid2.masonry('prepended', $postresponse, true);
                        });
                        var loadcount = $('.photofromfacebook').length;
                        var nextlink = Cookies.get('nextlink');
                        twofunction(loadcount, nextlink); //must call twofunction after image is appended, or duplicate results will not be filtered
                    }

                    function twofunction(loadcount, nextlink){
                        //twofunctionwrapper(nextlink);
                        console.log('twofunction triggered, loadcount is ' + loadcount);
                            FB.init({
                                appId: '1618708688367645',
                                version: 'v2.3',
                                cookie: true
                            });
                            FB.getLoginStatus(function (response) {
                                if (response.authResponse) {
                                    FB.api(nextlink, 'get', {limit: 1}, function (response) {
                                        var cphotos = new Array();
                                        $('.currentphotos').each(function () {
                                            cphotos.push(String($(this).data('photoidentifier')));
                                        });

                                        var id = response.data[0].id;
                                        var nextlink = response.paging.next;

                                        Cookies.set('nextlink', nextlink);
                                        //console.log(typeof id);
                                        //console.log(typeof String($('.currentphotos').data('photoidentifier')));
                                        var link = response.data[0].images[3].source;

                                        if ($.inArray(id, cphotos) > -1) {
                                            twofunction(loadcount, nextlink);
                                            //console.log('found');
                                            //console.log(id);
                                            //console.log(cphotos);
                                        }
                                        else {
                                            loadcount++;
                                            var $grid = $('.grid').masonry({
                                                // options
                                                itemSelector: '.grid-item',
                                                columnWidth: '.grid-sizer',
                                                percentPosition: true
                                            });
                                            var $newitems = $('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '"><img src="' + link + '" style="padding:1%;"></div>');
                                            $grid.append($newitems).imagesLoaded(function() {
                                                $grid.masonry('appended', $newitems, true);
                                            });
                                        }
                                    });
                                }
                                else {
                                    console.log('did not run if');
                                    //alert('You are not logged in.');
                                    FB.login();
                                }
                            });
                    }

                })
            });
        });


</script>
</body>

</html>