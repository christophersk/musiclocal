<?php
$dname = "/mediafiles/views/chrisskenemusic/images/highresimages/";
$highresimages = glob($dname."*.jpg");
foreach($highresimages as $highresimage) {
echo '<div class="col-sm-4"><div class="well well-sm"><img src="'.$highresimage.'"></div></div>';
}
?>
