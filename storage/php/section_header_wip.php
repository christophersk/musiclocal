<div class="container">
<div class="row" style="display:table; height:100%;">
<div class="col-sm-10">
<div class="row" style="padding:5px; box-shadow:0px 0px 5px 0px; background-color:rgba(255,255,255,1.0);">
<div class="col-sm-12" style="padding:0px;">
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner">
    <div class="item active">
      <img src="images/img4.jpg" alt="Chris Skene Music">
      <div class="carousel-caption">
        
      </div>
    </div>
    <div class="item">
      <img src="images/img2.jpg" alt="Chris Skene Music">
      <div class="carousel-caption">
        
      </div>
    </div>
     <div class="item">
      <img src="images/img3.jpg" alt="Chris Skene Music">
      <div class="carousel-caption">
        
      </div>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" style="background-image:none;" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
  </a>
  <a class="right carousel-control" style="background-image:none;" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
  </a>
</div>
</div>
</div>
</div>

<div class="col-sm-2">
<div class="row" style="padding:5px; box-shadow:0px 0px 5px 0px; background-color:rgba(255,255,255,1.0); margin-left:-10px;">
<div class="col-sm-12" style="padding:0px;">

<?php 
     $class01 = ($page == 'index') ? 'active"' : '';
	 $class02 = ($page == 'shows') ? 'active"' : '';
	 $class03 = ($page == 'media') ? 'active"' : '';
	 $class04 = ($page == 'contact') ? 'active"' : '';
	 $class05 = ($page == 'blog') ? 'active"' : '';
     $nav2 = <<<EOD
<div class="list-group">
  <a href="/index" class="list-group-item $class01">Home</a>
  <a href="/shows" class="list-group-item $class02">Shows</a>
  <a href="/media" class="list-group-item $class03">Media</a>
  <a href="/contact" class="list-group-item $class04">Contact</a>
    <a href="/blog" class="list-group-item $class05">Blog</a>
</div>
EOD;
?>

<?php echo $nav2; ?>

</div>
</div>
</div>


</div>
</div>