<?php
$page = 'MusicLocalPhotoalbum';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);



?>

<!doctype html>
<html>

<?php include($head); ?>
<?php include($head_linkedresources); ?>

<body style="padding:0px;overflow-x:hidden;">
<div style="padding-left:2%;padding-right:2%">
<div id="datadiv" data-photoalbumid="<?php echo $photoalbum_id; ?>"></div>
<?php //include($startcontentcontainer); ?>

<div id="testcontainer4">
<?php //include($endcontentcontainer); ?>
</div>
</body>
<script src="<?php echo url('js/musiclocal_manage_photoalbum.js'); ?>"></script>
<script>$_token = "<?php echo csrf_token(); ?>";</script>
</html>
