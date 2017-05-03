var BackgroundimagesMenu = React.createClass({

    getInitialState: function(){
    //{name: 'Create', reactnodetomount: 'BackgroundimageCreateContainer', mountlocation: 'content-main', active: false},
        return {links: [
            {name: 'Manage', reactnodetomount: 'BackgroundimageContainer', mountlocation: 'content-main', active: false},
            {name: 'Create', reactnodetomount: 'FullBackgroundimageCreateContainer', mountlocation: 'content-main', active: false}
        ]};
    },

    componentDidMount: function(){
        this.setState({links: [
            {name: 'Manage', reactnodetomount: 'BackgroundimageContainer', mountlocation: 'content-main', active: false},
            {name: 'Create', reactnodetomount: 'FullBackgroundimageCreateContainer', mountlocation: 'content-main', active: false}
        ]});
    },

    componentWillUnmount: function() {
        $("#componentsbutton").removeClass("active");
        $("#componentschildtarget").html("").removeClass("active");
    },

    onLinkClick: function(data){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
        if (data == 'BackgroundimageContainer'){
            ReactDOM.render(<BackgroundimageContainer/>, document.getElementById('content-main'));
        }
        /*
        else if (data == 'BackgroundimageCreateContainer'){
            ReactDOM.render(<BackgroundimageCreateContainer/>, document.getElementById('content-main'));
        }*/
        else if (data == 'FullBackgroundimageCreateContainer'){
            ReactDOM.render(<BackgroundimageCreationPanel/>, document.getElementById('content-main'));
        }
    },

    render: function(){
        var links = this.state.links.map(function(link){
            return <BackgroundimagesMenuLink name={link.name} key={link.reactnodetomount} reactnodetomount={link.reactnodetomount} onLinkClick={this.onLinkClick}/>
        }.bind(this));
        var middlestyle = {paddingLeft:0,paddingRight:0};
        return (
            <div className="row nopadding">
                <CollectionsBackButton />
                <div className="col-xs-8 col-sm-2" style={middlestyle}>
                    {links}
                </div>
            </div>
        );
    }
});

var BackgroundimagesMenuLink = React.createClass({

    componentDidMount: function(){

    },

    onLinkClick: function(){

        this.props.onLinkClick(this.props.reactnodetomount);
    },

    render: function(){
        var name = this.props.name;
        if (name == 'Create') { var buttonclass = 'btn btn-block btn-success'; }
        else if (name == 'Manage') { var buttonclass = 'btn btn-block btn-primary'; }
        else { var buttonclass = ''; }
        return (
            <div>
                <div className="">
                    <a className={buttonclass} onClick={this.onLinkClick}>{this.props.name}</a>
                </div>
                <div className="clearfix visible-sm-block visible-md-block visible-lg-block"></div>
            </div>
        );
    }
});