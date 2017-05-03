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
<?php include($flash); ?>

<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

<?php include($topspacer); ?>

<div id="createnewbanner">
    <div class="container container-fixed">
        <div class="row contentcolor outershadow" style="padding:0px;">
            <div class="col-sm-12" style="padding:0px;" id="instructions">
                <div style="text-align: center;"><h3>To begin making a flyer, click on one of your photos.</h3><p><em>To assign existing banners to projects, visit your <a href="<?php echo url('user/projects'); ?>">projects</a> page.</em></p>
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
    <div class="col-sm-12">
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


    var facebookphotodisplaystyle = {height: innerh - postop - 80, overflow: 'auto'};
        return(
        <div className="col-sm-12">
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
        $('#instructions').hide();
        //React.render(<FlyerCreationPanel />, document.getElementById('testcontainer4'));
        //$('#slider').hide();
        $('html, body').animate({ scrollTop: 0 }, 300);
        //var dragheight = parseInt($('#drag').css('height'), 10);
        //var dragtopadjust = -(dragheight / 2 - 150);
        //$("#drag").css({top: "0px", left: "0px"});
        //$("#adjustbuttons").delay(10).hide();
        //$("#cropbutton").delay(10).hide();
        //$('#drag').empty();
        $('<img class="bannerimageplaceholder" style="width:100%;height:100%;" data-photoidentifier="' + facebookphoto_identifier + '" data-adjustid="0" src="' + facebookphoto_link0 + '">').appendTo('#drag');
        $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Generating adjusted photos...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        $('.bannerimageplaceholder').css({width: 960, height: 'auto'});

        var top = $('#fbphotodisplay').scrollTop();
        var height = $('#fbphotodisplay').scrollHeight;
        var postop = $('#testcontainer2').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;
        var innerh = $(window).height();

        $('#fbphotodisplay').css({height: innerh - postop - 80});

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
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Drag the photo to position it.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var responsetoobject = JSON.parse(response);
                console.log(responsetoobject.result);
                console.log(responsetoobject.adjustdimensions);
                console.log(responsetoobject.adjustedthumbs);
                React.render(<FlyerCreationPanel response={responsetoobject.result} dimensions={responsetoobject.adjustdimensions} adjustedthumbs={responsetoobject.adjustedthumbs} />, document.getElementById('testcontainer4'));
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
    },

    render: function() {
        var photostyle = {padding: '0.25%'};
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
        );
    }
});
/*
var Pagination = React.createClass ({
    render: function() {
        var createLinks = this.props.data1.map(function(link) {
        return <PaginationLink link={link.link} id={link.id} label={link.label} key={link.id}/>
        });
        //var dataarray = this.props.data0;
    return(
        <div data-dataarray={this.props.data} ref="dataarraycontainer">
            {createLinks}
        </div>
    );
    }
});

var PaginationLink = React.createClass ({

    onClick: function(){
        var paginationclick = this.props.link;
        var node = this.props.data;
        //var node = (React.findDOMNode(this.refs.dataarraycontainer)).data['dataarray'];
        console.log(node);
        fbphotodata(paginationclick);
    },

    onTouchStart: function(){
        var paginationclick = this.props.link;
        console.log(paginationclick);
        fbphotodata(paginationclick);
    },

    render: function () {
            return (
            <span id={this.props.id}>
            <a onClick={this.onClick} onTouchStart={this.onTouchStart} data-hrefa={this.props.link} id="fbphotopage">{this.props.label}</a>
            </span>
            );
    }
});*/

