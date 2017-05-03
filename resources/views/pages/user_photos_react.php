<?php
        use Illuminate\Support\Facades\Auth;
        use Illuminate\Support\Facades\Session;
        use App\Http\Requests;
        use SammyK\FacebookQueryBuilder\FQB;
        use Facebook\Facebook;
        use Facebook\FacebookResponse;
        use App\Bannerimage;
        use App\User;
        use App\Project;

$page = 'user_banners';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
        $user = Auth::user();
    $projects = Auth::user()->projects->lists('project_name', 'project_url');
    $bannerimages = Auth::user()->bannerimages;
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
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        <div id="modalcontent"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<?php include($flash); ?>

<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

<?php include($topspacer); ?>

<div id="createnewbanner">
    <div class="container container-fixed">
        <div class="row contentcolor outershadow" style="padding:5px;">
            <div class="col-sm-12" style="padding:0px;" id="instructions">
                <div style="text-align: center;"><h3>To begin making a banner, click on one of your photos.</h3><p><em>To assign existing banners to projects, visit your <a href="<?php echo url('user/projects'); ?>">projects</a> page.</em></p>
                </div>
            </div>

            <div id="testcontainer4">
            </div>
        </div>
    </div>
</div>

<?php include($startcontentcontainer); ?>

    <div id="datastore"></div>
    <div id="testcontainer3"></div>
    <div id="testcontainer2"></div>
    <div class="col-sm-12" style="padding:0px;">
        <div id="endofcontainer"></div>

    </div>

<?php include($endcontentcontainer); ?>

<?php include($middlespacer); ?>
<?php //include($footer); ?>

<?php include($scripts); ?>

<script type="text/jsx">
/*** @jsx React.DOM */

