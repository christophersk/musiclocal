<?php
        use Illuminate\Support\Facades\Auth;
        use Illuminate\Support\Facades\Session;
        use App\Http\Requests;
        use SammyK\FacebookQueryBuilder\FQB;
        use Facebook\Facebook;
        use Facebook\FacebookResponse;

$page = 'user_videos';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
        $projects = Auth::user()->projects->lists('project_name', 'project_url');

?>
<!doctype html>
<html>
@include('includes.section_head')
@include ('includes.head_linkedresources')
        <style>
        .flash {
            display: none;
            position:absolute;
            bottom:50px;
            right:15px;
            z-index:100;
        }

    </style>


<body>
@include ('flash')


<?php echo $user_nav_top; ?>
<?php echo $nav_bottom; ?>

@include ('includes.top-spacer')


@include ('includes.user_title-header')

<?php include($middlespacer); ?>

<?php include($startcontentcontainer); ?>

<div class="col-sm-7">
    @include ('includes.user_videos_add-youtubevideo')
</div>

<div class="col-sm-5">
    @include ('includes.user_videos_youtube')
</div>

</div>
</div>


<?php include($middlespacer); ?>
<?php //include($footer); ?>
<br><br><br><br>



<?php include($scripts); ?>
</body>

<script>

    //$( document ).ready(function() {
        //$.ajax({
            //type: "GET",
            //url: "http://api.bandsintown.com/artists/Chris%20Skene%20Music/events.json",
            //dataType: "xml",
            //contentType: "application/xml",
            //data: "<Category><categoryId>007</categoryId><categoryName>Ajax</categoryName></Category>",
            //success: (function (){

            //})
        //});
    //});

</script>

</html>