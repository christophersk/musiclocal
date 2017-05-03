<?php
    $class1 = ($page == 'user_home') ? 'class="active"' : '';
    $class2 = ($page == 'user_photos') ? 'active' : '';
    $class3 = ($page == 'user_videos') ? 'active' : '';
    $class4 = ($page == 'user_projects') ? 'class="active"' : '';
    $link1 = url('user');
    $link2 = url('user/photos');
    $link3 = url('user/videos');
    $link4 = url('user/projects');
    $user_nav_top = <<<EOD
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!--<a class="navbar-brand" href="/index.php"><span><img src="$user->facebook_picture_url" style="max-height:100%;" alt="CSM"></span></a>-->
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li $class1><a href="$link1" class="navbar-brand"><span><img src="$user->facebook_picture_url" style="max-height:100%;"></span></a></li>
            <li $class1><a href="$link1" style="padding-left:0px;">$user->user_first_name</a></li>
            <li $class4><a href="$link4" style="padding-left:10px;"><span class="glyphicon glyphicon-home" style="padding-right:10px;"></span>Projects</a></li>
            <li class="dropdown $class2 $class3">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="glyphicon glyphicon-picture" style="padding-right:10px;"></span>Media<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="$link2" style="padding-left:10px;">Photos</a></li>
                    <li><a href="$link3" style="padding-left:10px;">Videos</a></li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
EOD;
?>