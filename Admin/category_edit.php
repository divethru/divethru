
<?php
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require '../vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
$id = $_POST["id"];
//echo $id;
//die;
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$category = getsingle("/Category/".$id);
/*
function get($path){
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}*/

function getsingle($path){
    //echo $path;
    //die;
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;

}
//print_r($category);
//die;

?>



<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Blank Page | Bootstrap Based Admin Template - Material Design</title>
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
        <script src="js/check_login.js "></script>
            <script type="text/javascript" src="../register_user.js"></script>
<!--            <script type="text/javascript" src="../js/dashboard.js"></script>-->
<style type="text/css">
    .flex-style{
 display: flex;
}

.input-file{
 opacity: 0;
 margin-left: -40px;
 width: 40px;
 height: 45px;
}

.icon{
 width: 48px;
 height: 45px;
 background:url(images/upload-black.png); 
}
</style>
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
                <h2>Category</h2>
            </div>
            
             <!-- Basic Examples -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Edit</h2>
                        </div>
                        <div class="body">
                            <form id="form_validation_cat"  novalidate="novalidate">
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="hidden" id="c" value="<?php echo  $category['category_name'];?>">
                                        <input type="hidden" id="cid" value="<?php echo  $category['category_id'];?>">
                                        <input type="text" class="form-control" id="catname" name="name" value="<?php echo $category['category_name'];?>" required="" aria-required="true" aria-invalid="true">
                                        <label class="form-label">Name</label>
                                    </div>
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label></div>-->
                                </br>
                                    </div>  
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Description</label>
                                        </br>
                                        </br>
                                        <textarea name="description" id="ckeditor" cols="30" rows="5" class="form-control no-resize" required="" aria-required="true" placeholder="Desciption"><?php echo $category["category_description"];?></textarea>
                                    </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label></div>-->
                                </br>
                                    </div>  
                               <div class="form-group form-float">
                                    <div class="form-line error">
                                         <label class="form-label">Image</label>
                                         </br>
                                        </br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
                                            <div class="dropzone-previews"></div>
                                            <div class="fallback"> <!-- this is the fallback if JS isn't working -->
                                                <div class='flex-style'>
                                                <div class='icon'></div>
                                                <input name="file" class="check-image-size input-file" id="catimage" type="file" onchange="uplaodfile()" accept="image/*" />
                                                </div>
                                                <br>
                                                <img src="<?php echo $category["category_img"];?>" id="oldimg" width="50" height="50">
                                                <input type="hidden" id="imgurl">
                                        <!--    </div> -->

                                        <!-- </form> -->
                                    </div>
                                </div>
                                    </br>
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Subscription Type</label>
                                        <?php $scat= trim($category['session_subcription_type']); ?>
                                        <br><br>
                                        <select id="subname" class="form-control show-tick" name="subname">
                                        <?php
                                           
                                            if($category){
                                              
                                                
                                                   if($scat=='Free'){
                                                       
                                                        echo "<option value='Free' selected>Free</option>";
                                                        echo "<option value='Paid' >Paid</option>";

                                                    }else{
                                                        
                                                     echo "<option value='Paid' selected>Paid</option>";
                                                        echo "<option value='Free' >Free</option>";
                                                    }
                                               
                                            }else{
                                                echo "<option value=''>Nothing selcted</option>";
                                            }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                             <!--  <label id="password-error" class="error" for="password">This field is required.</label></div>-->
                                <!-- <div class="form-group">
                                    <input type="checkbox" id="checkbox" name="checkbox" aria-required="true">
                                    <label for="checkbox">I have read and accept the terms</label>
                               <label id="checkbox-error" class="error" for="checkbox">This field is required.</label></div>-->
                                <button class="btn btn-primary waves-effect catadd" type="submit">SUBMIT</button>
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
         <!-- <script src="js/pages/forms/form-validation.js"></script> -->

    <!-- Custom Js -->
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
    <script src="js/admin.js"></script>
