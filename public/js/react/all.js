'use strict';var SubscribeContainer = React.createClass({ displayName: 'SubscribeContainer', render: function render() {
        return React.createElement('div', null, React.createElement(SubscribeButton, null));
    } });var SubscribeButton = React.createClass({ displayName: 'SubscribeButton', handleClick: function handleClick() {
        ReactDOM.render(React.createElement(SubscribeForm, { url: '' }), document.getElementById('subscribeformplaceholder'));$('html,body').animate({ scrollTop: $('#subscribeformplaceholder').offset().top - 100 }, 500);
    }, render: function render() {
        return React.createElement('div', null, React.createElement('a', { onClick: this.handleClick }, 'Subscribe for updates'));
    } });var SubscribeForm = React.createClass({ displayName: 'SubscribeForm', getInitialState: function getInitialState() {
        return { contact_email: '' };
    }, handleClose: function handleClose() {
        ReactDOM.unmountComponentAtNode(document.getElementById('subscribeformplaceholder'));$('html,body').animate({ scrollTop: window.innerHeight / 2 }, 500);
    }, handleSubmit: function handleSubmit() {
        var contactemail = this.state.contact_email;var projectid = localStorage.getItem('projectid');$.ajax({ type: 'POST', url: '/project/subscribe/contact', data: { 'contact_email': contactemail, 'project_id': projectid }, error: function error(response) {
                alert('There was an error. Please try again later.');
            }, success: (function (response) {
                alert(response);this.handleClose();
            }).bind(this) });
    }, handleEmailTextEntry: function handleEmailTextEntry(event) {
        this.setState({ contact_email: event.target.value });
    }, render: function render() {
        var emaildefaulttext = this.state.contact_email;var spacerstyle = { paddingLeft: 10 };var formstyle = { border: '1px solid #333333', backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 5, paddingTop: 20, paddingBottom: 20, marginBottom: 20 };var subscribeheaderstyle = { textAlign: 'center' };return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-sm-10 col-sm-offset-1', style: formstyle }, React.createElement('div', { style: subscribeheaderstyle }, React.createElement('h4', null, 'Subscribe'), React.createElement('p', null, React.createElement('em', null, 'To subscribe to the mailing list, enter your email address and press "subscribe."'))), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'emailinput' }, 'Email:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'emailtextinput', className: 'form-control', value: emaildefaulttext, onChange: this.handleEmailTextEntry })))), React.createElement('a', { id: 'submitsubscribeform', className: 'btn btn-primary', onClick: this.handleSubmit }, 'Subscribe'), React.createElement('span', { style: spacerstyle }), React.createElement('a', { id: 'closesusbcribeform', className: 'btn btn-default', onClick: this.handleClose }, 'Close')));
    } });
'use strict';var CurrentAlbum = React.createClass({ displayName: 'CurrentAlbum', getInitialState: function getInitialState() {
        return { showComponent: true, filenames: [{ filename: '' }], albumname: '' };
    }, onClick: function onClick() {}, handleSuccess: function handleSuccess() {}, componentDidMount: function componentDidMount() {
        var photoalbumid = $('#datadiv').data('photoalbumid');$.ajax({ type: 'GET', url: '/embeddables/photoalbum/photos', data: { 'photoalbum_id': photoalbumid }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);var photoalbumresponse = parsedresponse.filenames;var photoalbumname = parsedresponse.albumname; //console.log(photoalbumresponse);
                //var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({ filenames: photoalbumresponse, albumname: photoalbumname }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });
    }, componentDidUpdate: function componentDidUpdate() {}, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var albumphotos = this.state.filenames.map(function (albumphoto) {
            return React.createElement(AlbumPhoto, { filename: albumphoto.filename });
        });var textalign = { textAlign: 'center' };var photostyle = { padding: '0.25%' }; //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';var photoalbumcontainerstyle = { width: '100%' };var containerstyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' };return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />
            React.createElement('div', { id: this.state.albumname, className: 'row nopadding' }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('div', { style: containerstyle, id: 'get-user-photos-from-facebook' }, albumphotos)))
        );
    } });var AlbumPhoto = React.createClass({ displayName: 'AlbumPhoto', getInitialState: function getInitialState() {
        return { maxheight: null, postopadjust: null };
    }, componentDidMount: function componentDidMount() {}, componentDidUpdate: function componentDidUpdate() {}, resizeOnClick: function resizeOnClick() {}, onClick: function onClick() {
        //ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.render(React.createElement(AlbumPhotoModal, { filename: this.props.filename, id: this.props.id, key: 'modal' + this.props.id }), document.getElementById('content-modal'));$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/0/' + this.props.filename + '.jpg');
    }, render: function render() {
        var name = this.props.filename;var imgid = 'img-' + this.props.filename;var imgidhash = '#' + imgid;var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0t/' + name + '.jpg';var imgdiv = { padding: '0.25%' };var idhash = '#' + this.props.filename;var imgstyle = { marginBottom: 5, width: '33%', height: '33%' };var helper = { display: 'inline-block', verticalAlign: 'middle', height: '100%' };return React.createElement('img', { className: 'img img-responsive imglink', src: srcstring, ref: this.props.identifier, id: imgid, style: imgstyle, onClick: this.onClick });
    } });var AlbumPhotoModal = React.createClass({ displayName: 'AlbumPhotoModal', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {
        var imgload = new Image();imgload.addEventListener('load', (function () {
            $('.preloadedthumbimage').attr('src', imgload.src); //.animate({'width':'auto','height':'auto','maxWidth':'100%'}, 0, function(){
            //this.timerFunction(imgload);
            //}.bind(this));
        }).bind(this));imgload.src = '//d1y0bevpkkhybk.cloudfront.net/0/' + this.props.filename + '.jpg';$('#imgmodal').slideDown(0, function () {});
    }, timerFunction: function timerFunction(imgload) {
        console.log('starting correct modal height...');this.correctModalHeight(imgload);
    }, correctModalHeight: function correctModalHeight(imgload) {
        console.log(imgload.width);var imgh = imgload.height;var h = window.innerHeight;var maxh = h - 140;var imgmaxh = maxh - 100;$('html,body').animate({ scrollTop: $('#images').offset().top }, 500);$('#currentmodalimage').animate({ 'height': imgh, 'maxHeight': imgmaxh, width: 'auto' }, 0, (function () {
            var actualimgheight = $('#currentmodalimage').height();var closedivheight = $('#modalsaveclose').height();var calch = actualimgheight + closedivheight + 20;$('#imgmodal').animate({ 'height': calch, 'maxHeight': maxh }, 0, (function () {
                this.correctModalWidth(imgload);
            }).bind(this));
        }).bind(this));
    }, correctModalWidth: function correctModalWidth(imgload) {
        console.log(imgload.width);var imgloadheight = imgload.height;var imgh = $('#currentmodalimage').height() - 20;var ratio = imgloadheight / imgh;var calcimgw = imgload.width / ratio; //var imgw = $('#currentmodalimage').width();
        var w = window.innerWidth;$('#currentmodalimage').animate({ width: calcimgw }, 0);var targetmodalmargin = (w - calcimgw) / 2;$('#imgmodal').animate({ width: calcimgw, marginLeft: targetmodalmargin, marginRight: targetmodalmargin, maxWidth: '100%', left: 0 }, 0);
    }, handleClose: function handleClose() {
        clearInterval(this.timer);$('#imgmodal').slideUp(1, function () {
            ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        });
    }, modalBackgroundClick: function modalBackgroundClick() {
        this.handleClose();
    }, render: function render() {
        var ratio = $('#img-' + this.props.filename).height() / $('#img-' + this.props.filename).width();var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0t/' + this.props.filename + '.jpg';var spacerstyle = { paddingLeft: 10 };var w = window.innerWidth;var r = w * 0.95;var l = w * 0.05;var h = window.innerHeight;var maxh = h - 140;var imgmaxheight = maxh - 74;var maxw = imgmaxheight / ratio;var imgmaxwidth = imgmaxheight / ratio;var calcmargin = (w - imgmaxwidth) / 2;var textdivstyle = { display: 'block', textAlign: 'center' };var modalstyle = { position: 'fixed', zIndex: 1032, backgroundColor: '#ffffff', left: calcmargin, top: 70, right: calcmargin, height: maxh, width: maxw, textAlign: 'center', display: 'none' };var imgstyle = { display: 'block', maxHeight: imgmaxheight, maxWidth: imgmaxwidth, marginLeft: 0, marginRight: 0, paddingLeft: 20, paddingRight: 20, alignSelf: 'center', marginTop: 20 };var modalbackgroundstyle = { position: 'fixed', zIndex: 1031, backgroundColor: 'rgba(34,34,34,.5)', left: 0, top: 0, width: '100%', height: '100%' };return React.createElement('div', null, React.createElement('div', { style: modalbackgroundstyle, onClick: this.modalBackgroundClick, id: 'modalbackground' }), React.createElement('div', { className: 'cursorprogress', style: modalstyle, id: 'imgmodal' }, React.createElement('img', { className: 'img preloadedthumbimage img-responsive', style: imgstyle, id: 'currentmodalimage', src: srcstring }), React.createElement('div', { style: textdivstyle, id: 'modalsaveclose' }, React.createElement('br', null), React.createElement('a', { id: 'savecurrentbannerbutton', href: '', download: true, className: 'btn btn-primary' }, 'Save'), React.createElement('span', { style: spacerstyle }), React.createElement('a', { id: 'closebox', className: 'btn btn-default', onClick: this.handleClose }, 'Close'), React.createElement('br', null), React.createElement('br', null))));
    } });
'use strict';var UserInfoContainer = React.createClass({ displayName: 'UserInfoContainer', getInitialState: function getInitialState() {
        return { user_first_name: null, user_last_name: null, email: null, user_location: null };
    }, componentDidMount: function componentDidMount() {
        $.ajax({ type: 'GET', url: 'user/ajax/account/userinfo', data: { _token: $_token }, error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this), success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('User information retrieved successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);this.setState({ user_first_name: parsedresponse.user_first_name, user_last_name: parsedresponse.user_last_name, email: parsedresponse.email, user_location: parsedresponse.user_location });
            }).bind(this) });
    }, submitUpdateUserInfo: function submitUpdateUserInfo() {
        var user_first_name = this.state.user_first_name;var user_last_name = this.state.user_last_name;var email = this.state.email;var user_location = this.state.user_location;$.ajax({ type: 'POST', url: 'user/ajax/account/userinfo', data: { 'user_first_name': user_first_name, 'user_last_name': user_last_name, //"email": email,
                'user_location': user_location, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);window.location.reload(); //ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
                //ReactDOM.render(<BannerHeadlineContainer url=""/>, document.getElementById('content-main'));
            } });
    }, handleUserFirstNameTextEntry: function handleUserFirstNameTextEntry(event) {
        this.setState({ user_first_name: event.target.value });
    }, handleUserLastNameTextEntry: function handleUserLastNameTextEntry(event) {
        this.setState({ user_last_name: event.target.value });
    }, handleEmailTextEntry: function handleEmailTextEntry(event) {
        this.setState({ email: event.target.value });
    }, handleLocationTextEntry: function handleLocationTextEntry(event) {
        this.setState({ user_location: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var user_first_name_defaulttext = this.state.user_first_name;var user_last_name_defaulttext = this.state.user_last_name;var email_defaulttext = this.state.email;var user_location_defaulttext = this.state.user_location;var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'user_first_name_textinput' }, 'First Name:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h1_textinput', className: 'form-control', value: user_first_name_defaulttext, onChange: this.handleUserFirstNameTextEntry })), React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'user_last_name_textinput' }, 'Last Name:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'user_last_name_textinput', className: 'form-control', value: user_last_name_defaulttext, onChange: this.handleUserLastNameTextEntry })), React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'user_location_textinput' }, 'Location:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('textarea', { id: 'user_location_textinput', className: 'form-control', rows: '6', value: user_location_defaulttext, onChange: this.handleLocationTextEntry, readOnly: 'true' }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitUpdateUserInfo, className: 'btn btn-primary' }, 'Update User Info'))));
    } });
'use strict';var BackgroundimageCreationPanel = React.createClass({ displayName: 'BackgroundimageCreationPanel', getInitialState: function getInitialState() {
        return { data_uri: null, dimensions: { width: null, height: null }, aspectratio: 0.625 };
    }, handleSubmit: function handleSubmit(e) {
        //e.preventDefault();
        ReactDOM.render(React.createElement(BackgroundimageOptionsForm, { src: this.state.data_uri, dimensions: this.state.dimensions, aspectratio: this.state.aspectratio }), document.getElementById('content-modal'));$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your image has been loaded.').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
    }, handleFile: function handleFile(e) {
        $('#submitimagebutton').hide();$('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Loading your image...').addClass('alert-info').fadeIn(300).removeClass('hidden');var reader = new FileReader();var file = e.target.files[0];reader.readAsDataURL(file);reader.onload = (function (upload) {
            this.setState({ data_uri: upload.target.result });this.getDimensions();
        }).bind(this);
    }, componentDidUpdate: function componentDidUpdate() {}, getDimensions: function getDimensions() {
        var image = document.createElement('img');image.addEventListener('load', (function () {
            var w = image.width;var h = image.height;this.setState({ dimensions: { width: w, height: h } });$(image).remove(); //var e;
            this.checkDimensions();
        }).bind(this));image.src = this.state.data_uri;
    }, checkDimensions: function checkDimensions() {
        if (this.state.width < 1920) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error loading your photo.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);alert('The selected image is less than 1920 pixels wide. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        } else if (this.state.height < 720) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);alert('The selected image is less than 720 pixels tall. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        } else {
            $('#submitimagebutton').show();
        }
    }, handleResolutionSelection: function handleResolutionSelection(event) {
        if (event.target.value == '16to6') {
            var ratio = 0.375;
        } else if (event.target.value == '16to10') {
            var ratio = 0.625;
        }this.setState({ aspectratio: ratio });
    }, render: function render() {
        var buttonstyle = { textAlign: 'center' }; //
        var submitbutton = { display: 'none' };return React.createElement('div', { className: 'container-fluid' }, React.createElement('form', { className: 'form-horizontal', onSubmit: this.handleSubmit, encType: 'multipart/form-data' }, React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('input', { type: 'file', className: 'form-control', onChange: this.handleFile, style: buttonstyle })), React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('div', { className: 'radio' }, React.createElement('label', null, React.createElement('input', { type: 'radio', className: 'radio', name: 'resolution', onChange: this.handleResolutionSelection, style: buttonstyle, value: '16to6' }), ' Banner'))), React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('div', { className: 'radio' }, React.createElement('label', null, React.createElement('input', { type: 'radio', className: 'radio', name: 'resolution', onChange: this.handleResolutionSelection, style: buttonstyle, value: '16to10', defaultChecked: true }), ' Background'))), React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('input', { className: 'form-control', id: 'submitimagebutton', style: submitbutton, type: 'submit', value: 'Submit' }))))));
    } });var BackgroundimageOptionsForm = React.createClass({ displayName: 'BackgroundimageOptionsForm', handleSubmit: function handleSubmit(event) {
        event.preventDefault();$('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Uploading your banner image to the server...<br>(This may take a few moments)').addClass('alert-info').fadeIn(300).removeClass('hidden');var canvas = document.getElementById('dragcanvas'); //var imagedata = canvas.toDataURL("image/jpeg", 1.0);
        var image_zoom = ReactDOM.findDOMNode(this.refs.image_zoom).value.trim() / 100;var paddingint = parseFloat($('#padding-div').css('padding'));var dragposition = $('#drag').position();var dragpositiontop = -dragposition.top;var dragpositionleft = -dragposition.left;var adjustpercentage = this.state.adjustpercentage;var adjustdragpositiontoplong = dragpositiontop / adjustpercentage;var adjustdragpositiontop = adjustdragpositiontoplong.toFixed();var adjustdragpositionleftlong = dragpositionleft / adjustpercentage;var adjustdragpositionleft = adjustdragpositionleftlong.toFixed();var credit = this.state.credit;var aspectratio = this.props.aspectratio;$.ajax({ type: 'POST', url: 'user/ajax/create_banner_full', data: { 'imagedata': this.props.src, 'adjustdragpositiontop': adjustdragpositiontop, 'adjustdragpositionleft': adjustdragpositionleft, 'image_zoom': image_zoom, 'credit': credit, 'aspectratio': aspectratio, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            }, success: function success(response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner image has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.render(React.createElement(BannersMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(BannerContainer, { url: '' }), document.getElementById('content-main'));$('#content-main').show();
            } });
    }, getInitialState: function getInitialState() {
        return { data: { image_zoom: 100 }, zoomeddimensions: { zoomedwidth: this.props.dimensions.width, zoomedheight: this.props.dimensions.height }, adjustpercentage: 100, adjustdimensions: { adjustwidth: this.props.dimensions.width, adjustheight: this.props.dimensions.height }, credit: null };
    }, handleChange1: function handleChange1() {
        this.setState({ data: { image_zoom: ReactDOM.findDOMNode(this.refs.image_zoom).value }, zoomeddimensions: { zoomedwidth: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01, zoomedheight: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01 } });
    }, handleSlider: function handleSlider() {
        var foo = (function () {
            this.handleChange1();
        }).bind(this);$(function () {
            $('#slider').slider({ value: 100, min: 1, max: 100, step: 1 });$('#slider').slider().bind({ slide: function slide(event, ui) {
                    $('#image_zoom').val(ui.value);foo();
                }, slidestop: function slidestop(event, ui) {
                    while ($('#drag').height() < $('#parentfordraggable').height() || $('#drag').width() < $('#parentfordraggable').width()) {
                        var old = $('#image_zoom').val();var oldint = parseInt(old);var newe = oldint + 1;$('#slider').slider('value', newe);$('#image_zoom').val(newe);foo();
                    }while ($('#drag').width() + $('#drag').position().left < $('#drag').parent().width()) {
                        var oldpos = $('#drag').position().left;var newpos = oldpos + 1;$('#drag').css({ left: newpos });
                    }while ($('#drag').height() + $('#drag').position().top < $('#drag').parent().height()) {
                        var oldposv = $('#drag').position().top;var newposv = oldposv + 1;$('#drag').css({ top: newposv });
                    }foo();
                } });$('#image_zoom').val($('#slider').slider('value'));
        });
    }, componentDidMount: function componentDidMount() {
        $('#drag').hide();this.handleSlider();$(window).resize((function () {
            this.containerResize();
        }).bind(this));$('#slider').slider('value', 2);$('#image_zoom').val(2);this.handleChange1(); //this.triggerSlidestop();
        setTimeout(function () {
            $('#drag').show(0, function () {
                $('#slider').trigger('slidestop');
            });
        }, 800);
    }, containerResize: function containerResize() {
        var dragcontainerwidthcheck = $('#drag-container').width();var dragcontainersetheightcheck = dragcontainerwidthcheck * this.props.aspectratio;var windowheight = window.innerHeight;if (dragcontainersetheightcheck > windowheight - 300) {
            var dragcontainersetheight = windowheight - 300;var dragcontainerwidth = dragcontainersetheight / this.props.aspectratio;
        } else {
            var dragcontainersetheight = dragcontainersetheightcheck;var dragcontainerwidth = dragcontainerwidthcheck;
        }$('#drag-container').width(dragcontainerwidth).height(dragcontainersetheight);$('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);var dragcontainerfullwidth = 1920;var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;this.setState({ adjustpercentage: adjustpercentage, adjustdimensions: { adjustwidth: dragcontainerwidth, adjustheight: dragcontainersetheight } });
    }, checkDimensions: function checkDimensions() {
        //this component used for dev purposes only, should contain console log commands but they were deleted
        var dragposition = $('#drag').position();var dragpositiontop = -dragposition.top;var dragpositionleft = -dragposition.left;var adjustpercentage = this.state.adjustpercentage;var adjustdragpositiontoplong = dragpositiontop / adjustpercentage;var adjustdragpositiontop = adjustdragpositiontoplong.toFixed();var adjustdragpositionleftlong = dragpositionleft / adjustpercentage;var adjustdragpositionleft = adjustdragpositionleftlong.toFixed();
    }, clearBannerAdjust: function clearBannerAdjust() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
    }, handleCreditTextEntry: function handleCreditTextEntry(event) {
        this.setState({ credit: event.target.value });
    }, render: function render() {
        var sliderdivstyle = { marginLeft: '1%', marginRight: '1%' };var modalstyle = { padding: 0, position: 'fixed', top: 0, bottom: 50, left: 0, right: 0, zIndex: 99999, textAlign: 'center', backgroundColor: '#c7c7c7' };var containerstyle = { padding: 0, width: this.state.adjustdimensions.adjustwidth };var clearbuttonstyle = { textAlign: 'center', paddingTop: 5 };var headerstyle = {};var creditdefaulttext = this.state.credit; //<div className="container-fluid" style={clearbuttonstyle}><a onClick={this.checkDimensions}>Check Dimensions</a></div>
        return React.createElement('div', { className: 'container-fluid', style: modalstyle }, React.createElement('div', { className: 'container-fluid', 'data-initialwidth': this.props.dimensions.width, 'data-initialheight': this.props.dimensions.height, style: containerstyle }, React.createElement('h4', { style: headerstyle }, 'Banner Preview'), React.createElement('p', null, React.createElement('em', null, 'Drag your image to position it. Use the slider to adjust zoom. To create your banner, press create.')), React.createElement('p', null, 'Note: background images are cropped to a 16:10 aspect ratio. On many screens (i.e., a standard HD screen with a 16:9 aspect ratio), portions of the image may not be visible--so crop your image accordingly! To help you get the best display for images that have important content on certain edges of the image, you can decide how to center a background image (horizontal left/center/right, vertical top/center/bottom) when you assign it to a section of a project.'), React.createElement(BackgroundimageAdjustPanel, { data: this.state.data, aspectratio: this.props.aspectratio, src: this.props.src, adjustpercentage: this.state.adjustpercentage, zoomeddimensions: this.state.zoomeddimensions, ref: this.containerResize })), React.createElement('div', { className: 'container-fluid', style: containerstyle }, React.createElement('div', { id: 'slider', style: sliderdivstyle })), React.createElement('div', { className: 'container-fluid', style: containerstyle }, React.createElement('form', { className: 'form-horizontal', id: 'myForm', onSubmit: this.handleSubmit }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'credittextinput' }, 'Add watermark text (lower-left corner)'), React.createElement('div', { className: 'col-sm-6' }, React.createElement('input', { type: 'text', id: 'credittextinput', className: 'form-control', value: creditdefaulttext, onChange: this.handleCreditTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('input', { className: 'form-control', type: 'submit', value: 'Create' }))), React.createElement('div', { className: 'form-group' }, React.createElement('input', { className: 'form-control', type: 'hidden', ref: 'image_zoom', id: 'image_zoom', name: 'image_zoom', onChange: this.handleChange1 })))), React.createElement('div', { className: 'container-fluid', style: containerstyle }), React.createElement('div', { className: 'container-fluid', style: clearbuttonstyle }, React.createElement('a', { onClick: this.clearBannerAdjust }, 'Clear + hide banner adjustment menu')));
    } });var BackgroundimageAdjustPanel = React.createClass({ displayName: 'BackgroundimageAdjustPanel', render: function render() {
        var windowheight = window.innerHeight;var setmaxwidth = windowheight / this.props.aspectratio;var containerStyle = { position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block', textAlign: 'center' };var dragcontainerstyle = { position: 'relative', width: '100%', maxWidth: 1920, overflow: 'hidden', margin: 'auto' };var dragstyle2 = { position: 'absolute', top: 0, left: 0 };return React.createElement('div', { style: containerStyle, id: 'padding-div' }, React.createElement('div', { style: dragcontainerstyle, id: 'drag-container' }, React.createElement('div', { style: dragstyle2, id: 'parentfordraggable' }, React.createElement(BackgroundimageDragDiv, { src: this.props.src, zoomeddimensions: this.props.zoomeddimensions, adjustpercentage: this.props.adjustpercentage }))));
    } });var BackgroundimageDragDiv = React.createClass({ displayName: 'BackgroundimageDragDiv', componentDidMount: function componentDidMount() {
        this.dragFunction();$(window).resize(function () {
            var timefunction;stopFunction();startFunction();function stopFunction() {
                clearTimeout(timefunction);
            }function startFunction() {
                timefunction = setTimeout(function () {
                    var pos = $('#drag').position();var h = -($('#drag').outerHeight() - $('#drag').parent().outerHeight());if (pos.top >= 0) {
                        $('#drag').animate({ top: 0 });
                    } else if (pos.top <= h) {
                        $('#drag').animate({ top: h });
                    }var v = -($('#drag').outerWidth() - $('#drag').parent().outerWidth());if (pos.left >= 0) {
                        $('#drag').animate({ left: 0 });
                    } else if (pos.left <= v) {
                        $('#drag').animate({ left: v });
                    }
                }, 600);
            }
        });
    }, dragFunction: function dragFunction() {
        $('#drag').draggable({ stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;var h = -(hel.outerHeight() - $(hel).parent().outerHeight());if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }var v = -(hel.outerWidth() - $(hel).parent().outerWidth());if (pos.left >= 0) {
                    hel.animate({ left: 0 });
                } else if (pos.left <= v) {
                    hel.animate({ left: v });
                }
            } });
    }, handleTouchEnd: function handleTouchEnd() {
        //Solves problem on iPhone where overflow:hidden sections of image are not draggable; do not remove!!!
        $('#drag').draggable({ stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;var h = -(hel.outerHeight() - $(hel).parent().outerHeight());if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }var v = -(hel.outerWidth() - $(hel).parent().outerWidth());if (pos.left >= 0) {
                    hel.animate({ left: 0 });hel.animate({ left: 0 });
                } else if (pos.left <= v) {
                    hel.animate({ left: v });
                }
            } });
    }, render: function render() {
        var adjustedwidth = this.props.zoomeddimensions.zoomedwidth * this.props.adjustpercentage;var adjustedheight = this.props.zoomeddimensions.zoomedheight * this.props.adjustpercentage;var dragdivstyle = { display: 'inline-block', width: adjustedwidth, height: adjustedheight };var canvasstyle = { display: 'inline-block', width: adjustedwidth, height: adjustedheight, cursor: 'move' };return React.createElement('div', { id: 'drag', style: dragdivstyle, onTouchEnd: this.handleTouchEnd }, React.createElement('img', { src: this.props.src, id: 'dragcanvas', ref: 'dragcanvas', style: canvasstyle }));
    } });
