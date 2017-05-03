'use strict';

React.initializeTouchEvents(true);

/*
var renderreact = function(dataarray, pagination, getnextresultslink){
React.initializeTouchEvents(true);
React.render(<PhotoContainer data={dataarray} data1={pagination} data2={getnextresultslink}/>, document.getElementById('content-main'));
};*/

var BannerCreateContainer = React.createClass({
    displayName: 'BannerCreateContainer',

    getInitialState: function getInitialState() {
        return { data: [], data1: [], data2: [] };
    },

    updateDimensions: function updateDimensions() {
        //var cont = React.findDOMNode(this.refs.fbphotodisplay);
        var top = $('#fbphotodisplay').scrollTop();
        var height = $('#fbphotodisplay').scrollHeight;
        var postop = $('#content-main').offset().top;
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

    componentDidMount: function componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        //var cont = React.findDOMNode(this.refs.fbphotodisplay);
        var postop = $('#content-main').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var height = $('#fbphotodisplay').scrollHeight;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;

        $(document).ready((function () {

            this.getPhotosFromFacebook();
        }).bind(this));
    },

    getPhotosFromFacebook: function getPhotosFromFacebook(paginationclick, dataarray) {
        $.ajaxSetup({ cache: true });
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {

            FB.init({
                appId: '1618708688367645',
                version: 'v2.3',
                cookie: true
            });
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    if (paginationclick === undefined) {
                        FB.api('/me/photos', 'get', { limit: 24, fields: 'images, id, created_time, from, tags' }, function (response) {
                            handleresponse(response, dataarray);
                        });
                    } else {
                        $.get(paginationclick, function (response) {
                            handleresponse(response, dataarray);
                        });
                    }
                    var handleresponse = (function (response, dataarray) {

                        if (dataarray === undefined) {
                            var dataarray = [];
                        } else {}
                        $.each(response.data, function () {
                            //dataarray.push({id:this.id, from_name:this.from.name, from_id:this.from.id, fb_created_time:this.created_time, link0:this.images[0].source, link1:this.images[1].source, link2:this.images[2].source, link3:this.images[3].source, link4:this.images[4].source, link5:this.images[5].source, link6:this.images[6].source, nextresult:this.tags.paging.cursors.after});
                            try {
                                dataarray.push({ id: this.id, from_name: this.from.name, from_id: this.from.id, fb_created_time: this.created_time, link0: this.images[0].source, link3: this.images[3].source, nextresult: this.tags.paging.cursors.after });
                            } catch (err) {
                                console.log('An image was not displayed due to an error getting the picture.');
                            }
                        });
                        var getnextresultslink = response.paging.next;
                        var pagination = [];
                        if (response.paging.previous) {
                            pagination.push({ label: 'Previous', id: 'previousfbphotobutton', link: response.paging.previous });
                        }
                        pagination.push({ label: 'Next', id: 'nextfbphotobutton', link: response.paging.next });

                        renderreact(dataarray, pagination, getnextresultslink);
                    }).bind(this);
                } else {
                    console.log('not logged in');
                }
            });
        });
        var renderreact = (function (dataarray, pagination, getnextresultslink) {
            this.setState({ data: dataarray, data1: pagination, data2: getnextresultslink });
        }).bind(this);
    },

    handleScroll: function handleScroll() {
        var cont = React.findDOMNode(this.refs.fbphotodisplay);
        var top = $('#fbphotodisplay').scrollTop();
        var height = cont.scrollHeight;
        var postop = $('#content-main').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;
        var dataarray = this.state.data;
        var paginationclick = this.state.data2;
        var i = 0;
        if (top > heightpastvisiblecontainer - visiblecontainerheight && i < 1) {
            i++;
            this.getPhotosFromFacebook(paginationclick, dataarray);
        }
    },

    render: function render() {
        var innerh = $(window).height();
        var postop = $('#content-main').offset().top;
        var containerstyle = { padding: 0 };
        var endofcontainerstyle = { padding: 0 };

        var facebookphotodisplaystyle = { height: innerh - postop - 80, overflow: 'auto' };

        var style1 = { padding: 5 };
        var style2 = { textAlign: 'center' };
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: 'createnewbanner' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12 nopadding', id: 'instructions' },
                    React.createElement(
                        'div',
                        { style: style2 },
                        React.createElement(
                            'h3',
                            null,
                            'To begin making a banner, click on one of your photos.'
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'em',
                                null,
                                'To assign existing banners to projects, visit your projects page.'
                            )
                        )
                    )
                ),
                React.createElement('div', { id: 'testcontainer4' })
            ),
            React.createElement('div', { id: 'testcontainer3' }),
            React.createElement(
                'div',
                { className: 'col-sm-12', style: containerstyle },
                React.createElement(
                    'div',
                    { id: 'fbphotodisplay', ref: 'fbphotodisplay', style: facebookphotodisplaystyle, onScroll: this.handleScroll },
                    React.createElement(PhotoBannerList, { data: this.state.data })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12', style: endofcontainerstyle },
                React.createElement('div', { id: 'endofcontainer' })
            )
        );
    }
});

