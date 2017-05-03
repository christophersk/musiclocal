"use strict";var BannerContainer=React.createClass({displayName:"BannerContainer",getInitialState:function getInitialState(){return {data:[]};},componentDidMount:function componentDidMount(){$.ajax({type:"GET",url:"user/ajax/get/get_current_user_banners_all",data:{ //"projectid": projectid
},error:function error(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success','alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);},success:(function(response){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger','alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse=JSON.parse(response);var uniqueresponse=parsedresponse.bannerimages; //var projectresponse = parsedresponse.projectbannerimages;
//console.log(foo.uniquebannerimages);
this.setState({data:uniqueresponse}); //renderreact(uniqueresponse, projectresponse);
}).bind(this)});},handleDeleteButton:function handleDeleteButton(childdata){var bannerid=childdata.bid;var imagesrc=childdata.filename;var tempstatedata=this.state.data;var setstatefunction=(function(){var newdataarray=this.state.data;var elementPos=this.state.data.map(function(item){return item.banner_id;}).indexOf(bannerid);newdataarray.splice(elementPos,1);this.setState({data:newdataarray}); //this does not seem to work (state is set correctly w/ item removed but component does not re-render even with forceUpdate.
//hiding component instead
$('#banner-' + bannerid).hide();}).bind(this);var r=confirm("Are you sure you want to delete this banner image? This will remove the banner image from all MusicLocal projects. WARNING: this action cannot be undone.");if(r == true){setstatefunction();$.ajax({type:"POST",url:"user/ajax/post/user_bannerdelete", //dataType: "text"
data:{"bannerimage_id":bannerid,"bannerimage_filename":imagesrc,_token:$_token},error:(function(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success','alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);this.setState({data:tempstatedata});$('#banner-' + bannerid).show();}).bind(this),success:(function(response){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger','alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();}).bind(this)});}},render:function render(){var containerstyle={padding:0}; //
return React.createElement("div",{className:"",style:containerstyle,id:"banners-manage-container"},React.createElement("div",{id:"fbphotodisplay",ref:"fbphotodisplay"},React.createElement(BannerList,{data:this.state.data,handleDeleteButton:this.handleDeleteButton})));}});var BannerList=React.createClass({displayName:"BannerList",handleDeleteButton:function handleDeleteButton(data){this.props.handleDeleteButton(data);},render:function render(){var banners=this.props.data.map((function(banner){return React.createElement(CurrentBanner,{filename:banner.banner_filename,key:banner.banner_id,id:banner.banner_id,onBannerAddClick:this.handleIntermediate,handleDeleteButton:this.handleDeleteButton});}).bind(this));var imgcontstyle={};return React.createElement("div",{id:"get-user-photos-from-facebook"},React.createElement("div",{id:"fbphotoscrollcontainer",ref:"fbphotoscrollcontainer",style:imgcontstyle},banners));}});var CurrentBanner=React.createClass({displayName:"CurrentBanner",getInitialState:function getInitialState(){return {showComponent:true};},componentDidMount:function componentDidMount(){},handleModalDeleteButton:function handleModalDeleteButton(data){this.props.handleDeleteButton(data);},handleDeleteButton:function handleDeleteButton(){this.props.handleDeleteButton({bid:this.props.id,filename:this.props.filename});},onClick:function onClick(){ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));ReactDOM.render(React.createElement(BannerModal,{filename:this.props.filename,id:this.props.id,key:'modal' + this.props.id,handleDeleteButton:this.handleModalDeleteButton}),document.getElementById('content-modal'));$('#content-main').hide();$('#savecurrentbannerbutton').attr('href','//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg');},render:function render(){if(!this.state.showComponent){return null;}var photostyle={padding:'0.25%'};var name=this.props.filename;var srcstring='//d1y0bevpkkhybk.cloudfront.net/t/' + name + '.jpg';var btndivstyle={textAlign:'center'};var btnstyle={marginTop:6,marginBottom:12};var idstring='banner-' + this.props.id;return  (//<img className="grid-item grid-item--width3" style={photostyle} onClick={this.onClick} src={this.props.link3} data-link0={this.props.link0} data-link1={this.props.link1} data-link2={this.props.link2} data-link4={this.props.link4} data-link5={this.props.link5} data-link6={this.props.link6} id={this.props.id} data-fromid={this.props.from_id} data-from_name={this.props.from_name} data-fb_created_time={this.props.fb_created_time}/>
React.createElement("div",{className:"col-sm-4",id:idstring},React.createElement("a",{onClick:this.onClick},React.createElement("img",{className:"img img-responsive",id:this.props.id,"data-id":this.props.id,style:photostyle,src:srcstring})),React.createElement("div",{style:btndivstyle},React.createElement("button",{style:btnstyle,className:"btn btn-default btn-xs",onClick:this.handleDeleteButton},"Delete Banner"))));}});var BannerModal=React.createClass({displayName:"BannerModal",getInitialState:function getInitialState(){return {showComponent:true};},componentDidMount:function componentDidMount(){},handleClose:function handleClose(){ReactDOM.unmountComponentAtNode(document.getElementById('content-modal'));$('#content-main').show();},handleDeleteButton:function handleDeleteButton(){this.props.handleDeleteButton({bid:this.props.id,filename:this.props.filename});},render:function render(){var srcstring='//d1y0bevpkkhybk.cloudfront.net/c/' + this.props.filename + '.jpg';var spacerstyle={padding:10};var textdivstyle={display:'block',textAlign:'center'};return React.createElement("div",{className:"col-sm-12"},React.createElement("img",{className:"img img-responsive",id:"currentmodalbanner",src:srcstring}),React.createElement("div",{style:textdivstyle},React.createElement("br",null),React.createElement("p",null,React.createElement("em",null,"To copy the link to your banner, right click on the banner and select \"Copy image URL.\"")),React.createElement("br",null),React.createElement("br",null),React.createElement("a",{id:"savecurrentbannerbutton",href:"",download:true,className:"btn btn-primary"},"Save Banner"),React.createElement("span",{style:spacerstyle}),React.createElement("a",{id:"deletecurrentbannerbutton",className:"btn btn-default",onClick:this.handleDeleteButton},"Delete Banner"),React.createElement("br",null),React.createElement("br",null),React.createElement("div",null,React.createElement("a",{id:"closebox",className:"btn btn-default",onClick:this.handleClose},"Close Banner"))));}});