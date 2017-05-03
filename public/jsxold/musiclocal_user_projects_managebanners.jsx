var BannerProjectContainer = React.createClass ({

    getInitialState: function(){
        return {data: [], data1: []};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_user_banners_links",
            data: {
            "projectid": projectid
            },
            statusCode: {
                401: function() {
                    var r = confirm('You have been logged out due to inactivity. Click okay to log back in, or simply refresh the page.' );
                    if (r == true){
                        window.open('//www.musiclocal.org/login/return', 'loginwindow', 'location=0, width=600,height=600');
                    }
                    else {}
                }
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                console.log(response);
                //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Banner images retrieved.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);


                var parsedresponse = JSON.parse(response);
                console.log(parsedresponse);
                var uniqueresponse = parsedresponse.uniquebannerimages;
                var projectresponse = parsedresponse.projectbannerimages;
                //console.log(foo.uniquebannerimages);
                this.setState({data: uniqueresponse, data1: projectresponse});
                //renderreact(uniqueresponse, projectresponse);
            }.bind(this))
        })
    },

    handleBannerAdd: function(data1){
        var newdata1array = this.state.data1;
        newdata1array.push(data1);
        var id = data1.banner_id;
        var projectid = this.props.data.project_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/addbannertoproject",
            data: {
                "bannerimage_id": id,
                "project_id": projectid,
                _token: $_token
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newdataarray = this.state.data;
            var elementPos = this.state.data.map(function(item){
                return item.banner_id;
            }).indexOf(id);
            newdataarray.splice(elementPos, 1);
            this.setState({data: newdataarray, data1: newdata1array});
        }.bind(this)
    },

    handleBannerRemove: function(data){

        var id = data.banner_id;
        var projectid = this.props.data.project_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/removebannerfromproject",
            //dataType: "text"
            data: {
                "bannerimage_id": id,
                "project_id": projectid,
                _token: $_token
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newdataarray = this.state.data;
            newdataarray.push(data);
            var newdata1array = this.state.data1;
            var elementPos = this.state.data1.map(function(item){
                return item.banner_id;
            }).indexOf(id);
            newdata1array.splice(elementPos, 1);
            this.setState({data: newdataarray, data1: newdata1array});
        }.bind(this)
    },

    handleBannerDelete: function(data){
        var id = data.banner_id;
        var imagesrc = data.banner_filename;
        var r = confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "user/ajax/post/user_bannerdelete",
                //dataType: "text"
                data: {
                    "bannerimage_id": id,
                    "bannerimage_filename": imagesrc,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    setstatefunction();
                    this.setState({showComponent: false})
                }.bind(this))
            });
            $('#myModal').modal('hide');
            var setstatefunction = function(){
                var newdataarray = this.state.data;
                var newdata1array = this.state.data1;
                var elementPosData = this.state.data.map(function(item){
                    return item.banner_id;
                }).indexOf(id);
                //console.log(elementPosData);
                var elementPosData1 = this.state.data1.map(function(item){
                    return item.banner_id;
                }).indexOf(id);
                //console.log(elementPosData1);

                if (elementPosData1 != -1){
                newdata1array.splice(elementPosData1, 1);
                }
                if (elementPosData != -1){
                newdataarray.splice(elementPosData, 1);
                }
                this.setState({data: newdataarray, data1: newdata1array});
            }.bind(this);
        }
    },

    render: function() {
        return(
            <div className="row">
                <div className="col-xs-7">
                    <ProjectBannerList data1={this.state.data1} onRemoveBannerClick={this.handleBannerRemove} onBannerDeleteClick={this.handleBannerDelete} />
                </div>
                <div className="col-xs-5">
                    <UnaddedBannerList data={this.state.data} onBannerAddClick={this.handleBannerAdd} onBannerDeleteClick={this.handleBannerDelete} />
                </div>
            </div>
        );
    }
});

var UnaddedBannerList = React.createClass ({

    getInitialState: function(){
        return {data: []};
    },

    componentDidMount: function(){
        this.setState({data: this.props.data});
    },

    passBannerAddToParent: function(data){
        this.props.onBannerAddClick(data);
    },

    passBannerDeleteToParent: function(data){
        this.props.onBannerDeleteClick(data);
    },

    render:function(){
        var banners = this.props.data.map(function(banner){
            return <CurrentUnaddedBanner filename={banner.banner_filename} key={banner.banner_id} id={banner.banner_id} onAddBanner={this.passBannerAddToParent} onDeleteBanner={this.passBannerDeleteToParent} />
        }.bind(this));
        return (
        <div>
            <br/>
            <div className="row">
                <div className="col-xs-12">
                    <h4>Banners not added to project:</h4>
                </div>
            </div>
            <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" className="row">
                {banners}
            </div>
        </div>
        );
    }
});

