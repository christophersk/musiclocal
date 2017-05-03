'use strict';

React.initializeTouchEvents(true);

var ProjectEditContainer = React.createClass({
    displayName: 'ProjectEditContainer',

    componentDidMount: function componentDidMount() {},

    handleClick: function handleClick($e) {
        console.log($e.target.id);
        React.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
        if ($e.target.id == 'add-about') {
            React.render(React.createElement(AboutContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-user') {
            React.render(React.createElement(UserContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-show') {
            React.render(React.createElement(ShowsProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-banner') {
            React.render(React.createElement(BannerProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-photoalbum') {
            React.render(React.createElement(PhotoalbumProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-video') {
            React.render(React.createElement(VideoProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-audio') {
            React.render(React.createElement(AudioProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-social') {
            React.render(React.createElement(SocialAddContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-contact') {
            React.render(React.createElement(ContactProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        } else if ($e.target.id == 'add-listing') {
            React.render(React.createElement(BookinglistingProjectContainer, { data: this.props.data }), document.getElementById('manageprojectcontent'));
        }
    },

    handleProjectDelete: function handleProjectDelete(childdata) {
        /*
            Re-loads project list from server after delete instead of simply adjusting state client-side. This code is inefficient.
        */
        var projectid = childdata;
        var r = confirm("Are you sure you want to delete this project? WARNING: this action cannot be undone.");
        if (r == true) {
            $.ajax({
                type: "POST",
                url: "/user/projects/delete",
                //dataType: "text"
                data: {
                    "project_id": projectid,
                    _token: $_token
                },
                error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                },
                success: function success(response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    React.unmountComponentAtNode(document.getElementById('content-modal'));
                    React.unmountComponentAtNode(document.getElementById('content-menu'));
                    React.unmountComponentAtNode(document.getElementById('content-main'));
                    React.initializeTouchEvents(true);
                    React.render(React.createElement(ProjectsMenu, null), document.getElementById('content-menu'));
                }
            });
        }
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(ProjectIsActiveEditHeader, { data: this.props.data, handleProjectDelete: this.handleProjectDelete }),
                React.createElement(
                    'ul',
                    { className: 'nav nav-tabs' },
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-about', onClick: this.handleClick },
                            'About'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-user', onClick: this.handleClick },
                            'Users'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-show', onClick: this.handleClick },
                            'Shows'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-banner', onClick: this.handleClick },
                            'Banners'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-photoalbum', onClick: this.handleClick },
                            'Photo Albums'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-video', onClick: this.handleClick },
                            'Video'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-audio', onClick: this.handleClick },
                            'Audio'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-social', onClick: this.handleClick },
                            'Social Media'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-contact', onClick: this.handleClick },
                            'Contact Info'
                        )
                    ),
                    React.createElement(
                        'li',
                        { role: 'presentation' },
                        React.createElement(
                            'a',
                            { id: 'add-listing', onClick: this.handleClick },
                            'Listings'
                        )
                    )
                )
            ),
            React.createElement('div', { id: 'manageprojectcontent' })
        );
    }
});

var ProjectIsActiveEditHeader = React.createClass({
    displayName: 'ProjectIsActiveEditHeader',

    getInitialState: function getInitialState() {
        return { project_active: {
                isactive: false, activatebutton_text: '', projectviewbutton: ''
            }
        };
    },

    componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;
        $.ajax({
            type: "GET",
            url: "/user_project_active_status",
            data: {
                "project_id": projectid
            },
            error: (function () {
                this.setState({ project_active: {
                        isactive: null, activatebutton_text: '', projectviewbutton: 'Could not get project status from server.' } });
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this),
            success: (function (response) {
                console.log(response);
                if (response == 1) {
                    this.setState({ project_active: {
                            isactive: true, activatebutton_text: '(Active - click to deactivate)', projectviewbutton: 'View Project Page' } });
                }
                if (response == 0) {
                    this.setState({ project_active: { isactive: false, activatebutton_text: '(Inactive - click to activate)', projectviewbutton: 'Activate your project to view it.' } });
                }
            }).bind(this)
        });
    },

    handleProjectActiveToggle: function handleProjectActiveToggle() {
        var isactive = this.state.project_active.isactive;
        var projectid = this.props.data.project_id;
        if (isactive == false) {
            $.ajax({
                type: "POST",
                url: "/user/projects/activate",
                //dataType: "text"
                data: {
                    "project_id": projectid,
                    _token: $_token
                },
                error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br/>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                },
                success: (function () {
                    this.setState({ project_active: {
                            isactive: true, activatebutton_text: '(Active - click to deactivate)', projectviewbutton: 'View Project Page' } });
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been activated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }).bind(this)
            });
        } else if (isactive == true) {
            $.ajax({
                type: "POST",
                url: "/user/projects/deactivate",
                //dataType: "text"
                data: {
                    "project_id": projectid,
                    _token: $_token
                },
                error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error communicating with the server.<br>Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                },
                success: (function () {
                    this.setState({ project_active: { isactive: false, activatebutton_text: '(Inactive - click to activate)', projectviewbutton: 'Activate your project to view it.' } });
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Project has been deactivated.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }).bind(this)
            });
        }
    },

    viewProjectPage: function viewProjectPage() {
        var isactive = this.state.project_active.isactive;
        if (isactive == false) {
            alert('You must activate your project to preview it.');
        } else if (isactive == true) {
            var projectlinkstring = '/' + this.props.data.project_url + '';
            window.open(projectlinkstring);
        }
    },

    handleProjectDelete: function handleProjectDelete() {
        var data = this.props.data.project_id;
        this.props.handleProjectDelete(data);
    },

    render: function render() {
        var isactive = this.state.project_active.isactive;
        //var activatebuttonstyle = {};
        if (isactive == false) {
            console.log('false detected');
            var activatebuttonstyle = { paddingLeft: 10, marginRight: 10 }; //, color:'yellow'
            var projectviewbutton = { paddingLeft: 10 }; //color:'#333333'
            var projectviewbuttonclass = 'btn btn-default';
            var projectactivatebuttonclass = 'btn btn-warning';
        } else {
            var activatebuttonstyle = { paddingLeft: 10, marginRight: 10 }; //, color:'green'
            var projectviewbutton = { paddingLeft: 10 };
            var projectviewbuttonclass = 'btn btn-info';
            var projectactivatebuttonclass = 'btn btn-success';
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                this.props.data.project_name
            ),
            React.createElement(
                'a',
                { className: 'btn btn-danger pull-right', onClick: this.handleProjectDelete, onTouchStart: this.handleProjectDelete },
                'Delete Project'
            ),
            React.createElement(
                'h4',
                null,
                React.createElement(
                    'a',
                    { className: projectactivatebuttonclass, style: activatebuttonstyle, onClick: this.handleProjectActiveToggle },
                    this.state.project_active.activatebutton_text
                ),
                React.createElement(
                    'a',
                    { className: projectviewbuttonclass, style: projectviewbutton, onClick: this.viewProjectPage },
                    this.state.project_active.projectviewbutton
                )
            )
        );
    }
});