<script type="text/javascript" src="js/upload.js"></script>
    <!-- Demo Js -->
    <script src="js/demo.js"></script>
    <script type="text/javascript">
        
            function del(key){
                
            //var ref = firebase.database().ref('Users');
            /*var user_id = key;
            var ref = firebase.database().ref().child('/category/' + user_id).remove();
            if(ref){
                
                        alert('This User Deleted Sucessfully');
            }
            window.location.reload();*/
        }
        
        $(function () {
            //var config = {};
            //config.placeholder = 'Description'; 
//CKEDITOR.replace('ckeditor',config);
  //  CKEDITOR.config.height = 300;
    
    $('.js-basic-example').DataTable({
        responsive: true,
        //pagination: true,
    });
    $("form").submit(function(e){
        e.preventDefault();
    });

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
    $.validator.addMethod("regex", function(value, element, regexpr) {          
                 return regexpr.test(value);
               }, "Please enter Only characters"); 
    $(".catadd").click(function(){

        $('#form_validation_cat').validate({
        rules: {
            'name': {
                required: true,
                minlength: 6,
                maxlength: 15,
                regex:  /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
            }, 
            'description': {
                required: true
            }, 
            'catimage': {
                required: true,
                accept: "image/jpeg, image/png,image/gif"
            }, 
            'subname':{
                required:true
            }
            
        },
        messages: {
          name: {
            required:"Please enter your Category Name",
            minlength: "Enter name must be at least 6 characters long",
            maxlength: "Enter name maximum 15 characters allow"
            },
          catimage: {
            required:"Please Select Any image",
            accept: "Select only jpeg,png,gif file formate only!!"
            },
            description:"Please enter Description",
            subname:"Please enter subscribe name"
          
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
         //var desc = CKEDITOR.instances['ckeditor'].getData();
         var desc = $('#ckeditor').val();
         var catnm = $("#catname").val();
         var subname = $("#subname").val();
         if($("#imgurl").val()){
             
             var cimg = $("#imgurl").val();
         }else{
            var cimg = $("#oldimg").attr("src");
             
         }
         
         var cid = $("#cid").val();
         var oldc = $("#c").val();
         var data = {
             category_name: catnm,
            category_description: desc,
            category_img: cimg,
            category_id: cid,
            session_subcription_type:subname
         };
        // alert($('#ckeditor').val());
         
         
    
 
    //   var updates = {};
 // updates['/Category/' + catnm] = data;
    //var firebaseRef = firebase.database().ref();

//      var catRef = firebaseRef.child("category");
    //firebase.database().ref().update(updates);
    /*
        var pushedCatRef = catRef.push();

        // Get the unique key generated by push()
        var catId = pushedCatRef.key;

        pushedCatRef.set({
           category_name: catnm,
            category_description: desc,
            category_img: cimg,
            category_id: catId
        });
        //alert(cimg);*/
    
        var booksRef = firebase.database().ref('Category');
       
        booksRef.child(oldc).once('value').then(function(snap) {
     var desc = $('#ckeditor').val();
         var catnm = $("#catname").val();
         if($("#imgurl").val()){
             
             var cimg = $("#imgurl").val();
         }else{
            var cimg = $("#oldimg").attr("src");
             
         }
         var cid = $("#cid").val();
         var oldc = $("#c").val();
         
          var data = snap.val();
          data.category_name = catnm;
          data.category_description = desc;
          data.category_img = cimg;
          data.category_id = cid;
          data.session_subcription_type=subname;
          var update = {};
          update[oldc] = null;
          update[oldc] = data;
          
          return booksRef.update(update);
        

        });
        swal({
                    title: "Updated!",
                    text: "Category has been Updated.",
                    html:true,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#86CCEB",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                }, function () {
                    
                      window.location.href = "category_list.php";
                });

            // booksRef.on("child_changed", function(data) {
               
            // });
    
        }
    });
});
    
});
    </script>
</body>

</html>