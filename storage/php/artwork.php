<?php
     $page = 'Artwork';   
	 $pathinfo = dirname(__FILE__) . '/pathinfo.php';
	 require_once($pathinfo);
	 $navbar = dirname(__FILE__) . '/navbar.php';
     require_once($navbar);

    ?>
<!doctype html>
<html>

<?php include_once($head); ?>

<body>

<?php echo $nav; ?>

<?php include_once($topspacer); ?>

<?php include($logobanner); ?>

<?php include($middlespacer); ?>

<?php include_once($header); ?>

<?php include($middlespacer); ?>

<?php include($titlebar); ?>

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>

<div class="col-sm-12" style="text-align:center;">
<p><em>To save high resolution copies, left-click the desired thumbnail.</em></p>
</div>

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

<?php include($middlespacer); ?>
<?php include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>
