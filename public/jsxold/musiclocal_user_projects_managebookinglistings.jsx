var BookinglistingProjectContainer = React.createClass ({

    getInitialState: function(){
        return {data: [], data1: []};
    },

    componentDidMount: function(){
        alert('not hooked up yet');
        var projectid = this.props.data.project_id;
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_project_listings",
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
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please reload the page.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                console.log(response);
                //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Banner images retrieved.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);


                var parsedresponse = JSON.parse(response);
                console.log(parsedresponse);
                var uniqueresponse = parsedresponse.uniquebookinglistings;
                var projectresponse = parsedresponse.projectbookinglistings;
                //console.log(foo.uniquebannerimages);
                this.setState({data: uniqueresponse, data1: projectresponse});
                //renderreact(uniqueresponse, projectresponse);
            }.bind(this))
        })
    },

    handleBookinglistingAdd: function(data1){
        var newdata1array = this.state.data1;
        newdata1array.push(data1);
        var bookinglistingid = data1.bookinglisting_id;
        var projectid = this.props.data.project_id;
        $.ajax({
            type: "POST",
            url: "user/ajax/bookinglistings/post/add_bookinglisting_to_project",
            data: {
                "bannerimage_id": bookinglistingid,
                "project_id": projectid,
                _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function () {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newdataarray = this.state.data;
            var elementPos = this.state.data.map(function(item){
                return item.bookinglisting_id;
            }).indexOf(bookinglistingid);
            newdataarray.splice(elementPos, 1);
            this.setState({data: newdataarray, data1: newdata1array});
        }.bind(this)
    },

    handleBookinglistingRemove: function(data){

        var bookinglistingid = data.bookinglisting_id;
        var projectid = this.props.data.project_id;
        $.ajax({
            type: "POST",
            url: "user/ajax/bookinglistings/post/remove_bookinglisting_from_project",
            //dataType: "text"
            data: {
                "bannerimage_id": bookinglistingid,
                "project_id": projectid,
                _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function () {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newdataarray = this.state.data;
            newdataarray.push(data);
            var newdata1array = this.state.data1;
            var elementPos = this.state.data1.map(function(item){
                return item.bookinglisting_id;
            }).indexOf(bookinglistingid);
            newdata1array.splice(elementPos, 1);
            this.setState({data: newdataarray, data1: newdata1array});
        }.bind(this)
    },

    handleBookinglistingDelete: function(data){
        var bookinglistingid = data.bookinglisting_id;
        var r = confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "user/ajax/post/delete_current_bookinglisting",
                data: {
                    "bookinglisting_id": bookinglistingid,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    setstatefunction();
                }.bind(this))
            });
            $('#myModal').modal('hide');
            var setstatefunction = function(){
                var newdataarray = this.state.data;
                var newdata1array = this.state.data1;
                var elementPosData = this.state.data.map(function(item){
                    return item.bookinglisting_id;
                }).indexOf(bookinglistingid);
                var elementPosData1 = this.state.data1.map(function(item){
                    return item.bookinglisting_id;
                }).indexOf(bookinglistingid);

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
        var containerstyle = {padding:0};
        //
        return(
        <div>
            <div className="col-sm-4" style={containerstyle}>
                    <ProjectBookinglistingList data1={this.state.data1} onRemoveBookinglistingClick={this.handleBookinglistingRemove} onBookinglistingDeleteClick={this.handleBookinglistingDelete} />
            </div>
            <div className="col-sm-8" style={containerstyle}>
                    <UnaddedBookinglistingList data={this.state.data} onBookinglistingAddClick={this.handleBookinglistingAdd} onBookinglistingDeleteClick={this.handleBookinglistingDelete} />
            </div>
        </div>
        );
    }
});

var UnaddedBookinglistingList = React.createClass ({

    passBookinglistingAddToParent: function(data){
        this.props.onBookinglistingAddClick(data);
    },

    passBookinglistingDeleteToParent: function(data){
        this.props.onBookinglistingDeleteClick(data);
    },

    render:function(){
        var bookinglistings = this.props.data.map(function(bookinglisting){
            return <CurrentUnaddedBookinglisting bookinglisting_title={bookinglisting.bookinglisting_title} key={'listing-' + bookinglisting.bookinglisting_id} bookinglisting_id={bookinglisting.bookinglisting_id} onAddBookinglisting={this.passBookinglistingAddToParent} onDeleteBookinglisting={this.passBookinglistingDeleteToParent} />
        }.bind(this));
        var imgcontstyle = {};
        var hpadding = {paddingLeft:5};
        return (
        <div>
            <br/>
            <h4 style={hpadding}>Listings not added to project:</h4>
            <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" style={imgcontstyle}>
                {bookinglistings}
            </div>
            </div>
        );
    }
});

var CurrentUnaddedBookinglisting = React.createClass ({

    onAddButtonClick: function(){
        this.props.onAddBookinglisting({bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id});
    },

    onUnaddedBookinglistingClick: function(){
        alert('not functional');
        return;
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
            this.onDeleteBookinglistingButton();
        }.bind(this));
        $('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    onDeleteBookinglistingButton: function(){
        this.props.onDeleteBookinglisting({bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id});
    },

    render: function() {
        var photostyle = {padding: '0.25%'};
        var addstyle ={textAlign:'center'};
        var unaddedbannerstyle = {width:'45%'};
        var btnmargin = {marginTop:8};
        var containimgdiv = {padding:5};
        var idstring = 'listing-' + this.props.bookinglisting_id;
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <div className="row" id={idstring}>
                <div className="col-xs-12">
                    <h3>{this.props.bookinglisting_title}</h3>
                    <p>{this.props.bookinglisting_content}</p>
                    <div style={addstyle}><button className="btn btn-primary btn-xs" onClick={this.onAddButtonClick} style={btnmargin}>Add Listing to Project</button></div>
                </div>
            </div>
        );
    }
});

