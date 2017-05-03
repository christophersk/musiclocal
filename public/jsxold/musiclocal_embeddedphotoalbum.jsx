var CurrentAlbum = React.createClass ({

    getInitialState: function(){
        return { showComponent: true, filenames: [{filename: ''}], albumname: '' };
    },

    onClick: function(){

    },

    handleSuccess: function(){
    //console.log('success');
    },

    componentDidMount: function(){

        var photoalbumid = $('#datadiv').data('photoalbumid');
            $.ajax({
                type: "GET",
                url: "/embeddables/photoalbum/photos",
                data: {
                  "photoalbum_id": photoalbumid
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    //console.log(response);
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                    var parsedresponse = JSON.parse(response);
                    var photoalbumresponse = parsedresponse.filenames;
                    var photoalbumname = parsedresponse.albumname;
                    //console.log(photoalbumresponse);
                    //var projectresponse = parsedresponse.projectbannerimages;
                    //console.log(foo.uniquebannerimages);
                    this.setState({filenames: photoalbumresponse, albumname: photoalbumname});
                    //renderreact(uniqueresponse, projectresponse);
                }.bind(this))
            })
    },

    componentDidUpdate: function(){

    },

    render: function() {
        if (!this.state.showComponent){
            return null;
        }
        var albumphotos = this.state.filenames.map(function(albumphoto){
            return <AlbumPhoto filename={albumphoto.filename} />
        });
        var textalign = {textAlign:'center'};
        var photostyle = {padding: '0.25%'};
        //var name = this.props.filename;
        //console.log(name);
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
        var photoalbumcontainerstyle = {width:'100%'};
        var containerstyle = {display:'flex', flexWrap:'wrap', justifyContent:'space-between'};
        return (
            //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
            //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />

            <div id={this.state.albumname} className="row nopadding">
            <div className="col-xs-12">
                <div style={containerstyle} id="get-user-photos-from-facebook">
                {albumphotos}
                </div>
            </div>
            </div>
        );
    }
});

var AlbumPhoto = React.createClass ({

    getInitialState: function(){
        return {maxheight:null, postopadjust:null};
    },

    componentDidMount: function(){

    },

    componentDidUpdate: function(){

    },

    resizeOnClick: function(){

    },

    onClick: function(){
        //ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        ReactDOM.render(<AlbumPhotoModal filename={this.props.filename} id={this.props.id} key={'modal' + this.props.id} />, document.getElementById('content-modal'));
        $('#savecurrentbannerbutton').attr('href', '//d1y0bevpkkhybk.cloudfront.net/0/' + this.props.filename + '.jpg' );
    },

    render:function(){
        var name = this.props.filename;
        var imgid = 'img-' + this.props.filename;
        var imgidhash =  '#' + imgid;
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0t/' + name + '.jpg';
        var imgdiv = {padding:'0.25%'};
        var idhash = '#' + this.props.filename;
        var imgstyle = {marginBottom:5, width:'33%', height:'33%'};
        var helper = {display: 'inline-block', verticalAlign: 'middle', height: '100%'};
        return (
                <img className="img img-responsive imglink" src={srcstring} ref={this.props.identifier} id={imgid} style={imgstyle} onClick={this.onClick} />
        );
    }
});

var AlbumPhotoModal = React.createClass ({

    getInitialState: function(){
        return { showComponent: true };
    },

    componentDidMount: function(){
        var imgload = new Image();
        imgload.addEventListener("load", function(){
            $('.preloadedthumbimage').attr("src", imgload.src);
            //.animate({'width':'auto','height':'auto','maxWidth':'100%'}, 0, function(){
                //this.timerFunction(imgload);
            //}.bind(this));
        }.bind(this));
        imgload.src = '//d1y0bevpkkhybk.cloudfront.net/0/' + this.props.filename + '.jpg';
        $('#imgmodal').slideDown(0, function(){
        });
    },

    timerFunction: function(imgload) {
        console.log('starting correct modal height...');
        this.correctModalHeight(imgload);
    },

    correctModalHeight: function(imgload) {
        console.log(imgload.width);
        var imgh = imgload.height;
        var h = (window).innerHeight;
        var maxh = h - 140;
        var imgmaxh = maxh - 100;
        $('html,body').animate({scrollTop: $('#images').offset().top}, 500);
        $('#currentmodalimage').animate({'height': imgh, "maxHeight": imgmaxh, width:'auto'}, 0, function(){
            var actualimgheight = $('#currentmodalimage').height();
            var closedivheight = $('#modalsaveclose').height();
            var calch = actualimgheight + closedivheight + 20;
            $('#imgmodal').animate({"height": calch, "maxHeight": maxh}, 0, function(){
                this.correctModalWidth(imgload);
            }.bind(this));
        }.bind(this));

    },

    correctModalWidth: function(imgload) {
        console.log(imgload.width);
        var imgloadheight = imgload.height;
        var imgh = $('#currentmodalimage').height() - 20;
        var ratio = imgloadheight / imgh;
        var calcimgw = imgload.width / ratio;
        //var imgw = $('#currentmodalimage').width();
        var w = (window).innerWidth;
        $('#currentmodalimage').animate({width: calcimgw}, 0);
        var targetmodalmargin = ( ( w - (calcimgw)  ) / 2 ) ;
        $('#imgmodal').animate({width: calcimgw, marginLeft: targetmodalmargin, marginRight: targetmodalmargin, maxWidth: '100%', left: 0}, 0);
    },

    handleClose: function(){
        clearInterval(this.timer);
        $('#imgmodal').slideUp(1, function() {
            ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        });
    },

    modalBackgroundClick: function() {
        this.handleClose();
    },

    render: function(){
        var ratio = $('#img-' + this.props.filename).height() / $('#img-' + this.props.filename).width();
        var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0t/' + this.props.filename + '.jpg';
        var spacerstyle = {paddingLeft:10};
        var w = (window).innerWidth;
        var r = w * .95;
        var l = w * .05;
        var h = (window).innerHeight;

        var maxh = h - 140;


        var imgmaxheight = maxh - 74;
        var maxw = imgmaxheight / ratio;
        var imgmaxwidth = imgmaxheight / ratio;
        var calcmargin = (w - (imgmaxwidth)) / 2;
        var textdivstyle = {display:'block',textAlign:'center'};
        var modalstyle = {position:'fixed',zIndex:1032,backgroundColor:'#ffffff',left:calcmargin,top:70,right:calcmargin,height:maxh,width:maxw,textAlign:'center',display:'none'};
        var imgstyle = {display:'block',maxHeight:imgmaxheight,maxWidth:imgmaxwidth,marginLeft:0,marginRight:0,paddingLeft:20,paddingRight:20,alignSelf:'center',marginTop:20};
        var modalbackgroundstyle = {position:'fixed',zIndex:1031,backgroundColor:'rgba(34,34,34,.5)',left:0,top:0,width:'100%',height:'100%'};
        return (
        <div>
        <div style={modalbackgroundstyle} onClick={this.modalBackgroundClick} id="modalbackground"></div>
        <div className="cursorprogress" style={modalstyle} id="imgmodal">
            <img className="img preloadedthumbimage img-responsive" style={imgstyle} id="currentmodalimage" src={srcstring} />
            <div style={textdivstyle} id="modalsaveclose"><br/>

                <a id="savecurrentbannerbutton" href="" download className="btn btn-primary">Save</a>
                <span style={spacerstyle}></span>
                <a id="closebox" className="btn btn-default" onClick={this.handleClose} >Close</a>
                <br/>
                <br/>
            </div>
        </div>
        </div>
        );
    }
});