<div class="container container-fixed">
    <div class="row" style="border-top-left-radius:20px; padding-top:0px; padding-bottom:10px;">
        <div class="col-sm-6 col-sm-offset-3" style="text-align:center;">

            <h1 class="projectnameheader2">{{ $project->project_name }}</h1>
        <?php
        if ($project->tagline != null){
        $projecttaglinecontent = $project->tagline->tagline_content;
        echo '<p class="projecttaglineheader"><em>' . $projecttaglinecontent . '</em></p>';
        }
        ?>
        </div>
    </div>
</div>