var ProjectSettingsContainer = React.createClass({

    getInitialState: function(){
        return {project_name: this.props.data.project_name, project_url: this.props.data.project_url, mailinglistwidget_script: '', project_tagline: '', project_type: '', project_location: '', project_active: {
            isactive: false, activatebutton_text: '', projectviewbutton: ''
            }};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;

        $.ajax({
            type: "GET",
            url: "/user/project/ajax/active_status",
            data: {
            "project_id": projectid
            },
            error: (function () {
                this.setState({project_active: {
                isactive: null, activatebutton_text: '', projectviewbutton: 'Could not get project status from server.'}});
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }.bind(this)),
            success: (function (response) {
                if (response == 1){
                    this.setState({project_active: {
                    isactive: true, activatebutton_text: 'Deactivate', projectviewbutton: 'View ' + this.props.data.project_name}});
                }
                if (response == 0){
                    this.setState({project_active: {isactive: false, activatebutton_text: 'Activate', projectviewbutton: '[Deactivated]'}});
                }
            }.bind(this))
        });

        $.ajax({
            type: 'GET',
            url: '/user/projects/settings/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                var mailinglistwidget_script = parsedresponse.mailinglistwidget_script;
                var project_tagline = parsedresponse.project_tagline;
                var project_type = parsedresponse.project_type;
                var project_location = parsedresponse.project_location;
                this.setState({mailinglistwidget_script: mailinglistwidget_script, project_tagline: project_tagline, project_type: project_type, project_location: project_location});
            }.bind(this))
        });
    },

    submitMailinglistwidgetChange: function(){
            var projectid = this.props.data.project_id;
            var mailinglistwidget_script = this.state.mailinglistwidget_script;
            $.ajax({
                type: "POST",
                url: "/user/projects/mailinglistwidget/addchange",
                data: {
                    "project_id": projectid,
                    "mailinglistwidget_script": mailinglistwidget_script,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            })
    },

    submitSettingsChange: function(){
            var projectid = this.props.data.project_id;
            var project_name = this.state.project_name;
            var project_url = this.state.project_url;
            var project_tagline = this.state.project_tagline;
            var project_type = this.state.project_type;
            var project_location = this.state.project_location;
            $.ajax({
                type: "POST",
                url: "/user/projects/settings/addchange",
                data: {
                    "project_id": projectid,
                    "project_name": project_name,
                    "project_url": project_url,
                    "project_tagline": project_tagline,
                    "project_type": project_type,
                    "project_location": project_location,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            })
    },

    handleProjectActiveToggle: function(){
        var isactive = this.state.project_active.isactive;
        var projectid = this.props.data.project_id;
        if (isactive == false){
            $.ajax({
                type: "POST",
                url: "/user/projects/activate",
                data: {
                    "project_id": projectid,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br/>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    this.setState({project_active: {
                    isactive: true, activatebutton_text: 'Deactivate', projectviewbutton: 'View Project Page'}});
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been activated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            });
        }
        else if (isactive == true){
            $.ajax({
                type: "POST",
                url: "/user/projects/deactivate",
                data: {
                    "project_id": projectid,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    this.setState({project_active: {isactive: false, activatebutton_text: 'Activate', projectviewbutton: '[Deactivated]'}});
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been deactivated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            });
        }
    },

    handleProjectDelete: function(){
        /*
            Re-loads project list from server after delete instead of simply adjusting state client-side. This code is inefficient.
        */
        var projectid = this.props.data.project_id;
        var r = confirm("Are you sure you want to delete " + this.props.data.project_name + "? WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "/user/projects/delete",
                data: {
                    "project_id": projectid,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
                    ReactDOM.render(<ProjectsMenu />, document.getElementById('content-menu'));
                })
            });
        }
    },

    handleProjectNameTextEntry: function(event){
        this.setState({project_name: event.target.value});
    },

    handleProjectURLTextEntry: function(event){
        this.setState({project_url: event.target.value});
    },

    handleProjectTaglineTextEntry: function(event){
        this.setState({project_tagline: event.target.value});
    },

    handleProjectTypeEntry: function(event){
        this.setState({project_type: event.target.value});
    },

    handleProjectLocationEntry: function(event){
        this.setState({project_location: event.target.value});
    },

    handleMailinglistwidgetScriptTextEntry: function(event){
        this.setState({mailinglistwidget_script: event.target.value});
    },

    handleSettingsBackClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal-fixed'));
        $('#content-main').show();
    },

    render: function(){

        var isactive = this.state.project_active.isactive;
        //var activatebuttonstyle = {};
        if (isactive == false){
            var projectviewbuttonclass = 'btn btn-block btn-default';
            var projectactivatebuttonclass = 'btn btn-block btn-success btn-lg';
        }
        else {
            var projectviewbuttonclass = 'btn btn-block btn-success';
            var projectactivatebuttonclass = 'btn btn-block btn-warning btn-lg';
        }

        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var projectnamedefaulttext = this.state.project_name;
        var projecturldefaulttext = this.state.project_url;
        var projecttaglinedefaulttext = this.state.project_tagline;
        var mailinglistwidget_script_defaulttext = this.state.mailinglistwidget_script;
        var projectsection_toggle_data = {isactive: null, projectsection_id: 2, activatebutton_text: 'retrieving active status...'};
        var tourwidget_selection_defaultvalue = this.state.tourwidget_selection;
        var hide = {display:"none"};
        return (
        <div>
            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                <div style={hide}>
                <br/>
                <a className="btn btn-primary btn-block btn-lg" onClick={this.handleSettingsBackClick}>Back</a>
                <br/>
                </div>
                <a className={projectactivatebuttonclass} onClick={this.handleProjectActiveToggle}>{this.state.project_active.activatebutton_text}</a>
                <a className="btn btn-danger btn-block btn-lg" onClick={this.handleProjectDelete}>Delete Project</a>
                <br/>
            </div>
            <div className="col-xs-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="projectnametextinput">Project Name:</label>
                        <div className="col-sm-9">
                            <input type="text" id="projectnametextinput" className="form-control" value={projectnamedefaulttext} onChange={this.handleProjectNameTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="projecturltextinput">Project URL:</label>
                        <div className="col-sm-9">
                            <input type="text" id="projecturltextinput" className="form-control" value={projecturldefaulttext} onChange={this.handleProjectURLTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="projecttaglinetextinput">Project Tagline:</label>
                        <div className="col-sm-9">
                            <input type="text" id="projecttaglinetextinput" className="form-control" value={projecttaglinedefaulttext} onChange={this.handleProjectTaglineTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="projecttypeinput">Project Type:</label>
                        <div className="col-sm-9">
                            <select value={this.state.project_type} onChange={this.handleProjectTypeEntry}>
                                <option value="2">Music Project</option>
                                <option value="3">Musician/Solo Artist</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="projecttypeinput">Project Location:</label>
                        <div className="col-sm-9">
                            <select value={this.state.project_location} onChange={this.handleProjectLocationEntry}>
                                <option value="2">Tallahassee</option>
                                <option value="3">New York</option>
                                <option value="78">Los Angeles</option>
                            </select>
                        </div>
                    </div>
                    <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitSettingsChange}>Submit</a></div>
                    <br/>
                </form>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="mailinglistwidget_script_text_input">Mailinglist Script:</label>
                        <div className="col-sm-9">
                            <textarea rows="6" id="mailinglistwidget_script_text_input" className="form-control" value={mailinglistwidget_script_defaulttext} onChange={this.handleMailinglistwidgetScriptTextEntry}/>
                        </div>
                    </div>
                    <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitMailinglistwidgetChange}>Submit</a></div>
                </form>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
        );
    }
});