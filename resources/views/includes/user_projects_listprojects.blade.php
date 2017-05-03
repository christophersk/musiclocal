<?php
echo '<h4>Active Projects</h4>';
foreach ($projects as $project){
    if ($project->project_active == 1) {
    echo '<p><a href="' . $project->project_url . '">' . $project->project_name . '</a></p>';
    }
}

echo '<h4>Inactive Projects</h4>';
foreach ($projects as $project){
if($project->project_active == 0){
    echo '<p><a href="' . url($project->project_url) . '">' . $project->project_name . '</a></p>';
    }
}

echo '<p id="archivedprojects">Archived Projects</p><div id="archivedprojectslist" style="display:none;">';
foreach ($projects as $project){
    echo 'foo';
    if($project->project_active == 2){
        echo '<p><a href="' . url($project->project_url) . '">' . $project->project_name . '</a></p>';
    }
}
echo '</div>';
        ?>
<script>
    $('#archivedprojects').on('click', function(){
        console.log('click');
        $('#archivedprojectslist').toggle();
    });
</script>