$(document).ready(function(){

$_token = "<?php echo csrf_token(); ?>";

var fbphotodata = function(paginationclick, dataarray){
    console.log(dataarray);
    console.log(paginationclick);
    console.log('foo');
    $.ajaxSetup({cache: true});
    $.getScript('//connect.facebook.net/en_US/sdk.js', function () {

        FB.init({
            appId: '1618708688367645',
            version: 'v2.3',
            cookie: true
        });
        FB.getLoginStatus(function (response) {
            if (response.authResponse) {
                if (paginationclick === undefined){
                    FB.api('/me/photos', 'get', {limit: 24, fields: 'images, id, created_time, from, tags'}, function (response) { handleresponse(response, dataarray); });
                }
                else {
                    $.get(paginationclick, function(response){handleresponse(response, dataarray)});
                }
                var handleresponse = function(response, dataarray){
                console.log(response);
                //var data = [{id:response.data[0].id, link:response.data[0].source}];
                //console.log(data);

                    if (dataarray === undefined) {
                        var dataarray = [];
                        console.log('dataarray is undefined')
                    }
                    else {

                    console.log('dataarray is defined')
                    }
                    $.each(response.data, function(){
                    //dataarray.push({id:this.id, from_name:this.from.name, from_id:this.from.id, fb_created_time:this.created_time, link0:this.images[0].source, link1:this.images[1].source, link2:this.images[2].source, link3:this.images[3].source, link4:this.images[4].source, link5:this.images[5].source, link6:this.images[6].source, nextresult:this.tags.paging.cursors.after});
                        try{
                        dataarray.push({id:this.id, from_name:this.from.name, from_id:this.from.id, fb_created_time:this.created_time, link0:this.images[0].source, link3:this.images[3].source, nextresult:this.tags.paging.cursors.after});
                        }
                        catch(err) {
                        console.log('An image was not displayed due to an error getting the picture.')
                        }
                    });
                    var getnextresultslink = response.paging.next;
                    var pagination = [];
                    if (response.paging.previous){
                    pagination.push({label: 'Previous', id: 'previousfbphotobutton', link: response.paging.previous});
                    }
                    pagination.push({label: 'Next', id: 'nextfbphotobutton', link: response.paging.next});
                    console.log(pagination);
                    console.log(dataarray);

                    renderreact(dataarray, pagination, getnextresultslink);

                };
            }
            else{
            console.log('not logged in');
            }

        });
        //return(dataarray, pagination);
    });
};

fbphotodata();

var renderreact = function(dataarray, pagination, getnextresultslink){
React.initializeTouchEvents(true);
React.render(<PhotoContainer data={dataarray} data1={pagination} data2={getnextresultslink}/>, document.getElementById('testcontainer2'));
//React.render(<Pagination  />, document.getElementById('testcontainer3'));
};

//var displaydatarray = function(dataarray, pagination){

var PhotoContainer = React.createClass ({

    updateDimensions: function() {
        //var cont = React.findDOMNode(this.refs.fbphotodisplay);
        var top = $('#fbphotodisplay').scrollTop();
        var height = $('#fbphotodisplay').scrollHeight;
        var postop = $('#testcontainer2').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;
        var innerh = $(window).height();
        this.setState({
            postop: postop,
            height: height,
            endofcontainer: endofcontainer,
            visiblecontainerheight: visiblecontainerheight,
            heightpastvisiblecontainer: heightpastvisiblecontainer,
            top: top,
            innerh: innerh
            });
    },

    componentDidMount: function(){
        window.addEventListener("resize", this.updateDimensions);
        //var cont = React.findDOMNode(this.refs.fbphotodisplay);
        var postop = $('#testcontainer2').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var height = $('#fbphotodisplay').scrollHeight;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;

    },

    handleScroll: function(){
        var cont = React.findDOMNode(this.refs.fbphotodisplay);
        var top = $('#fbphotodisplay').scrollTop();
        var height = (cont).scrollHeight;
        var postop = $('#testcontainer2').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;
        var dataarray = this.props.data;
        var paginationclick = this.props.data2;
        var i = 0;
        console.log('i before if is ' + i);
        if (top > heightpastvisiblecontainer - visiblecontainerheight && i < 1){
        i++;
        console.log('i after if is ' + i);
        fbphotodata(paginationclick, dataarray);
        }
    },

    render: function() {
    var innerh = $(window).height();
    var postop = $('#testcontainer2').offset().top;
    var containerstyle = {padding:0};

    var facebookphotodisplaystyle = {height: innerh - postop - 80, overflow: 'auto'};
        return(
        <div className="col-sm-12" style={containerstyle}>
            <div id="fbphotodisplay" ref="fbphotodisplay" style={facebookphotodisplaystyle}  onScroll={this.handleScroll}>

            <PhotoList data={this.props.data} />
            </div>
        </div>
        );
    }
});

var PhotoList = React.createClass ({

    render:function(){
        console.log('here');
        console.log(this.props.data);
        var photos = this.props.data.map(function(photo){
            return <CurrentPhoto link0={photo.link0} link3={photo.link3} key={photo.id} id={photo.id} from_name={photo.from_name} from_id={photo.from_id} fb_created_time={photo.fb_created_time}/>
        });
        var imgcontstyle = {};
        return (
            <div className="grid" id="get-user-photos-from-facebook">
            <div className="grid-sizer"></div>
            <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" style={imgcontstyle}>
                {photos}
                </div>
            </div>
        );
    }
});

var CurrentPhoto = React.createClass ({

    onClick: function(){

        var facebookphoto_identifier = this.props.id;
        var facebookphoto_link0 = this.props.link0;
        var from_name = this.props.from_name;
        var from_id = this.props.from_id;
        var fb_created_time = this.props.fb_created_time;
        var fbphotoscrollcontaineroriginalheight = $('#fbphotodisplay').height();
        console.log(fbphotoscrollcontaineroriginalheight);
        var result = {photoidentifier:facebookphoto_identifier, adjustid:0, src:facebookphoto_link0};
        var dimensions = {from_name:from_name,from_id:from_id,width:960,height:640};
        React.unmountComponentAtNode(document.getElementById('testcontainer4'));
        React.render(<BannerCreationPanel response={result} dimensions={dimensions} />, document.getElementById('testcontainer4'));
        $('#instructions').hide();
        //React.render(<FlyerCreationPanel />, document.getElementById('testcontainer4'));
        //$('#slider').hide();
        $('html, body').animate({ scrollTop: 0 }, 355);
        //var dragheight = parseInt($('#drag').css('height'), 10);
        //var dragtopadjust = -(dragheight / 2 - 150);
        //$("#drag").css({top: "0px", left: "0px"});
        //$("#adjustbuttons").delay(10).hide();
        //$("#cropbutton").delay(10).hide();
        //$('#drag').empty();
        //$('<img class="bannerimageplaceholder" style="width:100%;height:100%;" data-photoidentifier="' + facebookphoto_identifier + '" data-adjustid="0" src="' + facebookphoto_link0 + '">').appendTo('#drag');
        //$('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Generating adjusted photos...').addClass('alert-info').fadeIn(355).removeClass('hidden');
        //$('.bannerimageplaceholder').css({width: 960, height: 'auto'});

        var top = $('#fbphotodisplay').scrollTop();
        var height = $('#fbphotodisplay').scrollHeight;
        var postop = $('#testcontainer2').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;
        var innerh = $(window).height();

        $('#fbphotodisplay').css({height: innerh - postop - 80});
        /*
        $.ajax({
            type: "GET",
            url: "user/ajax/any/user_flyeradjust",
            data: {
                "facebookphoto_identifier": facebookphoto_identifier,
                "facebookphoto_link0": facebookphoto_link0,
                "from_name": from_name,
                "from_id": from_id,
                "fb_created_time": fb_created_time,
                _token: $_token
            },
            error: (function () {
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            }),
            success: (function (response) {
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Drag the photo to position it.').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);

                var responsetoobject = JSON.parse(response);
                console.log(responsetoobject.result);
                console.log(responsetoobject.adjustdimensions);
                console.log(responsetoobject.adjustedthumbs);
                React.render(<FlyerCreationPanel response={responsetoobject.result} dimensions={responsetoobject.adjustdimensions} />, document.getElementById('testcontainer4'));
                $('.bannerimageplaceholder').hide();
                //$('#slider').show();
                //$("#adjustbuttons").show();
                //$("#cropbutton").show();
                //$('.bannerimage').css({width: '', height: ''});
                var top = $('#fbphotodisplay').scrollTop();
                var height = $('#fbphotodisplay').scrollHeight;
                var postop = $('#testcontainer2').offset().top;
                var endofcontainer = $('#endofcontainer').offset().top;
                var visiblecontainerheight = $('#fbphotodisplay').height();
                var heightpastvisiblecontainer = height - visiblecontainerheight;
                var innerh = $(window).height();
                //$('.bannerimage').css({width: 960, height: 'auto'});
                $('#fbphotodisplay').css({height: innerh - postop - 80});
            })
        });
        */
    },

    render: function() {
        var photostyle = {padding: '0.25%'};
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
        );
    }
});

var BannerCreationPanel = React.createClass({

  render: function() {
    console.log('getting this after initial image selection:');
    console.log(this.props.response);
    return (

    <div>
        <ImageOptionsForm response={this.props.response} dimensions={this.props.dimensions} />

    </div>
    );
  }
});

var ImageAdjustOptions = React.createClass ({

/*
<div className="col-xs-4">
                        <a href="javascript:void(0)" className="btn btn-default submit-adjust" id="submit0" data-submitadjustid="0">Original Image</a>
                    </div>
                    <div className="col-xs-4">
                        <a href="javascript:void(0)" className="btn btn-default submit-adjust" id="submit1" data-submitadjustid="1">Adjustment 1</a>
                    </div>
                    <div className="col-xs-4">
                        <a href="javascript:void(0)" className="btn btn-default submit-adjust" id="submit3" data-submitadjustid="3">Adjustment 3</a>
                    </div>
                    <div className="col-xs-4">
                        <a href="javascript:void(0)" className="btn btn-default submit-adjust" id="submit4" data-submitadjustid="4">Adjustment 4</a>
                    </div>
                    <div className="col-xs-4">
                        <a href="javascript:void(0)" className="submit-adjust" id="submit5" data-submitadjustid="5">Adjustment 5</a>
                    </div>*/

    render: function(){
    var adjustedthumbs = this.props.adjustedthumbs.map(function(adjustedthumb){
    return <ImageAdjustThumbButton src={adjustedthumb.src.encoded} adjustid={adjustedthumb.adjustid} key={adjustedthumb.adjustid}/>;
    });
    var adjustbuttoncontainerstyle = {padding:5};
    var containerstyle = {padding:0};
        return (
            <div className="col-sm-12" style={containerstyle}>
                <div id="adjustbuttons" style={adjustbuttoncontainerstyle} className="row">
                {adjustedthumbs}
                </div>
            </div>
        );
    }
});

var ImageAdjustThumbButton = React.createClass ({
    componentDidMount: function(){
        $('.submit-adjust').click(function($e){
            $e.preventDefault();
            $('.bannerimage').hide();
            $('.bannerimage[data-adjustid=' + $(this).data('adjustid') + ']').show();
        });
    },

    render: function(){
    var thumbcontainer = {padding: 3};
        return (
        <div className="col-sm-2 col-xs-4" style={thumbcontainer}>
            <img className="img img-responsive submit-adjust" src={this.props.src} data-adjustid={this.props.adjustid} />
        </div>
        );
    }
});

var ImageOptionsForm = React.createClass ({

    handleSubmit: function (event) {
        event.preventDefault();

        var from_name_node = React.findDOMNode(this.refs.from_name).checked;
        if (from_name_node == false){

        }
        else if (from_name_node == true){
        var from_name = React.findDOMNode(this.refs.from_name).value.trim();
        }


        var image_zoom = React.findDOMNode(this.refs.image_zoom).value.trim();
        var paddingint = parseFloat($('#padding-div').css('padding'));
        var dragposition = $('#drag').position();
        var dragpositiontop = -dragposition.top;
        var canvas = document.getElementById("dragcanvas");
        var imagedata = canvas.toDataURL("image/jpeg", 1.0);
        $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Creating your new banner image...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        $.ajax({
                type: "POST",
                url: "user/ajax/post/user_bannercropreact",
                data: {
                    //"facebookphoto_identifier": facebookphoto_identifier,
                    "imagedata": imagedata,
                    "dragpositiontop": dragpositiontop,
                    "from_name": from_name,
                    "image_zoom": image_zoom,
                    "paddingint": paddingint,
                    //"from_id": from_id,
                    //"fb_created_time": fb_created_time,
                    _token: $_token
                },
                error: (function () {
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
                }),
                success: (function (response) {
                //alert('Banner created successfully!');
                    $('#modalcontent').html('<img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' + response + '.jpg"/>' +
                        '<div style="display:block;text-align:center"><br>' +
                        '<p><em>To save your banner image, right click on the banner and select "save image as..."</em><br>To view all of your banner images, go to <a href="<?php echo url('user/banners'); ?>">your banner management page</a>.</p></div>');
                    $('#myModal').modal();
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner image has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
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
            zoomeddimensions: {
                zoomedwidth: this.props.dimensions.width,
                zoomedheight: this.props.dimensions.height
                },
            checkboxstate: {
                is_from_name_checked: true
            },
            image: {
                src: this.props.response.src
            }
        };
    },

    componentWillReceiveProps: function(nextProps) {
    console.log('component willreceiveprops ' + React.findDOMNode(this.refs.image_zoom).value);
    this.setState({
        data: {
            image_zoom: React.findDOMNode(this.refs.image_zoom).value,
            font_size: 30,
            font_stroke_size: '40px',
            font_color: '#ffffff',
            font_face: 'Roboto Condensed'
            },
        zoomeddimensions: {
            zoomedwidth: React.findDOMNode(this.refs.image_zoom).value * nextProps.dimensions.width * 0.01,
            zoomedheight: React.findDOMNode(this.refs.image_zoom).value * nextProps.dimensions.height * 0.01
            },
            checkboxstate: {is_from_name_checked: this.state.checkboxstate.is_from_name_checked},
            image: {
                src: this.props.response.src
            }
    });
    console.log('here is the state image src:');
    console.log(this.state.image.src);

    },

    componentDidUpdate: function() {
        var c = document.getElementById("dragcanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,2000,2000);

        var thephoto = new Image();

        thephoto.crossOrigin = "Anonymous";
        thephoto.src = this.props.response.src;

        thephoto.addEventListener("load", function() {
            thephoto.crossOrigin = "Anonymous";
            ctx.drawImage(thephoto,0,0,960,640,0,0,960,640);
         }, false);
    },

    handleChange1: function() {
    this.setState({
        data: {
            image_zoom: React.findDOMNode(this.refs.image_zoom).value,
            font_size: 36,
            font_stroke_size: '40px',
            font_color: '#ffffff',
            font_face: 'Roboto Condensed'
            },
        zoomeddimensions: {
            zoomedwidth: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01,
            zoomedheight: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01
            },
            checkboxstate: {is_from_name_checked: this.state.checkboxstate.is_from_name_checked}
    });
    },

    handleSlider: function() {

        $(function() {
            $( "#slider" ).slider({
              value:100,
              min: 1,
              max: 100,
              step: 1,
              slide: function( event, ui ) {
                $( "#image_zoom" ).val( ui.value );
                foo();
              },
              stop: function( event, ui){
              console.log($('#drag').position().left + ';ALSKJDal;skjdL;ASKJDK;shfklhfkl;DSDJHFSJDHFSKN;LASKJDal;kdja;sldjsl;dhgfjhsd;klfjaskljklfdjghfdlkghs;dlkfjs;dlkfj');

                while ($('#drag').height() < $('#parentfordraggable').height() || $('#drag').width() < $('#parentfordraggable').width()){
                    var old = $('#image_zoom').val();
                    var oldint = parseInt(old);
                    console.log('old is ' + oldint);
                    console.log(typeof(oldint));
                    var newe = oldint + 1;
                    console.log('newe is ' + newe);
                    $( "#slider" ).slider("value", newe);
                    $('#image_zoom').val(newe);
                foo();
                }
                while ($('#drag').width() + $('#drag').position().left < $('#drag').parent().width()){
                    var oldpos = $('#drag').position().left;
                    console.log('oldpos is ' + oldpos);
                    var newpos = oldpos + 1;
                    console.log('newpos is ' + newpos);
                    $('#drag').css({left: newpos});
                    //foo();
                }
                while ($('#drag').height() + $('#drag').position().top < $('#drag').parent().height()){
                    var oldposv = $('#drag').position().top;
                    console.log('oldpos is ' + oldposv);
                    var newposv = oldposv + 1;
                    console.log('newpos is ' + newposv);
                    $('#drag').css({top: newposv});
                    //foo();
                }
                foo();

              }
            });
            $( "#image_zoom" ).val( $( "#slider" ).slider( "value" ));
        });

        var foo = function(){
            this.handleChange1();
        }.bind(this);

        var bar = function(){

        while ($('#drag').height() < $('#parentfordraggable').height()){
        console.log('foo');
        var incrementer = this.state.data.image_zoom ++;
        this.setState({
            data: {
                performer_name: React.findDOMNode(this.refs.project_name).value,
                performer_name_extra: React.findDOMNode(this.refs.project_name_extra).value,
                venue_name: React.findDOMNode(this.refs.venue_name).value,
                venue_name_prefix: React.findDOMNode(this.refs.venue_name_prefix).value,
                event_startweekday: React.findDOMNode(this.refs.event_startweekday).value,
                event_startmonth: React.findDOMNode(this.refs.event_startmonth).value,
                event_startday: React.findDOMNode(this.refs.event_startday).value,
                event_starthour: React.findDOMNode(this.refs.event_starthour).value,
                event_startminute: React.findDOMNode(this.refs.event_startminute).value,
                event_startampm: React.findDOMNode(this.refs.event_startampm).value,
                image_zoom: React.findDOMNode(this.refs.image_zoom).value,
                font_stroke_size: '40px',
                font_color: '#ffffff',
                font_face: 'Roboto Condensed'
                },
            zoomeddimensions: {
                zoomedwidth: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01,
                zoomedheight: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01
                },
            checkboxstate: {is_from_name_checked: this.state.checkboxstate.is_from_name_checked}
        });
        }
        }.bind(this)
    },

    componentDidMount: function(){
    this.handleSlider();
    },

    adjustPrep: function(){
        var c = document.getElementById("dragcanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,2000,2000);

        var thephoto = new Image();
        thephoto.crossOrigin = "Anonymous";
        thephoto.src = this.state.image.src;

        thephoto.addEventListener("load", function() {
            ctx.drawImage(thephoto,0,0,960,640,0,0,960,640);
        }, false);
        return thephoto;
    },

    onAdjustOriginal: function(){
        var thephoto = null;
        this.adjustPrep();
    },

    onAdjustGreyscale: function(){
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.greyscale();
            this.render();
        });
    },

    onAdjustVintage: function (){
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.greyscale();this.contrast(5);this.noise(3);this.sepia(100);this.channels({red:8,blue:2,green:4});this.gamma(0.87);
            this.render();
        });
    },

    onAdjustLomo: function(){
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.brightness(15);this.exposure(15);this.curves("rgb",[0,0],[200,0],[155,255],[255,255]);this.saturation(-20);this.gamma(1.8);
            this.render();
        });
    },

    onAdjustClarity: function (){
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.vibrance(20);this.curves("rgb",[5,0],[130,150],[190,220],[250,255]);this.sharpen(15);this.vignette("45%",20);
            this.render();
        });
    },

    onAdjustSinCity: function (){
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.contrast(100);this.brightness(15);this.exposure(10);this.posterize(80);this.clip(30);this.greyscale();
            this.render();
        });
    },

    onAdjustLove: function (){
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.brightness(5);this.exposure(8);this.contrast(4);this.colorize("#c42007",30);this.vibrance(50);this.gamma(1.3);
            this.render();
        });
    },

    handleCheckedChange: function(){
        this.setState({checkboxstate: {is_from_name_checked: !this.state.checkboxstate.is_from_name_checked}});
        //this.forceUpdate();
    },

    render: function() {
    var sliderstyle = {marginLeft:0, marginRight:0};
    var containerstyle = {padding:0};
    console.log('the checkbox state is:');
    console.log(this.state.checkboxstate.is_from_name_checked);
    return (
    <div>
        <div className="col-sm-12" data-initialwidth={this.props.dimensions.width} data-initialheight={this.props.dimensions.height} style={containerstyle}>
        <h4>Banner Preview</h4>
        <p><em>To view and approve your final version, press submit.</em></p><p>{this.state.checkboxstate.is_from_name_checked}</p>
            <ImageAdjustPanel checkbox={this.state.checkboxstate} data={this.state.data} response={this.props.response} zoomeddimensions={this.state.zoomeddimensions} dimensions={this.props.dimensions}/>
        </div>
        <div className="col-sm-12" style={containerstyle}>
            <form className="form-horizontal" id="myForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-xs-12">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" ref="from_name" name="from_name" id="from_name" value={this.props.dimensions.from_name} data-checked={this.state.checkboxstate.is_from_name_checked} defaultChecked onChange={this.handleCheckedChange}/>Credit {this.props.dimensions.from_name}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-4 col-xs-offset-4">
                        <input className="form-control" type="submit" value="Create"/>
                    </div>
                </div>
                <div className="form-group">
                    <input className="form-control" type="hidden" ref="image_zoom" id="image_zoom" name="image_zoom" onChange={this.handleChange1}/>
                </div>
            </form>
        </div>
        <div className="col-sm-12" style={containerstyle}>
            <div className="btn btn-default" onClick={this.onAdjustOriginal} >Original</div>
            <div className="btn btn-default" onClick={this.onAdjustGreyscale} >Greyscale</div>
            <div className="btn btn-default" onClick={this.onAdjustVintage} >Vintage</div>
            <div className="btn btn-default" onClick={this.onAdjustLomo} >Lomo</div>
            <div className="btn btn-default" onClick={this.onAdjustClarity} >Clarity</div>
            <div className="btn btn-default" onClick={this.onAdjustSinCity} >Sin City</div>
            <div className="btn btn-default" onClick={this.onAdjustLove} >Love</div>
        </div>
    </div>
    );
    }
});

