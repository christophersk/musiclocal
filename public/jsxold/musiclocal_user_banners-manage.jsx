var BannerContainer = React.createClass ({

    getInitialState: function(){
        return {data: []};
    },

    componentDidMount: function(){

        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_user_banners_all",
            data: {
            //"projectid": projectid
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                //console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.bannerimages;
                //var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({data: uniqueresponse});
                //renderreact(uniqueresponse, projectresponse);
            }.bind(this))
        })
    },

    handleDeleteButton: function(childdata){
        var bannerid = childdata.bid;
        var imagesrc = childdata.filename;
        var tempstatedata = this.state.data;
        var setstatefunction = function(){
            var newdataarray = this.state.data;
            var elementPos = this.state.data.map(function(item){
                return item.banner_id;
            }).indexOf(bannerid);
            newdataarray.splice(elementPos, 1);
            this.setState({data: newdataarray});
            //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
            //hiding component instead
            $('#banner-' + bannerid).hide();
        }.bind(this);
        var r = confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            setstatefunction();
            $.ajax({
                type: "POST",
                url: "user/ajax/post/user_bannerdelete",
                //dataType: "text"
                data: {
                    "bannerimage_id": bannerid,
                    "bannerimage_filename": imagesrc,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    this.setState({data: tempstatedata});
                    $('#banner-' + bannerid).show();
                }.bind(this)),
                success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                    $('#content-main').show();
                }.bind(this))
            });
        }
    },

    render: function() {
        return(
        <div className="row" id="banners-manage-container">
            <BannerList data={this.state.data} handleDeleteButton={this.handleDeleteButton} />
        </div>
        );
    }
});

var BannerList = React.createClass ({

    handleDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    render:function(){
        var banners = this.props.data.map(function(banner){
            return <CurrentBanner filename={banner.banner_filename} key={banner.banner_id} id={banner.banner_id} onBannerAddClick={this.handleIntermediate} handleDeleteButton={this.handleDeleteButton}/>
        }.bind(this));
        return (
            <div>
                {banners}
            </div>
        );
    }
});

var CurrentBanner = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){

    },

    handleModalDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    handleDeleteButton: function(){
        this.props.handleDeleteButton({bid: this.props.id, filename: this.props.filename});
    },

    onClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.render(<BannerModal filename={this.props.filename} id={this.props.id} key={'modal' + this.props.id} handleDeleteButton={this.handleModalDeleteButton}/>, document.getElementById('content-modal'));
        $('#content-main').hide();
        $('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var name = this.props.filename;
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/t/' + name + '.jpg';
        var idstring = 'banner-' + this.props.id;
        return (
            <div className="col-sm-4 col-xs-12" id={idstring}>
                <a onClick={this.onClick}>
                    <img className="img img-responsive" id={this.props.id} data-id={this.props.id} src={srcstring} />
                </a>
                <div><a className="btn btn-warning btn-block" onClick={this.handleDeleteButton} >Delete Banner</a></div>
                <br/>
            </div>
        );
    }
});

var BannerModal = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){
    },

    handleClose: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
    },

    handleDeleteButton: function(){
        this.props.handleDeleteButton({bid: this.props.id, filename: this.props.filename});
    },

    render: function(){

        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg';
        var spacerstyle = {padding:10};
        var textdivstyle = {display:'block',textAlign:'center'};

        return (
        <div className="col-xs-12">
            <img className="img img-responsive" id="currentmodalbanner" src={srcstring} />
            <div style={textdivstyle}><br/>
                <p><em>To copy the link to your banner, right click on the banner and select "Copy image URL."</em></p><br/><br/>
                <a id="savecurrentbannerbutton" href="" download className="btn btn-primary">Save Banner</a>
                <span style={spacerstyle}></span>
                <a id="deletecurrentbannerbutton" className="btn btn-default" onClick={this.handleDeleteButton}>Delete Banner</a>
                <br/><br/>
                <div><a id="closebox" className="btn btn-default" onClick={this.handleClose} >Close Banner</a></div>
            </div>
        </div>
        );
    }
});