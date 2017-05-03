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
//dd($project);
?>

<!doctype html>
<html>
<?php include($head); ?>
<?php include($head_linkedresources); ?>

<body>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        <div id="bannerdetails"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<?php include($user_photoalbums_modals); ?>

<div id="projectinfo" data-projectid="{{$thisprojectid}}"></div>
<?php include($flash); ?>

<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

<?php include($topspacer); ?>

<?php include($user_title_header); ?>

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>
    <div style="text-align: center;">
        <h3>{{ $project->project_name }}
            <span id="activeinactive" data-projectid="{{ $project->project_id }}" isactive="{{ $project->project_active }}" data-projectname="{{ $project->project_name }}"
            <?php if ($project->project_active == 1){echo 'style="color:green;"';} else{echo 'style="color:yellow"';}?>><?php if ($project->project_active == 1){echo '(Active - click to deactivate)';} elseif ($project->project_active == 0){echo '(Inactive - click to activate)';}?>
            </span>
        </h3>
        <h4><span id="activeinactive2"><?php
            if ($project->project_active == 1){
                echo '<a href="' . url($project->project_url) .'">View Project Page</a>';
            }
            else {
                echo 'Activate your project to view it.';
            }
            ?>
            </span>
        </h4>
    </div>
<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>
<ul class="nav nav-tabs">
    <li role="presentation"><a href="" id="add-about">About</a></li>
    <li role="presentation"><a href="" id="add-user">Users</a></li>
    <li role="presentation"><a href="" id="add-show">Shows</a></li>
    <li role="presentation"><a href="" id="add-banner">Banners</a></li>
    <li role="presentation"><a href="" id="add-photoalbum">Photo Albums</a></li>
    <li role="presentation"><a href="" id="add-video">Videos</a></li>
    <li role="presentation"><a href="" id="add-social">Social Media</a></li>
</ul>
<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>

<div id="manageprojectcontent"></div>
<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>
<div class="col-sm-12">

    {{--@include ('includes.user_add-user-to-project')--}}

</div>

<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>
<?php include_once($scripts); ?>
<br><br><br><br>

<script>
$(document).ready( function() {

        $('#activeinactive').click(function($e){
            $e.preventDefault();
            var projectid = $(this).data('projectid');
            var isactive = $(this).attr('isactive');
            var projectname = $(this).data('projectname');
            var projecturl = '<?php echo url($project->project_url); ?>';
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
                        $('#activeinactive2').html('Activate your project to view it.');
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
                        $('#activeinactive2').html('<a href ="' + projecturl + '">View Project Page');
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('' + projectname + ' has been activated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                    })
                });
            }
        });
    });

</script>

<script type="text/jsx">
/*** @jsx React.DOM */
$(document).ready(function(){

$_token = "<?php echo csrf_token(); ?>";

$('#add-about').click(function ($e) {
    $e.preventDefault();
    React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
    React.render(<AboutContainer url="/get_current_project_users"/>, document.getElementById('manageprojectcontent'));
});

$('#add-user').click(function ($e) {
    $e.preventDefault();
    React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
    React.render(<UserContainer url="/get_current_project_users"/>, document.getElementById('manageprojectcontent'));
});

$('#add-show').click(function ($e) {
    $e.preventDefault();
    React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
    React.render(<ShowContainer url="/get_current_project_users"/>, document.getElementById('manageprojectcontent'));
});

$('#add-banner').click(function ($e) {
    $e.preventDefault();
    React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
    React.render(<BannerContainer url="user/ajax/get/get_current_user_banners_links"/>, document.getElementById('manageprojectcontent'));
});

$('#add-photoalbum').click(function ($e) {
    $e.preventDefault();
    React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
    React.render(<PhotoalbumContainer url="user/ajax/get/get_current_user_photoalbums"/>, document.getElementById('manageprojectcontent'));
});

$('#add-video').click(function ($e) {
    $e.preventDefault();
    React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
    React.render(<VideoContainer url="/get_current_user_videos"/>, document.getElementById('manageprojectcontent'));
});

$('#add-social').click(function ($e) {
    $e.preventDefault();
    React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
    React.render(<SocialAddContainer url="/get_current_user_videos"/>, document.getElementById('manageprojectcontent'));
});
});
</script>

