﻿
<?php 
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require '../vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;


$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);
$bundle = '';
$category = get("Category");

function get($path){
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}
foreach($category as $k => $v){
            //print_r($v);
            //echo "</br>";
    if(!empty($v['Bundle'])){
        foreach($v['Bundle'] as $key => $value){
            
            $bundle[] = $value;
        }
    }
}
foreach($category as $k => $v){
    if(!empty($v['SubCategory'])){
            
        foreach($v['SubCategory'] as $key => $value){
            
            $subcategory[] = $value;
        }
    }
}
//print_r($bundle);
//die;
?>



<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Seesion | DiveThru Admin </title>
    <!-- Favicon-->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.2.0/min/dropzone.min.js"></script>
    <!-- Bootstrap Core Css -->
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="plugins/node-waves/waves.css" rel="stylesheet" />
    <!-- Sweetalert Css -->
    <link href="plugins/sweetalert/sweetalert.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />
     <link href="plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />
  <!-- JQuery DataTable Css -->
    <link href="plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <!-- Custom Css -->
    <link href="css/style.css" rel="stylesheet">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="css/themes/all-themes.css" rel="stylesheet" />
    <script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
    <script>
        
          // Initialize Firebase
          var config = {
    apiKey: "AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw",
    authDomain: "divethru-71c56.firebaseapp.com",
    databaseURL: "https://divethru-71c56.firebaseio.com",
    projectId: "divethru-71c56",
    storageBucket: "divethru-71c56.appspot.com",
    messagingSenderId: "53159239409"
  };
  /*var config = {
    apiKey: "AIzaSyBwDEs5JfwQNSRKCDMHE9TrVlWArbYG9NU",
    authDomain: "divethrutest.firebaseapp.com",
    databaseURL: "https://divethrutest.firebaseio.com",
    projectId: "divethrutest",
    storageBucket: "divethrutest.appspot.com",
    messagingSenderId: "19401978174"
  };*/
  firebase.initializeApp(config);
        </script>
            
       <script type="text/javascript" src="js/check_login.js"></script>
</head>