var PhotoBannerList = React.createClass({
    displayName: 'PhotoBannerList',

    render: function render() {
        console.log('reference');
        console.log(this.props.data);
        var photos = this.props.data.map(function (photo) {
            return React.createElement(CurrentPhotoBanner, { link0: photo.link0, link3: photo.link3, key: photo.id, id: photo.id, from_name: photo.from_name, from_id: photo.from_id, fb_created_time: photo.fb_created_time });
        });
        var imgcontstyle = {};
        return React.createElement(
            'div',
            { className: 'grid', id: 'get-user-photos-from-facebook' },
            React.createElement('div', { className: 'grid-sizer' }),
            React.createElement(
                'div',
                { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', style: imgcontstyle },
                React.createElement(
                    ReactCSSTransitionGroup,
                    { transitionName: 'fade' },
                    photos
                )
            )
        );
    }
});

var CurrentPhotoBanner = React.createClass({
    displayName: 'CurrentPhotoBanner',

    onClick: function onClick() {
        console.log('click registered');
        var facebookphoto_identifier = this.props.id;
        var facebookphoto_link0 = this.props.link0;
        var from_name = this.props.from_name;
        var from_id = this.props.from_id;
        var fb_created_time = this.props.fb_created_time;
        var fbphotoscrollcontaineroriginalheight = $('#fbphotodisplay').height();
        //console.log(fbphotoscrollcontaineroriginalheight);
        var result = { photoidentifier: facebookphoto_identifier, adjustid: 0, src: facebookphoto_link0 };
        var dimensions = { from_name: from_name, from_id: from_id, width: 960, height: 640 };
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').hide();
        React.render(React.createElement(BannerCreationPanel, { response: result, dimensions: dimensions }), document.getElementById('content-modal'));
        $('#instructions').hide();
        $('html, body').animate({ scrollTop: 0 }, 355);
        var height = $('#fbphotodisplay').scrollHeight;
        var postop = $('#content-main').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var innerh = $(window).height();

        $('#fbphotodisplay').css({ height: innerh - postop - 80 });
    },

    render: function render() {
        var photostyle = { padding: '0.25%' };
        return React.createElement('img', { className: 'grid-item grid-item--width3', style: photostyle, onClick: this.onClick, src: this.props.link3, 'data-link0': this.props.link0, id: this.props.id, 'data-fromid': this.props.from_id, 'data-from_name': this.props.from_name, 'data-fb_created_time': this.props.fb_created_time });
    }
});

var BannerCreationPanel = React.createClass({
    displayName: 'BannerCreationPanel',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(ImageOptionsFormBanner, { response: this.props.response, dimensions: this.props.dimensions })
        );
    }
});

var ImageAdjustOptionsBanner = React.createClass({
    displayName: 'ImageAdjustOptionsBanner',

    render: function render() {
        var adjustedthumbs = this.props.adjustedthumbs.map(function (adjustedthumb) {
            return React.createElement(ImageAdjustThumbButtonBanner, { src: adjustedthumb.src.encoded, adjustid: adjustedthumb.adjustid, key: adjustedthumb.adjustid });
        });
        var adjustbuttoncontainerstyle = { padding: 5 };
        var containerstyle = { padding: 0 };
        return React.createElement(
            'div',
            { className: 'col-sm-12', style: containerstyle },
            React.createElement(
                'div',
                { id: 'adjustbuttons', style: adjustbuttoncontainerstyle, className: 'row' },
                adjustedthumbs
            )
        );
    }
});

var ImageAdjustThumbButtonBanner = React.createClass({
    displayName: 'ImageAdjustThumbButtonBanner',

    componentDidMount: function componentDidMount() {
        $('.submit-adjust').click(function ($e) {
            $e.preventDefault();
            $('.bannerimage').hide();
            $('.bannerimage[data-adjustid=' + $(this).data('adjustid') + ']').show();
        });
    },

    render: function render() {
        var thumbcontainer = { padding: 3 };
        return React.createElement(
            'div',
            { className: 'col-sm-2 col-xs-4', style: thumbcontainer },
            React.createElement('img', { className: 'img img-responsive submit-adjust', src: this.props.src, 'data-adjustid': this.props.adjustid })
        );
    }
});

