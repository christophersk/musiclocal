<?php
if ($project->facebookwidget === null){}
else {
$projectfacebookwidgetpath = $project->facebookwidget->facebookwidget_path;

$facebookwidget = <<<EOD
<script>
$(window).load(function(){

$('#facebookdiv').html('<h3>Facebook</h3><div id="fbwidgetdiv" class="fb-page" data-href="https://www.facebook.com/$projectfacebookwidgetpath" data-height="280" data-width="340" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"></div>');
var fbfunction = function(){}
var setwidgetwidth = $('#facebookdiv').width();
$('#fbwidgetdiv').attr("data-width", setwidgetwidth);

function setfbiframewidth(){
    var setwidgetwidth = $('#facebookdiv').width();
    $('#fbwidgetdiv').attr("data-width", setwidgetwidth);
}

fbfunction(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

});
</script>
<div style="position:relative;">
<div id="facebook" style="position:absolute;top:-30px;"></div>
</div>
<div id="facebookdiv" style="width:100%;display:inline-block;overflow:hidden;align-items:center;padding-top:3%;">

</div>
EOD;

    echo $facebookwidget;

}

?>