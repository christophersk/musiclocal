'use strict';var BookinglistingMenu=React.createClass({displayName:'BookinglistingMenu',getInitialState:function getInitialState(){return {links:[{name:'Manage',reactnodetomount:'BookinglistingContainer',mountlocation:'content-main',active:false},{name:'Create',reactnodetomount:'BookinglistingCreateContainer',mountlocation:'content-main',active:false}]};},componentDidMount:function componentDidMount(){this.setState({links:[{name:'Manage',reactnodetomount:'BookinglistingContainer',mountlocation:'content-main',active:false},{name:'Create',reactnodetomount:'BookinglistingCreateContainer',mountlocation:'content-main',active:false}]});},onLinkClick:function onLinkClick(data){ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();if(data == 'BookinglistingContainer'){ReactDOM.render(React.createElement(BookinglistingContainer,null),document.getElementById('content-main'));}else if(data == 'BookinglistingCreateContainer'){ReactDOM.render(React.createElement(BookinglistingCreateContainer,null),document.getElementById('content-main'));}},componentWillUnmount:function componentWillUnmount(){$("#componentsbutton").removeClass("active");$("#componentschildtarget").html("").removeClass("active");},render:function render(){var links=this.state.links.map((function(link){return React.createElement(BookinglistingMenuLink,{name:link.name,reactnodetomount:link.reactnodetomount,onLinkClick:this.onLinkClick});}).bind(this));return React.createElement('div',null,React.createElement('div',{className:'col-sm-12'},React.createElement('ul',{className:'nav nav-pills nav-justified'},links)));}});var BookinglistingMenuLink=React.createClass({displayName:'BookinglistingMenuLink',componentDidMount:function componentDidMount(){},onLinkClick:function onLinkClick(){this.props.onLinkClick(this.props.reactnodetomount);},render:function render(){return React.createElement('li',{role:'presentation'},React.createElement('a',{onClick:this.onLinkClick},this.props.name));}});