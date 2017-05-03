'use strict';var VideosMenu=React.createClass({displayName:'VideosMenu',getInitialState:function getInitialState(){return {links:[{name:'Manage',reactnodetomount:'VideoContainer',mountlocation:'content-main',active:false},{name:'Create',reactnodetomount:'VideoCreateContainer',mountlocation:'content-main',active:false}]};},onLinkClick:function onLinkClick(data){ReactDOM.unmountComponentAtNode(document.getElementById('content-main'));ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').html('');$('#content-main').show();if(data == 'VideoContainer'){ReactDOM.render(React.createElement(VideoContainer,null),document.getElementById('content-main'));}else if(data == 'VideoCreateContainer'){ReactDOM.render(React.createElement(VideoCreateContainer,null),document.getElementById('content-main'));}},componentWillUnmount:function componentWillUnmount(){$("#componentsbutton").removeClass("active");$("#componentschildtarget").html("").removeClass("active");},render:function render(){var links=this.state.links.map((function(link){return React.createElement(VideosMenuLink,{name:link.name,reactnodetomount:link.reactnodetomount,onLinkClick:this.onLinkClick});}).bind(this));var middlestyle={paddingLeft:0,paddingRight:0};return React.createElement('div',{className:'row nopadding'},React.createElement(CollectionsBackButton,null),React.createElement('div',{className:'col-xs-8 col-sm-2',style:middlestyle},links),React.createElement('div',null,React.createElement('br',null)));}});var VideosMenuLink=React.createClass({displayName:'VideosMenuLink',onLinkClick:function onLinkClick(){this.props.onLinkClick(this.props.reactnodetomount);},render:function render(){var name=this.props.name;if(name == 'Create'){var buttonclass='btn btn-block btn-success';}else if(name == 'Manage'){var buttonclass='btn btn-block btn-primary';}else {var buttonclass='';}return React.createElement('div',null,React.createElement('div',{className:''},React.createElement('a',{className:buttonclass,onClick:this.onLinkClick},this.props.name)),React.createElement('div',{className:'clearfix visible-sm-block visible-md-block visible-lg-block'}));}});