'use strict';var BackgroundimageContainer = React.createClass({ displayName: 'BackgroundimageContainer', getInitialState: function getInitialState() {
        return { data: [] };
    }, componentDidMount: function componentDidMount() {
        $.ajax({ type: 'GET', url: 'user/ajax/get/get_current_user_backgroundimages_all', data: {}, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);var uniqueresponse = parsedresponse.backgroundimages; //var projectresponse = parsedresponse.projectbackgroundimageimages;
                //console.log(foo.uniquebackgroundimageimages);
                this.setState({ data: uniqueresponse }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });
    }, handleDeleteButton: function handleDeleteButton(childdata) {
        var backgroundimageid = childdata.bid;var imagesrc = childdata.filename;var tempstatedata = this.state.data;var setstatefunction = (function () {
            var newdataarray = this.state.data;var elementPos = this.state.data.map(function (item) {
                return item.backgroundimage_id;
            }).indexOf(backgroundimageid);newdataarray.splice(elementPos, 1);this.setState({ data: newdataarray }); //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
            //hiding component instead
            $('#backgroundimage-' + backgroundimageid).hide();
        }).bind(this);var r = confirm('Are you sure you want to delete this background image? This will remove the background image from all MusicLocal projects. WARNING: this action cannot be undone.');if (r == true) {
            setstatefunction();$.ajax({ type: 'POST', url: 'user/ajax/post/user_backgroundimagedelete', //dataType: "text"
                data: { 'backgroundimageimage_id': backgroundimageid, 'backgroundimageimage_filename': imagesrc, _token: $_token }, error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);this.setState({ data: tempstatedata });$('#backgroundimage-' + backgroundimageid).show();
                }).bind(this), success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
                }).bind(this) });
        }
    }, render: function render() {
        var containerstyle = { padding: 0 }; //
        return React.createElement('div', { className: '', style: containerstyle, id: 'backgroundimages-manage-container' }, React.createElement('div', { id: 'fbphotodisplay', ref: 'fbphotodisplay' }, React.createElement(BackgroundimageList, { data: this.state.data, handleDeleteButton: this.handleDeleteButton })));
    } });var BackgroundimageList = React.createClass({ displayName: 'BackgroundimageList', handleDeleteButton: function handleDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, render: function render() {
        var backgroundimages = this.props.data.map((function (backgroundimage) {
            return React.createElement(CurrentBackgroundimage, { filename: backgroundimage.backgroundimage_filename, key: backgroundimage.backgroundimage_id, id: backgroundimage.backgroundimage_id, onBackgroundimageAddClick: this.handleIntermediate, handleDeleteButton: this.handleDeleteButton });
        }).bind(this));var imgcontstyle = {};return React.createElement('div', { id: 'get-user-photos-from-facebook' }, React.createElement('div', { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', style: imgcontstyle }, backgroundimages));
    } });var CurrentBackgroundimage = React.createClass({ displayName: 'CurrentBackgroundimage', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {}, handleModalDeleteButton: function handleModalDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bid: this.props.id, filename: this.props.filename });
    }, onClick: function onClick() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.render(React.createElement(BackgroundimageModal, { filename: this.props.filename, id: this.props.id, key: 'modal' + this.props.id, handleDeleteButton: this.handleModalDeleteButton }), document.getElementById('content-modal'));$('#content-main').hide();$('#savecurrentbackgroundimagebutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg');
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var photostyle = { padding: '0.25%' };var name = this.props.filename; //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/bxs/' + name + '.jpg';var btndivstyle = { textAlign: 'center' };var btnstyle = { marginTop: 6, marginBottom: 12 };var idstring = 'backgroundimage-' + this.props.id;return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            React.createElement('div', { className: 'col-sm-4 col-xs-12', id: idstring }, React.createElement('a', { onClick: this.onClick }, React.createElement('img', { className: 'img img-responsive', id: this.props.id, 'data-id': this.props.id, style: photostyle, src: srcstring })), React.createElement('div', { style: btndivstyle }, React.createElement('a', { className: 'btn btn-block btn-primary', onClick: this.onClick }, 'View Larger Background Image')), React.createElement('div', { style: btndivstyle }, React.createElement('a', { className: 'btn btn-block btn-warning', onClick: this.handleDeleteButton }, 'Delete Background Image')), React.createElement('br', null))
        );
    } });var BackgroundimageModal = React.createClass({ displayName: 'BackgroundimageModal', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {
        var image = new Image();image.addEventListener('load', function () {
            var w = image.width;var h = image.height;var h_dividedby_w = h / w;console.log('w: ' + w + '; h: ' + h + '; h_dividedby_w: ' + h_dividedby_w);var modal_top_position = document.getElementById('content-modal').offsetTop;var window_height = window.innerHeight;var modal_button_container_height = document.getElementById('modal-button-container').offsetHeight;var set_modal_image_height = window_height - modal_top_position - modal_button_container_height - 60;var set_modal_image_width = set_modal_image_height / h_dividedby_w;$('#currentmodalbackgroundimage').css({ 'height': set_modal_image_height, 'width': set_modal_image_width });
        });image.src = '//d1y0bevpkkhybk.cloudfront.net/b/' + this.props.filename + '.jpg';
    }, handleClose: function handleClose() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bid: this.props.id, filename: this.props.filename });
    }, render: function render() {
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/b/' + this.props.filename + '.jpg';var spacerstyle = { padding: 10 };var textdivstyle = { display: 'block', textAlign: 'center' };var modal_container_style = { textAlign: 'center' };var modal_img_style = { display: 'block', margin: '0 auto' };return React.createElement('div', { className: 'col-xs-12', id: 'modal-container', style: modal_container_style }, React.createElement('img', { className: 'img img-responsive', src: srcstring, id: 'currentmodalbackgroundimage', style: modal_img_style }), React.createElement('div', { style: textdivstyle, id: 'modal-button-container' }, React.createElement('br', null), React.createElement('p', null, React.createElement('em', null, 'To copy the link to your background image, right click on the background image and select "Copy image URL."')), React.createElement('br', null), React.createElement('a', { id: 'savecurrentbackgroundimagebutton', href: '', download: true, className: 'btn btn-primary' }, 'Save Background Image'), React.createElement('span', { style: spacerstyle }), React.createElement('a', { id: 'deletecurrentbackgroundimagebutton', className: 'btn btn-default', onClick: this.handleDeleteButton }, 'Delete Background Image'), React.createElement('br', null), React.createElement('br', null), React.createElement('div', null, React.createElement('a', { id: 'closebox', className: 'btn btn-default', onClick: this.handleClose }, 'Close Background Image'))));
    } });
'use strict';var BackgroundimagesMenu = React.createClass({ displayName: 'BackgroundimagesMenu', getInitialState: function getInitialState() {
        //{name: 'Create', reactnodetomount: 'BackgroundimageCreateContainer', mountlocation: 'content-main', active: false},
        return { links: [{ name: 'Manage', reactnodetomount: 'BackgroundimageContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'FullBackgroundimageCreateContainer', mountlocation: 'content-main', active: false }] };
    }, componentDidMount: function componentDidMount() {
        this.setState({ links: [{ name: 'Manage', reactnodetomount: 'BackgroundimageContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'FullBackgroundimageCreateContainer', mountlocation: 'content-main', active: false }] });
    }, componentWillUnmount: function componentWillUnmount() {
        $('#componentsbutton').removeClass('active');$('#componentschildtarget').html('').removeClass('active');
    }, onLinkClick: function onLinkClick(data) {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();if (data == 'BackgroundimageContainer') {
            ReactDOM.render(React.createElement(BackgroundimageContainer, null), document.getElementById('content-main'));
        } /*
          else if (data == 'BackgroundimageCreateContainer'){
          ReactDOM.render(<BackgroundimageCreateContainer/>, document.getElementById('content-main'));
          }*/else if (data == 'FullBackgroundimageCreateContainer') {
            ReactDOM.render(React.createElement(FullBackgroundimageCreationPanel, null), document.getElementById('content-main'));
        }
    }, render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(BackgroundimagesMenuLink, { name: link.name, key: link.reactnodetomount, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));var middlestyle = { paddingLeft: 0, paddingRight: 0 };return React.createElement('div', { className: 'row nopadding' }, React.createElement(CollectionsBackButton, null), React.createElement('div', { className: 'col-xs-8 col-sm-2', style: middlestyle }, links));
    } });var BackgroundimagesMenuLink = React.createClass({ displayName: 'BackgroundimagesMenuLink', componentDidMount: function componentDidMount() {}, onLinkClick: function onLinkClick() {
        this.props.onLinkClick(this.props.reactnodetomount);
    }, render: function render() {
        var name = this.props.name;if (name == 'Create') {
            var buttonclass = 'btn btn-block btn-success';
        } else if (name == 'Manage') {
            var buttonclass = 'btn btn-block btn-primary';
        } else {
            var buttonclass = '';
        }return React.createElement('div', null, React.createElement('div', { className: '' }, React.createElement('a', { className: buttonclass, onClick: this.onLinkClick }, this.props.name)), React.createElement('div', { className: 'clearfix visible-sm-block visible-md-block visible-lg-block' }));
    } });
'use strict';var BannerHeadlineCreateContainer = React.createClass({ displayName: 'BannerHeadlineCreateContainer', getInitialState: function getInitialState() {
        return { bannerheadline_h1: null, bannerheadline_h2: null, bannerheadline_h3: null, bannerheadline_h3link: null };
    }, componentDidMount: function componentDidMount() {}, submitCreateNewBannerHeadline: function submitCreateNewBannerHeadline() {
        var bannerheadline_h1 = this.state.bannerheadline_h1;var bannerheadline_h2 = this.state.bannerheadline_h2;var bannerheadline_h3 = this.state.bannerheadline_h3;var bannerheadline_h3link = this.state.bannerheadline_h3link;$.ajax({ type: 'POST', url: 'user/ajax/bannerheadline_create', data: { 'bannerheadline_h1': bannerheadline_h1, 'bannerheadline_h2': bannerheadline_h2, 'bannerheadline_h3': bannerheadline_h3, 'bannerheadline_h3link': bannerheadline_h3link, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your headline has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.render(React.createElement(BannerHeadlineContainer, { url: '' }), document.getElementById('content-main'));
            } });
    }, handleBannerListingH1TextEntry: function handleBannerListingH1TextEntry(event) {
        this.setState({ bannerheadline_h1: event.target.value });
    }, handleBannerListingH2TextEntry: function handleBannerListingH2TextEntry(event) {
        this.setState({ bannerheadline_h2: event.target.value });
    }, handleBannerListingH3TextEntry: function handleBannerListingH3TextEntry(event) {
        this.setState({ bannerheadline_h3: event.target.value });
    }, handleBannerListingH3LinkTextEntry: function handleBannerListingH3LinkTextEntry(event) {
        this.setState({ bannerheadline_h3: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var bannerheadline_h1_defaulttext = this.state.bannerheadline_h1;var bannerheadline_h2_defaulttext = this.state.bannerheadline_h2;var bannerheadline_h3_defaulttext = this.state.bannerheadline_h3;var bannerheadline_h3_linkdefaulttext = this.state.bannerheadline_h3link;var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('p', null, 'You can use the same headline for multiple banner images. When you assign a headline to a banner image on a project, you can select a style setting (color, etc.) that matches the banner image beneath it. If you are using the same banner image on multiple projects (i.e., banner image X on projects A and B), you can assign different to headlines for the same banner image on each project. (Example: headline 1 on banner image X on project A, headline 2 on banner image X on project B).'), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'bannerheadline_h1_textinput' }, 'Headline 1:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h1_textinput', className: 'form-control', value: bannerheadline_h1_defaulttext, onChange: this.handleBannerListingH1TextEntry })), React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'bannerheadline_h2_textinput' }, 'Headline 2:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h2_textinput', className: 'form-control', value: bannerheadline_h2_defaulttext, onChange: this.handleBannerListingH2TextEntry })), React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'bannerheadline_h3_textinput' }, 'Call To Action:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h3_textinput', className: 'form-control', value: bannerheadline_h3_defaulttext, onChange: this.handleBannerListingH3TextEntry })), React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'bannerheadline_h3link_textinput' }, 'Call To Action Link:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('textarea', { id: 'bannerheadline_h3link_textinput', className: 'form-control', rows: '6', value: bannerheadline_h3_linkdefaulttext, onChange: this.handleBannerListingH3LinkTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitCreateNewBannerHeadline }, 'Create Headline'))));
    } });
'use strict';var BannerHeadlineContainer = React.createClass({ displayName: 'BannerHeadlineContainer', getInitialState: function getInitialState() {
        return { data: [] };
    }, componentDidMount: function componentDidMount() {
        this.getProps();
    }, getProps: function getProps() {
        $.ajax({ type: 'GET', url: 'user/ajax/get/get_user_bannerheadlines_all', data: {}, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);var uniqueresponse = parsedresponse.bannerheadlines;this.setState({ data: uniqueresponse }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });
    }, setStateFunction: function setStateFunction(childdata) {
        var bannerheadlineid = childdata.bannerheadline_id;var newdataarray = this.state.data;var elementPos = this.state.data.map(function (item) {
            return item.bannerheadline_id;
        }).indexOf(bannerheadlineid);newdataarray.splice(elementPos, 1);this.setState({ data: newdataarray }); //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
        //hiding component instead
        $('#headline-' + bannerheadlineid).hide();
    }, handleEditButton: function handleEditButton(childdata) {
        var bannerheadlineid = childdata.bannerheadline_id;var tempstatedata = this.state.data;this.setStateFunction(childdata);$.ajax({ type: 'POST', url: 'user/ajax/post/edit_current_bannerheadline', data: { 'bannerheadline_id': bannerheadlineid, 'bannerheadline_h1': childdata.bannerheadline_h1, 'bannerheadline_h2': childdata.bannerheadline_h2, 'bannerheadline_h3': childdata.bannerheadline_h3, 'bannerheadline_h3link': childdata.bannerheadline_h3link, _token: $_token }, error: (function (xhr, status, error) {
                var errortext = error;$('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html(errortext).addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);this.setState({ data: tempstatedata });$('#headline-' + bannerheadlineid).show();
            }).bind(this), success: (function (response) {
                //this.setStateFunction(childdata);
                this.getProps();$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html(response).addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
            }).bind(this) });
    }, handleDeleteButton: function handleDeleteButton(childdata) {
        var bannerheadlineid = childdata.bannerheadline_id;var tempstatedata = this.state.data;var r = confirm('Are you sure you want to delete this headline? This will remove the headline from all MusicLocal projects. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: 'user/ajax/post/delete_current_bannerheadline', //dataType: "text"
                data: { 'bannerheadline_id': bannerheadlineid, _token: $_token }, error: (function (xhr, status, error) {
                    if (xhr.status == 403) {
                        var errortext = 'This headline is in use on a project. To delete this headline, first remove it from all projects.';
                    } else {
                        var errortext = error;
                    }$('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html(errortext).addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);this.setState({ data: tempstatedata });$('#headline-' + bannerheadlineid).show();
                }).bind(this), success: (function (response) {
                    this.setStateFunction(childdata);$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html(response).addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
                }).bind(this) });
        }
    }, render: function render() {
        return React.createElement('div', null, React.createElement(BannerHeadlineList, { data: this.state.data, handleEditButton: this.handleEditButton, handleDeleteButton: this.handleDeleteButton }));
    } });var BannerHeadlineList = React.createClass({ displayName: 'BannerHeadlineList', handleEditButton: function handleEditButton(data) {
        this.props.handleEditButton(data);
    }, handleDeleteButton: function handleDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, render: function render() {
        var bannerheadlines = this.props.data.map((function (bannerheadline) {
            return React.createElement(CurrentBannerHeadline, { bannerheadline_h1: bannerheadline.bannerheadline_h1, bannerheadline_h2: bannerheadline.bannerheadline_h2, bannerheadline_h3: bannerheadline.bannerheadline_h3, bannerheadline_h3link: bannerheadline.bannerheadline_h3link, key: 'headline-' + bannerheadline.bannerheadline_id, bannerheadline_id: bannerheadline.bannerheadline_id, handleEditButton: this.handleEditButton, handleDeleteButton: this.handleDeleteButton });
        }).bind(this));return React.createElement('div', { className: 'row' }, bannerheadlines);
    } });var CurrentBannerHeadline = React.createClass({ displayName: 'CurrentBannerHeadline', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {}, handleModalDeleteButton: function handleModalDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bannerheadline_id: this.props.bannerheadline_id, bannerheadline_h1: this.props.bannerheadline_h1, bannerheadline_h2: this.props.bannerheadline_h2, bannerheadline_h3: this.props.bannerheadline_h3, bannerheadline_h3link: this.props.bannerheadline_h3link });
    }, handleEditButton: function handleEditButton(data) {
        this.props.handleEditButton(data);
    }, onClick: function onClick() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.render(React.createElement(BannerHeadlineModal, { bannerheadline_id: this.props.bannerheadline_id, bannerheadline_h1: this.props.bannerheadline_h1, bannerheadline_h2: this.props.bannerheadline_h2, bannerheadline_h3: this.props.bannerheadline_h3, bannerheadline_h3link: this.props.bannerheadline_h3link, key: 'modal' + this.props.bannerheadline_id, handleEditButton: this.handleEditButton, handleDeleteButton: this.handleModalDeleteButton }), document.getElementById('content-modal'));$('#content-main').hide(); //$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var btndivstyle = { textAlign: 'center' };var idstring = 'headline-' + this.props.bannerheadline_id;return React.createElement('div', { className: 'col-xs-12 col-sm-4', style: btndivstyle, id: idstring }, React.createElement('h1', null, this.props.bannerheadline_h1), React.createElement('h2', null, this.props.bannerheadline_h2), React.createElement('p', null, this.props.bannerheadline_h3), React.createElement('p', null, this.props.bannerheadline_h3link), React.createElement('div', { style: btndivstyle }, React.createElement('a', { className: 'btn btn-block btn-primary', onClick: this.onClick }, 'Edit Headline')), React.createElement('div', { style: btndivstyle }, React.createElement('a', { className: 'btn btn-block btn-warning', onClick: this.handleDeleteButton }, 'Delete Headline')), React.createElement('br', null));
    } });var BannerHeadlineModal = React.createClass({ displayName: 'BannerHeadlineModal', getInitialState: function getInitialState() {
        return { bannerheadline_h1: null, bannerheadline_h2: null, bannerheadline_h3: null, bannerheadline_h3link: null };
    }, componentDidMount: function componentDidMount() {
        this.setState({ bannerheadline_h1: this.props.bannerheadline_h1, bannerheadline_h2: this.props.bannerheadline_h2, bannerheadline_h3: this.props.bannerheadline_h3, bannerheadline_h3link: this.props.bannerheadline_h3link });
    }, handleClose: function handleClose() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bannerheadline_id: this.props.bannerheadline_id, bannerheadline_title: this.props.bannerheadline_title, bannerheadline_content: this.props.bannerheadline_content });
    }, submitEditBannerHeadline: function submitEditBannerHeadline() {
        this.props.handleEditButton({ bannerheadline_id: this.props.bannerheadline_id, bannerheadline_h1: this.state.bannerheadline_h1, bannerheadline_h2: this.state.bannerheadline_h2, bannerheadline_h3: this.state.bannerheadline_h3, bannerheadline_h3link: this.state.bannerheadline_h3link });
    }, handleBannerListingH1TextEntry: function handleBannerListingH1TextEntry(event) {
        this.setState({ bannerheadline_h1: event.target.value });
    }, handleBannerListingH2TextEntry: function handleBannerListingH2TextEntry(event) {
        this.setState({ bannerheadline_h2: event.target.value });
    }, handleBannerListingH3TextEntry: function handleBannerListingH3TextEntry(event) {
        this.setState({ bannerheadline_h3: event.target.value });
    }, handleBannerListingH3LinkTextEntry: function handleBannerListingH3LinkTextEntry(event) {
        this.setState({ bannerheadline_h3: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var bannerheadline_h1_defaulttext = this.state.bannerheadline_h1;var bannerheadline_h2_defaulttext = this.state.bannerheadline_h2;var bannerheadline_h3_defaulttext = this.state.bannerheadline_h3;var bannerheadline_h3_linkdefaulttext = this.state.bannerheadline_h3link;var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('p', null, 'You can use the same headline for multiple banner images. When you assign a headline to a banner image on a project, you can select a style setting (color, etc.) that matches the banner image beneath it. If you are using the same banner image on multiple projects (i.e., banner image X on projects A and B), you can assign different to headlines for the same banner image on each project. (Example: headline 1 on banner image X on project A, headline 2 on banner image X on project B).'), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-xs-12 col-sm-3 control-label', htmlFor: 'bannerheadline_h1_textinput' }, 'Headline 1:'), React.createElement('div', { className: 'col-xs-12 col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h1_textinput', className: 'form-control', value: bannerheadline_h1_defaulttext, onChange: this.handleBannerListingH1TextEntry })), React.createElement('label', { className: 'col-xs-12 col-sm-3 control-label', htmlFor: 'bannerheadline_h2_textinput' }, 'Headline 2:'), React.createElement('div', { className: 'col-xs-12 col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h2_textinput', className: 'form-control', value: bannerheadline_h2_defaulttext, onChange: this.handleBannerListingH2TextEntry })), React.createElement('label', { className: 'col-xs-12 col-sm-3 control-label', htmlFor: 'bannerheadline_h3_textinput' }, 'Call To Action:'), React.createElement('div', { className: 'col-xs-12 col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h3_textinput', className: 'form-control', value: bannerheadline_h3_defaulttext, onChange: this.handleBannerListingH3TextEntry })), React.createElement('label', { className: 'col-xs-12 col-sm-3 control-label', htmlFor: 'bannerheadline_h3link_textinput' }, 'Call To Action Link:'), React.createElement('div', { className: 'col-xs-12 col-sm-9' }, React.createElement('input', { type: 'text', id: 'bannerheadline_h3link_textinput', className: 'form-control', value: bannerheadline_h3_linkdefaulttext, onChange: this.handleBannerListingH3LinkTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { className: 'btn btn-primary', onClick: this.submitEditBannerHeadline }, 'Edit Headline'))));
    } });
