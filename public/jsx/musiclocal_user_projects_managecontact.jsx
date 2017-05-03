var ContactProjectContainer = React.createClass({

    getInitialState: function(){
        return {contact_email: []};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/contactinfo/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                var contactinfoemail = parsedresponse.contactinfo_email;
                this.setState({contactinfo_email: contactinfoemail});
            }.bind(this))
        });
    },

    submitContactinfoChange: function(){
            var projectid = this.props.data.project_id;
            var contactinfoemail = this.state.contactinfo_email;
            $.ajax({
                type: "POST",
                url: "/user/projects/contactinfo/addchange",
                data: {
                "project_id": projectid,
                "contactinfo_email": contactinfoemail,
                _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            })
    },

    handleContactinfoTextEntry: function(event){
        this.setState({contactinfo_email: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var contactinfodefaulttext = this.state.contactinfo_email;
        var projectsection_toggle_data = {isactive: null, projectsection_id: 6, activatebutton_text: 'retrieving active status...'};
        return (
        <div>
            <br/>
            <ProjectsectionToggle project_id={this.props.data.project_id} projectsection_toggle_data={projectsection_toggle_data}/>
            <div className="col-sm-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="contactinfotextinput">Enter Contact Email:</label>
                        <div className="col-sm-9">
                            <input type="text" id="contactinfotextinput" className="form-control" value={contactinfodefaulttext} onChange={this.handleContactinfoTextEntry}/>
                        </div>
                    </div>
                    <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitContactinfoChange} >Submit</a></div>
                </form>
            </div>
        </div>
        );
    }
});