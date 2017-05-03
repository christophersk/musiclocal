'use strict';

React.initializeTouchEvents(true);

var ShowsProjectContainer = React.createClass({
    displayName: 'ShowsProjectContainer',

    getInitialState: function getInitialState() {
        return { bandsintownwidget_artistname: [], bandsintownwidget_active: [] };
    },

    componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/bandsintownwidget/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {},
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                var bandsintownartistname = parsedresponse.bandsintownwidget_artistname;
                var bandsintownwidgetactive = parsedresponse.bandsintownwidget_active;
                this.setState({ bandsintownwidget_artistname: bandsintownartistname, bandsintownwidget_active: bandsintownwidgetactive });
            }).bind(this)
        });
    },

    submitBandsintownwidgetChange: function submitBandsintownwidgetChange() {
        var projectid = this.props.data.project_id;
        var bandsintownwidgetartistname = this.state.bandsintownwidget_artistname;
        $.ajax({
            type: "POST",
            url: "/user/projects/bandsintownwidget/addchange",
            data: {
                "project_id": projectid,
                "bandsintownwidget_artistname": bandsintownwidgetartistname,
                "bandsintownwidget_active": true,
                _token: $_token
            },
            error: function error() {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this)
        });
    },

    handleBandsintownwidgetTextEntry: function handleBandsintownwidgetTextEntry(event) {
        this.setState({ bandsintownwidget_artistname: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var bandsintownwidgetdefaulttext = this.state.bandsintownwidget_artistname;
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
                        { className: 'col-sm-3 control-label', htmlFor: 'bandsintownwidgettextinput' },
                        'Enter Bandsintown Artist Name:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-9' },
                        React.createElement('input', { type: 'text', id: 'bandsintownwidgettextinput', className: 'form-control', value: bandsintownwidgetdefaulttext, onChange: this.handleBandsintownwidgetTextEntry })
                    )
                ),
                React.createElement(
                    'div',
                    { style: submitstyle },
                    React.createElement(
                        'a',
                        { onClick: this.submitBandsintownwidgetChange },
                        'Submit'
                    )
                )
            )
        );
    }
});