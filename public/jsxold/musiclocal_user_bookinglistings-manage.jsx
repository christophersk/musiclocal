var BookinglistingContainer = React.createClass ({

    getInitialState: function(){
        return {data: []};
    },

    componentDidMount: function(){

        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_user_bookinglistings_all",
            data: {

            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.bookinglistings;

                this.setState({data: uniqueresponse});
                //renderreact(uniqueresponse, projectresponse);
            }.bind(this))
        })
    },

    handleDeleteButton: function(childdata){
        console.log(childdata);
        var bookinglistingid = childdata.bookinglisting_id;
        var tempstatedata = this.state.data;
        console.log('temp state data:');
        console.log(tempstatedata);
        var setstatefunction = function(){
            var newdataarray = this.state.data;
            var elementPos = this.state.data.map(function(item){
                return item.bookinglisting_id;
            }).indexOf(bookinglistingid);
            newdataarray.splice(elementPos, 1);
            this.setState({data: newdataarray});
            //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
            //hiding component instead
            $('#listing-' + bookinglistingid).hide();
        }.bind(this);
        var r = confirm("Are you sure you want to delete this listing? This will remove the listing from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            setstatefunction();
            $.ajax({
                type: "POST",
                url: "user/ajax/post/delete_current_bookinglisting",
                //dataType: "text"
                data: {
                    "bookinglisting_id": bookinglistingid,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    this.setState({data: tempstatedata});
                    $('#listing-' + bookinglistingid).show();
                }.bind(this)),
                success: (function (response) {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                    $('#content-main').show();
                }.bind(this))
            });
        }
    },

    render: function() {
        var containerstyle = {padding:0};
        //
        return(
        <div className="container container-fixed" style={containerstyle} id="listings-manage-container">
            <div>
                <BookinglistingList data={this.state.data} handleDeleteButton={this.handleDeleteButton} />
            </div>
        </div>
        );
    }
});

var BookinglistingList = React.createClass ({

    handleDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    render:function(){
        var bookinglistings = this.props.data.map(function(bookinglisting){
            return <CurrentBookinglisting bookinglisting_title={bookinglisting.bookinglisting_title} bookinglisting_content={bookinglisting.bookinglisting_content} key={'listing-' + bookinglisting.bookinglisting_id} bookinglisting_id={bookinglisting.bookinglisting_id} handleDeleteButton={this.handleDeleteButton}/>
        }.bind(this));
        var imgcontstyle = {};
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div style={imgcontstyle}>
                        {bookinglistings}
                    </div>
                </div>
            </div>
        );
    }
});

var CurrentBookinglisting = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){

    },

    handleModalDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    handleDeleteButton: function(){
        this.props.handleDeleteButton({bookinglisting_id: this.props.bookinglisting_id, bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content});
    },

    onClick: function(){
        alert('not allowed');
        return;
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.render(<BookinglistingModal bookinglisting_title={this.props.bookinglisting_title} bookinglisting_content={this.props.bookinglisting_content} bookinglisting_id={this.props.bookinglisting_id} key={'modal' + this.props.bookinglisting_id} handleDeleteButton={this.handleModalDeleteButton}/>, document.getElementById('content-modal'));
        $('#content-main').hide();
        //$('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var photostyle = {padding: '0.25%'};
        var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/t/' + name + '.jpg';
        var btndivstyle = {textAlign:'center'};
        var btnstyle = {marginTop:8};
        var idstring = 'listing-' + this.props.bookinglisting_id;
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <div className="row nopadding" id={idstring}>
                <div className="col-sm-12">
                    <h3>{this.props.bookinglisting_title}</h3>
                    <p>{this.props.bookinglisting_content}</p>
                </div>
                <div style={btndivstyle}><button style={btnstyle} className="btn btn-default btn-xs" onClick={this.handleDeleteButton} >Delete Listing</button></div>
            </div>
        );
    }
});

var BookinglistingModal = React.createClass ({

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
        this.props.handleDeleteButton({bookinglisting_id: this.props.bookinglisting_id, bookinglisting_title: this.props.bookinglisting_title, bookinglisting_content: this.props.bookinglisting_content});
    },

    render: function(){
        var spacerstyle = {padding:10};
        var textdivstyle = {display:'block',textAlign:'center'};

        return (
        <div className="col-sm-12">
                <h3>{this.props.bookinglisting_title}</h3>
                <p>{this.props.bookinglisting_content}</p>
                <span style={spacerstyle}></span>
                <a id="deletecurrentlistingbutton" className="btn btn-default" onClick={this.handleDeleteButton}>Delete Listing</a>
                <br/><br/>
                <div><a id="closebox" className="btn btn-default" onClick={this.handleClose} >Close Listing</a></div>
        </div>
        );
    }
});