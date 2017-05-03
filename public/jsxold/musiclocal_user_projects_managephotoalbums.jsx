var PhotoalbumProjectContainer = React.createClass({

    getInitialState: function(){
        return {unaddedphotoalbumdata: [], addedphotoalbumdata: []};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/photoalbums/get',
            data: {
                projectid: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                var uniqueresponse = parsedresponse.uniquephotoalbums;
                var projectresponse = parsedresponse.projectphotoalbums;
                console.log(projectresponse);
                this.setState({unaddedphotoalbumdata: uniqueresponse, addedphotoalbumdata: projectresponse});
            }.bind(this))
        });
    },

    removeFromProject: function(datareceived) {
        var projectid = this.props.data.project_id;
        //console.log(datareceived);
        var photoalbumid = datareceived.photoalbum_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/photoalbums/remove",
            //dataType: "text"
            data: {
                "project_id": projectid,
                "photoalbum_id": photoalbumid,
                _token: $_token
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newunaddedphotoalbumdataarray = this.state.unaddedphotoalbumdata;
            newunaddedphotoalbumdataarray.push(datareceived);
            var newaddedphotoalbumdataarray = this.state.addedphotoalbumdata;
            var elementPos = this.state.addedphotoalbumdata.map(function(item){
                return item.photoalbum_id;
            }).indexOf(photoalbumid);
            newaddedphotoalbumdataarray.splice(elementPos, 1);
            this.setState({addedphotoalbumdata: newaddedphotoalbumdataarray, unaddedphotoalbumdata: newunaddedphotoalbumdataarray});
        }.bind(this)
    },

    addToProject: function(datareceived) {
        var projectid = this.props.data.project_id;
        var photoalbumid = datareceived.photoalbum_id;
        $.ajax({
            type: "POST",
            url: "/user/projects/photoalbums/add",
            //dataType: "text"
            data: {
                "project_id": projectid,
                "photoalbum_id": photoalbumid,
                _token: $_token
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                console.log(response);
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                setstatefunction();
            })
        });
        var setstatefunction = function(){
            var newaddedphotoalbumdataarray = this.state.addedphotoalbumdata;
            newaddedphotoalbumdataarray.push(datareceived);
            var newunaddedphotoalbumdataarray = this.state.unaddedphotoalbumdata;
            var elementPos = this.state.unaddedphotoalbumdata.map(function(item){
                return item.photoalbum_id;
            }).indexOf(photoalbumid);
            newunaddedphotoalbumdataarray.splice(elementPos, 1);
            this.setState({addedphotoalbumdata: newaddedphotoalbumdataarray, unaddedphotoalbumdata: newunaddedphotoalbumdataarray});
        }.bind(this)
    },

    render: function(){

        var projectsection_toggle_data = {isactive: null, projectsection_id: 5, activatebutton_text: 'retrieving active status...'};

        return (
        <div>
            <div className="col-xs-12">
                <ProjectsectionToggle project_id={this.props.data.project_id} projectsection_toggle_data={projectsection_toggle_data}/>
            </div>
            <AddedPhotoalbums addedphotoalbumdata={this.state.addedphotoalbumdata} removeFromProject={this.removeFromProject} />
            <UnaddedPhotoalbums unaddedphotoalbumdata={this.state.unaddedphotoalbumdata} addToProject={this.addToProject} />
        </div>
        );
    }
});

var AddedPhotoalbums = React.createClass({

    removeFromProject: function(data){
        this.props.removeFromProject(data);
    },

    render:function(){
        var photoalbums = this.props.addedphotoalbumdata.map(function(photoalbum){
            return <AddedAlbum  removeFromProject={this.removeFromProject} photoalbum_name={photoalbum.photoalbum_name} key={photoalbum.photoalbum_name} photoalbum_id={photoalbum.photoalbum_id} />
        }.bind(this));
        var imgcontstyle = {};
        return (
            <div className="col-sm-4">
            <br/>
            <h4>Added photo albums:</h4>
                {photoalbums}
            </div>
        );
    }
});

