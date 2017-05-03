var BackgroundimageContainer = React.createClass ({

    getInitialState: function(){
        return {data: []};
    },

    componentDidMount: function(){

        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_current_user_backgroundimages_all",
            data: {
            //"projectid": projectid
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                //console.log(response);
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.backgroundimages;
                this.setState({data: uniqueresponse});
            }.bind(this))
        })
    },

    handleDeleteButton: function(childdata){
        var backgroundimageid = childdata.bid;
        var imagesrc = childdata.filename;
        var tempstatedata = this.state.data;
        var setstatefunction = function(){
            var newdataarray = this.state.data;
            var elementPos = this.state.data.map(function(item){
                return item.backgroundimage_id;
            }).indexOf(backgroundimageid);
            newdataarray.splice(elementPos, 1);
            this.setState({data: newdataarray});
            //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
            //hiding component instead
            $('#backgroundimage-' + backgroundimageid).hide();
        }.bind(this);
        var r = confirm("Are you sure you want to delete this background image? This will remove the background image from all MusicLocal projects. WARNING: this action cannot be undone.");
        if (r == true){
            setstatefunction();
            $.ajax({
                type: "POST",
                url: "user/ajax/post/user_backgroundimagedelete",
                //dataType: "text"
                data: {
                    "backgroundimageimage_id": backgroundimageid,
                    "backgroundimageimage_filename": imagesrc,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    this.setState({data: tempstatedata});
                    $('#backgroundimage-' + backgroundimageid).show();
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
        <div className="" style={containerstyle} id="backgroundimages-manage-container">
            <div id="fbphotodisplay" ref="fbphotodisplay">
                <BackgroundimageList data={this.state.data} handleDeleteButton={this.handleDeleteButton} />
            </div>
        </div>
        );
    }
});

var BackgroundimageList = React.createClass ({

    handleDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    render:function(){
        var backgroundimages = this.props.data.map(function(backgroundimage){
            return <CurrentBackgroundimage filename={backgroundimage.backgroundimage_filename} key={backgroundimage.backgroundimage_id} id={backgroundimage.backgroundimage_id} onBackgroundimageAddClick={this.handleIntermediate} handleDeleteButton={this.handleDeleteButton}/>
        }.bind(this));
        var imgcontstyle = {};
        return (
            <div id="get-user-photos-from-facebook">
            <div id="fbphotoscrollcontainer" ref="fbphotoscrollcontainer" style={imgcontstyle}>
                {backgroundimages}
            </div>
            </div>
        );
    }
});

var CurrentBackgroundimage = React.createClass ({

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
        ReactDOM.render(<BackgroundimageModal filename={this.props.filename} id={this.props.id} key={'modal' + this.props.id} handleDeleteButton={this.handleModalDeleteButton}/>, document.getElementById('content-modal'));
        $('#content-main').hide();
        $('#savecurrentbackgroundimagebutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/b/' + this.props.filename + '.jpg' )
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var photostyle = {padding: '0.25%'};
        var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/bxs/' + name + '.jpg';
        var btndivstyle = {textAlign:'center'};
        var btnstyle = {marginTop:6, marginBottom: 12};
        var idstring = 'backgroundimage-' + this.props.id;
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <div className="col-sm-4 col-xs-12" id={idstring}>
            <a onClick={this.onClick}>
            <img className="img img-responsive" id={this.props.id} data-id={this.props.id} style={photostyle} src={srcstring} />
            </a>
            <div style={btndivstyle}><a className="btn btn-block btn-primary" onClick={this.onClick} >View Larger Background Image</a></div>
            <div style={btndivstyle}><a className="btn btn-block btn-warning" onClick={this.handleDeleteButton} >Delete Background Image</a></div>
            <br/>
            </div>
        );
    }
});

var BackgroundimageModal = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){

        var image = new Image();
        image.addEventListener("load", function(){
            var w = image.width;

            var h = image.height;
            var h_dividedby_w = h / w;

            console.log('w: ' + w + '; h: ' + h + '; h_dividedby_w: ' + h_dividedby_w);

            var modal_top_position = document.getElementById("content-modal").offsetTop;
            var window_height = window.innerHeight;
            var modal_button_container_height = document.getElementById("modal-button-container").offsetHeight;
            var set_modal_image_height = window_height - modal_top_position - modal_button_container_height - 60;
            var set_modal_image_width = set_modal_image_height / h_dividedby_w;

            $("#currentmodalbackgroundimage").css({"height": set_modal_image_height, "width": set_modal_image_width});
        });
        image.src = '//d1y0bevpkkhybk.cloudfront.net/b/' + this.props.filename + '.jpg';

    },

    handleClose: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
    },

    handleDeleteButton: function(){
        this.props.handleDeleteButton({bid: this.props.id, filename: this.props.filename});
    },

    render: function(){

        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/b/' + this.props.filename + '.jpg';
        var spacerstyle = {padding:10};
        var textdivstyle = {display:'block',textAlign:'center'};
        var modal_container_style = {textAlign:'center'};
        return (
        <div className="col-xs-12" id="modal-container" style={modal_container_style}>
                <img className="img img-responsive" src={srcstring} id="currentmodalbackgroundimage"/>
            <div style={textdivstyle} id="modal-button-container"><br/>
                <p><em>To copy the link to your background image, right click on the background image and select "Copy image URL."</em></p><br/>
                <a id="savecurrentbackgroundimagebutton" href="" download className="btn btn-primary">Save Background Image</a>
                <span style={spacerstyle}></span>
                <a id="deletecurrentbackgroundimagebutton" className="btn btn-default" onClick={this.handleDeleteButton}>Delete Background Image</a>
                <br/><br/>
                <div><a id="closebox" className="btn btn-default" onClick={this.handleClose} >Close Background Image</a></div>
            </div>
        </div>
        );
    }
});