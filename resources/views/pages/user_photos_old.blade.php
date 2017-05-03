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
        $projects = Auth::user()->projects->lists('project_name', 'project_url');

        $userphotos = Auth::user()->facebookphotos->lists('facebookphoto_identifier');
        //$fbr = new FacebookResponse([]);
        $fqb = new FQB([]);

$edge = $fqb->edge('photos')->fields('id');
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

<div class="col-sm-7">
    <h2>Add Photos</h2>
    <h4>

            <span start-get-user-photos-from-facebook="javascript:void(0)"><a href="javascript:void(0)">From Facebook</a></span>

    </h4>
    <div class="grid">
<div id="get-user-photos-from-facebook">

        <div class="grid-sizer"></div>


</div>
    <div style="display: inline-block;">
        <a class="btn btn-default" style="float: left;" data-toggle="collapse" href="#collapseCreatePhotoAlbum" aria-expanded="false" aria-controls="collapseCreateAProject">Create A Project</a>
    </div>

    <div class="collapse" id="collapseCreatePhotoAlbum">
        @include ('includes.user_photos_create-photo-album')
    </div>


    <div>
        @include ('includes.user_photos_upload-photo')
        </div>
</div>


<div class="col-sm-5" style="text-align:right;">

    <h2>Your Photos</h2>

    <div id="your-photos"></div>

</div>

<div class="col-md-4 section">

</div>

<div class="col-md-4 section">

</div>

</div>
</div>


<?php include($middlespacer); ?>
<?php //include($footer); ?>
<br><br><br><br>
<?php include($scripts); ?>

<script>

    $('span[start-get-user-photos-from-facebook]').click(function($e){
        $e.preventDefault();
        //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        //$('.preloader').load($_preloader).show(0);
        $( "#get-user-photos-from-facebook" ).load("/get_user_photos");
        });

    $(document).ready(function() {
        $.ajaxSetup({cache: true});
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: '1618708688367645',
                version: 'v2.3',
                cookie: true
            });
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    FB.api('/me/photos', function (response) {
                        console.log(response.data);

                        var cphotos = new Array();
                        $('.currentphotos').each(function() {
                            //console.log(typeof $(this).data('photoidentifier'));
                            cphotos.push($(this).data('photoidentifier'));
                            //sdfg(cphotos);
                            //asdf(cphotos);

                        });
                        //var asd = function(cphotos){
                        //function sdfg(cphotos) {
                            //console.log(cphotos);
                        //}
                        //var cphotos2 = jQuery([])
                                //.pushStack(document.getElementsByClassName('currentphotos'));
                        //console.log(cphotos2);

                        //console.log(($('.currentphotos').data('photoidentifier')).toArray());
                        //function asdf(){}

                    //function asdf() {
                        //var cphotos;
                        $.each(response.data, function () {
                            var id = Number(this.id);
                            //console.log(cphotos);
                            //var cphotos;
                            // if (seen[id])
                            //   this.remove();
                            // else
                            //console.log(id);
                            //var testest = $('.currentphotos').hasData(id);
                            //console.log(testest);

                            //console.log(typeof id);
                            //console.log(typeof $('.currentphotos').data('photoidentifier'));
                            var link = (this.images[6].source);

                             if ($.inArray(id, cphotos) > -1) {
                             console.log('found');
                                 console.log(id);
                                 console.log(cphotos);
                             //console.log(cphotos);
                             }
                             else {
                                 console.log('bar');
                                 $("#get-user-photos-from-facebook").append('<div class="grid-item grid-item--width3 photofromfacebook" data-photoidentifier="' + id + '"><img src="' + link + '" style="padding:1%;"></div>');
                             }
                        });
                    //}
                        //$('.photofromfacebook').filter(function(index)){


                        //});

                    });

                }
                else {
                    FB.login();
                }
            });

        });

        var $grid = $('.grid').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        // layout Masonry after each image loads
        $grid.imagesLoaded().progress( function() {
            $grid.masonry('layout');
        });

        var imgLoad = imagesLoaded('.grid');
        imgLoad.on( 'always', function() {
            console.log( imgLoad.images.length + ' images loaded' );
            // detect which image is broken
            for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
                var image = imgLoad.images[i];
                var result = image.isLoaded ? 'loaded' : 'broken';
                console.log( 'image is ' + result + ' for ' + image.img.src );
            }
        });

    });



</script>

</body>
<script>

    $_token = "<?php echo csrf_token(); ?>";
    $_user_id = "<?php if (isset($user)){echo $user->user_id;}; ?>";
    $('.photofromfacebook').click(function($e){
    $e.preventDefault();
    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
    $.ajax({
    type: "POST",
    url: "/user/photo/addphoto",
    //dataType: "text"
    data: {"facebookphoto_identifier": $(this).data('photoidentifier'), _token: $_token, "user_id": $_user_id},
    error: (function(){
    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('This photo has already been added.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
    }),
    success: (function(){
    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('This photo has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
    $("#your-photos").load("user/ajax/get_current_user_photos");
    })
    });
    });
</script>
</html>