var AddedAlbum = React.createClass ({

    getInitialState: function(){
        return { showComponent: true, showNameChangeField: false };
    },

    onClick: function(){

    },

    handleSuccess: function(){
    console.log('success');
    },

    componentDidMount: function(){
    },

    handleLinkClick: function(){
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        $('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden;border:none;"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');
            $('#myModal').modal();
    },

    handleRemovePhotos: function(){

        var fullalbumlink = '//www.musiclocal.org/user/photos/albums/manage?photoalbum_id=' + this.props.id;
        $('#modalcontent2').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden;border:none;"></iframe><div style="display:block;text-align:center"><br><p></p></div>');
            $('#myModal2').modal();
    },

    handleNameChangeClick: function(){
        if (!this.state.showNameChangeField){
            this.setState({showNameChangeField: true});
        }
        else {
            this.setState({showNameChangeField: false});
        }
    },

    submitNameChange: function(){
    var albumid = this.props.id;
    var albumnamechangeref = '#' + this.props.refname;
    console.log(albumnamechangeref);
    var newalbumname = $(albumnamechangeref).val();
    console.log(newalbumname);
        $.ajax({
            type: "POST",
            url: "user/ajax/post/changephotoalbumname",
            data: {
            "photoalbum_id": albumid,
            "photoalbum_name": newalbumname,
            _token: $_token
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                location.reload();
            }.bind(this))
        })
    },

    handleDeleteRequest: function(){
        var photoalbumid = this.props.id;
        var r = confirm("Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "/user/photos/albums/manage/delete",
                //dataType: "text"
                data: {
                    "photoalbum_id": photoalbumid,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    console.log(response);
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    //var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    //console.log(moveimage);
                    setstatefunction();
                })
            });
            var setstatefunction = function(moveimage){
                this.setState({ showComponent: false });
                //console.log(moveimage);
                //this.props.onBannerAddClick({data: []});
                return;
            }.bind(this)
        }
        else {}
    },

    removeFromProject: function() {
        this.props.removeFromProject(this.props);
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        if (!this.state.showNameChangeField){
            var namechangediv = {display:'none'};
        }
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var photostyle = {padding: '0.25%'};
        //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        var photoalbumcontainerstyle = {width:'100%'};
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        var albumnamechangeref = 'albumnamechange-album' + this.props.id;
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />

            <div className="row outershadow">
                <div className="col-sm-12">
                    <p>{this.props.photoalbum_name} <a onClick={this.removeFromProject}>remove album from project</a></p>
                    <p><a onClick={this.handleRemovePhotos} >view/remove photos</a></p>
                    <p><a onClick={this.handleNameChangeClick}>Change album name</a></p>
                    <div style={namechangediv}>
                        <input type="text" className="form-control" /><div style={submitstyle}><a onClick={this.submitNameChange} >Submit</a></div>
                    </div>
                    <p><a onClick={this.handleLinkClick} >view album/embed code</a></p>
                    <p><a onClick={this.handleDeleteRequest} >delete this album</a></p>
                </div>
            </div>
        );
    }
});

var UnaddedPhotoalbums = React.createClass ({

    handleIntermediate: function(moveimage){

    console.log('triggered intermediate function');
    //this.props.onBannerAddClick(moveimage);
    },

    addToProject: function(data){
        this.props.addToProject(data);
    },

    render:function(){
        var photoalbums = this.props.unaddedphotoalbumdata.map(function(photoalbum){
            return <UnaddedAlbum addToProject={this.addToProject} photoalbum_name={photoalbum.photoalbum_name} key={photoalbum.photoalbum_name} photoalbum_id={photoalbum.photoalbum_id} />
        }.bind(this));
        var imgcontstyle = {};
        return (
            <div className="col-sm-8">
            <br/>
            <h4>Unadded photo albums:</h4>
                {photoalbums}
            </div>
        );
    }
});

