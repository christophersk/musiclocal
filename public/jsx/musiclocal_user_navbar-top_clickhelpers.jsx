function collectionsMain(){
    ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
    ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
    ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
    $("#projectschildtarget").html('');
    $("#projectsbutton").removeClass("active");
    ReactDOM.render(<ComponentsMenu />, document.getElementById('content-menu'));
}

$(document).ready(function(){

    $('#navbar-components').click(function ($e){
        collectionsMain();
    });

    $('#navbar-projects').click(function ($e){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        ReactDOM.render(<ProjectsMenu />, document.getElementById('content-menu'));
    });

    $('#navbar-banners').click(function ($e) {
        $e.preventDefault();
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        $('#content-menu').html('').show();
        $('#content-main').html('').show();
        ReactDOM.render(<BannersMenu url=""/>, document.getElementById('content-menu'));
        ReactDOM.render(<BannerContainer url=""/>, document.getElementById('content-main'));
    });
});

var UserDashboard = React.createClass({

    render: function() {
        var style={textAlign:'center'};
        return (
            <div>
                <div className="col-xs-12 section" id="getstartedcontainer">
                    <div style={style}>
                        <h1>User Dashboard</h1>
                        <h3>Welcome to MusicLocal.</h3>
                    </div>
                </div>
            </div>
        );
    }
});

var ProjectsStart = React.createClass({

    mountProjectList: function() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.render(<ProjectsMenu />, document.getElementById('content-menu'));
    },

    mountCollections: function() {
        collectionsMain();
    },

    render: function(){
        var btnstyle = {paddingTop:100, paddingBottom:100};
        var paddiv = {paddingTop:15};
        return(
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3" style={paddiv}></div>
                <CreateProject />
                <div className="col-xs-12" style={paddiv}></div>
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <a className="btn btn-primary btn-block btn-lg" onClick={this.mountProjectList} style={btnstyle}>Manage Projects</a>
                </div>
                <div className="col-xs-12" style={paddiv}></div>
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <a className="btn btn-primary btn-block btn-lg" onClick={this.mountCollections} style={btnstyle}>Add/Manage Images & Video</a>
                </div>
                <br/>
            </div>
        );
    }
});

var ProjectsMenu = React.createClass({

    getInitialState: function(){
        var plinksob = {projectlinks: []};
        return plinksob;
    },

    componentDidMount: function(){
        this.activateProjectsButton();
        this.deactivateComponentsButton();
        $.ajax({
            type: "GET",
            url: "/user/projects/list",
            data: {
                _token: $_token
                },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('Your current projects could not be loaded. Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                this.setState({ projectlinks: parsedresponse });
            }.bind(this))
        });

    },

    componentWillUnmount: function() {
        $("#projectsbutton").removeClass("active");
        $("#projectschildtarget").html("").removeClass("active");
    },

    activateProjectsButton: function() {
        $("#projectsbutton").attr({"class":"active"});
    },

    deactivateComponentsButton: function() {
        $("#componentsbutton").removeClass("active");
    },

    render: function(){
        return(
            <div>
                <ProjectsList projectlinks={this.state.projectlinks} />
            </div>
        );
    }
});

var ProjectsList = React.createClass({

    componentWillUnmount: function() {
        $("#projectschildtarget").html('').removeClass("active");
    },

    render: function(){
        var i = 0;
        var links = this.props.projectlinks.map(function(link, i, j){
            i++;
            j++;
            if (i == 3) {
                var clearfixthree = true;
                i--;
                i--;
                i--;
            }
            else { var clearfixthree = false; }
            if (j == 2) {
                var clearfixtwo = true;
                j--;
                j--;
             }
            else { var clearfixtwo = false; }
            return <ProjectLink project_name={link.project_name} project_id={link.project_id} project_url={link.project_url} backgroundimage_filename={link.backgroundimage_filename} clearfixthree={clearfixthree} clearfixtwo={clearfixtwo} key={link.project_url}/>
        });
        var headerstyle = {paddingLeft:0, paddingRight:0};
        return(
        <div>
            <div className="row">
                {links}
            </div>
            <div id="projectlistbottomplaceholder"></div>
        </div>
        );
    }
});

