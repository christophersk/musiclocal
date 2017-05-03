'use strict';

React.initializeTouchEvents(true);

var VideoProjectContainer = React.createClass({
    displayName: 'VideoProjectContainer',

    getInitialState: function getInitialState() {
        return { unaddedvideodata: [], addedvideodata: [] };
    },

    componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/videos/get',
            data: {
                projectid: projectid,
                _token: $_token
            },
            error: {},
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.uniquevideos;
                var projectresponse = parsedresponse.projectvideos;
                //console.log(foo.uniquebannerimages);
                this.setState({ unaddedvideodata: uniqueresponse, addedvideodata: projectresponse });
            }).bind(this)
        });
    },

    addToProject: function addToProject(data) {
        var projectid = this.props.data.project_id;
        var youtubevideoid = data.youtubevideo_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/videos/add",
            //dataType: "text"
            data: {
                "project_id": projectid,
                "youtubevideo_id": youtubevideoid,
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
            var newdataarray = this.state.addedvideodata;
            newdataarray.push(data);
            var newdata1array = this.state.unaddedvideodata;
            var elementPos = this.state.unaddedvideodata.map(function (item) {
                return item.youtubevideo_id;
            }).indexOf(youtubevideoid);
            newdata1array.splice(elementPos, 1);
            this.setState({ unaddedvideodata: newdata1array, addedvideodata: newdataarray });
        }).bind(this);
    },

    removeFromProject: function removeFromProject(data) {
        var projectid = this.props.data.project_id;
        var youtubevideoid = data.youtubevideo_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/videos/remove",
            //dataType: "text"
            data: {
                "project_id": projectid,
                "youtubevideo_id": youtubevideoid,
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
            var newdataarray = this.state.unaddedvideodata;
            newdataarray.push(data);
            var newdata1array = this.state.addedvideodata;
            var elementPos = this.state.addedvideodata.map(function (item) {
                return item.youtubevideo_id;
            }).indexOf(youtubevideoid);
            newdata1array.splice(elementPos, 1);
            this.setState({ unaddedvideodata: newdataarray, addedvideodata: newdata1array });
        }).bind(this);
    },

    handleDeleteRequest: function handleDeleteRequest(data) {
        var youtubevideoid = data.youtubevideo_id;
        var r = confirm("Are you sure you want to delete this video? This will remove this video from all MusicLocal projects, but videos in other albums will not be affected. WARNING: this action cannot be undone.");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "/user/videos/youtubevideos/manage/delete",
                //dataType: "text"
                data: {
                    "youtubevideo_id": youtubevideoid,
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
                var newdataarray = this.state.addedvideodata;
                var newdata1array = this.state.unaddedvideodata;
                var elementPosData = this.state.addedvideodata.map(function (item) {
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid);
                //console.log(elementPosData);
                var elementPosData1 = this.state.unaddedvideodata.map(function (item) {
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid);
                //console.log(elementPosData1);

                if (elementPosData1 != -1) {
                    newdata1array.splice(elementPosData1, 1);
                }
                if (elementPosData != -1) {
                    newdataarray.splice(elementPosData, 1);
                }
                this.setState({ addedvideodata: newdataarray, unaddedvideodata: newdata1array });
            }).bind(this);
        } else {}
    },

    render: function render() {

        return React.createElement(
            'div',
            { className: 'col-xs-12' },
            React.createElement('br', null),
            React.createElement(AddedVideos, { addedvideodata: this.state.addedvideodata, removeFromProject: this.removeFromProject, handleDeleteRequest: this.handleDeleteRequest }),
            React.createElement(UnaddedVideos, { unaddedvideodata: this.state.unaddedvideodata, addToProject: this.addToProject, handleDeleteRequest: this.handleDeleteRequest })
        );
    }
});

var AddedVideos = React.createClass({
    displayName: 'AddedVideos',

    handleDeleteRequest: function handleDeleteRequest(data) {
        this.props.handleDeleteRequest(data);
    },

    removeFromProject: function removeFromProject(data) {
        this.props.removeFromProject(data);
    },

    render: function render() {
        var videos = this.props.addedvideodata.map((function (video) {
            return React.createElement(AddedVideo, { identifier: video.youtubevideo_identifier, key: video.youtubevideo_identifier, id: video.youtubevideo_id, refname: 'videoname' + video.youtubevideo_identifier, removeFromProject: this.removeFromProject, handleDeleteRequest: this.handleDeleteRequest });
        }).bind(this));
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h4',
                null,
                'Added videos:'
            ),
            videos
        );
    }
});

var AddedVideo = React.createClass({
    displayName: 'AddedVideo',

    handleDeleteRequest: function handleDeleteRequest() {
        this.props.handleDeleteRequest({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    },

    removeFromProject: function removeFromProject() {
        this.props.removeFromProject({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    },

    render: function render() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';
        return React.createElement(
            'div',
            { id: this.props.id, className: 'row outershadow' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'div',
                    { 'class': 'embed-responsive embed-responsive-16by9' },
                    React.createElement('iframe', { 'class': 'embed-responsive-item', id: 'ytplayer', type: 'text/html', src: srcstring, allowFullScreen: true, frameBorder: '0' })
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.removeFromProject },
                        'remove video from project'
                    )
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.handleDeleteRequest },
                        'delete this video'
                    )
                )
            )
        );
    }
});

var UnaddedVideos = React.createClass({
    displayName: 'UnaddedVideos',

    handleDeleteRequest: function handleDeleteRequest(data) {
        this.props.handleDeleteRequest(data);
    },

    addToProject: function addToProject(data) {
        this.props.addToProject(data);
    },

    render: function render() {
        var videos = this.props.unaddedvideodata.map((function (video) {
            return React.createElement(UnaddedVideo, { identifier: video.youtubevideo_identifier, key: video.youtubevideo_identifier, id: video.youtubevideo_id, refname: 'videoname' + video.youtubevideo_identifier, addToProject: this.addToProject, handleDeleteRequest: this.handleDeleteRequest });
        }).bind(this));
        return React.createElement(
            'div',
            null,
            React.createElement('br', null),
            React.createElement(
                'h4',
                null,
                'Unadded videos:'
            ),
            videos
        );
    }
});

var UnaddedVideo = React.createClass({
    displayName: 'UnaddedVideo',

    handleDeleteRequest: function handleDeleteRequest() {
        this.props.handleDeleteRequest({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    },

    addToProject: function addToProject() {
        this.props.addToProject({ youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier });
    },

    render: function render() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';
        return React.createElement(
            'div',
            { id: this.props.id, className: 'row nopadding outershadow' },
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'div',
                    { 'class': 'embed-responsive embed-responsive-16by9' },
                    React.createElement('iframe', { 'class': 'embed-responsive-item', id: 'ytplayer', type: 'text/html', src: srcstring, allowFullScreen: true, frameBorder: '0' })
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.addToProject },
                        'add video to project'
                    )
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'a',
                        { onClick: this.handleDeleteRequest },
                        'delete this video'
                    )
                )
            )
        );
    }
});