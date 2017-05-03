<?php
     $page = 'Media';   
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

<div class="col-md-8 clearfix">

<div id="IShallBeReleased150403">
<div class="well well-sm" style="text-align:center;" >
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/mHR9iH-ypcM?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>I Shall Be Released</h4>
</div>
</div>

<div class="well well-sm" style="text-align:center;">
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/2zcD4F_OKVY?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>Bring It On Home To Me (w/Slim Shaw)</h4>
</div>

<div id="Hallelujah150206">
<div class="well well-sm" style="text-align:center;" >
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/JdNKN0rSg-U?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>Hallelujah</h4>
</div>
</div>

<div id="SweetInspiration150206">
<div class="well well-sm" style="text-align:center;" >
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/ze_HUOIk5V0?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>Sweet Inspiration</h4>
</div>
</div>

<div class="well well-sm" style="text-align:center;">
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/iFs2QOVFc-E?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>Tales of Brave Ulysses</h4>
</div>

<div id="Temptation140926">
<div class="well well-sm" style="text-align:center;" >
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/nv_4Cu3Y234?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>Yield Not To Temptation</h4>
</div>
</div>


</div>

<div class="col-md-4">

<?php include('/flickr_150505_CincodeMayo.php'); ?>

<?php include('/flickr_150502_Liberty.php'); ?>

<?php include('/flickr_150429_Sidecar.php'); ?>

<?php include('/flickr_150418_319Wine.php'); ?>

<?php include('/flickr_150417_pockets.php'); ?>


</div>

<div class="col-md-7">

</div>
</div>
</div>

<?php include($middlespacer); ?>
<?php include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>