var ProjectLink = React.createClass({

    onProjectClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-main').show();
        ReactDOM.render(<ProjectEditContainer data={this.props} />, document.getElementById('content-main'));
    },

    render: function(){
        var filename = this.props.backgroundimage_filename;
        if (filename == null) { var srcstring = '//d1y0bevpkkhybk.cloudfront.net/placeholder_16-10.jpg'; }
        else {
            var srcstring = '//d1y0bevpkkhybk.cloudfront.net/bxs/' + filename + '.jpg';
        }
        var headerstyle = {textAlign:'center'};
        var block = {margin:0,marginBottom:0,padding:10,paddingBottom:10,borderTopLeftRadius:30,borderTopRightRadius:30,borderBottomLeftRadius:30,borderBottomRightRadius:30};
        var headerdiv = {position:'absolute',bottom:0,width:'100%',paddingBottom:10};
        var contstyle = {position:'relative'};
        var padding = {paddingBottom:15, paddingTop:15};
        return(
            <div className="col-sm-6 col-xs-12" onClick={this.onProjectClick} style={padding}>
                <a>
                    <div style={contstyle}>
                        <div className="titlebackground" style={headerdiv}>
                            <h1 className="projectnameheader2" style={headerstyle}>{this.props.project_name}</h1>
                        </div>
                            <img className="img img-responsive" src={srcstring}/>
                    </div>
                </a>
            </div>
        );
    }
});

var ProjectLinkMenu = React.createClass({

    onProjectClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        $('#content-main').html('').show();
        ReactDOM.render(<ProjectEditContainer data={this.props.data} />, document.getElementById('content-main'));
    },

    render: function(){
        var filename = this.props.backgroundimage_filename;
        if (filename == null) { var srcstring = '//d1y0bevpkkhybk.cloudfront.net/placeholder_16-10.jpg'; }
        else {
            var srcstring = '//d1y0bevpkkhybk.cloudfront.net/bxs/' + filename + '.jpg';
        }
        var thispropsclearfixthree = this.props.clearfixthree;
        if (thispropsclearfixthree == true) { var clearfixthree = 'visible-md-block visible-lg-block'}
        else { var clearfixthree = ''}
        var thispropsclearfixtwo = this.props.clearfixtwo;
        if (thispropsclearfixtwo == true) { var clearfixtwo = 'visible-sm-block'; }
        else { var clearfixtwo = ''; }
        var clearfix = clearfixthree + ' ' + clearfixtwo + ' clearfix visible-xs-block';
        var block = {margin:0,marginBottom:0,padding:10,paddingBottom:10,borderTopLeftRadius:30,borderTopRightRadius:30,borderBottomLeftRadius:30,borderBottomRightRadius:30};
        var project_url = '' + this.props.data.project_url;
        var centerblock = {textAlign: 'center'};
        return(
            <div>
            <div className="col-xs-12">
                <div onClick={this.onProjectClick}>
                    <a className="btn btn-block btn-lg btn-primary">Edit</a>
                </div>
                <div style={centerblock}>
                <a className="btn btn-block btn-lg btn-success" href={project_url} target="new">View</a>
                </div>
            </div>
            <div className={clearfix}></div>
            </div>
        );
    }
});

var CreateProject = React.createClass({

    onCreateProjectClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-main').html('').show();
        ReactDOM.render(<CreateProjectContainer url="" />, document.getElementById('content-main'));

        //$("#projectschildtarget").html('<p class="navbar-text btn btn-primary" style="padding-left:20px;">Create</p>').attr({"class":"active"});
    },

    render: function(){
        var btnstyle = {paddingTop:100, paddingBottom:100};
        return(
            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                <a className="btn btn-block btn-success btn-lg" onClick={this.onCreateProjectClick} style={btnstyle}>Create New Project</a>
            </div>
        );
    }
});


