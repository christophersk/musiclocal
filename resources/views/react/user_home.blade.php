<?php
        use Illuminate\Support\Facades\Auth;
        use App\Http\Requests;
$page = 'user_home';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
//$project_names = Auth::user()->projects->lists('project_name');
//$project_urls = Auth::user()->projects->lists('project_url');
//$project = User::find(2)->projects;
        //$projects = Auth::user()->projects()->lists('project_name', 'project_url');

?>

<!doctype html>
<html>


<?php include($head); ?>
<?php include($head_linkedresources); ?>

<script>

$(document).ready(function(){
$_token = "<?php echo csrf_token(); ?>";
});
</script>

<body>
<div id="navbar-top"></div>
<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>
<?php include($flash); ?>

<div class="container container-fixed">
<div id="content-menu"></div>
<?php include($endcontentcontainer); ?>
<?php include($middlespacer); ?>
<?php //include($startcontentcontainer); ?>
<div class="container-fluid">
<div id="content-modal"></div>
</div>
<div class="container container-fixed">


<div id="content-modal-fixed"></div>
<div id="content-main"></div>

<?php include ($endcontentcontainer); ?>

<?php include_once($scripts); ?>

<script>
$(document).ready(function(){
    ReactDOM.render(React.createElement(ProjectsStart, { url: "" }), document.getElementById('content-main'));
});
</script>
</body>
</html>