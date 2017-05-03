var PhotoalbumsMenu = React.createClass({

    getInitialState: function(){
        return {links: [
            {name: 'Manage', reactnodetomount: 'PhotoalbumContainer', mountlocation: 'content-main', active: false},
            {name: 'Create', reactnodetomount: 'PhotoalbumCreateContainer', mountlocation: 'content-main', active: false}
        ]};
    },

    componentDidMount: function(){
        console.log('banner menu mounted');
        this.setState({links: [
            {name: 'Manage', reactnodetomount: 'PhotoalbumContainer', mountlocation: 'content-main', active: false},
            {name: 'Create', reactnodetomount: 'PhotoalbumCreateContainer', mountlocation: 'content-main', active: false}
        ]});
    },

    onLinkClick: function(data){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').html('');
        $('#content-main').show();
        if (data == 'PhotoalbumContainer'){
            ReactDOM.render(<PhotoalbumContainer/>, document.getElementById('content-main'));
        }
        else if (data == 'PhotoalbumCreateContainer'){
            ReactDOM.render(<PhotoalbumCreateContainer/>, document.getElementById('content-main'));
        }
    },

    componentWillUnmount: function() {
        $("#componentsbutton").removeClass("active");
        $("#componentschildtarget").html("").removeClass("active");
    },

    render: function(){
        var links = this.state.links.map(function(link){
            return <PhotoalbumsMenuLink name={link.name} reactnodetomount={link.reactnodetomount} onLinkClick={this.onLinkClick}/>
        }.bind(this));
        return (
        <div>
            <div className="col-sm-12">
                <ul className="nav nav-pills nav-justified">
                {links}
                </ul>
            </div>
        </div>
        );
    }
});

var PhotoalbumsMenuLink = React.createClass({

    componentDidMount: function(){

    },

    onLinkClick: function(){

        this.props.onLinkClick(this.props.reactnodetomount);
    },

    render: function(){
        return (
                <li role="presentation"><a onClick={this.onLinkClick}>{this.props.name}</a></li>
        );
    }
});