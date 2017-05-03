'use strict';

$(document).ready(function () {

    React.initializeTouchEvents(true);
    var NavbarTopContainer = React.createClass({
        displayName: 'NavbarTopContainer',

        getInitialState: function getInitialState() {
            return { data: { user_id: 1 }, components: [{}], projects: [{}] };
        },

        componentDidMount: function componentDidMount() {},

        onNavbarButtonProjectsClick: function onNavbarButtonProjectsClick() {
            this.setState({ projects: [{ project_name: 'project' }], components: [{}] });
        },

        onNavbarButtonComponentsClick: function onNavbarButtonComponentsClick() {
            this.setState({ components: [{ name: 'Banners', componentname: '' }, { name: 'Photo Albums', componentname: '' }], projects: [{}] });
        },

        render: function render() {
            return React.createElement(
                'div',
                { className: 'jumbocontainer' },
                React.createElement(
                    'div',
                    { className: 'container container-fixed' },
                    React.createElement(
                        'ul',
                        { className: 'nav nav-pills nav-justified navbar-text' },
                        React.createElement(NavbarButtonProjects, { projects: this.state.projects, onNavbarButtonProjectsClick: this.onNavbarButtonProjectsClick }),
                        React.createElement(NavbarButtonComponents, { components: this.state.components, onNavbarButtonComponentsClick: this.onNavbarButtonComponentsClick })
                    )
                )
            );
        }

    });

    var NavbarLevelOneButton = React.createClass({
        displayName: 'NavbarLevelOneButton',

        getInitialState: function getInitialState() {
            return {};
        },

        componentDidMount: function componentDidMount() {},

        onNavbarButtonProjectsClick: function onNavbarButtonProjectsClick() {
            this.props.onNavbarButtonProjectsClick();
        },

        render: function render() {
            var projects = this.props.projects.map((function (project) {
                return React.createElement(NavbarProject, { project_name: project.project_name, key: project.project_name, onAddBanner: this.passBannerAddToParent, onDeleteBanner: this.passBannerDeleteToParent });
            }).bind(this));
            console.log(projects[0].key);
            //if (projects[0].key == null){return null}
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'li',
                    { role: 'presentation' },
                    React.createElement(
                        'a',
                        { href: '#', onClick: this.onNavbarButtonProjectsClick },
                        'Projects'
                    )
                ),
                React.createElement(
                    'ul',
                    { className: 'nav nav-pills nav-justified navbar-text' },
                    projects
                )
            );
        }

    });

    var NavbarProject = React.createClass({
        displayName: 'NavbarProject',

        getInitialState: function getInitialState() {
            return {};
        },

        componentDidMount: function componentDidMount() {},

        render: function render() {

            return React.createElement(
                'li',
                { role: 'presentation' },
                React.createElement(
                    'a',
                    null,
                    this.props.project_name
                )
            );
        }

    });

    var NavbarButtonComponents = React.createClass({
        displayName: 'NavbarButtonComponents',

        getInitialState: function getInitialState() {
            return {};
        },

        componentDidMount: function componentDidMount() {},

        onNavbarButtonComponentsClick: function onNavbarButtonComponentsClick() {
            this.props.onNavbarButtonComponentsClick();
        },

        render: function render() {
            var components = this.props.components.map((function (component) {
                return React.createElement(NavbarComponent, { name: component.name, key: component.name, onAddBanner: this.passBannerAddToParent, onDeleteBanner: this.passBannerDeleteToParent });
            }).bind(this));
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'li',
                    { role: 'presentation' },
                    React.createElement(
                        'a',
                        { href: '#', onClick: this.onNavbarButtonComponentsClick },
                        'Components'
                    )
                ),
                React.createElement(
                    'ul',
                    { className: 'nav nav-pills nav-justified navbar-text' },
                    components
                )
            );
        }

    });

    var NavbarComponent = React.createClass({
        displayName: 'NavbarComponent',

        getInitialState: function getInitialState() {
            return {};
        },

        componentDidMount: function componentDidMount() {},

        render: function render() {

            return React.createElement(
                'li',
                { role: 'presentation' },
                React.createElement(
                    'a',
                    { href: '#' },
                    this.props.name
                )
            );
        }

    });

    React.render(React.createElement(NavbarTopContainer, { url: '' }), document.getElementById('navbar-top'));
});