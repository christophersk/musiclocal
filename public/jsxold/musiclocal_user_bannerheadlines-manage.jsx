var BannerHeadlineContainer = React.createClass ({

    getInitialState: function(){
        return {data: []};
    },

    componentDidMount: function(){
        this.getProps();
    },

    getProps: function(){
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_user_bannerheadlines_all",
            data: {

            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.bannerheadlines;

                this.setState({data: uniqueresponse});
                //renderreact(uniqueresponse, projectresponse);
            }.bind(this))
        })
    },

    setStateFunction: function(childdata){
        var bannerheadlineid = childdata.bannerheadline_id;

            var newdataarray = this.state.data;
            var elementPos = this.state.data.map(function(item){
                return item.bannerheadline_id;
            }).indexOf(bannerheadlineid);
            newdataarray.splice(elementPos, 1);
            this.setState({data: newdataarray});
            //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
            //hiding component instead
            $('#headline-' + bannerheadlineid).hide();
    },

    handleEditButton: function(childdata){
        var bannerheadlineid = childdata.bannerheadline_id;
        var tempstatedata = this.state.data;
        this.setStateFunction(childdata);
        $.ajax({
            type: "POST",
            url: "user/ajax/post/edit_current_bannerheadline",
            data: {
                "bannerheadline_id": bannerheadlineid,
                "bannerheadline_h1": childdata.bannerheadline_h1,
                "bannerheadline_h2": childdata.bannerheadline_h2,
                "bannerheadline_h3": childdata.bannerheadline_h3,
                "bannerheadline_h3link": childdata.bannerheadline_h3link,
                _token: $_token
            },
            error: (function (xhr, status, error) {
                var errortext = error;
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html(errortext).addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                this.setState({data: tempstatedata});
                $('#headline-' + bannerheadlineid).show();
            }.bind(this)),
            success: (function (response) {
                //this.setStateFunction(childdata);
                this.getProps();
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html(response).addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                $('#content-main').show();
            }.bind(this))
        });
    },

    handleDeleteButton: function(childdata){
        var bannerheadlineid = childdata.bannerheadline_id;
        var tempstatedata = this.state.data;
        var r = confirm("Are you sure you want to delete this headline? This will remove the headline from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "user/ajax/post/delete_current_bannerheadline",
                //dataType: "text"
                data: {
                    "bannerheadline_id": bannerheadlineid,
                    _token: $_token
                },
                error: (function (xhr, status, error) {
                    if (xhr.status == 403) { var errortext = 'This headline is in use on a project. To delete this headline, first remove it from all projects.'}
                    else { var errortext = error; }
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html(errortext).addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    this.setState({data: tempstatedata});
                    $('#headline-' + bannerheadlineid).show();
                }.bind(this)),
                success: (function (response) {
                    this.setStateFunction(childdata);
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html(response).addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                    $('#content-main').show();
                }.bind(this))
            });
        }
    },

    render: function() {
        return(
            <div>
                <BannerHeadlineList data={this.state.data} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleDeleteButton} />
            </div>
        );
    }
});

var BannerHeadlineList = React.createClass ({

    handleEditButton: function(data){
        this.props.handleEditButton(data);
    },

    handleDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    render:function(){
        var bannerheadlines = this.props.data.map(function(bannerheadline){
            return <CurrentBannerHeadline bannerheadline_h1={bannerheadline.bannerheadline_h1} bannerheadline_h2={bannerheadline.bannerheadline_h2} bannerheadline_h3={bannerheadline.bannerheadline_h3} bannerheadline_h3link={bannerheadline.bannerheadline_h3link} key={'headline-' + bannerheadline.bannerheadline_id} bannerheadline_id={bannerheadline.bannerheadline_id} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleDeleteButton}/>
        }.bind(this));
        return (
            <div className="row">
                {bannerheadlines}
            </div>
        );
    }
});

