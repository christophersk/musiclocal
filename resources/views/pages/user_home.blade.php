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

<div class="col-sm-3 section">
<h2>Create A Project</h2>
    @include ('includes.user_create-project')
</div>

<div class="col-sm-3 section" style="text-align:center;">
    <h2>Your Projects</h2>
    @foreach($projects as $project_url => $project_name)
        <a href="{{ url($project_url) }}">{{ $project_name }}</a><br>
    @endforeach
    {{--@foreach($projects as $project)
    {{ $user->$project->attach() }}
    @endforeach--}}
    {{--@foreach($project_names as $project_name)
        <p>{{ $project_name }}</p>
    @endforeach--}}
</div>

<div class="col-sm-6 section">
<h2>Get Started</h2>
<p>
    Note: this site is not in production, so be aware:
    <br>-this site will not be online 100% of the time
    <br>-things may break as I work on the site. If you get some sort of random error, it usually will be resolved in a few minutes.
    <br>-your data/created items may be cleared.
    <br>-the layout/organization of components may (will) be a bit silly
    <br>-this site has not yet been tested or adapted for browsers or devices other than Chrome on a desktop/laptop.
    <br>-components generally work but are not polished
    <br>
    <br>Here are things you can do at the moment:
    <br>-Create a banner (in new->banners), manage banners
    <br>-Create a photo album, manage photo albums, embed album on a third-party website
    <br>-Create a project, then activate it and add components (about, banners, photo albums, videos)
    <br>-embed social media widgets into project page (facebook, twitter)

    <br><br>MusicLocal will launch into production alpha when it can be used to generate a decent project website.

    <br><br>MusicLocal will begin showing notable value as features are added over time. MusicLocal will enter beta when it is feature complete.

</p>
</div>

<div class="col-md-4 section">

</div>

<div class="col-md-4 section">

</div>

</div>
</div>


<?php include($middlespacer); ?>
<?php include_once($scripts); ?>
<br><br><br><br>
</body>
</html>