var UnaddedAlbum = React.createClass ({

    getInitialState: function(){
        return { showComponent: true, showNameChangeField: false };
    },

    onClick: function(){

    },

    handleSuccess: function(){
    console.log('success');
    },

    componentDidMount: function(){
    },

    handleLinkClick: function(){
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        $('#modalcontent').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe><div style="display:block;text-align:center"><br><p><em>To embed your photo album on a webpage, copy and paste the code below:</em><br><textarea style="width:80%; height:100px;resize:none"><iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe></textarea></p></div>');
            $('#myModal').modal();
    },

    handleRemovePhotos: function(){

        var fullalbumlink = '//www.musiclocal.org/user/photos/albums/manage?photoalbum_id=' + this.props.id;
        $('#modalcontent2').html('<iframe src="' + fullalbumlink + '" style="width:100%; height:600px; overflow-x:hidden"></iframe><div style="display:block;text-align:center"><br><p></p></div>');
            $('#myModal2').modal();
    },

    handleNameChangeClick: function(){
        if (!this.state.showNameChangeField){
            this.setState({showNameChangeField: true});
        }
        else {
            this.setState({showNameChangeField: false});
        }
    },

    submitNameChange: function(){
    var albumid = this.props.id;
    var albumnamechangeref = '#' + this.props.refname;
    console.log(albumnamechangeref);
    var newalbumname = $(albumnamechangeref).val();
    console.log(newalbumname);
        $.ajax({
            type: "POST",
            url: "user/ajax/post/changephotoalbumname",
            data: {
            "photoalbum_id": albumid,
            "photoalbum_name": newalbumname,
            _token: $_token
            },
            error: (function () {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
            }),
            success: (function (response) {
                $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your photo has been successfully added to the album.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                location.reload();
            }.bind(this))
        })
    },

    handleDeleteRequest: function(){
        var photoalbumid = this.props.id;
        var r = confirm("Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.");
        if (r == true){
            $.ajax({
                type: "POST",
                url: "/user/photos/albums/manage/delete",
                //dataType: "text"
                data: {
                    "photoalbum_id": photoalbumid,
                    _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    console.log(response);
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    //var moveimage = [{"banner_filename": imagesrc, "banner_id": id}];
                    //var data = [{}];
                    //var moveimageparsed = JSON.parse(moveimage);
                    //console.log(moveimage);
                    setstatefunction();
                })
            });
            var setstatefunction = function(moveimage){
                this.setState({ showComponent: false });
                //console.log(moveimage);
                //this.props.onBannerAddClick({data: []});
                return;
            }.bind(this)
        }
        else {}
    },

    addToProject: function() {
        console.log(this.props);
        this.props.addToProject(this.props);
    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        if (!this.state.showNameChangeField){
            var namechangediv = {display:'none'};
        }
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var photostyle = {padding: '0.25%'};
        //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        var photoalbumcontainerstyle = {width:'100%'};
        var fullalbumlink = '//www.musiclocal.org/embeddables/photoalbum?photoalbum_id=' + this.props.id;
        var albumnamechangeref = 'albumnamechange-album' + this.props.id;
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />

            <div className="row nopadding outershadow">
                <div className="col-sm-12">
                    <p>{this.props.photoalbum_name} <a onClick={this.addToProject}>add album to project</a></p>
                    <p><a onClick={this.handleRemovePhotos} >view/remove photos</a></p>
                    <p><a onClick={this.handleNameChangeClick}>Change album name</a></p>
                    <div style={namechangediv}>
                        <input type="text" className="form-control" id={this.props.refname} /><div style={submitstyle}><a onClick={this.submitNameChange} >Submit</a></div>
                    </div>
                    <p><a onClick={this.handleLinkClick} >view album/embed code</a></p>
                    <p><a onClick={this.handleDeleteRequest} >delete this album</a></p>
                </div>
            </div>
        );
    }
});