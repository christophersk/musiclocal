'use strict';

React.initializeTouchEvents(true);

var PhotoalbumContainer = React.createClass({
    displayName: 'PhotoalbumContainer',

    getInitialState: function getInitialState() {
        return { data: [], data1: [], data2: [], data3: [] };
    },

    updateDimensions: function updateDimensions() {
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

    componentDidMount: function componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        //var cont = React.findDOMNode(this.refs.fbphotodisplay);
        var postop = $('#content-main').offset().top;
        var endofcontainer = $('#endofcontainer').offset().top;
        var height = $('#fbphotodisplay').scrollHeight;
        var visiblecontainerheight = $('#fbphotodisplay').height();
        var heightpastvisiblecontainer = height - visiblecontainerheight;

        //below is from "add album" page
        var projectid = $('#projectinfo').data('projectid');
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_user_photoalbums",
            data: {
                //"projectid": projectid
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var parsedresponse = JSON.parse(response);
                var photoalbumresponse = parsedresponse.photoalbumarray;
                //var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({ data2: photoalbumresponse });
                //renderreact(uniqueresponse, projectresponse);
            }).bind(this)
        });
        $(document).ready((function () {

            this.getPhotosFromFacebook();
        }).bind(this));
    },

    getPhotosFromFacebook: function getPhotosFromFacebook(paginationclick, dataarray) {
        console.log('getphotos triggered');
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
                    alert('You are not logged in. Please refresh the page.');
                }
            });
        });
        var renderreact = (function (dataarray, pagination, getnextresultslink) {
            this.setState({ data: dataarray, data1: pagination, data3: getnextresultslink });
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
        var paginationclick = this.state.data3;
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

        var style2 = { textAlign: 'center' };
        var facebookphotodisplaystyle = { height: innerh - postop - 80, overflow: 'auto' };
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'col-sm-12 nopadding', id: 'instructions' },
                React.createElement(
                    'div',
                    { style: style2 },
                    React.createElement(
                        'h3',
                        null,
                        'To add photos to a photo album, drag the photo on top of the photo album name. (Duplicates will be automatically ignored.)'
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'em',
                            null,
                            'To assign existing photo albums to projects, visit your projects page.'
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-4' },
                React.createElement(PhotoalbumList, { data2: this.state.data2, onBannerAddClick: this.handleBannerAdd })
            ),
            React.createElement(
                'div',
                { className: 'col-sm-8', style: containerstyle },
                React.createElement(
                    'div',
                    { id: 'fbphotodisplay', ref: 'fbphotodisplay', style: facebookphotodisplaystyle, onScroll: this.handleScroll },
                    React.createElement(PhotoList, { data: this.state.data })
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement('div', { id: 'endofcontainer' })
            )
        );
    }
});

var PhotoalbumList = React.createClass({
    displayName: 'PhotoalbumList',

    render: function render() {
        var photoalbums = this.props.data2.map(function (photoalbum) {
            return React.createElement(CurrentAlbum, { name: photoalbum.photoalbum_name, key: photoalbum.photoalbum_name, id: photoalbum.photoalbum_id, currentphotos: photoalbum.photoalbum_currentphotos, refname: 'albumname' + photoalbum.photoalbum_id });
        });
        var imgcontstyle = {};
        return React.createElement(
            'div',
            null,
            React.createElement('br', null),
            React.createElement(
                'h4',
                null,
                'Your photo albums:'
            ),
            photoalbums
        );
    }
});

