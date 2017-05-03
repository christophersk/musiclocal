var ProjectEditContainer = React.createClass({

    getInitialState: function(){
        return {"sections_project": [
            {"section_id": '1', "backgroundimage_filename": ''},
            {"section_id": '2', "backgroundimage_filename": ''},
            {"section_id": '3', "backgroundimage_filename": ''},
            {"section_id": '4', "backgroundimage_filename": ''},
            {"section_id": '5', "backgroundimage_filename": ''},
            {"section_id": '6', "backgroundimage_filename": ''},
            {"section_id": '7', "backgroundimage_filename": ''},
            {"section_id": '8', "backgroundimage_filename": ''}
            ]};
    },

    componentDidMount: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        ReactDOM.render(<ProjectSectionButtonList data={this.props.data} sections_project={this.state.sections_project} />, document.getElementById('section-buttons'));
    },

    renderSectionButtonList: function(){
        ReactDOM.render(<ProjectSectionButtonList data={this.props.data} sections_project={this.state.sections_project} />, document.getElementById('section-buttons'));
    },

    render: function(){

        return (
            <div>
                <div id="projectisactiveeditheader">
                    <ProjectIsActiveEditHeader data={this.props.data} handleProjectDelete={this.handleProjectDelete} />
                </div>
                <br/>
                <div className="row">
                    <div id="section-buttons"></div>
                </div>
                <div id="manageprojectcontent"></div>
            </div>
        );
    }
});

var ProjectSectionButtonList = React.createClass({

    componentDidMount: function(){
        var i = 1;
        while (i < 8){
                var projectsectionbuttons = this.props.sections_project.map(function(projectsectionbutton){
                    var keystring = 'section_button-' + i;
                    if (projectsectionbutton.section_id == i){
                        ReactDOM.render(<ProjectSectionButton section_id={i} data={this.props.data} backgroundimage_filename={projectsectionbutton.backgroundimage_filename} key={keystring}/>, document.getElementById("section-buttons-2-" + i));
                    }
                    else {
                        ReactDOM.render(<ProjectSectionButton section_id={i} data={this.props.data} backgroundimage_filename={''} key={keystring} />, document.getElementById("section-buttons-2-" + i));
                    }
            }.bind(this));

            i++;
        }
    },

    openSettings: function() {
        $('#projectlayer1backcontainer').hide();
        $('#projectlayer2backcontainer').show();
        ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
        ReactDOM.render(<ProjectSettingsContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
    },

    render: function(){
        var textcenter = {textAlign:"center"};
        var bigborderradius = {borderTopLeftRadius:30,borderTopRightRadius:30,borderBottomLeftRadius:30,borderBottomRightRadius:30,marginBottom:10,paddingBottom:8};
        return (
            <div>
                <div id="section-buttons-2-1"></div>
                <div id="section-buttons-2-2"></div>
                <div id="section-buttons-2-3"></div>
                <div id="section-buttons-2-4"></div>
                <div id="section-buttons-2-5"></div>
                <div id="section-buttons-2-6"></div>
                <div id="section-buttons-2-7"></div>
                <div id="section-buttons-2-8"></div>
                <div className="col-xs-12 col-sm-6 col-sm-offset-3 btn-primary" style={bigborderradius}><a className="" onClick={this.openSettings}><h2 style={textcenter}>Settings/Info</h2></a></div>
            </div>
        );
    }
});

var ProjectLayer1Back = React.createClass({

    handleBackClick: function() {
        ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.render(<ProjectsMenu />, document.getElementById('content-menu'));
    },

    render: function() {
        var paddiv = {paddingBottom:5};
        return (
            <div>
                <a className="btn btn-primary btn-block btn-lg border-radius-all" onClick={this.handleBackClick}>Back</a>
                <div style={paddiv}></div>
            </div>
        );
    }
});

var ProjectLayer2Back = React.createClass({

    getInitialState: function(){
        return {"sections_project": [
            {"section_id": '1', "backgroundimage_filename": ''},
            {"section_id": '2', "backgroundimage_filename": ''},
            {"section_id": '3', "backgroundimage_filename": ''},
            {"section_id": '4', "backgroundimage_filename": ''},
            {"section_id": '5', "backgroundimage_filename": ''},
            {"section_id": '6', "backgroundimage_filename": ''},
            {"section_id": '7', "backgroundimage_filename": ''},
            {"section_id": '8', "backgroundimage_filename": ''}
            ]};
    },

    handleBackClick: function() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        //ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
        $('#projectlayer2backcontainer').hide();
        $('#projectlayer1backcontainer').show();
        ReactDOM.render(<ProjectEditContainer data={this.props.data} />, document.getElementById('content-main'));
    },

    render: function() {
        var paddiv = {paddingBottom:5};
        return (
            <div>
                <a className="btn btn-primary btn-block btn-lg border-radius-all" onClick={this.handleBackClick}>Back</a>
                <div style={paddiv}></div>
            </div>
        );
    }
});

