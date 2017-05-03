var ShowsProjectContainer = React.createClass({

    getInitialState: function(){
        return {bandsintownwidget_artistname: '', bandsintownwidget_active: '', reverbnationwidget_url: 'https://www.reverbnation.com/', reverbnationwidget_script: '', tourwidget_selection: '1'};
    },

    componentDidMount: function(){
        var projectid = this.props.data.project_id;
        $.ajax({
            type: 'GET',
            url: '/user/projects/bandsintownwidget/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                var bandsintownartistname = parsedresponse.bandsintownwidget_artistname;
                var bandsintownwidgetactive = parsedresponse.bandsintownwidget_active;
                this.setState({bandsintownwidget_artistname: bandsintownartistname, bandsintownwidget_active: bandsintownwidgetactive});
            }.bind(this))
        });

        $.ajax({
            type: 'GET',
            url: '/user/projects/tourwidgets/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                var bandsintownartistname = parsedresponse.bandsintownwidget_artistname;
                var reverbnationwidget_url = 'https://www.reverbnation.com/' + parsedresponse.reverbnationwidget_path;
                var reverbnationwidget_script = parsedresponse.reverbnationwidget_script;
                var tourwidget_selection = parsedresponse.tourwidget_selection;

                this.setState({bandsintownwidget_artistname: bandsintownartistname, reverbnationwidget_url: reverbnationwidget_url, reverbationwidget_script: reverbnationwidget_script, tourwidget_selection: tourwidget_selection});
            }.bind(this))
        });
    },

    submitBandsintownwidgetChange: function(){
            var projectid = this.props.data.project_id;
            var bandsintownwidgetartistname = this.state.bandsintownwidget_artistname;
            $.ajax({
                type: "POST",
                url: "/user/projects/bandsintownwidget/addchange",
                data: {
                "project_id": projectid,
                "bandsintownwidget_artistname": bandsintownwidgetartistname,
                "bandsintownwidget_active": true,
                _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            })
    },

    submitTourwidgetChange: function(){
            var projectid = this.props.data.project_id;
            var bandsintownwidgetartistname = this.state.bandsintownwidget_artistname;
            var reverbnationwidget_url = this.state.reverbnationwidget_url;
            var reverbnationwidget_script = this.state.reverbnationwidget_script;
            var tourwidget_selection = this.state.tourwidget_selection;
            $.ajax({
                type: "POST",
                url: "/user/projects/tourwidgets/addchange",
                data: {
                    "project_id": projectid,
                    "bandsintownwidget_artistname": bandsintownwidgetartistname,
                    "reverbnationwidget_url": reverbnationwidget_url,
                    "reverbnationwidget_script": reverbnationwidget_script,
                    "tourwidget_selection": tourwidget_selection,
                    _token: $_token
                },
                error: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-success', 'alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function () {
                    $('.flash').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }.bind(this))
            })
    },

    handleTourwidgetSelectionEntry: function(event){
        this.setState({tourwidget_selection: event.target.value});
    },

    handleBandsintownwidgetTextEntry: function(event){
        this.setState({bandsintownwidget_artistname: event.target.value});
    },

    handleReverbnationwidgetPathTextEntry: function(event){
        this.setState({reverbnationwidget_url: event.target.value});
    },

    handleReverbnationwidgetScriptTextEntry: function(event){
        this.setState({reverbnationwidget_script: event.target.value});
    },

    render: function(){
        var submitstyle = {textAlign:'center', width:'100%', paddingTop:5};
        var bandsintownwidgetdefaulttext = this.state.bandsintownwidget_artistname;
        var reverbnationwidget_path_defaulttext = this.state.reverbnationwidget_url;
        var reverbnationwidget_script_defaulttext = this.state.reverbnationwidget_script;
        var projectsection_toggle_data = {isactive: null, projectsection_id: 2, activatebutton_text: 'retrieving active status...'};
        var tourwidget_selection_defaultvalue = this.state.tourwidget_selection;
        return (
        <div>
            <ProjectsectionToggle project_id={this.props.data.project_id} projectsection_toggle_data={projectsection_toggle_data}/>
            <br/>
            <div className="col-xs-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="bandsintownwidgettextinput">Enter Bandsintown Artist Name:</label>
                        <div className="col-sm-9">
                            <input type="text" id="bandsintownwidgettextinput" className="form-control" value={bandsintownwidgetdefaulttext} onChange={this.handleBandsintownwidgetTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="reverbnationwidget_path_text_input">Enter Reverbnation URL:</label>
                        <div className="col-sm-9">
                            <input type="text" id="reverbnationwidget_path_text_input" className="form-control" value={reverbnationwidget_path_defaulttext} onChange={this.handleReverbnationwidgetPathTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="reverbnationwidget_script_text_input">Enter Reverbnation Embed Script Name:</label>
                        <div className="col-sm-9">
                            <textarea rows="6" id="reverbnationwidget_script_text_input" className="form-control" value={reverbnationwidget_script_defaulttext} onChange={this.handleReverbnationwidgetScriptTextEntry}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor="tourwidget_selection_input">Which tour widget would you like to use on your project's "Tour" section?</label>
                        <div className="col-sm-9">
                            <select name="tourwidget_selection" className="form-control" value={tourwidget_selection_defaultvalue} onChange={this.handleTourwidgetSelectionEntry} >
                                <option value="1">BandsInTown</option>
                                <option value="2">ReverbNation</option>
                            </select>
                        </div>
                    </div>
                    <div style={submitstyle}><a onClick={this.submitTourwidgetChange} >Submit</a></div>
                </form>
            </div>
        </div>
        );
    }
});