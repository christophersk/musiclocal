'use strict';var BannersMenu=React.createClass({displayName:'BannersMenu',getInitialState:function getInitialState(){return {links:[{name:'Manage',reactnodetomount:'BannerContainer',mountlocation:'content-main',active:false},{name:'Create',reactnodetomount:'BannerCreateContainer',mountlocation:'content-main',active:false},{name:'Create Full',reactnodetomount:'FullBannerCreateContainer',mountlocation:'content-main',active:false}]};},componentDidMount:function componentDidMount(){this.setState({links:[{name:'Manage',reactnodetomount:'BannerContainer',mountlocation:'content-main',active:false},{name:'Create Full',reactnodetomount:'FullBannerCreateContainer',mountlocation:'content-main',active:false}]});},componentWillUnmount:function componentWillUnmount(){$("#componentsbutton").removeClass("active");$("#componentschildtarget").html("").removeClass("active");},onLinkClick:function onLinkClick(data){ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();if(data == 'BannerContainer'){ReactDOM.render(React.createElement(BannerContainer,null),document.getElementById('content-main'));}else if(data == 'BannerCreateContainer'){ReactDOM.render(React.createElement(BannerCreateContainer,null),document.getElementById('content-main'));}else if(data == 'FullBannerCreateContainer'){ReactDOM.render(React.createElement(FullBannerCreationPanel,null),document.getElementById('content-main'));}},render:function render(){var links=this.state.links.map((function(link){return React.createElement(BannersMenuLink,{name:link.name,key:link.reactnodetomount,reactnodetomount:link.reactnodetomount,onLinkClick:this.onLinkClick});}).bind(this));return React.createElement('div',null,React.createElement('div',{className:'col-sm-12'},React.createElement('ul',{className:'nav nav-pills nav-justified'},links)));}});var BannersMenuLink=React.createClass({displayName:'BannersMenuLink',componentDidMount:function componentDidMount(){},onLinkClick:function onLinkClick(){this.props.onLinkClick(this.props.reactnodetomount);},render:function render(){return React.createElement('li',{role:'presentation'},React.createElement('a',{onClick:this.onLinkClick},this.props.name));}});