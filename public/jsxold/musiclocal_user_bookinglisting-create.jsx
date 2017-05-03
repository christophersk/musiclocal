var BookinglistingCreateContainer = React.createClass({

    getInitialState: function(){
        return {
            listing_title: null,
            listing_content: null
        };
    },

    componentDidMount: function(){

    },

    submitCreateNewListing: function(){
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
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your listing has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
                ReactDOM.render(<BookinglistingContainer url=""/>, document.getElementById('content-main'));
            })
        })
    },

    handleListingTitleTextEntry: function(event){
        this.setState({listing_title: event.target.value});
    },

    handleListingContentTextEntry: function(event){
        this.setState({listing_content: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var listingtitledefaulttext = this.state.listing_title;
        var listingcontentdefaulttext = this.state.listing_content;
        var paddiv = {padding:8};
        return (
        <div className="col-sm-12">
        <form className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="listingtitletextinput">Listing Title:</label>
                <div className="col-sm-9">
                    <input type="text" id="listingtitletextinput" className="form-control" value={listingtitledefaulttext} onChange={this.handleListingTitleTextEntry}/>
                </div>
                <label className="col-sm-3 control-label" htmlFor="listingcontenttextinput">Listing Content:</label>
                <div className="col-sm-9">
                    <textarea id="listingcontenttextinput" className="form-control" rows="6" value={listingcontentdefaulttext} onChange={this.handleListingContentTextEntry} />
                </div>
            </div>
            <div style={submitstyle}><a onClick={this.submitCreateNewListing} >Create Listing</a></div>
        </form>
        </div>
        );
    }

});