'use strict';var BannerHeadlineMenu = React.createClass({ displayName: 'BannerHeadlineMenu', getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'BannerHeadlineContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'BannerHeadlineCreateContainer', mountlocation: 'content-main', active: false }] };
    }, componentDidMount: function componentDidMount() {
        this.setState({ links: [{ name: 'Manage', reactnodetomount: 'BannerHeadlineContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'BannerHeadlineCreateContainer', mountlocation: 'content-main', active: false }] });
    }, onLinkClick: function onLinkClick(data) {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();if (data == 'BannerHeadlineContainer') {
            ReactDOM.render(React.createElement(BannerHeadlineContainer, null), document.getElementById('content-main'));
        } else if (data == 'BannerHeadlineCreateContainer') {
            ReactDOM.render(React.createElement(BannerHeadlineCreateContainer, null), document.getElementById('content-main'));
        }
    }, componentWillUnmount: function componentWillUnmount() {
        $('#componentsbutton').removeClass('active');$('#componentschildtarget').html('').removeClass('active');
    }, render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(BannerHeadlineMenuLink, { name: link.name, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));var middlestyle = { paddingLeft: 0, paddingRight: 0 };return React.createElement('div', { className: 'row nopadding' }, React.createElement(CollectionsBackButton, null), React.createElement('div', { className: 'col-xs-8 col-sm-2', style: middlestyle }, links), React.createElement('div', null, React.createElement('br', null)));
    } });var BannerHeadlineMenuLink = React.createClass({ displayName: 'BannerHeadlineMenuLink', componentDidMount: function componentDidMount() {}, onLinkClick: function onLinkClick() {
        this.props.onLinkClick(this.props.reactnodetomount);
    }, render: function render() {
        var name = this.props.name;if (name == 'Create') {
            var buttonclass = 'btn btn-block btn-success';
        } else if (name == 'Manage') {
            var buttonclass = 'btn btn-block btn-primary';
        } else {
            var buttonclass = '';
        }return React.createElement('div', null, React.createElement('div', { className: '' }, React.createElement('a', { className: buttonclass, onClick: this.onLinkClick }, this.props.name)), React.createElement('div', { className: 'clearfix visible-sm-block visible-md-block visible-lg-block' }));
    } });
'use strict';var FullBannerCreationPanel = React.createClass({ displayName: 'FullBannerCreationPanel', getInitialState: function getInitialState() {
        return { data_uri: null, dimensions: { width: null, height: null }, aspectratio: 0.625 };
    }, handleSubmit: function handleSubmit(e) {
        //e.preventDefault();
        ReactDOM.render(React.createElement(FullImageOptionsFormBanner, { src: this.state.data_uri, dimensions: this.state.dimensions, aspectratio: this.state.aspectratio }), document.getElementById('content-modal'));$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your image has been loaded.').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
    }, handleFile: function handleFile(e) {
        $('#submitimagebutton').hide();$('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Loading your image...').addClass('alert-info').fadeIn(300).removeClass('hidden');var reader = new FileReader();var file = e.target.files[0];reader.readAsDataURL(file);reader.onload = (function (upload) {
            this.setState({ data_uri: upload.target.result });this.getDimensions();
        }).bind(this);
    }, componentDidUpdate: function componentDidUpdate() {}, getDimensions: function getDimensions() {
        var image = document.createElement('img');image.addEventListener('load', (function () {
            var w = image.width;var h = image.height;this.setState({ dimensions: { width: w, height: h } });$(image).remove(); //var e;
            this.checkDimensions();
        }).bind(this));image.src = this.state.data_uri;
    }, checkDimensions: function checkDimensions() {
        if (this.state.width < 1920) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error loading your photo.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);alert('The selected image is less than 1920 pixels wide. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        } else if (this.state.height < 720) {
            $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);alert('The selected image is less than 720 pixels tall. Using this image may result in poor quality on HD screens. Please select an image that is at least 1920 x 720.');
        } else {
            $('#submitimagebutton').show();
        }
    }, handleResolutionSelection: function handleResolutionSelection(event) {
        if (event.target.value == '16to6') {
            var ratio = 0.375;
        } else if (event.target.value == '16to10') {
            var ratio = 0.625;
        }this.setState({ aspectratio: ratio });
    }, render: function render() {
        var buttonstyle = { textAlign: 'center' }; //
        var submitbutton = { display: 'none' };return React.createElement('div', { className: 'container-fluid' }, React.createElement('form', { className: 'form-horizontal', onSubmit: this.handleSubmit, encType: 'multipart/form-data' }, React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('input', { type: 'file', className: 'form-control', onChange: this.handleFile, style: buttonstyle })), React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('div', { className: 'radio' }, React.createElement('label', null, React.createElement('input', { type: 'radio', className: 'radio', name: 'resolution', onChange: this.handleResolutionSelection, style: buttonstyle, value: '16to6' }), ' Banner'))), React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('div', { className: 'radio' }, React.createElement('label', null, React.createElement('input', { type: 'radio', className: 'radio', name: 'resolution', onChange: this.handleResolutionSelection, style: buttonstyle, value: '16to10', defaultChecked: true }), ' Background'))), React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('input', { className: 'form-control', id: 'submitimagebutton', style: submitbutton, type: 'submit', value: 'Submit' }))))));
    } });var FullImageOptionsFormBanner = React.createClass({ displayName: 'FullImageOptionsFormBanner', handleSubmit: function handleSubmit(event) {
        event.preventDefault();$('.flash').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Uploading your banner image to the server...<br>(This may take a few moments)').addClass('alert-info').fadeIn(300).removeClass('hidden');var canvas = document.getElementById('dragcanvas'); //var imagedata = canvas.toDataURL("image/jpeg", 1.0);
        var image_zoom = ReactDOM.findDOMNode(this.refs.image_zoom).value.trim() / 100;var paddingint = parseFloat($('#padding-div').css('padding'));var dragposition = $('#drag').position();var dragpositiontop = -dragposition.top;var dragpositionleft = -dragposition.left;var adjustpercentage = this.state.adjustpercentage;var adjustdragpositiontoplong = dragpositiontop / adjustpercentage;var adjustdragpositiontop = adjustdragpositiontoplong.toFixed();var adjustdragpositionleftlong = dragpositionleft / adjustpercentage;var adjustdragpositionleft = adjustdragpositionleftlong.toFixed();var credit = this.state.credit;var aspectratio = this.props.aspectratio;$.ajax({ type: 'POST', url: 'user/ajax/create_banner_full', data: { 'imagedata': this.props.src, 'adjustdragpositiontop': adjustdragpositiontop, 'adjustdragpositionleft': adjustdragpositionleft, 'image_zoom': image_zoom, 'credit': credit, 'aspectratio': aspectratio, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            }, success: function success(response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner image has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.render(React.createElement(BannersMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(BannerContainer, { url: '' }), document.getElementById('content-main'));$('#content-main').show();
            } });
    }, getInitialState: function getInitialState() {
        return { data: { image_zoom: 100 }, zoomeddimensions: { zoomedwidth: this.props.dimensions.width, zoomedheight: this.props.dimensions.height }, adjustpercentage: 100, adjustdimensions: { adjustwidth: this.props.dimensions.width, adjustheight: this.props.dimensions.height }, credit: null };
    }, handleChange1: function handleChange1() {
        this.setState({ data: { image_zoom: ReactDOM.findDOMNode(this.refs.image_zoom).value }, zoomeddimensions: { zoomedwidth: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01, zoomedheight: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01 } });
    }, handleSlider: function handleSlider() {
        var foo = (function () {
            this.handleChange1();
        }).bind(this);$(function () {
            $('#slider').slider({ value: 100, min: 1, max: 100, step: 1 });$('#slider').slider().bind({ slide: function slide(event, ui) {
                    $('#image_zoom').val(ui.value);foo();
                }, slidestop: function slidestop(event, ui) {
                    while ($('#drag').height() < $('#parentfordraggable').height() || $('#drag').width() < $('#parentfordraggable').width()) {
                        var old = $('#image_zoom').val();var oldint = parseInt(old);var newe = oldint + 1;$('#slider').slider('value', newe);$('#image_zoom').val(newe);foo();
                    }while ($('#drag').width() + $('#drag').position().left < $('#drag').parent().width()) {
                        var oldpos = $('#drag').position().left;var newpos = oldpos + 1;$('#drag').css({ left: newpos });
                    }while ($('#drag').height() + $('#drag').position().top < $('#drag').parent().height()) {
                        var oldposv = $('#drag').position().top;var newposv = oldposv + 1;$('#drag').css({ top: newposv });
                    }foo();
                } });$('#image_zoom').val($('#slider').slider('value'));
        });
    }, componentDidMount: function componentDidMount() {
        $('#drag').hide();this.handleSlider();$(window).resize((function () {
            this.containerResize();
        }).bind(this));$('#slider').slider('value', 2);$('#image_zoom').val(2);this.handleChange1(); //this.triggerSlidestop();
        setTimeout(function () {
            $('#drag').show(0, function () {
                $('#slider').trigger('slidestop');
            });
        }, 800);
    }, containerResize: function containerResize() {
        var dragcontainerwidthcheck = $('#drag-container').width();var dragcontainersetheightcheck = dragcontainerwidthcheck * this.props.aspectratio;var windowheight = window.innerHeight;if (dragcontainersetheightcheck > windowheight - 300) {
            var dragcontainersetheight = windowheight - 300;var dragcontainerwidth = dragcontainersetheight / this.props.aspectratio;
        } else {
            var dragcontainersetheight = dragcontainersetheightcheck;var dragcontainerwidth = dragcontainerwidthcheck;
        }$('#drag-container').width(dragcontainerwidth).height(dragcontainersetheight);$('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);var dragcontainerfullwidth = 1920;var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;this.setState({ adjustpercentage: adjustpercentage, adjustdimensions: { adjustwidth: dragcontainerwidth, adjustheight: dragcontainersetheight } });
    }, checkDimensions: function checkDimensions() {
        //this component used for dev purposes only, should contain console log commands but they were deleted
        var dragposition = $('#drag').position();var dragpositiontop = -dragposition.top;var dragpositionleft = -dragposition.left;var adjustpercentage = this.state.adjustpercentage;var adjustdragpositiontoplong = dragpositiontop / adjustpercentage;var adjustdragpositiontop = adjustdragpositiontoplong.toFixed();var adjustdragpositionleftlong = dragpositionleft / adjustpercentage;var adjustdragpositionleft = adjustdragpositionleftlong.toFixed();
    }, clearBannerAdjust: function clearBannerAdjust() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
    }, handleCreditTextEntry: function handleCreditTextEntry(event) {
        this.setState({ credit: event.target.value });
    }, render: function render() {
        var sliderdivstyle = { marginLeft: '1%', marginRight: '1%' };var modalstyle = { padding: 0, position: 'fixed', top: 0, bottom: 50, left: 0, right: 0, zIndex: 99999, textAlign: 'center', backgroundColor: '#c7c7c7' };var containerstyle = { padding: 0, width: this.state.adjustdimensions.adjustwidth };var clearbuttonstyle = { textAlign: 'center', paddingTop: 5 };var headerstyle = {};var creditdefaulttext = this.state.credit; //<div className="container-fluid" style={clearbuttonstyle}><a onClick={this.checkDimensions}>Check Dimensions</a></div>
        return React.createElement('div', { className: 'container-fluid', style: modalstyle }, React.createElement('div', { className: 'container-fluid', 'data-initialwidth': this.props.dimensions.width, 'data-initialheight': this.props.dimensions.height, style: containerstyle }, React.createElement('h4', { style: headerstyle }, 'Banner Preview'), React.createElement('p', null, React.createElement('em', null, 'Drag your image to position it. Use the slider to adjust zoom. To create your banner, press create.')), React.createElement('p', null, 'Note: background images are cropped to a 16:10 aspect ratio. On many screens (i.e., a standard HD screen with a 16:9 aspect ratio), portions of the image may not be visible--so crop your image accordingly! To help you get the best display for images that have important content on certain edges of the image, you can decide how to center a background image (horizontal left/center/right, vertical top/center/bottom) when you assign it to a section of a project.'), React.createElement(FullImageAdjustPanelBanner, { data: this.state.data, aspectratio: this.props.aspectratio, src: this.props.src, adjustpercentage: this.state.adjustpercentage, zoomeddimensions: this.state.zoomeddimensions, ref: this.containerResize })), React.createElement('div', { className: 'container-fluid', style: containerstyle }, React.createElement('div', { id: 'slider', style: sliderdivstyle })), React.createElement('div', { className: 'container-fluid', style: containerstyle }, React.createElement('form', { className: 'form-horizontal', id: 'myForm', onSubmit: this.handleSubmit }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'credittextinput' }, 'Add watermark text (lower-left corner)'), React.createElement('div', { className: 'col-sm-6' }, React.createElement('input', { type: 'text', id: 'credittextinput', className: 'form-control', value: creditdefaulttext, onChange: this.handleCreditTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('input', { className: 'form-control', type: 'submit', value: 'Create' }))), React.createElement('div', { className: 'form-group' }, React.createElement('input', { className: 'form-control', type: 'hidden', ref: 'image_zoom', id: 'image_zoom', name: 'image_zoom', onChange: this.handleChange1 })))), React.createElement('div', { className: 'container-fluid', style: containerstyle }), React.createElement('div', { className: 'container-fluid', style: clearbuttonstyle }, React.createElement('a', { onClick: this.clearBannerAdjust }, 'Clear + hide banner adjustment menu')));
    } });var FullImageAdjustPanelBanner = React.createClass({ displayName: 'FullImageAdjustPanelBanner', render: function render() {
        var windowheight = window.innerHeight;var setmaxwidth = windowheight / this.props.aspectratio;var containerStyle = { position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block', textAlign: 'center' };var dragcontainerstyle = { position: 'relative', width: '100%', maxWidth: 1920, overflow: 'hidden', margin: 'auto' };var dragstyle2 = { position: 'absolute', top: 0, left: 0 };return React.createElement('div', { style: containerStyle, id: 'padding-div' }, React.createElement('div', { style: dragcontainerstyle, id: 'drag-container' }, React.createElement('div', { style: dragstyle2, id: 'parentfordraggable' }, React.createElement(FullDragDivBanner, { src: this.props.src, zoomeddimensions: this.props.zoomeddimensions, adjustpercentage: this.props.adjustpercentage }))));
    } });var FullDragDivBanner = React.createClass({ displayName: 'FullDragDivBanner', componentDidMount: function componentDidMount() {
        this.dragFunction();$(window).resize(function () {
            var timefunction;stopFunction();startFunction();function stopFunction() {
                clearTimeout(timefunction);
            }function startFunction() {
                timefunction = setTimeout(function () {
                    var pos = $('#drag').position();var h = -($('#drag').outerHeight() - $('#drag').parent().outerHeight());if (pos.top >= 0) {
                        $('#drag').animate({ top: 0 });
                    } else if (pos.top <= h) {
                        $('#drag').animate({ top: h });
                    }var v = -($('#drag').outerWidth() - $('#drag').parent().outerWidth());if (pos.left >= 0) {
                        $('#drag').animate({ left: 0 });
                    } else if (pos.left <= v) {
                        $('#drag').animate({ left: v });
                    }
                }, 600);
            }
        });
    }, dragFunction: function dragFunction() {
        $('#drag').draggable({ stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;var h = -(hel.outerHeight() - $(hel).parent().outerHeight());if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }var v = -(hel.outerWidth() - $(hel).parent().outerWidth());if (pos.left >= 0) {
                    hel.animate({ left: 0 });
                } else if (pos.left <= v) {
                    hel.animate({ left: v });
                }
            } });
    }, handleTouchEnd: function handleTouchEnd() {
        //Solves problem on iPhone where overflow:hidden sections of image are not draggable; do not remove!!!
        $('#drag').draggable({ stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position;var h = -(hel.outerHeight() - $(hel).parent().outerHeight());if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }var v = -(hel.outerWidth() - $(hel).parent().outerWidth());if (pos.left >= 0) {
                    hel.animate({ left: 0 });hel.animate({ left: 0 });
                } else if (pos.left <= v) {
                    hel.animate({ left: v });
                }
            } });
    }, render: function render() {
        var adjustedwidth = this.props.zoomeddimensions.zoomedwidth * this.props.adjustpercentage;var adjustedheight = this.props.zoomeddimensions.zoomedheight * this.props.adjustpercentage;var dragdivstyle = { display: 'inline-block', width: adjustedwidth, height: adjustedheight };var canvasstyle = { display: 'inline-block', width: adjustedwidth, height: adjustedheight, cursor: 'move' };return React.createElement('div', { id: 'drag', style: dragdivstyle, onTouchEnd: this.handleTouchEnd }, React.createElement('img', { src: this.props.src, id: 'dragcanvas', ref: 'dragcanvas', style: canvasstyle }));
    } });
/*
var renderreact = function(dataarray, pagination, getnextresultslink){
ReactDOM.render(<PhotoContainer data={dataarray} data1={pagination} data2={getnextresultslink}/>, document.getElementById('content-main'));
};*/'use strict';var BannerCreateContainer = React.createClass({ displayName: 'BannerCreateContainer', getInitialState: function getInitialState() {
        return { data: [], data1: [], data2: [] };
    }, updateDimensions: function updateDimensions() {
        //var cont = ReactDOM.findDOMNode(this.refs.fbphotodisplay);
        var top = $('#fbphotodisplay').scrollTop();var height = $('#fbphotodisplay').scrollHeight;var postop = $('#content-main').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var visiblecontainerheight = $('#fbphotodisplay').height();var heightpastvisiblecontainer = height - visiblecontainerheight;var innerh = $(window).height();this.setState({ postop: postop, height: height, endofcontainer: endofcontainer, visiblecontainerheight: visiblecontainerheight, heightpastvisiblecontainer: heightpastvisiblecontainer, top: top, innerh: innerh });
    }, componentDidMount: function componentDidMount() {
        window.addEventListener('resize', this.updateDimensions); //var cont = ReactDOM.findDOMNode(this.refs.fbphotodisplay);
        var postop = $('#content-main').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var height = $('#fbphotodisplay').scrollHeight;var visiblecontainerheight = $('#fbphotodisplay').height();var heightpastvisiblecontainer = height - visiblecontainerheight;$(document).ready((function () {
            this.getPhotosFromFacebook();
        }).bind(this));
    }, getPhotosFromFacebook: function getPhotosFromFacebook(paginationclick, dataarray) {
        $.ajaxSetup({ cache: true });$.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({ appId: '1618708688367645', version: 'v2.3', cookie: true });FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    if (paginationclick === undefined) {
                        FB.api('/me/photos', 'get', { limit: 24, fields: 'images, id, created_time, from, tags' }, function (response) {
                            handleresponse(response, dataarray);
                        });
                    } else {
                        $.get(paginationclick, function (response) {
                            handleresponse(response, dataarray);
                        });
                    }var handleresponse = (function (response, dataarray) {
                        if (dataarray === undefined) {
                            var dataarray = [];
                        } else {}$.each(response.data, function () {
                            //dataarray.push({id:this.id, from_name:this.from.name, from_id:this.from.id, fb_created_time:this.created_time, link0:this.images[0].source, link1:this.images[1].source, link2:this.images[2].source, link3:this.images[3].source, link4:this.images[4].source, link5:this.images[5].source, link6:this.images[6].source, nextresult:this.tags.paging.cursors.after});
                            try {
                                dataarray.push({ id: this.id, from_name: this.from.name, from_id: this.from.id, fb_created_time: this.created_time, link0: this.images[0].source, link3: this.images[3].source, nextresult: this.tags.paging.cursors.after });
                            } catch (err) {
                                console.log('An image was not displayed due to an error getting the picture.');
                            }
                        });var getnextresultslink = response.paging.next;var pagination = [];if (response.paging.previous) {
                            pagination.push({ label: 'Previous', id: 'previousfbphotobutton', link: response.paging.previous });
                        }pagination.push({ label: 'Next', id: 'nextfbphotobutton', link: response.paging.next });renderreact(dataarray, pagination, getnextresultslink);
                    }).bind(this);
                } else {
                    console.log('not logged in');
                }
            });
        });var renderreact = (function (dataarray, pagination, getnextresultslink) {
            this.setState({ data: dataarray, data1: pagination, data2: getnextresultslink });
        }).bind(this);
    }, handleScroll: function handleScroll() {
        var cont = ReactDOM.findDOMNode(this.refs.fbphotodisplay);var top = $('#fbphotodisplay').scrollTop();var height = cont.scrollHeight;var postop = $('#content-main').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var visiblecontainerheight = $('#fbphotodisplay').height();var heightpastvisiblecontainer = height - visiblecontainerheight;var dataarray = this.state.data;var paginationclick = this.state.data2;var i = 0;if (top > heightpastvisiblecontainer - visiblecontainerheight && i < 1) {
            i++;this.getPhotosFromFacebook(paginationclick, dataarray);
        }
    }, render: function render() {
        var innerh = $(window).height();var postop = $('#content-main').offset().top;var containerstyle = { padding: 0 };var endofcontainerstyle = { padding: 0 };var facebookphotodisplaystyle = { height: innerh - postop - 80, overflow: 'auto' };var style1 = { padding: 5 };var style2 = { textAlign: 'center' };return React.createElement('div', null, React.createElement('div', { id: 'createnewbanner' }, React.createElement('div', { className: 'col-sm-12 nopadding', id: 'instructions' }, React.createElement('div', { style: style2 }, React.createElement('h3', null, 'To begin making a banner, click on one of your photos.'), React.createElement('p', null, React.createElement('em', null, 'To assign existing banners to projects, visit your projects page.')))), React.createElement('div', { id: 'testcontainer4' })), React.createElement('div', { id: 'testcontainer3' }), React.createElement('div', { className: 'col-sm-12', style: containerstyle }, React.createElement('div', { id: 'fbphotodisplay', ref: 'fbphotodisplay', style: facebookphotodisplaystyle, onScroll: this.handleScroll }, React.createElement(PhotoBannerList, { data: this.state.data }))), React.createElement('div', { className: 'col-sm-12', style: endofcontainerstyle }, React.createElement('div', { id: 'endofcontainer' })));
    } });var PhotoBannerList = React.createClass({ displayName: 'PhotoBannerList', render: function render() {
        var photos = this.props.data.map(function (photo) {
            return React.createElement(CurrentPhotoBanner, { link0: photo.link0, link3: photo.link3, key: photo.id, id: photo.id, from_name: photo.from_name, from_id: photo.from_id, fb_created_time: photo.fb_created_time });
        });var imgcontstyle = {};return React.createElement('div', { className: 'grid', id: 'get-user-photos-from-facebook' }, React.createElement('div', { className: 'grid-sizer' }), React.createElement('div', { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', style: imgcontstyle }, photos));
    } });var CurrentPhotoBanner = React.createClass({ displayName: 'CurrentPhotoBanner', onClick: function onClick() {
        var facebookphoto_identifier = this.props.id;var facebookphoto_link0 = this.props.link0;var from_name = this.props.from_name;var from_id = this.props.from_id;var fb_created_time = this.props.fb_created_time;var fbphotoscrollcontaineroriginalheight = $('#fbphotodisplay').height(); //console.log(fbphotoscrollcontaineroriginalheight);
        var result = { photoidentifier: facebookphoto_identifier, adjustid: 0, src: facebookphoto_link0 };var dimensions = { from_name: from_name, from_id: from_id, width: 960, height: 640 };ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').hide();ReactDOM.render(React.createElement(BannerCreationPanel, { response: result, dimensions: dimensions }), document.getElementById('content-modal'));$('#instructions').hide();$('html, body').animate({ scrollTop: 0 }, 355);var height = $('#fbphotodisplay').scrollHeight;var postop = $('#content-main').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var visiblecontainerheight = $('#fbphotodisplay').height();var innerh = $(window).height();$('#fbphotodisplay').css({ height: innerh - postop - 80 });
    }, render: function render() {
        var photostyle = { padding: '0.25%' };return React.createElement('img', { className: 'grid-item grid-item--width3', style: photostyle, onClick: this.onClick, src: this.props.link3, 'data-link0': this.props.link0, id: this.props.id, 'data-fromid': this.props.from_id, 'data-from_name': this.props.from_name, 'data-fb_created_time': this.props.fb_created_time });
    } });var BannerCreationPanel = React.createClass({ displayName: 'BannerCreationPanel', render: function render() {
        return React.createElement('div', null, React.createElement(ImageOptionsFormBanner, { response: this.props.response, dimensions: this.props.dimensions }));
    } });var ImageAdjustOptionsBanner = React.createClass({ displayName: 'ImageAdjustOptionsBanner', render: function render() {
        var adjustedthumbs = this.props.adjustedthumbs.map(function (adjustedthumb) {
            return React.createElement(ImageAdjustThumbButtonBanner, { src: adjustedthumb.src.encoded, adjustid: adjustedthumb.adjustid, key: adjustedthumb.adjustid });
        });var adjustbuttoncontainerstyle = { padding: 5 };var containerstyle = { padding: 0 };return React.createElement('div', { className: 'col-sm-12', style: containerstyle }, React.createElement('div', { id: 'adjustbuttons', style: adjustbuttoncontainerstyle, className: 'row' }, adjustedthumbs));
    } });var ImageAdjustThumbButtonBanner = React.createClass({ displayName: 'ImageAdjustThumbButtonBanner', componentDidMount: function componentDidMount() {
        $('.submit-adjust').click(function ($e) {
            $e.preventDefault();$('.bannerimage').hide();$('.bannerimage[data-adjustid=' + $(this).data('adjustid') + ']').show();
        });
    }, render: function render() {
        var thumbcontainer = { padding: 3 };return React.createElement('div', { className: 'col-sm-2 col-xs-4', style: thumbcontainer }, React.createElement('img', { className: 'img img-responsive submit-adjust', src: this.props.src, 'data-adjustid': this.props.adjustid }));
    } });var ImageOptionsFormBanner = React.createClass({ displayName: 'ImageOptionsFormBanner', cropPhoto: function cropPhoto() {
        //var imagedata = '';
        var dragposition = $('#drag').position();var dragpositiontop = -dragposition.top;Caman('#dragcanvas', function () {
            this.crop(960, 355, 0, dragpositiontop);this.render();
        });
    }, handleSubmit: function handleSubmit(event) {
        event.preventDefault();$('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-danger').html('Please do not leave this page!<br>Creating your new banner image...').addClass('alert-info').fadeIn(300).removeClass('hidden');var from_name_node = ReactDOM.findDOMNode(this.refs.from_name).checked;if (from_name_node == false) {} else if (from_name_node == true) {
            var from_name = ReactDOM.findDOMNode(this.refs.from_name).value.trim();
        }var canvas = document.getElementById('dragcanvas');console.log(canvas);var imagedata = canvas.toDataURL('image/jpeg', 1);var image_zoom = ReactDOM.findDOMNode(this.refs.image_zoom).value.trim();var paddingint = parseFloat($('#padding-div').css('padding'));var dragposition = $('#drag').position();var dragpositiontop = -dragposition.top;$.ajax({ type: 'POST', url: 'user/ajax/post/user_bannercropreact', data: { //"facebookphoto_identifier": facebookphoto_identifier,
                'imagedata': imagedata, 'dragpositiontop': dragpositiontop, 'from_name': from_name, 'image_zoom': image_zoom, 'paddingint': paddingint, //"from_id": from_id,
                //"fb_created_time": fb_created_time,
                _token: $_token }, error: function error() {
                $('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error generating adjustments for the photo.<br>Please try again in a few minutes.').addClass('alert-danger').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            }, success: function success(response) {
                $('#modalcontent').html('<img class="img img-responsive" src="//d1y0bevpkkhybk.cloudfront.net/c/' + response + '.jpg"/>' + '<div style="display:block;text-align:center"><br>' + '<p><em>To save your banner image, right click on the banner and select "save image as..."</em><br>To view all of your banner images, go to <a href="">your banner management page</a>.</p></div>');$('#myModal').modal();$('.banneradjustsettingssubmitted').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner image has been created!').addClass('alert-success').fadeIn(355).removeClass('hidden').delay(3550).fadeOut(355);
            } });ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();return;
    }, getInitialState: function getInitialState() {
        return { data: { performer_name: '', performer_name_extra: '', venue_name: '', venue_name_prefix: 'at', event_startweekday: 'Fri.', event_startmonth: '7', event_startday: '7', event_starthour: '7', event_startminute: '00', event_startampm: 'pm', image_zoom: 100, font_size: 30, font_color: '#ffffff' }, zoomeddimensions: { zoomedwidth: this.props.dimensions.width, zoomedheight: this.props.dimensions.height }, checkboxstate: { is_from_name_checked: true }, image: { src: this.props.response.src } };
    }, componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ data: { image_zoom: ReactDOM.findDOMNode(this.refs.image_zoom).value, font_size: 30, font_stroke_size: '40px', font_color: '#ffffff', font_face: 'Roboto Condensed' }, zoomeddimensions: { zoomedwidth: ReactDOM.findDOMNode(this.refs.image_zoom).value * nextProps.dimensions.width * 0.01, zoomedheight: ReactDOM.findDOMNode(this.refs.image_zoom).value * nextProps.dimensions.height * 0.01 }, checkboxstate: { is_from_name_checked: this.state.checkboxstate.is_from_name_checked }, image: { src: this.props.response.src } });
    }, componentDidUpdate: function componentDidUpdate() {
        var c = document.getElementById('dragcanvas');var ctx = c.getContext('2d');ctx.clearRect(0, 0, 2000, 2000);var thephoto = new Image();thephoto.crossOrigin = 'Anonymous';$(thephoto).attr('data-caman-hidpi-disabled', '');thephoto.src = this.props.response.src;thephoto.addEventListener('load', function () {
            var transformratio = 960 / thephoto.width;var newphotoheight = thephoto.height * transformratio;ctx.drawImage(thephoto, 0, 0, 960, newphotoheight);
        }, false);
    }, handleChange1: function handleChange1() {
        this.setState({ data: { image_zoom: ReactDOM.findDOMNode(this.refs.image_zoom).value, font_size: 36, font_stroke_size: '40px', font_color: '#ffffff', font_face: 'Roboto Condensed' }, zoomeddimensions: { zoomedwidth: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01, zoomedheight: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01 }, checkboxstate: { is_from_name_checked: this.state.checkboxstate.is_from_name_checked } });
    }, handleSlider: function handleSlider() {
        $(function () {
            $('#slider').slider({ value: 100, min: 1, max: 100, step: 1, slide: function slide(event, ui) {
                    $('#image_zoom').val(ui.value);foo();
                }, stop: function stop(event, ui) {
                    //console.log($('#drag').position().left + ';ALSKJDal;skjdL;ASKJDK;shfklhfkl;DSDJHFSJDHFSKN;LASKJDal;kdja;sldjsl;dhgfjhsd;klfjaskljklfdjghfdlkghs;dlkfjs;dlkfj');
                    while ($('#drag').height() < $('#parentfordraggable').height() || $('#drag').width() < $('#parentfordraggable').width()) {
                        var old = $('#image_zoom').val();var oldint = parseInt(old); //console.log('old is ' + oldint);
                        //console.log(typeof(oldint));
                        var newe = oldint + 1; //console.log('newe is ' + newe);
                        $('#slider').slider('value', newe);$('#image_zoom').val(newe);foo();
                    }while ($('#drag').width() + $('#drag').position().left < $('#drag').parent().width()) {
                        var oldpos = $('#drag').position().left; //console.log('oldpos is ' + oldpos);
                        var newpos = oldpos + 1; //console.log('newpos is ' + newpos);
                        $('#drag').css({ left: newpos }); //foo();
                    }while ($('#drag').height() + $('#drag').position().top < $('#drag').parent().height()) {
                        var oldposv = $('#drag').position().top; //console.log('oldpos is ' + oldposv);
                        var newposv = oldposv + 1; //console.log('newpos is ' + newposv);
                        $('#drag').css({ top: newposv }); //foo();
                    }foo();
                } });$('#image_zoom').val($('#slider').slider('value'));
        });var foo = (function () {
            this.handleChange1();
        }).bind(this);var bar = (function () {
            while ($('#drag').height() < $('#parentfordraggable').height()) {
                //console.log('foo');
                var incrementer = this.state.data.image_zoom++;this.setState({ data: { performer_name: ReactDOM.findDOMNode(this.refs.project_name).value, performer_name_extra: ReactDOM.findDOMNode(this.refs.project_name_extra).value, venue_name: ReactDOM.findDOMNode(this.refs.venue_name).value, venue_name_prefix: ReactDOM.findDOMNode(this.refs.venue_name_prefix).value, event_startweekday: ReactDOM.findDOMNode(this.refs.event_startweekday).value, event_startmonth: ReactDOM.findDOMNode(this.refs.event_startmonth).value, event_startday: ReactDOM.findDOMNode(this.refs.event_startday).value, event_starthour: ReactDOM.findDOMNode(this.refs.event_starthour).value, event_startminute: ReactDOM.findDOMNode(this.refs.event_startminute).value, event_startampm: ReactDOM.findDOMNode(this.refs.event_startampm).value, image_zoom: ReactDOM.findDOMNode(this.refs.image_zoom).value, font_stroke_size: '40px', font_color: '#ffffff', font_face: 'Roboto Condensed' }, zoomeddimensions: { zoomedwidth: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.width * 0.01, zoomedheight: ReactDOM.findDOMNode(this.refs.image_zoom).value * this.props.dimensions.height * 0.01 }, checkboxstate: { is_from_name_checked: this.state.checkboxstate.is_from_name_checked } });
            }
        }).bind(this);
    }, componentDidMount: function componentDidMount() {
        this.handleSlider();
    }, adjustPrep: function adjustPrep() {
        var c = document.getElementById('dragcanvas');var ctx = c.getContext('2d');ctx.clearRect(0, 0, 2000, 2000);var thephoto = new Image();thephoto.crossOrigin = 'Anonymous';$(thephoto).attr('data-caman-hidpi-disabled', '');thephoto.src = this.state.image.src; //console.log('heresdfsd');
        //console.log(thephoto);
        thephoto.addEventListener('load', function () {
            var transformratio = 960 / thephoto.width;var newphotoheight = thephoto.height * transformratio;ctx.drawImage(thephoto, 0, 0, 960, newphotoheight);
        }, false);return thephoto;
    }, onAdjustOriginal: function onAdjustOriginal() {
        var thephoto = null;this.adjustPrep();
    }, onAdjustGreyscale: function onAdjustGreyscale() {
        var thephoto = null;this.adjustPrep();Caman('#dragcanvas', thephoto, function () {
            this.revert();this.greyscale();this.render();
        });
    }, onAdjustVintage: function onAdjustVintage() {
        var thephoto = null;this.adjustPrep();Caman('#dragcanvas', thephoto, function () {
            this.revert();this.greyscale();this.contrast(5);this.noise(3);this.sepia(100);this.channels({ red: 8, blue: 2, green: 4 });this.gamma(0.87);this.render();
        });
    }, onAdjustLomo: function onAdjustLomo() {
        var thephoto = null;this.adjustPrep();Caman('#dragcanvas', thephoto, function () {
            this.revert();this.brightness(15);this.exposure(15);this.curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255]);this.saturation(-20);this.gamma(1.8);this.render();
        });
    }, onAdjustClarity: function onAdjustClarity() {
        var thephoto = null;this.adjustPrep();Caman('#dragcanvas', thephoto, function () {
            this.revert();this.vibrance(20);this.curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255]);this.sharpen(15);this.vignette('45%', 20);this.render();
        });
    }, onAdjustSinCity: function onAdjustSinCity() {
        var thephoto = null;this.adjustPrep();Caman('#dragcanvas', thephoto, function () {
            this.revert();this.contrast(100);this.brightness(15);this.exposure(10);this.posterize(80);this.clip(30);this.greyscale();this.render();
        });
    }, onAdjustLove: function onAdjustLove() {
        var thephoto = null;this.adjustPrep();Caman('#dragcanvas', thephoto, function () {
            this.revert();this.brightness(5);this.exposure(8);this.contrast(4);this.colorize('#c42007', 30);this.vibrance(50);this.gamma(1.3);this.render();
        });
    }, onAdjustNostalgia: function onAdjustNostalgia() {
        var thephoto = null;this.adjustPrep();Caman('#dragcanvas', thephoto, function () {
            this.revert();this.saturation(20);this.gamma(1.4);this.greyscale();this.contrast(5);this.sepia(100);this.channels({ red: 8, blue: 2, green: 4 });this.gamma(0.8);this.contrast(5);this.exposure(10);this.newLayer(function () {
                this.setBlendingMode('overlay');this.copyParent();this.opacity(55);this.filter.stackBlur(10);
            });this.vignette('50%', 30);this.render();
        });
    }, handleCheckedChange: function handleCheckedChange() {
        this.setState({ checkboxstate: { is_from_name_checked: !this.state.checkboxstate.is_from_name_checked } }); //this.forceUpdate();
    }, clearBannerAdjust: function clearBannerAdjust() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show(); //var top = $('#fbphotodisplay').scrollTop();
        var height = $('#fbphotodisplay').scrollHeight;var postop = $('#content-main').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var visiblecontainerheight = $('#fbphotodisplay').height(); //var heightpastvisiblecontainer = height - visiblecontainerheight;
        var innerh = $(window).height();$('#fbphotodisplay').css({ height: innerh - postop - 80 });
    }, render: function render() {
        var sliderstyle = { marginLeft: 0, marginRight: 0 };var containerstyle = { padding: 0 };console.log('the checkbox state is:');console.log(this.state.checkboxstate.is_from_name_checked);var clearbuttonstyle = { textAlign: 'center', paddingTop: 5 };var headerstyle = { paddingTop: 0, marginTop: -15 };return React.createElement('div', null, React.createElement('div', { className: 'col-sm-12', 'data-initialwidth': this.props.dimensions.width, 'data-initialheight': this.props.dimensions.height, style: containerstyle }, React.createElement('h4', { style: headerstyle }, 'Banner Preview'), React.createElement('p', null, React.createElement('em', null, 'To view and approve your final version, press submit. Note: on screens smaller than 960 pixels in width, preview will not reflect final product.')), React.createElement('p', null, this.state.checkboxstate.is_from_name_checked), React.createElement(ImageAdjustPanelBanner, { checkbox: this.state.checkboxstate, data: this.state.data, response: this.props.response, zoomeddimensions: this.state.zoomeddimensions, dimensions: this.props.dimensions })), React.createElement('div', { className: 'col-sm-12', style: containerstyle }, React.createElement('form', { className: 'form-horizontal', id: 'myForm', onSubmit: this.handleSubmit }, React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('div', { className: 'checkbox' }, React.createElement('label', null, React.createElement('input', { type: 'checkbox', ref: 'from_name', name: 'from_name', id: 'from_name', value: this.props.dimensions.from_name, 'data-checked': this.state.checkboxstate.is_from_name_checked, defaultChecked: true, onChange: this.handleCheckedChange }), 'Credit ', this.props.dimensions.from_name)))), React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-4 col-xs-offset-4' }, React.createElement('input', { className: 'form-control', type: 'submit', value: 'Create' }))), React.createElement('div', { className: 'form-group' }, React.createElement('input', { className: 'form-control', type: 'hidden', ref: 'image_zoom', id: 'image_zoom', name: 'image_zoom', onChange: this.handleChange1 })))), React.createElement('div', { className: 'col-sm-12', style: containerstyle }, React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustOriginal }, 'Original'), React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustGreyscale }, 'Greyscale'), React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustVintage }, 'Vintage'), React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustLomo }, 'Lomo'), React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustClarity }, 'Clarity'), React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustSinCity }, 'Sin City'), React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustLove }, 'Love'), React.createElement('div', { className: 'btn btn-default', onClick: this.onAdjustNostalgia }, 'Nostalgia')), React.createElement('div', { className: 'col-sm-12', style: clearbuttonstyle }, React.createElement('a', { onClick: this.clearBannerAdjust }, 'Clear + hide banner adjustment menu')));
    } });var ImageAdjustPanelBanner = React.createClass({ displayName: 'ImageAdjustPanelBanner', getInitialState: function getInitialState() {
        return { sizing: {}, hidden: {} };
    }, componentDidMount: function componentDidMount() {
        this.containerResize(); //console.log(adjustpercentage);
        $(window).resize((function () {
            this.containerResize();
        }).bind(this));
    }, containerResize: function containerResize() {
        var dragcontainerwidth = $('#drag-container').width(); //console.log('dragcontainer width is ' + dragcontainerwidth);
        var dragcontainersetheight = dragcontainerwidth * 0.37;$('#drag-container').height(dragcontainersetheight);$('#parentfordraggable').width(dragcontainerwidth).height(dragcontainersetheight);var dragcontainerfullwidth = 960;var adjustpercentage = dragcontainerwidth / dragcontainerfullwidth;this.textResize(adjustpercentage);
    }, textResize: function textResize(adjustpercentage) {
        this.setState({ sizing: {} });
    }, componentDidUpdate: function componentDidUpdate() {
        //console.log('component updated');
        var thetext = ReactDOM.findDOMNode(this.refs.from_name_text); //console.log(thetext);
        if (this.props.checkbox.is_from_name_checked == false) {
            //console.log('foundfalse');
            $('#from_name_text').hide();$('#line_text').hide();
        }if (this.props.checkbox.is_from_name_checked == true) {
            //console.log('foundfalse');
            $('#from_name_text').show();$('#line_text').show();
        }
    }, render: function render() {
        //console.log('adjustpanel initial dimensions are ' + this.props.dimensions.width + 'x' + this.props.dimensions.height);
        //console.log('adjustpanel zoomed dimensions are ' + this.props.zoomeddimensions.zoomedwidth + 'x' + this.props.zoomeddimensions.zoomedheight);
        var containerStyle = { position: 'relative', width: '100%', height: '100%', padding: 0, display: 'inline-block' };var dragcontainerstyle = { position: 'relative', width: '100%', maxWidth: 960, overflow: 'hidden' };var fromname = { display: 'inline-block', position: 'absolute', top: 312, left: 5, zIndex: 10, pointerEvents: 'none', fontSize: 16, color: this.props.data.font_color, fontFamily: 'vladimir_script', textShadow: '1px 1px 4px #000000' }; //var fromname = {display: 'inline-block', position: 'relative', cssFloat: 'left'};
        var musiclocalname = { display: 'inline-block', position: 'absolute', top: 334, left: 5, zIndex: 10, pointerEvents: 'none', fontSize: 12, color: this.props.data.font_color, fontFamily: 'Open Sans', fontStyle: 'italic', paddingRight: 10, textShadow: '1px 1px 4px #000000' };var line = { display: 'inline-block', position: 'absolute', top: 334, left: 5, zIndex: 10, pointerEvents: 'none', borderTop: '1px solid #ffffff', width: 145 };var dragstyle2 = { position: 'absolute', top: 0, left: 0 };return React.createElement('div', { style: containerStyle, id: 'padding-div' }, React.createElement('div', { style: dragcontainerstyle, id: 'drag-container' }, React.createElement('div', { style: fromname, ref: 'from_name_text', id: 'from_name_text' }, 'Original by ', this.props.dimensions.from_name, ' '), React.createElement('div', { style: line, ref: 'line_text', id: 'line_text' }), React.createElement('div', { style: musiclocalname }, 'created with musiclocal'), React.createElement('div', { style: dragstyle2, id: 'parentfordraggable' }, React.createElement(DragDivBanner, { data: this.props.data, response: this.props.response, zoomeddimensions: this.props.zoomeddimensions, dimensions: this.props.dimensions }))));
    } });var DragDivBanner = React.createClass({ displayName: 'DragDivBanner', componentDidMount: function componentDidMount() {
        $('#drag').draggable({ stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position; //horizontal
                //console.log('draggable pos is ' + pos);
                var h = -(hel.outerHeight() - $(hel).parent().outerHeight());if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    //deleted to edit for absolute positioning
                    hel.animate({ top: h }); //deleted to edit for absolute positioning
                    //} else if (pos.top <= 0) {
                    //    hel.animate({ top: 0 });
                } // vertical
                var v = -(hel.outerWidth() - $(hel).parent().outerWidth()); //var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
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
            } }); /*
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
                     */var c = document.getElementById('dragcanvas');var ctx = c.getContext('2d');ctx.clearRect(0, 0, 2000, 2000);var thephoto = new Image();var canvasnode = ReactDOM.findDOMNode(this.refs.dragcanvas);thephoto.crossOrigin = 'Anonymous';$(thephoto).attr('data-caman-hidpi-disabled', '');thephoto.src = this.props.response.src;thephoto.addEventListener('load', function (canvasnode) {
            var transformratio = 960 / thephoto.width;var newphotoheight = thephoto.height * transformratio;ctx.drawImage(thephoto, 0, 0, 960, newphotoheight);
        }, false);
    }, componentDidUpdate: function componentDidUpdate() {}, handleTouchEnd: function handleTouchEnd() {
        //Solves problem on iPhone where overflow:hidden sections of image are not draggable; do not remove!!!
        $('#drag').draggable({ stop: function stop(ev, ui) {
                var hel = ui.helper,
                    pos = ui.position; //horizontal
                var h = -(hel.outerHeight() - $(hel).parent().outerHeight());if (pos.top >= 0) {
                    hel.animate({ top: 0 });
                } else if (pos.top <= h) {
                    hel.animate({ top: h });
                }var v = -(hel.outerWidth() - $(hel).parent().outerWidth()); //console.log(v);
                if (pos.left >= 0) {
                    hel.animate({ left: 0 });hel.animate({ left: 0 });
                } else if (pos.left <= v) {
                    hel.animate({ left: v });
                }
            } });
    }, render: function render() {
        console.log(this.props.response);console.log('pre-render dragdiv width is ' + this.props.zoomeddimensions.zoomedwidth); /*
                                                                                                                                var images = this.props.response.map(function(image){
                                                                                                                                var width = this.props.zoomeddimensions.zoomedwidth;
                                                                                                                                var height = this.props.zoomeddimensions.zoomedheight;
                                                                                                                                return <AdjustedImage classes="bannerimage" photoidentifier={image.photoidentifier} adjustid={image.adjustid} key={image.adjustid} src={image.src.encoded} width={width} height={height}/>
                                                                                                                                }.bind(this));
                                                                                                                                */console.log('dragdiv width is ' + this.props.zoomeddimensions.zoomedwidth);var dragdivstyle = { display: 'inline-block', width: this.props.zoomeddimensions.zoomedwidth, height: this.props.zoomeddimensions.zoomedheight };var canvasstyle = { display: 'inline-block', width: this.props.zoomeddimensions.zoomedwidth, height: this.props.zoomeddimensions.zoomedheight };return React.createElement('div', { id: 'drag', style: dragdivstyle, onTouchEnd: this.handleTouchEnd }, React.createElement('canvas', { id: 'dragcanvas', ref: 'dragcanvas', width: '960', height: '640' }));
    } });var AdjustedImageBanner = React.createClass({ displayName: 'AdjustedImageBanner', render: function render() {
        if (this.props.adjustid !== 0) {
            var style = { display: 'none', width: this.props.width, height: this.props.height };
        } else {
            var style = { width: this.props.width, height: this.props.height };
        }return React.createElement('img', { className: this.props.classes, style: style, src: this.props.src, 'data-photoidentifier': this.props.photoidentifier, 'data-adjustid': this.props.adjustid });
    } });var DisplayCaptionsBanner = React.createClass({ displayName: 'DisplayCaptionsBanner', render: function render() {
        console.log(this.props.data);console.log(this.props.data.performer_name); //var performer_name_caption =
        return React.createElement('div', null, React.createElement('p', null, this.props.data.performer_name), React.createElement('p', null, this.props.data.venue_name));
    } });
