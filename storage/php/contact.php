<?php
     $page = 'Contact';   
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

<div class="col-md-12" style="text-align:center;">
<p><i>To send Chris an email, please use the form below.</i><br></p>
</div>

<div class="col-sm-12">

<?php include($contactform); ?>

</div>
</div>
</div>

<?php include($middlespacer); ?>
<?php include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>
