<?php
        use Illuminate\Support\Facades\Auth;
        use Illuminate\Support\Collection;
        use Illuminate\Support\Facades\Session;
        use App\Http\Requests;
        use SammyK\FacebookQueryBuilder\FQB;
        use Facebook\Facebook;
        use Facebook\FacebookResponse;

$page = 'user_schedule';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);
require_once($user_navbar_top);
require_once($navbar_bottom);
        $projects = Auth::user()->projects;
        $projectusers = Collection::make();
        foreach ($projects as $project){
            $projectuser = $project->users;
            $projectusers->push($projectuser);
        }
        //dd($projectusers);
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

<div class="col-sm-12">
@include ('includes.user_create-event')
</div>

</div>
</div>


<?php include($middlespacer); ?>
<?php //include($footer); ?>
<br><br><br><br>



<?php include($scripts); ?>
</body>
</html>