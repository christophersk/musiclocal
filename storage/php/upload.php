<?php
     $page = 'upload';   
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

<div class="container">
<div class="row contentcolor" style="padding-left:1%; padding-right:1%; padding-top:20px; padding-bottom:20px; box-shadow:0px 0px 10px 0px;">

<div class="col-sm-12">

<script type="text/javascript" src="http://form.jotform.us/jsform/50946770144155"></script>

</div>

</div>
</div>


<?php include($middlespacer); ?>
<?php include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>
