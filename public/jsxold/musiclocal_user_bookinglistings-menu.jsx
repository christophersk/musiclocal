var BookinglistingMenu = React.createClass({

    getInitialState: function(){
        return {links: [
            {name: 'Manage', reactnodetomount: 'BookinglistingContainer', mountlocation: 'content-main', active: false},
            {name: 'Create', reactnodetomount: 'BookinglistingCreateContainer', mountlocation: 'content-main', active: false}
        ]};
    },

    componentDidMount: function(){
        this.setState({links: [
            {name: 'Manage', reactnodetomount: 'BookinglistingContainer', mountlocation: 'content-main', active: false},
            {name: 'Create', reactnodetomount: 'BookinglistingCreateContainer', mountlocation: 'content-main', active: false}
        ]});
    },

    onLinkClick: function(data){
        ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));
        $('#content-main').show();
        if (data == 'BookinglistingContainer'){
            ReactDOM.render(<BookinglistingContainer/>, document.getElementById('content-main'));
        }
        else if (data == 'BookinglistingCreateContainer'){
            ReactDOM.render(<BookinglistingCreateContainer/>, document.getElementById('content-main'));
        }
    },

    componentWillUnmount: function() {
        $("#componentsbutton").removeClass("active");
        $("#componentschildtarget").html("").removeClass("active");
    },

    render: function(){
        var links = this.state.links.map(function(link){
            return <BookinglistingMenuLink name={link.name} reactnodetomount={link.reactnodetomount} onLinkClick={this.onLinkClick}/>
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

var BookinglistingMenuLink = React.createClass({

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