
    <div class="col-sm-4" >
        <form id="usersearchfocus">
        <input type="text" class="form-control" placeholder="Search for user..." id="usersearch" data-projectid="{{ $project->project_id }}">
        <ul id="search_results" class="list-group">
        </ul>
        </form>
    </div>


@if ($errors->any())
    <ul class="alert alert-danger">
    @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
    @endforeach
    </ul>
@endif

<script>
$(document).ready(function(){

    $('#usersearch').keyup(function($e){
        var keychar = '';//String.fromCharCode($e.keyCode);
        var val = $('#usersearch').val();
        var input = val + keychar;
        if (val == ''){
            $('#search_results').empty();
        }

        else {
            console.log(input);
            $_token = "<?php echo csrf_token(); ?>";
            $.ajax({
                type: "GET",
                url: "user/ajax/get/search/users",
                //dataType: "text"
                data: {
                    "input": input,
                    //"bannerimage_id": clickedbanner,
                    //"project_id": projectid,
                    _token: $_token
                },
                error: (function () {
                    //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('This photo has already been added.').addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                }),
                success: (function (response) {
                    $('#search_results').empty();
                    $.each(response, function () {
                        var first = (this.user_first_name);
                        var last = (this.user_last_name);
                        var id = (this.user_id);
                        //console.log(first);
                        //console.log(last);
                        $('#search_results').append('<li class="list-group-item searchresult" result tabindex="-1" userid="' + id + '">' + first + ' ' + last + '</li>')
                    });
                    $('#usersearchfocus').focus();
                    //var parsedresponse = response.split(":").split("{").split("}").trim();
                    //console.log(parsedresponse);
                    //$('#search_results').html(parsedresponse);
                    //console.log('%c Banner has been added to project.', 'background: #000000; color: #ffffff;');
                    //$('.returnedbanner[data-bannerid="' + clickedbanner + '"]').remove();
                    //$('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html('Your banner has been added to your project!').addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                })
            });
        }
    });

    $('#usersearch').on('blur', function(event){
        try {
            if (event.relatedTarget.hasAttributes('result')) {
                console.log(event.relatedTarget.getAttribute('userid'));
                var user_id = event.relatedTarget.getAttribute('userid');
                var project_id = $(this).data('projectid');
                console.log('project id is ' + project_id);
                $_token = "<?php echo csrf_token(); ?>";
                $.ajax({
                    type: "POST",
                    url: "user/ajax/post/search/users/addusertoproject",
                    //dataType: "text"
                    data: {
                        "add_user_id": user_id,
                        "project_id": project_id,
                        _token: $_token
                    },
                    error: (function (response) {
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-success', 'alert-info').html('The user could not be added.<br>' + response).addClass('alert-danger').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    }),
                    success: (function (response) {
                        $('#search_results').empty();
                        $('.photohashasnotbeenadded').finish().hide(0).removeClass('alert-danger', 'alert-info').html(response).addClass('alert-success').fadeIn(300).removeClass('hidden').delay(3000).fadeOut(300);
                    })
                });
            }
        }
        catch (error) {
                $('#search_results').empty();
        }
    });



    //$('.searchresult').click(function($e){
        //$e.preventDefault();
      // var id = $(this).data('id');
      //  console.log(id);
    //});

    /*$('#usersearch').keyup(function() {
        //console.log($e.keyCode);
        var input = $('#usersearch').val();
        console.log(input);
        $.ajaxSetup({cache: true});
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: '1618708688367645',
                version: 'v2.3',
                cookie: true
            });
            FB.login(function(response) {
                // handle the response
            }, {
                scope: 'friends',
                return_scopes: true
            });
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    FB.api('/me/friends?q=' + input + '', 'get', function (response) {
                        console.log(response);
                        //var nextlink = response.paging.next;
                        //onefunction(nextlink);
                        //console.log(nextlink);

                        $.each(response.data, function () {

                        });

                    });
                }
                else {
                    alert('You are not logged in.');
                    //FB.login();
                }
            });
        });
    });*/

});

</script>