var ImageOptionsFormBanner = React.createClass({
    displayName: 'ImageOptionsFormBanner',

    cropPhoto: function cropPhoto() {
        //var imagedata = '';
        var dragposition = $('#drag').position();
        var dragpositiontop = -dragposition.top;
        Caman("#dragcanvas", function () {
            this.crop(960, 355, 0, dragpositiontop);
            this.render();
        });
    },

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Creating your new banner image...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        var from_name_node = React.findDOMNode(this.refs.from_name).checked;
        if (from_name_node == false) {} else if (from_name_node == true) {
            var from_name = React.findDOMNode(this.refs.from_name).value.trim();
        }
        var canvas = document.getElementById("dragcanvas");
        console.log(canvas);
        var imagedata = canvas.toDataURL("image/jpeg", 1.0);
        var image_zoom = React.findDOMNode(this.refs.image_zoom).value.trim();
        var paddingint = parseFloat($('#padding-div').css('padding'));
        var dragposition = $('#drag').position();
        var dragpositiontop = -dragposition.top;

        $.ajax({
            type: "POST",
            url: "/user_bannercropreact",
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
            error: function error() {
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            },
            success: function success(response) {
                $('#modalcontent').html('<img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' + response + '.jpg"/>' + '<div style="display:block;text-align:center"><br>' + '<p><em>To save your banner image, right click on the banner and select "save image as..."</em><br>To view all of your banner images, go to <a href="">your banner management page</a>.</p></div>');
                $('#myModal').modal();
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner image has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            }
        });
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
        return;
    },

    getInitialState: function getInitialState() {
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

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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
            checkboxstate: { is_from_name_checked: this.state.checkboxstate.is_from_name_checked },
            image: {
                src: this.props.response.src
            }
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        var c = document.getElementById("dragcanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 2000, 2000);

        var thephoto = new Image();

        thephoto.crossOrigin = "Anonymous";
        $(thephoto).attr('data-caman-hidpi-disabled', '');
        thephoto.src = this.props.response.src;

        thephoto.addEventListener("load", function () {
            var transformratio = 960 / thephoto.width;
            var newphotoheight = thephoto.height * transformratio;
            ctx.drawImage(thephoto, 0, 0, 960, newphotoheight);
        }, false);
    },

    handleChange1: function handleChange1() {
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
            checkboxstate: { is_from_name_checked: this.state.checkboxstate.is_from_name_checked }
        });
    },

    handleSlider: function handleSlider() {

        $(function () {
            $("#slider").slider({
                value: 100,
                min: 1,
                max: 100,
                step: 1,
                slide: function slide(event, ui) {
                    $("#image_zoom").val(ui.value);
                    foo();
                },
                stop: function stop(event, ui) {
                    //console.log($('#drag').position().left + ';ALSKJDal;skjdL;ASKJDK;shfklhfkl;DSDJHFSJDHFSKN;LASKJDal;kdja;sldjsl;dhgfjhsd;klfjaskljklfdjghfdlkghs;dlkfjs;dlkfj');

                    while ($('#drag').height() < $('#parentfordraggable').height() || $('#drag').width() < $('#parentfordraggable').width()) {
                        var old = $('#image_zoom').val();
                        var oldint = parseInt(old);
                        //console.log('old is ' + oldint);
                        //console.log(typeof(oldint));
                        var newe = oldint + 1;
                        //console.log('newe is ' + newe);
                        $("#slider").slider("value", newe);
                        $('#image_zoom').val(newe);
                        foo();
                    }
                    while ($('#drag').width() + $('#drag').position().left < $('#drag').parent().width()) {
                        var oldpos = $('#drag').position().left;
                        //console.log('oldpos is ' + oldpos);
                        var newpos = oldpos + 1;
                        //console.log('newpos is ' + newpos);
                        $('#drag').css({ left: newpos });
                        //foo();
                    }
                    while ($('#drag').height() + $('#drag').position().top < $('#drag').parent().height()) {
                        var oldposv = $('#drag').position().top;
                        //console.log('oldpos is ' + oldposv);
                        var newposv = oldposv + 1;
                        //console.log('newpos is ' + newposv);
                        $('#drag').css({ top: newposv });
                        //foo();
                    }
                    foo();
                }
            });
            $("#image_zoom").val($("#slider").slider("value"));
        });

        var foo = (function () {
            this.handleChange1();
        }).bind(this);

        var bar = (function () {

            while ($('#drag').height() < $('#parentfordraggable').height()) {
                //console.log('foo');
                var incrementer = this.state.data.image_zoom++;
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
                    checkboxstate: { is_from_name_checked: this.state.checkboxstate.is_from_name_checked }
                });
            }
        }).bind(this);
    },

    componentDidMount: function componentDidMount() {
        this.handleSlider();
    },

    adjustPrep: function adjustPrep() {
        var c = document.getElementById("dragcanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 2000, 2000);

        var thephoto = new Image();
        thephoto.crossOrigin = "Anonymous";
        $(thephoto).attr('data-caman-hidpi-disabled', '');
        thephoto.src = this.state.image.src;
        //console.log('heresdfsd');
        //console.log(thephoto);

        thephoto.addEventListener("load", function () {
            var transformratio = 960 / thephoto.width;
            var newphotoheight = thephoto.height * transformratio;
            ctx.drawImage(thephoto, 0, 0, 960, newphotoheight);
        }, false);
        return thephoto;
    },

    onAdjustOriginal: function onAdjustOriginal() {
        var thephoto = null;
        this.adjustPrep();
    },

    onAdjustGreyscale: function onAdjustGreyscale() {
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.greyscale();
            this.render();
        });
    },

    onAdjustVintage: function onAdjustVintage() {
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.greyscale();this.contrast(5);this.noise(3);this.sepia(100);this.channels({ red: 8, blue: 2, green: 4 });this.gamma(0.87);
            this.render();
        });
    },

    onAdjustLomo: function onAdjustLomo() {
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.brightness(15);this.exposure(15);this.curves("rgb", [0, 0], [200, 0], [155, 255], [255, 255]);this.saturation(-20);this.gamma(1.8);
            this.render();
        });
    },

    onAdjustClarity: function onAdjustClarity() {
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.vibrance(20);this.curves("rgb", [5, 0], [130, 150], [190, 220], [250, 255]);this.sharpen(15);this.vignette("45%", 20);
            this.render();
        });
    },

    onAdjustSinCity: function onAdjustSinCity() {
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.contrast(100);this.brightness(15);this.exposure(10);this.posterize(80);this.clip(30);this.greyscale();
            this.render();
        });
    },

    onAdjustLove: function onAdjustLove() {
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.brightness(5);this.exposure(8);this.contrast(4);this.colorize("#c42007", 30);this.vibrance(50);this.gamma(1.3);
            this.render();
        });
    },

    onAdjustNostalgia: function onAdjustNostalgia() {
        var thephoto = null;
        this.adjustPrep();

        Caman("#dragcanvas", thephoto, function () {
            this.revert();
            this.saturation(20);this.gamma(1.4);
            this.greyscale();this.contrast(5);this.sepia(100);
            this.channels({ red: 8, blue: 2, green: 4 });this.gamma(0.8);
            this.contrast(5);this.exposure(10);this.newLayer(function () {
                this.setBlendingMode("overlay");this.copyParent();this.opacity(55);this.filter.stackBlur(10);
            });this.vignette("50%", 30);
            this.render();
        });
    },

    handleCheckedChange: function handleCheckedChange() {
        this.setState({ checkboxstate: { is_from_name_checked: !this.state.checkboxstate.is_from_name_checked } });
        //this.forceUpdate();
    },

    clearBannerAdjust: function clearBannerAdjust() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
        //var top = $('#fbphotodisplay').scrollTop();
        var height = $('#fbphotodisplay').scrollHeight;
        var postop = $('#content-main').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        //var heightpastvisiblecontainer = height - visiblecontainerheight;
        var innerh = $(window).height();

        $('#fbphotodisplay').css({ height: innerh - postop - 80 });
    },

    render: function render() {
        var sliderstyle = { marginLeft: 0, marginRight: 0 };
        var containerstyle = { padding: 0 };
        console.log('the checkbox state is:');
        console.log(this.state.checkboxstate.is_from_name_checked);
        var clearbuttonstyle = { textAlign: 'center', paddingTop: 5 };
        var headerstyle = { paddingTop: 0, marginTop: -15 };
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'col-sm-12', 'data-initialwidth': this.props.dimensions.width, 'data-initialheight': this.props.dimensions.height, style: containerstyle },
                React.createElement(
                    'h4',
                    { style: headerstyle },
                    'Banner Preview'
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'em',
                        null,
                        'To view and approve your final version, press submit. Note: on screens smaller than 960 pixels in width, preview will not reflect final product.'
                    )
                ),
                React.createElement(
                    'p',
                    null,
                    this.state.checkboxstate.is_from_name_checked
                ),
                React.createElement(ImageAdjustPanelBanner, { checkbox: this.state.checkboxstate, data: this.state.data, response: this.props.response, zoomeddimensions: this.state.zoomeddimensions, dimensions: this.props.dimensions })
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12', style: containerstyle },
                React.createElement(
                    'form',
                    { className: 'form-horizontal', id: 'myForm', onSubmit: this.handleSubmit },
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-12' },
                            React.createElement(
                                'div',
                                { className: 'checkbox' },
                                React.createElement(
                                    'label',
                                    null,
                                    React.createElement('input', { type: 'checkbox', ref: 'from_name', name: 'from_name', id: 'from_name', value: this.props.dimensions.from_name, 'data-checked': this.state.checkboxstate.is_from_name_checked, defaultChecked: true, onChange: this.handleCheckedChange }),
                                    'Credit ',
                                    this.props.dimensions.from_name
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-4 col-xs-offset-4' },
                            React.createElement('input', { className: 'form-control', type: 'submit', value: 'Create' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement('input', { className: 'form-control', type: 'hidden', ref: 'image_zoom', id: 'image_zoom', name: 'image_zoom', onChange: this.handleChange1 })
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12', style: containerstyle },
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustOriginal },
                    'Original'
                ),
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustGreyscale },
                    'Greyscale'
                ),
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustVintage },
                    'Vintage'
                ),
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustLomo },
                    'Lomo'
                ),
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustClarity },
                    'Clarity'
                ),
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustSinCity },
                    'Sin City'
                ),
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustLove },
                    'Love'
                ),
                React.createElement(
                    'div',
                    { className: 'btn btn-default', onClick: this.onAdjustNostalgia },
                    'Nostalgia'
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12', style: clearbuttonstyle },
                React.createElement(
                    'a',
                    { onClick: this.clearBannerAdjust },
                    'Clear + hide banner adjustment menu'
                )
            )
        );
    }
});

