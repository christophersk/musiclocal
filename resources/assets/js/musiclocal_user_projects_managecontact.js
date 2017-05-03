'use strict';

React.initializeTouchEvents(true);

var ContactProjectContainer = React.createClass({
    displayName: 'ContactProjectContainer',

    getInitialState: function getInitialState() {
        return { contact_email: [] };
    },

    componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/contactinfo/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {},
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                var contactinfoemail = parsedresponse.contactinfo_email;
                this.setState({ contactinfo_email: contactinfoemail });
            }).bind(this)
        });
    },

    submitContactinfoChange: function submitContactinfoChange() {
        var projectid = this.props.data.project_id;
        var contactinfoemail = this.state.contactinfo_email;
        $.ajax({
            type: "POST",
            url: "/user/projects/contactinfo/addchange",
            data: {
                "project_id": projectid,
                "contactinfo_email": contactinfoemail,
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

    handleContactinfoTextEntry: function handleContactinfoTextEntry(event) {
        this.setState({ contactinfo_email: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var contactinfodefaulttext = this.state.contactinfo_email;
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
                        { className: 'col-sm-3 control-label', htmlFor: 'contactinfotextinput' },
                        'Enter Contact Email:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-9' },
                        React.createElement('input', { type: 'text', id: 'contactinfotextinput', className: 'form-control', value: contactinfodefaulttext, onChange: this.handleContactinfoTextEntry })
                    )
                ),
                React.createElement(
                    'div',
                    { style: submitstyle },
                    React.createElement(
                        'a',
                        { onClick: this.submitContactinfoChange },
                        'Submit'
                    )
                )
            )
        );
    }
});