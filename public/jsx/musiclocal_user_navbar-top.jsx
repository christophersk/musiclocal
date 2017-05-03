var NavbarTopContainer = React.createClass({

    getInitialState: function(){
        return {data: {user_id: 1}, components: [{}], projects: [{}]};
    },

    componentDidMount: function(){

    },

    onNavbarButtonProjectsClick: function(){
        this.setState({projects: [{project_name: 'project'}], components: [{}]});
    },

    onNavbarButtonComponentsClick: function(){
        this.setState({components: [{name: 'Banners', componentname: '' }, {name: 'Photo Albums', componentname: '' }], projects: [{}]});
    },


    render: function(){
        return (
        <div className="jumbocontainer">
            <div className="container container-fixed">
                <ul className="nav nav-pills nav-justified navbar-text">
                    <NavbarButtonProjects projects={this.state.projects} onNavbarButtonProjectsClick={this.onNavbarButtonProjectsClick}/>
                    <NavbarButtonComponents components={this.state.components} onNavbarButtonComponentsClick={this.onNavbarButtonComponentsClick}/>
                </ul>
            </div>
        </div>
        );
    }

});

var NavbarLevelOneButton = React.createClass({

    getInitialState: function(){
        return {};
    },

    componentDidMount: function(){

    },

    onNavbarButtonProjectsClick: function(){
        this.props.onNavbarButtonProjectsClick();
    },

    render: function(){
        var projects = this.props.projects.map(function(project){
            return <NavbarProject project_name={project.project_name} key={project.project_name} onAddBanner={this.passBannerAddToParent} onDeleteBanner={this.passBannerDeleteToParent} />
        }.bind(this));
        console.log(projects[0].key);
        //if (projects[0].key == null){return null}
        return (
            <div>
                <li role="presentation" ><a href="#" onClick={this.onNavbarButtonProjectsClick} >Projects</a></li>
                <ul className="nav nav-pills nav-justified navbar-text">
                    {projects}
                </ul>
            </div>
        );
    }

});

var NavbarProject = React.createClass({

    getInitialState: function(){
        return {};
    },

    componentDidMount: function(){

    },

    render: function(){

        return (
            <li role="presentation" ><a >{this.props.project_name}</a></li>
        );
    }

});

var NavbarButtonComponents = React.createClass({

    getInitialState: function(){
        return {};
    },

    componentDidMount: function(){

    },

    onNavbarButtonComponentsClick: function(){
        this.props.onNavbarButtonComponentsClick();
    },

    render: function(){
        var components = this.props.components.map(function(component){
            return <NavbarComponent name={component.name} key={component.name} onAddBanner={this.passBannerAddToParent} onDeleteBanner={this.passBannerDeleteToParent} />
        }.bind(this));
        return (
            <div>
                <li role="presentation" ><a href="#" onClick={this.onNavbarButtonComponentsClick} >Components</a></li>
                <ul className="nav nav-pills nav-justified navbar-text">
                    {components}
                </ul>
            </div>
        );
    }

});

var NavbarComponent = React.createClass({

    getInitialState: function(){
        return {};
    },

    componentDidMount: function(){

    },

    render: function(){

        return (
            <li role="presentation" ><a href="#">{this.props.name}</a></li>
        );
    }

});