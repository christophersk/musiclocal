
<link rel="shortcut icon" href="<?php echo asset('favicon.ico'); ?>">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.0/masonry.pkgd.min.js"></script>
    <script src="<?php echo asset('js/imagesloaded.pkgd.min.js'); ?>"></script>
<script src="<?php echo asset('js/js.cookie.js'); ?>"></script>

<link rel="stylesheet" href="<?php echo $css . 'style.css'; ?>">

<script src="<?php echo asset('react/examples/shared/thirdparty/es5-shim.min.js'); ?>"></script>
<script src="<?php echo asset('react/examples/shared/thirdparty/es5-sham.min.js') ?>"></script>
<script src="<?php echo asset('react/examples/shared/thirdparty/console-polyfill.js'); ?>"></script>
<script src="<?php echo asset('react/build/react.js'); ?>"></script>
<script src="<?php echo asset('react/build/JSXTransformer.js'); ?>"></script>
<link href='http://fonts.googleapis.com/css?family=EB+Garamond' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

<script>
    $(document).ready(function() {


         function getUserInfo() {
            FB.api('/me', function (response) {
                        console.log(response);
                    });
        }
    });






</script>

</head>