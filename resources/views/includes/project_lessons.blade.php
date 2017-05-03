<div id="lessonscontainer" class="container-fluid startprojectcontentcontainer fullheight" style="background-color:#ffffff;">
    <?php include($startprojectcontentcontainer); ?>
    <div class="col-xs-12" style="text-align:center;">
        <h1 style="font-variant:small-caps;">Lessons</h1>
    </div>
    <div class="col-xs-12" style="padding-bottom: 20px; text-align:center;">
        <a class="btn btn-link" href="#about"><i class="fa fa-chevron-up"></i></a>
        <a class="btn btn-link" href="#images"><i class="fa fa-chevron-down"></i></a>
    </div>

    <div class="col-xs-12">
        <?php //include $latestvideos; ?>
        <div style="text-align:center;line-height:1.75em;letter-spacing:.4px;-webkit-column-count:1;-webkit-column-gap:60px;-webkit-column-rule:1px solid #333333;-moz-column-count:1;-moz-column-gap:60px;-moz-column-rule:1px solid #333333;column-count:1;column-gap:60px;column-rule:1px solid #333333;">
            Chris is available for in-home lessons for students of all ages and skill levels.
            Lessons are structured around the student's musical interests and goals.
            <h3>Why Take From Chris?</h3>
            Chris has a proven track record as a player and performer (in both frontperson and supporting roles), with over eighty shows played in calendar year 2015 alone.
            He possess a very strong (and still growing!) understanding of picking and fretting mechanics for blues, jazz, bluegrass, and rock.

        <h4>Scheduling</h4>
        To avoid performance conflicts, Chris prefers to teach on Mondays or Tuesdays if possible. Lessons are one hour in length, but lesson time can be adjusted to suit the needs or schedule of the student.
        <h4>Price</h4>
        Single lesson: $35/lesson <br/>
        Four-lesson package: $30/lesson.

        <h4>Get Started</h4>
        For more information, send him an email describing your interests and goals (<?php
use App\Project;
$contactinfo = Project::find($project->project_id)->contactinfo()->first();
if($contactinfo === null){}
else {
    echo substr_replace($contactinfo->contactinfo_email, '<span style="display:none;">n-spm</span>', 4, 0);
}

?>).
        </div>
        <br/><br/>
    </div>

        <?php include($endcontentcontainer); ?>

</div>