var CurrentUnaddedBanner = React.createClass ({

    getInitialState: function(){
        return { showComponent: true, filename: '', id: ''};
    },

    componentDidMount: function(){
        this.setState({filename: this.props.filename, id: this.props.id});
    },

    onAddButtonClick: function(){
        this.props.onAddBanner({banner_filename: this.state.filename, banner_id: this.state.id});
    },

    onUnaddedBannerClick: function(){
        $('#bannerdetails').html('<img class="img img-responsive" id="currentmodalbanner" data-id="' + this.props.id + '" src="//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg"/>' +
        '<div style="display:block;text-align:center"><br>' +
        '<p><em>To copy the link to your banner, right click on the banner and select "Copy image URL"</em><br/><br/>' +
            '<button id="addunaddedbannerbutton" class="btn btn-primary">Add Banner to Project</button>' +
            '<span style="padding:10px;"></span><a id="savecurrentbannerbutton" href="" download class="btn btn-default">Save Banner</a>' +
            '<span style="padding:10px;"></span><button id="deletecurrentbannerbutton" class="btn btn-default">Delete Banner</button>');
        $('#myModal').modal();
        $('#addunaddedbannerbutton').click(function(){
            this.onAddButtonClick();
            $('#myModal').modal('hide');
        }.bind(this));
        $('#deletecurrentbannerbutton').click(function(){
            this.onDeleteBannerButton();
        }.bind(this));
        $('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    onDeleteBannerButton: function(){
        this.props.onDeleteBanner({banner_filename: this.state.filename, banner_id: this.state.id});
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var photostyle = {padding: '0.25%'};
        var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        var addstyle ={textAlign:'center'};
        var unaddedbannerstyle = {width:'45%'};
        var btnmargin = {marginTop:8};
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <div className="col-xs-12">
                <div className="imgclickable">
                    <img className="img img-responsive" id={this.props.id} data-id={this.props.id} onClick={this.onUnaddedBannerClick} style={photostyle} src={srcstring} />
                </div>
                <div style={addstyle}>
                    <button className="btn btn-primary btn-xs" onClick={this.onAddButtonClick} style={btnmargin}>Add Banner to Project</button>
                </div>
            </div>
        );
    }
});

var ProjectBannerList = React.createClass ({

    passBannerRemoveToParent: function(data){
        this.props.onRemoveBannerClick(data);
    },

    passBannerDeleteToParent: function(data){
        this.props.onBannerDeleteClick(data);
    },

    render:function(){
        var projectbanners = this.props.data1.map(function(projectbanner){
            return <CurrentProjectBanner filename={projectbanner.banner_filename} key={projectbanner.banner_id} id={projectbanner.banner_id} onRemoveBannerClick={this.passBannerRemoveToParent} onDeleteBannerClick={this.passBannerDeleteToParent} />
        }.bind(this));
        return (
            <div>
                <br/>
                <div className="row">
                    <div className="col-xs-12">
                        <h4>Banners added to this project:</h4>
                    </div>
                </div>
                <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" className="row">
                    {projectbanners}
                </div>
            </div>
        );
    }

});

var CurrentProjectBanner = React.createClass ({

    getInitialState: function(){
        return { showComponent: true, filename: '', id: ''};
    },

    componentDidMount: function(){
        this.setState({filename: this.props.filename, id: this.props.id});
    },

    onRemoveButtonClick: function(){
        this.props.onRemoveBannerClick({banner_filename: this.state.filename, banner_id: this.state.id});
    },

    onDeleteButtonClick: function(){
        this.props.onDeleteBannerClick({banner_filename: this.state.filename, banner_id: this.state.id});
    },

    onAddedBannerClick: function(){
        $('#bannerdetails').html('<img class="img img-responsive" id="currentmodalbanner" data-id="' + this.state.id + '" src="//d1y0bevpkkhybk.cloudfront.net/c/' + this.state.filename + '.jpg"/>' +
        '<div style="display:block;text-align:center"><br>' +
        '<p><em>To copy the link to your banner, right click on the banner and select "Copy image URL"</em><br/><br/>' +
            '<button id="removeaddedbannerbutton" class="btn btn-primary">Remove Banner from Project</button>' +
            '<span style="padding:10px;"></span><a id="savecurrentbannerbutton" href="" download class="btn btn-default">Save Banner</a>' +
            '<span style="padding:10px;"></span><button id="deletecurrentbannerbutton" class="btn btn-default">Delete Banner</button>');
        $('#myModal').modal();
        $('#removeaddedbannerbutton').click(function(){
            this.onRemoveButtonClick();
            $('#myModal').modal('hide');
        }.bind(this));
        $('#deletecurrentbannerbutton').click(function(){
            this.onDeleteButtonClick();
        }.bind(this));
        $('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    /*
    onDeleteBannerButton: function(){
        var id = this.state.id;
        var imagesrc = this.state.filename;
        var r = confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "user/ajax/post/user_bannerdelete",
                //dataType: "text"
                data: {
                    "bannerimage_id": id,
                    "bannerimage_filename": imagesrc,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    this.setState({showComponent: false})
                }.bind(this))
            });
            $('#myModal').modal('hide');
        }
    },
    */

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var photostyle = {padding: '0.25%'};
        var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        var removebtnstyle = {width:'100%', textAlign:'center'};
        var btnmargin = {marginTop:8};
        var addeddiv = {padding:5};
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <div className="col-xs-12">
                <div className="imgclickable">
                <img className="img img-responsive" id={this.props.id} data-id={this.props.id} onClick={this.onAddedBannerClick} style={photostyle} src={srcstring} />
                </div>
                <div style={removebtnstyle}>
                    <button className="btn btn-default btn-xs" onClick={this.onRemoveButtonClick} style={btnmargin}>Remove Banner from Project</button>
                </div>
            </div>
        );
    }
});