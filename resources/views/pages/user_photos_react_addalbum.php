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
        <style>
        .flash {
            display: none;
            position:absolute;
            bottom:50px;
            right:15px;
            z-index:100;
        }

    </style>

<body>
<?php include($flash); ?>

<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

<?php include($topspacer); ?>

<?php include($startcontentcontainer); ?>

<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>

<div class="container collapse" id="collapseCreateAProject">
    <div class="row contentcolor outershadow" style="padding-left:1%; padding-right:1%; padding-top:20px; padding-bottom:20px;">
        <div class="col-sm-12">

        </div>
<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>
<div id="managebanners"></div>
<?php include($endcontentcontainer); ?>
<?php include($middlespacer); ?>
<?php include($startcontentcontainer); ?>
<div class="col-sm-12">



</div>

<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>
<?php include_once($scripts); ?>
<br><br><br><br>

<script>
$(document).ready( function() {
/*
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
*/
</script>

<script type="text/jsx">
/*** @jsx React.DOM */
$(document).ready(function(){

$_token = "<?php echo csrf_token(); ?>";

var NewPhotoalbumContainer = React.createClass ({

    getInitialState: function(){
        return {data: [], data1: []};
    },

    componentDidMount: function(){
        var projectid = $('#projectinfo').data('projectid');
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_user_photoalbums",
            data: {
            //"projectid": projectid
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var parsedresponse = JSON.parse(response);
                var photoalbumresponse = parsedresponse.photoalbumarray;
                //var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({data: photoalbumresponse});
                //renderreact(uniqueresponse, projectresponse);
            }.bind(this))
        })
    },

    handleBannerAdd: function(banner){
        //var banners = this
        console.log('handle banner add in top level component triggered');
    },

    render: function() {
        var containerstyle = {padding:0};
        //<ProjectBannerList data1={this.state.data1} />
        return(
        <div className="col-sm-12" style={containerstyle}>
            <div id="fbphotodisplay" ref="fbphotodisplay">
                <PhotoalbumCreateForm />
                <PhotoalbumList data={this.state.data} onBannerAddClick={this.handleBannerAdd} />
            </div>
        </div>
        );
    }
});

var PhotoalbumList = React.createClass ({

    handleIntermediate: function(moveimage){

    console.log('triggered intermediate function');
    //this.props.onBannerAddClick(moveimage);
    },

    render:function(){
        var photoalbums = this.props.data.map(function(photoalbum){
            return <CurrentAlbum name={photoalbum.photoalbum_name} key={photoalbum.photoalbum_name} id={photoalbum.photoalbum_id} onBannerAddClick={this.handleIntermediate} />
        });
        var imgcontstyle = {};
        return (
            <div className="grid" id="get-user-photos-from-facebook">
            <div className="grid-sizer"></div>
            <br/>
            <h4>Your photo albums:</h4>
            <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" style={imgcontstyle}>
                {photoalbums}
            </div>
            </div>
        );
    }
});

var CurrentAlbum = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    onClick: function(){

    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var photostyle = {padding: '0.25%'};
        //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />
            <div><p>{this.props.name}</p></div>
        );
    }
});

var PhotoalbumCreateForm = React.createClass ({

    handleSubmit: function (event) {
        event.preventDefault();
        var newphotoalbumname = React.findDOMNode(this.refs.newphotoalbumname).value.trim();
        console.log(newphotoalbumname);
        $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Creating your new banner image...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        $.ajax({
                type: "POST",
                url: "user/ajax/post/add_photoalbum",
                data: {
                    "photoalbum_name": newphotoalbumname,
                    //"fb_created_time": fb_created_time,
                    _token: $_token
                },
                error: (function () {
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
                }),
                success: (function (response) {
                console.log(response);
                //alert('Banner created successfully!');
                    $('#modalcontent').html('<img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' + response + '.jpg"/>' +
                        '<div style="display:block;text-align:center"><br>' +
                        '<p><em>To save your banner image, right click on the banner and select "save image as..."</em><br>To view all of your banner images, go to <a href="<?php echo url('user/banners'); ?>">your banner management page</a>.</p></div>');
                    $('#myModal').modal();
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo album has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
                    //$('#drag').append(response);
                    //$("#adjustbuttons").delay(800).show(355);
                    //$("#cropbutton").delay(800).show(355);
                })
            });

        return;
    },

    getInitialState: function() {
        return {
            data: {
                performer_name: '',
                performer_name_extra: '',
                venue_name: '',
                venue_name_prefix: 'at',
                event_startweekday: 'Fri.',
                event_startmonth: '7',
                event_startday: '7',
                event_starthour: '7',
                event_startminute: '00',
                event_startampm: 'pm',
                image_zoom: 100,
                font_size: 30,
                font_color: '#ffffff'
                },
            checkboxstate: {
                is_from_name_checked: true
            }
        };
    },

    componentWillReceiveProps: function(nextProps) {
    this.setState({
        data: {
            font_size: 30,
            font_stroke_size: '40px',
            font_color: '#ffffff',
            font_face: 'Roboto Condensed'
            },
            checkboxstate: {is_from_name_checked: this.state.checkboxstate.is_from_name_checked}
    });

    },

    componentDidUpdate: function() {
    },

    handleChange1: function() {
    this.setState({
        data: {
            font_size: 36,
            font_stroke_size: '40px',
            font_color: '#ffffff',
            font_face: 'Roboto Condensed'
            },
            checkboxstate: {is_from_name_checked: this.state.checkboxstate.is_from_name_checked}
    });
    },

    render: function() {
    var sliderstyle = {marginLeft:0, marginRight:0};
    var containerstyle = {padding:0};
    console.log('the checkbox state is:');
    console.log(this.state.checkboxstate.is_from_name_checked);
    return (
    <div>

        <div className="col-sm-12" style={containerstyle}>
            <form className="form-horizontal" id="myForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-xs-12">
                        <div className="checkbox">
                            <label>
                                <input type="text" className="form-control" ref="newphotoalbumname"/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-4 col-xs-offset-4">
                        <input className="form-control" type="submit" value="Create"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
    }
});



React.render(<NewPhotoalbumContainer url="user/ajax/get/get_current_user_banners_links"/>, document.getElementById('managebanners'));

});
</script>


</body>
</html>