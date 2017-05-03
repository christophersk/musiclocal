'use strict';

React.initializeTouchEvents(true);

var PhotoalbumsMenu = React.createClass({
    displayName: 'PhotoalbumsMenu',

    getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'PhotoalbumContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'PhotoalbumCreateContainer', mountlocation: 'content-main', active: false }] };
    },

    componentDidMount: function componentDidMount() {
        console.log('banner menu mounted');
        this.setState({ links: [{ name: 'Manage', reactnodetomount: 'PhotoalbumContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'PhotoalbumCreateContainer', mountlocation: 'content-main', active: false }] });
    },

    onLinkClick: function onLinkClick(data) {
        React.unmountComponentAtNode(document.getElementById('content-main'));
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').html('');
        $('#content-main').show();
        if (data == 'PhotoalbumContainer') {
            React.render(React.createElement(PhotoalbumContainer, null), document.getElementById('content-main'));
        } else if (data == 'PhotoalbumCreateContainer') {
            React.render(React.createElement(PhotoalbumCreateContainer, null), document.getElementById('content-main'));
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
                    'Photo Albums'
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

var PhotoalbumsMenuLink = React.createClass({
    displayName: 'PhotoalbumsMenuLink',

    componentDidMount: function componentDidMount() {},

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