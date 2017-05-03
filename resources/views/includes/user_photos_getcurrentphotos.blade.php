<?php //echo '<script src="' . asset('js/salvattore.min.js') . '"></script>';

use Illuminate\Support\Facades\Storage;
        use Illuminate\Support\Facades\File;
?>



<?php
                    echo '<div class="row">
    <div class="col-sm-12">
        <div class="grid2">
            <div class="grid-sizer"></div>
            <div id="yourreturnedphotos">';
    $photos = Auth::user()->facebookphotos()->get()->sortByDesc('fb_created_time');
    $currentphotoidentifiers = $photos->lists('facebookphoto_identifier');
//dd($photos);
        //change to the photos == null line to get else to work, photos is always set!
//if ($photos == null){
if (isset($photos)){

    //ksort($photos);
    //dd($photos);
    $photo_display_counter = 0;
    foreach ($photos as $photo){
        $photo_display_currentcount = $photo_display_counter;
        $photo_display_currentcount++;
        //use this for generating URL to local storage
        //echo '<div class="grid-item grid-item--width3"><img src="' . asset('photos_fb/6/' . md5($facebookphoto_identifier, false) . '_6.jpg') . '" style="padding:1%"></div>';
        //use this for generating URL to Amazon CloudFront CDN
        echo '<div class="grid-item grid-item--width4"><img class="currentphotos" data-photoid="' . $photo->facebookphoto_id . '" data-photoidentifier="' . $photo->facebookphoto_identifier . '" src="//d1y0bevpkkhybk.cloudfront.net/5/' . md5($photo->facebookphoto_identifier, false) . '_5.jpg" data-urlhash="' . md5($photo->facebookphoto_identifier, false) . '" style="padding:1%"></div>';
    }
}

else {
    echo '<div class="grid-item grid-item--width4">No photos to display.</div>';
}
echo '</div></div></div></div>';

//dd($currentphotoidentifiers);
?>

<script>
$(document).ready( function() {



    //var userphotodisplaycount =

        var $grid2 = $('.grid2').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });

        // layout Masonry after each image loads
        $grid2.imagesLoaded().progress( function() {
            $grid2.masonry('layout');
        });
});
</script>