var ImageAdjustPanelBanner = React.createClass({
    displayName: 'ImageAdjustPanelBanner',

    getInitialState: function getInitialState() {

        return {
            sizing: {},
            hidden: {}
        };
    },

    componentDidMount: function componentDidMount() {
        this.containerResize();

        //console.log(adjustpercentage);

        $(window).resize((function () {
            this.containerResize();
        }).bind(this));
    },

    containerResize: function containerResize() {
        var dragcontainerwidth = $('#drag-container').width();
        //console.log('dragcontainer width is ' + dragcontainerwidth);
        var dragcontainersetheight = dragcontainerwidth * 0.37;
        $('#drag-container').height(dragcontainersetheight);
        $('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);
        var dragcontainerfullwidth = 960;
        var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;
        this.textResize(adjustpercentage);
    },

    textResize: function textResize(adjustpercentage) {

        this.setState({
            sizing: {}
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        //console.log('component updated');
        var thetext = React.findDOMNode(this.refs.from_name_text);
        //console.log(thetext);
        if (this.props.checkbox.is_from_name_checked == false) {
            //console.log('foundfalse');
            $('#from_name_text').hide();
            $('#line_text').hide();
        }
        if (this.props.checkbox.is_from_name_checked == true) {
            //console.log('foundfalse');
            $('#from_name_text').show();
            $('#line_text').show();
        }
    },

    render: function render() {
        //console.log('adjustpanel initial dimensions are ' + this.props.dimensions.width + 'x' + this.props.dimensions.height);
        //console.log('adjustpanel zoomed dimensions are ' + this.props.zoomeddimensions.zoomedwidth + 'x' + this.props.zoomeddimensions.zoomedheight);
        var containerStyle = { position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block' };
        var dragcontainerstyle = { position: 'relative', width: '100%', maxWidth: 960, overflow: 'hidden' };
        var fromname = { display: 'inline-block', position: 'absolute', top: 312, left: 5, zIndex: 10, pointerEvents: 'none', fontSize: 16, color: this.props.data.font_color, fontFamily: 'vladimir_script', textShadow: '1px 1px 4px #000000' };
        //var fromname = {display: 'inline-block', position: 'relative', cssFloat: 'left'};
        var musiclocalname = { display: 'inline-block', position: 'absolute', top: 334, left: 5, zIndex: 10, pointerEvents: 'none', fontSize: 12, color: this.props.data.font_color, fontFamily: 'Open Sans', fontStyle: 'italic', paddingRight: 10, textShadow: '1px 1px 4px #000000' };
        var line = { display: 'inline-block', position: 'absolute', top: 334, left: 5, zIndex: 10, pointerEvents: 'none', borderTop: '1px solid #ffffff', width: 145 };
        var dragstyle2 = { position: 'absolute', top: 0, left: 0 };

        return React.createElement(
            'div',
            { style: containerStyle, id: 'padding-div' },
            React.createElement(
                'div',
                { style: dragcontainerstyle, id: 'drag-container' },
                React.createElement(
                    'div',
                    { style: fromname, ref: 'from_name_text', id: 'from_name_text' },
                    'Original by ',
                    this.props.dimensions.from_name,
                    ' '
                ),
                React.createElement('div', { style: line, ref: 'line_text', id: 'line_text' }),
                React.createElement(
                    'div',
                    { style: musiclocalname },
                    'created with musiclocal'
                ),
                React.createElement(
                    'div',
                    { style: dragstyle2, id: 'parentfordraggable' },
                    React.createElement(DragDivBanner, { data: this.props.data, response: this.props.response, zoomeddimensions: this.props.zoomeddimensions, dimensions: this.props.dimensions })
                )
            )
        );
    }
});

var DragDivBanner = React.createClass({
    displayName: 'DragDivBanner',

    componentDidMount: function componentDidMount() {

        $('#drag').draggable({
            stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;
                //horizontal
                //console.log('draggable pos is ' + pos);
                var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
                if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    //deleted to edit for absolute positioning
                    hel.animate({ top: h }); //deleted to edit for absolute positioning
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
                } else if (pos.left <= v) {
                    //deleted to edit for absolute positioning
                    //} else if (pos.left <= 0) {
                    hel.animate({ left: v }); //deleted to edit for absolute positioning
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

        var c = document.getElementById("dragcanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 2000, 2000);

        var thephoto = new Image();

        var canvasnode = React.findDOMNode(this.refs.dragcanvas);
        thephoto.crossOrigin = "Anonymous";
        $(thephoto).attr('data-caman-hidpi-disabled', '');
        thephoto.src = this.props.response.src;

        thephoto.addEventListener("load", function (canvasnode) {
            var transformratio = 960 / thephoto.width;
            var newphotoheight = thephoto.height * transformratio;
            ctx.drawImage(thephoto, 0, 0, 960, newphotoheight);
        }, false);
    },

    componentDidUpdate: function componentDidUpdate() {},

    handleTouchEnd: function handleTouchEnd() {
        //Solves problem on iPhone where overflow:hidden sections of image are not draggable; do not remove!!!
        $('#drag').draggable({
            stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;
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

    render: function render() {
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
        var dragdivstyle = { display: 'inline-block', width: this.props.zoomeddimensions.zoomedwidth, height: this.props.zoomeddimensions.zoomedheight };
        var canvasstyle = { display: 'inline-block', width: this.props.zoomeddimensions.zoomedwidth, height: this.props.zoomeddimensions.zoomedheight };
        return React.createElement(
            'div',
            { id: 'drag', style: dragdivstyle, onTouchEnd: this.handleTouchEnd },
            React.createElement('canvas', { id: 'dragcanvas', ref: 'dragcanvas', width: '960', height: '640' })
        );
    }
});

var AdjustedImageBanner = React.createClass({
    displayName: 'AdjustedImageBanner',

    render: function render() {
        if (this.props.adjustid !== 0) {
            var style = { display: 'none', width: this.props.width, height: this.props.height };
        } else {
            var style = { width: this.props.width, height: this.props.height };
        }

        return React.createElement('img', { className: this.props.classes, style: style, src: this.props.src, 'data-photoidentifier': this.props.photoidentifier, 'data-adjustid': this.props.adjustid });
    }
});

var DisplayCaptionsBanner = React.createClass({
    displayName: 'DisplayCaptionsBanner',

    render: function render() {
        console.log(this.props.data);
        console.log(this.props.data.performer_name);
        //var performer_name_caption =
        return React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                null,
                this.props.data.performer_name
            ),
            React.createElement(
                'p',
                null,
                this.props.data.venue_name
            )
        );
    }
});