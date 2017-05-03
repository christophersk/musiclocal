'use strict';

React.initializeTouchEvents(true);

var SocialAddContainer = React.createClass({
    displayName: 'SocialAddContainer',

    getInitialState: function getInitialState() {
        return { facebook: [], twitter: [] };
    },

    componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/social/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {},
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                var facebookpageurl = 'https://www.facebook.com/' + parsedresponse.facebook;
                var twitterurl = 'https://twitter.com/' + parsedresponse.twitter;
                this.setState({ facebook: facebookpageurl, twitter: twitterurl });
            }).bind(this)
        });
    },

    submitFacebookwidgetChange: function submitFacebookwidgetChange() {
        var projectid = this.props.data.project_id;
        var facebookwidgeturl = this.state.facebook;
        $.ajax({
            type: "POST",
            url: "/user/projects/facebookwidget/addchange",
            data: {
                "project_id": projectid,
                "facebookwidget_url": facebookwidgeturl,
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this)
        });
    },

    submitTwitterwidgetChange: function submitTwitterwidgetChange() {
        alert('The twitter widget embed is not ready. Sorry :(');
        return;
        var projectid = this.props.data.project_id;
        var twitterwidgeturl = this.state.twitter;
        $.ajax({
            type: "POST",
            url: "/user/projects/twitterwidget/addchange",
            data: {
                "project_id": projectid,
                "twitterwidget_url": twitterwidgeturl,
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this)
        });
    },

    handleFacebookTextEntry: function handleFacebookTextEntry(event) {
        this.setState({ facebook: event.target.value });
    },

    handleTwitterTextEntry: function handleTwitterTextEntry(event) {
        this.setState({ twitter: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var facebookdefaulttext = this.state.facebook;
        var twitterdefaulttext = this.state.twitter;
        var paddiv = { padding: 8 };
        return React.createElement(
            'div',
            { className: 'col-sm-12' },
            React.createElement('br', null),
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-3 control-label', htmlFor: 'facebooktextinput' },
                        'Enter Facebook Page URL:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-9' },
                        React.createElement('input', { type: 'text', id: 'facebooktextinput', className: 'form-control', value: facebookdefaulttext, onChange: this.handleFacebookTextEntry })
                    )
                ),
                React.createElement(
                    'div',
                    { style: submitstyle },
                    React.createElement(
                        'a',
                        { onClick: this.submitFacebookwidgetChange },
                        'Submit'
                    )
                )
            ),
            React.createElement('div', { style: paddiv }),
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-3 control-label', htmlFor: 'twittertextinput' },
                        'Enter Twitter URL or Username:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-9' },
                        React.createElement('input', { type: 'text', id: 'twittertextinput', className: 'form-control', value: twitterdefaulttext, onChange: this.handleTwitterTextEntry })
                    )
                ),
                React.createElement(
                    'div',
                    { style: submitstyle },
                    React.createElement(
                        'a',
                        { onClick: this.submitTwitterwidgetChange },
                        'Submit'
                    )
                )
            )
        );
    }

});