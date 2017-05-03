var AudioProjectContainer = React.createClass({

    getInitialState: function(){
        return {soundcloudwidget_path: [], soundcloudwidget_script: []};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/audio/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                var soundcloudwidget_path = 'https://www.soundcloud.com/' + parsedresponse.soundcloudwidget_path;
                var soundcloudwidget_script = parsedresponse.soundcloudwidget_script;
                this.setState({soundcloudwidget_path: soundcloudwidget_path, soundcloudwidget_script: soundcloudwidget_script});
            }.bind(this))
        });
    },

    submitSoundcloudwidgetChange: function(){
            var projectid = this.props.data.project_id;
            var soundcloudwidget_path = this.state.soundcloudwidget_path;
            if (this.state.soundcloudwidget_script == '') { var soundcloudwidget_script = null }
            else { var soundcloudwidget_script = this.state.soundcloudwidget_script; }
            $.ajax({
                type: "POST",
                url: "/user/projects/soundcloudwidget/addchange",
                data: {
                "project_id": projectid,
                "soundcloudwidget_path": soundcloudwidget_path,
                "soundcloudwidget_script": soundcloudwidget_script,
                _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            })
    },

    handleSoundcloudTextEntry: function(event){
        this.setState({soundcloudwidget_path: event.target.value});
    },

    handleSoundcloudscriptTextEntry: function(event){
        this.setState({soundcloudwidget_script: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var soundclouddefaulttext = this.state.soundcloudwidget_path;
        var soundcloudscriptdefaulttext = this.state.soundcloudwidget_script;
        var paddiv = {padding:8};
        var projectsection_toggle_data = {isactive: null, projectsection_id: 4, activatebutton_text: 'retrieving active status...'};
        return (
        <div>
            <br/>
                <ProjectsectionToggle project_id={this.props.data.project_id} projectsection_toggle_data={projectsection_toggle_data}/>
            <div className="col-sm-12">
            <div style={paddiv}></div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="soundcloudtextinput">Enter Soundcloud URL or Username:</label>
                        <div className="col-sm-9">
                            <input type="text" id="soundcloudtextinput" className="form-control" value={soundclouddefaulttext} onChange={this.handleSoundcloudTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="soundcloudtextinput">Enter Soundcloud widget script:</label>
                        <div className="col-sm-9">
                            <textarea className="form-control" rows="5" id="soundcloudscripttextinput" value={soundcloudscriptdefaulttext} onChange={this.handleSoundcloudscriptTextEntry} />
                        </div>
                    </div>
                    <div style={submitstyle}><a className="btn btn-primary btn-block" onClick={this.submitSoundcloudwidgetChange} >Submit</a></div>
                </form>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
        );
    }

});