'use strict';

React.initializeTouchEvents(true);

var AudioProjectContainer = React.createClass({
    displayName: 'AudioProjectContainer',

    getInitialState: function getInitialState() {
        return { soundcloudwidget_path: [], soundcloudwidget_script: [] };
    },

    componentDidMount: function componentDidMount() {
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/audio/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {},
            success: (function (response) {
                var parsedresponse = JSON.parse(response);
                var soundcloudwidget_path = 'https://www.soundcloud.com/' + parsedresponse.soundcloudwidget_path;
                var soundcloudwidget_script = parsedresponse.soundcloudwidget_script;
                this.setState({ soundcloudwidget_path: soundcloudwidget_path, soundcloudwidget_script: soundcloudwidget_script });
            }).bind(this)
        });
    },

    submitSoundcloudwidgetChange: function submitSoundcloudwidgetChange() {
        var projectid = this.props.data.project_id;
        var soundcloudwidget_path = this.state.soundcloudwidget_path;
        if (this.state.soundcloudwidget_script == '') {
            var soundcloudwidget_script = null;
        } else {
            var soundcloudwidget_script = this.state.soundcloudwidget_script;
        }
        $.ajax({
            type: "POST",
            url: "/user/projects/soundcloudwidget/addchange",
            data: {
                "project_id": projectid,
                "soundcloudwidget_path": soundcloudwidget_path,
                "soundcloudwidget_script": soundcloudwidget_script,
                _token: $_token
            },
            error: function error() {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            },
            success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }).bind(this)
        });
    },

    handleSoundcloudTextEntry: function handleSoundcloudTextEntry(event) {
        this.setState({ soundcloudwidget_path: event.target.value });
    },

    handleSoundcloudscriptTextEntry: function handleSoundcloudscriptTextEntry(event) {
        this.setState({ soundcloudwidget_script: event.target.value });
    },

    render: function render() {
        var submitstyle = { textAlign: 'center', width: '100%', paddingTop: 5 };
        var soundclouddefaulttext = this.state.soundcloudwidget_path;
        var soundcloudscriptdefaulttext = this.state.soundcloudwidget_script;
        var paddiv = { padding: 8 };
        return React.createElement(
            'div',
            { className: 'col-sm-12' },
            React.createElement('br', null),
            React.createElement('div', { style: paddiv }),
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-3 control-label', htmlFor: 'soundcloudtextinput' },
                        'Enter Soundcloud URL or Username:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-9' },
                        React.createElement('input', { type: 'text', id: 'soundcloudtextinput', className: 'form-control', value: soundclouddefaulttext, onChange: this.handleSoundcloudTextEntry })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-3 control-label', htmlFor: 'soundcloudtextinput' },
                        'Enter Soundcloud widget script:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-9' },
                        React.createElement('textarea', { className: 'form-control', rows: '5', id: 'soundcloudscripttextinput', value: soundcloudscriptdefaulttext, onChange: this.handleSoundcloudscriptTextEntry })
                    )
                ),
                React.createElement(
                    'div',
                    { style: submitstyle },
                    React.createElement(
                        'a',
                        { onClick: this.submitSoundcloudwidgetChange },
                        'Submit'
                    )
                )
            )
        );
    }

});