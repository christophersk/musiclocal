'use strict';var AboutContainer=React.createClass({displayName:'AboutContainer',getInitialState:function getInitialState(){return {data:[]};},componentDidMount:function componentDidMount(){var projectid=this.props.data.project_id;$.ajax({type:'GET',url:'/user/projects/about/get',data:{project_id:projectid,_token:$_token},error:{},success:(function(response){var parsedresponse=JSON.parse(response); //var uniqueresponse = parsedresponse.uniquevideos;
//var projectresponse = parsedresponse.projectvideos;
//console.log(foo.uniquebannerimages);
this.setState({data:parsedresponse.about_content});var editor=CKEDITOR.replace('abouttextarea');editor.on('change',(function(evt){ // getData() returns CKEditor's HTML content.
console.log('Total bytes: ' + evt.editor.getData().length);this.setState({data:evt.editor.getData()});}).bind(this));}).bind(this)});},submitAboutChange:function submitAboutChange(){var projectid=this.props.data.project_id;var aboutcontent=this.state.data;$.ajax({type:"POST",url:"/user/projects/about/change",data:{"project_id":projectid,"about_content":aboutcontent,_token:$_token},error:function error(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success','alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);},success:(function(response){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger','alert-info').html('About section updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);}).bind(this)});},handleAboutSubmit:function handleAboutSubmit(){var projectid=$('#projectinfo').data('projectid');var aboutcontent=this.state.data;$.ajax({type:"POST",url:"/user/projects/about/change",data:{"project_id":projectid,"about_content":aboutcontent,_token:$_token},error:function error(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success','alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);},success:(function(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger','alert-info').html('About section updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);}).bind(this)});},handleTextareaEntry:function handleTextareaEntry(event){var ckeditordata=CKEDITOR.instances.textareaabout.getData();this.setState({data:ckeditordata});return;},render:function render(){var submitstyle={textAlign:'center',width:'100%',paddingTop:5};var textareastyle={height:'300px'};var defaulttext=this.state.data;var projectsection_toggle_data={isactive:null,projectsection_id:1,activatebutton_text:'retrieving active status...'};console.log(defaulttext);return React.createElement('div',{className:'col-sm-12'},React.createElement('br',null),React.createElement(ProjectsectionToggle,{project_id:this.props.data.project_id,projectsection_toggle_data:projectsection_toggle_data}),React.createElement('form',{onSubmit:this.handleAboutSubmit},React.createElement('textarea',{id:'abouttextarea',className:'form-control',value:defaulttext,style:textareastyle,onChange:this.handleTextareaEntry}),React.createElement('div',{style:submitstyle},React.createElement('a',{onClick:this.submitAboutChange},'Submit'))));}});