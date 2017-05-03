

<div id="get-more-user-photos-from-facebook">
<div class="row">
    <div class="col-sm-12">
        <img class="preloader" style="display: none; position: absolute; top: 50%; left: 50%; margin-top:-15px;margin-left:-15px; z-index: 999; max-width:30px;" src="<?php echo asset('MLpreloader.gif'); ?>">
        <div class="grid">
    <div class="grid-sizer"></div>

<?php
    use Illuminate\Support\Facades\Session;
    use Illuminate\Support\Collection;
   //dd($user);
   $photos = Auth::user()->facebookphotos()->get()->sortByDesc('fb_created_time');
   $currentphotoidentifiers = $photos->lists('facebookphoto_identifier');

if (isset($FacebookphotoNodeResults)){
    $user = Auth::user(); //this seems needed to make seesion:put work? not sure why.
    //dd($user);
    $fixed = array_dot($FacebookphotoNodeResults);
    ksort($fixed);
    //dd($fixed);
    foreach ($fixed as $key => $fix){
        $nosource = strpos($key, 'source');
        $nodata = strpos($key, 'data');
        $noid = strpos($key, 'id');
        $nonext = strpos($key, 'paging.next');
        $noprevious = strpos($key, 'paging.previous');

        if ($noprevious !== false){
            $previousfbquery = $fix;
            Session::put('previousfbquery', $previousfbquery);
        }
        elseif ($noid !== false AND $nodata !== false)
        {
            if (in_array($fix, $currentphotoidentifiers)){
                echo '<div class="grid-item grid-item--width3" style="display:none" data-facebookphotoinfo="' . $fix . '">';
            }
            else {
            echo '<div class="grid-item grid-item--width3" data-facebookphotoinfo="' . $fix . '">';
            }
        }
        elseif ($nosource !== false AND $nodata !== false){
            echo '<img src="' . $fix . '" style="padding:1%"></div>';
        }

        elseif ($nonext !== false){
            //dd($fix);
            $nextfbquery = $fix;
            ($nextfbquery);
            Session::put('nextfbquery', $nextfbquery);
        }
        else {
            echo '';
        }
    }

}

else {
    echo '<div class="grid-item"><a href="' . url('get_user_photos') . '">GetUserPhotos</a><br><br>';
}
        echo '</div></div>';

if (isset($previousfbquery)){
    $printpreviousfbqueryurl = '<span style="float: left;" get-user-photos-from-facebook-previous="javascript:void(0)"><a href="javascript:void(0)">Previous</a></span>';
}
else {
    $printpreviousfbqueryurl = '';
}
if (isset($nextfbquery)){
    $printnextfbqueryurl = '<span style="float: right;" get-user-photos-from-facebook-next="javascript:void(0)"><a href="javascript:void(0)">Next</a></span>';
}
else {
    $printnextfbqueryurl = '';
}

echo '<div class="row">';
echo '<div class="col-sm-12">';
echo $printpreviousfbqueryurl . $printnextfbqueryurl;

echo '</div></div></div></div>';
$object2 = $object->getProperty('photos');
foreach ($object2 as $object2key => $object2val){
$object3 = $object2->getProperty($object2key)->asArray();
extract($object3, EXTR_OVERWRITE);
echo '<img src="' . $source . '" photoid="' . $id . '">';

}
?>

<script>
    $(document).ready( function() {
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

    $_token = "<?php echo csrf_token(); ?>";
    $_user_id = "<?php if (isset($user)){echo $user->user_id;}; ?>";
    $('div[data-facebookphotoinfo]').click(function($e){
        $e.preventDefault();
        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        $.ajax({
            type: "POST",
            url: "/user/photo/addphoto",
            //dataType: "text"
            data: {"facebookphoto_identifier": $(this).data('facebookphotoinfo'), _token: $_token, "user_id": $_user_id},
            error: (function(){
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('This photo has already been added.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function(){
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('This photo has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                $("#your-photos").load("user/ajax/get_current_user_photos");
            })
        });
    });

    //$(function() {
    $('span[get-user-photos-from-facebook-next]').click(function($e){
        $e.preventDefault();
        //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        $('.preloader').load($_preloader).show(0);
        $( "#get-user-photos-from-facebook" ).load("/get_more_user_photos/next"), function(response, status, xhr) {
            if ( status == "error" ) {
                $('.preloader').finish().hide(0);
                var msg = "Sorry but there was an error: ";
                $( "#error").html(msg + xhr.status + " " + xhr.statusText )}
            else {
                $('.preloader').finish().hide(0);
            };
        };
    });

    $_preloader = "<?php echo asset('MLpreloader.gif'); ?>";
    $('span[get-user-photos-from-facebook-previous]').click(function($e){
        $e.preventDefault();
        //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        $('.preloader').load($_preloader).show(0);
        $( "#get-user-photos-from-facebook" ).load("/get_more_user_photos/previous"), function(response, status, xhr) {
            if ( status == "error" ) {
                $('.preloader').finish().hide(0);
                var msg = "Sorry but there was an error: ";
                $( "#error").html(msg + xhr.status + " " + xhr.statusText )}
            else {
                $('.preloader').finish().hide(0);
            };
        };
    });

</script>