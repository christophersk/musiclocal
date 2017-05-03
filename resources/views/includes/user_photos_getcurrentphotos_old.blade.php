<?php //echo '<script src="' . asset('js/salvattore.min.js') . '"></script>';

use Illuminate\Support\Facades\Storage;
        use Illuminate\Support\Facades\File;
?>

<h4>From Facebook</h4>
<div class="row">
    <div class="col-sm-12">
        <div class="grid">
            <div class="grid-sizer"></div>

<?php

if (isset($getcurrentuserphotosdotarray)){
    $fixed1 = $getcurrentuserphotosdotarray;
    //array_dot($FacebookphotoNodeResults);
    ksort($fixed1);
    var_dump($fixed1);
    foreach ($fixed1 as $key1 => $fix1){
        $nosource1 = strpos($key1, 'images.3.source');
        $nosource0 = strpos($key1, 'images.0.source');
        $nodata1 = strpos($key1, 'data');
        $noid1 = strpos($key1, 'id');
        $nonext1 = strpos($key1, 'paging.next');
        $noprevious1 = strpos($key1, 'paging.previous');

        if ($noprevious1 !== false){
            $previousfbquery1 = $fix1;
            echo '<p>' . $previousfbquery1 . '</p>';
            Session::put('previousfbquery', $previousfbquery1);
        }
        /*elseif ($noid1 !== false)
        {
            echo '<div class="col-sm-4" style="padding:3px;" data-nodeid="' . $fix1 . '">';
        }*/
        elseif ($nosource1 !== false){
            echo '<div class="grid-item grid-item--width3"><img src="' . $fix1 . '" style="padding:1%"></div>';
            //$file = file_get_contents($fix1);


            //$filename = 'photos/' . $user->user_id . '__' . str_random(8) . 'photo.jpg';

            //$save = Storage::put($filename, $file);

        }

        elseif ($nonext1 !== false){
            $nextfbquery1 = $fix1;
            echo '<p>' . $nextfbquery1 . '</p>';
            Session::put('nextfbquery', $nextfbquery1);
        }
        else {
            echo '';
        }
    }

}

else {
    //echo '<div class="col-sm-12"><a href="' . url('get_user_photos') . '">GetUserPhotos</a><br><br></div>';
}
echo '</div></div></div>';


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
    });
</script>