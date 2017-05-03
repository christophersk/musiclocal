"use strict";var VideoContainer=React.createClass({displayName:"VideoContainer",getInitialState:function getInitialState(){return {data:[]};},componentDidMount:function componentDidMount(){$.ajax({type:"GET",url:"user/ajax/get/get_current_user_youtubevideos",data:{ //"projectid": projectid
},error:function error(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success','alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);},success:(function(response){ //console.log(response);
$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger','alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);var parsedresponse=JSON.parse(response);var youtubevideoresponse=parsedresponse.youtubevideoarray;this.setState({data:youtubevideoresponse});}).bind(this)});},handleDeleteRequest:function handleDeleteRequest(data){var youtubevideoid=data.youtubevideo_id;var r=confirm("Are you sure you want to delete this photo album? This will remove this photo album from all MusicLocal projects, but photos in other albums will not be affected. WARNING: this action cannot be undone.");if(r == true){$.ajax({type:"POST",url:"/user/videos/youtubevideos/manage/delete", //dataType: "text"
data:{"youtubevideo_id":youtubevideoid,_token:$_token},error:function error(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success','alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);},success:function success(response){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger','alert-info').html('Success').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);setstatefunction();}});var setstatefunction=(function(){var newdataarray=this.state.data;var elementPosData=this.state.data.map(function(item){return item.youtubevideo_id;}).indexOf(youtubevideoid);if(elementPosData != -1){newdataarray.splice(elementPosData,1);}this.setState({data:newdataarray});}).bind(this);}else {}},render:function render(){return React.createElement("div",null,React.createElement(YoutubevideoList,{data:this.state.data,handleDeleteRequest:this.handleDeleteRequest}));}});var YoutubevideoList=React.createClass({displayName:"YoutubevideoList",handleDeleteRequest:function handleDeleteRequest(data){this.props.handleDeleteRequest(data);},render:function render(){var youtubevideos=this.props.data.map((function(youtubevideo){return React.createElement(CurrentYoutubevideo,{identifier:youtubevideo.youtubevideo_identifier,id:youtubevideo.youtubevideo_id,key:youtubevideo.youtubevideo_identifier,handleDeleteRequest:this.handleDeleteRequest});}).bind(this));var imgcontstyle={};return React.createElement("div",{className:"row"},youtubevideos);}});var CurrentYoutubevideo=React.createClass({displayName:"CurrentYoutubevideo",handleDeleteRequest:function handleDeleteRequest(){this.props.handleDeleteRequest({youtubevideo_id:this.props.id,youtubevideo_identifier:this.props.identifier});},render:function render(){var srcstring='https://www.youtube.com/embed/' + this.props.identifier + '?rel=0&controls=1&theme=dark&modestbranding=1&showinfo=0';return React.createElement("div",{id:this.props.id,className:"col-xs-12 col-sm-6 col-md-4"},React.createElement("div",{className:"embed-responsive embed-responsive-16by9"},React.createElement("iframe",{className:"embed-responsive-item",id:"ytplayer",type:"text/html",src:srcstring,allowFullScreen:true,frameBorder:"0"})),React.createElement("div",null,React.createElement("a",{className:"btn btn-warning btn-lg btn-block",onClick:this.handleDeleteRequest},"Remove")),React.createElement("br",null));}});