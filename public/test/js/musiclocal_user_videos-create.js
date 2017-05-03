"use strict";

React.initializeTouchEvents(true);

var VideoCreateContainer = React.createClass({
    displayName: "VideoCreateContainer",

    getInitialState: function getInitialState() {
        return { youtubevideo_identifier: [] };
    },

    componentDidMount: function componentDidMount() {},

    submitAddNewYoutubevideo: function submitAddNewYoutubevideo() {
        var youtubevideoidentifier = this.state.youtubevideo_identifier;
        $.ajax({
            type: "POST",
            url: "user/videos",
            data: {
                "youtubevideo_identifier": youtubevideoidentifier,
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                //var parsedresponse = JSON.parse(response);
                //this.setState({data: parsedresponse});
                React.unmountComponentAtNode(document.getElementById('content-main'));
                React.render(React.createElement(VideoContainer, { url: "" }), document.getElementById('content-main'));
                //location.reload();
                alert('Your video has been added.');
            }).bind(this)
        });
    },

    handleYoutubevideoIdentifierTextEntry: function handleYoutubevideoIdentifierTextEntry(event) {
        this.setState({ youtubevideo_identifier: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var youtubevideoidentifierdefaulttext = this.state.youtubevideo_identifier;
        //var projecturldefaulttext = this.state.project_url;
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
                        { className: "col-sm-3 control-label", htmlFor: "youtubevideoidentifiertextinput" },
                        "Youtube Video URL:"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("input", { type: "text", id: "youtubevideoidentifiertextinput", className: "form-control", value: youtubevideoidentifierdefaulttext, onChange: this.handleYoutubevideoIdentifierTextEntry })
                    )
                ),
                React.createElement(
                    "div",
                    { style: submitstyle },
                    React.createElement(
                        "a",
                        { onClick: this.submitAddNewYoutubevideo },
                        "Add Youtube Video"
                    )
                )
            )
        );
    }

});