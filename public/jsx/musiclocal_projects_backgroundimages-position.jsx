var BackgroundimagePositionContainer = React.createClass ({

    getInitialState: function(){
        return {align_vertical: '', align_horizontal: ''};
    },

    componentDidMount: function(){
        var backgroundimageprojectid = this.props.backgroundimage_project_id;
        $.ajax({
            type: "GET",
            url: "user/ajax/get/get_section_background_image_position",
            data: {
                "backgroundimage_project_id": backgroundimageprojectid
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                var parsedresponse = JSON.parse(response);
                var align_vertical = parsedresponse.align_vertical;
                var align_horizontal = parsedresponse.align_horizontal;
                this.setState({align_vertical: align_vertical, align_horizontal: align_horizontal});
            }.bind(this))
        })
    },

    submitBackgroundimagePositionChange: function(){
        var backgroundimageprojectid = this.props.backgroundimage_project_id;
        $.ajax({
            type: "POST",
            url: "user/ajax/post/change_section_background_image_position",
            data: {
                "backgroundimage_project_id": backgroundimageprojectid,
                "alignvertical": this.state.align_vertical,
                "alignhorizontal": this.state.align_horizontal,
                _token: $_token
            },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error. Please be sure the entered values are between 0 and 100.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function () {

                $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                $('#content-main').show();
                ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
            }.bind(this))
        })
    },

    handleCloseModal: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
    },

    handleAlignVerticalTextEntry: function(event){
        this.setState({align_vertical: event.target.value});
    },

    handleAlignHorizontalTextEntry: function(event){
        this.setState({align_horizontal: event.target.value});
    },

    render: function() {
        var containerstyle = {padding:0};
        var btnpad = {padding:'0.25%'};
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var alignverticaldefaulttext = this.state.align_vertical;
        var alignhorizontaldefaulttext = this.state.align_horizontal;
        return(
        <div className="" style={containerstyle} id="backgroundimages-manage-container">
            <div className="row">
                <div className="col-xs-12" style={btnpad} >
                    <a className="btn btn-danger btn-block" onClick={this.handleCloseModal} >Cancel</a>
                </div>
            </div>
            <div id="fbphotodisplay" ref="fbphotodisplay">
                <p>Set vertical align to 0 to crop image from bottom as screen shrinks vertically.</p>
                <p>Set horizontal align to 0 to crop image from right as screen shrinks horizontally.</p>
                <p>50 is center, 100 is max value.</p>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="alignverticaltextinput">Enter Vertical Align:</label>
                    <div className="col-sm-9">
                        <input type="text" id="alignverticaltextinput" className="form-control" value={alignverticaldefaulttext} onChange={this.handleAlignVerticalTextEntry}/>
                    </div>
                    <label className="col-sm-3 control-label" htmlFor="alignhorizontaltextinput">Enter Horizontal Align:</label>
                    <div className="col-sm-9">
                        <input type="text" id="alignhorizontaltextinput" className="form-control" value={alignhorizontaldefaulttext} onChange={this.handleAlignHorizontalTextEntry}/>
                    </div>
                </div>
                <div style={submitstyle}><a className="btn btn-primary" onClick={this.submitBackgroundimagePositionChange} >Submit</a></div>
            </form>
            </div>
        </div>
        );
    }
});