'use strict';

React.initializeTouchEvents(true);
var BannersMenu = React.createClass({
    displayName: 'BannersMenu',

    getInitialState: function getInitialState() {
        return { links: [{ name: 'Manage', reactnodetomount: 'BannerContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'BannerCreateContainer', mountlocation: 'content-main', active: false }] };
    },

    componentDidMount: function componentDidMount() {
        console.log('banner menu mounted');
        this.setState({ links: [{ name: 'Manage', reactnodetomount: 'BannerContainer', mountlocation: 'content-main', active: false }, { name: 'Create', reactnodetomount: 'BannerCreateContainer', mountlocation: 'content-main', active: false }] });
    },

    onLinkClick: function onLinkClick(data) {
        React.unmountComponentAtNode(document.getElementById('content-main'));
        React.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
        if (data == 'BannerContainer') {
            React.render(React.createElement(BannerContainer, null), document.getElementById('content-main'));
        } else if (data == 'BannerCreateContainer') {
            React.render(React.createElement(BannerCreateContainer, null), document.getElementById('content-main'));
        }
    },

    render: function render() {
        var links = this.state.links.map((function (link) {
            return React.createElement(BannersMenuLink, { name: link.name, reactnodetomount: link.reactnodetomount, onLinkClick: this.onLinkClick });
        }).bind(this));
        return React.createElement(
            'div',
            { className: 'col-sm-12' },
            React.createElement(
                'ul',
                { className: 'nav nav-pills nav-justified' },
                React.createElement(
                    'li',
                    { role: 'presentation', className: 'disabled pull-left' },
                    React.createElement(
                        'a',
                        { className: 'navbar-brand' },
                        'Banners:'
                    )
                ),
                links
            )
        );
    }
});

var BannersMenuLink = React.createClass({
    displayName: 'BannersMenuLink',

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