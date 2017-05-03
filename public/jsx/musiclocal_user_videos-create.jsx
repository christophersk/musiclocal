var VideoCreateContainer = React.createClass({

    getInitialState: function(){
        return {youtubevideo_identifier: []};
    },

    componentDidMount: function(){
    },

    submitAddNewYoutubevideo: function(){
            var youtubevideoidentifier = this.state.youtubevideo_identifier;
            $.ajax({
                type: "POST",
                url: "user/videos",
                data: {
                "youtubevideo_identifier": youtubevideoidentifier,
                _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    //var parsedresponse = JSON.parse(response);
                    //this.setState({data: parsedresponse});
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
                    ReactDOM.render(<VideoContainer url=""/>, document.getElementById('content-main'));
                    //location.reload();
                    alert('Your video has been added.');
                }.bind(this))
            })
    },

    handleYoutubevideoIdentifierTextEntry: function(event){
        this.setState({youtubevideo_identifier: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var youtubevideoidentifierdefaulttext = this.state.youtubevideo_identifier;
        //var projecturldefaulttext = this.state.project_url;
        var paddiv = {padding:8};
        return (
        <div className="col-sm-12">
        <form className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="youtubevideoidentifiertextinput">Youtube Video URL:</label>
                <div className="col-sm-9">
                    <input type="text" id="youtubevideoidentifiertextinput" className="form-control" value={youtubevideoidentifierdefaulttext} onChange={this.handleYoutubevideoIdentifierTextEntry}/>
                </div>
            </div>
            <div style={submitstyle}><a onClick={this.submitAddNewYoutubevideo} >Add Youtube Video</a></div>
        </form>
        </div>
        );
    }

});