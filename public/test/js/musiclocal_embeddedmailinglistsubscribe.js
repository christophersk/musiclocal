'use strict';

React.initializeTouchEvents(true);
$(document).ready(function () {

    var SubscribeContainer = React.createClass({
        displayName: 'SubscribeContainer',

        render: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(SubscribeButton, null)
            );
        }
    });

    var SubscribeButton = React.createClass({
        displayName: 'SubscribeButton',

        handleClick: function handleClick() {
            React.render(React.createElement(SubscribeForm, { url: '' }), document.getElementById('subscribeformplaceholder'));
            $('html,body').animate({
                scrollTop: $('#subscribeformplaceholder').offset().top - 100
            }, 500);
        },

        render: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { className: 'btn btn-default', onClick: this.handleClick },
                    'Subscribe for updates'
                )
            );
        }
    });

    var SubscribeForm = React.createClass({
        displayName: 'SubscribeForm',

        getInitialState: function getInitialState() {
            return { contact_email: '' };
        },

        handleClose: function handleClose() {
            React.unmountComponentAtNode(document.getElementById('subscribeformplaceholder'));
            $('html,body').animate({
                scrollTop: window.innerHeight / 2
            }, 500);
        },

        handleSubmit: function handleSubmit() {
            var contactemail = this.state.contact_email;
            var projectid = localStorage.getItem('projectid');
            $.ajax({
                type: "POST",
                url: "/project/subscribe/contact",
                data: {
                    "contact_email": contactemail,
                    "project_id": projectid
                },
                error: function error(response) {
                    alert('There was an error. Please try again later.');
                },
                success: (function (response) {
                    alert(response);
                    this.handleClose();
                }).bind(this)
            });
        },

        handleEmailTextEntry: function handleEmailTextEntry(event) {
            this.setState({ contact_email: event.target.value });
        },

        render: function render() {
            var emaildefaulttext = this.state.contact_email;
            var spacerstyle = { paddingLeft: 10 };
            var formstyle = { border: '1px solid #333333', borderRadius: 5, paddingTop: 20, paddingBottom: 20, marginBottom: 20 };
            var subscribeheaderstyle = { textAlign: 'center' };
            return React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-10 col-sm-offset-1', style: formstyle },
                    React.createElement(
                        'div',
                        { style: subscribeheaderstyle },
                        React.createElement(
                            'h4',
                            null,
                            'Subscribe'
                        ),
                        React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'em',
                                null,
                                'To subscribe to the mailing list, enter your email address and press "subscribe."'
                            )
                        )
                    ),
                    React.createElement(
                        'form',
                        { className: 'form-horizontal' },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'col-sm-3 control-label', htmlFor: 'emailinput' },
                                'Email:'
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-9' },
                                React.createElement('input', { type: 'text', id: 'emailtextinput', className: 'form-control', value: emaildefaulttext, onChange: this.handleEmailTextEntry })
                            )
                        )
                    ),
                    React.createElement(
                        'a',
                        { id: 'submitsubscribeform', className: 'btn btn-primary', onClick: this.handleSubmit },
                        'Subscribe'
                    ),
                    React.createElement('span', { style: spacerstyle }),
                    React.createElement(
                        'a',
                        { id: 'closesusbcribeform', className: 'btn btn-default', onClick: this.handleClose },
                        'Close'
                    )
                )
            );
        }
    });

    React.render(React.createElement(SubscribeContainer, { url: '' }), document.getElementById('subscribebuttonplaceholder'));
});