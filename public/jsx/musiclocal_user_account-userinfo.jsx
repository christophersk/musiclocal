var UserInfoContainer = React.createClass({

    getInitialState: function(){
        return {
            user_first_name: null,
            user_last_name: null,
            email: null,
            user_location: null
        };
    },

    componentDidMount: function(){

        $.ajax({
            type: "GET",
            url: "user/ajax/account/userinfo",
            data: {
            _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }.bind(this)),
            success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('User information retrieved successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                var parsedresponse = JSON.parse(response);
                this.setState({user_first_name: parsedresponse.user_first_name, user_last_name: parsedresponse.user_last_name, email: parsedresponse.email, user_location: parsedresponse.user_location});
            }.bind(this))
        })
    },

    submitUpdateUserInfo: function(){
        var user_first_name = this.state.user_first_name;
        var user_last_name = this.state.user_last_name;
        var email = this.state.email;
        var user_location = this.state.user_location;

        $.ajax({
            type: "POST",
            url: "user/ajax/account/userinfo",
            data: {
            "user_first_name": user_first_name,
            "user_last_name": user_last_name,
            //"email": email,
            "user_location": user_location,
            _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                window.location.reload();
                //ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
                //ReactDOM.render(<BannerHeadlineContainer url=""/>, document.getElementById('content-main'));
            })
        })
    },

    handleUserFirstNameTextEntry: function(event){
        this.setState({user_first_name: event.target.value});
    },

    handleUserLastNameTextEntry: function(event){
        this.setState({user_last_name: event.target.value});
    },

    handleEmailTextEntry: function(event){
        this.setState({email: event.target.value});
    },

    handleLocationTextEntry: function(event){
        this.setState({user_location: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var user_first_name_defaulttext = this.state.user_first_name;
        var user_last_name_defaulttext = this.state.user_last_name;
        var email_defaulttext = this.state.email;
        var user_location_defaulttext = this.state.user_location;
        var paddiv = {padding:8};
        return (
        <div className="col-sm-12">
        <form className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="user_first_name_textinput">First Name:</label>
                <div className="col-sm-9">
                    <input type="text" id="bannerheadline_h1_textinput" className="form-control" value={user_first_name_defaulttext} onChange={this.handleUserFirstNameTextEntry}/>
                </div>
                <label className="col-sm-3 control-label" htmlFor="user_last_name_textinput">Last Name:</label>
                <div className="col-sm-9">
                    <input type="text" id="user_last_name_textinput" className="form-control" value={user_last_name_defaulttext} onChange={this.handleUserLastNameTextEntry}/>
                </div>
                <label className="col-sm-3 control-label" htmlFor="user_location_textinput">Location:</label>
                <div className="col-sm-9">
                    <textarea id="user_location_textinput" className="form-control" rows="6" value={user_location_defaulttext} onChange={this.handleLocationTextEntry} readOnly="true"/>
                </div>
            </div>
            <div style={submitstyle}><a onClick={this.submitUpdateUserInfo} className="btn btn-primary">Update User Info</a></div>
        </form>
        </div>
        );
    }

});