var CurrentAlbum = React.createClass({
    displayName: 'CurrentAlbum',

    getInitialState: function getInitialState() {
        return { showComponent: true, showNameChangeField: false };
    },

    onClick: function onClick() {},

    handleSuccess: function handleSuccess() {
        console.log('success');
    },

    componentDidMount: function componentDidMount() {
        var albumid = this.props.id;
        var albumidhash = '#' + this.props.id;
        $(albumidhash).droppable({
            drop: function drop(event, ui) {
                console.log(ui);
                console.log('drop registered');
                var findid = ui.draggable[0].dataset.facebookid;
                var findlink0 = ui.draggable[0].dataset.facebooklink0;
                var fromname = ui.draggable[0].dataset.fromname;
                var fromid = ui.draggable[0].dataset.fromid;
                var fb_created_time = ui.draggable[0].dataset.fb_created_time;
                console.log(albumid);
                console.log(findid);
                $(this);
                $.ajax({
                    type: "POST",
                    url: "user/ajax/post/add_phototophotoalbum",
                    data: {
                        "from_id": fromid,
                        "fb_created_time": fb_created_time,
                        "from_name": fromname,
                        "photoalbum_id": albumid,
                        "facebookphoto_identifier": findid,
                        "facebookphoto_link0": findlink0,
                        _token: $_token
                    },
                    error: function error() {
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    },
                    success: (function (response) {
                        //console.log(response);
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                        successfunction();
                    }).bind(this)
                });
            }
        });

        var successfunction = (function () {
            this.handleSuccess();
        }).bind(this);
    },

    handleLinkClick: function handleLinkClick() {
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        $('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden; border:none"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');
        $('#myModal').modal();
    },

    handleRemovePhotos: function handleRemovePhotos() {

        var fullalbumlink = '/user/photos/albums/manage?photoalbum_id=' + this.props.id;
        $('#content-main').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden; border:none"></iframe><div style="display:block;text-align:center"><br><p></p></div>');
        //$('#myModal2').modal();
    },

    handleNameChangeClick: function handleNameChangeClick() {
        if (!this.state.showNameChangeField) {
            this.setState({ showNameChangeField: true });
        } else {
            this.setState({ showNameChangeField: false });
        }
    },

    submitNameChange: function submitNameChange() {
        var albumid = this.props.id;
        var albumnamechangeref = '#' + this.props.refname;
        console.log(albumnamechangeref);
        var newalbumname = $(albumnamechangeref).val();
        console.log(newalbumname);
        $.ajax({
            type: "POST",
            url: "user/ajax/post/changephotoalbumname",
            data: {
                "photoalbum_id": albumid,
                "photoalbum_name": newalbumname,
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                location.reload();
            }).bind(this)
        });
    },

    handleDeleteRequest: function handleDeleteRequest() {
        var photoalbumid = this.props.id;
        var r = confirm("Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "/user/photos/albums/manage/delete",
                //dataType: "text"
                data: {
                    "photoalbum_id": photoalbumid,
                    _token: $_token
                },
                error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                },
                success: function success(response) {
                    console.log(response);
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    //var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    //console.log(moveimage);
                    setstatefunction();
                }
            });
            var setstatefunction = (function (moveimage) {
                this.setState({ showComponent: false });
                //console.log(moveimage);
                //this.props.onBannerAddClick({data: []});
                return;
            }).bind(this);
        } else {}
    },

    render: function render() {
        if (!this.state.showComponent) {
            return null;
        }
        var albumphotos = this.props.currentphotos.map(function (albumphoto) {
            return React.createElement(AlbumPhoto, { identifier: albumphoto.facebookphoto_identifier, filename: albumphoto.facebookphoto_filename });
        });
        if (!this.state.showNameChangeField) {
            var namechangediv = { display: 'none' };
        }
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var photostyle = { padding: '0.25%' };
        //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        var photoalbumcontainerstyle = { width: '100%' };
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        var albumnamechangeref = 'albumnamechange-album' + this.props.id;
        return(
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />

            React.createElement(
                'div',
                { id: this.props.id, className: 'row nopadding outershadow' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(
                        'p',
                        null,
                        this.props.name,
                        ' ',
                        React.createElement(
                            'a',
                            { onClick: this.handleRemovePhotos },
                            'view/remove photos'
                        )
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'a',
                            { onClick: this.handleNameChangeClick },
                            'Change album name'
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: namechangediv },
                        React.createElement('input', { type: 'text', className: 'form-control', id: this.props.refname }),
                        React.createElement(
                            'div',
                            { style: submitstyle },
                            React.createElement(
                                'a',
                                { onClick: this.submitNameChange },
                                'Submit'
                            )
                        )
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'a',
                            { onClick: this.handleLinkClick },
                            'view album/embed code'
                        )
                    ),
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'a',
                            { onClick: this.handleDeleteRequest },
                            'delete this album'
                        )
                    )
                )
            )
        );
    }
});

