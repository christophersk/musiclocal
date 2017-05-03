var BannerHeadlineCreateContainer = React.createClass({

    getInitialState: function(){
        return {
            bannerheadline_h1: null,
            bannerheadline_h2: null,
            bannerheadline_h3: null,
            bannerheadline_h3link: null
        };
    },

    componentDidMount: function(){

    },

    submitCreateNewBannerHeadline: function(){
        var bannerheadline_h1 = this.state.bannerheadline_h1;
        var bannerheadline_h2 = this.state.bannerheadline_h2;
        var bannerheadline_h3 = this.state.bannerheadline_h3;
        var bannerheadline_h3link = this.state.bannerheadline_h3link;

        $.ajax({
            type: "POST",
            url: "user/ajax/edit_or_create_bannerheadline",
            data: {
            "bannerheadline_h1": bannerheadline_h1,
            "bannerheadline_h2": bannerheadline_h2,
            "bannerheadline_h3": bannerheadline_h3,
            "bannerheadline_h3link": bannerheadline_h3link,
            _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your headline has been added!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
                ReactDOM.render(<BannerHeadlineContainer url=""/>, document.getElementById('content-main'));
            })
        })
    },

    handleBannerListingH1TextEntry: function(event){
        this.setState({bannerheadline_h1: event.target.value});
    },

    handleBannerListingH2TextEntry: function(event){
        this.setState({bannerheadline_h2: event.target.value});
    },

    handleBannerListingH3TextEntry: function(event){
        this.setState({bannerheadline_h3: event.target.value});
    },

    handleBannerListingH3LinkTextEntry: function(event){
        this.setState({bannerheadline_h3link: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var bannerheadline_h1_defaulttext = this.state.bannerheadline_h1;
        var bannerheadline_h2_defaulttext = this.state.bannerheadline_h2;
        var bannerheadline_h3_defaulttext = this.state.bannerheadline_h3;
        var bannerheadline_h3_linkdefaulttext = this.state.bannerheadline_h3link;
        var paddiv = {padding:8};
        return (
        <div className="col-sm-12">
        <p>You can use the same headline for multiple banner images. When you assign a headline to a banner image on a project, you can select a style setting (color, etc.) that matches the banner image beneath it.
        If you are using the same banner image on multiple projects (i.e., banner image X on projects A and B), you can assign different to headlines for the same banner image on each project. (Example: headline 1 on banner image X on project A, headline 2 on banner image X on project B).</p>
        <form className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="bannerheadline_h1_textinput">Headline 1:</label>
                <div className="col-sm-9">
                    <input type="text" id="bannerheadline_h1_textinput" className="form-control" value={bannerheadline_h1_defaulttext} onChange={this.handleBannerListingH1TextEntry}/>
                </div>
                <label className="col-sm-3 control-label" htmlFor="bannerheadline_h2_textinput">Headline 2:</label>
                <div className="col-sm-9">
                    <input type="text" id="bannerheadline_h2_textinput" className="form-control" value={bannerheadline_h2_defaulttext} onChange={this.handleBannerListingH2TextEntry}/>
                </div>
                <label className="col-sm-3 control-label" htmlFor="bannerheadline_h3_textinput">Call To Action:</label>
                <div className="col-sm-9">
                    <input type="text" id="bannerheadline_h3_textinput" className="form-control" value={bannerheadline_h3_defaulttext} onChange={this.handleBannerListingH3TextEntry}/>
                </div>
                <label className="col-sm-3 control-label" htmlFor="bannerheadline_h3link_textinput">Call To Action Link:</label>
                <div className="col-sm-9">
                    <textarea id="bannerheadline_h3link_textinput" className="form-control" rows="6" value={bannerheadline_h3_linkdefaulttext} onChange={this.handleBannerListingH3LinkTextEntry} />
                </div>
            </div>
            <div style={submitstyle}><a onClick={this.submitCreateNewBannerHeadline} >Create Headline</a></div>
        </form>
        </div>
        );
    }

});