'use strict';var BannerContainer = React.createClass({ displayName: 'BannerContainer', getInitialState: function getInitialState() {
        return { data: [] };
    }, componentDidMount: function componentDidMount() {
        $.ajax({ type: 'GET', url: 'user/ajax/get/get_current_user_banners_all', data: {}, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);var uniqueresponse = parsedresponse.bannerimages; //var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({ data: uniqueresponse }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });
    }, handleDeleteButton: function handleDeleteButton(childdata) {
        var bannerid = childdata.bid;var imagesrc = childdata.filename;var tempstatedata = this.state.data;var setstatefunction = (function () {
            var newdataarray = this.state.data;var elementPos = this.state.data.map(function (item) {
                return item.banner_id;
            }).indexOf(bannerid);newdataarray.splice(elementPos, 1);this.setState({ data: newdataarray }); //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
            //hiding component instead
            $('#banner-' + bannerid).hide();
        }).bind(this);var r = confirm('Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.');if (r == true) {
            setstatefunction();$.ajax({ type: 'POST', url: 'user/ajax/post/user_bannerdelete', //dataType: "text"
                data: { 'bannerimage_id': bannerid, 'bannerimage_filename': imagesrc, _token: $_token }, error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);this.setState({ data: tempstatedata });$('#banner-' + bannerid).show();
                }).bind(this), success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
                }).bind(this) });
        }
    }, render: function render() {
        return React.createElement('div', { className: 'row', id: 'banners-manage-container' }, React.createElement(BannerList, { data: this.state.data, handleDeleteButton: this.handleDeleteButton }));
    } });var BannerList = React.createClass({ displayName: 'BannerList', handleDeleteButton: function handleDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, render: function render() {
        var banners = this.props.data.map((function (banner) {
            return React.createElement(CurrentBanner, { filename: banner.banner_filename, key: banner.banner_id, id: banner.banner_id, onBannerAddClick: this.handleIntermediate, handleDeleteButton: this.handleDeleteButton });
        }).bind(this));return React.createElement('div', null, banners);
    } });var CurrentBanner = React.createClass({ displayName: 'CurrentBanner', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {}, handleModalDeleteButton: function handleModalDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bid: this.props.id, filename: this.props.filename });
    }, onClick: function onClick() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.render(React.createElement(BannerModal, { filename: this.props.filename, id: this.props.id, key: 'modal' + this.props.id, handleDeleteButton: this.handleModalDeleteButton }), document.getElementById('content-modal'));$('#content-main').hide();$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg');
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var name = this.props.filename;var srcstring = '//d1y0bevpkkhybk.cloudfront.net/t/' + name + '.jpg';var idstring = 'banner-' + this.props.id;return React.createElement('div', { className: 'col-sm-4 col-xs-12', id: idstring }, React.createElement('a', { onClick: this.onClick }, React.createElement('img', { className: 'img img-responsive', id: this.props.id, 'data-id': this.props.id, src: srcstring })), React.createElement('div', null, React.createElement('a', { className: 'btn btn-warning btn-block', onClick: this.handleDeleteButton }, 'Delete Banner')), React.createElement('br', null));
    } });var BannerModal = React.createClass({ displayName: 'BannerModal', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {}, handleClose: function handleClose() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bid: this.props.id, filename: this.props.filename });
    }, render: function render() {
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg';var spacerstyle = { padding: 10 };var textdivstyle = { display: 'block', textAlign: 'center' };return React.createElement('div', { className: 'col-xs-12' }, React.createElement('img', { className: 'img img-responsive', id: 'currentmodalbanner', src: srcstring }), React.createElement('div', { style: textdivstyle }, React.createElement('br', null), React.createElement('p', null, React.createElement('em', null, 'To copy the link to your banner, right click on the banner and select "Copy image URL."')), React.createElement('br', null), React.createElement('br', null), React.createElement('a', { id: 'savecurrentbannerbutton', href: '', download: true, className: 'btn btn-primary' }, 'Save Banner'), React.createElement('span', { style: spacerstyle }), React.createElement('a', { id: 'deletecurrentbannerbutton', className: 'btn btn-default', onClick: this.handleDeleteButton }, 'Delete Banner'), React.createElement('br', null), React.createElement('br', null), React.createElement('div', null, React.createElement('a', { id: 'closebox', className: 'btn btn-default', onClick: this.handleClose }, 'Close Banner'))));
    } });
'use strict';var BannersMenu = React.createClass({ displayName: 'BannersMenu', getInitialState: function getInitialState() {
        //{name: 'Create', reactnodetomount: 'BannerCreateContainer', mountlocation: 'content-main', active: false},
        return { links: [{ name: 'Manage', reactnodetomount: 'BannerContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'FullBannerCreateContainer', mountlocation: 'content-main', active: false }] };
    }, componentDidMount: function componentDidMount() {
        this.setState({ links: [{ name: 'Manage', reactnodetomount: 'BannerContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'FullBannerCreateContainer', mountlocation: 'content-main', active: false }] });
    }, componentWillUnmount: function componentWillUnmount() {
        $('#componentsbutton').removeClass('active');$('#componentschildtarget').html('').removeClass('active');
    }, onLinkClick: function onLinkClick(data) {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();if (data == 'BannerContainer') {
            ReactDOM.render(React.createElement(BannerContainer, null), document.getElementById('content-main'));
        } /*
          else if (data == 'BannerCreateContainer'){
          ReactDOM.render(<BannerCreateContainer/>, document.getElementById('content-main'));
          }*/else if (data == 'FullBannerCreateContainer') {
            ReactDOM.render(React.createElement(FullBannerCreationPanel, null), document.getElementById('content-main'));
        }
    }, render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(BannersMenuLink, { name: link.name, key: link.reactnodetomount, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));var middlestyle = { paddingLeft: 0, paddingRight: 0 };return React.createElement('div', { className: 'row nopadding' }, React.createElement(CollectionsBackButton, null), React.createElement('div', { className: 'col-xs-8 col-sm-2', style: middlestyle }, links));
    } });var BannersMenuLink = React.createClass({ displayName: 'BannersMenuLink', componentDidMount: function componentDidMount() {}, onLinkClick: function onLinkClick() {
        this.props.onLinkClick(this.props.reactnodetomount);
    }, render: function render() {
        var name = this.props.name;if (name == 'Create') {
            var buttonclass = 'btn btn-block btn-success';
        } else if (name == 'Manage') {
            var buttonclass = 'btn btn-block btn-primary';
        } else {
            var buttonclass = '';
        }return React.createElement('div', null, React.createElement('div', { className: '' }, React.createElement('a', { className: buttonclass, onClick: this.onLinkClick }, this.props.name)), React.createElement('div', { className: 'clearfix visible-sm-block visible-md-block visible-lg-block' }));
    } });
'use strict';var BookinglistingCreateContainer = React.createClass({ displayName: 'BookinglistingCreateContainer', getInitialState: function getInitialState() {
        return { listing_title: null, listing_content: null };
    }, componentDidMount: function componentDidMount() {}, submitCreateNewListing: function submitCreateNewListing() {
        var listingtitle = this.state.listing_title;var listingcontent = this.state.listing_content;$.ajax({ type: 'POST', url: 'user/ajax/bookinglisting_create', data: { 'bookinglisting_title': listingtitle, 'bookinglisting_content': listingcontent, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your listing has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.render(React.createElement(BookinglistingContainer, { url: '' }), document.getElementById('content-main'));
            } });
    }, handleListingTitleTextEntry: function handleListingTitleTextEntry(event) {
        this.setState({ listing_title: event.target.value });
    }, handleListingContentTextEntry: function handleListingContentTextEntry(event) {
        this.setState({ listing_content: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var listingtitledefaulttext = this.state.listing_title;var listingcontentdefaulttext = this.state.listing_content;var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'listingtitletextinput' }, 'Listing Title:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'listingtitletextinput', className: 'form-control', value: listingtitledefaulttext, onChange: this.handleListingTitleTextEntry })), React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'listingcontenttextinput' }, 'Listing Content:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('textarea', { id: 'listingcontenttextinput', className: 'form-control', rows: '6', value: listingcontentdefaulttext, onChange: this.handleListingContentTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitCreateNewListing }, 'Create Listing'))));
    } });
'use strict';var BookinglistingContainer = React.createClass({ displayName: 'BookinglistingContainer', getInitialState: function getInitialState() {
        return { data: [] };
    }, componentDidMount: function componentDidMount() {
        $.ajax({ type: 'GET', url: 'user/ajax/get/get_user_bookinglistings_all', data: {}, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);var uniqueresponse = parsedresponse.bookinglistings;this.setState({ data: uniqueresponse }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });
    }, handleDeleteButton: function handleDeleteButton(childdata) {
        console.log(childdata);var bookinglistingid = childdata.bookinglisting_id;var tempstatedata = this.state.data;console.log('temp state data:');console.log(tempstatedata);var setstatefunction = (function () {
            var newdataarray = this.state.data;var elementPos = this.state.data.map(function (item) {
                return item.bookinglisting_id;
            }).indexOf(bookinglistingid);newdataarray.splice(elementPos, 1);this.setState({ data: newdataarray }); //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
            //hiding component instead
            $('#listing-' + bookinglistingid).hide();
        }).bind(this);var r = confirm('Are you sure you want to delete this listing? This will remove the listing from all MusicLocal projects. WARNING: this action cannot be undone.');if (r == true) {
            setstatefunction();$.ajax({ type: 'POST', url: 'user/ajax/post/delete_current_bookinglisting', //dataType: "text"
                data: { 'bookinglisting_id': bookinglistingid, _token: $_token }, error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);this.setState({ data: tempstatedata });$('#listing-' + bookinglistingid).show();
                }).bind(this), success: (function (response) {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
                }).bind(this) });
        }
    }, render: function render() {
        var containerstyle = { padding: 0 }; //
        return React.createElement('div', { className: 'container container-fixed', style: containerstyle, id: 'listings-manage-container' }, React.createElement('div', null, React.createElement(BookinglistingList, { data: this.state.data, handleDeleteButton: this.handleDeleteButton })));
    } });var BookinglistingList = React.createClass({ displayName: 'BookinglistingList', handleDeleteButton: function handleDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, render: function render() {
        var bookinglistings = this.props.data.map((function (bookinglisting) {
            return React.createElement(CurrentBookinglisting, { bookinglisting_title: bookinglisting.bookinglisting_title, bookinglisting_content: bookinglisting.bookinglisting_content, key: 'listing-' + bookinglisting.bookinglisting_id, bookinglisting_id: bookinglisting.bookinglisting_id, handleDeleteButton: this.handleDeleteButton });
        }).bind(this));var imgcontstyle = {};return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('div', { style: imgcontstyle }, bookinglistings)));
    } });var CurrentBookinglisting = React.createClass({ displayName: 'CurrentBookinglisting', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {}, handleModalDeleteButton: function handleModalDeleteButton(data) {
        this.props.handleDeleteButton(data);
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bookinglisting_id: this.props.bookinglisting_id, bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content });
    }, onClick: function onClick() {
        alert('not allowed');return;ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.render(React.createElement(BookinglistingModal, { bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id, key: 'modal' + this.props.bookinglisting_id, handleDeleteButton: this.handleModalDeleteButton }), document.getElementById('content-modal'));$('#content-main').hide(); //$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var photostyle = { padding: '0.25%' };var name = this.props.filename; //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/t/' + name + '.jpg';var btndivstyle = { textAlign: 'center' };var btnstyle = { marginTop: 8 };var idstring = 'listing-' + this.props.bookinglisting_id;return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            React.createElement('div', { className: 'row nopadding', id: idstring }, React.createElement('div', { className: 'col-sm-12' }, React.createElement('h3', null, this.props.bookinglisting_title), React.createElement('p', null, this.props.bookinglisting_content)), React.createElement('div', { style: btndivstyle }, React.createElement('button', { style: btnstyle, className: 'btn btn-default btn-xs', onClick: this.handleDeleteButton }, 'Delete Listing')))
        );
    } });var BookinglistingModal = React.createClass({ displayName: 'BookinglistingModal', getInitialState: function getInitialState() {
        return { showComponent: true };
    }, componentDidMount: function componentDidMount() {}, handleClose: function handleClose() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();
    }, handleDeleteButton: function handleDeleteButton() {
        this.props.handleDeleteButton({ bookinglisting_id: this.props.bookinglisting_id, bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content });
    }, render: function render() {
        var spacerstyle = { padding: 10 };var textdivstyle = { display: 'block', textAlign: 'center' };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('h3', null, this.props.bookinglisting_title), React.createElement('p', null, this.props.bookinglisting_content), React.createElement('span', { style: spacerstyle }), React.createElement('a', { id: 'deletecurrentlistingbutton', className: 'btn btn-default', onClick: this.handleDeleteButton }, 'Delete Listing'), React.createElement('br', null), React.createElement('br', null), React.createElement('div', null, React.createElement('a', { id: 'closebox', className: 'btn btn-default', onClick: this.handleClose }, 'Close Listing')));
    } });
