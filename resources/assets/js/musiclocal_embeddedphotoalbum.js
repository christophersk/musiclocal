'use strict';

React.initializeTouchEvents(true);
$(document).ready(function () {

    var CurrentAlbum = React.createClass({
        displayName: 'CurrentAlbum',

        getInitialState: function getInitialState() {
            return { showComponent: true, filenames: [{ filename: '' }], albumname: '' };
        },

        onClick: function onClick() {},

        handleSuccess: function handleSuccess() {
            console.log('success');
        },

        componentDidMount: function componentDidMount() {

            var photoalbumid = $('#datadiv').data('photoalbumid');
            console.log('ajax component mounted');
            $.ajax({
                type: "GET",
                url: "/embeddables/photoalbum/photos",
                data: {
                    "photoalbum_id": photoalbumid
                },
                error: function error() {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                },
                success: (function (response) {
                    //console.log(response);
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);

                    var parsedresponse = JSON.parse(response);
                    var photoalbumresponse = parsedresponse.filenames;
                    var photoalbumname = parsedresponse.albumname;
                    console.log(photoalbumresponse);
                    //var projectresponse = parsedresponse.projectbannerimages;
                    //console.log(foo.uniquebannerimages);
                    this.setState({ filenames: photoalbumresponse, albumname: photoalbumname });
                    //renderreact(uniqueresponse, projectresponse);
                }).bind(this)
            });
        },

        componentDidUpdate: function componentDidUpdate() {},

        render: function render() {
            if (!this.state.showComponent) {
                return null;
            }
            var albumphotos = this.state.filenames.map(function (albumphoto) {
                return React.createElement(AlbumPhoto, { filename: albumphoto.filename, onBannerAddClick: this.handleIntermediate });
            });
            var textalign = { textAlign: 'center' };
            var photostyle = { padding: '0.25%' };
            //var name = this.props.filename;
            //console.log(name);
            var srcstring = '//d1y0bevpkkhybk.cloudfront.net/c/' + name + '.jpg';
            var photoalbumcontainerstyle = { width: '100%' };
            return(
                //<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
                //<img className="grid-item grid-item--width3" id={this.props.id} data-id={this.props.id} style={photostyle} onClick={this.onClick} src={srcstring} />

                React.createElement(
                    'div',
                    { id: this.state.albumname, className: 'row nopadding' },
                    React.createElement(
                        'div',
                        { style: textalign },
                        React.createElement(
                            'h3',
                            null,
                            this.state.albumname
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'grid', id: 'get-user-photos-from-facebook' },
                        React.createElement('div', { className: 'grid-sizer' }),
                        React.createElement('div', { className: 'gutter-sizer' }),
                        albumphotos
                    )
                )
            );
        }
    });

    var AlbumPhoto = React.createClass({
        displayName: 'AlbumPhoto',

        getInitialState: function getInitialState() {
            return { maxheight: null, postopadjust: null };
        },

        componentDidMount: function componentDidMount() {

            //var thephoto = new Image();
            //var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0/' + name + '.jpg';
            //thephoto.crossOrigin = "Anonymous";
            //$(thephoto).attr('data-caman-hidpi-disabled', '');
            //thephoto.src = srcstring;
            //var = this.props.identifier;

            //document.getElementById(idhash).addEventListener("load", function() {
            //$(window).load(function(){
            /*
            console.log('ffsdf');
                var idhash = '#' + this.props.filename;
                console.log(idhash);
                var imgwidth = $(idhash).width();
                console.log('initial image width is ' + imgwidth);
                var imgheight = $(idhash).height();
                console.log('initial image height is ' + imgheight);
                var calcmaxheight = imgwidth * 0.6666667;
                console.log('calc image height is ' + calcmaxheight);
                var heightdifference = imgheight-calcmaxheight;
                var posadjust = heightdifference / 2;
                console.log(posadjust);
                this.setState(
                    {maxheight:calcmaxheight,postopadjust:posadjust}
                );*/
            //}.bind(this), false);

        },

        componentDidUpdate: function componentDidUpdate() {
            var $grid = $('.grid').masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                //gutter: 5,
                percentPosition: true
            });
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
            $grid.masonry('reloadItems');
        },

        resizeOnClick: function resizeOnClick() {
            var imgid = 'img-' + this.props.filename;
            if ($('#' + imgid).hasClass('grid-item--width3')) {
                $('#' + imgid).removeClass('grid-item--width3').addClass('grid-item--widthentire');
            } else {
                $('#' + imgid).removeClass('grid-item--widthentire').addClass('grid-item--width3');
            }
            var $grid = $('.grid').masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                //gutter: 5,
                percentPosition: true
            });
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
            $grid.masonry('reloadItems');
        },

        render: function render() {
            var name = this.props.filename;
            var imgid = 'img-' + this.props.filename;
            var imgidhash = '#' + imgid;
            var srcstring = '//d1y0bevpkkhybk.cloudfront.net/0/' + name + '.jpg';
            var imgdiv = { padding: '0.25%' };
            var idhash = '#' + this.props.filename;
            var imgstyle = { marginBottom: 0 };
            var helper = { display: 'inline-block', verticalAlign: 'middle', height: '100%' };
            return React.createElement(
                'div',
                { id: this.props.filename },
                React.createElement('img', { className: 'grid-item grid-item--width3', src: srcstring, ref: this.props.identifier, id: imgid, style: imgstyle, onClick: this.resizeOnClick })
            );
        }
    });

    React.render(React.createElement(CurrentAlbum, { url: '' }), document.getElementById('testcontainer4'));
});