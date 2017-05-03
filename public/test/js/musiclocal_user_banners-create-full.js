'use strict';

React.initializeTouchEvents(true);

var FullBannerCreationPanel = React.createClass({
    displayName: 'FullBannerCreationPanel',

    getInitialState: function getInitialState() {
        return {
            data_uri: null,
            dimensions: { width: null, height: null }
        };
    },
    handleSubmit: function handleSubmit(e) {
        //e.preventDefault();

        React.render(React.createElement(FullImageOptionsFormBanner, { src: this.state.data_uri, dimensions: this.state.dimensions }), document.getElementById('content-modal'));
        $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your image has been loaded.').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
    },

    handleFile: function handleFile(e) {
        $('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Loading your image...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.readAsDataURL(file);

        reader.onload = (function (upload) {
            this.setState({
                data_uri: upload.target.result
            });
            this.getDimensions();
        }).bind(this);
    },

    componentDidUpdate: function componentDidUpdate() {},

    getDimensions: function getDimensions() {
        var image = document.createElement('img');

        image.addEventListener('load', (function () {
            var w = image.width;
            var h = image.height;
            this.setState({
                dimensions: {
                    width: w,
                    height: h
                }
            });
            $(image).remove();
            //var e;
            this.checkDimensions();
        }).bind(this));

        image.src = this.state.data_uri;
    },

    checkDimensions: function checkDimensions() {

        if (this.state.width < 1920) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error loading your photo.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            alert('The selected image is less than 1920 pixels wide. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        } else if (this.state.height < 720) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            alert('The selected image is less than 720 pixels tall. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        } else {
            this.handleSubmit();
        }
    },

    render: function render() {
        var buttonstyle = { textAlign: 'center' };
        //<input className="form-control" type="submit" value="Submit"/>
        return React.createElement(
            'div',
            { className: 'container-fluid' },
            React.createElement(
                'form',
                { className: 'form-horizontal', onSubmit: this.handleSubmit, encType: 'multipart/form-data' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'div',
                        { className: 'col-xs-4 col-xs-offset-4' },
                        React.createElement('input', { type: 'file', className: 'form-control', onChange: this.handleFile, style: buttonstyle })
                    )
                )
            )
        );
    }
});

