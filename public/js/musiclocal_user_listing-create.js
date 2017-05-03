"use strict";

React.initializeTouchEvents(true);

var ListingCreateContainer = React.createClass({
    displayName: "ListingCreateContainer",

    getInitialState: function getInitialState() {
        return {
            listing_title: null,
            listing_content: null
        };
    },

    componentDidMount: function componentDidMount() {},

    submitCreateNewListing: function submitCreateNewListing() {
        var listingtitle = this.state.listing_title;
        var listingcontent = this.state.listing_content;

        $.ajax({
            type: "POST",
            url: "user/ajax/bookinglisting_create",
            data: {
                "bookinglisting_title": listingtitle,
                "bookinglisting_content": listingcontent,
                _token: $_token
            },
            error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: function success(response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your listing has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                React.unmountComponentAtNode(document.getElementById('content-main'));
                React.render(React.createElement(ListingContainer, { url: "" }), document.getElementById('content-main'));
            }
        });
    },

    handleListingTitleTextEntry: function handleListingTitleTextEntry(event) {
        this.setState({ listing_title: event.target.value });
    },

    handleListingContentTextEntry: function handleListingContentTextEntry(event) {
        this.setState({ listing_content: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var listingtitledefaulttext = this.state.listing_title;
        var listingcontentdefaulttext = this.state.listing_content;
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
                        { className: "col-sm-3 control-label", htmlFor: "listingtitletextinput" },
                        "Listing Title:"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("input", { type: "text", id: "listingtitletextinput", className: "form-control", value: listingtitledefaulttext, onChange: this.handleListingTitleTextEntry })
                    ),
                    React.createElement(
                        "label",
                        { className: "col-sm-3 control-label", htmlFor: "listingcontenttextinput" },
                        "Listing Content:"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-9" },
                        React.createElement("textarea", { id: "listingcontenttextinput", className: "form-control", rows: "6", value: listingcontentdefaulttext, onChange: this.handleListingContentTextEntry })
                    )
                ),
                React.createElement(
                    "div",
                    { style: submitstyle },
                    React.createElement(
                        "a",
                        { onClick: this.submitCreateNewListing },
                        "Create Listing"
                    )
                )
            )
        );
    }

});