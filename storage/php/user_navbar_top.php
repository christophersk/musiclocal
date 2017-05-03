<?php
/*
    use App\Location;
    use Illuminate\Support\Facades\Auth;
*/
/*
    $projects = Auth::user()->projects;
    $projectarray = [];
    foreach ($projects as $projecttolist){
    $projecttolistname = $projecttolist->project_name;
    $projecttolisturl = $projecttolist->project_url;
    $projecttolistid = $projecttolist->project_id;
    array_push($projectarray, ['projecttolistname' => $projecttolistname, 'projecttolisturl' => $projecttolisturl, 'projecttolistid' => $projecttolistid]);
    }
    $string = '';
    $projectdataarray = [];
    foreach ($projectarray as $key => $projectentry){
        extract($projectentry, EXTR_OVERWRITE);
        $line = '<li><a class="manageprojectlink" data-projectid="' . $projecttolistid . '" href="' . url('user/projects/' . $projecttolisturl) . '" style="padding-left:10px;">' . $projecttolistname . '</a></li>';
        $object = 'project_id:' . $projecttolistid . ', project_url:' . $projecttolisturl . ', projectname:' . $projecttolistname . '';
        $string .= $line;
        //$objectstringtemp .= $object;
        array_push($projectdataarray, ['project_id' => $projecttolistid, 'project_url' => $projecttolisturl, 'project_name' => $projecttolistname]);
    }
    //dd($projectdataarray);
    $objectstring = json_encode($projectdataarray);
    //dd($objectstring);
*/

    //dd($string);
    $class1 = ($page == 'user_home') ? 'class="active"' : '';
    $class2 = ($page == 'user_photos') ? 'active' : '';
    $class3 = ($page == 'user_videos') ? 'active' : '';
    $class4 = ($page == 'user_projects') ? 'class="active"' : '';
    $class5 = ($page == 'user_banners') ? 'active' : '';
    $class6 = ($page == 'user_schedule') ? 'class="active"' : '';
    $class7 = ($page == 'user_flyers') ? '"active"' : '';
    $class8 = ($page == 'user_banners_create') ? 'active' : '';
    $class10 = ($page == 'create_project') ? 'active' : '';
    $link1 = url('user');
    $link2 = url('user/photos');
    $link3 = url('user/videos');
    $link4 = url('user/projects');
    $link5 = url('user/banners');
    $link6 = url('user/schedule');
    $link7 = url('user/flyers');
    $link8 = '';//$link8 = url('user/banners/create');
    $link9 = url('user/photos/albums');
    $link10 = url('user/projects/create');
    /*
    $user = Auth::user();
    $locid = $user->user_location;

    $locname = Location::find($locid)->location_name;
    $locurl = env('PROJECT_SUBDOMAIN_PREFIX') . $locname . '.' . env('PROJECT_ROOT_DOMAIN');
    */
/*
    $user_first_name = $user->user_first_name;
    $user_last_name = $user->user_last_name;
*/
    /*<script>

    var objectstring = $objectstring;
    console.log(objectstring);
    var pstring = JSON.stringify(objectstring);
    console.log(pstring);
    localStorage.setItem("projectlinks", pstring);
    $(document).ready(){
        $.ajax({
        type: "GET",
            url: "/user/get_location",
            data: {
                "user_id": callbackurl,
                },
            error: (function () {
            }),
            success: (function (response) {
            })
    }
    </script>*/

    $user_nav_top = <<<EOD
<div style="height:50px;width:100%;background-color:#222;position:absolute;top:0px;left:0px;z-index:-1">
<!--this div corrects background color of transparent top navbar on mobile devices -->
</div>
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!--<a class="navbar-brand" href="/index.php"><span><img src="" style="max-height:100%;" alt="CSM"></span></a>-->
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li $class1><a href="$link1" style="padding-left:0px;" onclick="$('.collapse').collapse('hide')"><span class="glyphicon glyphicon-home" style="padding-right:10px;padding-left:10px;"></span><span id="userfirstnamecontainer">Home</span></a></li>
            <li id="projectsbutton" class="$class10">
                <a href="#" role="button" aria-expanded="false" style="padding-left:10px;" id="navbar-projects" onclick="$('.collapse').collapse('hide')"><span class="glyphicon glyphicon-asterisk" style="padding-right:10px;"></span>Projects</a>
            </li>
            <li id="projectschildtarget"></li>
            <li id="componentsbutton" class=" $class2 $class3 $class8 $class7">
                <a href="#" style="padding-left:10px;" role="button" aria-expanded="false" id="navbar-components" onclick="$('.collapse').collapse('hide')"><span class="glyphicon glyphicon-cog" style="padding-right:10px;"></span>Collections</a>
            </li>
            <li id="componentschildtarget"></li>
            <!--<li $class6><a href="$link6" style="padding-left:10px;" onclick="$('.collapse').collapse('hide')"><span class="glyphicon glyphicon-calendar" style="padding-right:10px;"></span>Schedule</a></li>-->
          </ul>
          <!--
          <ul class="nav navbar-nav navbar-right">
            <li class="locationcontainer"></li>
          </ul>
          -->
        </div>
      </div>
    </div>
<script>
$(document).ready(function(){

    if (1 == 2) {
        alert('Some of your user information needs to be set. Please fill out the required fields.');
        ReactDOM.render(React.createElement(UserInfoContainer, { url: "" }), document.getElementById('content-main'));
    }

});
</script>

EOD;
?>