var SocialAddContainer = React.createClass({

    getInitialState: function(){
        return {facebook: [], twitter: [], instagram: [], instagramscript: []};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;
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
                var facebookpageurl = 'https://www.facebook.com/' + parsedresponse.facebook;
                var twitterurl = 'https://twitter.com/' + parsedresponse.twitter;
                var instagramurl = 'https://instagram.com/' + parsedresponse.instagram;
                var instagramscript = parsedresponse.instagramscript;
                this.setState({facebook: facebookpageurl, twitter: twitterurl, instagram: instagramurl, instagramscript: instagramscript});
            }.bind(this))
        });
    },

    submitFacebookwidgetChange: function(){
            var projectid = this.props.data.project_id;
            var facebookwidgeturl = this.state.facebook;
            $.ajax({
                type: "POST",
                url: "/user/projects/facebookwidget/addchange",
                data: {
                "project_id": projectid,
                "facebookwidget_url": facebookwidgeturl,
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

    submitTwitterwidgetChange: function(){
            var projectid = this.props.data.project_id;
            var twitterwidgeturl = this.state.twitter;
            $.ajax({
                type: "POST",
                url: "/user/projects/twitterwidget/addchange",
                data: {
                "project_id": projectid,
                "twitterwidget_url": twitterwidgeturl,
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

    submitInstagramwidgetChange: function(){
            var projectid = this.props.data.project_id;
            var instagramwidgeturl = this.state.instagram;
            if (this.state.instagramscript == '') { var instagramwidgetscript = null }
            else { var instagramwidgetscript = this.state.instagramscript; }
            $.ajax({
                type: "POST",
                url: "/user/projects/instagramwidget/addchange",
                data: {
                "project_id": projectid,
                "instagramwidget_url": instagramwidgeturl,
                "instagramwidget_script": instagramwidgetscript,
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

    handleFacebookTextEntry: function(event){
        this.setState({facebook: event.target.value});
    },

    handleTwitterTextEntry: function(event){
        this.setState({twitter: event.target.value});
    },

    handleInstagramTextEntry: function(event){
        this.setState({instagram: event.target.value});
    },

    handleInstagramscriptTextEntry: function(event){
        this.setState({instagramscript: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var facebookdefaulttext = this.state.facebook;
        var twitterdefaulttext = this.state.twitter;
        var instagramdefaulttext = this.state.instagram;
        var instagramscriptdefaulttext = this.state.instagramscript;
        var paddiv = {padding:8};
        var projectsection_toggle_data = {isactive: null, projectsection_id: 7, activatebutton_text: 'retrieving active status...'};
        return (
        <div>
        <br/>
        <ProjectsectionToggle project_id={this.props.data.project_id} projectsection_toggle_data={projectsection_toggle_data}/>
            <div className="col-sm-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="facebooktextinput">Enter Facebook Page URL:</label>
                        <div className="col-sm-9">
                            <input type="text" id="facebooktextinput" className="form-control" value={facebookdefaulttext} onChange={this.handleFacebookTextEntry}/>
                        </div>
                    </div>
                    <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitFacebookwidgetChange} >Submit</a></div>
                </form>
                <div style={paddiv}></div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="twittertextinput">Enter Twitter URL or Username:</label>
                        <div className="col-sm-9">
                            <input type="text" id="twittertextinput" className="form-control" value={twitterdefaulttext} onChange={this.handleTwitterTextEntry}/>
                        </div>
                    </div>
                    <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitTwitterwidgetChange} >Submit</a></div>
                </form>
                <div style={paddiv}></div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="instagramtextinput">Enter Instagram URL or Username:</label>
                        <div className="col-sm-9">
                            <input type="text" id="instagramtextinput" className="form-control" value={instagramdefaulttext} onChange={this.handleInstagramTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                        <p>
                            Note: Instagram does not offer an embeddable widget script. To get an Instagram widget script, try out a free service like <a href="http://snapwidget.com/#getstarted" target="new" >Snapwidget</a>. (Use a responsive widget if possible, because responsive widgets adjust to fit the size of the screen!)
                        </p>
                        </div>
                        <label className="col-sm-3 control-label" htmlFor="instagramtextinput">Enter Instagram widget script:</label>
                        <div className="col-sm-9">
                            <textarea className="form-control" rows="5" id="instagramscripttextinput" value={instagramscriptdefaulttext} onChange={this.handleInstagramscriptTextEntry} />
                        </div>
                    </div>
                    <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitInstagramwidgetChange} >Submit</a></div>
                </form>
            </div>
        <br/>
        <br/>
        <br/>
        </div>
        );
    }

});