var FullImageOptionsFormBanner = React.createClass({
    displayName: 'FullImageOptionsFormBanner',

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        $('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Uploading your banner image to the server...<br>(This may take a few moments)').addClass('alert-info').fadeIn(300).removeClass('hidden');
        var canvas = document.getElementById("dragcanvas");

        //var imagedata = canvas.toDataURL("image/jpeg", 1.0);
        var image_zoom = React.findDOMNode(this.refs.image_zoom).value.trim() / 100;
        var paddingint = parseFloat($('#padding-div').css('padding'));
        var dragposition = $('#drag').position();
        var dragpositiontop = -dragposition.top;
        var dragpositionleft = -dragposition.left;

        var adjustpercentage = this.state.adjustpercentage;

        var adjustdragpositiontoplong = dragpositiontop / adjustpercentage;
        var adjustdragpositiontop = adjustdragpositiontoplong.toFixed();
        var adjustdragpositionleftlong = dragpositionleft / adjustpercentage;
        var adjustdragpositionleft = adjustdragpositionleftlong.toFixed();
        var credit = this.state.credit;

        $.ajax({
            type: "POST",
            url: "user/ajax/create_banner_full",
            data: {
                "imagedata": this.props.src,
                "adjustdragpositiontop": adjustdragpositiontop,
                "adjustdragpositionleft": adjustdragpositionleft,
                "image_zoom": image_zoom,
                "credit": credit,
                _token: $_token
            },
            error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            },
            success: function success(response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner image has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
                React.unmountComponentAtNode(document.getElementById('content-modal'));
                React.render(React.createElement(BannersMenu, { url: '' }), document.getElementById('content-menu'));
                React.render(React.createElement(BannerContainer, { url: '' }), document.getElementById('content-main'));
                $('#content-main').show();
            }
        });
    },

    getInitialState: function getInitialState() {
        return {
            data: {
                image_zoom: 100
            },
            zoomeddimensions: {
                zoomedwidth: this.props.dimensions.width,
                zoomedheight: this.props.dimensions.height
            },
            adjustpercentage: 100,
            credit: null
        };
    },

    handleChange1: function handleChange1() {
        this.setState({
            data: {
                image_zoom: React.findDOMNode(this.refs.image_zoom).value
            },
            zoomeddimensions: {
                zoomedwidth: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01,
                zoomedheight: React.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01
            }
        });
    },

    handleSlider: function handleSlider() {
        var foo = (function () {
            this.handleChange1();
        }).bind(this);

        $(function () {
            $("#slider").slider({
                value: 100,
                min: 1,
                max: 100,
                step: 1
            });
            $("#slider").slider().bind({
                slide: function slide(event, ui) {
                    $("#image_zoom").val(ui.value);
                    foo();
                },
                slidestop: function slidestop(event, ui) {
                    while ($('#drag').height() < $('#parentfordraggable').height() || $('#drag').width() < $('#parentfordraggable').width()) {
                        var old = $('#image_zoom').val();
                        var oldint = parseInt(old);
                        var newe = oldint + 1;
                        $("#slider").slider("value", newe);
                        $('#image_zoom').val(newe);
                        foo();
                    }
                    while ($('#drag').width() + $('#drag').position().left < $('#drag').parent().width()) {
                        var oldpos = $('#drag').position().left;
                        var newpos = oldpos + 1;
                        $('#drag').css({ left: newpos });
                    }
                    while ($('#drag').height() + $('#drag').position().top < $('#drag').parent().height()) {
                        var oldposv = $('#drag').position().top;
                        var newposv = oldposv + 1;
                        $('#drag').css({ top: newposv });
                    }
                    foo();
                }
            });
            $("#image_zoom").val($("#slider").slider("value"));
        });
    },

    componentDidMount: function componentDidMount() {
        $('#drag').hide();
        this.handleSlider();
        $(window).resize((function () {
            this.containerResize();
        }).bind(this));

        $("#slider").slider("value", 2);
        $("#image_zoom").val(2);
        this.handleChange1();
        //this.triggerSlidestop();
        setTimeout(function () {
            $('#drag').show(0, function () {
                $('#slider').trigger('slidestop');
            });
        }, 800);
    },

    containerResize: function containerResize() {
        var dragcontainerwidth = $('#drag-container').width();
        var dragcontainersetheight = dragcontainerwidth * 0.37;
        $('#drag-container').height(dragcontainersetheight);
        $('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);
        var dragcontainerfullwidth = 1920;
        var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;
        this.setState({ adjustpercentage: adjustpercentage });
    },

    checkDimensions: function checkDimensions() {

        var dragposition = $('#drag').position();
        var dragpositiontop = -dragposition.top;
        var dragpositionleft = -dragposition.left;

        var adjustpercentage = this.state.adjustpercentage;

        var adjustdragpositiontoplong = dragpositiontop / adjustpercentage;
        var adjustdragpositiontop = adjustdragpositiontoplong.toFixed();
        var adjustdragpositionleftlong = dragpositionleft / adjustpercentage;
        var adjustdragpositionleft = adjustdragpositionleftlong.toFixed();
    },

    clearBannerAdjust: function clearBannerAdjust() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
    },

    handleCreditTextEntry: function handleCreditTextEntry(event) {
        this.setState({ credit: event.target.value });
    },

    render: function render() {
        var sliderdivstyle = { marginLeft: '1%', marginRight: '1%' };
        var modalstyle = { padding: 0, position: 'fixed', top: 0, bottom: 50, left: 0, right: 0, zIndex: 99999, backgroundColor: '#c7c7c7' };
        var containerstyle = { padding: 0 };
        var clearbuttonstyle = { textAlign: 'center', paddingTop: 5 };
        var headerstyle = {};
        var creditdefaulttext = this.state.credit;
        //<div className="container-fluid" style={clearbuttonstyle}><a onClick={this.checkDimensions}>Check Dimensions</a></div>
        return React.createElement(
            'div',
            { className: 'container-fluid', style: modalstyle },
            React.createElement(
                'div',
                { className: 'container-fluid', 'data-initialwidth': this.props.dimensions.width, 'data-initialheight': this.props.dimensions.height, style: containerstyle },
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
                        'Drag your image to position it. Use the slider to adjust zoom. To create your banner, press create.'
                    )
                ),
                React.createElement(FullImageAdjustPanelBanner, { data: this.state.data, src: this.props.src, adjustpercentage: this.state.adjustpercentage, zoomeddimensions: this.state.zoomeddimensions, ref: this.containerResize })
            ),
            React.createElement(
                'div',
                { className: 'container-fluid', style: containerstyle },
                React.createElement('div', { id: 'slider', style: sliderdivstyle })
            ),
            React.createElement(
                'div',
                { className: 'container-fluid', style: containerstyle },
                React.createElement(
                    'form',
                    { className: 'form-horizontal', id: 'myForm', onSubmit: this.handleSubmit },
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-3 control-label', htmlFor: 'credittextinput' },
                            'Add watermark text (lower-left corner)'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-6' },
                            React.createElement('input', { type: 'text', id: 'credittextinput', className: 'form-control', value: creditdefaulttext, onChange: this.handleCreditTextEntry })
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
            React.createElement('div', { className: 'container-fluid', style: containerstyle }),
            React.createElement(
                'div',
                { className: 'container-fluid', style: clearbuttonstyle },
                React.createElement(
                    'a',
                    { onClick: this.clearBannerAdjust },
                    'Clear + hide banner adjustment menu'
                )
            )
        );
    }
});