'use strict';var BookinglistingMenu = React.createClass({ displayName: 'BookinglistingMenu', getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'BookinglistingContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'BookinglistingCreateContainer', mountlocation: 'content-main', active: false }] };
    }, componentDidMount: function componentDidMount() {
        this.setState({ links: [{ name: 'Manage', reactnodetomount: 'BookinglistingContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'BookinglistingCreateContainer', mountlocation: 'content-main', active: false }] });
    }, onLinkClick: function onLinkClick(data) {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();if (data == 'BookinglistingContainer') {
            ReactDOM.render(React.createElement(BookinglistingContainer, null), document.getElementById('content-main'));
        } else if (data == 'BookinglistingCreateContainer') {
            ReactDOM.render(React.createElement(BookinglistingCreateContainer, null), document.getElementById('content-main'));
        }
    }, componentWillUnmount: function componentWillUnmount() {
        $('#componentsbutton').removeClass('active');$('#componentschildtarget').html('').removeClass('active');
    }, render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(BookinglistingMenuLink, { name: link.name, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));return React.createElement('div', null, React.createElement('div', { className: 'col-sm-12' }, React.createElement('ul', { className: 'nav nav-pills nav-justified' }, links)));
    } });var BookinglistingMenuLink = React.createClass({ displayName: 'BookinglistingMenuLink', componentDidMount: function componentDidMount() {}, onLinkClick: function onLinkClick() {
        this.props.onLinkClick(this.props.reactnodetomount);
    }, render: function render() {
        return React.createElement('li', { role: 'presentation' }, React.createElement('a', { onClick: this.onLinkClick }, this.props.name));
    } });
'use strict';var EventCreateContainer = React.createClass({ displayName: 'EventCreateContainer', getInitialState: function getInitialState() {
        return { event_name: [] };
    }, componentDidMount: function componentDidMount() {}, submitCreateNewEvent: function submitCreateNewEvent() {
        var photoalbumname = this.state.event_name;var callbackurl = 'http://www.musiclocal.org/user';var timestamp = Math.floor(Date.now() / 1000);var randomString = function randomString() {
            var text = '';var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';for (var i = 0; i < 16; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }return text;
        };var shaObj = new jsSHA('SHA-1', 'TEXT');shaObj.setHMACKey('fe29a8e561b3d15803', 'TEXT');shaObj.update('fe29a8e561b3d15803' + '&' + '97edfe539abbdd4f8aa2');var hmac = shaObj.getHMAC('HEX');var oathversion = '1.0';var oathsignaturemethod = 'HMAC-SHA1';var oathconsumerkey = 'fe29a8e561b3d15803';$.ajax({ type: 'POST', url: 'http://eventfultest.com/oauth/request_token', data: { 'oauth_callback': callbackurl, 'oath_consumer_key': oathconsumerkey, 'timestamp': timestamp, 'nonce': randomString, 'oauth_version': oathversion, 'oath_signature': hmac, 'oauth_signature_method': oathsignaturemethod }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300); //var parsedresponse = JSON.parse(response);
                //this.setState({data: parsedresponse});
                ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.render(React.createElement(PhotoalbumContainer, { url: '' }), document.getElementById('content-main')); //location.reload();
                alert('Your photo album has been created.');
            }).bind(this) });
    }, handleEventNameTextEntry: function handleEventNameTextEntry(event) {
        this.setState({ event_name: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var photoalbumnamedefaulttext = this.state.event_name;var projecturldefaulttext = this.state.project_url;var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'photoalbumnametextinput' }, 'Event Name:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'photoalbumnametextinput', className: 'form-control', value: photoalbumnamedefaulttext, onChange: this.handleEventNameTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitCreateNewEvent }, 'Create Event'))));
    } });
'use strict';var NavbarTopContainer = React.createClass({ displayName: 'NavbarTopContainer', getInitialState: function getInitialState() {
        return { data: { user_id: 1 }, components: [{}], projects: [{}] };
    }, componentDidMount: function componentDidMount() {}, onNavbarButtonProjectsClick: function onNavbarButtonProjectsClick() {
        this.setState({ projects: [{ project_name: 'project' }], components: [{}] });
    }, onNavbarButtonComponentsClick: function onNavbarButtonComponentsClick() {
        this.setState({ components: [{ name: 'Banners', componentname: '' }, { name: 'Photo Albums', componentname: '' }], projects: [{}] });
    }, render: function render() {
        return React.createElement('div', { className: 'jumbocontainer' }, React.createElement('div', { className: 'container container-fixed' }, React.createElement('ul', { className: 'nav nav-pills nav-justified navbar-text' }, React.createElement(NavbarButtonProjects, { projects: this.state.projects, onNavbarButtonProjectsClick: this.onNavbarButtonProjectsClick }), React.createElement(NavbarButtonComponents, { components: this.state.components, onNavbarButtonComponentsClick: this.onNavbarButtonComponentsClick }))));
    } });var NavbarLevelOneButton = React.createClass({ displayName: 'NavbarLevelOneButton', getInitialState: function getInitialState() {
        return {};
    }, componentDidMount: function componentDidMount() {}, onNavbarButtonProjectsClick: function onNavbarButtonProjectsClick() {
        this.props.onNavbarButtonProjectsClick();
    }, render: function render() {
        var projects = this.props.projects.map((function (project) {
            return React.createElement(NavbarProject, { project_name: project.project_name, key: project.project_name, onAddBanner: this.passBannerAddToParent, onDeleteBanner: this.passBannerDeleteToParent });
        }).bind(this));console.log(projects[0].key); //if (projects[0].key == null){return null}
        return React.createElement('div', null, React.createElement('li', { role: 'presentation' }, React.createElement('a', { href: '#', onClick: this.onNavbarButtonProjectsClick }, 'Projects')), React.createElement('ul', { className: 'nav nav-pills nav-justified navbar-text' }, projects));
    } });var NavbarProject = React.createClass({ displayName: 'NavbarProject', getInitialState: function getInitialState() {
        return {};
    }, componentDidMount: function componentDidMount() {}, render: function render() {
        return React.createElement('li', { role: 'presentation' }, React.createElement('a', null, this.props.project_name));
    } });var NavbarButtonComponents = React.createClass({ displayName: 'NavbarButtonComponents', getInitialState: function getInitialState() {
        return {};
    }, componentDidMount: function componentDidMount() {}, onNavbarButtonComponentsClick: function onNavbarButtonComponentsClick() {
        this.props.onNavbarButtonComponentsClick();
    }, render: function render() {
        var components = this.props.components.map((function (component) {
            return React.createElement(NavbarComponent, { name: component.name, key: component.name, onAddBanner: this.passBannerAddToParent, onDeleteBanner: this.passBannerDeleteToParent });
        }).bind(this));return React.createElement('div', null, React.createElement('li', { role: 'presentation' }, React.createElement('a', { href: '#', onClick: this.onNavbarButtonComponentsClick }, 'Components')), React.createElement('ul', { className: 'nav nav-pills nav-justified navbar-text' }, components));
    } });var NavbarComponent = React.createClass({ displayName: 'NavbarComponent', getInitialState: function getInitialState() {
        return {};
    }, componentDidMount: function componentDidMount() {}, render: function render() {
        return React.createElement('li', { role: 'presentation' }, React.createElement('a', { href: '#' }, this.props.name));
    } });
'use strict';function collectionsMain() {
    ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));$('#projectschildtarget').html('');$('#projectsbutton').removeClass('active');ReactDOM.render(React.createElement(ComponentsMenu, null), document.getElementById('content-menu'));
}$(document).ready(function () {
    $('#navbar-components').click(function ($e) {
        collectionsMain();
    });$('#navbar-projects').click(function ($e) {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));ReactDOM.render(React.createElement(ProjectsMenu, null), document.getElementById('content-menu'));
    });$('#navbar-banners').click(function ($e) {
        $e.preventDefault();ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));$('#content-menu').html('').show();$('#content-main').html('').show();ReactDOM.render(React.createElement(BannersMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(BannerContainer, { url: '' }), document.getElementById('content-main'));
    });
});var UserDashboard = React.createClass({ displayName: 'UserDashboard', render: function render() {
        var style = { textAlign: 'center' };return React.createElement('div', null, React.createElement('div', { className: 'col-xs-12 section', id: 'getstartedcontainer' }, React.createElement('div', { style: style }, React.createElement('h1', null, 'User Dashboard'), React.createElement('h3', null, 'Welcome to MusicLocal.'))));
    } });var ProjectsMenu = React.createClass({ displayName: 'ProjectsMenu', getInitialState: function getInitialState() {
        //var projectlinks = localStorage.getItem("projectlinks");
        //var parsedprojectlinks = JSON.parse([projectlinks]);
        //var plinksob = {projectlinks: parsedprojectlinks};
        var plinksob = { projectlinks: [] };return plinksob;
    }, componentDidMount: function componentDidMount() {
        this.activateProjectsButton();this.deactivateComponentsButton();$.ajax({ type: 'GET', url: '/user/projects/list', data: { _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('Your current projects could not be loaded. Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                var parsedresponse = JSON.parse(response);this.setState({ projectlinks: parsedresponse });
            }).bind(this) });
    }, componentWillUnmount: function componentWillUnmount() {
        $('#projectsbutton').removeClass('active');$('#projectschildtarget').html('').removeClass('active');
    }, activateProjectsButton: function activateProjectsButton() {
        $('#projectsbutton').attr({ 'class': 'active' });
    }, deactivateComponentsButton: function deactivateComponentsButton() {
        $('#componentsbutton').removeClass('active');
    }, render: function render() {
        return React.createElement('div', null, React.createElement(ProjectsList, { projectlinks: this.state.projectlinks }));
    } });var ProjectsList = React.createClass({ displayName: 'ProjectsList', componentWillUnmount: function componentWillUnmount() {
        $('#projectschildtarget').html('').removeClass('active');
    }, render: function render() {
        var i = 0;var links = this.props.projectlinks.map(function (link, i, j) {
            i++;j++;if (i == 3) {
                var clearfixthree = true;i--;i--;i--;
            } else {
                var clearfixthree = false;
            }if (j == 2) {
                var clearfixtwo = true;j--;j--;
            } else {
                var clearfixtwo = false;
            }return React.createElement(ProjectLink, { project_name: link.project_name, project_id: link.project_id, project_url: link.project_url, bannerimage_filename: link.bannerimage_filename, clearfixthree: clearfixthree, clearfixtwo: clearfixtwo, key: link.project_url });
        });var headerstyle = { paddingLeft: 0, paddingRight: 0 };return React.createElement('div', null, React.createElement('div', { className: 'row nopadding' }, React.createElement('div', { className: 'col-xs-4 col-sm-1', style: headerstyle }, React.createElement('a', { className: 'btn btn-primary btn-block' }, 'Projects:')), React.createElement(CreateProject, null), React.createElement('br', null)), React.createElement('div', { className: 'row' }, links), React.createElement('div', { id: 'projectlistbottomplaceholder' }));
    } });var ProjectLink = React.createClass({ displayName: 'ProjectLink', onProjectClick: function onProjectClick() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));$('#content-main').html('').show();console.log(this.props);ReactDOM.render(React.createElement(ProjectEditContainer, { data: this.props }), document.getElementById('content-main'));var projectname = this.props.project_name;$('#projectschildtarget').html('<p class="navbar-text" style="padding-left:20px;">' + projectname + '</p>').attr({ 'class': 'active' });
    }, onProjectViewClick: function onProjectViewClick() {}, render: function render() {
        var filename = this.props.bannerimage_filename;if (filename == null) {
            var srcstring = '';
        } else {
            var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + filename + '.jpg';
        }var headerstyle = { textAlign: 'center' };var thispropsclearfixthree = this.props.clearfixthree;if (thispropsclearfixthree == true) {
            var clearfixthree = 'visible-md-block visible-lg-block';
        } else {
            var clearfixthree = '';
        }var thispropsclearfixtwo = this.props.clearfixtwo;if (thispropsclearfixtwo == true) {
            var clearfixtwo = 'visible-sm-block';
        } else {
            var clearfixtwo = '';
        }var clearfix = clearfixthree + ' ' + clearfixtwo + ' clearfix visible-xs-block';var block = { backgroundColor: '#ffffff', margin: 10, marginBottom: 20, padding: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 };var project_url = '' + this.props.project_url;var centerblock = { textAlign: 'center' };var removeradius = { borderRadius: 0 };var bottom = { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 };return React.createElement('div', null, React.createElement('div', { className: 'col-md-4 col-sm-6 col-xs-12 imgclickable', style: block }, React.createElement('div', { onClick: this.onProjectClick }, React.createElement('h2', { style: headerstyle }, this.props.project_name), React.createElement('img', { className: 'img img-responsive', src: srcstring }), React.createElement('a', { className: 'btn btn-block btn-lg btn-primary', style: removeradius }, 'Edit')), React.createElement('div', { style: centerblock }, React.createElement('a', { className: 'btn btn-block btn-lg btn-success', href: project_url, style: bottom }, 'View'))), React.createElement('div', { className: clearfix }));
    } });var CreateProject = React.createClass({ displayName: 'CreateProject', onCreateProjectClick: function onCreateProjectClick() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));$('#content-main').html('').show();ReactDOM.render(React.createElement(CreateProjectContainer, { url: '' }), document.getElementById('content-main'));$('#projectschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Create</p>').attr({ 'class': 'active' });
    }, render: function render() {
        var createbuttonstyle = { paddingLeft: 0 };return React.createElement('div', { className: 'col-xs-8 col-sm-2', style: createbuttonstyle }, React.createElement('a', { className: 'btn btn-block btn-success', onClick: this.onCreateProjectClick }, 'Create New Project'));
    } });var ComponentsMenu = React.createClass({ displayName: 'ComponentsMenu', componentDidMount: function componentDidMount() {
        $('#componentsbutton').attr({ 'class': 'active' });
    }, handleBannersClick: function handleBannersClick() {
        this.clearContents();ReactDOM.render(React.createElement(BannersMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(BannerContainer, { url: '' }), document.getElementById('content-main')); //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $('#componentschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Banners</p>'); //ReactDOM.render(<ComponentsSubMenu subMenuName="Banners"/>, document.getElementById('componentschildtarget'));
    }, handleBackgroundimagesClick: function handleBackgroundimagesClick() {
        this.clearContents();ReactDOM.render(React.createElement(BackgroundimagesMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(BackgroundimageContainer, { url: '' }), document.getElementById('content-main')); //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $('#componentschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Background Images</p>'); //ReactDOM.render(<ComponentsSubMenu subMenuName="Banners"/>, document.getElementById('componentschildtarget'));
    }, handlePhotoalbumsClick: function handlePhotoalbumsClick() {
        this.clearContents();ReactDOM.render(React.createElement(PhotoalbumsMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(PhotoalbumContainer, { url: '' }), document.getElementById('content-main')); //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $('#componentschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Photo Albums</p>');
    }, handleVideosClick: function handleVideosClick() {
        this.clearContents();ReactDOM.render(React.createElement(VideosMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(VideoContainer, { url: '' }), document.getElementById('content-main')); //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $('#componentschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Videos</p>');
    }, handleEventsClick: function handleEventsClick() {
        alert('This is a placeholder for future functionality. To add event listings to your project, add a bandsintown account on the project management page.');return;this.clearContents();ReactDOM.render(React.createElement(EventCreateContainer, { url: '' }), document.getElementById('content-main')); //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $('#componentschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Events</p>');
    }, handleListingsClick: function handleListingsClick() {
        this.clearContents();ReactDOM.render(React.createElement(BookinglistingMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(BookinglistingContainer, { url: '' }), document.getElementById('content-main')); //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $('#componentschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Listings</p>');
    }, handleBannerHeadlinesClick: function handleBannerHeadlinesClick() {
        this.clearContents();ReactDOM.render(React.createElement(BannerHeadlineMenu, { url: '' }), document.getElementById('content-menu'));ReactDOM.render(React.createElement(BannerHeadlineContainer, { url: '' }), document.getElementById('content-main')); //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $('#componentschildtarget').html('<p class="navbar-text" style="padding-left:20px;">Headlines</p>');
    }, clearContents: function clearContents() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));$('#content-menu').html('');$('#content-main').html('');
    }, render: function render() {
        var style = { paddingLeft: 10 }; /*<li><a href="$link6" style={style}>Event</a></li>*/var hidden = { display: 'none' };return React.createElement('div', null, React.createElement('div', { className: 'col-xs-12 col-sm-4', style: hidden }, React.createElement('a', { style: style, className: 'btn btn-primary btn-lg btn-block', id: 'navbar-photoalbums', onClick: this.handlePhotoalbumsClick }, 'Photo Albums')), React.createElement('div', { className: 'col-xs-12 col-sm-4', style: hidden }, React.createElement('a', { style: style, className: 'btn btn-primary btn-lg btn-block', id: 'navbar-banners', onClick: this.handleBannersClick }, 'Banners')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { style: style, className: 'btn btn-primary btn-lg btn-block', id: 'navbar-backgroundimages', onClick: this.handleBackgroundimagesClick }, 'Background Images')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { style: style, className: 'btn btn-primary btn-lg btn-block', onClick: this.handleVideosClick }, 'Videos')), React.createElement('div', { className: 'col-xs-12 col-sm-4', style: hidden }, React.createElement('a', { className: 'btn btn-primary btn-lg btn-block', style: style, onClick: this.handleEventsClick }, 'Events')), React.createElement('div', { className: 'col-xs-12 col-sm-4', style: hidden }, React.createElement('a', { className: 'btn btn-primary btn-lg btn-block', style: style, onClick: this.handleListingsClick }, 'Listings')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { style: style, className: 'btn btn-primary btn-lg btn-block', onClick: this.handleBannerHeadlinesClick }, 'Headlines')));
    } });var ComponentsSubMenu = React.createClass({ displayName: 'ComponentsSubMenu', render: function render() {
        var style = { paddingLeft: 10 }; /*<li><a href="$link6" style={style}>Event</a></li>*/var divstyle = { display: 'inline' };return React.createElement('div', { style: divstyle }, React.createElement('li', null, this.props.subMenuName, '>'));
    } });var CollectionsBackButton = React.createClass({ displayName: 'CollectionsBackButton', goBack: function goBack() {
        collectionsMain();
    }, render: function render() {
        var backbuttonstyle = { paddingRight: 0, paddingLeft: 0 };return React.createElement('div', { className: 'col-xs-4 col-sm-1', style: backbuttonstyle, onClick: this.goBack }, React.createElement('a', { className: 'btn btn-primary btn-block' }, 'Back'));
    } });
'use strict';var PhotoalbumCreateContainer = React.createClass({ displayName: 'PhotoalbumCreateContainer', getInitialState: function getInitialState() {
        return { photoalbum_name: [] };
    }, componentDidMount: function componentDidMount() {}, submitCreateNewPhotoalbum: function submitCreateNewPhotoalbum() {
        var photoalbumname = this.state.photoalbum_name;$.ajax({ type: 'POST', url: 'user/ajax/post/add_photoalbum', data: { 'photoalbum_name': photoalbumname, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300); //var parsedresponse = JSON.parse(response);
                //this.setState({data: parsedresponse});
                ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.render(React.createElement(PhotoalbumContainer, { url: '' }), document.getElementById('content-main')); //location.reload();
                alert('Your photo album has been created.');
            }).bind(this) });
    }, handlePhotoalbumNameTextEntry: function handlePhotoalbumNameTextEntry(event) {
        this.setState({ photoalbum_name: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var photoalbumnamedefaulttext = this.state.photoalbum_name;var projecturldefaulttext = this.state.project_url;var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'photoalbumnametextinput' }, 'Photo Album Name:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'photoalbumnametextinput', className: 'form-control', value: photoalbumnamedefaulttext, onChange: this.handlePhotoalbumNameTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitCreateNewPhotoalbum }, 'Create Photo Album'))));
    } });
