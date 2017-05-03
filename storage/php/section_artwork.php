<div class="col-sm-12" style="text-align:center;">
<p><em>To save high resolution copies, left-click the desired thumbnail.</em></p>

<div class="row">
<?php
$dname = "mediafiles/views/chrisskenemusic/images/highresimages/";
$highresimages = glob($dname."*.*");
foreach($highresimages as $highresimage) {
	$filename = basename($highresimage);
echo '<div class="col-sm-4"><div class="well well-sm"><a href="'.$highresimage.'" download target="_blank"><img src="'.$dname.'thumbnails/thumb-'.$filename.'" class="img img-responsive"></a></div></div>';
}
?>
</div>
</div>