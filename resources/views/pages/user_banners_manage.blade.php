<?php
        use Illuminate\Support\Facades\Auth;
        use App\Http\Requests;
$page = 'user_banners';
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
@include('includes.section_head')
@include ('includes.head_linkedresources')

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

@include ('flash')

<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

@include ('includes.top-spacer')

@include ('includes.user_title-header')

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>
<div class="col-sm-12"><p>To delete a banner image, click on the banner image.</p><p>To save an image, right-click and select "save as".</p></div>
<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>
<div id="managebanners"></div>
<?php include($endcontentcontainer); ?>
<?php include($middlespacer); ?>

<?php include_once($scripts); ?>
<br><br><br><br>

<script type="text/jsx">
/*** @jsx React.DOM */
$(document).ready(function(){

$_token = "<?php echo csrf_token(); ?>";

var BannerContainer = React.createClass ({

    getInitialState: function(){
        return {data: [], data1: []};
    },

    componentDidMount: function(){
        var projectid = $('#projectinfo').data('projectid');
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_user_banners_all",
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
                var uniqueresponse = parsedresponse.bannerimages;
                //var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({data: uniqueresponse});
                //renderreact(uniqueresponse, projectresponse);
            }.bind(this))
        })
    },

    render: function() {
        var containerstyle = {padding:0};
        //
        return(
        <div className="col-sm-12" style={containerstyle}>
            <div id="fbphotodisplay" ref="fbphotodisplay">
                <BannerList data={this.state.data} />
            </div>
        </div>
        );
    }
});

var BannerList = React.createClass ({

    render:function(){
        var banners = this.props.data.map(function(banner){
            return <CurrentBanner filename={banner.banner_filename} key={banner.banner_id} id={banner.banner_id} onBannerAddClick={this.handleIntermediate} />
        });
        var imgcontstyle = {};
        return (
            <div className="grid" id="get-user-photos-from-facebook">
            <div className="grid-sizer"></div>
            <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" style={imgcontstyle}>
                {banners}
            </div>
            </div>
        );
    }
});

var CurrentBanner = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){

    },

    onClick: function(){
        $('#bannerdetails').html('<img class="img img-responsive" id="currentmodalbanner" data-id="' + this.props.id + '" src="//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg"/>' +
        '<div style="display:block;text-align:center"><br>' +
        '<p><em>To copy the link to your banner, right click on the banner and select "Copy image URL"</em><br/><br/><a id="savecurrentbannerbutton" href="" download class="btn btn-primary">Save Banner</a><span style="padding:10px;"></span><button id="deletecurrentbannerbutton" class="btn btn-default">Delete Banner</button>');
        $('#myModal').modal();
        $('#deletecurrentbannerbutton').click(function(){
            this.handleDeleteButton();
        /*
            var id = this.props.id;
            var imagesrc = this.props.filename;
            var r = confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");
            if (r == true){
                $.ajax({
                    type: "POST",
                    url: "user/ajax/post/user_bannerdelete",
                    //dataType: "text"
                    data: {
                        "bannerimage_id": id,
                        "bannerimage_filename": imagesrc,
                        _token: $_token
                    },
                    error: (function () {
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    }),
                    success: (function (response) {
                        //console.log(response);
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                        //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                        //var data = [{}];
                        //var moveimageparsed = JSON.parse(moveimage);
                        //console.log(moveimage);
                        //setstatefunction(moveimage);
                    })
                });
            }
*/
        }.bind(this));
        $('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    onClickOld: function(){
        var id = this.props.id;
        var imagesrc = this.props.filename;
        var r = confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "user/ajax/post/user_bannerdelete",
                //dataType: "text"
                data: {
                    "bannerimage_id": id,
                    "bannerimage_filename": imagesrc,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    console.log(response);
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    console.log(moveimage);
                    setstatefunction(moveimage);
                })
            });
            var setstatefunction = function(moveimage){
                this.setState({ showComponent: false });
                console.log(moveimage);
                this.props.onBannerAddClick({data: []});
                return;
            }.bind(this)
        }
        else {}

    },

    handleDeleteButton: function(){
        var id = this.props.id;
        var imagesrc = this.props.filename;
        var r = confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "user/ajax/post/user_bannerdelete",
                //dataType: "text"
                data: {
                    "bannerimage_id": id,
                    "bannerimage_filename": imagesrc,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    //console.log(response);
                    $('#myModal').modal('hide');
                    this.setState({showComponent: false});
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    //var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    //console.log(moveimage);
                    //setstatefunction(moveimage);
                }.bind(this))
            });
        }
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var photostyle = {padding: '0.25%'};
        var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        var btndivstyle = {textAlign:'center'};
        var btnstyle = {marginTop:8};
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <div className="grid-item grid-item--width3" >
            <div className="imgclickable">
            <img id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />
            </div>
            <div style={btndivstyle}><button style={btnstyle} className="btn btn-default btn-xs" onClick={this.handleDeleteButton} >Delete Banner</button></div>
            </div>
        );
    }
});

React.render(<BannerContainer url="user/ajax/get/get_current_user_banners_all"/>, document.getElementById('managebanners'));

});
</script>


</body>
</html>