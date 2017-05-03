var VideoProjectContainer = React.createClass({

    getInitialState: function(){
        return {unaddedvideodata: [], addedvideodata: []};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/videos/get',
            data: {
                projectid: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.uniquevideos;
                var projectresponse = parsedresponse.projectvideos;
                //console.log(foo.uniquebannerimages);
                this.setState({unaddedvideodata: uniqueresponse, addedvideodata: projectresponse});
            }.bind(this))
        });
    },

    addToProject: function(data) {
        var projectid = this.props.data.project_id;
        var youtubevideoid = data.youtubevideo_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/videos/add",
            data: {
                "project_id": projectid,
                "youtubevideo_id": youtubevideoid,
                _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                console.log(response);
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newdataarray = this.state.addedvideodata;
            newdataarray.push(data);
            var newdata1array = this.state.unaddedvideodata;
            var elementPos = this.state.unaddedvideodata.map(function(item){
                return item.youtubevideo_id;
            }).indexOf(youtubevideoid);
            newdata1array.splice(elementPos, 1);
            this.setState({unaddedvideodata: newdata1array, addedvideodata: newdataarray});
        }.bind(this)
    },

    removeFromProject: function(data) {
        var projectid = this.props.data.project_id;
        var youtubevideoid = data.youtubevideo_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/videos/remove",
            data: {
                "project_id": projectid,
                "youtubevideo_id": youtubevideoid,
                _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newdataarray = this.state.unaddedvideodata;
            newdataarray.push(data);
            var newdata1array = this.state.addedvideodata;
            var elementPos = this.state.addedvideodata.map(function(item){
                return item.youtubevideo_id;
            }).indexOf(youtubevideoid);
            newdata1array.splice(elementPos, 1);
            this.setState({unaddedvideodata: newdataarray, addedvideodata: newdata1array});
        }.bind(this)
    },

    handleDeleteRequest: function(data){
        var youtubevideoid = data.youtubevideo_id;
        var r = confirm("Are you sure you want to delete this video? This will remove this video from all MusicLocal projects, but videos in other albums will not be affected. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "/user/videos/youtubevideos/manage/delete",
                data: {
                    "youtubevideo_id": youtubevideoid,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    setstatefunction();
                })
            });
            var setstatefunction = function(){
                var newdataarray = this.state.addedvideodata;
                var newdata1array = this.state.unaddedvideodata;
                var elementPosData = this.state.addedvideodata.map(function(item){
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid);
                var elementPosData1 = this.state.unaddedvideodata.map(function(item){
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid);

                if (elementPosData1 != -1){
                newdata1array.splice(elementPosData1, 1);
                }
                if (elementPosData != -1){
                newdataarray.splice(elementPosData, 1);
                }
                this.setState({addedvideodata: newdataarray, unaddedvideodata: newdata1array});
            }.bind(this);
        }
        else {}
    },

    handleAddVideo: function(){
        ReactDOM.render(<UnaddedVideos unaddedvideodata={this.state.unaddedvideodata} addToProject={this.addToProject} handleDeleteRequest={this.handleDeleteRequest}/>, document.getElementById("content-menu"));
    },

    render: function(){
        var projectsection_toggle_data = {isactive: null, projectsection_id: 3, activatebutton_text: 'retrieving active status...'};
        return (
            <div>
                <div><br/>
                    <ProjectsectionToggle project_id={this.props.data.project_id} projectsection_toggle_data={projectsection_toggle_data}/>
                </div>
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <a className="btn btn-primary btn-block" onClick={this.handleAddVideo} >Add Video</a>
                </div>
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <AddedVideos addedvideodata={this.state.addedvideodata} removeFromProject={this.removeFromProject} handleDeleteRequest={this.handleDeleteRequest}/>
                </div>
                <div className="col-xs-12">

                </div>
            </div>
        );
    }
});

var AddedVideos = React.createClass({

    handleDeleteRequest: function(data){
        this.props.handleDeleteRequest(data);
    },

    removeFromProject: function(data){
        this.props.removeFromProject(data);
    },

    render:function(){
        var videos = this.props.addedvideodata.map(function(video){
            return <AddedVideo identifier={video.youtubevideo_identifier} key={video.youtubevideo_identifier} id={video.youtubevideo_id} refname={'videoname' + video.youtubevideo_identifier} removeFromProject={this.removeFromProject} handleDeleteRequest={this.handleDeleteRequest}/>
        }.bind(this));
        return (
            <div >
            <h4>Added videos:</h4>
                {videos}
            </div>
        );
    }
});

var AddedVideo = React.createClass ({

    handleDeleteRequest: function(){
        this.props.handleDeleteRequest({youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier});
    },

    removeFromProject: function() {
        this.props.removeFromProject({youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier});
    },

    render: function() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';
        var padding = {paddingBottom:10};
        return (
            <div id={this.props.id} style={padding}>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" id="ytplayer" type="text/html" src={srcstring} allowFullScreen frameBorder="0"/>
                </div>
                <a className="btn btn-warning btn-block" onClick={this.removeFromProject}>Remove video from project</a>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
});

var UnaddedVideos = React.createClass ({

    handleDeleteRequest: function(data){
        this.props.handleDeleteRequest(data);
    },

    addToProject: function(data){
        this.props.addToProject(data)
    },

    handleAddNew: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.render(<BackgroundimageCreationPanel/>, document.getElementById('content-modal'));
    },

    render:function(){
        var videos = this.props.unaddedvideodata.map(function(video){
            return <UnaddedVideo identifier={video.youtubevideo_identifier} key={video.youtubevideo_identifier} id={video.youtubevideo_id} refname={'videoname' + video.youtubevideo_identifier} addToProject={this.addToProject} handleDeleteRequest={this.handleDeleteRequest} />
        }.bind(this));
        return (
            <div >
                <a className="btn btn-success btn-block" onClick={this.handleAddNew}>Add New Video</a>
            <br/>
            <h4>Unadded videos:</h4>
                {videos}
            </div>
        );
    }
});

var UnaddedVideo = React.createClass ({

    handleDeleteRequest: function(){
        this.props.handleDeleteRequest({youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier});
    },

    addToProject: function() {
        this.props.addToProject({youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier});
    },

    render: function() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';
        return (
            <div id={this.props.id} className="row nopadding outershadow">
                <div className="col-xs-12 col-sm-6">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" id="ytplayer" type="text/html" src={srcstring} allowFullScreen frameBorder="0"/>
                    </div>
                    <p><a onClick={this.addToProject}>add video to project</a></p>
                    <p><a onClick={this.handleDeleteRequest} >delete this video</a></p>
                </div>
            </div>
        );
    }
});