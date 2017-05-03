<?php
$page = 'MusicLocalPhotoalbum';
$pathinfo = storage_path('php/pathinfo.php');
require_once($pathinfo);



?>

<!doctype html>
<html>

<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="description" content="">
<meta name="keywords" content="">
<meta name="author" content="MusicLocal">

<title>MusicLocal</title>


<link rel="shortcut icon" href="<?php echo asset('favicon.ico'); ?>">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.0/masonry.pkgd.min.js"></script>
    <script src="<?php echo asset('js/imagesloaded.pkgd.min.js'); ?>"></script>
<script src="<?php echo asset('js/js.cookie.js'); ?>"></script>
<script src="<?php echo asset('js/jquery.ui.touch-punch.min.js'); ?>"></script>
<link rel="stylesheet" href="<?php echo $css . 'style.css'; ?>">

<script src="<?php echo asset('react/examples/shared/thirdparty/es5-shim.min.js'); ?>"></script>
<script src="<?php echo asset('react/examples/shared/thirdparty/es5-sham.min.js') ?>"></script>
<script src="<?php echo asset('react/examples/shared/thirdparty/console-polyfill.js'); ?>"></script>
<script src="https://fb.me/react-0.13.3.js"></script>
<script src="<?php echo asset('react/build/JSXTransformer.js'); ?>"></script>
<link href='http://fonts.googleapis.com/css?family=EB+Garamond' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,400' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Roboto:400,400italic,300italic,500,500italic,700,700italic,900,900italic,300,100italic,100' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400italic,700italic,400,700' rel='stylesheet' type='text/css'>

</head>


<body style="padding:0px;overflow-x:hidden;background:transparent;">
<div style="padding-left:2%;padding-right:2%">
<div id="datadiv" data-photoalbumid="<?php echo $photoalbum_id; ?>"></div>
<?php //include($startcontentcontainer); ?>

<div id="testcontainer4">
<?php //include($endcontentcontainer); ?>
</div>
</body>
<script src="<?php echo url('js/musiclocal_embeddedphotoalbum.js'); ?>"></script>
</html>