var CurrentBannerHeadline = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){

    },

    handleModalDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    handleDeleteButton: function(){
        this.props.handleDeleteButton({bannerheadline_id: this.props.bannerheadline_id, bannerheadline_h1: this.props.bannerheadline_h1, bannerheadline_h2: this.props.bannerheadline_h2, bannerheadline_h3: this.props.bannerheadline_h3, bannerheadline_h3link: this.props.bannerheadline_h3link});
    },

    handleEditButton: function(data){
        this.props.handleEditButton(data);
    },

    onClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.render(<BannerHeadlineModal bannerheadline_id={this.props.bannerheadline_id} bannerheadline_h1={this.props.bannerheadline_h1} bannerheadline_h2={this.props.bannerheadline_h2} bannerheadline_h3={this.props.bannerheadline_h3} bannerheadline_h3link={this.props.bannerheadline_h3link} key={'modal' + this.props.bannerheadline_id} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleModalDeleteButton}/>, document.getElementById('content-modal'));
        $('#content-main').hide();
        //$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var btndivstyle = {textAlign:'center'};
        var idstring = 'headline-' + this.props.bannerheadline_id;
        return (
            <div className="col-xs-12 col-sm-4" style={btndivstyle} id={idstring}>
                <h1>{this.props.bannerheadline_h1}</h1>
                <h2>{this.props.bannerheadline_h2}</h2>
                <p>{this.props.bannerheadline_h3}</p>
                <p>{this.props.bannerheadline_h3link}</p>
                <div style={btndivstyle}><a className="btn btn-block btn-primary" onClick={this.onClick} >Edit Headline</a></div>
                <div style={btndivstyle}><a className="btn btn-block btn-warning" onClick={this.handleDeleteButton} >Delete Headline</a></div>
                <br/>
            </div>
        );
    }
});

var BannerHeadlineModal = React.createClass ({

    getInitialState: function(){
        return {
            bannerheadline_h1: null,
            bannerheadline_h2: null,
            bannerheadline_h3: null,
            bannerheadline_h3link: null
        };
    },

    componentDidMount: function(){
        this.setState({
            bannerheadline_h1: this.props.bannerheadline_h1,
            bannerheadline_h2: this.props.bannerheadline_h2,
            bannerheadline_h3: this.props.bannerheadline_h3,
            bannerheadline_h3link: this.props.bannerheadline_h3link
        });
    },

    handleClose: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
    },

    handleDeleteButton: function(){
        this.props.handleDeleteButton({bannerheadline_id: this.props.bannerheadline_id, bannerheadline_title: this.props.bannerheadline_title, bannerheadline_content: this.props.bannerheadline_content});
    },

    submitEditBannerHeadline: function(){
        this.props.handleEditButton({bannerheadline_id: this.props.bannerheadline_id, bannerheadline_h1: this.state.bannerheadline_h1, bannerheadline_h2: this.state.bannerheadline_h2, bannerheadline_h3: this.state.bannerheadline_h3, bannerheadline_h3link: this.state.bannerheadline_h3link});
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
        this.setState({bannerheadline_h3: event.target.value});
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
                <label className="col-xs-12 col-sm-3 control-label" htmlFor="bannerheadline_h1_textinput">Headline 1:</label>
                <div className="col-xs-12 col-sm-9">
                    <input type="text" id="bannerheadline_h1_textinput" className="form-control" value={bannerheadline_h1_defaulttext} onChange={this.handleBannerListingH1TextEntry}/>
                </div>
                <label className="col-xs-12 col-sm-3 control-label" htmlFor="bannerheadline_h2_textinput">Headline 2:</label>
                <div className="col-xs-12 col-sm-9">
                    <input type="text" id="bannerheadline_h2_textinput" className="form-control" value={bannerheadline_h2_defaulttext} onChange={this.handleBannerListingH2TextEntry}/>
                </div>
                <label className="col-xs-12 col-sm-3 control-label" htmlFor="bannerheadline_h3_textinput">Call To Action:</label>
                <div className="col-xs-12 col-sm-9">
                    <input type="text" id="bannerheadline_h3_textinput" className="form-control" value={bannerheadline_h3_defaulttext} onChange={this.handleBannerListingH3TextEntry}/>
                </div>
                <label className="col-xs-12 col-sm-3 control-label" htmlFor="bannerheadline_h3link_textinput">Call To Action Link:</label>
                <div className="col-xs-12 col-sm-9">
                    <input type="text" id="bannerheadline_h3link_textinput" className="form-control" value={bannerheadline_h3_linkdefaulttext} onChange={this.handleBannerListingH3LinkTextEntry} />
                </div>
            </div>
            <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitEditBannerHeadline} >Edit Headline</a></div>
        </form>
        </div>
        );
    }
});