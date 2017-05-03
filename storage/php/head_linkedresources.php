
<link rel="shortcut icon" href="<?php echo asset('favicon.ico'); ?>">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.0/masonry.pkgd.min.js"></script>
    <script src="<?php echo asset('js/imagesloaded.pkgd.min.js'); ?>"></script>
<script src="<?php echo asset('js/js.cookie.js'); ?>"></script>
<script src="<?php echo asset('js/jquery.ui.touch-punch.min.js'); ?>"></script>
<!--<script type="text/javascript" src="<?php echo url('js/sha1.js'); ?>"></script>--> <!--used to generate hmac-sha1 for eventful api-->
<!--<script type="text/javascript" src="http://api.eventful.com/js/api"></script>-->
<link rel="stylesheet" href="<?php echo elixir('css/all.css'); ?>">
<!--
<script src="<?php echo asset('react/examples/shared/thirdparty/es5-shim.min.js'); ?>"></script>
<script src="<?php echo asset('react/examples/shared/thirdparty/es5-sham.min.js') ?>"></script>
<script src="<?php echo asset('react/examples/shared/thirdparty/console-polyfill.js'); ?>"></script>
-->
<script src="<?php echo env('PROJECT_URL') . 'react/react-0_14_7/build/react-with-addons.js'; ?>"></script>
<script src="<?php echo env('PROJECT_URL') . 'react/react-0_14_7/build/react-dom.js'; ?>"></script>

<script src="<?php echo elixir('js/all.js'); ?>"></script>


<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/camanjs/4.0.0/caman.full.min.js"></script>
<script src="//cdn.ckeditor.com/4.5.1/standard/ckeditor.js"></script>

<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,400%7CPoiret+One:400%7CRoboto:300,500%7CRoboto+Condensed:300,500%7CRaleway:300,400,500' rel='stylesheet' type='text/css'>

<style>

body {
    background-color: #c7c7c7;
}

.fixed {
    position:fixed;
}

        .header_text_container {
            white-space: nowrap;
            margin-left: auto;
            margin-right: auto;
            clear:both;
        }
        .bannerheadline_style_1_h1 {
            text-align: center;
            clear:both;
        }
        .thin_column_padding {
            padding-right:7px;
            padding-left:7px;
        }
        .leftbutton {
            padding-right:0px;
        }
        .middlebutton {
            padding-left:0px;
            padding-right:0px;
        }

        .projectnameheader2 {
            color:#333333;
            text-shadow: 4px 4px 10px rgba(51,51,51,1),1px 1px 3px rgba(51,51,51,.8);/*, 1px 0px 0px rgba(51,51,51,1), -1px 0px 0px rgba(51,51,51,1), 0px 1px 0px rgba(51,51,51,1), 0px -1px 0px rgba(51,51,51,1);*/
            font-family: 'Poiret One', serif;
            font-weight: 300;
        }
        .projecttaglineheader {
            color:#333333;
            text-shadow: 4px 4px 10px rgba(51,51,51,1),1px 1px 3px rgba(51,51,51,1);
            font-family: 'Poiret One', sans-serif;
            font-weight: 300;
            letter-spacing:.4px;
        }
        .project-top-navbar-link-glow {
            font-family: 'Roboto', sans-serif;
            font-size: 120%;
            font-weight:300;
            letter-spacing:.4px;
            /*text-shadow: 1px 0px 0px rgba(51, 155, 183,.4), -1px 0px 0px rgba(51, 155, 183,.4), 0px 1px 0px rgba(51, 155, 183,.4), 0px -1px 0px rgba(51, 155, 183,.4);*/
        }

        .titlebackground {
background: rgba(255,255,255,0);
background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,255,255,0)), color-stop(50%, rgba(255,255,255,1)), color-stop(100%, rgba(255,255,255,0)));
background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
background: -o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=1 );
        }

        .border-radius-all {
            border-radius:30px;
        }

        .border-radius-bottom {
            border-bottom-left-radius:30px;
            border-bottom-right-radius:30px;
        }

        .verticalcenterchild {
            padding-top:15px;
        }
    </style>
</head>