<body class="theme-red">
    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="preloader">
                <div class="spinner-layer pl-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p>Please wait...</p>
        </div>
    </div>
    <!-- #END# Page Loader -->
    <!-- Overlay For Sidebars -->
    <div class="overlay"></div>
    <!-- #END# Overlay For Sidebars -->
    <!-- Search Bar -->
    <div class="search-bar">
        <div class="search-icon">
            <i class="material-icons">search</i>
        </div>
        <input type="text" placeholder="START TYPING...">
        <div class="close-search">
            <i class="material-icons">close</i>
        </div>
    </div>
    <!-- #END# Search Bar -->
    <!-- Top Bar -->
    <nav class="navbar">
        <?php include("navbar.php");?>
    </nav>
    <!-- #Top Bar -->
    <section>
        <!-- Left Sidebar -->

        <?php include("sidebar.php");?>
        <!-- #END# Right Sidebar -->
    </section>

    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <h2>Session</h2>
            </div>
            
             <!-- Basic Examples -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Create</h2>
                            <!--<ul class="header-dropdown m-r--5">
                                <li class="dropdown">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li><a href="javascript:void(0);" class=" waves-effect waves-block">Action</a></li>
                                        <li><a href="javascript:void(0);" class=" waves-effect waves-block">Another action</a></li>
                                        <li><a href="javascript:void(0);" class=" waves-effect waves-block">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>-->
                        </div>
                        <div class="body">
                            <form id="form_validation_session"  enctype="multipart/form-data" novalidate="novalidate">
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="text" class="form-control" id="sessionname" name="name" required="" aria-required="true" style="text-transform: capitalize;" aria-invalid="true">
                                        <label class="form-label">Name</label>
                                    </div>
                                    <p style="color:red" id="nm"></p>
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label>-->
                               </div>
                                        
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                       <!-- <label class="form-label">Description</label>
                                        </br>
                                        </br>-->
                                        <textarea name="description" id="ckeditor" cols="30" rows="5" class="form-control no-resize" required="" aria-required="true" placeholder="Desciption"></textarea>
                                    </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label>-->
                                </div>
                                
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Category </label>
                                        <br><br>
                                        <select id="cat" class="form-control show-tick" name="cat">
                                        <?php
                                        if($category){
                                            echo "<option value=''>Select Category</option>";
                                            foreach($category as $c){
                                                echo "<option value=".$c['category_id'].">".$c["category_name"]."</option>";
                                            }
                                        }else{
                                            echo "<option value='0'>Nothing selcted</option>";
                                        }
                                        ?>
                                        </select>
                                        
                                    </div>
                                </div>
                                
                                <div class="form-group form-float sub">
                                    <div class="form-line error">
                                        <label class="form-label">SubCategory</label>
                                        <br>
                                        <select id="subcat" class="form-control show-tick" name="subcat"> 
                                        <?php
                                        if($subcategory){
                                            
                                            foreach($subcategory as $s){
                                    //          echo "<option value=".$s['subcategory_id'].">".$s["subcategory_name"]."</option>";
                                            }
                                        }else{
                                            echo "<option value=''> select SubCategory</option>";
                                        }
                                        ?>
                                        </select>
                                        
                                    </div>
                                </div>
                                
                                <div class="form-group form-float bnd">
                                    <div class="form-line error">
                                        <label class="form-label">Bundle </label>
                                        <br><br>
                                        <select id="bundle" class="form-control show-tick" name="bundle">
                                            

                                        <?php
                                         echo "<option value=''> select Bundle</option>";
                                        // if($bundle){
                                        //     echo "<option value=''> select Bundle</option>";
                                        //     foreach($bundle as $c){
                                        //         echo "<option value=".$c['bundle_id'].">".$c["bundle_name"]."</option>";
                                        //     }
                                        // }
                                        ?>
                                        </select>
                                        
                                    </div>
                                </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label></div>-->
                                
                                
                                
                               <div class="form-group form-float">
                                    <div class="form-line error">
                                    <label class="form-label">Image</label>
                                    </br>
                                    </br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
                                            <div class="dropzone-previews"></div>
                                            <div class="fallback"> <!-- this is the fallback if JS isn't working -->
                                                <input name="session" class="check-image-size form-control " id="sessionimage" type="file" onchange="uplaodsimgfile()" accept="image/*" />
                                                <input type="hidden" id="simgurl">
                                        <!--    </div> -->

                                        
                                    </div>
                                </div>
                            <!--    <div class="form-group form-float">
                                    <div class="form-line error">
                                    <label class="form-label">Outro audio</label>
                                    </br>
                                    </br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
                                            <div class="dropzone-previews"></div>
                                            <div class="fallback"> <!-- this is the fallback if JS isn't working
                                                <input name="file" class="form-control" id="soutro" type="file"  onchange="uploadsfile()" accept="audio/*" />
                                                <input type="hidden" id="surl">
                                            </div> -->

                                        
                            <!--        </div>
                                </div>-->
                               <div class="form-group form-float">
                                    <div class="form-line error ">
                                    <label class="form-label">Meditation audio</label>
                                    </br>
                                    </br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
                                            <div class="dropzone-previews"></div>
                                            <div class="fallback"> <!-- this is the fallback if JS isn't working -->
                                                <input name="meditaion" class="form-control" id="maudio" type="file"  accept="audio/*" style="width:auto;display:inline;"/>
    
                                                <input type="hidden" id="murl">
                                                <input type="hidden" id="mtime">
                                        <!--    </div> -->

                                        
                                    </div>
                                </div>
                                <div class="form-group form-float audio1">
                                    <div class="form-line error ">
                                    <label class="form-label">Meditation audio</label>
                                    </br>
                                    </br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
                                            <div class="dropzone-previews"></div>
                                            <div class="fallback"> <!-- this is the fallback if JS isn't working -->
                                                <input name="meditaion1" class="form-control" id="maudio2" type="file"  accept="audio/*" style="width:auto;display:inline;"/>
    
                                        <!--    </div> -->

                                        
                                    </div>
                                </div>                            
                    <div class="form-group form-float audio2">
                                    <div class="form-line error ">
                                    <label class="form-label">Meditation audio</label>
                                    </br>
                                    </br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
                                            <div class="dropzone-previews"></div>
                                            <div class="fallback"> <!-- this is the fallback if JS isn't working -->
                                                <input name="meditaion2" class="form-control" id="maudio3" type="file"  accept="audio/*" style="width:auto;display:inline;"/>
    
                                        <!--    </div> -->

                                        
                                    </div>
                                </div>
                                
                                
                                    <!--<div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="text" class="form-control" id="subname" name="name" required="" aria-required="true" aria-invalid="true">
                                        <label class="form-label">Subscription Type</label>
                                    </div>-->
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label>-->
                               <!--</div>-->
                             <!--  <label id="password-error" class="error" for="password">This field is required.</label></div>-->
                                <!-- <div class="form-group">
                                    <input type="checkbox" id="checkbox" name="checkbox" aria-required="true">
                                    <label for="checkbox">I have read and accept the terms</label>
                               <label id="checkbox-error" class="error" for="checkbox">This field is required.</label></div>-->
                                <button class="btn btn-primary waves-effect sessionadd" type="submit"><i class="fa fa-spinner fa-spin"></i>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Basic Examples -->
        </div>
    </section>

    <!-- Jquery Core Js -->
    <script src="plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="plugins/node-waves/waves.js"></script>
        <!-- SweetAlert Plugin Js -->
    <script src="plugins/sweetalert/sweetalert.min.js"></script>
    <!-- Jquery DataTable Plugin Js -->
    <script src="plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script> 
         <script src="plugins/ckeditor/ckeditor.js"></script>
         <script src="plugins/ckeditor/plugins/placeholder/plugin.js"></script>
         <script src="plugins/jquery-validation/jquery.validate.js"></script>
         <script src="plugins/jquery-validation/additional-methods.js"></script>
         <script src="js/pages/forms/form-validation.js"></script>

         <script type="text/javascript" src="js/upload.js"></script>
    <!-- Custom Js -->
    <script src="js/admin.js"></script>