var FlyerCreationPanel = React.createClass({

  render: function() {
    return (

    <div>
        <ImageOptionsForm response={this.props.response} dimensions={this.props.dimensions} adjustedthumbs={this.props.adjustedthumbs} />

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
        return (
            <div className="col-sm-12">
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
        var project_name = React.findDOMNode(this.refs.project_name).value.trim();
        var project_name_extra = React.findDOMNode(this.refs.project_name_extra).value.trim();
        var venue_name_prefix = React.findDOMNode(this.refs.venue_name_prefix).value.trim();
        var venue_name = React.findDOMNode(this.refs.venue_name).value.trim();
        var event_startweekday = React.findDOMNode(this.refs.event_startweekday).value.trim();
        var event_startmonth = React.findDOMNode(this.refs.event_startmonth).value.trim();
        var event_startday = React.findDOMNode(this.refs.event_startday).value.trim();
        var event_starthour = React.findDOMNode(this.refs.event_starthour).value.trim();
        var event_startminute = React.findDOMNode(this.refs.event_startminute).value.trim();
        var event_startampm = React.findDOMNode(this.refs.event_startampm).value.trim();
        var from_name = React.findDOMNode(this.refs.from_name).value.trim();
        var image_zoom = React.findDOMNode(this.refs.image_zoom).value.trim();
        var paddingint = parseFloat($('#padding-div').css('padding'));
        console.log(project_name);
        $.ajax({
                type: "POST",
                url: "user/ajax/post/user_flyercrop",
                data: {
                    //"facebookphoto_identifier": facebookphoto_identifier,
                    "project_name": project_name,
                    "project_name_extra": project_name_extra,
                    "venue_name_prefix": venue_name_prefix,
                    "venue_name": venue_name,
                    "event_startweekday": event_startweekday,
                    "event_startmonth": event_startmonth,
                    "event_startday": event_startday,
                    "event_starthour": event_starthour,
                    "event_startminute": event_startminute,
                    "event_startampm": event_startampm,
                    "from_name": from_name,
                    "image_zoom": image_zoom,
                    "paddingint": paddingint,
                    "performer_name_style_full_top": 1,
                    "performer_name_style_full_left": 6,
                    "performer_name_style_full_fontSize": 42,

                    "performer_name_extra_style_full_top": 48,
                    "performer_name_extra_style_full_left": 36,
                    "performer_name_extra_style_full_fontSize": 32,

                    "venue_name_prefix_style_full_fontSize": 30,

                    "venue_name_style_full_bottom": 44,
                    "venue_name_style_full_right": 6,
                    "venue_name_style_full_fontSize": 36,

                    "event_startdatetime_style_full_bottom": 20,
                    "event_startdatetime_style_full_right": 6,
                    "event_startdatetime_style_full_fontSize": 28,
                    //"from_id": from_id,
                    //"fb_created_time": fb_created_time,
                    _token: $_token
                },
                error: (function () {
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Drag the photo to position it.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    $('#drag').append(response);
                    $("#adjustbuttons").delay(800).show(300);
                    $("#cropbutton").delay(800).show(300);
                })
            });
        //React.findDOMNode(this.refs.project_name).value = '';
        //React.findDOMNode(this.refs.venue_name).value = '';
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
                }
        };
    },

    componentWillReceiveProps: function(nextProps) {
    console.log('component willreceiveprops ' + React.findDOMNode(this.refs.image_zoom).value);
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
            font_size: 30,
            font_stroke_size: '40px',
            font_color: '#ffffff',
            font_face: 'Roboto Condensed'
            },
        zoomeddimensions: {
            zoomedwidth: React.findDOMNode(this.refs.image_zoom).value * nextProps.dimensions.width * 0.01,
            zoomedheight: React.findDOMNode(this.refs.image_zoom).value * nextProps.dimensions.height * 0.01
            }
    });
    },

    componentDidUpdate: function() {

    },

    handleChange1: function() {
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
            font_size: 36,
            font_stroke_size: '40px',
            font_color: '#ffffff',
            font_face: 'Roboto Condensed'
            },
        zoomeddimensions: {
            zoomedwidth: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01,
            zoomedheight: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01
            }
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
            }
    });
    }
    }.bind(this)
    },

    componentDidMount: function(){
    this.handleSlider();
    },

    render: function() {
    var sliderstyle = {marginLeft:0, marginRight:0};
    return (
    <div>
        <div className="col-sm-7" data-initialwidth={this.props.dimensions.width} data-initialheight={this.props.dimensions.height}>
        <h4>Flyer Preview</h4>
        <p><em>To view and approve your final version, press submit.</em></p>
            <ImageAdjustPanel data={this.state.data} response={this.props.response} zoomeddimensions={this.state.zoomeddimensions} dimensions={this.props.dimensions}/>
            <div id="slider" onMouseUp={this.handleChange1} style={sliderstyle}></div>
        </div>
        <div className="col-sm-5">
            <form className="form-horizontal" id="myForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-xs-12">
                        <label htmlFor="performer_name">Performer Name</label>
                        <input className="form-control" type="text" ref="project_name" name="project_name" id="project_name" onChange={this.handleChange1}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12">
                        <label htmlFor="performer_name">(Optional) Extra Info</label>
                        <input className="form-control" type="text" ref="project_name_extra" name="project_name_extra" id="project_name_extra" onChange={this.handleChange1}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12"><label htmlFor="venue_name">Venue Name</label></div>
                    <div className="col-xs-2">
                        <input className="form-control" type="text" ref="venue_name_prefix" name="venue_name_prefix" id="venue_name_prefix" value={this.state.data.venue_name_prefix} onChange={this.handleChange1}/>
                    </div>
                    <div className="col-xs-10">

                        <input className="form-control" type="text" ref="venue_name" name="venue_name" id="venue_name" value={this.state.data.venue_name} onChange={this.handleChange1}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-4">
                        <label htmlFor="event_startweekday">Day:</label>
                        <select className="form-control" ref="event_startweekday" name="event_startweekday" id="event_startweekday" value={this.state.data.event_startweekday} onChange={this.handleChange1} >
                            <option>Sun.</option>
                            <option>Mon.</option>
                            <option>Tues.</option>
                            <option>Wed.</option>
                            <option>Thurs.</option>
                            <option>Fri.</option>
                            <option>Sat.</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <label htmlFor="event_startmonth">Event Month</label>
                        <select className="form-control" ref="event_startmonth" name="event_startmonth" id="event_startmonth" value={this.state.data.event_startmonth} onChange={this.handleChange1} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <label htmlFor="event_startday">Day</label>
                        <select className="form-control" ref="event_startday" name="event_startday" id="event_startday" value={this.state.data.event_startday} onChange={this.handleChange1} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-4">
                        <label htmlFor="event_starthour">Hour</label>
                        <select className="form-control" ref="event_starthour" name="event_starthour" id="event_starthour" value={this.state.data.event_starthour} onChange={this.handleChange1} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <label htmlFor="event_startminute">Minute</label>
                        <select className="form-control" ref="event_startminute" name="event_startminute" id="event_startminute" value={this.state.data.event_startminute} onChange={this.handleChange1} >
                            <option>00</option>
                            <option>05</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>35</option>
                            <option>40</option>
                            <option>45</option>
                            <option>50</option>
                            <option>55</option>
                        </select>
                    </div>
                    <div className="col-xs-4">
                        <label htmlFor="event_startampm">AM/PM</label>
                        <select className="form-control" ref="event_startampm" name="event_startampm" value={this.state.data.event_startampm} onChange={this.handleChange1} >
                            <option>am</option>
                            <option>pm</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" ref="from_name" name="from_name" id="from_name" value={this.props.dimensions.from_name} checked onChange={this.handleChange2}/>Credit {this.props.dimensions.from_name}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12">
                        <input className="form-control" type="submit" value="Post"/>
                    </div>
                </div>
                <div className="form-group">
                    <input className="form-control" type="hidden" ref="image_zoom" id="image_zoom" name="image_zoom" onChange={this.handleChange1}/>
                </div>
            </form>
        </div>
        <div className="col-sm-12">
            <ImageAdjustOptions adjustedthumbs={this.props.adjustedthumbs}/>
        </div>
    </div>
    );
    }
});

