'use strict';

React.initializeTouchEvents(true);

var PhotoalbumProjectContainer = React.createClass({
    displayName: 'PhotoalbumProjectContainer',

    getInitialState: function getInitialState() {
        return { unaddedphotoalbumdata: [], addedphotoalbumdata: [] };
    },

    componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/photoalbums/get',
            data: {
                projectid: projectid,
                _token: $_token
            },
            error: {},
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.uniquephotoalbums;
                var projectresponse = parsedresponse.projectphotoalbums;
                console.log(projectresponse);
                this.setState({ unaddedphotoalbumdata: uniqueresponse, addedphotoalbumdata: projectresponse });
            }).bind(this)
        });
    },

    removeFromProject: function removeFromProject(datareceived) {
        var projectid = this.props.data.project_id;
        //console.log(datareceived);
        var photoalbumid = datareceived.photoalbum_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/photoalbums/remove",
            //dataType: "text"
            data: {
                "project_id": projectid,
                "photoalbum_id": photoalbumid,
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: function success(response) {
                console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            }
        });
        var setstatefunction = (function () {
            var newunaddedphotoalbumdataarray = this.state.unaddedphotoalbumdata;
            newunaddedphotoalbumdataarray.push(datareceived);
            var newaddedphotoalbumdataarray = this.state.addedphotoalbumdata;
            var elementPos = this.state.addedphotoalbumdata.map(function (item) {
                return item.photoalbum_id;
            }).indexOf(photoalbumid);
            newaddedphotoalbumdataarray.splice(elementPos, 1);
            this.setState({ addedphotoalbumdata: newaddedphotoalbumdataarray, unaddedphotoalbumdata: newunaddedphotoalbumdataarray });
        }).bind(this);
    },

    addToProject: function addToProject(datareceived) {
        var projectid = this.props.data.project_id;
        var photoalbumid = datareceived.photoalbum_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/photoalbums/add",
            //dataType: "text"
            data: {
                "project_id": projectid,
                "photoalbum_id": photoalbumid,
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: function success(response) {
                console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            }
        });
        var setstatefunction = (function () {
            var newaddedphotoalbumdataarray = this.state.addedphotoalbumdata;
            newaddedphotoalbumdataarray.push(datareceived);
            var newunaddedphotoalbumdataarray = this.state.unaddedphotoalbumdata;
            var elementPos = this.state.unaddedphotoalbumdata.map(function (item) {
                return item.photoalbum_id;
            }).indexOf(photoalbumid);
            newunaddedphotoalbumdataarray.splice(elementPos, 1);
            this.setState({ addedphotoalbumdata: newaddedphotoalbumdataarray, unaddedphotoalbumdata: newunaddedphotoalbumdataarray });
        }).bind(this);
    },

    render: function render() {

        return React.createElement(
            'div',
            null,
            React.createElement(AddedPhotoalbums, { addedphotoalbumdata: this.state.addedphotoalbumdata, removeFromProject: this.removeFromProject }),
            React.createElement(UnaddedPhotoalbums, { unaddedphotoalbumdata: this.state.unaddedphotoalbumdata, addToProject: this.addToProject })
        );
    }
});

var AddedPhotoalbums = React.createClass({
    displayName: 'AddedPhotoalbums',

    removeFromProject: function removeFromProject(data) {
        this.props.removeFromProject(data);
    },

    render: function render() {
        var photoalbums = this.props.addedphotoalbumdata.map((function (photoalbum) {
            return React.createElement(AddedAlbum, { removeFromProject: this.removeFromProject, photoalbum_name: photoalbum.photoalbum_name, key: photoalbum.photoalbum_name, photoalbum_id: photoalbum.photoalbum_id });
        }).bind(this));
        var imgcontstyle = {};
        return React.createElement(
            'div',
            { className: 'col-sm-4' },
            React.createElement('br', null),
            React.createElement(
                'h4',
                null,
                'Added photo albums:'
            ),
            photoalbums
        );
    }
});

var AddedAlbum = React.createClass({
    displayName: 'AddedAlbum',

    getInitialState: function getInitialState() {
        return { showComponent: true, showNameChangeField: false };
    },

    onClick: function onClick() {},

    handleSuccess: function handleSuccess() {
        console.log('success');
    },

    componentDidMount: function componentDidMount() {},

    handleLinkClick: function handleLinkClick() {
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        $('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden;border:none;"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');
        $('#myModal').modal();
    },

    handleRemovePhotos: function handleRemovePhotos() {

        var fullalbumlink = '//www.musiclocal.org/user/photos/albums/manage?photoalbum_id=' + this.props.id;
        $('#modalcontent2').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden;border:none;"></iframe><div style="display:block;text-align:center"><br><p></p></div>');
        $('#myModal2').modal();
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

    removeFromProject: function removeFromProject() {
        this.props.removeFromProject(this.props);
    },

    render: function render() {
        if (!this.state.showComponent) {
            return null;
        }
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
                { className: 'row outershadow' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(
                        'p',
                        null,
                        this.props.photoalbum_name,
                        ' ',
                        React.createElement(
                            'a',
                            { onClick: this.removeFromProject },
                            'remove album from project'
                        )
                    ),
                    React.createElement(
                        'p',
                        null,
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
                        React.createElement('input', { type: 'text', className: 'form-control' }),
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

var UnaddedPhotoalbums = React.createClass({
    displayName: 'UnaddedPhotoalbums',

    handleIntermediate: function handleIntermediate(moveimage) {

        console.log('triggered intermediate function');
        //this.props.onBannerAddClick(moveimage);
    },

    addToProject: function addToProject(data) {
        this.props.addToProject(data);
    },

    render: function render() {
        var photoalbums = this.props.unaddedphotoalbumdata.map((function (photoalbum) {
            return React.createElement(UnaddedAlbum, { addToProject: this.addToProject, photoalbum_name: photoalbum.photoalbum_name, key: photoalbum.photoalbum_name, photoalbum_id: photoalbum.photoalbum_id });
        }).bind(this));
        var imgcontstyle = {};
        return React.createElement(
            'div',
            { className: 'col-sm-8' },
            React.createElement('br', null),
            React.createElement(
                'h4',
                null,
                'Unadded photo albums:'
            ),
            photoalbums
        );
    }
});

var UnaddedAlbum = React.createClass({
    displayName: 'UnaddedAlbum',

    getInitialState: function getInitialState() {
        return { showComponent: true, showNameChangeField: false };
    },

    onClick: function onClick() {},

    handleSuccess: function handleSuccess() {
        console.log('success');
    },

    componentDidMount: function componentDidMount() {},

    handleLinkClick: function handleLinkClick() {
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        $('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');
        $('#myModal').modal();
    },

    handleRemovePhotos: function handleRemovePhotos() {

        var fullalbumlink = '//www.musiclocal.org/user/photos/albums/manage?photoalbum_id=' + this.props.id;
        $('#modalcontent2').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe><div style="display:block;text-align:center"><br><p></p></div>');
        $('#myModal2').modal();
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
            url: "/changephotoalbumname",
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

    addToProject: function addToProject() {
        console.log(this.props);
        this.props.addToProject(this.props);
    },

    render: function render() {
        if (!this.state.showComponent) {
            return null;
        }
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
                { className: 'row nopadding outershadow' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(
                        'p',
                        null,
                        this.props.photoalbum_name,
                        ' ',
                        React.createElement(
                            'a',
                            { onClick: this.addToProject },
                            'add album to project'
                        )
                    ),
                    React.createElement(
                        'p',
                        null,
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