var ProjectSectionButton = React.createClass({

    handleClick: function($e){
        //ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
        $('#projectlayer1backcontainer').hide();
        $('#projectlayer2backcontainer').show();
        if ($e.target.dataset.section_id == '2'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<AboutContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == 'add-user'){
            ReactDOM.render(<UserContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == '3'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<ShowsProjectContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == 'add-banner'){
            ReactDOM.render(<BannerProjectContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == '1'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<CoverContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == '4'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<VideoProjectContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == '5'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<AudioProjectContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == '6'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<SocialAddContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == '7'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<ContactProjectContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
        else if ($e.target.dataset.section_id == 'add-listing'){
            ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
            ReactDOM.render(<BookinglistingProjectContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
        }
    },

    render: function(){
        if (this.props.section_id == 1) { var section_name = 'Cover'; }
        if (this.props.section_id == 2) { var section_name = 'About'; }
        if (this.props.section_id == 3) { var section_name = 'Tour'; }
        if (this.props.section_id == 4) { var section_name = 'Video'; }
        if (this.props.section_id == 5) { var section_name = 'Audio'; }
        if (this.props.section_id == 6) { var section_name = 'Social'; }
        if (this.props.section_id == 7) { var section_name = 'Contact'; }
        if (this.props.section_id == 8) { var section_name = 'Settings'; }
        var imgidstring = 'bgimg-' + this.props.section_id;
        var filename = this.props.backgroundimage_filename;
        var repositionidstring = 'reposition-' + this.props.section_id;
        if (filename != ''){
        /*note: these are all being set with jquery after an ajax call; react updating not working*/
            var srcstring1 = '//d1y0bevpkkhybk.cloudfront.net/bsm/' + filename + '.jpg';
        }
        else {
            var srcstring1 = '';
        }
        var headerstyle = {textAlign:'center'};
        var block = {backgroundColor:'#ffffff',marginBottom:10,paddingBottom:8,borderTopLeftRadius:30,borderTopRightRadius:30,borderBottomLeftRadius:30,borderBottomRightRadius:30};
        return (
            <div className="col-xs-12 col-sm-6 col-sm-offset-3" style={block}>
                <h2 style={headerstyle}><a data-section_id={this.props.section_id} onClick={this.handleClick}>{section_name}</a></h2>
            </div>
        );
    }
});

var ProjectIsActiveEditHeader = React.createClass({

    getInitialState: function(){
        return {project_active: {
            isactive: false, activatebutton_text: '', projectviewbutton: ''
            }
        };
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
    },

    viewProjectSettings: function(){

        $('#content-main').hide();
        ReactDOM.render(<ProjectSettingsContainer data={this.props.data} />, document.getElementById('content-modal-fixed'));

        //ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
        //ReactDOM.unmountComponentAtNode(document.getElementById('section-buttons'));
        //ReactDOM.render(<ProjectSettingsContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
    },

    handleBackClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-main').html('').show();
        ReactDOM.render(<ProjectEditContainer data={this.props.data} />, document.getElementById('content-main'));
    },

    render: function(){

        var hide = {display:"none"};
        return(
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <div id="project-back-button-container">
                        <div id="projectlayer1backcontainer">
                            <ProjectLayer1Back data={this.props.data} />
                        </div>
                        <div id="projectlayer2backcontainer" style={hide}>
                            <ProjectLayer2Back data={this.props.data} />
                        </div>
                    </div>
                </div>
                <ProjectViewButton project_active={this.state.project_active} data={this.props.data} />
                <div className="col-xs-12 col-sm-6 col-sm-offset-3" style={hide}>
                    <a className="btn btn-primary btn-block btn-lg border-radius-all" onClick={this.viewProjectSettings}>Settings</a>
                </div>
            </div>
        );
    }
});

var ProjectViewButton = React.createClass({

    viewProjectPage: function(){
        var isactive = this.props.project_active.isactive;
        if (isactive == false){
            alert('You must activate your project to preview it.');
        }
        else if (isactive == true){
            var projectlinkstring = '/' + this.props.data.project_url + '';
            window.open(projectlinkstring);
        }
    },

    render: function() {
        var isactive = this.props.project_active.isactive;
        if (isactive == false){
            var projectviewbuttonclass = 'btn btn-block btn-default btn-lg border-radius-all';
        }
        else {
            var projectviewbuttonclass = 'btn btn-block btn-success btn-lg border-radius-all';
        }
        return(
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 border-radius-all">
                <a className={projectviewbuttonclass} onClick={this.viewProjectPage}>{this.props.project_active.projectviewbutton}</a>
            </div>
        );
    }
});



var ProjectsectionToggle = React.createClass({

    getInitialState: function() {
        return {projectsection_toggle_data:
            {
            isactive: this.props.projectsection_toggle_data.isactive,
            activatebutton_text: this.props.projectsection_toggle_data.activatebutton_text
            }
        };
    },

    componentDidMount: function() {
        //by default, get active state from parent to conserve get requests.
        //if isactive data is unavailable, get from server using ajax.
        if (this.state.projectsection_toggle_data.isactive == null) {
            var projectid = this.props.project_id;
            var projectsection_id = this.props.projectsection_toggle_data.projectsection_id;
            $.ajax({
                type: "GET",
                url: "/user/project/projectsection/active_status",
                data: {
                "project_id": projectid,
                "projectsection_id": projectsection_id,
                _token: $_token
                },
                error: (function () {
                    this.setState({projectsection_toggle_data: {
                    isactive: null, activatebutton_text: 'Could not retrieve status.'}});
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this)),
                success: (function (response) {
                    if (response == 1){
                        this.setState({projectsection_toggle_data: {
                        isactive: true, activatebutton_text: 'Deactivate Section'}});
                    }
                    if (response == 0){
                        this.setState({projectsection_toggle_data: {isactive: false, activatebutton_text: 'Activate Section'}});
                    }
                }.bind(this))
            });
        }
    },

    handleToggle: function() {
        var isactive = this.state.projectsection_toggle_data.isactive;
        var projectid = this.props.project_id;
        var projectsection_id = this.props.projectsection_toggle_data.projectsection_id;
        if (isactive == false){
            $.ajax({
                type: "POST",
                url: "/user/project/projectsection/activate",
                data: {
                    "project_id": projectid,
                    "projectsection_id": projectsection_id,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br/>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    this.setState({projectsection_toggle_data: {
                    isactive: true, activatebutton_text: '(Active - click to deactivate)'}});
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been activated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            });
        }
        else if (isactive == true){
            $.ajax({
                type: "POST",
                url: "/user/project/projectsection/deactivate",
                data: {
                    "project_id": projectid,
                    "projectsection_id": projectsection_id,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    this.setState({projectsection_toggle_data: {isactive: false, activatebutton_text: '(Inactive - click to activate)'}});
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been deactivated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            });
        }
    },

    render: function(){
        var isactive = this.state.projectsection_toggle_data.isactive;
        if (isactive == null){
            var activatebuttonstyle = {paddingLeft:10, marginRight: 10}; //, color:'yellow'
            //var projectviewbutton = {paddingLeft:10};//color:'#333333'
            //var projectviewbuttonclass = 'btn btn-default';
            var projectactivatebuttonclass = 'btn btn-default btn-block btn-lg';
        }
        if (isactive == false){
            var activatebuttonstyle = {paddingLeft:10, marginRight: 10}; //, color:'yellow'
            //var projectviewbutton = {paddingLeft:10};//color:'#333333'
            //var projectviewbuttonclass = 'btn btn-default';
            var projectactivatebuttonclass = 'btn btn-warning btn-block btn-lg';
        }
        else {
            var activatebuttonstyle = {paddingLeft:10, marginRight:10};//, color:'green'
            //var projectviewbutton = {paddingLeft:10};
            //var projectviewbuttonclass = 'btn btn-info';
            var projectactivatebuttonclass = 'btn btn-success btn-block btn-lg';
        }
        var padding = {paddingBottom:15};
        return (
            <div className="col-xs-12 col-sm-6 col-sm-offset-3" style={padding}>
                <a className={projectactivatebuttonclass} style={activatebuttonstyle} onClick={this.handleToggle}>{this.state.projectsection_toggle_data.activatebutton_text}</a>
            </div>
        );

    }
});