var ProjectBookinglistingList = React.createClass ({

    passBookinglistingRemoveToParent: function(data){
        this.props.onRemoveBookinglistingClick(data);
    },

    passBookinglistingDeleteToParent: function(data){
        this.props.onBookinglistingDeleteClick(data);
    },

    render:function(){
        var bookinglistings = this.props.data1.map(function(bookinglisting){
            return <CurrentProjectBookinglisting bookinglisting_title={bookinglisting.bookinglisting_title} key={'listing-' + bookinglisting.bookinglisting_id} bookinglisting_id={bookinglisting.bookinglisting_id} onRemoveBookinglistingClick={this.passBookinglistingRemoveToParent} onDeleteBookinglistingClick={this.passBookinglistingDeleteToParent} />
        }.bind(this));
        var imgcontstyle = {};
        var hpadding = {paddingLeft:5};
        return (
            <div >
                <br/>
                <h4 style={hpadding}>Banners added to this project:</h4>
                <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" style={imgcontstyle}>
                    {bookinglistings}
                </div>
            </div>
        );
    }

});

var CurrentProjectBookinglisting = React.createClass ({

    onRemoveButtonClick: function(){
        this.props.onRemoveBookinglistingClick({bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id});
    },

    onDeleteButtonClick: function(){
        this.props.onDeleteBookinglistingClick({bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content, bookinglisting_id: this.props.bookinglisting_id});
    },

    onAddedBookinglistingClick: function(){
        alert('not allowed');
        return;
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

    render: function() {
        var photostyle = {padding: '0.25%'};
        var removebtnstyle = {width:'100%', textAlign:'center'};
        var btnmargin = {marginTop:8};
        var addeddiv = {padding:5};
        var idstring = 'listing-' + this.props.bookinglisting_id;
        return (
            <div className="row" id={idstring}>
                <div className="col-xs-12">
                    <h3>{this.props.bookinglisting_title}</h3>
                    <p>{this.props.bookinglisting_content}</p>
                    <div style={removebtnstyle}>
                        <button className="btn btn-default btn-xs" onClick={this.onRemoveButtonClick} style={btnmargin}>Remove Banner from Project</button>
                    </div>
                </div>
            </div>
        );
    }
});