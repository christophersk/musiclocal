'use strict';

React.initializeTouchEvents(true);
var ListingMenu = React.createClass({
    displayName: 'ListingMenu',

    getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'ListingContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'ListingCreateContainer', mountlocation: 'content-main', active: false }] };
    },

    componentDidMount: function componentDidMount() {
        this.setState({ links: [{ name: 'Manage', reactnodetomount: 'ListingContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'ListingCreateContainer', mountlocation: 'content-main', active: false }] });
    },

    onLinkClick: function onLinkClick(data) {
        React.unmountComponentAtNode(document.getElementById('content-main'));
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
        if (data == 'ListingContainer') {
            React.render(React.createElement(ListingContainer, null), document.getElementById('content-main'));
        } else if (data == 'ListingCreateContainer') {
            React.render(React.createElement(ListingCreateContainer, null), document.getElementById('content-main'));
        }
    },

    render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(ListingMenuLink, { name: link.name, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
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
                    'Listings'
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

var ListingMenuLink = React.createClass({
    displayName: 'ListingMenuLink',

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