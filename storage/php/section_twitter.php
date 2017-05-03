<?php
if ($project->twitterwidget === null){
$projecttwitterwidgetpath = '';
}
else {


    $projecttwitterwidgetpath = $project->twitterwidget->twitterwidget_path;
$twitterwidget = <<<EOD
<div id="twittertop" style="overflow:hidden; height:0px;">
    <script>

    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

    </script>
    <script>$(document).ready(function(){
    localStorage.setItem("twitterwidgetpath", "$projecttwitterwidgetpath");
    var adjusttwitterwidgetheight = function(){
            var toptwitterposition2 = $('#twittertop').position().top;
            var contentbottom2 = $('#contentbottom').position().top;
            var twitterspacing2 = contentbottom2 - toptwitterposition2;
            $('#twittertop').animate({height: twitterspacing2}, 500, function(){});
    };

    setInterval(adjusttwitterwidgetheight, 1000);

    $('#twitterload').on("change", function(){
        $('iframe').load(function(){
            var toptwitterposition2 = $('#twittertop').position().top;
            var contentbottom2 = $('#contentbottom').position().top;
            var twitterspacing2 = contentbottom2 - toptwitterposition2;
            $('#twittertop').animate({height: twitterspacing2}, 500, function(){});
        });
    });

    $('iframe').load(function(){
            var toptwitterposition2 = $('#twittertop').position().top;

            var contentbottom2 = $('#contentbottom').position().top;
            var twitterspacing2 = contentbottom2 - toptwitterposition2;
            $('#twittertop').animate({height: twitterspacing2}, 500, function(){});
    });

    });
    </script>
    <div><h3>Twitter</h3><a id="twitterload" class="twitter-timeline" href="https://twitter.com/' . $projecttwitterwidgetpath . '" height="1500" data-widget-id="628641187486920704" data-theme="dark" data-chrome="transparent noborders noscrollbar nofooter noheader">Tweets by @$projecttwitterwidgetpath</a></div>
</div>
EOD;

    echo $twitterwidget;

}
?>
