var BackgroundimageAddChangeContainer = React.createClass ({

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
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.backgroundimages;
                this.setState({data: uniqueresponse});
            }.bind(this))
        })
    },

    handleCloseModal: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
    },

    handleUseImage: function(data){
        var projectid = this.props.data.project_id;
        var backgroundimageid = data.target.id;
        $.ajax({
            type: "POST",
            url: "user/ajax/post/add_change_section_background_image",
            data: {
                "projectid": projectid,
                "backgroundimageid": backgroundimageid,
                _token: $_token
            },
            error: (function (response) {
                console.log(response);
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
                ReactDOM.render(<CoverContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
                $('#content-main').show();
                ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

            }.bind(this))
        })
    },

    render: function() {
        var containerstyle = {padding:0};
        var btnpad = {padding:'0.25%'};
        return(
        <div className="" style={containerstyle} id="backgroundimages-manage-container">
            <div className="row">
                <div className="col-xs-12" style={btnpad} >
                    <a className="btn btn-danger btn-block" onClick={this.handleCloseModal} >Cancel</a>
                </div>
            </div>
            <div id="fbphotodisplay" ref="fbphotodisplay">
                <BackgroundimageAddChangeList data={this.state.data} handleUseImage={this.handleUseImage} />
            </div>
        </div>
        );
    }
});

var BackgroundimageAddChangeList = React.createClass ({

    handleDeleteButton: function(data){
        this.props.handleDeleteButton(data);
    },

    handleUseImage: function(data){
        this.props.handleUseImage(data);
    },

    render:function(){
        var backgroundimages = this.props.data.map(function(backgroundimage){
            return <CurrentAddChangeBackgroundimage filename={backgroundimage.backgroundimage_filename} key={backgroundimage.backgroundimage_id} id={backgroundimage.backgroundimage_id} handleUseImage={this.handleUseImage} onBackgroundimageAddClick={this.handleIntermediate} />
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

var CurrentAddChangeBackgroundimage = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){

    },

    onClick: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.render(<BackgroundimageAddChangeModal filename={this.props.filename} id={this.props.id} key={'modal' + this.props.id} handleDeleteButton={this.handleModalDeleteButton}/>, document.getElementById('content-modal'));
        $('#content-main').hide();
        $('#savecurrentbackgroundimagebutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg' );
    },

    handleUseImage: function(data){
        this.props.handleUseImage(data);
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
        var absolutefloat = {position:'absolute', top:'45%', width:'100%', textAlign:'center'};
        //<div style={btndivstyle}><a className="btn btn-block btn-primary" onClick={this.onClick} >View Larger Background Image</a></div>
        //<div style={btndivstyle}><a className="btn btn-block btn-warning" onClick={this.handleDeleteButton} >Delete Background Image</a></div>
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            <div className="col-sm-4 col-xs-12" id={idstring}>
                <a onClick={this.handleUseImage}>
                    <img className="img img-responsive" id={this.props.id} data-id={this.props.id} data-filename={this.props.filename} style={photostyle} src={srcstring} />
                </a>
                <div style={absolutefloat}>
                    <a className="btn btn-primary" id={this.props.id} data-filename={this.props.filename} onClick={this.handleUseImage}>Use Image</a>
                </div>

            <br/>
            </div>
        );
    }
});

var BackgroundimageAddChangeModal = React.createClass ({

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
        var modal_img_style = {display:'block', margin: '0 auto'};
        return (
        <div className="col-xs-12" id="modal-container" style={modal_container_style}>
                <img className="img img-responsive" src={srcstring} id="currentmodalbackgroundimage" style={modal_img_style}/>
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