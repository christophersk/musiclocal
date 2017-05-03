<?php
        use Illuminate\Support\Facades\Auth;
        use App\Http\Requests;
$page = 'user_projects';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
//$project_names = Auth::user()->projects->lists('project_name');
//$project_urls = Auth::user()->projects->lists('project_url');
//$project = User::find(2)->projects;
?>

<!doctype html>
<html>
@include('includes.section_head')
@include ('includes.head_linkedresources')

<body>
@include ('flash')

<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

@include ('includes.top-spacer')

@include ('includes.user_title-header')

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>
<div class="col-sm-12">

    @foreach($projects as $project)
        <a class="btn btn-default" data-toggle="collapse" href="#collapse{{ $project->project_url }}" aria-expanded="false" aria-controls="collapse{{ $project->project_url }}">{{ $project->project_name }}</a>
    @endforeach

        <a class="btn btn-default" style="float: right;" data-toggle="collapse" href="#collapseCreateAProject" aria-expanded="false" aria-controls="collapseCreateAProject">Create A Project</a>

</div>
<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>

<div class="container collapse" id="collapseCreateAProject">
    <div class="row contentcolor outershadow" style="padding-left:1%; padding-right:1%; padding-top:20px; padding-bottom:20px;">
        <div class="col-sm-12">
            @include ('includes.user_create-project')
        </div></div></div>

<?php include($middlespacer); ?>

@foreach($projects as $project)
    <div class="container collapse" id="collapse{{ $project->project_url }}">
        <div class="row contentcolor outershadow" style="padding-left:1%; padding-right:1%; padding-top:20px; padding-bottom:20px;">
<div class="col-sm-12 projectcontainer" data-projectid="{{ $project->project_id }}">
    <div style="text-align: center;"><h3>{{ $project->project_name }}</h3></div>
    <a class="btn btn-default add-banner" style="float: right;" data-projectid="{{$project->project_id}}">Add A Banner</a>
    <div id="{{ $project->project_id }}-content">
</div>

</div></div></div>

<?php include($middlespacer); ?>

@endforeach

<?php include($startcontentcontainer); ?>

<div class="col-sm-12">

    @include ('includes.user_add-user-to-project')

</div>

<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>
<?php include_once($scripts); ?>
<br><br><br><br>

<script>
    $(document).ready( function() {
        $('.add-banner').click(function ($e) {
            $e.preventDefault();
            var projectid = $(this).data('projectid');
            console.log(projectid);
            $('#' + projectid + '-content').load("user/ajax/get/get_current_user_banners", function(){
                console.log(projectid);
                $('.returnedbanner').attr('projectid', '' + projectid + '');
                $_token = "<?php echo csrf_token(); ?>";
                $('#yourreturnedbanners').on('click', '.returnedbanner', function ($e) {
                    $e.preventDefault();
                    console.log('registered click');
                    var clickedbanner = $(this).data('bannerid');
                    var projectid = $(this).attr('projectid');
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Adding...').addClass('alert-info').fadeIn(300).removeClass('hidden');
                    $.ajax({
                        type: "POST",
                        url: "/user/projects/addbannertoproject",
                        //dataType: "text"
                        data: {
                            "bannerimage_id": clickedbanner,
                            "project_id": projectid,
                            _token: $_token
                        },
                        error: (function () {
                            $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('This photo has already been added.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                        }),
                        success: (function (response) {
                            console.log('%c Banner has been added to project.', 'background: #000000; color: #ffffff;');
                            $('.returnedbanner[data-bannerid="' + clickedbanner + '"]').remove();
                            $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner has been added to your project!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                        })
                    });
                });
            });

        });
    });

</script>

</body>
</html>