var ImageAdjustPanel = React.createClass ({

    getInitialState: function() {

        return {
            sizing:{
            },
            hidden:{

            }
        };
    },

    componentDidMount: function() {
        this.containerResize();



        //console.log(adjustpercentage);

        $( window).resize(function(){
            this.containerResize();
        });
    },

    containerResize: function(){
        var dragcontainerwidth = $('#drag-container').width();
        console.log('dragcontainer width is ' + dragcontainerwidth);
        var dragcontainersetheight = dragcontainerwidth * 0.37;
        $('#drag-container').height(dragcontainersetheight);
        $('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);
        var dragcontainerfullwidth = 960;
        var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;
        this.textResize(adjustpercentage);
    },

    textResize: function(adjustpercentage){

        this.setState({
            sizing:{
            }
        });
    },

    componentDidUpdate: function(){
    console.log('component updated');
    var thetext = React.findDOMNode(this.refs.from_name_text);
        console.log(thetext);
        if (this.props.checkbox.is_from_name_checked == false){
        console.log('foundfalse');
            $('#from_name_text').hide();
            $('#line_text').hide();
        }
        if (this.props.checkbox.is_from_name_checked == true){
        console.log('foundfalse');
            $('#from_name_text').show();
            $('#line_text').show();
        }
    },

    render: function() {
    console.log('adjustpanel initial dimensions are ' + this.props.dimensions.width + 'x' + this.props.dimensions.height);
    console.log('adjustpanel zoomed dimensions are ' + this.props.zoomeddimensions.zoomedwidth + 'x' + this.props.zoomeddimensions.zoomedheight);
    var containerStyle = {position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block'};
    var dragcontainerstyle = {position:'relative', width: '100%', maxWidth: 960, overflow: 'hidden'};
    var fromname = {display:'inline-block', position:'absolute', top: 312, left: 5, zIndex:10, pointerEvents: 'none', fontSize: 16, color: this.props.data.font_color, fontFamily: 'vladimir_script'};
    //var fromname = {display: 'inline-block', position: 'relative', cssFloat: 'left'};
    var musiclocalname = {display:'inline-block', position:'absolute', top: 334, left: 5, zIndex:10, pointerEvents: 'none', fontSize: 12, color: this.props.data.font_color, fontFamily: 'Open Sans', fontStyle: 'italic', paddingRight:10};
    var line = {display:'inline-block', position:'absolute', top: 334, left: 5, zIndex:10, pointerEvents: 'none',borderTop: '1px solid #ffffff', width: 145};
    var dragstyle2 = {position:'absolute', top: 0, left: 0};

        return (
            <div style={containerStyle} id="padding-div">
                <div style={dragcontainerstyle} id="drag-container">

                        <div style={fromname} ref="from_name_text" id="from_name_text">Original by {this.props.dimensions.from_name} </div>
                        <div style={line} ref="line_text" id="line_text"></div>
                        <div style={musiclocalname}>created with musiclocal</div>
                        <div style={dragstyle2} id="parentfordraggable">
                        <DragDiv data={this.props.data} response={this.props.response} zoomeddimensions={this.props.zoomeddimensions} dimensions={this.props.dimensions} />
                    </div>
                </div>
            </div>
        );
    }
});

var DragDiv = React.createClass({

    componentDidMount: function() {

        $('#drag').draggable({
            stop: function(ev, ui) {
                var hel = ui.helper, pos = ui.position;
                //horizontal
                //console.log('draggable pos is ' + pos);
                var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
                if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {    //deleted to edit for absolute positioning
                    hel.animate({ top: h });  //deleted to edit for absolute positioning
                //} else if (pos.top <= 0) {
                //    hel.animate({ top: 0 });
                }
                // vertical
                var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
                //var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
                //var v = -(hel.outerWidth());
                //console.log('draggable v is ' + v);
                //console.log(v);
                if (pos.left >= 0) {
                    hel.animate({ left: 0 });
                } else if (pos.left <= v) {   //deleted to edit for absolute positioning
                //} else if (pos.left <= 0) {
                    hel.animate({ left: v });   //deleted to edit for absolute positioning
                //    hel.animate({ left: 0 });
                }
            }
        });
        /*
        componentDidUpdate seems to get triggered every single time, so this shouldn't matter.

        var c = document.getElementById("dragcanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,2000,2000);

        var thephoto = new Image();

        thephoto.addEventListener("load", function() {
            //ctx.drawImage(thephoto,0,0,960,640,0,0,960,640);
                     Caman("#dragcanvas", thephoto.src, function () {
         this.greyscale();
         this.render();
         });
            console.log('camandidload');
         }, false);
         thephoto.src = this.props.response.src;
         thephoto.crossOrigin = "Anonymous";
         */

        console.log('image adjust panel updated');
        var c = document.getElementById("dragcanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,2000,2000);

        var thephoto = new Image();

        var canvasnode = React.findDOMNode(this.refs.dragcanvas);
        thephoto.crossOrigin = "Anonymous";
        thephoto.src = this.props.response.src;

        console.log(thephoto);

        //thephoto.toDataURL("image/jpg");
        console.log(thephoto);

        thephoto.addEventListener("load", function(canvasnode) {
            ctx.drawImage(thephoto,0,0,960,640,0,0,960,640);
            console.log('event listener triggered');
            console.log(thephoto.src);
            //console.log(canvasnode);



            console.log('update');
         }, false);
    },



    componentDidUpdate: function(){



    },

    handleTouchEnd: function(){ //Solves problem on iPhone where overflow:hidden sections of image are not draggable; do not remove!!!
        $('#drag').draggable({
        stop: function(ev, ui) {
            var hel = ui.helper, pos = ui.position;
            //horizontal
            var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
            if (pos.top >= 0) {
                hel.animate({ top: 0 });
            } else if (pos.top <= h) {
                hel.animate({ top: h });
            }
            var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
            //console.log(v);
            if (pos.left >= 0) {
                hel.animate({ left: 0 });
                hel.animate({ left: 0 });
            } else if (pos.left <= v) {
                hel.animate({ left: v });
            }
        }
    });
    },

    render: function() {
    console.log(this.props.response);
    console.log('pre-render dragdiv width is ' + this.props.zoomeddimensions.zoomedwidth);
   /*
        var images = this.props.response.map(function(image){
        var width = this.props.zoomeddimensions.zoomedwidth;
        var height = this.props.zoomeddimensions.zoomedheight;
            return <AdjustedImage classes="bannerimage" photoidentifier={image.photoidentifier} adjustid={image.adjustid} key={image.adjustid} src={image.src.encoded} width={width} height={height}/>
        }.bind(this));

*/
        console.log('dragdiv width is ' + this.props.zoomeddimensions.zoomedwidth);
        var dragdivstyle = {display:'inline-block', width: this.props.zoomeddimensions.zoomedwidth, height: this.props.zoomeddimensions.zoomedheight};
        var canvasstyle = {display:'inline-block',width: this.props.zoomeddimensions.zoomedwidth, height: this.props.zoomeddimensions.zoomedheight};
        return (
            <div id="drag" style={dragdivstyle} onTouchEnd={this.handleTouchEnd}>
            <canvas id="dragcanvas" ref="dragcanvas" width="960" height="640"></canvas>

            </div>
        );
    }
});

var AdjustedImage = React.createClass ({

    render:function() {
    if (this.props.adjustid !== 0){
    var style  = {display:'none', width: this.props.width, height: this.props.height};
    }
    else {var style = {width: this.props.width, height: this.props.height}}

    return (
        <img className={this.props.classes} style={style} src={this.props.src} data-photoidentifier={this.props.photoidentifier} data-adjustid={this.props.adjustid} />
    );
    }
});

var DisplayCaptions = React.createClass ({

    render: function(){
        console.log(this.props.data);
        console.log(this.props.data.performer_name);
        //var performer_name_caption =
        return (
        <div>
            <p>{this.props.data.performer_name}</p>
            <p>{this.props.data.venue_name}</p>
        </div>
        );
    }
});

});
</script>

</body>
</html>