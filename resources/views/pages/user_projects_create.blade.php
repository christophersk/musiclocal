<?php
        use Illuminate\Support\Facades\Auth;
        use App\Http\Requests;
$page = 'create_project';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
//$project_names = Auth::user()->projects->lists('project_name');
//$project_urls = Auth::user()->projects->lists('project_url');
//$project = User::find(2)->projects;
        $projects = Auth::user()->projects()->lists('project_name', 'project_url');
?>

<!doctype html>
<html>
@include('includes.section_head')
@include ('includes.head_linkedresources')

<body>
<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

@include ('includes.top-spacer')

@include ('includes.user_title-header')

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>

<div class="col-sm-5 section">
    <h2>Your Projects</h2>
    @foreach($projects as $project_url => $project_name)
        <a href="{{ url($project_url) }}">{{ $project_name }}</a><br>
    @endforeach
</div>

<div class="col-sm-7 section">
<h2>Create A Project</h2>
    @include ('includes.user_create-project')
</div>

<?php include($endcontentcontainer); ?>


<?php include($middlespacer); ?>
<?php include_once($scripts); ?>
<br><br><br><br>
</body>
</html>