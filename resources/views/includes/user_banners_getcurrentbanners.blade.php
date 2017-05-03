<?php //echo '<script src="' . asset('js/salvattore.min.js') . '"></script>';

use Illuminate\Support\Facades\Storage;
        use Illuminate\Support\Facades\File;
        use Illuminate\Support\Facades\Auth;

$user = Auth::user();
$bannerimages = Auth::user()->bannerimages->sortByDesc('bannerimage_id');

?>



<?php
                    echo '<div class="row">
    <div class="col-sm-4">
            <div id="yourreturnedbanners">';
//dd($photos);
        //change to the photos == null line to get else to work, photos is always set!
//if ($photos == null){
if (isset($bannerimages)){

    //ksort($photos);
    //dd($photos);
    foreach ($bannerimages as $bannerimage){
            //use this for generating URL to local storage
            //echo '<div class="grid-item grid-item--width3"><img src="' . asset('photos_fb/6/' . md5($facebookphoto_identifier, false) . '_6.jpg') . '" style="padding:1%"></div>';
            //use this for generating URL to Amazon CloudFront CDN
            echo '<div class="returnedbanner" data-bannerid="' . $bannerimage->bannerimage_id . '" projectid=""><img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' . md5($bannerimage->bannerimage_uniqueid) . '.jpg" style="padding-top:1%;"></div>';
    }
}

else {
    echo '<div style="text-align:center;"><p>No banner images to display. To create a banner image, go to your <a href="' . url('user/banners') . '">banner management</a> page.</p></div>';
}
echo '</div></div></div>';

//dd($currentphotoidentifiers);
?>