var ComponentsMenu = React.createClass({

    componentDidMount: function() {
        $("#componentsbutton").attr({"class":"active"});
    },

    handleBannersClick: function(){
        this.clearContents();
        ReactDOM.render(<BannersMenu url=""/>, document.getElementById('content-menu'));
        ReactDOM.render(<BannerContainer url=""/>, document.getElementById('content-main'));

        //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $("#componentschildtarget").html('<p class="navbar-text" style="padding-left:20px;">Banners</p>');
        //ReactDOM.render(<ComponentsSubMenu subMenuName="Banners"/>, document.getElementById('componentschildtarget'));
    },

    handleBackgroundimagesClick: function(){
        this.clearContents();
        ReactDOM.render(<BackgroundimagesMenu url=""/>, document.getElementById('content-menu'));
        ReactDOM.render(<BackgroundimageContainer url=""/>, document.getElementById('content-main'));

        //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $("#componentschildtarget").html('<p class="navbar-text" style="padding-left:20px;">Background Images</p>');
        //ReactDOM.render(<ComponentsSubMenu subMenuName="Banners"/>, document.getElementById('componentschildtarget'));
    },

    handlePhotoalbumsClick: function(){
        this.clearContents();
        ReactDOM.render(<PhotoalbumsMenu url=""/>, document.getElementById('content-menu'));
        ReactDOM.render(<PhotoalbumContainer url=""/>, document.getElementById('content-main'));

        //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $("#componentschildtarget").html('<p class="navbar-text" style="padding-left:20px;">Photo Albums</p>');
    },

    handleVideosClick: function(){
        this.clearContents();
        ReactDOM.render(<VideosMenu url=""/>, document.getElementById('content-menu'));
        ReactDOM.render(<VideoContainer url=""/>, document.getElementById('content-main'));

        //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $("#componentschildtarget").html('<p class="navbar-text" style="padding-left:20px;">Videos</p>');
    },

    handleEventsClick: function(){
        alert('This is a placeholder for future functionality. To add event listings to your project, add a bandsintown account on the project management page.');
        return;
        this.clearContents();
        ReactDOM.render(<EventCreateContainer url=""/>, document.getElementById('content-main'));

        //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $("#componentschildtarget").html('<p class="navbar-text" style="padding-left:20px;">Events</p>');
    },

    handleListingsClick: function(){
        this.clearContents();
        ReactDOM.render(<BookinglistingMenu url=""/>, document.getElementById('content-menu'));
        ReactDOM.render(<BookinglistingContainer url=""/>, document.getElementById('content-main'));

        //Using jquery because mounting <li> inside of <div> in menu does not render properly
        //Entire top menu bar must be rebuilt with react before submenus can be made react components
        $("#componentschildtarget").html('<p class="navbar-text" style="padding-left:20px;">Listings</p>');
    },

    clearContents: function() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-menu'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-menu').html('');
        $('#content-main').html('');
    },

    render: function(){
        var style = {paddingBottom:100, paddingTop:100};
        /*<li><a href="$link6" style={style}>Event</a></li>*/
        var hidden = {display:'none'};
        var paddiv = {paddingBottom:15};
        return(
        <div>
            <div className="col-xs-12" style={paddiv}></div>
            <div className="col-xs-12 col-sm-6 col-sm-offset-3"><a style={style} className="btn btn-primary btn-lg btn-block" id="navbar-backgroundimages" onClick={this.handleBackgroundimagesClick}>Background Images</a></div>
            <div className="col-xs-12" style={paddiv}></div>
            <div className="col-xs-12 col-sm-6 col-sm-offset-3"><a style={style} className="btn btn-primary btn-lg btn-block" onClick={this.handleVideosClick}>Videos</a></div>
            <div className="col-xs-12 col-sm-4" style={hidden}><a className="btn btn-primary btn-lg btn-block" style={style} onClick={this.handleEventsClick}>Events</a></div>
            <div className="col-xs-12 col-sm-4" style={hidden}><a className="btn btn-primary btn-lg btn-block" style={style} onClick={this.handleListingsClick}>Listings</a></div>
        </div>
        );
    }
});

var ComponentsSubMenu = React.createClass({

    render: function(){
        var style = {paddingLeft:10};
        /*<li><a href="$link6" style={style}>Event</a></li>*/
        var divstyle = {display:"inline"};
        return(
            <div style={divstyle}>
                <li>{this.props.subMenuName}></li>
            </div>
        );
    }
});


var CollectionsBackButton = React.createClass({

    goBack: function(){
        collectionsMain();
    },

    render: function(){
        var backbuttonstyle = {paddingRight:0, paddingLeft:0};
        return(
            <div className="col-xs-4 col-sm-1" style={backbuttonstyle} onClick={this.goBack}>
                <a className="btn btn-primary btn-block">
                    Back
                </a>
            </div>
        );
    }
});