var AlbumPhoto = React.createClass({
    displayName: 'AlbumPhoto',

    getInitialState: function getInitialState() {
        return { maxheight: null, postopadjust: null };
    },

    componentDidMount: function componentDidMount() {

        //var thephoto = new Image();
        //var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0/' + name + '.jpg';
        //thephoto.crossOrigin = "Anonymous";
        //$(thephoto).attr('data-caman-hidpi-disabled', '');
        //thephoto.src = srcstring;
        //var = this.props.identifier;

        //document.getElementById(idhash).addEventListener("load", function() {
        //$(window).load(function(){
        //console.log('ffsdf');
        var idhash = '#' + this.props.identifier;
        //console.log(idhash);
        var imgwidth = $(idhash).width();
        console.log('initial image width is ' + imgwidth);
        var imgheight = $(idhash).height();
        //console.log('initial image height is ' + imgheight);
        var calcmaxheight = imgwidth * 0.6666667;
        //console.log('calc image height is ' + calcmaxheight);
        var heightdifference = imgheight - calcmaxheight;
        var posadjust = heightdifference / 2;
        //console.log(posadjust);
        this.setState({ maxheight: calcmaxheight, postopadjust: posadjust });
        //}.bind(this), false);
    },

    render: function render() {
        var name = this.props.filename;
        var imgid = 'img-' + this.props.identifier;
        var imgidhash = '#' + imgid;
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0/' + name + '.jpg';
        var imgdiv = { padding: '0.25%', maxHeight: this.state.maxheight, overflow: 'hidden' };
        var idhash = '#' + this.props.identifier;
        var imgstyle = { position: 'relative' };
        var helper = { display: 'inline-block', verticalAlign: 'middle', height: '100%' };
        return React.createElement(
            'div',
            { id: this.props.identifier, className: 'col-sm-4', style: imgdiv },
            React.createElement('img', { className: 'img img-responsive', src: srcstring, ref: this.props.identifier, id: imgid, style: imgstyle })
        );
    }
});

var PhotoList = React.createClass({
    displayName: 'PhotoList',

    render: function render() {
        console.log('here');
        console.log(this.props.data);
        var photos = this.props.data.map(function (photo) {
            return React.createElement(CurrentPhoto, { link0: photo.link0, link3: photo.link3, key: photo.id, id: photo.id, from_name: photo.from_name, from_id: photo.from_id, fb_created_time: photo.fb_created_time });
        });
        var imgcontstyle = {};
        return React.createElement(
            'div',
            { className: 'grid', id: 'get-user-photos-from-facebook' },
            React.createElement('div', { className: 'grid-sizer' }),
            React.createElement(
                'div',
                { id: 'fbphotoscrollcontainer', ref: 'fbphotoscrollcontainer', style: imgcontstyle },
                photos
            )
        );
    }
});

var CurrentPhoto = React.createClass({
    displayName: 'CurrentPhoto',

    onClick: function onClick() {},

    componentDidMount: function componentDidMount() {
        var idhash = '#' + this.props.id;
        $(idhash).draggable({ opacity: 0.7, helper: "clone", cursor: "move", cursorAt: { top: 56, left: 56 } });
    },

    render: function render() {
        var photostyle = { padding: '0.25%' };
        return(
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            React.createElement(
                'div',
                { className: 'grid-item grid-item--width3', id: this.props.id, ref: 'draggable', 'data-facebookid': this.props.id, 'data-facebooklink0': this.props.link0, 'data-fromname': this.props.from_name, 'data-fromid': this.props.from_id, 'data-fb_created_time': this.props.fb_created_time },
                React.createElement('img', { style: photostyle, onClick: this.onClick, src: this.props.link3, 'data-link0': this.props.link0, id: this.props.id, 'data-fromid': this.props.from_id, 'data-from_name': this.props.from_name, 'data-fb_created_time': this.props.fb_created_time })
            )
        );
    }
});