var VideoContainer = React.createClass ({

    getInitialState: function(){
        return {data: []};
    },

    componentDidMount: function(){
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_user_youtubevideos",
            data: {
            //"projectid": projectid
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var parsedresponse = JSON.parse(response);
                var youtubevideoresponse = parsedresponse.youtubevideoarray;
                this.setState({data: youtubevideoresponse});
            }.bind(this))
        });
    },

    handleDeleteRequest: function(data){
        var youtubevideoid = data.youtubevideo_id;
        var r = confirm("Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "/user/videos/youtubevideos/manage/delete",
                //dataType: "text"
                data: {
                    "youtubevideo_id": youtubevideoid,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    setstatefunction();
                })
            });
            var setstatefunction = function(){
                var newdataarray = this.state.data;
                var elementPosData = this.state.data.map(function(item){
                    return item.youtubevideo_id;
                }).indexOf(youtubevideoid);
                if (elementPosData != -1){
                    newdataarray.splice(elementPosData, 1);
                }
                this.setState({data: newdataarray});
            }.bind(this);
        }
        else {}
    },

    render: function() {
        return (
            <div>
                <YoutubevideoList data={this.state.data} handleDeleteRequest={this.handleDeleteRequest}/>
            </div>
        );
    }
});

var YoutubevideoList = React.createClass ({

    handleDeleteRequest: function(data){
        this.props.handleDeleteRequest(data);
    },

    render:function(){
        var youtubevideos = this.props.data.map(function(youtubevideo){
            return <CurrentYoutubevideo identifier={youtubevideo.youtubevideo_identifier} id={youtubevideo.youtubevideo_id} key={youtubevideo.youtubevideo_identifier} handleDeleteRequest={this.handleDeleteRequest} />
        }.bind(this));
        var imgcontstyle = {};
        return (
            <div className="row">
                {youtubevideos}
            </div>
        );
    }
});

var CurrentYoutubevideo = React.createClass ({

    handleDeleteRequest: function(){
        this.props.handleDeleteRequest({youtubevideo_id: this.props.id, youtubevideo_identifier: this.props.identifier});
    },

    render: function() {
        var srcstring = 'https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';
        return (
            <div id={this.props.id} className="col-xs-12 col-sm-6 col-md-4">
                <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" id="ytplayer" type="text/html" src={srcstring} allowFullScreen frameBorder="0"></iframe>
                </div>
                    <div><a className="btn btn-warning btn-lg btn-block" onClick={this.handleDeleteRequest} >Remove</a></div>
                    <br/>
            </div>
        );
    }
});