'use strict';var PhotoalbumContainer = React.createClass({ displayName: 'PhotoalbumContainer', getInitialState: function getInitialState() {
        return { data: [], data1: [], data2: [], data3: [] };
    }, updateDimensions: function updateDimensions() {
        //var cont = ReactDOM.findDOMNode(this.refs.fbphotodisplay);
        var top = $('#fbphotodisplay').scrollTop();var height = $('#fbphotodisplay').scrollHeight;var postop = $('#testcontainer2').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var visiblecontainerheight = $('#fbphotodisplay').height();var heightpastvisiblecontainer = height - visiblecontainerheight;var innerh = $(window).height();this.setState({ postop: postop, height: height, endofcontainer: endofcontainer, visiblecontainerheight: visiblecontainerheight, heightpastvisiblecontainer: heightpastvisiblecontainer, top: top, innerh: innerh });
    }, componentDidMount: function componentDidMount() {
        window.addEventListener('resize', this.updateDimensions); //var cont = ReactDOM.findDOMNode(this.refs.fbphotodisplay);
        var postop = $('#content-main').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var height = $('#fbphotodisplay').scrollHeight;var visiblecontainerheight = $('#fbphotodisplay').height();var heightpastvisiblecontainer = height - visiblecontainerheight; //below is from "add album" page
        var projectid = $('#projectinfo').data('projectid');$.ajax({ type: 'GET', url: 'user/ajax/get/get_current_user_photoalbums', data: {}, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);var photoalbumresponse = parsedresponse.photoalbumarray; //var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({ data2: photoalbumresponse }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });$(document).ready((function () {
            this.getPhotosFromFacebook();
        }).bind(this));
    }, getPhotosFromFacebook: function getPhotosFromFacebook(paginationclick, dataarray) {
        console.log('getphotos triggered');$.ajaxSetup({ cache: true });$.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({ appId: '1618708688367645', version: 'v2.3', cookie: true });FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    if (paginationclick === undefined) {
                        FB.api('/me/photos', 'get', { limit: 24, fields: 'images, id, created_time, from, tags' }, function (response) {
                            handleresponse(response, dataarray);
                        });
                    } else {
                        $.get(paginationclick, function (response) {
                            handleresponse(response, dataarray);
                        });
                    }var handleresponse = (function (response, dataarray) {
                        if (dataarray === undefined) {
                            var dataarray = [];
                        } else {}$.each(response.data, function () {
                            //dataarray.push({id:this.id, from_name:this.from.name, from_id:this.from.id, fb_created_time:this.created_time, link0:this.images[0].source, link1:this.images[1].source, link2:this.images[2].source, link3:this.images[3].source, link4:this.images[4].source, link5:this.images[5].source, link6:this.images[6].source, nextresult:this.tags.paging.cursors.after});
                            try {
                                dataarray.push({ id: this.id, from_name: this.from.name, from_id: this.from.id, fb_created_time: this.created_time, link0: this.images[0].source, link3: this.images[3].source, nextresult: this.tags.paging.cursors.after });
                            } catch (err) {
                                console.log('An image was not displayed due to an error getting the picture.');
                            }
                        });var getnextresultslink = response.paging.next;var pagination = [];if (response.paging.previous) {
                            pagination.push({ label: 'Previous', id: 'previousfbphotobutton', link: response.paging.previous });
                        }pagination.push({ label: 'Next', id: 'nextfbphotobutton', link: response.paging.next });renderreact(dataarray, pagination, getnextresultslink);
                    }).bind(this);
                } else {
                    alert('You are not logged in. Please refresh the page.');
                }
            });
        });var renderreact = (function (dataarray, pagination, getnextresultslink) {
            this.setState({ data: dataarray, data1: pagination, data3: getnextresultslink });
        }).bind(this);
    }, handleScroll: function handleScroll() {
        var cont = ReactDOM.findDOMNode(this.refs.fbphotodisplay);var top = $('#fbphotodisplay').scrollTop();var height = cont.scrollHeight;var postop = $('#content-main').offset().top;var endofcontainer = $('#endofcontainer').offset().top;var visiblecontainerheight = $('#fbphotodisplay').height();var heightpastvisiblecontainer = height - visiblecontainerheight;var dataarray = this.state.data;var paginationclick = this.state.data3;var i = 0;if (top > heightpastvisiblecontainer - visiblecontainerheight && i < 1) {
            i++;this.getPhotosFromFacebook(paginationclick, dataarray);
        }
    }, render: function render() {
        var innerh = $(window).height();var postop = $('#content-main').offset().top;var containerstyle = { padding: 0 };var style2 = { textAlign: 'center' };var facebookphotodisplaystyle = { height: innerh - postop - 80, overflow: 'auto' };return React.createElement('div', null, React.createElement('div', { className: 'col-sm-12 nopadding', id: 'instructions' }, React.createElement('div', { style: style2 }, React.createElement('h3', null, 'To add photos to a photo album, drag the photo on top of the photo album name. (Duplicates will be automatically ignored.)'), React.createElement('p', null, React.createElement('em', null, 'To assign existing photo albums to projects, visit your projects page.')))), React.createElement('div', { className: 'col-sm-4' }, React.createElement(PhotoalbumList, { data2: this.state.data2, onBannerAddClick: this.handleBannerAdd })), React.createElement('div', { className: 'col-sm-8', style: containerstyle }, React.createElement('div', { id: 'fbphotodisplay', ref: 'fbphotodisplay', style: facebookphotodisplaystyle, onScroll: this.handleScroll }, React.createElement(PhotoList, { data: this.state.data }))), React.createElement('div', { className: 'col-sm-12' }, React.createElement('div', { id: 'endofcontainer' })));
    } });var PhotoalbumList = React.createClass({ displayName: 'PhotoalbumList', render: function render() {
        var photoalbums = this.props.data2.map(function (photoalbum) {
            return React.createElement(CurrentAlbum, { name: photoalbum.photoalbum_name, key: photoalbum.photoalbum_name, id: photoalbum.photoalbum_id, currentphotos: photoalbum.photoalbum_currentphotos, refname: 'albumname' + photoalbum.photoalbum_id });
        });var imgcontstyle = {};return React.createElement('div', null, React.createElement('br', null), React.createElement('h4', null, 'Your photo albums:'), photoalbums);
    } });var CurrentAlbum = React.createClass({ displayName: 'CurrentAlbum', getInitialState: function getInitialState() {
        return { showComponent: true, showNameChangeField: false };
    }, onClick: function onClick() {}, handleSuccess: function handleSuccess() {
        console.log('success');
    }, componentDidMount: function componentDidMount() {
        var albumid = this.props.id;var albumidhash = '#' + this.props.id;$(albumidhash).droppable({ drop: function drop(event, ui) {
                console.log(ui);console.log('drop registered');var findid = ui.draggable[0].dataset.facebookid;var findlink0 = ui.draggable[0].dataset.facebooklink0;var fromname = ui.draggable[0].dataset.fromname;var fromid = ui.draggable[0].dataset.fromid;var fb_created_time = ui.draggable[0].dataset.fb_created_time;console.log(albumid);console.log(findid);$(this);$.ajax({ type: 'POST', url: 'user/ajax/post/add_phototophotoalbum', data: { 'from_id': fromid, 'fb_created_time': fb_created_time, 'from_name': fromname, 'photoalbum_id': albumid, 'facebookphoto_identifier': findid, 'facebookphoto_link0': findlink0, _token: $_token }, error: function error() {
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    }, success: (function (response) {
                        //console.log(response);
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);successfunction();
                    }).bind(this) });
            } });var successfunction = (function () {
            this.handleSuccess();
        }).bind(this);
    }, handleLinkClick: function handleLinkClick() {
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;$('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden; border:none"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');$('#myModal').modal();
    }, handleRemovePhotos: function handleRemovePhotos() {
        var fullalbumlink = '/user/photos/albums/manage?photoalbum_id=' + this.props.id;$('#content-main').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden; border:none"></iframe><div style="display:block;text-align:center"><br><p></p></div>'); //$('#myModal2').modal();
    }, handleNameChangeClick: function handleNameChangeClick() {
        if (!this.state.showNameChangeField) {
            this.setState({ showNameChangeField: true });
        } else {
            this.setState({ showNameChangeField: false });
        }
    }, submitNameChange: function submitNameChange() {
        var albumid = this.props.id;var albumnamechangeref = '#' + this.props.refname;console.log(albumnamechangeref);var newalbumname = $(albumnamechangeref).val();console.log(newalbumname);$.ajax({ type: 'POST', url: 'user/ajax/post/changephotoalbumname', data: { 'photoalbum_id': albumid, 'photoalbum_name': newalbumname, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);location.reload();
            }).bind(this) });
    }, handleDeleteRequest: function handleDeleteRequest() {
        var photoalbumid = this.props.id;var r = confirm('Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: '/user/photos/albums/manage/delete', //dataType: "text"
                data: { 'photoalbum_id': photoalbumid, _token: $_token }, error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: function success(response) {
                    console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300); //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    //var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    //console.log(moveimage);
                    setstatefunction();
                } });var setstatefunction = (function (moveimage) {
                this.setState({ showComponent: false }); //console.log(moveimage);
                //this.props.onBannerAddClick({data: []});
                return;
            }).bind(this);
        } else {}
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var albumphotos = this.props.currentphotos.map(function (albumphoto) {
            return React.createElement(AlbumPhoto, { identifier: albumphoto.facebookphoto_identifier, filename: albumphoto.facebookphoto_filename });
        });if (!this.state.showNameChangeField) {
            var namechangediv = { display: 'none' };
        }var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var photostyle = { padding: '0.25%' }; //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';var photoalbumcontainerstyle = { width: '100%' };var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;var albumnamechangeref = 'albumnamechange-album' + this.props.id;return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />
            React.createElement('div', { id: this.props.id, className: 'row nopadding outershadow' }, React.createElement('div', { className: 'col-sm-12' }, React.createElement('p', null, this.props.name, ' ', React.createElement('a', { onClick: this.handleRemovePhotos }, 'view/remove photos')), React.createElement('p', null, React.createElement('a', { onClick: this.handleNameChangeClick }, 'Change album name')), React.createElement('div', { style: namechangediv }, React.createElement('input', { type: 'text', className: 'form-control', id: this.props.refname }), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitNameChange }, 'Submit'))), React.createElement('p', null, React.createElement('a', { onClick: this.handleLinkClick }, 'view album/embed code')), React.createElement('p', null, React.createElement('a', { onClick: this.handleDeleteRequest }, 'delete this album'))))
        );
    } });var AlbumPhoto = React.createClass({ displayName: 'AlbumPhoto', getInitialState: function getInitialState() {
        return { maxheight: null, postopadjust: null };
    }, componentDidMount: function componentDidMount() {
        //var thephoto = new Image();
        //var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0/' + name + '.jpg';
        //thephoto.crossOrigin = "Anonymous";
        //$(thephoto).attr('data-caman-hidpi-disabled', '');
        //thephoto.src = srcstring;
        //var = this.props.identifier;
        //document.getElementById(idhash).addEventListener("load", function() {
        //$(window).load(function(){
        //console.log('ffsdf');
        var idhash = '#' + this.props.identifier; //console.log(idhash);
        var imgwidth = $(idhash).width();console.log('initial image width is ' + imgwidth);var imgheight = $(idhash).height(); //console.log('initial image height is ' + imgheight);
        var calcmaxheight = imgwidth * 0.6666667; //console.log('calc image height is ' + calcmaxheight);
        var heightdifference = imgheight - calcmaxheight;var posadjust = heightdifference / 2; //console.log(posadjust);
        this.setState({ maxheight: calcmaxheight, postopadjust: posadjust }); //}.bind(this), false);
    }, render: function render() {
        var name = this.props.filename;var imgid = 'img-' + this.props.identifier;var imgidhash = '#' + imgid;var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0/' + name + '.jpg';var imgdiv = { padding: '0.25%', maxHeight: this.state.maxheight, overflow: 'hidden' };var idhash = '#' + this.props.identifier;var imgstyle = { position: 'relative' };var helper = { display: 'inline-block', verticalAlign: 'middle', height: '100%' };return React.createElement('div', { id: this.props.identifier, className: 'col-sm-4', style: imgdiv }, React.createElement('img', { className: 'img img-responsive', src: srcstring, ref: this.props.identifier, id: imgid, style: imgstyle }));
    } });var PhotoList = React.createClass({ displayName: 'PhotoList', render: function render() {
        console.log('here');console.log(this.props.data);var photos = this.props.data.map(function (photo) {
            return React.createElement(CurrentPhoto, { link0: photo.link0, link3: photo.link3, key: photo.id, id: photo.id, from_name: photo.from_name, from_id: photo.from_id, fb_created_time: photo.fb_created_time });
        });var imgcontstyle = {};return React.createElement('div', { className: 'grid', id: 'get-user-photos-from-facebook' }, React.createElement('div', { className: 'grid-sizer' }), React.createElement('div', { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', style: imgcontstyle }, photos));
    } });var CurrentPhoto = React.createClass({ displayName: 'CurrentPhoto', onClick: function onClick() {}, componentDidMount: function componentDidMount() {
        var idhash = '#' + this.props.id;$(idhash).draggable({ opacity: 0.7, helper: 'clone', cursor: 'move', cursorAt: { top: 56, left: 56 } });
    }, render: function render() {
        var photostyle = { padding: '0.25%' };return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            React.createElement('div', { className: 'grid-item grid-item--width3', id: this.props.id, ref: 'draggable', 'data-facebookid': this.props.id, 'data-facebooklink0': this.props.link0, 'data-fromname': this.props.from_name, 'data-fromid': this.props.from_id, 'data-fb_created_time': this.props.fb_created_time }, React.createElement('img', { style: photostyle, onClick: this.onClick, src: this.props.link3, 'data-link0': this.props.link0, id: this.props.id, 'data-fromid': this.props.from_id, 'data-from_name': this.props.from_name, 'data-fb_created_time': this.props.fb_created_time }))
        );
    } });
'use strict';var PhotoalbumsMenu = React.createClass({ displayName: 'PhotoalbumsMenu', getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'PhotoalbumContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'PhotoalbumCreateContainer', mountlocation: 'content-main', active: false }] };
    }, componentDidMount: function componentDidMount() {
        console.log('banner menu mounted');this.setState({ links: [{ name: 'Manage', reactnodetomount: 'PhotoalbumContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'PhotoalbumCreateContainer', mountlocation: 'content-main', active: false }] });
    }, onLinkClick: function onLinkClick(data) {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').html('');$('#content-main').show();if (data == 'PhotoalbumContainer') {
            ReactDOM.render(React.createElement(PhotoalbumContainer, null), document.getElementById('content-main'));
        } else if (data == 'PhotoalbumCreateContainer') {
            ReactDOM.render(React.createElement(PhotoalbumCreateContainer, null), document.getElementById('content-main'));
        }
    }, componentWillUnmount: function componentWillUnmount() {
        $('#componentsbutton').removeClass('active');$('#componentschildtarget').html('').removeClass('active');
    }, render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(PhotoalbumsMenuLink, { name: link.name, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));return React.createElement('div', null, React.createElement('div', { className: 'col-sm-12' }, React.createElement('ul', { className: 'nav nav-pills nav-justified' }, links)));
    } });var PhotoalbumsMenuLink = React.createClass({ displayName: 'PhotoalbumsMenuLink', componentDidMount: function componentDidMount() {}, onLinkClick: function onLinkClick() {
        this.props.onLinkClick(this.props.reactnodetomount);
    }, render: function render() {
        return React.createElement('li', { role: 'presentation' }, React.createElement('a', { onClick: this.onLinkClick }, this.props.name));
    } });
'use strict';var ProjectEditContainer = React.createClass({ displayName: 'ProjectEditContainer', getInitialState: function getInitialState() {
        return { 'backgroundimages_project': { 'section_id': '1', 'backgroundimage_filename': 'asdfsffa' } };
    }, componentDidMount: function componentDidMount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));$('#projectsbutton').attr({ 'class': 'active' });var project_id = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/ajax/get/edit_project_icon_media_get', data: { 'project_id': project_id, '_token': $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('Your current project could not be loaded. Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                var parsedresponse = JSON.parse(response);console.log(parsedresponse);console.log(parsedresponse.backgroundimages_project);this.setState({ backgroundimages_project: parsedresponse.backgroundimages_project }); //ReactDOM.render(<ProjectSectionButtonList backgroundimages_project={parsedresponse.backgroundimages_project} />, document.getElementById('section-buttons'));
            }).bind(this) });
    }, renderSectionButtonList: function renderSectionButtonList() {
        ReactDOM.render(React.createElement(ProjectSectionButtonList, { backgroundimages_project: this.state.backgroundimages_project }), document.getElementById('section-buttons'));
    }, handleClick: function handleClick($e) {
        ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));if ($e.target.id == 'add-about') {
            ReactDOM.render(React.createElement(AboutContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-user') {
            ReactDOM.render(React.createElement(UserContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-show') {
            ReactDOM.render(React.createElement(ShowsProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-banner') {
            ReactDOM.render(React.createElement(BannerProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-photoalbum') {
            ReactDOM.render(React.createElement(PhotoalbumProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-video') {
            ReactDOM.render(React.createElement(VideoProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-audio') {
            ReactDOM.render(React.createElement(AudioProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-social') {
            ReactDOM.render(React.createElement(SocialAddContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-contact') {
            ReactDOM.render(React.createElement(ContactProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-listing') {
            ReactDOM.render(React.createElement(BookinglistingProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        }
    }, handleProjectDelete: function handleProjectDelete(childdata) {
        /*
        Re-loads project list from server after delete instead of simply adjusting state client-side. This code is inefficient.
        */var projectid = childdata;var r = confirm('Are you sure you want to delete this project? WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: '/user/projects/delete', //dataType: "text"
                data: { 'project_id': projectid, _token: $_token }, error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: function success(response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.render(React.createElement(ProjectsMenu, null), document.getElementById('content-menu'));
                } });
        }
    }, render: function render() {
        return React.createElement('div', null, React.createElement(ProjectIsActiveEditHeader, { data: this.props.data, handleProjectDelete: this.handleProjectDelete }), React.createElement('br', null), React.createElement('div', { className: 'row' }, React.createElement('div', { id: 'section-buttons' }), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-about', onClick: this.handleClick }, 'About')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-user', onClick: this.handleClick }, 'Users')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-show', onClick: this.handleClick }, 'Shows')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-banner', onClick: this.handleClick }, 'Banners')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-photoalbum', onClick: this.handleClick }, 'Photo Albums')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-video', onClick: this.handleClick }, 'Video')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-audio', onClick: this.handleClick }, 'Audio')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-social', onClick: this.handleClick }, 'Social Media')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-contact', onClick: this.handleClick }, 'Contact Info')), React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('a', { className: 'btn btn-default btn-block', id: 'add-listing', onClick: this.handleClick }, 'Listings'))), React.createElement('div', { id: 'manageprojectcontent' }));
    } });var ProjectSectionButtonList = React.createClass({ displayName: 'ProjectSectionButtonList', render: function render() {
        var projectsectionbuttons = this.props.backgroundimages_project.map((function (projectsectionbutton) {
            var keystring = 'section_button-' + projectsectionbutton.section_id;return React.createElement(ProjectSectionButton, { section_id: projectsectionbutton.section_id, backgroundimage_filename: projectsectionbutton.backgroundimageimage_filename, key: keystring });
        }).bind(this));return React.createElement('div', null, projectsectionbuttons);
    } });var ProjectSectionButton = React.createClass({ displayName: 'ProjectSectionButton', handleClick: function handleClick($e) {
        ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));if ($e.target.id == '1') {
            ReactDOM.render(React.createElement(AboutContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-user') {
            ReactDOM.render(React.createElement(UserContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == '2') {
            ReactDOM.render(React.createElement(ShowsProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-banner') {
            ReactDOM.render(React.createElement(BannerProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == '5') {
            ReactDOM.render(React.createElement(PhotoalbumProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == '3') {
            ReactDOM.render(React.createElement(VideoProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == '4') {
            ReactDOM.render(React.createElement(AudioProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == '7') {
            ReactDOM.render(React.createElement(SocialAddContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == '6') {
            ReactDOM.render(React.createElement(ContactProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-listing') {
            ReactDOM.render(React.createElement(BookinglistingProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        }
    }, render: function render() {
        if (section_id = 1) {
            var section_name = 'About';
        }if (section_id = 2) {
            var section_name = 'Tour';
        }if (section_id = 3) {
            var section_name = 'Video';
        }if (section_id = 4) {
            var section_name = 'Audio';
        }if (section_id = 5) {
            var section_name = 'Images';
        }if (section_id = 6) {
            var section_name = 'Contact';
        }if (section_id = 7) {
            var section_name = 'Social';
        }var srcstring = '//d1y0bevpkkhybk.cloudfront.net/bsm/' + backgroundimage_filename + '.jpg';return React.createElement('div', { className: 'col-xs-12 col-sm-4' }, React.createElement('img', { className: 'img img-responsive', src: srcstring }), React.createElement('a', { className: 'btn btn-default btn-block' }, section_name));
    } });var ProjectIsActiveEditHeader = React.createClass({ displayName: 'ProjectIsActiveEditHeader', getInitialState: function getInitialState() {
        return { project_active: { isactive: false, activatebutton_text: '', projectviewbutton: '' } };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/project/ajax/active_status', data: { 'project_id': projectid }, error: (function () {
                this.setState({ project_active: { isactive: null, activatebutton_text: '', projectviewbutton: 'Could not get project status from server.' } });$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this), success: (function (response) {
                if (response == 1) {
                    this.setState({ project_active: { isactive: true, activatebutton_text: 'Deactivate', projectviewbutton: 'View ' + this.props.data.project_name } });
                }if (response == 0) {
                    this.setState({ project_active: { isactive: false, activatebutton_text: 'Activate', projectviewbutton: '[Deactivated]]' } });
                }
            }).bind(this) });
    }, handleProjectActiveToggle: function handleProjectActiveToggle() {
        var isactive = this.state.project_active.isactive;var projectid = this.props.data.project_id;if (isactive == false) {
            $.ajax({ type: 'POST', url: '/user/projects/activate', data: { 'project_id': projectid, _token: $_token }, error: function error() {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br/>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: (function () {
                    this.setState({ project_active: { isactive: true, activatebutton_text: 'Deactivate', projectviewbutton: 'View Project Page' } });$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been activated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }).bind(this) });
        } else if (isactive == true) {
            $.ajax({ type: 'POST', url: '/user/projects/deactivate', data: { 'project_id': projectid, _token: $_token }, error: function error() {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: (function () {
                    this.setState({ project_active: { isactive: false, activatebutton_text: 'Activate', projectviewbutton: '[Deactivated]' } });$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been deactivated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }).bind(this) });
        }
    }, viewProjectPage: function viewProjectPage() {
        var isactive = this.state.project_active.isactive;if (isactive == false) {
            alert('You must activate your project to preview it.');
        } else if (isactive == true) {
            var projectlinkstring = '/' + this.props.data.project_url + '';window.open(projectlinkstring);
        }
    }, handleProjectDelete: function handleProjectDelete() {
        var data = this.props.data.project_id;this.props.handleProjectDelete(data);
    }, render: function render() {
        var isactive = this.state.project_active.isactive; //var activatebuttonstyle = {};
        if (isactive == false) {
            var projectviewbuttonclass = 'btn btn-block btn-default';var projectactivatebuttonclass = 'btn btn-block btn-success';
        } else {
            var projectviewbuttonclass = 'btn btn-block btn-success';var projectactivatebuttonclass = 'btn btn-block btn-warning';
        }var backbutton = { paddingLeft: 0, paddingRight: 0 };var rightbutton = { paddingLeft: 0 };var button = { margin: 0 };return React.createElement('div', { className: 'row nopadding' }, React.createElement('div', { className: 'col-xs-4 col-sm-1', style: backbutton }, React.createElement('a', { className: 'btn btn-primary btn-block', style: button }, 'Back')), React.createElement('div', { className: 'col-xs-8 col-sm-2', style: rightbutton }, React.createElement('a', { className: projectviewbuttonclass, style: button, onClick: this.viewProjectPage }, this.state.project_active.projectviewbutton), React.createElement('a', { className: projectactivatebuttonclass, style: button, onClick: this.handleProjectActiveToggle }, this.state.project_active.activatebutton_text), React.createElement('a', { className: 'btn btn-danger btn-block', style: button, onClick: this.handleProjectDelete }, 'Delete Project')), React.createElement('div', { className: 'clearfix' }));
    } });var ProjectsectionToggle = React.createClass({ displayName: 'ProjectsectionToggle', getInitialState: function getInitialState() {
        return { projectsection_toggle_data: { isactive: this.props.projectsection_toggle_data.isactive, activatebutton_text: this.props.projectsection_toggle_data.activatebutton_text } };
    }, componentDidMount: function componentDidMount() {
        //by default, get active state from parent to conserve get requests.
        //if isactive data is unavailable, get from server using ajax.
        if (this.state.projectsection_toggle_data.isactive == null) {
            var projectid = this.props.project_id;var projectsection_id = this.props.projectsection_toggle_data.projectsection_id;$.ajax({ type: 'GET', url: '/user/project/projectsection/active_status', data: { 'project_id': projectid, 'projectsection_id': projectsection_id, _token: $_token }, error: (function () {
                    this.setState({ projectsection_toggle_data: { isactive: null, activatebutton_text: 'Could not retrieve status.' } });$('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }).bind(this), success: (function (response) {
                    if (response == 1) {
                        this.setState({ projectsection_toggle_data: { isactive: true, activatebutton_text: 'Deactivate' } });
                    }if (response == 0) {
                        this.setState({ projectsection_toggle_data: { isactive: false, activatebutton_text: 'Activate' } });
                    }
                }).bind(this) });
        }
    }, handleToggle: function handleToggle() {
        var isactive = this.state.projectsection_toggle_data.isactive;var projectid = this.props.project_id;var projectsection_id = this.props.projectsection_toggle_data.projectsection_id;if (isactive == false) {
            $.ajax({ type: 'POST', url: '/user/project/projectsection/activate', data: { 'project_id': projectid, 'projectsection_id': projectsection_id, _token: $_token }, error: function error() {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br/>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: (function () {
                    this.setState({ projectsection_toggle_data: { isactive: true, activatebutton_text: '(Active - click to deactivate)' } });$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been activated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }).bind(this) });
        } else if (isactive == true) {
            $.ajax({ type: 'POST', url: '/user/project/projectsection/deactivate', data: { 'project_id': projectid, 'projectsection_id': projectsection_id, _token: $_token }, error: function error() {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: (function () {
                    this.setState({ projectsection_toggle_data: { isactive: false, activatebutton_text: '(Inactive - click to activate)' } });$('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been deactivated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }).bind(this) });
        }
    }, render: function render() {
        var isactive = this.state.projectsection_toggle_data.isactive;if (isactive == null) {
            var activatebuttonstyle = { paddingLeft: 10, marginRight: 10 }; //, color:'yellow'
            //var projectviewbutton = {paddingLeft:10};//color:'#333333'
            //var projectviewbuttonclass = 'btn btn-default';
            var projectactivatebuttonclass = 'btn btn-default';
        }if (isactive == false) {
            var activatebuttonstyle = { paddingLeft: 10, marginRight: 10 }; //, color:'yellow'
            //var projectviewbutton = {paddingLeft:10};//color:'#333333'
            //var projectviewbuttonclass = 'btn btn-default';
            var projectactivatebuttonclass = 'btn btn-warning';
        } else {
            var activatebuttonstyle = { paddingLeft: 10, marginRight: 10 }; //, color:'green'
            //var projectviewbutton = {paddingLeft:10};
            //var projectviewbuttonclass = 'btn btn-info';
            var projectactivatebuttonclass = 'btn btn-success';
        }return React.createElement('div', null, React.createElement('a', { className: projectactivatebuttonclass, style: activatebuttonstyle, onClick: this.handleToggle }, this.state.projectsection_toggle_data.activatebutton_text));
    } });
'use strict';var CreateProjectContainer = React.createClass({ displayName: 'CreateProjectContainer', getInitialState: function getInitialState() {
        return { project_name: [], project_url: [], location_id: 2, project_type: 2 };
    }, componentDidMount: function componentDidMount() {}, submitCreateNewProject: function submitCreateNewProject() {
        var projectname = this.state.project_name;var projecturl = this.state.project_url;var projectlocation = this.state.location_id;var projecttype = this.state.project_type;$.ajax({ type: 'POST', url: '/user/projects/create', data: { 'project_name': projectname, 'project_url': projecturl, 'project_type': projecttype, 'location_id': projectlocation, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);location.reload();alert('Your project has been created.');
            }).bind(this) });
    }, componentWillUnmount: function componentWillUnmount() {
        $('projectschildcontainer').html('').removeClass('active');
    }, handleProjectNameTextEntry: function handleProjectNameTextEntry(event) {
        this.setState({ project_name: event.target.value });
    }, handleProjectURLTextEntry: function handleProjectURLTextEntry(event) {
        this.setState({ project_url: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var projectnamedefaulttext = this.state.project_name;var projecturldefaulttext = this.state.project_url;var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'projectnametextinput' }, 'Project Name:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'projectnametextinput', className: 'form-control', value: projectnamedefaulttext, onChange: this.handleProjectNameTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'projecturltextinput' }, 'Project URL:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'projecturltextinput', className: 'form-control', value: projecturldefaulttext, onChange: this.handleProjectURLTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitCreateNewProject }, 'Create Project'))));
    } });
'use strict';var AboutContainer = React.createClass({ displayName: 'AboutContainer', getInitialState: function getInitialState() {
        return { data: [] };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/about/get', data: { project_id: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response); //var uniqueresponse = parsedresponse.uniquevideos;
                //var projectresponse = parsedresponse.projectvideos;
                //console.log(foo.uniquebannerimages);
                this.setState({ data: parsedresponse.about_content });var editor = CKEDITOR.replace('abouttextarea');editor.on('change', (function (evt) {
                    // getData() returns CKEditor's HTML content.
                    //console.log( 'Total bytes: ' + evt.editor.getData().length );
                    this.setState({ data: evt.editor.getData() });
                }).bind(this));
            }).bind(this) });
    }, submitAboutChange: function submitAboutChange() {
        var projectid = this.props.data.project_id;var aboutcontent = this.state.data;$.ajax({ type: 'POST', url: '/user/projects/about/change', data: { 'project_id': projectid, 'about_content': aboutcontent, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('About section updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, handleAboutSubmit: function handleAboutSubmit() {
        var projectid = $('#projectinfo').data('projectid');var aboutcontent = this.state.data;$.ajax({ type: 'POST', url: '/user/projects/about/change', data: { 'project_id': projectid, 'about_content': aboutcontent, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('About section updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, handleTextareaEntry: function handleTextareaEntry(event) {
        var ckeditordata = CKEDITOR.instances.textareaabout.getData();this.setState({ data: ckeditordata });return;
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var textareastyle = { height: '300px' };var defaulttext = this.state.data;var projectsection_toggle_data = { isactive: null, projectsection_id: 1, activatebutton_text: 'retrieving active status...' };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('br', null), React.createElement(ProjectsectionToggle, { project_id: this.props.data.project_id, projectsection_toggle_data: projectsection_toggle_data }), React.createElement('form', { onSubmit: this.handleAboutSubmit }, React.createElement('textarea', { id: 'abouttextarea', className: 'form-control', value: defaulttext, style: textareastyle, onChange: this.handleTextareaEntry }), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitAboutChange }, 'Submit'))));
    } });
'use strict';var AudioProjectContainer = React.createClass({ displayName: 'AudioProjectContainer', getInitialState: function getInitialState() {
        return { soundcloudwidget_path: [], soundcloudwidget_script: [] };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/audio/get', data: { project_id: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response);var soundcloudwidget_path = 'https://www.soundcloud.com/' + parsedresponse.soundcloudwidget_path;var soundcloudwidget_script = parsedresponse.soundcloudwidget_script;this.setState({ soundcloudwidget_path: soundcloudwidget_path, soundcloudwidget_script: soundcloudwidget_script });
            }).bind(this) });
    }, submitSoundcloudwidgetChange: function submitSoundcloudwidgetChange() {
        var projectid = this.props.data.project_id;var soundcloudwidget_path = this.state.soundcloudwidget_path;if (this.state.soundcloudwidget_script == '') {
            var soundcloudwidget_script = null;
        } else {
            var soundcloudwidget_script = this.state.soundcloudwidget_script;
        }$.ajax({ type: 'POST', url: '/user/projects/soundcloudwidget/addchange', data: { 'project_id': projectid, 'soundcloudwidget_path': soundcloudwidget_path, 'soundcloudwidget_script': soundcloudwidget_script, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, handleSoundcloudTextEntry: function handleSoundcloudTextEntry(event) {
        this.setState({ soundcloudwidget_path: event.target.value });
    }, handleSoundcloudscriptTextEntry: function handleSoundcloudscriptTextEntry(event) {
        this.setState({ soundcloudwidget_script: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var soundclouddefaulttext = this.state.soundcloudwidget_path;var soundcloudscriptdefaulttext = this.state.soundcloudwidget_script;var paddiv = { padding: 8 };var projectsection_toggle_data = { isactive: null, projectsection_id: 4, activatebutton_text: 'retrieving active status...' };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('br', null), React.createElement(ProjectsectionToggle, { project_id: this.props.data.project_id, projectsection_toggle_data: projectsection_toggle_data }), React.createElement('div', { style: paddiv }), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'soundcloudtextinput' }, 'Enter Soundcloud URL or Username:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'soundcloudtextinput', className: 'form-control', value: soundclouddefaulttext, onChange: this.handleSoundcloudTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'soundcloudtextinput' }, 'Enter Soundcloud widget script:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('textarea', { className: 'form-control', rows: '5', id: 'soundcloudscripttextinput', value: soundcloudscriptdefaulttext, onChange: this.handleSoundcloudscriptTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitSoundcloudwidgetChange }, 'Submit'))));
    } });
'use strict';var BannerProjectContainer = React.createClass({ displayName: 'BannerProjectContainer', getInitialState: function getInitialState() {
        return { data: [], data1: [] };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: 'user/ajax/get/get_current_user_banners_links', data: { 'projectid': projectid }, statusCode: { 401: function _() {
                    var r = confirm('You have been logged out due to inactivity. Click okay to log back in, or simply refresh the page.');if (r == true) {
                        window.open('//www.musiclocal.org/login/return', 'loginwindow', 'location=0, width=600,height=600');
                    } else {}
                } }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                console.log(response); //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Banner images retrieved.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                var parsedresponse = JSON.parse(response);console.log(parsedresponse);var uniqueresponse = parsedresponse.uniquebannerimages;var projectresponse = parsedresponse.projectbannerimages; //console.log(foo.uniquebannerimages);
                this.setState({ data: uniqueresponse, data1: projectresponse }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });
    }, handleBannerAdd: function handleBannerAdd(data1) {
        var newdata1array = this.state.data1;newdata1array.push(data1);var id = data1.banner_id;var projectid = this.props.data.project_id;$.ajax({ type: 'POST', url: '/user/projects/addbannertoproject', data: { 'bannerimage_id': id, 'project_id': projectid, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newdataarray = this.state.data;var elementPos = this.state.data.map(function (item) {
                return item.banner_id;
            }).indexOf(id);newdataarray.splice(elementPos, 1);this.setState({ data: newdataarray, data1: newdata1array });
        }).bind(this);
    }, handleBannerRemove: function handleBannerRemove(data) {
        var id = data.banner_id;var projectid = this.props.data.project_id;$.ajax({ type: 'POST', url: '/user/projects/removebannerfromproject', //dataType: "text"
            data: { 'bannerimage_id': id, 'project_id': projectid, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newdataarray = this.state.data;newdataarray.push(data);var newdata1array = this.state.data1;var elementPos = this.state.data1.map(function (item) {
                return item.banner_id;
            }).indexOf(id);newdata1array.splice(elementPos, 1);this.setState({ data: newdataarray, data1: newdata1array });
        }).bind(this);
    }, handleBannerDelete: function handleBannerDelete(data) {
        var id = data.banner_id;var imagesrc = data.banner_filename;var r = confirm('Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: 'user/ajax/post/user_bannerdelete', //dataType: "text"
                data: { 'bannerimage_id': id, 'bannerimage_filename': imagesrc, _token: $_token }, error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();this.setState({ showComponent: false });
                }).bind(this) });$('#myModal').modal('hide');var setstatefunction = (function () {
                var newdataarray = this.state.data;var newdata1array = this.state.data1;var elementPosData = this.state.data.map(function (item) {
                    return item.banner_id;
                }).indexOf(id); //console.log(elementPosData);
                var elementPosData1 = this.state.data1.map(function (item) {
                    return item.banner_id;
                }).indexOf(id); //console.log(elementPosData1);
                if (elementPosData1 != -1) {
                    newdata1array.splice(elementPosData1, 1);
                }if (elementPosData != -1) {
                    newdataarray.splice(elementPosData, 1);
                }this.setState({ data: newdataarray, data1: newdata1array });
            }).bind(this);
        }
    }, render: function render() {
        return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-7' }, React.createElement(ProjectBannerList, { data1: this.state.data1, onRemoveBannerClick: this.handleBannerRemove, onBannerDeleteClick: this.handleBannerDelete })), React.createElement('div', { className: 'col-xs-5' }, React.createElement(UnaddedBannerList, { data: this.state.data, onBannerAddClick: this.handleBannerAdd, onBannerDeleteClick: this.handleBannerDelete })));
    } });var UnaddedBannerList = React.createClass({ displayName: 'UnaddedBannerList', getInitialState: function getInitialState() {
        return { data: [] };
    }, componentDidMount: function componentDidMount() {
        this.setState({ data: this.props.data });
    }, passBannerAddToParent: function passBannerAddToParent(data) {
        this.props.onBannerAddClick(data);
    }, passBannerDeleteToParent: function passBannerDeleteToParent(data) {
        this.props.onBannerDeleteClick(data);
    }, render: function render() {
        var banners = this.props.data.map((function (banner) {
            return React.createElement(CurrentUnaddedBanner, { filename: banner.banner_filename, key: banner.banner_id, id: banner.banner_id, onAddBanner: this.passBannerAddToParent, onDeleteBanner: this.passBannerDeleteToParent });
        }).bind(this));return React.createElement('div', null, React.createElement('br', null), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('h4', null, 'Banners not added to project:'))), React.createElement('div', { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', className: 'row' }, banners));
    } });var CurrentUnaddedBanner = React.createClass({ displayName: 'CurrentUnaddedBanner', getInitialState: function getInitialState() {
        return { showComponent: true, filename: '', id: '' };
    }, componentDidMount: function componentDidMount() {
        this.setState({ filename: this.props.filename, id: this.props.id });
    }, onAddButtonClick: function onAddButtonClick() {
        this.props.onAddBanner({ banner_filename: this.state.filename, banner_id: this.state.id });
    }, onUnaddedBannerClick: function onUnaddedBannerClick() {
        $('#bannerdetails').html('<img class="img img-responsive" id="currentmodalbanner" data-id="' + this.props.id + '" src="//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg"/>' + '<div style="display:block;text-align:center"><br>' + '<p><em>To copy the link to your banner, right click on the banner and select "Copy image URL"</em><br/><br/>' + '<button id="addunaddedbannerbutton" class="btn btn-primary">Add Banner to Project</button>' + '<span style="padding:10px;"></span><a id="savecurrentbannerbutton" href="" download class="btn btn-default">Save Banner</a>' + '<span style="padding:10px;"></span><button id="deletecurrentbannerbutton" class="btn btn-default">Delete Banner</button>');$('#myModal').modal();$('#addunaddedbannerbutton').click((function () {
            this.onAddButtonClick();$('#myModal').modal('hide');
        }).bind(this));$('#deletecurrentbannerbutton').click((function () {
            this.onDeleteBannerButton();
        }).bind(this));$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg');
    }, onDeleteBannerButton: function onDeleteBannerButton() {
        this.props.onDeleteBanner({ banner_filename: this.state.filename, banner_id: this.state.id });
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var photostyle = { padding: '0.25%' };var name = this.props.filename; //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';var addstyle = { textAlign: 'center' };var unaddedbannerstyle = { width: '45%' };var btnmargin = { marginTop: 8 };return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            React.createElement('div', { className: 'col-xs-12' }, React.createElement('div', { className: 'imgclickable' }, React.createElement('img', { className: 'img img-responsive', id: this.props.id, 'data-id': this.props.id, onClick: this.onUnaddedBannerClick, style: photostyle, src: srcstring })), React.createElement('div', { style: addstyle }, React.createElement('button', { className: 'btn btn-primary btn-xs', onClick: this.onAddButtonClick, style: btnmargin }, 'Add Banner to Project')))
        );
    } });var ProjectBannerList = React.createClass({ displayName: 'ProjectBannerList', passBannerRemoveToParent: function passBannerRemoveToParent(data) {
        this.props.onRemoveBannerClick(data);
    }, passBannerDeleteToParent: function passBannerDeleteToParent(data) {
        this.props.onBannerDeleteClick(data);
    }, render: function render() {
        var projectbanners = this.props.data1.map((function (projectbanner) {
            return React.createElement(CurrentProjectBanner, { filename: projectbanner.banner_filename, key: projectbanner.banner_id, id: projectbanner.banner_id, onRemoveBannerClick: this.passBannerRemoveToParent, onDeleteBannerClick: this.passBannerDeleteToParent });
        }).bind(this));return React.createElement('div', null, React.createElement('br', null), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('h4', null, 'Banners added to this project:'))), React.createElement('div', { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', className: 'row' }, projectbanners));
    } });var CurrentProjectBanner = React.createClass({ displayName: 'CurrentProjectBanner', getInitialState: function getInitialState() {
        return { showComponent: true, filename: '', id: '' };
    }, componentDidMount: function componentDidMount() {
        this.setState({ filename: this.props.filename, id: this.props.id });
    }, onRemoveButtonClick: function onRemoveButtonClick() {
        this.props.onRemoveBannerClick({ banner_filename: this.state.filename, banner_id: this.state.id });
    }, onDeleteButtonClick: function onDeleteButtonClick() {
        this.props.onDeleteBannerClick({ banner_filename: this.state.filename, banner_id: this.state.id });
    }, onAddedBannerClick: function onAddedBannerClick() {
        $('#bannerdetails').html('<img class="img img-responsive" id="currentmodalbanner" data-id="' + this.state.id + '" src="//d1y0bevpkkhybk.cloudfront.net/c/' + this.state.filename + '.jpg"/>' + '<div style="display:block;text-align:center"><br>' + '<p><em>To copy the link to your banner, right click on the banner and select "Copy image URL"</em><br/><br/>' + '<button id="removeaddedbannerbutton" class="btn btn-primary">Remove Banner from Project</button>' + '<span style="padding:10px;"></span><a id="savecurrentbannerbutton" href="" download class="btn btn-default">Save Banner</a>' + '<span style="padding:10px;"></span><button id="deletecurrentbannerbutton" class="btn btn-default">Delete Banner</button>');$('#myModal').modal();$('#removeaddedbannerbutton').click((function () {
            this.onRemoveButtonClick();$('#myModal').modal('hide');
        }).bind(this));$('#deletecurrentbannerbutton').click((function () {
            this.onDeleteButtonClick();
        }).bind(this));$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg');
    }, /*
       onDeleteBannerButton: function(){
       var id = this.state.id;
       var imagesrc = this.state.filename;
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
       $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
       this.setState({showComponent: false})
       }.bind(this))
       });
       $('#myModal').modal('hide');
       }
       },
       */render: function render() {
        if (!this.state.showComponent) {
            return null;
        }var photostyle = { padding: '0.25%' };var name = this.props.filename; //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';var removebtnstyle = { width: '100%', textAlign: 'center' };var btnmargin = { marginTop: 8 };var addeddiv = { padding: 5 };return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            React.createElement('div', { className: 'col-xs-12' }, React.createElement('div', { className: 'imgclickable' }, React.createElement('img', { className: 'img img-responsive', id: this.props.id, 'data-id': this.props.id, onClick: this.onAddedBannerClick, style: photostyle, src: srcstring })), React.createElement('div', { style: removebtnstyle }, React.createElement('button', { className: 'btn btn-default btn-xs', onClick: this.onRemoveButtonClick, style: btnmargin }, 'Remove Banner from Project')))
        );
    } });
'use strict';var BookinglistingProjectContainer = React.createClass({ displayName: 'BookinglistingProjectContainer', getInitialState: function getInitialState() {
        return { data: [], data1: [] };
    }, componentDidMount: function componentDidMount() {
        alert('not hooked up yet');var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: 'user/ajax/get/get_current_project_listings', data: { 'projectid': projectid }, statusCode: { 401: function _() {
                    var r = confirm('You have been logged out due to inactivity. Click okay to log back in, or simply refresh the page.');if (r == true) {
                        window.open('//www.musiclocal.org/login/return', 'loginwindow', 'location=0, width=600,height=600');
                    } else {}
                } }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                console.log(response); //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Banner images retrieved.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                var parsedresponse = JSON.parse(response);console.log(parsedresponse);var uniqueresponse = parsedresponse.uniquebookinglistings;var projectresponse = parsedresponse.projectbookinglistings; //console.log(foo.uniquebannerimages);
                this.setState({ data: uniqueresponse, data1: projectresponse }); //renderreact(uniqueresponse, projectresponse);
            }).bind(this) });
    }, handleBookinglistingAdd: function handleBookinglistingAdd(data1) {
        var newdata1array = this.state.data1;newdata1array.push(data1);var bookinglistingid = data1.bookinglisting_id;var projectid = this.props.data.project_id;$.ajax({ type: 'POST', url: 'user/ajax/bookinglistings/post/add_bookinglisting_to_project', data: { 'bannerimage_id': bookinglistingid, 'project_id': projectid, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success() {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newdataarray = this.state.data;var elementPos = this.state.data.map(function (item) {
                return item.bookinglisting_id;
            }).indexOf(bookinglistingid);newdataarray.splice(elementPos, 1);this.setState({ data: newdataarray, data1: newdata1array });
        }).bind(this);
    }, handleBookinglistingRemove: function handleBookinglistingRemove(data) {
        var bookinglistingid = data.bookinglisting_id;var projectid = this.props.data.project_id;$.ajax({ type: 'POST', url: 'user/ajax/bookinglistings/post/remove_bookinglisting_from_project', //dataType: "text"
            data: { 'bannerimage_id': bookinglistingid, 'project_id': projectid, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success() {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newdataarray = this.state.data;newdataarray.push(data);var newdata1array = this.state.data1;var elementPos = this.state.data1.map(function (item) {
                return item.bookinglisting_id;
            }).indexOf(bookinglistingid);newdata1array.splice(elementPos, 1);this.setState({ data: newdataarray, data1: newdata1array });
        }).bind(this);
    }, handleBookinglistingDelete: function handleBookinglistingDelete(data) {
        var bookinglistingid = data.bookinglisting_id;var r = confirm('Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: 'user/ajax/post/delete_current_bookinglisting', data: { 'bookinglisting_id': bookinglistingid, _token: $_token }, error: function error() {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: (function (response) {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
                }).bind(this) });$('#myModal').modal('hide');var setstatefunction = (function () {
                var newdataarray = this.state.data;var newdata1array = this.state.data1;var elementPosData = this.state.data.map(function (item) {
                    return item.bookinglisting_id;
                }).indexOf(bookinglistingid);var elementPosData1 = this.state.data1.map(function (item) {
                    return item.bookinglisting_id;
                }).indexOf(bookinglistingid);if (elementPosData1 != -1) {
                    newdata1array.splice(elementPosData1, 1);
                }if (elementPosData != -1) {
                    newdataarray.splice(elementPosData, 1);
                }this.setState({ data: newdataarray, data1: newdata1array });
            }).bind(this);
        }
    }, render: function render() {
        var containerstyle = { padding: 0 }; //
        return React.createElement('div', null, React.createElement('div', { className: 'col-sm-4', style: containerstyle }, React.createElement(ProjectBookinglistingList, { data1: this.state.data1, onRemoveBookinglistingClick: this.handleBookinglistingRemove, onBookinglistingDeleteClick: this.handleBookinglistingDelete })), React.createElement('div', { className: 'col-sm-8', style: containerstyle }, React.createElement(UnaddedBookinglistingList, { data: this.state.data, onBookinglistingAddClick: this.handleBookinglistingAdd, onBookinglistingDeleteClick: this.handleBookinglistingDelete })));
    } });var UnaddedBookinglistingList = React.createClass({ displayName: 'UnaddedBookinglistingList', passBookinglistingAddToParent: function passBookinglistingAddToParent(data) {
        this.props.onBookinglistingAddClick(data);
    }, passBookinglistingDeleteToParent: function passBookinglistingDeleteToParent(data) {
        this.props.onBookinglistingDeleteClick(data);
    }, render: function render() {
        var bookinglistings = this.props.data.map((function (bookinglisting) {
            return React.createElement(CurrentUnaddedBookinglisting, { bookinglisting_title: bookinglisting.bookinglisting_title, key: 'listing-' + bookinglisting.bookinglisting_id, bookinglisting_id: bookinglisting.bookinglisting_id, onAddBookinglisting: this.passBookinglistingAddToParent, onDeleteBookinglisting: this.passBookinglistingDeleteToParent });
        }).bind(this));var imgcontstyle = {};var hpadding = { paddingLeft: 5 };return React.createElement('div', null, React.createElement('br', null), React.createElement('h4', { style: hpadding }, 'Listings not added to project:'), React.createElement('div', { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', style: imgcontstyle }, bookinglistings));
    } });var CurrentUnaddedBookinglisting = React.createClass({ displayName: 'CurrentUnaddedBookinglisting', onAddButtonClick: function onAddButtonClick() {
        this.props.onAddBookinglisting({ bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id });
    }, onUnaddedBookinglistingClick: function onUnaddedBookinglistingClick() {
        alert('not functional');return;$('#bannerdetails').html('<img class="img img-responsive" id="currentmodalbanner" data-id="' + this.props.id + '" src="//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg"/>' + '<div style="display:block;text-align:center"><br>' + '<p><em>To copy the link to your banner, right click on the banner and select "Copy image URL"</em><br/><br/>' + '<button id="addunaddedbannerbutton" class="btn btn-primary">Add Banner to Project</button>' + '<span style="padding:10px;"></span><a id="savecurrentbannerbutton" href="" download class="btn btn-default">Save Banner</a>' + '<span style="padding:10px;"></span><button id="deletecurrentbannerbutton" class="btn btn-default">Delete Banner</button>');$('#myModal').modal();$('#addunaddedbannerbutton').click((function () {
            this.onAddButtonClick();$('#myModal').modal('hide');
        }).bind(this));$('#deletecurrentbannerbutton').click((function () {
            this.onDeleteBookinglistingButton();
        }).bind(this));$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg');
    }, onDeleteBookinglistingButton: function onDeleteBookinglistingButton() {
        this.props.onDeleteBookinglisting({ bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id });
    }, render: function render() {
        var photostyle = { padding: '0.25%' };var addstyle = { textAlign: 'center' };var unaddedbannerstyle = { width: '45%' };var btnmargin = { marginTop: 8 };var containimgdiv = { padding: 5 };var idstring = 'listing-' + this.props.bookinglisting_id;return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            React.createElement('div', { className: 'row', id: idstring }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('h3', null, this.props.bookinglisting_title), React.createElement('p', null, this.props.bookinglisting_content), React.createElement('div', { style: addstyle }, React.createElement('button', { className: 'btn btn-primary btn-xs', onClick: this.onAddButtonClick, style: btnmargin }, 'Add Listing to Project'))))
        );
    } });var ProjectBookinglistingList = React.createClass({ displayName: 'ProjectBookinglistingList', passBookinglistingRemoveToParent: function passBookinglistingRemoveToParent(data) {
        this.props.onRemoveBookinglistingClick(data);
    }, passBookinglistingDeleteToParent: function passBookinglistingDeleteToParent(data) {
        this.props.onBookinglistingDeleteClick(data);
    }, render: function render() {
        var bookinglistings = this.props.data1.map((function (bookinglisting) {
            return React.createElement(CurrentProjectBookinglisting, { bookinglisting_title: bookinglisting.bookinglisting_title, key: 'listing-' + bookinglisting.bookinglisting_id, bookinglisting_id: bookinglisting.bookinglisting_id, onRemoveBookinglistingClick: this.passBookinglistingRemoveToParent, onDeleteBookinglistingClick: this.passBookinglistingDeleteToParent });
        }).bind(this));var imgcontstyle = {};var hpadding = { paddingLeft: 5 };return React.createElement('div', null, React.createElement('br', null), React.createElement('h4', { style: hpadding }, 'Banners added to this project:'), React.createElement('div', { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', style: imgcontstyle }, bookinglistings));
    } });var CurrentProjectBookinglisting = React.createClass({ displayName: 'CurrentProjectBookinglisting', onRemoveButtonClick: function onRemoveButtonClick() {
        this.props.onRemoveBookinglistingClick({ bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id });
    }, onDeleteButtonClick: function onDeleteButtonClick() {
        this.props.onDeleteBookinglistingClick({ bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id });
    }, onAddedBookinglistingClick: function onAddedBookinglistingClick() {
        alert('not allowed');return;$('#bannerdetails').html('<img class="img img-responsive" id="currentmodalbanner" data-id="' + this.state.id + '" src="//d1y0bevpkkhybk.cloudfront.net/c/' + this.state.filename + '.jpg"/>' + '<div style="display:block;text-align:center"><br>' + '<p><em>To copy the link to your banner, right click on the banner and select "Copy image URL"</em><br/><br/>' + '<button id="removeaddedbannerbutton" class="btn btn-primary">Remove Banner from Project</button>' + '<span style="padding:10px;"></span><a id="savecurrentbannerbutton" href="" download class="btn btn-default">Save Banner</a>' + '<span style="padding:10px;"></span><button id="deletecurrentbannerbutton" class="btn btn-default">Delete Banner</button>');$('#myModal').modal();$('#removeaddedbannerbutton').click((function () {
            this.onRemoveButtonClick();$('#myModal').modal('hide');
        }).bind(this));$('#deletecurrentbannerbutton').click((function () {
            this.onDeleteButtonClick();
        }).bind(this));$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg');
    }, render: function render() {
        var photostyle = { padding: '0.25%' };var removebtnstyle = { width: '100%', textAlign: 'center' };var btnmargin = { marginTop: 8 };var addeddiv = { padding: 5 };var idstring = 'listing-' + this.props.bookinglisting_id;return React.createElement('div', { className: 'row', id: idstring }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('h3', null, this.props.bookinglisting_title), React.createElement('p', null, this.props.bookinglisting_content), React.createElement('div', { style: removebtnstyle }, React.createElement('button', { className: 'btn btn-default btn-xs', onClick: this.onRemoveButtonClick, style: btnmargin }, 'Remove Banner from Project'))));
    } });
'use strict';var ContactProjectContainer = React.createClass({ displayName: 'ContactProjectContainer', getInitialState: function getInitialState() {
        return { contact_email: [] };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/contactinfo/get', data: { project_id: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response);var contactinfoemail = parsedresponse.contactinfo_email;this.setState({ contactinfo_email: contactinfoemail });
            }).bind(this) });
    }, submitContactinfoChange: function submitContactinfoChange() {
        var projectid = this.props.data.project_id;var contactinfoemail = this.state.contactinfo_email;$.ajax({ type: 'POST', url: '/user/projects/contactinfo/addchange', data: { 'project_id': projectid, 'contactinfo_email': contactinfoemail, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, handleContactinfoTextEntry: function handleContactinfoTextEntry(event) {
        this.setState({ contactinfo_email: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var contactinfodefaulttext = this.state.contactinfo_email;var projectsection_toggle_data = { isactive: null, projectsection_id: 6, activatebutton_text: 'retrieving active status...' };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('br', null), React.createElement(ProjectsectionToggle, { project_id: this.props.data.project_id, projectsection_toggle_data: projectsection_toggle_data }), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'contactinfotextinput' }, 'Enter Contact Email:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'contactinfotextinput', className: 'form-control', value: contactinfodefaulttext, onChange: this.handleContactinfoTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitContactinfoChange }, 'Submit'))));
    } });
'use strict';var PhotoalbumProjectContainer = React.createClass({ displayName: 'PhotoalbumProjectContainer', getInitialState: function getInitialState() {
        return { unaddedphotoalbumdata: [], addedphotoalbumdata: [] };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/photoalbums/get', data: { projectid: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response);var uniqueresponse = parsedresponse.uniquephotoalbums;var projectresponse = parsedresponse.projectphotoalbums;console.log(projectresponse);this.setState({ unaddedphotoalbumdata: uniqueresponse, addedphotoalbumdata: projectresponse });
            }).bind(this) });
    }, removeFromProject: function removeFromProject(datareceived) {
        var projectid = this.props.data.project_id; //console.log(datareceived);
        var photoalbumid = datareceived.photoalbum_id;$.ajax({ type: 'POST', url: '/user/projects/photoalbums/remove', //dataType: "text"
            data: { 'project_id': projectid, 'photoalbum_id': photoalbumid, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newunaddedphotoalbumdataarray = this.state.unaddedphotoalbumdata;newunaddedphotoalbumdataarray.push(datareceived);var newaddedphotoalbumdataarray = this.state.addedphotoalbumdata;var elementPos = this.state.addedphotoalbumdata.map(function (item) {
                return item.photoalbum_id;
            }).indexOf(photoalbumid);newaddedphotoalbumdataarray.splice(elementPos, 1);this.setState({ addedphotoalbumdata: newaddedphotoalbumdataarray, unaddedphotoalbumdata: newunaddedphotoalbumdataarray });
        }).bind(this);
    }, addToProject: function addToProject(datareceived) {
        var projectid = this.props.data.project_id;var photoalbumid = datareceived.photoalbum_id;$.ajax({ type: 'POST', url: '/user/projects/photoalbums/add', //dataType: "text"
            data: { 'project_id': projectid, 'photoalbum_id': photoalbumid, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newaddedphotoalbumdataarray = this.state.addedphotoalbumdata;newaddedphotoalbumdataarray.push(datareceived);var newunaddedphotoalbumdataarray = this.state.unaddedphotoalbumdata;var elementPos = this.state.unaddedphotoalbumdata.map(function (item) {
                return item.photoalbum_id;
            }).indexOf(photoalbumid);newunaddedphotoalbumdataarray.splice(elementPos, 1);this.setState({ addedphotoalbumdata: newaddedphotoalbumdataarray, unaddedphotoalbumdata: newunaddedphotoalbumdataarray });
        }).bind(this);
    }, render: function render() {
        var projectsection_toggle_data = { isactive: null, projectsection_id: 5, activatebutton_text: 'retrieving active status...' };return React.createElement('div', null, React.createElement('div', { className: 'col-xs-12' }, React.createElement(ProjectsectionToggle, { project_id: this.props.data.project_id, projectsection_toggle_data: projectsection_toggle_data })), React.createElement(AddedPhotoalbums, { addedphotoalbumdata: this.state.addedphotoalbumdata, removeFromProject: this.removeFromProject }), React.createElement(UnaddedPhotoalbums, { unaddedphotoalbumdata: this.state.unaddedphotoalbumdata, addToProject: this.addToProject }));
    } });var AddedPhotoalbums = React.createClass({ displayName: 'AddedPhotoalbums', removeFromProject: function removeFromProject(data) {
        this.props.removeFromProject(data);
    }, render: function render() {
        var photoalbums = this.props.addedphotoalbumdata.map((function (photoalbum) {
            return React.createElement(AddedAlbum, { removeFromProject: this.removeFromProject, photoalbum_name: photoalbum.photoalbum_name, key: photoalbum.photoalbum_name, photoalbum_id: photoalbum.photoalbum_id });
        }).bind(this));var imgcontstyle = {};return React.createElement('div', { className: 'col-sm-4' }, React.createElement('br', null), React.createElement('h4', null, 'Added photo albums:'), photoalbums);
    } });var AddedAlbum = React.createClass({ displayName: 'AddedAlbum', getInitialState: function getInitialState() {
        return { showComponent: true, showNameChangeField: false };
    }, onClick: function onClick() {}, handleSuccess: function handleSuccess() {
        console.log('success');
    }, componentDidMount: function componentDidMount() {}, handleLinkClick: function handleLinkClick() {
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;$('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden;border:none;"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');$('#myModal').modal();
    }, handleRemovePhotos: function handleRemovePhotos() {
        var fullalbumlink = '//www.musiclocal.org/user/photos/albums/manage?photoalbum_id=' + this.props.id;$('#modalcontent2').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden;border:none;"></iframe><div style="display:block;text-align:center"><br><p></p></div>');$('#myModal2').modal();
    }, handleNameChangeClick: function handleNameChangeClick() {
        if (!this.state.showNameChangeField) {
            this.setState({ showNameChangeField: true });
        } else {
            this.setState({ showNameChangeField: false });
        }
    }, submitNameChange: function submitNameChange() {
        var albumid = this.props.id;var albumnamechangeref = '#' + this.props.refname;console.log(albumnamechangeref);var newalbumname = $(albumnamechangeref).val();console.log(newalbumname);$.ajax({ type: 'POST', url: 'user/ajax/post/changephotoalbumname', data: { 'photoalbum_id': albumid, 'photoalbum_name': newalbumname, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);location.reload();
            }).bind(this) });
    }, handleDeleteRequest: function handleDeleteRequest() {
        var photoalbumid = this.props.id;var r = confirm('Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: '/user/photos/albums/manage/delete', //dataType: "text"
                data: { 'photoalbum_id': photoalbumid, _token: $_token }, error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: function success(response) {
                    console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300); //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    //var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    //console.log(moveimage);
                    setstatefunction();
                } });var setstatefunction = (function (moveimage) {
                this.setState({ showComponent: false }); //console.log(moveimage);
                //this.props.onBannerAddClick({data: []});
                return;
            }).bind(this);
        } else {}
    }, removeFromProject: function removeFromProject() {
        this.props.removeFromProject(this.props);
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }if (!this.state.showNameChangeField) {
            var namechangediv = { display: 'none' };
        }var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var photostyle = { padding: '0.25%' }; //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';var photoalbumcontainerstyle = { width: '100%' };var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;var albumnamechangeref = 'albumnamechange-album' + this.props.id;return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />
            React.createElement('div', { className: 'row outershadow' }, React.createElement('div', { className: 'col-sm-12' }, React.createElement('p', null, this.props.photoalbum_name, ' ', React.createElement('a', { onClick: this.removeFromProject }, 'remove album from project')), React.createElement('p', null, React.createElement('a', { onClick: this.handleRemovePhotos }, 'view/remove photos')), React.createElement('p', null, React.createElement('a', { onClick: this.handleNameChangeClick }, 'Change album name')), React.createElement('div', { style: namechangediv }, React.createElement('input', { type: 'text', className: 'form-control' }), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitNameChange }, 'Submit'))), React.createElement('p', null, React.createElement('a', { onClick: this.handleLinkClick }, 'view album/embed code')), React.createElement('p', null, React.createElement('a', { onClick: this.handleDeleteRequest }, 'delete this album'))))
        );
    } });var UnaddedPhotoalbums = React.createClass({ displayName: 'UnaddedPhotoalbums', handleIntermediate: function handleIntermediate(moveimage) {
        console.log('triggered intermediate function'); //this.props.onBannerAddClick(moveimage);
    }, addToProject: function addToProject(data) {
        this.props.addToProject(data);
    }, render: function render() {
        var photoalbums = this.props.unaddedphotoalbumdata.map((function (photoalbum) {
            return React.createElement(UnaddedAlbum, { addToProject: this.addToProject, photoalbum_name: photoalbum.photoalbum_name, key: photoalbum.photoalbum_name, photoalbum_id: photoalbum.photoalbum_id });
        }).bind(this));var imgcontstyle = {};return React.createElement('div', { className: 'col-sm-8' }, React.createElement('br', null), React.createElement('h4', null, 'Unadded photo albums:'), photoalbums);
    } });var UnaddedAlbum = React.createClass({ displayName: 'UnaddedAlbum', getInitialState: function getInitialState() {
        return { showComponent: true, showNameChangeField: false };
    }, onClick: function onClick() {}, handleSuccess: function handleSuccess() {
        console.log('success');
    }, componentDidMount: function componentDidMount() {}, handleLinkClick: function handleLinkClick() {
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;$('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');$('#myModal').modal();
    }, handleRemovePhotos: function handleRemovePhotos() {
        var fullalbumlink = '//www.musiclocal.org/user/photos/albums/manage?photoalbum_id=' + this.props.id;$('#modalcontent2').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe><div style="display:block;text-align:center"><br><p></p></div>');$('#myModal2').modal();
    }, handleNameChangeClick: function handleNameChangeClick() {
        if (!this.state.showNameChangeField) {
            this.setState({ showNameChangeField: true });
        } else {
            this.setState({ showNameChangeField: false });
        }
    }, submitNameChange: function submitNameChange() {
        var albumid = this.props.id;var albumnamechangeref = '#' + this.props.refname;console.log(albumnamechangeref);var newalbumname = $(albumnamechangeref).val();console.log(newalbumname);$.ajax({ type: 'POST', url: 'user/ajax/post/changephotoalbumname', data: { 'photoalbum_id': albumid, 'photoalbum_name': newalbumname, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);location.reload();
            }).bind(this) });
    }, handleDeleteRequest: function handleDeleteRequest() {
        var photoalbumid = this.props.id;var r = confirm('Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: '/user/photos/albums/manage/delete', //dataType: "text"
                data: { 'photoalbum_id': photoalbumid, _token: $_token }, error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: function success(response) {
                    console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300); //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    //var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    //console.log(moveimage);
                    setstatefunction();
                } });var setstatefunction = (function (moveimage) {
                this.setState({ showComponent: false }); //console.log(moveimage);
                //this.props.onBannerAddClick({data: []});
                return;
            }).bind(this);
        } else {}
    }, addToProject: function addToProject() {
        console.log(this.props);this.props.addToProject(this.props);
    }, render: function render() {
        if (!this.state.showComponent) {
            return null;
        }if (!this.state.showNameChangeField) {
            var namechangediv = { display: 'none' };
        }var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var photostyle = { padding: '0.25%' }; //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';var photoalbumcontainerstyle = { width: '100%' };var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;var albumnamechangeref = 'albumnamechange-album' + this.props.id;return ( //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />
            React.createElement('div', { className: 'row nopadding outershadow' }, React.createElement('div', { className: 'col-sm-12' }, React.createElement('p', null, this.props.photoalbum_name, ' ', React.createElement('a', { onClick: this.addToProject }, 'add album to project')), React.createElement('p', null, React.createElement('a', { onClick: this.handleRemovePhotos }, 'view/remove photos')), React.createElement('p', null, React.createElement('a', { onClick: this.handleNameChangeClick }, 'Change album name')), React.createElement('div', { style: namechangediv }, React.createElement('input', { type: 'text', className: 'form-control', id: this.props.refname }), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitNameChange }, 'Submit'))), React.createElement('p', null, React.createElement('a', { onClick: this.handleLinkClick }, 'view album/embed code')), React.createElement('p', null, React.createElement('a', { onClick: this.handleDeleteRequest }, 'delete this album'))))
        );
    } });
'use strict';var ShowsProjectContainer = React.createClass({ displayName: 'ShowsProjectContainer', getInitialState: function getInitialState() {
        return { bandsintownwidget_artistname: '', bandsintownwidget_active: '', reverbnationwidget_url: 'https://www.reverbnation.com/', reverbnationwidget_script: '', tourwidget_selection: '' };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/bandsintownwidget/get', data: { project_id: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response);var bandsintownartistname = parsedresponse.bandsintownwidget_artistname;var bandsintownwidgetactive = parsedresponse.bandsintownwidget_active;this.setState({ bandsintownwidget_artistname: bandsintownartistname, bandsintownwidget_active: bandsintownwidgetactive });
            }).bind(this) });$.ajax({ type: 'GET', url: '/user/projects/tourwidgets/get', data: { project_id: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response);var bandsintownartistname = parsedresponse.bandsintownwidget_artistname;var reverbnationwidget_url = 'https://www.reverbnation.com/' + parsedresponse.reverbnationwidget_path;var reverbnationwidget_script = parsedresponse.reverbnationwidget_script;var tourwidget_selection = parsedresponse.tourwidget_selection;this.setState({ bandsintownwidget_artistname: bandsintownartistname, reverbnationwidget_url: reverbnationwidget_url, reverbationwidget_script: reverbnationwidget_script, tourwidget_selection: tourwidget_selection });
            }).bind(this) });
    }, submitBandsintownwidgetChange: function submitBandsintownwidgetChange() {
        var projectid = this.props.data.project_id;var bandsintownwidgetartistname = this.state.bandsintownwidget_artistname;$.ajax({ type: 'POST', url: '/user/projects/bandsintownwidget/addchange', data: { 'project_id': projectid, 'bandsintownwidget_artistname': bandsintownwidgetartistname, 'bandsintownwidget_active': true, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function () {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, submitTourwidgetChange: function submitTourwidgetChange() {
        var projectid = this.props.data.project_id;var bandsintownwidgetartistname = this.state.bandsintownwidget_artistname;var reverbnationwidget_url = this.state.reverbnationwidget_url;var reverbnationwidget_script = this.state.reverbnationwidget_script;var tourwidget_selection = this.state.tourwidget_selection;$.ajax({ type: 'POST', url: '/user/projects/tourwidgets/addchange', data: { 'project_id': projectid, 'bandsintownwidget_artistname': bandsintownwidgetartistname, 'reverbnationwidget_url': reverbnationwidget_url, 'reverbnationwidget_script': reverbnationwidget_script, 'tourwidget_selection': tourwidget_selection, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function () {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, handleTourwidgetSelectionEntry: function handleTourwidgetSelectionEntry(event) {
        this.setState({ tourwidget_selection: event.target.value });
    }, handleBandsintownwidgetTextEntry: function handleBandsintownwidgetTextEntry(event) {
        this.setState({ bandsintownwidget_artistname: event.target.value });
    }, handleReverbnationwidgetPathTextEntry: function handleReverbnationwidgetPathTextEntry(event) {
        this.setState({ reverbnationwidget_url: event.target.value });
    }, handleReverbnationwidgetScriptTextEntry: function handleReverbnationwidgetScriptTextEntry(event) {
        this.setState({ reverbnationwidget_script: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var bandsintownwidgetdefaulttext = this.state.bandsintownwidget_artistname;var reverbnationwidget_path_defaulttext = this.state.reverbnationwidget_url;var reverbnationwidget_script_defaulttext = this.state.reverbnationwidget_script;var projectsection_toggle_data = { isactive: null, projectsection_id: 2, activatebutton_text: 'retrieving active status...' };var tourwidget_selection_defaultvalue = this.state.tourwidget_selection;return React.createElement('div', { className: 'col-xs-12' }, React.createElement(ProjectsectionToggle, { project_id: this.props.data.project_id, projectsection_toggle_data: projectsection_toggle_data }), React.createElement('br', null), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'bandsintownwidgettextinput' }, 'Enter Bandsintown Artist Name:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'bandsintownwidgettextinput', className: 'form-control', value: bandsintownwidgetdefaulttext, onChange: this.handleBandsintownwidgetTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'reverbnationwidget_path_text_input' }, 'Enter Reverbnation URL:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'reverbnationwidget_path_text_input', className: 'form-control', value: reverbnationwidget_path_defaulttext, onChange: this.handleReverbnationwidgetPathTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'reverbnationwidget_script_text_input' }, 'Enter Reverbnation Embed Script Name:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('textarea', { rows: '6', id: 'reverbnationwidget_script_text_input', className: 'form-control', value: reverbnationwidget_script_defaulttext, onChange: this.handleReverbnationwidgetScriptTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'tourwidget_selection_input' }, 'Which tour widget would you like to use on your project\'s "Tour" section?'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('select', { name: 'tourwidget_selection', className: 'form-control', value: tourwidget_selection_defaultvalue, onChange: this.handleTourwidgetSelectionEntry }, React.createElement('option', { value: '1' }, 'BandsInTown'), React.createElement('option', { value: '2' }, 'ReverbNation')))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitTourwidgetChange }, 'Submit'))));
    } });
'use strict';var SocialAddContainer = React.createClass({ displayName: 'SocialAddContainer', getInitialState: function getInitialState() {
        return { facebook: [], twitter: [], instagram: [], instagramscript: [] };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/social/get', data: { project_id: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response);var facebookpageurl = 'https://www.facebook.com/' + parsedresponse.facebook;var twitterurl = 'https://twitter.com/' + parsedresponse.twitter;var instagramurl = 'https://instagram.com/' + parsedresponse.instagram;var instagramscript = parsedresponse.instagramscript;this.setState({ facebook: facebookpageurl, twitter: twitterurl, instagram: instagramurl, instagramscript: instagramscript });
            }).bind(this) });
    }, submitFacebookwidgetChange: function submitFacebookwidgetChange() {
        var projectid = this.props.data.project_id;var facebookwidgeturl = this.state.facebook;$.ajax({ type: 'POST', url: '/user/projects/facebookwidget/addchange', data: { 'project_id': projectid, 'facebookwidget_url': facebookwidgeturl, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, submitTwitterwidgetChange: function submitTwitterwidgetChange() {
        var projectid = this.props.data.project_id;var twitterwidgeturl = this.state.twitter;$.ajax({ type: 'POST', url: '/user/projects/twitterwidget/addchange', data: { 'project_id': projectid, 'twitterwidget_url': twitterwidgeturl, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, submitInstagramwidgetChange: function submitInstagramwidgetChange() {
        var projectid = this.props.data.project_id;var instagramwidgeturl = this.state.instagram;if (this.state.instagramscript == '') {
            var instagramwidgetscript = null;
        } else {
            var instagramwidgetscript = this.state.instagramscript;
        }$.ajax({ type: 'POST', url: '/user/projects/instagramwidget/addchange', data: { 'project_id': projectid, 'instagramwidget_url': instagramwidgeturl, 'instagramwidget_script': instagramwidgetscript, _token: $_token }, error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this) });
    }, handleFacebookTextEntry: function handleFacebookTextEntry(event) {
        this.setState({ facebook: event.target.value });
    }, handleTwitterTextEntry: function handleTwitterTextEntry(event) {
        this.setState({ twitter: event.target.value });
    }, handleInstagramTextEntry: function handleInstagramTextEntry(event) {
        this.setState({ instagram: event.target.value });
    }, handleInstagramscriptTextEntry: function handleInstagramscriptTextEntry(event) {
        this.setState({ instagramscript: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var facebookdefaulttext = this.state.facebook;var twitterdefaulttext = this.state.twitter;var instagramdefaulttext = this.state.instagram;var instagramscriptdefaulttext = this.state.instagramscript;var paddiv = { padding: 8 };var projectsection_toggle_data = { isactive: null, projectsection_id: 7, activatebutton_text: 'retrieving active status...' };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('br', null), React.createElement(ProjectsectionToggle, { project_id: this.props.data.project_id, projectsection_toggle_data: projectsection_toggle_data }), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'facebooktextinput' }, 'Enter Facebook Page URL:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'facebooktextinput', className: 'form-control', value: facebookdefaulttext, onChange: this.handleFacebookTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitFacebookwidgetChange }, 'Submit'))), React.createElement('div', { style: paddiv }), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'twittertextinput' }, 'Enter Twitter URL or Username:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'twittertextinput', className: 'form-control', value: twitterdefaulttext, onChange: this.handleTwitterTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitTwitterwidgetChange }, 'Submit'))), React.createElement('div', { style: paddiv }), React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'instagramtextinput' }, 'Enter Instagram URL or Username:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'instagramtextinput', className: 'form-control', value: instagramdefaulttext, onChange: this.handleInstagramTextEntry }))), React.createElement('div', { className: 'form-group' }, React.createElement('div', { className: 'col-xs-12' }, React.createElement('p', null, 'Note: Instagram does not offer an embeddable widget script. To get an Instagram widget script, try out a free service like ', React.createElement('a', { href: 'http://snapwidget.com/#getstarted', target: 'new' }, 'Snapwidget'), '. (Use a responsive widget if possible!)')), React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'instagramtextinput' }, 'Enter Instagram widget script:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('textarea', { className: 'form-control', rows: '5', id: 'instagramscripttextinput', value: instagramscriptdefaulttext, onChange: this.handleInstagramscriptTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitInstagramwidgetChange }, 'Submit'))));
    } });
'use strict';var VideoProjectContainer = React.createClass({ displayName: 'VideoProjectContainer', getInitialState: function getInitialState() {
        return { unaddedvideodata: [], addedvideodata: [] };
    }, componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;$.ajax({ type: 'GET', url: '/user/projects/videos/get', data: { projectid: projectid, _token: $_token }, error: {}, success: (function (response) {
                var parsedresponse = JSON.parse(response);var uniqueresponse = parsedresponse.uniquevideos;var projectresponse = parsedresponse.projectvideos; //console.log(foo.uniquebannerimages);
                this.setState({ unaddedvideodata: uniqueresponse, addedvideodata: projectresponse });
            }).bind(this) });
    }, addToProject: function addToProject(data) {
        var projectid = this.props.data.project_id;var youtubevideoid = data.youtubevideo_id;$.ajax({ type: 'POST', url: '/user/projects/videos/add', //dataType: "text"
            data: { 'project_id': projectid, 'youtubevideo_id': youtubevideoid, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newdataarray = this.state.addedvideodata;newdataarray.push(data);var newdata1array = this.state.unaddedvideodata;var elementPos = this.state.unaddedvideodata.map(function (item) {
                return item.youtubevideo_id;
            }).indexOf(youtubevideoid);newdata1array.splice(elementPos, 1);this.setState({ unaddedvideodata: newdata1array, addedvideodata: newdataarray });
        }).bind(this);
    }, removeFromProject: function removeFromProject(data) {
        var projectid = this.props.data.project_id;var youtubevideoid = data.youtubevideo_id;$.ajax({ type: 'POST', url: '/user/projects/videos/remove', //dataType: "text"
            data: { 'project_id': projectid, 'youtubevideo_id': youtubevideoid, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: function success(response) {
                console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
            } });var setstatefunction = (function () {
            var newdataarray = this.state.unaddedvideodata;newdataarray.push(data);var newdata1array = this.state.addedvideodata;var elementPos = this.state.addedvideodata.map(function (item) {
                return item.youtubevideo_id;
            }).indexOf(youtubevideoid);newdata1array.splice(elementPos, 1);this.setState({ unaddedvideodata: newdataarray, addedvideodata: newdata1array });
        }).bind(this);
    }, handleDeleteRequest: function handleDeleteRequest(data) {
        var youtubevideoid = data.youtubevideo_id;var r = confirm('Are you sure you want to delete this video? This will remove this video from all MusicLocal projects, but videos in other albums will not be affected. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: '/user/videos/youtubevideos/manage/delete', //dataType: "text"
                data: { 'youtubevideo_id': youtubevideoid, _token: $_token }, error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: function success(response) {
                    console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
                } });var setstatefunction = (function () {
                var newdataarray = this.state.addedvideodata;var newdata1array = this.state.unaddedvideodata;var elementPosData = this.state.addedvideodata.map(function (item) {
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid); //console.log(elementPosData);
                var elementPosData1 = this.state.unaddedvideodata.map(function (item) {
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid); //console.log(elementPosData1);
                if (elementPosData1 != -1) {
                    newdata1array.splice(elementPosData1, 1);
                }if (elementPosData != -1) {
                    newdataarray.splice(elementPosData, 1);
                }this.setState({ addedvideodata: newdataarray, unaddedvideodata: newdata1array });
            }).bind(this);
        } else {}
    }, render: function render() {
        var projectsection_toggle_data = { isactive: null, projectsection_id: 3, activatebutton_text: 'retrieving active status...' };return React.createElement('div', null, React.createElement('div', { className: 'col-xs-12' }, React.createElement('br', null), React.createElement(ProjectsectionToggle, { project_id: this.props.data.project_id, projectsection_toggle_data: projectsection_toggle_data })), React.createElement('div', { className: 'col-xs-12' }, React.createElement(AddedVideos, { addedvideodata: this.state.addedvideodata, removeFromProject: this.removeFromProject, handleDeleteRequest: this.handleDeleteRequest }), React.createElement(UnaddedVideos, { unaddedvideodata: this.state.unaddedvideodata, addToProject: this.addToProject, handleDeleteRequest: this.handleDeleteRequest })));
    } });var AddedVideos = React.createClass({ displayName: 'AddedVideos', handleDeleteRequest: function handleDeleteRequest(data) {
        this.props.handleDeleteRequest(data);
    }, removeFromProject: function removeFromProject(data) {
        this.props.removeFromProject(data);
    }, render: function render() {
        var videos = this.props.addedvideodata.map((function (video) {
            return React.createElement(AddedVideo, { identifier: video.youtubevideo_identifier, key: video.youtubevideo_identifier, id: video.youtubevideo_id, refname: 'videoname' + video.youtubevideo_identifier, removeFromProject: this.removeFromProject, handleDeleteRequest: this.handleDeleteRequest });
        }).bind(this));return React.createElement('div', null, React.createElement('h4', null, 'Added videos:'), videos);
    } });var AddedVideo = React.createClass({ displayName: 'AddedVideo', handleDeleteRequest: function handleDeleteRequest() {
        this.props.handleDeleteRequest({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    }, removeFromProject: function removeFromProject() {
        this.props.removeFromProject({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    }, render: function render() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';return React.createElement('div', { id: this.props.id, className: 'row outershadow' }, React.createElement('div', { className: 'col-sm-12' }, React.createElement('div', { className: 'embed-responsive embed-responsive-16by9' }, React.createElement('iframe', { className: 'embed-responsive-item', id: 'ytplayer', type: 'text/html', src: srcstring, allowFullScreen: true, frameBorder: '0' })), React.createElement('p', null, React.createElement('a', { onClick: this.removeFromProject }, 'remove video from project')), React.createElement('p', null, React.createElement('a', { onClick: this.handleDeleteRequest }, 'delete this video'))));
    } });var UnaddedVideos = React.createClass({ displayName: 'UnaddedVideos', handleDeleteRequest: function handleDeleteRequest(data) {
        this.props.handleDeleteRequest(data);
    }, addToProject: function addToProject(data) {
        this.props.addToProject(data);
    }, render: function render() {
        var videos = this.props.unaddedvideodata.map((function (video) {
            return React.createElement(UnaddedVideo, { identifier: video.youtubevideo_identifier, key: video.youtubevideo_identifier, id: video.youtubevideo_id, refname: 'videoname' + video.youtubevideo_identifier, addToProject: this.addToProject, handleDeleteRequest: this.handleDeleteRequest });
        }).bind(this));return React.createElement('div', null, React.createElement('br', null), React.createElement('h4', null, 'Unadded videos:'), videos);
    } });var UnaddedVideo = React.createClass({ displayName: 'UnaddedVideo', handleDeleteRequest: function handleDeleteRequest() {
        this.props.handleDeleteRequest({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    }, addToProject: function addToProject() {
        this.props.addToProject({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    }, render: function render() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';return React.createElement('div', { id: this.props.id, className: 'row nopadding outershadow' }, React.createElement('div', { className: 'col-sm-12' }, React.createElement('div', { className: 'embed-responsive embed-responsive-16by9' }, React.createElement('iframe', { className: 'embed-responsive-item', id: 'ytplayer', type: 'text/html', src: srcstring, allowFullScreen: true, frameBorder: '0' })), React.createElement('p', null, React.createElement('a', { onClick: this.addToProject }, 'add video to project')), React.createElement('p', null, React.createElement('a', { onClick: this.handleDeleteRequest }, 'delete this video'))));
    } });
'use strict';var VideoCreateContainer = React.createClass({ displayName: 'VideoCreateContainer', getInitialState: function getInitialState() {
        return { youtubevideo_identifier: [] };
    }, componentDidMount: function componentDidMount() {}, submitAddNewYoutubevideo: function submitAddNewYoutubevideo() {
        var youtubevideoidentifier = this.state.youtubevideo_identifier;$.ajax({ type: 'POST', url: 'user/videos', data: { 'youtubevideo_identifier': youtubevideoidentifier, _token: $_token }, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300); //var parsedresponse = JSON.parse(response);
                //this.setState({data: parsedresponse});
                ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.render(React.createElement(VideoContainer, { url: '' }), document.getElementById('content-main')); //location.reload();
                alert('Your video has been added.');
            }).bind(this) });
    }, handleYoutubevideoIdentifierTextEntry: function handleYoutubevideoIdentifierTextEntry(event) {
        this.setState({ youtubevideo_identifier: event.target.value });
    }, render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };var youtubevideoidentifierdefaulttext = this.state.youtubevideo_identifier; //var projecturldefaulttext = this.state.project_url;
        var paddiv = { padding: 8 };return React.createElement('div', { className: 'col-sm-12' }, React.createElement('form', { className: 'form-horizontal' }, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-sm-3 control-label', htmlFor: 'youtubevideoidentifiertextinput' }, 'Youtube Video URL:'), React.createElement('div', { className: 'col-sm-9' }, React.createElement('input', { type: 'text', id: 'youtubevideoidentifiertextinput', className: 'form-control', value: youtubevideoidentifierdefaulttext, onChange: this.handleYoutubevideoIdentifierTextEntry }))), React.createElement('div', { style: submitstyle }, React.createElement('a', { onClick: this.submitAddNewYoutubevideo }, 'Add Youtube Video'))));
    } });
'use strict';var VideoContainer = React.createClass({ displayName: 'VideoContainer', getInitialState: function getInitialState() {
        return { data: [] };
    }, componentDidMount: function componentDidMount() {
        $.ajax({ type: 'GET', url: 'user/ajax/get/get_current_user_youtubevideos', data: {}, error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }, success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse = JSON.parse(response);var youtubevideoresponse = parsedresponse.youtubevideoarray;this.setState({ data: youtubevideoresponse });
            }).bind(this) });
    }, handleDeleteRequest: function handleDeleteRequest(data) {
        var youtubevideoid = data.youtubevideo_id;var r = confirm('Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.');if (r == true) {
            $.ajax({ type: 'POST', url: '/user/videos/youtubevideos/manage/delete', //dataType: "text"
                data: { 'youtubevideo_id': youtubevideoid, _token: $_token }, error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }, success: function success(response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();
                } });var setstatefunction = (function () {
                var newdataarray = this.state.data;var elementPosData = this.state.data.map(function (item) {
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid);if (elementPosData != -1) {
                    newdataarray.splice(elementPosData, 1);
                }this.setState({ data: newdataarray });
            }).bind(this);
        } else {}
    }, render: function render() {
        return React.createElement('div', null, React.createElement(YoutubevideoList, { data: this.state.data, handleDeleteRequest: this.handleDeleteRequest }));
    } });var YoutubevideoList = React.createClass({ displayName: 'YoutubevideoList', handleDeleteRequest: function handleDeleteRequest(data) {
        this.props.handleDeleteRequest(data);
    }, render: function render() {
        var youtubevideos = this.props.data.map((function (youtubevideo) {
            return React.createElement(CurrentYoutubevideo, { identifier: youtubevideo.youtubevideo_identifier, id: youtubevideo.youtubevideo_id, key: youtubevideo.youtubevideo_identifier, handleDeleteRequest: this.handleDeleteRequest });
        }).bind(this));var imgcontstyle = {};return React.createElement('div', { className: 'row' }, youtubevideos);
    } });var CurrentYoutubevideo = React.createClass({ displayName: 'CurrentYoutubevideo', handleDeleteRequest: function handleDeleteRequest() {
        this.props.handleDeleteRequest({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    }, render: function render() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';return React.createElement('div', { id: this.props.id, className: 'col-xs-12 col-sm-6 col-md-4' }, React.createElement('div', { className: 'embed-responsive embed-responsive-16by9' }, React.createElement('iframe', { className: 'embed-responsive-item', id: 'ytplayer', type: 'text/html', src: srcstring, allowFullScreen: true, frameBorder: '0' })), React.createElement('div', null, React.createElement('a', { className: 'btn btn-warning btn-lg btn-block', onClick: this.handleDeleteRequest }, 'Remove')), React.createElement('br', null));
    } });
'use strict';var VideosMenu = React.createClass({ displayName: 'VideosMenu', getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'VideoContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'VideoCreateContainer', mountlocation: 'content-main', active: false }] };
    }, onLinkClick: function onLinkClick(data) {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').html('');$('#content-main').show();if (data == 'VideoContainer') {
            ReactDOM.render(React.createElement(VideoContainer, null), document.getElementById('content-main'));
        } else if (data == 'VideoCreateContainer') {
            ReactDOM.render(React.createElement(VideoCreateContainer, null), document.getElementById('content-main'));
        }
    }, componentWillUnmount: function componentWillUnmount() {
        $('#componentsbutton').removeClass('active');$('#componentschildtarget').html('').removeClass('active');
    }, render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(VideosMenuLink, { name: link.name, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));var middlestyle = { paddingLeft: 0, paddingRight: 0 };return React.createElement('div', { className: 'row nopadding' }, React.createElement(CollectionsBackButton, null), React.createElement('div', { className: 'col-xs-8 col-sm-2', style: middlestyle }, links), React.createElement('div', null, React.createElement('br', null)));
    } });var VideosMenuLink = React.createClass({ displayName: 'VideosMenuLink', onLinkClick: function onLinkClick() {
        this.props.onLinkClick(this.props.reactnodetomount);
    }, render: function render() {
        var name = this.props.name;if (name == 'Create') {
            var buttonclass = 'btn btn-block btn-success';
        } else if (name == 'Manage') {
            var buttonclass = 'btn btn-block btn-primary';
        } else {
            var buttonclass = '';
        }return React.createElement('div', null, React.createElement('div', { className: '' }, React.createElement('a', { className: buttonclass, onClick: this.onLinkClick }, this.props.name)), React.createElement('div', { className: 'clearfix visible-sm-block visible-md-block visible-lg-block' }));
    } });
//console.log('success');
//"projectid": projectid
//"projectid": projectid
//"projectid": projectid
/*
var projectid = $('#projectinfo').data('projectid');
$.ajax({
type: 'GET',
url: '/user/projects/social/get',
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
var facebookpageurl = 'https://www.facebook.com/' + parsedresponse.facebook;
var twitterurl = 'https://twitter.com/' + parsedresponse.twitter;
this.setState({facebook: facebookpageurl, twitter: twitterurl});
}.bind(this))
});
*/ //"projectid": projectid
//# sourceMappingURL=all.js.map