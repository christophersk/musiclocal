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
        $projects = Auth::user()->projects;
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

    <ul class="nav nav-tabs">
    @foreach($projects as $project)
            @if ($project->project_active == 2)
            @else
        <li role="presentation">
        <a href="#{{ $project->project_url }}-tab" aria-controls="{{ $project->project_url }}-tab" role="tab" data-toggle="tab">{{ $project->project_name }}</a>
        </li>
            @endif
    @endforeach
        <li role="presentation" style="float:right;">
            <a href="#CreateAProject-tab" aria-controls="CreateAProject-tab" role="tab" data-toggle="tab">Create A Project</a>
        </li>
    </ul>

</div>
<?php include($endcontentcontainer); ?>

<div class="tab-content">
        <div role="tabpanel" class="tab-pane" id="CreateAProject-tab">
            <?php include($startcontentcontainer); ?>
            <div class="col-sm-7">
                <h2>Create A New Project</h2>
            @include ('includes.user_create-project')
                </div>
                <div class="col-sm-5" style="text-align:right;">
                    <h2>Your Projects</h2>
                    @include('includes.user_projects_listprojects')
                </div>
                <?php include($endcontentcontainer); ?>
        </div>
@foreach($projects as $project)
    @if ($project->project_active == 2)
        @else
        <div role="tabpanel" class="tab-pane" id="{{ $project->project_url }}-tab">
            <?php include($startcontentcontainer); ?>
            <div class="col-sm-12">
            <div class="projectcontainer" data-projectid="{{ $project->project_id }}">
                <div style="text-align: center;"><h3>{{ $project->project_name }} <span id="activeinactive" data-projectid="{{ $project->project_id }}" isactive="{{ $project->project_active }}" data-projectname="{{ $project->project_name }}" <?php if ($project->project_active == 1){echo 'style="color:green;"';} else{echo 'style="color:yellow"';}?>><?php if ($project->project_active == 1){echo '(Active - click to deactivate)';} elseif ($project->project_active == 0){echo '(Inactive - click to activate)';}?></span></h3></div>
                    <a class="btn btn-default add-banner" style="float: right;" data-projectid="{{$project->project_id}}">Add A Banner</a>
                <div id="{{ $project->project_id }}-content">
                </div>
                @include ('includes.user_add-user-to-project')
            </div>
        </div>
            <?php include($endcontentcontainer); ?>
        </div>
        @endif
@endforeach

</div>


<?php include($middlespacer); ?>
<?php include_once($scripts); ?>
<br><br><br><br>

<script>




    $(document).ready( function() {
            $('.add-banner').click(function ($e) {
            $e.preventDefault();
            var projectid = $(this).data('projectid');
            //console.log(projectid);
            $('#' + projectid + '-content').load("user/ajax/get/get_current_user_banners", function(){
                //console.log(projectid);
                $('.returnedbanner').attr('projectid', '' + projectid + '');
                $_token = "<?php echo csrf_token(); ?>";
                $('#yourreturnedbanners').on('click', '.returnedbanner', function ($e) {
                    $e.preventDefault();
                    //console.log('registered click');
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

        $('#activeinactive').click(function($e){
            $e.preventDefault();
            var projectid = $(this).data('projectid');
            var isactive = $(this).attr('isactive');
            var projectname = $(this).data('projectname');
            $_token = "<?php echo csrf_token(); ?>";
            console.log(isactive);
            if(isactive == '1'){
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Deactivating ' + projectname + '...').addClass('alert-info').fadeIn(300).removeClass('hidden');
                $.ajax({
                    type: "POST",
                    url: "/user/projects/deactivate",
                    //dataType: "text"
                    data: {
                        "project_id": projectid,
                        _token: $_token
                    },
                    error: (function () {
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    }),
                    success: (function (response) {
                        $('#activeinactive[data-projectid="' + projectid + '"]').attr('isactive', '0').html('(Inactive - click to activate)').css('color', 'yellow');
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('' + projectname + ' has been deactivated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    })
                });
            }

            else {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Activating ' + projectname + '...').addClass('alert-info').fadeIn(300).removeClass('hidden');
                $.ajax({
                    type: "POST",
                    url: "/user/projects/activate",
                    //dataType: "text"
                    data: {
                        "project_id": projectid,
                        _token: $_token
                    },
                    error: (function () {
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    }),
                    success: (function (response) {
                        $('#activeinactive[data-projectid="' + projectid + '"]').attr('isactive', '1').html('(Active - click to deactivate)').css('color', 'green');
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('' + projectname + ' has been activated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                    })
                });
            }
        });
    });

</script>

</body>
</html>