<script type="text/jsx" src="<?php echo url('e19f57a03b4e466b8f210eff624ccd8e/js/musiclocal_user_projects_managebanners.jsx'); ?>"></script>

<script type="text/jsx" src="<?php echo url('e19f57a03b4e466b8f210eff624ccd8e/js/musiclocal_user_projects_managephotoalbums.jsx'); ?>"></script>

<script type="text/jsx" src="<?php echo url('e19f57a03b4e466b8f210eff624ccd8e/js/musiclocal_user_projects_managevideos.jsx'); ?>"></script>

<script type="text/jsx" src="<?php echo url('e19f57a03b4e466b8f210eff624ccd8e/js/musiclocal_user_projects_manageabout.jsx'); ?>"></script>

<script type="text/jsx" src="<?php echo url('e19f57a03b4e466b8f210eff624ccd8e/js/musiclocal_user_projects_managesocial.jsx'); ?>"></script>

<script type="text/jsx">
/*** @jsx React.DOM */

var ShowContainer = React.createClass({

    getInitialState: function(){
        return {bandsintownartistname: [], bandsintownwidget_active: false};
    },

    componentDidMount: function(){
        var projectid = $('#projectinfo').data('projectid');
        $.ajax({
            type: 'GET',
            url: '/user/projects/bandsintownwidget/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                //var uniqueresponse = parsedresponse.uniquevideos;
                //var projectresponse = parsedresponse.projectvideos;
                //console.log(foo.uniquebannerimages);
                var bandsintownhandle = parsedresponse.bandsintownwidget_artistname;
                var bandsintownwidget_active = parsedresponse.bandsintownwidget_active;
                this.setState({bandsintownartistname: bandsintownhandle, bandsintownwidget_active: bandsintownwidget_active});
            }.bind(this))
        });
    },

    submitBandsintownWidgetChange: function(){
            var projectid = $('#projectinfo').data('projectid');
            var bandsintownartistname = this.state.bandsintownartistname;
            var bandsintownwidget_active = this.state.bandsintownwidget_active;
            $.ajax({
                type: "POST",
                url: "/user/projects/bandsintownwidget/addchange",
                data: {
                "project_id": projectid,
                "bandsintownwidget_artistname": bandsintownartistname,
                "bandsintownwidget_active": bandsintownwidget_active,
                _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    //var parsedresponse = JSON.parse(response);
                    //this.setState({data: parsedresponse});
                    //React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
                    //React.render(<ShowContainer url=""/>, document.getElementById('manageprojectcontent'));
                }.bind(this))
            })
    },

    handleBandsintownArtistTextEntry: function(event){
        this.setState({bandsintownartistname: event.target.value});
    },

    handleCheckedChange: function(){
        this.setState({bandsintownwidget_active: !this.state.bandsintownwidget_active});

    },

    render: function(){
        console.log(this.state.bandsintownwidget_active);
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var bandsintownartistnamedefaulttext = this.state.bandsintownartistname;
        if (this.state.bandsintownwidget_active === true){
            console.log('truedetected');
            var defaultcheckedvar = true;
        }
        else {
            var defaultcheckedvar = false;
        }
        return (
        <div className="col-sm-12">
        <form className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-4 control-label" htmlFor="bandsintownartisttextinput">Enter Bandsintown Artist Name:</label>
                <div className="col-sm-4">
                    <input type="text" id="bandsintownartistnametextinput" className="form-control" value={bandsintownartistnamedefaulttext} onChange={this.handleBandsintownArtistTextEntry}/>
                </div>
                <label className="col-sm-3 control-label" htmlFor="bandsintownwidget_active">Active:</label>
                <div className="col-sm-1">
                    <input type="checkbox" checked={this.state.bandsintownwidget_active} className="form-control" ref="bandsintownwidget_active" name="bandsintownwidget_active" id="bandsintownwidget_active" data-checked={this.state.bandsintownwidget_active} onChange={this.handleCheckedChange}/>
                </div>
            </div>
            <div style={submitstyle}><a onClick={this.submitBandsintownWidgetChange} >Submit</a></div>
        </form>
        </div>
        );
    }
});

</script>

</body>
</html>