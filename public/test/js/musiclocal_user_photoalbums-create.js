"use strict";

React.initializeTouchEvents(true);

var PhotoalbumCreateContainer = React.createClass({
    displayName: "PhotoalbumCreateContainer",

    getInitialState: function getInitialState() {
        return { photoalbum_name: [] };
    },

    componentDidMount: function componentDidMount() {},

    submitCreateNewPhotoalbum: function submitCreateNewPhotoalbum() {
        var photoalbumname = this.state.photoalbum_name;
        $.ajax({
            type: "POST",
            url: "user/ajax/post/add_photoalbum",
            data: {
                "photoalbum_name": photoalbumname,
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
                React.render(React.createElement(PhotoalbumContainer, { url: "" }), document.getElementById('content-main'));
                //location.reload();
                alert('Your photo album has been created.');
            }).bind(this)
        });
    },

    handlePhotoalbumNameTextEntry: function handlePhotoalbumNameTextEntry(event) {
        this.setState({ photoalbum_name: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var photoalbumnamedefaulttext = this.state.photoalbum_name;
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
                        "Photo Album Name:"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("input", { type: "text", id: "photoalbumnametextinput", className: "form-control", value: photoalbumnamedefaulttext, onChange: this.handlePhotoalbumNameTextEntry })
                    )
                ),
                React.createElement(
                    "div",
                    { style: submitstyle },
                    React.createElement(
                        "a",
                        { onClick: this.submitCreateNewPhotoalbum },
                        "Create Photo Album"
                    )
                )
            )
        );
    }

});