<script src="js/jquery.checkImageSize.js"></script>
<script>
$("input[type=file]").checkImageSize();
</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
   
    <script type="text/javascript">
        
            
        $(function () {

            $(".audio2").hide();
            $(".audio1").hide();
            $(".fa-spinner").hide();
            var config = {};
            config.placeholder = 'Description'; 
//CKEDITOR.replace('ckeditor',config);
 //   CKEDITOR.config.height = 300;
    
    $('.js-basic-example').DataTable({
        responsive: true,
        //pagination: true,
    });

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $('select').selectpicker().change(function(){
        $(this).valid()
    });
    $('#maudio').selectpicker().change(function(){
        $(this).valid()
    });
     $('#sessionimage').selectpicker().change(function(){
        $(this).valid()
    });
 $("#cat").change(function(){
        //alert($("#cat option:selected").text());
        var c = $("#cat option:selected").text();
           $('#bundle').empty().append('<option selected="selected" value="">Select bundle</option>');
        var op = "";
        if($("#cat option:selected").text() == 'Deep Dive'){
            //  alert(55);
            $(".sub").show();
            $(".bnd").show();
            $(".audio1").show();
            $(".audio2").show();

        }else if($("#cat option:selected").text() == 'Quick Dive'){
            $(".sub").hide();
            $(".bnd").show();
            $(".audio1").show();
            $(".audio2").show();
        }else{
            $(".sub").hide();
            $(".bnd").hide();
            $(".audio1").hide();
            $(".audio2").hide();
        }
        firebase.database().ref("/Category/"+c).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key
                var key = childSnapshot.key;
                // value, could be object
                var childData = childSnapshot.val();
//console.log(childSnapshot.key);
            /*  childData.forEach(function(child) {
                    
                op += "<option value"+child.subcategory_id+">"+child.subcategory_name+"</option>";
                });*/
                if(childSnapshot.key == 'SubCategory'){
                    var t = Object.values(childData);
                    //console.log(t);
                    op = "<option value=''>Nothing selected</option>";
                    $.map(t, function(value, index) {
                       // console.log(value.subcategory_id);
                        op += "<option value="+value.subcategory_id+">"+value.subcategory_name+"</option>";
                    });
    //  console.log(op);
                        $("#subcat").html(op);
    //   $('.mdb-select').material_select('destroy'); 
                    $('select').selectpicker('refresh');
            }
            if(childSnapshot.key == 'Bundle'){
                //console.log( Object.values(childData));
                var t = Object.values(childData);
                    console.log(t);
                    op = "<option value=''>Nothing selected</option>";
                    $.map(t, function(value, index) {
                       // console.log(value.subcategory_id);
                        op += "<option value="+value.bundle_id+">"+value.bundle_name+"</option>";
                    });
                        $("#bundle").html(op);
                    $('select').selectpicker('refresh');
            }

                // Do what you want with these key/values here*/
            });
        });
    });
    $("form").submit(function(e){
        e.preventDefault();
    });
    
