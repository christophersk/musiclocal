<?php
use App\Http\Requests;
$page = 'home';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($navbar_bottom);

?>

<!doctype html>
<html>
@include('includes.section_head')
@include ('includes.head_linkedresources')

<body>

<?php echo $nav_bottom; ?>

@include ('includes.top-spacer')

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>

<div class="col-md-4 section">
{{--
    @if (Auth::check())
        <p>foo</p>

    @else
    <a href="{{ $login_url }}">Login</a>
    @endif
--}}

</div>

<div class="col-sm-12" style="text-align:center;">
<h1>Welcome to MusicLocal.</h1>
</div>
<br>
<div style="text-align:center;">
<img src="<?php echo env('PROJECT_URL'); ?>ML_logo_square.png" style="max-width:150px;position: relative;left:20px;">
    </div>
<br>
<div class="col-sm-12" style="text-align:center;">
<p>MusicLocal is in closed alpha.</p>
</div>

<div class="col-sm-12" style="text-align:center;">
    <div class="userfullnamecontainer landingusercontainer"><a href="/auth/login" class="btn btn-primary">Login</a></div>
{{--
    @if (Auth::check())
        <p>You are logged in as {{ $user->user_first_name }} {{ $user->user_last_name }}.</p>

    @else<!--<p>If you are an approved test user, <a href="{{ $login_url }}">Login with Facebook.</a>-->
<a href="/auth/login" class="btn btn-primary">Login</a>

        @endif--}}
</div>


</div>
</div>


<?php include($middlespacer); ?>
<?php //include($footer); ?>
<?php include_once($scripts); ?>
</body>
</html>