var FullImageAdjustPanelBanner = React.createClass({
    displayName: 'FullImageAdjustPanelBanner',

    render: function render() {
        var containerStyle = { position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block' };
        var dragcontainerstyle = { position: 'relative', width: '100%', maxWidth: 1920, overflow: 'hidden' };
        var dragstyle2 = { position: 'absolute', top: 0, left: 0 };

        return React.createElement(
            'div',
            { style: containerStyle, id: 'padding-div' },
            React.createElement(
                'div',
                { style: dragcontainerstyle, id: 'drag-container' },
                React.createElement(
                    'div',
                    { style: dragstyle2, id: 'parentfordraggable' },
                    React.createElement(FullDragDivBanner, { src: this.props.src, zoomeddimensions: this.props.zoomeddimensions, adjustpercentage: this.props.adjustpercentage })
                )
            )
        );
    }
});

var FullDragDivBanner = React.createClass({
    displayName: 'FullDragDivBanner',

    componentDidMount: function componentDidMount() {
        this.dragFunction();
        $(window).resize(function () {
            var timefunction;
            stopFunction();
            startFunction();
            function stopFunction() {
                clearTimeout(timefunction);
            }
            function startFunction() {
                timefunction = setTimeout(function () {
                    var pos = $('#drag').position();
                    var h = -($('#drag').outerHeight() - $('#drag').parent().outerHeight());
                    if (pos.top >= 0) {
                        $('#drag').animate({ top: 0 });
                    } else if (pos.top <= h) {
                        $('#drag').animate({ top: h });
                    }
                    var v = -($('#drag').outerWidth() - $('#drag').parent().outerWidth());
                    if (pos.left >= 0) {
                        $('#drag').animate({ left: 0 });
                    } else if (pos.left <= v) {
                        $('#drag').animate({ left: v });
                    }
                }, 600);
            }
        });
    },

    dragFunction: function dragFunction() {
        $('#drag').draggable({
            stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;
                var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
                if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }
                var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
                if (pos.left >= 0) {
                    hel.animate({ left: 0 });
                } else if (pos.left <= v) {
                    hel.animate({ left: v });
                }
            }
        });
    },

    handleTouchEnd: function handleTouchEnd() {
        //Solves problem on iPhone where overflow:hidden sections of image are not draggable; do not remove!!!
        $('#drag').draggable({
            stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;
                var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
                if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }
                var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
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

        var adjustedwidth = this.props.zoomeddimensions.zoomedwidth * this.props.adjustpercentage;
        var adjustedheight = this.props.zoomeddimensions.zoomedheight * this.props.adjustpercentage;

        var dragdivstyle = { display: 'inline-block', width: adjustedwidth, height: adjustedheight };
        var canvasstyle = { display: 'inline-block', width: adjustedwidth, height: adjustedheight, cursor: 'move' };
        return React.createElement(
            'div',
            { id: 'drag', style: dragdivstyle, onTouchEnd: this.handleTouchEnd },
            React.createElement('img', { src: this.props.src, id: 'dragcanvas', ref: 'dragcanvas', style: canvasstyle })
        );
    }
});