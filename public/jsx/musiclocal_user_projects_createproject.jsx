var CreateProjectContainer = React.createClass({

    getInitialState: function(){
        return {project_name: [], project_url: [], location_id: 2, project_type: 2};
    },

    submitCreateNewProject: function(){
            var projectname = this.state.project_name;
            var projecturl = this.state.project_url;
            var projectlocation = this.state.location_id;
            var projecttype = this.state.project_type;
            $.ajax({
                type: "POST",
                url: "/user/projects/create",
                data: {
                "project_name": projectname,
                "project_url": projecturl,
                "project_type": projecttype,
                "location_id": projectlocation,
                _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    console.log(response);
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    location.reload();
                    alert('Your project has been created.');
                }.bind(this))
            })
    },

    componentWillUnmount: function() {
        $("projectschildcontainer").html('').removeClass("active");
    },

    handleProjectNameTextEntry: function(event){
        this.setState({project_name: event.target.value});
    },

    handleProjectURLTextEntry: function(event){
        this.setState({project_url: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var projectnamedefaulttext = this.state.project_name;
        var projecturldefaulttext = this.state.project_url;
        var paddiv = {padding:8};
        return (
        <div className="col-sm-12">
        <form className="form-horizontal">
            <div className="form-group">
                <br/><br/>
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
            <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitCreateNewProject} >Create Project</a></div>
        </form>
        </div>
        );
    }

});