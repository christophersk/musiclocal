'use strict';

React.initializeTouchEvents(true);

var VideosMenu = React.createClass({
    displayName: 'VideosMenu',

    getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'VideoContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'VideoCreateContainer', mountlocation: 'content-main', active: false }] };
    },

    onLinkClick: function onLinkClick(data) {
        React.unmountComponentAtNode(document.getElementById('content-main'));
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').html('');
        $('#content-main').show();
        if (data == 'VideoContainer') {
            React.render(React.createElement(VideoContainer, null), document.getElementById('content-main'));
        } else if (data == 'VideoCreateContainer') {
            React.render(React.createElement(VideoCreateContainer, null), document.getElementById('content-main'));
        }
    },

    render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(PhotoalbumsMenuLink, { name: link.name, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'h4',
                    { className: 'menuheader' },
                    'Videos'
                )
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12' },
                React.createElement(
                    'ul',
                    { className: 'nav nav-pills nav-justified' },
                    links
                )
            )
        );
    }
});

var VideosMenuLink = React.createClass({
    displayName: 'VideosMenuLink',

    onLinkClick: function onLinkClick() {

        this.props.onLinkClick(this.props.reactnodetomount);
    },

    render: function render() {
        return React.createElement(
            'li',
            { role: 'presentation' },
            React.createElement(
                'a',
                { onClick: this.onLinkClick },
                this.props.name
            )
        );
    }
});