<?php
     $page = 'index';   
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

<?php include($startcontentcontainer); ?>

<div class="col-md-4 section">

<?php include('/section_about.php'); ?>

<?php include('/section_flickr.php'); ?>

</div>

<div class="col-md-4 section">
<?php include('/section_showsshort.php'); ?>

<?php include('/section_instagram.php'); ?>
</div>

<div class="col-md-4 section">
<?php include('/section_facebook.php'); ?>
</div>

<div class="col-md-4 section">
<?php include('/section_twitter.php'); ?>
</div>

</div>
</div>


<?php include($middlespacer); ?>
<?php include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>
