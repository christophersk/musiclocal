"use strict";

React.initializeTouchEvents(true);

var EventCreateContainer = React.createClass({
    displayName: "EventCreateContainer",

    getInitialState: function getInitialState() {
        return { event_name: [] };
    },

    componentDidMount: function componentDidMount() {},

    submitCreateNewEvent: function submitCreateNewEvent() {
        var photoalbumname = this.state.event_name;
        var callbackurl = 'http://www.musiclocal.org/user';
        var timestamp = Math.floor(Date.now() / 1000);

        var randomString = function randomString() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 16; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        var shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.setHMACKey("fe29a8e561b3d15803", "TEXT");
        shaObj.update("fe29a8e561b3d15803" + "&" + "97edfe539abbdd4f8aa2");
        var hmac = shaObj.getHMAC("HEX");
        var oathversion = '1.0';
        var oathsignaturemethod = 'HMAC-SHA1';
        var oathconsumerkey = 'fe29a8e561b3d15803';
        $.ajax({
            type: "POST",
            url: "http://eventfultest.com/oauth/request_token",
            data: {
                "oauth_callback": callbackurl,
                "oath_consumer_key": oathconsumerkey,
                "timestamp": timestamp,
                "nonce": randomString,
                "oauth_version": oathversion,
                "oath_signature": hmac,
                "oauth_signature_method": oathsignaturemethod
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                //var parsedresponse = JSON.parse(response);
                //this.setState({data: parsedresponse});
                React.unmountComponentAtNode(document.getElementById('content-main'));
                React.render(React.createElement(PhotoalbumContainer, { url: "" }), document.getElementById('content-main'));
                //location.reload();
                alert('Your photo album has been created.');
            }).bind(this)
        });
    },

    handleEventNameTextEntry: function handleEventNameTextEntry(event) {
        this.setState({ event_name: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var photoalbumnamedefaulttext = this.state.event_name;
        var projecturldefaulttext = this.state.project_url;
        var paddiv = { padding: 8 };
        return React.createElement(
            "div",
            { className: "col-sm-12" },
            React.createElement(
                "form",
                { className: "form-horizontal" },
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "label",
                        { className: "col-sm-3 control-label", htmlFor: "photoalbumnametextinput" },
                        "Event Name:"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("input", { type: "text", id: "photoalbumnametextinput", className: "form-control", value: photoalbumnamedefaulttext, onChange: this.handleEventNameTextEntry })
                    )
                ),
                React.createElement(
                    "div",
                    { style: submitstyle },
                    React.createElement(
                        "a",
                        { onClick: this.submitCreateNewEvent },
                        "Create Event"
                    )
                )
            )
        );
    }

});