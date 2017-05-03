var SubscribeContainer = React.createClass ({

    render: function() {
        return (
            <div>
                <SubscribeButton />
            </div>
        );
    }
});

var SubscribeButton = React.createClass ({

    handleClick: function(){
        ReactDOM.render(<SubscribeForm url=''/>, document.getElementById('subscribeformplaceholder'));
        $('html,body').animate({
            scrollTop: $('#subscribeformplaceholder').offset().top - 100
        }, 500);
    },

    render: function() {

        return (
            <div>
                <a className="actionbutton btn btn-default" onClick={this.handleClick}>Subscribe for updates</a>
            </div>
        );
    }
});

var SubscribeForm = React.createClass ({

    getInitialState: function(){
        return { contact_email: '' };
    },

    handleClose: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('subscribeformplaceholder'));
        $('html,body').animate({
            scrollTop: (window).innerHeight / 2
        }, 500);
    },

    handleSubmit: function() {
        var contactemail = this.state.contact_email;
        var projectid = localStorage.getItem('projectid');
        $.ajax({
            type: "POST",
            url: "/project/subscribe/contact",
            data: {
            "contact_email": contactemail,
            "project_id": projectid
            },
            error: (function (response) {
                alert('There was an error. Please try again later.');
            }),
            success: (function (response) {
                alert(response);
                this.handleClose();
            }.bind(this))
        })
    },

    handleEmailTextEntry: function(event){
        this.setState({contact_email: event.target.value});
    },

    render: function() {
        var emaildefaulttext = this.state.contact_email;
        var spacerstyle = {paddingLeft:10};
        var formstyle = {border: '1px solid #333333',backgroundColor: "rgba(255,255,255,.9)",borderRadius:5,paddingTop:20,paddingBottom:20,marginBottom:20};
        var subscribeheaderstyle = {textAlign:'center'};
        return (
            <div className="row">
            <div className="col-sm-10 col-sm-offset-1" style={formstyle}>
                <div style={subscribeheaderstyle}>
                    <h4>Subscribe</h4>
                    <p><em>To subscribe to the mailing list, enter your email address and press "subscribe."</em></p>
                </div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="emailinput">Email:</label>
                        <div className="col-sm-9">
                            <input type="text" id="emailtextinput" className="form-control" value={emaildefaulttext} onChange={this.handleEmailTextEntry} />
                        </div>
                    </div>
                </form>
                <a id="submitsubscribeform" className="btn btn-primary" onClick={this.handleSubmit} >Subscribe</a>
                <span style={spacerstyle}></span>
                <a id="closesusbcribeform" className="btn btn-default" onClick={this.handleClose} >Close</a>
            </div>
            </div>
        );
    }
});