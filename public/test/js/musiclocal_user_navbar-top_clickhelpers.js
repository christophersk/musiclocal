'use strict';

$(document).ready(function () {

    $('#navbar-components').click(function ($e) {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        React.initializeTouchEvents(true);
        React.render(React.createElement(ComponentsMenu, null), document.getElementById('content-menu'));
    });

    $('#navbar-projects').click(function ($e) {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        React.initializeTouchEvents(true);
        React.render(React.createElement(ProjectsMenu, null), document.getElementById('content-menu'));
    });

    $('#navbar-banners').click(function ($e) {
        $e.preventDefault();
        console.log('banners clicked!');
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        $('#content-menu').html('').show();
        $('#content-main').html('').show();
        React.initializeTouchEvents(true);
        React.render(React.createElement(BannersMenu, { url: '' }), document.getElementById('content-menu'));
        React.render(React.createElement(BannerContainer, { url: '' }), document.getElementById('content-main'));
    });
});

var ProjectsMenu = React.createClass({
    displayName: 'ProjectsMenu',

    getInitialState: function getInitialState() {
        //var projectlinks = localStorage.getItem("projectlinks");
        //var parsedprojectlinks = JSON.parse([projectlinks]);
        //var plinksob = {projectlinks: parsedprojectlinks};
        var plinksob = { projectlinks: [] };
        return plinksob;
    },

    componentDidMount: function componentDidMount() {

        $.ajax({
            type: "GET",
            url: "/user/projects/list",
            data: {
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('Your current projects could not be loaded. Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                this.setState({ projectlinks: parsedresponse });
            }).bind(this)
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(ProjectsList, { projectlinks: this.state.projectlinks })
        );
    }
});

var ProjectsList = React.createClass({
    displayName: 'ProjectsList',

    render: function render() {
        var links = this.props.projectlinks.map(function (link) {
            return React.createElement(ProjectLink, { project_name: link.project_name, project_id: link.project_id, project_url: link.project_url, key: link.project_url });
        });
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'h4',
                    { className: 'menuheader' },
                    'Projects'
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'ul',
                    { className: 'nav nav-pills nav-justified' },
                    links,
                    React.createElement(CreateProject, null)
                )
            )
        );
    }
});

var ProjectLink = React.createClass({
    displayName: 'ProjectLink',

    onProjectClick: function onProjectClick() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-main').html('').show();
        React.render(React.createElement(ProjectEditContainer, { data: this.props }), document.getElementById('content-main'));
    },

    render: function render() {
        var style = { paddingLeft: 10 };
        return React.createElement(
            'li',
            { role: 'presentation', id: this.props.project_id },
            React.createElement(
                'a',
                { style: style, onClick: this.onProjectClick, onTouchStart: this.onProjectClick },
                this.props.project_name
            )
        );
    }
});

var CreateProject = React.createClass({
    displayName: 'CreateProject',

    onCreateProjectClick: function onCreateProjectClick() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-main').html('').show();
        React.render(React.createElement(CreateProjectContainer, { url: '' }), document.getElementById('content-main'));
    },

    render: function render() {
        var style = { paddingLeft: 10 };
        return React.createElement(
            'li',
            { role: 'presentation' },
            React.createElement(
                'a',
                { style: style, onClick: this.onCreateProjectClick, onTouchStart: this.onCreateProjectClick },
                'Create New Project'
            )
        );
    }
});

var ComponentsMenu = React.createClass({
    displayName: 'ComponentsMenu',

    handleBannersClick: function handleBannersClick() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-menu').html('');
        $('#content-main').html('');
        React.render(React.createElement(BannersMenu, { url: '' }), document.getElementById('content-menu'));
        React.render(React.createElement(BannerContainer, { url: '' }), document.getElementById('content-main'));
    },

    handlePhotoalbumsClick: function handlePhotoalbumsClick() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-menu').html('');
        $('#content-main').html('');
        React.render(React.createElement(PhotoalbumsMenu, { url: '' }), document.getElementById('content-menu'));
        React.render(React.createElement(PhotoalbumContainer, { url: '' }), document.getElementById('content-main'));
    },

    handleVideosClick: function handleVideosClick() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-menu').html('');
        $('#content-main').html('');
        React.render(React.createElement(VideosMenu, { url: '' }), document.getElementById('content-menu'));
        React.render(React.createElement(VideoContainer, { url: '' }), document.getElementById('content-main'));
    },

    handleEventsClick: function handleEventsClick() {
        alert('This is a placeholder for future functionality. To add event listings to your project, add a bandsintown account on the project management page.');
        return;
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-menu').html('');
        $('#content-main').html('');
        React.render(React.createElement(EventCreateContainer, { url: '' }), document.getElementById('content-main'));
    },

    handleListingsClick: function handleListingsClick() {
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        React.unmountComponentAtNode(document.getElementById('content-menu'));
        React.unmountComponentAtNode(document.getElementById('content-main'));
        $('#content-menu').html('');
        $('#content-main').html('');
        React.render(React.createElement(BookinglistingMenu, { url: '' }), document.getElementById('content-menu'));
        React.render(React.createElement(BookinglistingContainer, { url: '' }), document.getElementById('content-main'));
    },

    render: function render() {
        var style = { paddingLeft: 10 };
        /*<li><a href="$link6" style={style}>Event</a></li>*/
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'h4',
                    { className: 'menuheader' },
                    'Components'
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'ul',
                    { className: 'nav nav-pills nav-justified' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { style: style, id: 'navbar-photoalbums', onClick: this.handlePhotoalbumsClick, onTouchStart: this.handleBannersClick },
                            'Photo Albums'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { style: style, id: 'navbar-banners', onClick: this.handleBannersClick, onTouchStart: this.handleBannersClick },
                            'Banners'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { style: style, onClick: this.handleVideosClick, onTouchStart: this.handleBannersClick },
                            'Videos'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { style: style, onClick: this.handleEventsClick, onTouchStart: this.handleEventsClick },
                            'Events'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { style: style, onClick: this.handleListingsClick, onTouchStart: this.handleListingsClick },
                            'Listings'
                        )
                    )
                )
            )
        );
    }
});