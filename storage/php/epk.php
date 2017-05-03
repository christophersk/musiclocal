<?php
     $page = 'EPK';   
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

<div class="col-xs-12">
<br>
</div>

<div class="col-sm-8">
<div class="well well-sm">
<h2>Live Performance</h2>
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/g9FhZJCywqw?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4 style="text-align:center;">I Shall Be Released</h4>
</div>

<div class="row">
<div class="col-md-5 clearfix">

<?php include('/section_about.php'); ?>

</div>

<div class="col-md-7 clearfix">
<div class="well well-sm">
<h2 style="padding-left:1%; text-align:center;">Artwork</h2>

<div class="row" style="padding:3%; padding-bottom:1%;">

<?php include $artwork; ?>
<div class="well well-sm">
<h2 style="padding-left:0%;">Past Venues</h2>
<p style="padding:1%;"><em>(partial list)</em></p>
<p style="padding:1%;">Bowery Station | Bradfordville Blues Club | 319 Wine & Cheese | Coosh's Bayou Rouge | Backwoods Bistro | Salty Dawg Pub | Sidecar Gastrobar | Hobbit American Grill | El Patron Mexican Grill & Cantina | Schooner Wharf | Eddie Teach's Raw Bar | Skyline Motor Lounge | Railroad Square First Friday | Cooter Stew | Tropical Trader | Mulligan's Pub | Flint River Tavern | The Warehouse | The Front Porch | 5th Avenue Taproom | Bird's Oyster Shack | Krewe De Gras | Liberty Bar | Ouzt's Too | American Legion Hall Tallahassee | Englewoods on Dearborn | Ocean Blues | The Alley | Marshside Mama's | Pocket's Pool & Pub | Corner Pocket | Dux Liquors & Decoy Lounge | Quincy Blues & BBQ Festival | Ace's Live | Fathom's Raw Bar | The Plaza</p>
</div>
</div>





</div>
</div>

</div>

</div>


<div class="col-sm-4 clearfix">
<?php include('/section_contactinfo.php'); ?>
<?php include('/section_comments.php'); ?>
<?php include($facebook); ?>
<?php include($contactform); ?>
<?php include('/section_showsshort.php'); ?>

</div>

<!--

<div class="col-sm-4">
<div class="well well-sm" style="text-align:center;" >
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/2zcD4F_OKVY?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>Bring It On Home To Me (W/ Slim Shaw)</h4>
<p>&nbsp;</p>
</div>
</div>

<div class="col-sm-4">
<div class="well well-sm" style="text-align:center;" >
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//www.youtube.com/embed/ze_HUOIk5V0?rel=0&controls=1&theme=light&modestbranding=1&showinfo=0" allowfullscreen></iframe>
</div>
<h4>Sweet Inspiration</h4>
<p>&nbsp;</p>
</div>
</div>

-->


<div class="col-sm-8">

</div>




</div>


</div>
<?php include($middlespacer); ?>
<?php include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>
