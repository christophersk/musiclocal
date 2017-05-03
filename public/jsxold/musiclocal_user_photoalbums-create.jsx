var PhotoalbumCreateContainer = React.createClass({

    getInitialState: function(){
        return {photoalbum_name: []};
    },

    componentDidMount: function(){
    },

    submitCreateNewPhotoalbum: function(){
            var photoalbumname = this.state.photoalbum_name;
            $.ajax({
                type: "POST",
                url: "user/ajax/post/add_photoalbum",
                data: {
                "photoalbum_name": photoalbumname,
                _token: $_token
                },
                error: (function () {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    //var parsedresponse = JSON.parse(response);
                    //this.setState({data: parsedresponse});
                    ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
                    ReactDOM.render(<PhotoalbumContainer url=""/>, document.getElementById('content-main'));
                    //location.reload();
                    alert('Your photo album has been created.');
                }.bind(this))
            })
    },

    handlePhotoalbumNameTextEntry: function(event){
        this.setState({photoalbum_name: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var photoalbumnamedefaulttext = this.state.photoalbum_name;
        var projecturldefaulttext = this.state.project_url;
        var paddiv = {padding:8};
        return (
        <div className="col-sm-12">
        <form className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="photoalbumnametextinput">Photo Album Name:</label>
                <div className="col-sm-9">
                    <input type="text" id="photoalbumnametextinput" className="form-control" value={photoalbumnamedefaulttext} onChange={this.handlePhotoalbumNameTextEntry}/>
                </div>
            </div>
            <div style={submitstyle}><a onClick={this.submitCreateNewPhotoalbum} >Create Photo Album</a></div>
        </form>
        </div>
        );
    }

});