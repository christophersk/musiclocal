<?php
     $page = 'Shows';   
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

<div class="col-sm-10 col-xs-12"><a href="https://www.bandsintown.com/Chris%20Skene%20Music" class="bit-widget-initializer" data-prefix="fbjs" data-artist="Chris Skene Music" data-force-narrow-layout="true" data-text-color="#ffffff">Chris Skene Music Tour Dates</a>
</div>
</div>
</div>

<?php include($middlespacer); ?>
<?php include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>
