var FullBannerCreationPanel = React.createClass({

    getInitialState: function() {
        return {
            data_uri: null,
            dimensions: {width: null, height: null},
            aspectratio: 0.625
        }
    },
    handleSubmit: function(e) {
        //e.preventDefault();

        ReactDOM.render(<FullImageOptionsFormBanner src={this.state.data_uri} dimensions={this.state.dimensions} aspectratio={this.state.aspectratio}/>, document.getElementById('content-modal'));
        $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your image has been loaded.').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
    },

    handleFile: function(e) {
        $('#submitimagebutton').hide();
        $('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Loading your image...').addClass('alert-info').fadeIn(300).removeClass('hidden');
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.readAsDataURL(file);

        reader.onload = function(upload) {
            this.setState({
                data_uri: upload.target.result
            });
            this.getDimensions();
        }.bind(this);
    },

    componentDidUpdate: function() {

    },

    getDimensions: function() {
        var image = document.createElement('img');

        image.addEventListener('load', function(){
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
        }.bind(this));

        image.src = this.state.data_uri;
    },

    checkDimensions: function() {

        if (this.state.width < 1920) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error loading your photo.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            alert('The selected image is less than 1920 pixels wide. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        }
        else if (this.state.height < 720) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            alert('The selected image is less than 720 pixels tall. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        }
        else {
            $('#submitimagebutton').show();
        }

    },

    handleResolutionSelection: function(event) {
        if (event.target.value == '16to6') {
            var ratio = 0.375;
        }
        else if (event.target.value == '16to10') {
            var ratio = 0.625;
        }
        this.setState({aspectratio: ratio});
    },

    render: function() {
        var buttonstyle = {textAlign:'center'};
                //
        var submitbutton = {display:'none'};
        return (

        <div className="container-fluid">
            <form className="form-horizontal" onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <div className="col-xs-4 col-xs-offset-4">
                        <input type="file" className="form-control" onChange={this.handleFile} style={buttonstyle}/>
                    </div>
                    <div className="col-xs-4 col-xs-offset-4">
                        <div className="radio">
                            <label>
                                <input type="radio" className="radio" name="resolution" onChange={this.handleResolutionSelection} style={buttonstyle} value="16to6"/> Banner
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4 col-xs-offset-4">
                        <div className="radio">
                            <label>
                                <input type="radio" className="radio" name="resolution" onChange={this.handleResolutionSelection} style={buttonstyle} value="16to10" defaultChecked={true}/> Background
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-4 col-xs-offset-4">
                            <input className="form-control" id="submitimagebutton" style={submitbutton} type="submit" value="Submit"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        );
    }
});

var FullImageOptionsFormBanner = React.createClass ({

    handleSubmit: function (event) {
        event.preventDefault();
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Uploading your banner image to the server...<br>(This may take a few moments)').addClass('alert-info').fadeIn(300).removeClass('hidden');
            var canvas = document.getElementById("dragcanvas");

            //var imagedata = canvas.toDataURL("image/jpeg", 1.0);
            var image_zoom = ReactDOM.findDOMNode(this.refs.image_zoom).value.trim()  / 100;
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

            var aspectratio = this.props.aspectratio;

            $.ajax({
                    type: "POST",
                    url: "user/ajax/create_banner_full",
                    data: {
                        "imagedata": this.props.src,
                        "adjustdragpositiontop": adjustdragpositiontop,
                        "adjustdragpositionleft": adjustdragpositionleft,
                        "image_zoom": image_zoom,
                        "credit": credit,
                        "aspectratio": aspectratio,
                        _token: $_token
                    },
                    error: (function () {
                        $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
                    }),
                    success: (function (response) {
                        $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner image has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
                        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                        ReactDOM.render(<BannersMenu url=""/>, document.getElementById('content-menu'));
                        ReactDOM.render(<BannerContainer url=""/>, document.getElementById('content-main'));
                        $('#content-main').show();
                    })
                });

    },

    getInitialState: function() {
        return {
            data: {
                image_zoom: 100
                },
            zoomeddimensions: {
                zoomedwidth: this.props.dimensions.width,
                zoomedheight: this.props.dimensions.height
                },
            adjustpercentage: 100,
            adjustdimensions: {
                adjustwidth: this.props.dimensions.width,
                adjustheight: this.props.dimensions.height
                },
            credit: null
        };
    },

    handleChange1: function() {
        this.setState({
            data: {
                image_zoom: ReactDOM.findDOMNode(this.refs.image_zoom).value
                },
            zoomeddimensions: {
                zoomedwidth: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01,
                zoomedheight: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01
                }
        });
    },

    handleSlider: function() {
        var foo = function(){
            this.handleChange1();
        }.bind(this);

        $(function() {
            $( "#slider" ).slider({
              value:100,
              min: 1,
              max: 100,
              step: 1
            });
            $( "#slider" ).slider().bind({
                slide: function( event, ui ) {
                    $( "#image_zoom" ).val( ui.value );
                    foo();
                },
                slidestop: function( event, ui){
                    while ($('#drag').height() < $('#parentfordraggable').height() || $('#drag').width() < $('#parentfordraggable').width()){
                        var old = $('#image_zoom').val();
                        var oldint = parseInt(old);
                        var newe = oldint + 1;
                        $( "#slider" ).slider("value", newe);
                        $('#image_zoom').val(newe);
                        foo();
                    }
                    while ($('#drag').width() + $('#drag').position().left < $('#drag').parent().width()){
                        var oldpos = $('#drag').position().left;
                        var newpos = oldpos + 1;
                        $('#drag').css({left: newpos});
                    }
                    while ($('#drag').height() + $('#drag').position().top < $('#drag').parent().height()){
                        var oldposv = $('#drag').position().top;
                        var newposv = oldposv + 1;
                        $('#drag').css({top: newposv});
                    }
                    foo();
              }
            });
            $( "#image_zoom" ).val( $( "#slider" ).slider( "value" ));
        });
    },

    componentDidMount: function(){
        $('#drag').hide();
        this.handleSlider();
        $( window).resize(function(){
            this.containerResize();
        }.bind(this));


        $( "#slider" ).slider("value", 2);
        $( "#image_zoom" ).val( 2 );
        this.handleChange1();
        //this.triggerSlidestop();
        setTimeout(function(){
            $('#drag').show(0, function(){
                $('#slider').trigger('slidestop');
            });
            }, 800);
    },

    containerResize: function(){
        var dragcontainerwidthcheck = $('#drag-container').width();
        var dragcontainersetheightcheck = dragcontainerwidthcheck * this.props.aspectratio;
        var windowheight = (window).innerHeight;

        if (dragcontainersetheightcheck > (windowheight - 300)) {
            var dragcontainersetheight = windowheight - 300;
            var dragcontainerwidth = dragcontainersetheight / this.props.aspectratio;
        }
        else {
            var dragcontainersetheight = dragcontainersetheightcheck;
            var dragcontainerwidth = dragcontainerwidthcheck;
        }
        $('#drag-container').width(dragcontainerwidth).height(dragcontainersetheight);
        $('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);
        var dragcontainerfullwidth = 1920;

        var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;
        this.setState({adjustpercentage: adjustpercentage, adjustdimensions: { adjustwidth: dragcontainerwidth, adjustheight: dragcontainersetheight}});
    },

    checkDimensions: function(){
            //this component used for dev purposes only, should contain console log commands but they were deleted
            var dragposition = $('#drag').position();
            var dragpositiontop = -dragposition.top;
            var dragpositionleft = -dragposition.left;

            var adjustpercentage = this.state.adjustpercentage;

            var adjustdragpositiontoplong = dragpositiontop / adjustpercentage;
            var adjustdragpositiontop = adjustdragpositiontoplong.toFixed();
            var adjustdragpositionleftlong = dragpositionleft / adjustpercentage;
            var adjustdragpositionleft = adjustdragpositionleftlong.toFixed();
    },

    clearBannerAdjust: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
    },

    handleCreditTextEntry: function(event){
        this.setState({credit: event.target.value});
    },

    render: function() {
    var sliderdivstyle = {marginLeft:'1%', marginRight:'1%'};
    var modalstyle = {padding:0, position:'fixed', top:0, bottom: 50, left:0, right:0, zIndex:99999, textAlign:'center', backgroundColor:'#c7c7c7'};
    var containerstyle = {padding:0, width: this.state.adjustdimensions.adjustwidth};
    var clearbuttonstyle = {textAlign:'center', paddingTop:5};
    var headerstyle = {};
    var creditdefaulttext = this.state.credit;
    //<div className="container-fluid" style={clearbuttonstyle}><a onClick={this.checkDimensions}>Check Dimensions</a></div>
    return (
    <div className="container-fluid" style={modalstyle}>
        <div className="container-fluid" data-initialwidth={this.props.dimensions.width} data-initialheight={this.props.dimensions.height} style={containerstyle}>
        <h4 style={headerstyle}>Banner Preview</h4>
        <p><em>Drag your image to position it. Use the slider to adjust zoom. To create your banner, press create.</em></p>
        <p>Note: background images are cropped to a 16:10 aspect ratio. On many screens (i.e., a standard HD screen with a 16:9 aspect ratio), portions of the image may not be visible--so crop your image accordingly! To help you get the best display for images that have important content on certain edges of the image, you can decide how to center a background image (horizontal left/center/right, vertical top/center/bottom) when you assign it to a section of a project.</p>
            <FullImageAdjustPanelBanner data={this.state.data} aspectratio={this.props.aspectratio} src={this.props.src} adjustpercentage={this.state.adjustpercentage} zoomeddimensions={this.state.zoomeddimensions} ref={this.containerResize}/>
        </div>
        <div className="container-fluid" style={containerstyle}>
            <div id="slider" style={sliderdivstyle}></div>
        </div>
        <div className="container-fluid" style={containerstyle}>
            <form className="form-horizontal" id="myForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="credittextinput">Add watermark text (lower-left corner)</label>
                    <div className="col-sm-6">
                        <input type="text" id="credittextinput" className="form-control" value={creditdefaulttext} onChange={this.handleCreditTextEntry}/>
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
        <div className="container-fluid" style={containerstyle}>
        </div>
        <div className="container-fluid" style={clearbuttonstyle}><a onClick={this.clearBannerAdjust}>Clear + hide banner adjustment menu</a></div>

    </div>
    );
    }
});

var FullImageAdjustPanelBanner = React.createClass ({

    render: function() {
    var windowheight = (window).innerHeight;
    var setmaxwidth = windowheight / this.props.aspectratio;
    var containerStyle = {position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block', textAlign:'center'};
    var dragcontainerstyle = {position:'relative', width: '100%', maxWidth: 1920, overflow: 'hidden', margin:'auto'};
    var dragstyle2 = {position:'absolute', top: 0, left: 0};

        return (
            <div style={containerStyle} id="padding-div">
                <div style={dragcontainerstyle} id="drag-container">
                        <div style={dragstyle2} id="parentfordraggable">
                        <FullDragDivBanner src={this.props.src} zoomeddimensions={this.props.zoomeddimensions} adjustpercentage={this.props.adjustpercentage} />
                    </div>
                </div>
            </div>
        );
    }
});

var FullDragDivBanner = React.createClass({

    componentDidMount: function() {
        this.dragFunction();
        $(window).resize(function(){
            var timefunction;
            stopFunction();
            startFunction();
            function stopFunction() {clearTimeout(timefunction);}
            function startFunction() {
                timefunction = setTimeout(function(){
                    var pos = $('#drag').position();
                    var h = -($('#drag').outerHeight() - $('#drag').parent().outerHeight());
                    if (pos.top >= 0) {
                        $('#drag').animate({ top: 0 });
                    }
                    else if (pos.top <= h) {
                        $('#drag').animate({ top: h });
                    }
                    var v = -($('#drag').outerWidth() - $('#drag').parent().outerWidth());
                    if (pos.left >= 0) {
                        $('#drag').animate({ left: 0 });
                    }
                    else if (pos.left <= v) {
                        $('#drag').animate({ left: v });
                    }
                }, 600);
            }
        });
    },

    dragFunction: function() {
        $('#drag').draggable({
            stop: function(ev, ui) {
                var hel = ui.helper, pos = ui.position;
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

    handleTouchEnd: function(){ //Solves problem on iPhone where overflow:hidden sections of image are not draggable; do not remove!!!
        $('#drag').draggable({
        stop: function(ev, ui) {
            var hel = ui.helper, pos = ui.position;
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

    render: function() {

        var adjustedwidth = this.props.zoomeddimensions.zoomedwidth * this.props.adjustpercentage;
        var adjustedheight = this.props.zoomeddimensions.zoomedheight * this.props.adjustpercentage;

        var dragdivstyle = {display:'inline-block', width: adjustedwidth, height: adjustedheight};
        var canvasstyle = {display:'inline-block',width: adjustedwidth, height: adjustedheight, cursor:'move'};
        return (
            <div id="drag" style={dragdivstyle} onTouchEnd={this.handleTouchEnd}>
                <img src={this.props.src} id="dragcanvas" ref="dragcanvas" style={canvasstyle}></img>
            </div>
        );
    }
});