var ImageAdjustPanel = React.createClass ({

    getInitialState: function() {
        var adjustpercentage = 1;
        var performer_name_style_full_top = 1;
        var performer_name_style_adjusted_top = performer_name_style_full_top * adjustpercentage;
        var performer_name_style_full_left = 6;
        var performer_name_style_adjusted_left = performer_name_style_full_left * adjustpercentage;
        var performer_name_style_full_fontSize = 42;
        var performer_name_style_adjusted_fontSize = performer_name_style_full_fontSize * adjustpercentage;

        var performer_name_extra_style_full_top = 48;
        var performer_name_extra_style_adjusted_top = performer_name_extra_style_full_top * adjustpercentage;
        var performer_name_extra_style_full_left = 36;
        var performer_name_extra_style_adjusted_left = performer_name_extra_style_full_left * adjustpercentage;
        var performer_name_extra_style_full_fontSize = 32;
        var performer_name_extra_style_adjusted_fontSize = performer_name_extra_style_full_fontSize * adjustpercentage;

        var venue_name_prefix_style_full_fontSize = 30;
        var venue_name_prefix_style_adjusted_fontSize = venue_name_prefix_style_full_fontSize * adjustpercentage;

        var venue_name_style_full_bottom = 44;
        var venue_name_style_adjusted_bottom = venue_name_style_full_bottom * adjustpercentage;
        var venue_name_style_full_right = 6;
        var venue_name_style_adjusted_right = venue_name_style_full_right * adjustpercentage;
        var venue_name_style_full_fontSize = 36;
        var venue_name_style_adjusted_fontSize = venue_name_style_full_fontSize * adjustpercentage;

        var event_startdatetime_style_full_bottom = 20;
        var event_startdatetime_style_adjusted_bottom = event_startdatetime_style_full_bottom * adjustpercentage;
        var event_startdatetime_style_full_right = 6;
        var event_startdatetime_style_adjusted_right = event_startdatetime_style_full_right * adjustpercentage;
        var event_startdatetime_style_full_fontSize = 28;
        var event_startdatetime_style_adjusted_fontSize = event_startdatetime_style_full_fontSize * adjustpercentage;

        return {
            sizing:{
                performer_name_style_adjusted_top: performer_name_style_adjusted_top,
                performer_name_style_adjusted_left: performer_name_style_adjusted_left,
                performer_name_style_adjusted_fontSize: performer_name_style_adjusted_fontSize,

                performer_name_extra_style_adjusted_top: performer_name_extra_style_adjusted_top,
                performer_name_extra_style_adjusted_left: performer_name_extra_style_adjusted_left,
                performer_name_extra_style_adjusted_fontSize: performer_name_extra_style_adjusted_fontSize,

                venue_name_prefix_style_adjusted_fontSize: venue_name_prefix_style_adjusted_fontSize,

                venue_name_style_adjusted_bottom: venue_name_style_adjusted_bottom,
                venue_name_style_adjusted_right: venue_name_style_adjusted_right,
                venue_name_style_adjusted_fontSize: venue_name_style_adjusted_fontSize,

                event_startdatetime_style_adjusted_bottom: event_startdatetime_style_adjusted_bottom,
                event_startdatetime_style_adjusted_right: event_startdatetime_style_adjusted_right,
                event_startdatetime_style_adjusted_fontSize: event_startdatetime_style_adjusted_fontSize
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
        var dragcontainersetheight = dragcontainerwidth * 0.75;
        $('#drag-container').height(dragcontainersetheight);
        $('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);
        var dragcontainerfullwidth = 480;
        var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;
        this.textResize(adjustpercentage);
    },

    textResize: function(adjustpercentage){
        var performer_name_style_full_top = 1;
        var performer_name_style_adjusted_top = performer_name_style_full_top * adjustpercentage;
        var performer_name_style_full_left = 6;
        var performer_name_style_adjusted_left = performer_name_style_full_left * adjustpercentage;
        var performer_name_style_full_fontSize = 42;
        var performer_name_style_adjusted_fontSize = performer_name_style_full_fontSize * adjustpercentage;

        var performer_name_extra_style_full_top = 48;
        var performer_name_extra_style_adjusted_top = performer_name_extra_style_full_top * adjustpercentage;
        var performer_name_extra_style_full_left = 36;
        var performer_name_extra_style_adjusted_left = performer_name_extra_style_full_left * adjustpercentage;
        var performer_name_extra_style_full_fontSize = 32;
        var performer_name_extra_style_adjusted_fontSize = performer_name_extra_style_full_fontSize * adjustpercentage;

        var venue_name_prefix_style_full_fontSize = 30;
        var venue_name_prefix_style_adjusted_fontSize = venue_name_prefix_style_full_fontSize * adjustpercentage;

        var venue_name_style_full_bottom = 44;
        var venue_name_style_adjusted_bottom = venue_name_style_full_bottom * adjustpercentage;
        var venue_name_style_full_right = 6;
        var venue_name_style_adjusted_right = venue_name_style_full_right * adjustpercentage;
        var venue_name_style_full_fontSize = 36;
        var venue_name_style_adjusted_fontSize = venue_name_style_full_fontSize * adjustpercentage;

        var event_startdatetime_style_full_bottom = 20;
        var event_startdatetime_style_adjusted_bottom = event_startdatetime_style_full_bottom * adjustpercentage;
        var event_startdatetime_style_full_right = 6;
        var event_startdatetime_style_adjusted_right = event_startdatetime_style_full_right * adjustpercentage;
        var event_startdatetime_style_full_fontSize = 28;
        var event_startdatetime_style_adjusted_fontSize = event_startdatetime_style_full_fontSize * adjustpercentage;
        this.setState({
            sizing:{
                performer_name_style_adjusted_top: performer_name_style_adjusted_top,
                performer_name_style_adjusted_left: performer_name_style_adjusted_left,
                performer_name_style_adjusted_fontSize: performer_name_style_adjusted_fontSize,

                performer_name_extra_style_adjusted_top: performer_name_extra_style_adjusted_top,
                performer_name_extra_style_adjusted_left: performer_name_extra_style_adjusted_left,
                performer_name_extra_style_adjusted_fontSize: performer_name_extra_style_adjusted_fontSize,

                venue_name_prefix_style_adjusted_fontSize: venue_name_prefix_style_adjusted_fontSize,

                venue_name_style_adjusted_bottom: venue_name_style_adjusted_bottom,
                venue_name_style_adjusted_right: venue_name_style_adjusted_right,
                venue_name_style_adjusted_fontSize: venue_name_style_adjusted_fontSize,

                event_startdatetime_style_adjusted_bottom: event_startdatetime_style_adjusted_bottom,
                event_startdatetime_style_adjusted_right: event_startdatetime_style_adjusted_right,
                event_startdatetime_style_adjusted_fontSize: event_startdatetime_style_adjusted_fontSize
            }
        });
    },

    render: function() {
    console.log('adjustpanel initial dimensions are ' + this.props.dimensions.width + 'x' + this.props.dimensions.height);
    console.log('adjustpanel zoomed dimensions are ' + this.props.zoomeddimensions.zoomedwidth + 'x' + this.props.zoomeddimensions.zoomedheight);
    var containerStyle = {position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block'};
    var dragcontainerstyle = {position:'relative', width: '100%', maxWidth: 480, overflow: 'hidden'};
    var captionstyle = {position:'relative', zIndex:10, top: 30, fontSize: this.props.data.font_size, color: this.props.data.font_color, textShadow: '-5px 0px 0px #000000, 0px -5px 0px #000000, 5px 0px 0px #000000, 0px 5px 0px #000000' };
    var performer_name_style = {position:'absolute', top: this.state.sizing.performer_name_style_adjusted_top, left: this.state.sizing.performer_name_style_adjusted_left, width: '100%', zIndex:10, pointerEvents: 'none', fontSize: this.state.sizing.performer_name_style_adjusted_fontSize, color: this.props.data.font_color};
    var performer_name_extra_style = {position:'absolute', top: this.state.sizing.performer_name_extra_style_adjusted_top, left: this.state.sizing.performer_name_extra_style_adjusted_left, width: '100%', zIndex:10, pointerEvents: 'none', fontSize: this.state.sizing.performer_name_extra_style_adjusted_fontSize, color: this.props.data.font_color};
    var venue_name_style = {position:'absolute', display: 'inline-block', bottom: this.state.sizing.venue_name_style_adjusted_bottom, right: this.state.sizing.venue_name_style_adjusted_right, textAlign: 'right', zIndex:10, pointerEvents: 'none', fontSize: this.state.sizing.venue_name_style_adjusted_fontSize, color: this.props.data.font_color};
    var venue_name_prefix_style = {fontSize: this.state.sizing.venue_name_prefix_style_adjusted_fontSize};
    var event_startdatetime_style = {position:'absolute', display: 'inline-block', bottom: this.state.sizing.event_startdatetime_style_adjusted_bottom, right: this.state.sizing.event_startdatetime_style_adjusted_right, textAlign: 'right', zIndex:10, pointerEvents: 'none', fontSize: this.state.sizing.event_startdatetime_style_adjusted_fontSize, color: this.props.data.font_color};
    var fromcaption = {position:'absolute', bottom: 30, left: 6, width: '100%', zIndex:10, pointerEvents: 'none', fontSize: 30, color: this.props.data.font_color, fontStyle: 'italic'};
    var musiclocalcaption = {display:'inline-block', position:'absolute', bottom: 0, left: 0, zIndex:10, width: '100%', pointerEvents: 'none', fontSize: 12, color: this.props.data.font_color, fontStyle: 'italic', backgroundColor: '#333333', paddingLeft: 3, paddingRight:6, paddingTop:2};
    var fromname = {display: 'inline-block', position: 'relative', cssFloat: 'left'};
    var musiclocal = {display: 'inline-block', position: 'absolute', right: 3, bottom: 0};

    var dragstyle2 = {position:'absolute', top: 0, left: 0};

        return (
            <div style={containerStyle} id="padding-div">
                <div style={dragcontainerstyle} id="drag-container">
                    <div style={performer_name_style} className="textstroke">{this.props.data.performer_name}</div>
                    <div style={performer_name_extra_style} className="textstroke">{this.props.data.performer_name_extra}</div>
                    <div style={musiclocalcaption}><div style={fromname}>original by {this.props.dimensions.from_name} </div><div style={musiclocal}>created with musiclocal</div></div>
                    <div style={venue_name_style} className="textstroke"><span style={venue_name_prefix_style}>{this.props.data.venue_name_prefix}</span> {this.props.data.venue_name}</div>
                    <div style={event_startdatetime_style} className="textstroke">{this.props.data.event_startweekday} {this.props.data.event_startmonth}/{this.props.data.event_startday} {this.props.data.event_starthour}:{this.props.data.event_startminute} {this.props.data.event_startampm}</div>
                    <div style={dragstyle2} id="parentfordraggable">
                        <DragDiv data={this.props.data} response={this.props.response} zoomeddimensions={this.props.zoomeddimensions} dimensions={this.props.dimensions} />
                    </div>
                </div>
            </div>
        );
    }
});

var DragDiv = React.createClass({

    //getInitialState: function() {
    //return {data: {setwidth: 960, setheight: 640, initialwidth: 960, initialheight: 640}};
    //},

    //componentWillReceiveProps: function(nextProps){
    //var initialwidth = this.state.data.initialwidth;
    //var initialheight = this.state.data.initialheight;
    //this.setState({data: {setwidth: initialwidth * (0.01 * nextProps.data.image_zoom), setheight: initialheight * (0.01 * nextProps.data.image_zoom), initialwidth: initialwidth, initialheight: initialheight }});
    //},

    componentDidMount: function() {
        //var getwidth = $('#drag').width();
        //console.log('getwidth is ' + getwidth);
        //var getheight = $('#drag').height();
        //console.log(this.props.data.image_zoom);
        //var w = getwidth * (0.01 * this.props.data.image_zoom);
        //console.log('var w is ' + w);
        //this.setState({data: {setwidth: getwidth * (0.01 * this.props.data.image_zoom), setheight: getheight * (0.01 * this.props.data.image_zoom), initialwidth: getwidth, initialheight: getheight }});

        //var setwidth = getwidth * (1/this.props.data.image_zoom);
        //var setheight = getheight * (1/this.props.data.image_zoom);


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
            } else if (pos.left <= v) {
                hel.animate({ left: v });
            }
        }
    });
    },

    render: function() {
    console.log(this.props.response);
    console.log('pre-render dragdiv width is ' + this.props.zoomeddimensions.zoomedwidth);
        var images = this.props.response.map(function(image){
        var width = this.props.zoomeddimensions.zoomedwidth;
        var height = this.props.zoomeddimensions.zoomedheight;
            return <AdjustedImage classes="bannerimage" photoidentifier={image.photoidentifier} adjustid={image.adjustid} key={image.adjustid} src={image.src.encoded} width={width} height={height}/>
        }.bind(this));

        console.log('dragdiv width is ' + this.props.zoomeddimensions.zoomedwidth);
        var dragdivstyle = {display:'inline-block', width: this.props.zoomeddimensions.zoomedwidth, height: this.props.zoomeddimensions.zoomedheight};
        return (
            <div id="drag" style={dragdivstyle} onTouchEnd={this.handleTouchEnd}>
            {images}
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

var foofunction = function(foo){

var c = document.getElementById('testcontainer5');
var ctx = c.getContext("2d");

// Create gradient
var gradient=ctx.createLinearGradient(0,0,c.width,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
// Fill with gradient
ctx.fillStyle=gradient;
ctx.fillText(foo, 0, 0);
}


});
</script>

</body>
</html>