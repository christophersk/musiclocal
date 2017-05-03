"use strict";var CreateProjectContainer=React.createClass({displayName:"CreateProjectContainer",getInitialState:function getInitialState(){return {project_name:[],project_url:[],location_id:2,project_type:2};},componentDidMount:function componentDidMount(){ /*
        var projectid = $('#projectinfo').data('projectid');
        $.ajax({
            type: 'GET',
            url: '/user/projects/social/get',
            data: {
                project_id: projectid,
                _token: $_token
            },
            error: {

            },
            success: (function(response) {
                var parsedresponse = JSON.parse(response);
                //var uniqueresponse = parsedresponse.uniquevideos;
                //var projectresponse = parsedresponse.projectvideos;
                //console.log(foo.uniquebannerimages);
                var facebookpageurl = 'https://www.facebook.com/' + parsedresponse.facebook;
                var twitterurl = 'https://twitter.com/' + parsedresponse.twitter;
                this.setState({facebook: facebookpageurl, twitter: twitterurl});
            }.bind(this))
        });
        */},submitCreateNewProject:function submitCreateNewProject(){var projectname=this.state.project_name;var projecturl=this.state.project_url;var projectlocation=this.state.location_id;var projecttype=this.state.project_type;$.ajax({type:"POST",url:"/user/projects/create",data:{"project_name":projectname,"project_url":projecturl,"project_type":projecttype,"location_id":projectlocation,_token:$_token},error:function error(){$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success','alert-info').html('There was an error').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);},success:(function(response){console.log(response);$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger','alert-info').html('Your information has been updated successfully.').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);location.reload();alert('Your project has been created.');}).bind(this)});},componentWillUnmount:function componentWillUnmount(){$("projectschildcontainer").html('').removeClass("active");},handleProjectNameTextEntry:function handleProjectNameTextEntry(event){this.setState({project_name:event.target.value});},handleProjectURLTextEntry:function handleProjectURLTextEntry(event){this.setState({project_url:event.target.value});},render:function render(){var submitstyle={textAlign:'center',width:'100%',paddingTop:5};var projectnamedefaulttext=this.state.project_name;var projecturldefaulttext=this.state.project_url;var paddiv={padding:8};return React.createElement("div",{className:"col-sm-12"},React.createElement("form",{className:"form-horizontal"},React.createElement("div",{className:"form-group"},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:"projectnametextinput"},"Project Name:"),React.createElement("div",{className:"col-sm-9"},React.createElement("input",{type:"text",id:"projectnametextinput",className:"form-control",value:projectnamedefaulttext,onChange:this.handleProjectNameTextEntry}))),React.createElement("div",{className:"form-group"},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:"projecturltextinput"},"Project URL:"),React.createElement("div",{className:"col-sm-9"},React.createElement("input",{type:"text",id:"projecturltextinput",className:"form-control",value:projecturldefaulttext,onChange:this.handleProjectURLTextEntry}))),React.createElement("div",{style:submitstyle},React.createElement("a",{onClick:this.submitCreateNewProject},"Create Project"))));}});