//$(".bnd").hide();
 $.validator.addMethod("regex", function(value, element, regexpr) {          
                 return regexpr.test(value);
               }, "Please enter Only characters");  
    
   $('#form_validation_session').validate({

                rules: {
                    'name': {
                        required: true,
                        minlength: 6,
                        maxlength: 50,
                        //alphanumeric : ture,
                        regex:  /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
                    }, 
                    'description': {
                        required: true
                    }, 
                    'session': {
                        required: true,
                        accept: "image/jpeg, image/png,image/gif"
                    }, 
                    'meditaion': {
                        required: true,
                        accept: "audio/aac, audio/ogg,audio/mp3,audio/mpeg,audio/mpeg3"
                    },
                    'meditaion1': {
                        required: function() {
                              return $("#cat option:selected").text() != 'Open Dive';
                        },
                        accept: "audio/aac, audio/ogg,audio/mp3,audio/mpeg,audio/mpeg3"
                    }, 
                    'meditaion2': {
                        required: function() {
                              return $("#cat option:selected").text() != 'Open Dive';
                        },
                        accept: "audio/aac, audio/ogg,audio/mp3,audio/mpeg,audio/mpeg3"
                    }, 
                    'cat':{
                        required:true
                    },
                    'bundle':{
                         required: function() {
                              return $("#cat option:selected").text() != 'Open Dive';
                        }
                    },
                    'subcat':{
                         required: function() {
                              return $("#cat option:selected").text() == 'Deep Dive';
                        }
                    },
                },
                messages: {
                  name: {
                    required:"Please enter your Session Name",
                    minlength: "Enter name must be at least 6 characters long",
                    maxlength: "Enter name maximum 15 characters allow"
                    },
                  meditaion: {
                    required:"Please Select Any audio",
                    accept: "Select only mp3,ogg,mpeg file formate only!!"
                    },
                  session: {
                    required:"Please Select Any image",
                    accept: "Select only jpeg,png,gif file formate only!!"
                    },
                  description:"Please enter Description",
                  cat:"Please Select category",
                 bundle:"Please Select Bundle",
                  subcat:"Please Select Subcategory",
                    
                  
                },
                highlight: function (input) {
                    $(input).parents('.form-line').addClass('error');
                },
                unhighlight: function (input) {
                    $(input).parents('.form-line').removeClass('error');
                },
                errorPlacement: function (error, element) {
                    $(element).parents('.form-group').append(error);
                },
                submitHandler: function(form) {
                },
                success: function(form){
                                        
                }
                
            });
                
    
    $("#subcat").change(function(){
        
        //alert($("#cat option:selected").text());
        var c = $("#cat option:selected").text();
        var s = $("#subcat option:selected").text();
        var sid = $("#subcat option:selected").val();
        
        var op = "<option selected='selected' value=''>Select bundle</option>";
    /*  if($("#cat option:selected").text() != 'Open Dive'){
            alert(55);
            $(".bnd").show();
        }else{
            $(".bnd").hide();
        }*/
        firebase.database().ref("/Category/"+c).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key
                var key = childSnapshot.key;
                // value, could be object
                var childData = childSnapshot.val();
                //console.log(childData);
            /*  childData.forEach(function(child) {
                    
                op += "<option value"+child.subcategory_id+">"+child.subcategory_name+"</option>";
                });*/
               if(childSnapshot.key == 'SubCategory'){
                    var t = Object.values(childData);
                    var key = Object.keys(childData);
                    $.map(childData, function(value, index) {
                        if(childData.Bundle != '' && index == sid){
                            
                        var B = Object.values(childData);
                        //var Bb = Object.values(B.Bundle);
                    console.log(B);
                            $.map(B, function(value, index) {
                                $.map(value.Bundle, function(value, index) {
                        console.log(value.bundle_category+"=="+s);
                                 if(value.bundle_category == s){
                                     
                                    op += "<option value="+value.bundle_id+">"+value.bundle_name+"</option>";
                                 }   
                                });
                                
                        //op += "<option value="+value.subcategory_id+">"+value.subcategory_name+"</option>";
                            });
                        }
                    });
    //  console.log(op);
    //   $('.mdb-select').material_select('destroy'); 
            }

                // Do what you want with these key/values here*/
            });
        });
          $("#bundle").empty().html(op);
                    $('select').selectpicker('refresh');
    });
   
    
    
    $(".sessionadd").click(function(){
        var temp=$('#form_validation_session').valid();
        if(temp==true){
           
                var catnm = $("#cat option:selected").text();
                var catid = $("#cat").val();
                var scatid = $("#subcat").val();
                    var bundle = $("#bundle").val();
            
            //  alert(bundle);
                //return;
                // var desc = CKEDITOR.instances['ckeditor'].getData();
                 var desc = $('#ckeditor').val();
                 var sessionnm = $("#sessionname").val();
                 var simg = $("#simgurl").val();
            //   var surl = $("#surl").val();
                 var murl = $("#murl").val();
                 var mtime = $("#mtime").val();
                 var subname = $("#subname").val();
                 if(catnm == 'Deep Dive'){
                     var firebaseRef = firebase.database().ref("Category/"+catnm+"/SubCategory/"+scatid+"/Bundle/"+bundle+"/Session");
                 }else if(catnm == 'Quick Dive'){
                     
                    var firebaseRef = firebase.database().ref("Category/"+catnm+"/Bundle/"+bundle+"/Session");
                 }else{
                     
                    var firebaseRef = firebase.database().ref("Category/"+catnm+"/Session");
                 }
                var audio = murl.split(',');
                var audiotime = mtime.split(',');
        //console.log(array);
                //var catRef = firebaseRef.child("category").child(catnm).child("session");

                var pushedCatRef = firebaseRef.push();

                // Get the unique key generated by push()
                var sid = pushedCatRef.key;
       // alert(sid);
                firebaseRef.child(sid).set({
                    session_name: sessionnm,
                    session_description: desc,
                    session_img: simg,
                //  outro_audio: surl,
                    meditation_audio: audio,
                    meditation_audio_time: audiotime,
                    budle_id: bundle,
                    session_id: sid
                });
                if(pushedCatRef){
               
                   swal({
                        title: "Inserted!",
                        text: "Session has been Inserted.",
                        html:true,
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#86CCEB",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    }, function () {
                        window.setTimeout(function() {
                        
                          window.location.href = "session_list.php";
                        }, 1000);
                    });
                    
                }
                //alert(cimg);
                //alert(55);
           
        }
    });
    
});


    </script>
<!--  <script type="text/javascript">
        function Upload() {
            //Get reference of FileUpload.
            var fileUpload = document.getElementById("sessionimage");
         
            //Check whether the file is valid Image.
            var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
            if (regex.test(fileUpload.value.toLowerCase())) {
         
                //Check whether HTML5 is supported.
                if (typeof (fileUpload.files) != "undefined") {
                    //Initiate the FileReader object.
                    var reader = new FileReader();
                    //Read the contents of Image File.
                    reader.readAsDataURL(fileUpload.files[0]);
                    reader.onload = function (e) {
                        //Initiate the JavaScript Image object.
                        var image = new Image();
         
                        //Set the Base64 string return from FileReader as source.
                        image.src = e.target.result;
                               
                        //Validate the File Height and Width.
                        image.onload = function () {
                            var height = this.height;
                            var width = this.width;
                            if (height == 1080 && width == 1920) {
                                alert("Sucess");
                                return false;
                            }
                           alert("fail");
                            return true;
                        };
         
                    }
                } else {
                    //alert("This browser does not support HTML5.");
                    return false;
                }
            } else {
                //alert("Please select a valid Image file.");
                return false;
            }
        }
</script> -->
</body>

</html>