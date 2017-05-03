var CoverContainer = React.createClass({

    getInitialState: function(){
        return {"sections_project": []};
    },

    componentDidMount: function() {
        var project_id = this.props.data.project_id;
        $.ajax({
            type: "GET",
            url: "/user/projects/ajax/get/edit_project_icon_media_get",
            data: {
                "project_id": project_id,
                "_token": $_token
                },
            error: (function () {
                $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('Your current project could not be loaded. Please try again.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
            console.log(response);
                var parsedresponse = JSON.parse(response);
                var parsedsectionprojects = parsedresponse.sections_project;
                this.setState({"sections_project": parsedsectionprojects});
                ReactDOM.render(<CoverList data={this.props.data} sections_project={this.state.sections_project}/>, document.getElementById('coverlistplaceholder'));
                /*
                var backgroundimageplacements = parsedresponse.sections_project.map(function(backgroundimageplacement){
                    var imgidstring = '#bgimg-' + backgroundimageplacement.section_id;
                    var repositionidstringwithhash = '#reposition-' + backgroundimageplacement.section_id;
                    var srcstring = '//d1y0bevpkkhybk.cloudfront.net/bsm/' + backgroundimageplacement.backgroundimage_filename + '.jpg';
                    var file = backgroundimageplacement.backgroundimage_filename;
                    $(imgidstring).attr({"src": srcstring});
                    $(repositionidstringwithhash).attr({"data-filename": file});
                });*/

            }.bind(this))
        });
    },

    handleAddChangeBackgroundimageClick: function($e){
        $('#content-main').hide();
        ReactDOM.render(<BackgroundimageAddChangeContainer data={this.props.data} section_id={$e.target.id} />, document.getElementById('content-modal'));
    },

    render: function(){
        return (
            <div>
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <a className="btn btn-success btn-block" onClick={this.handleAddChangeBackgroundimageClick}>Add Image</a><br/>
                </div>
                <div className="col-xs-12">
                    <div id="coverlistplaceholder"></div>
                </div>
            </div>
        );
    }
});

var CoverList = React.createClass({

    render: function(){
        var projectsectionbuttons = this.props.sections_project.map(function(projectsectionbutton){
            return (
                <CoverImageButton data={this.props.data} backgroundimage_filename={projectsectionbutton.backgroundimage_filename} key={projectsectionbutton.backgroundimage_filename} backgroundimage_project_id={projectsectionbutton.backgroundimage_project_id} />
            );
        }.bind(this));
        return (
            <div>
                {projectsectionbuttons}
            </div>
        );
    }
});

var CoverImageButton = React.createClass({

    handleChangeBackgroundimagePosition: function($e){
        if ($e.target.dataset.filename == '') {alert('No background image has been assigned. Please assign a background image before repositioning.');}
        else {
            $('#content-main').hide();
            ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
            ReactDOM.render(<BackgroundimagePositionContainer data={this.props.data} backgroundimage_project_id={this.props.backgroundimage_project_id} />, document.getElementById('content-modal'));
        }
    },

    handleRemoveBackgroundimage: function($e){
        var r = confirm("Are you sure you want to remove this background image? Note: any headline information for this section will be removed as well.");
        if (r == true){
            var projectid = this.props.data.project_id;
            var sectionid = $e.target.dataset.section_id;
            $.ajax({
                type: "POST",
                url: "user/ajax/post/remove_section_background_image",
                data: {
                    "projectid": projectid,
                    "sectionid": sectionid,
                    //"backgroundimageid": backgroundimageid,
                    _token: $_token
                },
                error: (function (response) {
                    console.log(response);
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    ReactDOM.unmountComponentAtNode(document.getElementById('manageprojectcontent'));
                    ReactDOM.render(<CoverContainer data={this.props.data} />, document.getElementById('manageprojectcontent'));
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            })
        }
    },

    render: function(){
        var filename = this.props.backgroundimage_filename;
        if (filename != ''){
        /*note: these are all being set with jquery after an ajax call; react updating not working*/
            var srcstring1 = '//d1y0bevpkkhybk.cloudfront.net/bsm/' + filename + '.jpg';
            var imgchangebuttontext = 'Change image.';
            var imgchangebuttontext2 = 'Reposition image.';
        }
        else {
            var srcstring1 = '//d1y0bevpkkhybk.cloudfront.net/placeholder_16-10.jpg';
            var imgchangebuttontext = 'Edit image';
            var imgchangebuttontext2 = 'Reposition image';
        }
        var padding = {paddingBottom:15};
        var marginfix = {marginTop:0}; //bootstrap adds top margin to stacked button blocks; this eliminates it
        return (
            <div className="col-xs-12 col-sm-6 col-sm-offset-3" style={padding}>
                <img className="img img-responsive" src={srcstring1} />
                <a className="btn btn-default btn-block" data-filename={this.props.backgroundimage_filename} data-backgroundimage_project_id={this.props.backgroundimage_project_id} onClick={this.handleChangeBackgroundimagePosition}>Reposition Image</a>
                <a className="btn btn-danger btn-block" style={marginfix} data-section_id={this.props.section_id} onClick={this.handleRemoveBackgroundimage}>Remove image</a>
            </div>
        );
    }

});

var ChangeBackgroundimagePosition = React.createClass({
    render: function(){
        return (
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="facebooktextinput">Horizontal Align: </label>
                        <div className="col-sm-9">
                            <input type="text" id="align_horizontal" className="form-control" value={facebookdefaulttext} onChange={this.handleFacebookTextEntry}/>
                        </div>
                    </div>
                    <div style={submitstyle}><a onClick={this.submitFacebookwidgetChange} >Submit</a></div>
                </form>

            </div>
        );
    }

});
