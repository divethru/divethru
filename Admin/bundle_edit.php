<?php 
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require '../vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);
$id = $_POST['id'];
$subcat = $_POST['subcat'];
$cat = $_POST['cat'];
//print_r($_POST);
if($subcat != '0' && $id != '0' ){
    
    $bundle = getsingle("Category/".$cat."/SubCategory/".$subcat."/Bundle/".$id);
}else if($id != '0' && $subcat == '0' ){
    
    $bundle = getsingle("Category/".$cat."/Bundle/".$id);
    
}
//echo $bundle['bundle_name'];
//print_r($bundle['bundle_img']);
//die;

$category = get("Category");
$product = get("InAppProducts");
foreach($product as $in => $v){
    if($in == $id){
    $active = $v['active'];
    $productid = $v['product_id'];
    $type = $v['type'];
    $bundle_id = $v['bundle_id'];
    }
}

//$subcategory = get("subcategory");

function get($path){
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}
function getsingle($path){
//  echo $path;
    //die;
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;

}


foreach($category as $k => $v){
    
            $catnm[] = $v['category_name'];
    if($v['SubCategory'] != ''){
        foreach($v['SubCategory'] as $key => $value){
            
            $subcategory[] = $value;
        }
    }
}
    //print_r($catnm);
//die;

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
 /* var config = {
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
                <h2>Bundle</h2>
            </div>
            
             <!-- Basic Examples -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Edit</h2>
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
                            <form id="form_validation_bundle"  novalidate="novalidate">
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="hidden" id="bid" value="<?php echo $id;?>">
                                        <input type="hidden" id="subid" value="<?php echo $subcat;?>">
                                        <input type="hidden" id="catid" value="<?php echo $cat;?>">
                                        <input type="text" class="form-control" id="bundlename" name="name" required="" aria-required="true" aria-invalid="true" value="<?php echo $bundle['bundle_name'];?>">
                                        <label class="form-label">Name</label>
                                    </div>
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label>-->
                               </div>
                                        
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <!--<label class="form-label">Description</label>
                                        </br>
                                        </br>-->
                                        <textarea name="description" id="ckeditor" cols="30" rows="5" class="form-control no-resize" required="" aria-required="true" placeholder="Desciption"><?php echo $bundle['bundle_description'];?></textarea>
                                    </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label>-->
                                </div>
                                
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Category</label>
                                        <br>
                                        <select id="cat" class="form-control show-tick" name="cat">
                                        <?php
                                        if($category){
                                            //echo "<option value='0'>Nothing selcted</option>";
                                            foreach($category as $c){
                                                if($c["category_name"] == $cat && $c['session_subcription_type'] != "Free" ){
                                                echo "<option value=".$c['category_id']." selected>".$c["category_name"]."</option>";
                                                    
                                                }else{
                                                    
                                                echo "<option value=".$c['category_id'].">".$c["category_name"]."</option>";
                                                }
                                            }
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
                                                if($s['subcategory_id'] == $subcat){
                                                    
                                                echo "<option value=".$s['subcategory_id']." selected>".$s["subcategory_name"]."</option>";
                                                }else{
                                                    
                                                echo "<option value=".$s['subcategory_id'].">".$s["subcategory_name"]."</option>";
                                                }
                                            }
                                        }else{
                                            echo "<option value='0'>Nothing selcted</option>";
                                        }
                                        ?>
                                        </select>
                                        
                                    </div>
                                </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label></div>-->
                                
                                
                                
                               <div class="form-group form-float">
                                    <div class="form-line error">
                                    <label class="form-label">Image (1920 X 1080)</label>
                                    </br>
                                    </br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
                                            <div class="dropzone-previews"></div>
                                            <div class="fallback"> <!-- this is the fallback if JS isn't working -->
                                                <div class='flex-style'>
                                                <div class='icon'></div>
                                                <input name="bundle" class="check-image-size form-control input-file" id="bundleimage" type="file" onchange="uplaodbimgfile()" accept="image/*" />
                                                </div>
                                                <br>
                                                <img src="<?php echo $bundle['bundle_img']?>" id="oldbimg" width="50" height="50">
                                                <input type="hidden" id="bimgurl">
                                        <!--    </div> -->

                                        
                                    </div>
                                </div>
                                <!----  This is for In app purchase section ---->

                                   <div class="form-group form-float ">
                                    <div class="form-line error " style="display:inline-flex;">
                                    <?php if($bundle_id != '') {
                                        echo '<input type="checkbox" id="checkbox" data-bid="'.$bundle_id.'" class="inapp" name="checkbox" checked>';
                                    }else {
                                        echo '<input type="checkbox" id="checkbox" class="inapp" name="checkbox">';
                                    }?>
                                    <label for="checkbox" style="width:200px;">In App Product</label>
                                        <div class="form-group inappdetails" style="margin-bottom:0px;">    
                                                <label for="productid">Product ID : </label>
                                            <input type="text" name="productid" id="productid" class="with-gap " placeholder="Product Id" style="border:none;" value="<?php echo $productid; ?>">
                                            <label for="active">Active</label>
                                            <?php if($active == 1) {
                                                echo '<div class="switch" style="display:initial;"><label><input type="checkbox" name="active" id="active" checked><span class="lever"></span></label></div>';
                                            // echo '<input type="checkbox" name="active" id="active" class="with-gap " checked>';
                                            } else {
                                            echo '<div class="switch" style="display:initial;"><label><input type="checkbox" id="active" name="active" ><span class="lever"></span></label></div>';
                                             }?>
                                                
                                        </div>
                                        
                                    </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label>-->
                                </div> 

                                <button class="btn btn-primary waves-effect bundledit" type="submit">SUBMIT</button>
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

    <!-- Demo Js -->
    <script src="js/demo.js"></script>
    <script type="text/javascript">
        
            function del(key){
                
            //var ref = firebase.database().ref('Users');
            var id = key;
            var ref = firebase.database().ref().child('/bundle/' + id).remove();
            if(ref){
                
                        alert('This Bundle Deleted Sucessfully');
            }
            window.location.reload();
        }
        
        $(function () {
        $('select').find('[value=-L5rdHisF3pTm9dRvf6Y]').remove(); 
        $('select').selectpicker('refresh');    
            
        //  var config = {};
            //config.placeholder = 'Description'; 
//CKEDITOR.replace('ckeditor',config);
  //  CKEDITOR.config.height = 300;
    
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
    //alert($("#cat").val());
    if($("#cat option:selected").text() != 'Deep Dives'){
            $(".sub").hide();
            
        }else{
            $(".sub").show();
            
        }
        if($('.inapp').is(':checked')){
            window.flag = true;
            $(".inappdetails").show();
        }else{
            $(".inappdetails").hide();
            window.flag = false;
        }

     $(".inapp").click(function(){
        var id= $(this).data("bid");
        if($(this).is(':checked')){
           // window.flag = true;
            $(".inappdetails").show();
        }else{
            //window.flag = false;

            $(".inappdetails").hide();

        }
     });   
   // alert(window.flag);
    $("#cat").change(function(){
        //alert(55);.
        var op ='';
        var c = $("#cat option:selected").text();
        
        /* Code for hide and show subcategory according to category */
        if($("#cat option:selected").text() != 'Deep Dive'){
            $(".sub").hide();
            
        }else{
            $(".sub").show();
            
        }
        
        /* Code For disable bundle in  open dive */
        if(c == 'Open Dive'){
            $(".bundleadd").attr("disabled","disabled");
            alert("You can't enter bundle for this catgeory");
             
        }else{
            $(".bundleadd").removeAttr("disabled");
        }
        
        /* Code for append sub catgeory according to catgoery */
        
        firebase.database().ref("/Category/"+c).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key
                var key = childSnapshot.key;
                // value, could be object
                var childData = childSnapshot.val();
                //console.log(childData);
            
                if(childSnapshot.key == 'subcategory'){
                    var t = Object.values(childData);
                    console.log(t);
                    $.map(t, function(value, index) {
                       // console.log(value.subcategory_id);
                        op += "<option value="+value.subcategory_id+">"+value.subcategory_name+"</option>";
                    });
    
                        $("#subcat").find('option').remove().end().append(op)
    
                    $('select').selectpicker('refresh');
            }

                // Do what you want with these key/values here*/
            });
        });
    });

    
    
    $("form").submit(function(e){
        e.preventDefault();
    });
    
    $.validator.addMethod("regex", function(value, element, regexpr) {          
                 return regexpr.test(value);
               }, "Please enter Only characters");
    $(".bundledit").click(function(){
        $('#form_validation_bundle').validate({
                rules: {
                    'name': {
                        required: true,
                        minlength: 6,
                        maxlength: 50,
                        regex:  /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
                    }, 
                    'description': {
                        required: true
                    }, 
                    'cat':{
                        required:true
                    },
                    'bundle': {
                      
                        accept: "image/jpeg, image/png,image/gif"
                    },
                    'productid':{
                        required: function() {
                               return $(".inapp").is(':checked');
                               
                        }
                    },
                   
                    
                },
                messages: {
                  name: {
                    required:"Please enter your Bundle Name",
                    minlength: "Enter name must be at least 6 characters long",
                    maxlength: "Enter name maximum 50 characters allow"
                    },
                     description:"Please enter Description",
                    cat:"Please Select category",
                  bundle: {
                    
                    accept: "Select only jpeg,png,gif file formate only!!"
                    },
                productid: "Please Enter Product Id", 
                  
                  
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

                var bid = $("#bid").val();
                var ocat = $("#catid").val();
                var cat = $("#cat").val();
                var catnm = $("#cat option:selected").text();
                
                var subcatnm = $("#subcat option:selected").text();
                 var desc = $('#ckeditor').val();
                 var bundlename = $("#bundlename").val();
                 if($("#bimgurl").val()){
                 var bimg = $("#bimgurl").val();
                     
                 }else{
                 var bimg = $("#oldbimg").attr('src');
                     
                 }
                 
                 
                 /* if($("#cat option:selected").text() != $("#catid").val()){
                     alert("new");
                     
                     if($("#cat option:selected").text() == 'Deep Dive'){
                            
                        var subcatnm = $("#subcat option:selected").text();
                        var subcat = $("#subcat").val();
                        alert('/Category/Deep Dive/SubCategory/'+subcat+'/Bundle/'+ bid);
                            firebase.database().ref().child('/Category/Quick Dive/Bundle/'+bid).remove();
                                var firebaseRef = firebase.database().ref("Category/"+catnm+"/SubCategory/"+subcat+"/Bundle");
                            //  var f = "category/"+catnm+"/subcategory/"+subcat+"/bundle";
                    }else  if($("#cat option:selected").text() == 'Quick Dive'){
                            var subcat = '';
                            var subcatnm = '';
                        var s = $("#subcat").val();
                            
                            firebase.database().ref().child('/Category/Deep Dive/SubCategory/'+s+'/Bundle/'+ bid).remove();
                            var firebaseRef = firebase.database().ref("Category/"+catnm+"/Bundle");
                        //  var f = "category/"+catnm+"/bundle";
                    }
                    
                    var pushedCatRef = firebaseRef.push();

                        // Get the unique key generated by push()
                        var bid = pushedCatRef.key;

                        firebaseRef.child(bid).set({
                            bundle_name: bundlename,
                            bundle_description: desc,
                            bundle_parent_category: cat,
                            bundle_category: subcatnm,
                            bundle_img: bimg,
                            bundle_id: bid,
                            Session: ''
                        });*/
                    
                     
                /* }else{
                     alert('old');
                 }*/
                 
                 
                 
                if(ocat == 'Deep Dive'){
                var subcat = $("#subid").val();
                    var booksRef = firebase.database().ref('Category/'+ocat+'/SubCategory/'+subcat+'/Bundle/');
                    console.log('Category/'+catnm+'/SubCategory/'+subcat+'/Bundle/');
                        
                    console.log('Category/Quick Dive/Bundle/');
                    //  var f = "category/"+catnm+"/subcategory/"+subcat+"/bundle";
                }else{
                    var subcat = '';
                    var booksRef = firebase.database().ref('Category/Quick Dive/Bundle/');
                    console.log('Category/Quick Dive/Bundle/');
                    //var firebaseRef = firebase.database().ref("Category/"+catnm+"/Bundle");
                //  var f = "category/"+catnm+"/bundle";
                }
            
                var inapp = firebase.database().ref('InAppProducts');
                     var productid = $("#productid").val();
                    if($("#active").is(':checked')){
                        
                    var active = true;
                    }else{
                    var active = false;
                        
                    }
                
                booksRef.child(bid).once('value').then(function(snap) {
                            var bid = $("#bid").val();
                            var cat = $("#cat").val();
                            var catnm = $("#cat option:selected").text();
                            if(catnm != "Deep Dive"){
                            var subcatnm = "";
                                
                            }else{
                                
                            var subcatnm = $("#subcat option:selected").text();
                            }
                            var desc = $('#ckeditor').val();
                            var bundlename = $("#bundlename").val();
                             if($("#bimgurl").val()){
                             var bimg = $("#bimgurl").val();
                                 
                             }else{
                             var bimg = $("#oldbimg").attr('src');
                                 
                             }
 
                             var subcat = $("#subcat option:selected").val();
                             var data = snap.val();
                             //alert(bid);
                             //var pcat = $("#pcat").val();
                        //  var olds = $("#olds").val();
                 
                 //var cid = $("#cid").val();
                // var oldc = $("#c").val();
                         
                          var update = {};
                          update[bid] = null;
                           if($("#cat option:selected").text() != $("#catid").val()){
                                             if($("#cat option:selected").text() == 'Deep Dive'){
                                                //firebase.database().ref().child('/Category/Quick Dive/Bundle/'+bid).remove();
                                                var firebaseRef = firebase.database().ref("Category/"+catnm+"/SubCategory/"+subcat+"/Bundle");
                                             }else if($("#cat option:selected").text() == 'Quick Dive'){
                                                var subcatnm = '';
                                                var s = $("#subcat").val();
                                               // var catnm = catnm.replace(/\s/g, '');
                                            //  firebase.database().ref().child('/Category/Deep Dive/SubCategory/'+s+'/Bundle/'+ bid).remove();
                                                var firebaseRef = firebase.database().ref("Category/"+catnm+"/Bundle");
                                             }
                                            var pushedCatRef = firebaseRef.push();

                                    // Get the unique key generated by push()
                                    var bnid = pushedCatRef.key;
                               //alert(subcatnm);
                                if(data.Session){
                                    var s = data.Session
                                }else{
                                    var s = '';
                                }
                                window.id = bnid;
                                var inappdata = {'product_id':productid,'bundle_id':bnid,'type':"Bundle",'active':active}; 
                                /*if($('.inapp').is(':checked')){
                                inapp.child(bnid).update(inappdata);

                                }else{
                                var inappdata = {'product_id':productid,'bundle_id':bnid,'active':active}; 
                                   // console.log(inappdata);
                                //$(".inappdetails").show();
                                inapp.child(bnid).set(inappdata);
                                }*/
                                    firebaseRef.child(bnid).set({
                                        bundle_name: bundlename,
                                        bundle_description: desc,
                                        bundle_parent_category: cat,
                                        bundle_category: subcatnm,
                                        bundle_img: bimg,
                                        bundle_id: bnid,
                                        Session: s
                                    }); 
                                             
                                             
                           }
                           else if($("#cat option:selected").text() == 'Deep Dive' && $("#subcat option:selected").text() != $("#subid").val()){
                       
                       var firebaseRef = firebase.database().ref("Category/"+catnm+"/SubCategory/"+subcat+"/Bundle");
                    //   alert(firebaseRef);
                        var pushedCatRef = firebaseRef.push();
                            // Get the unique key generated by push()
                            var bnid = pushedCatRef.key;
                            if(data.Session != null ){
                                var s = data.Session
                            }else{
                                var s = '';
                            }
                            window.id = bnid;
                          
                                var inappdata = {'product_id':productid,'bundle_id':bnid,'type':"Bundle",'active':active}; 
                               /*if($('.inapp').is(':checked')){
                                inapp.child(bnid).update(inappdata);

                                }else{
                                var inappdata = {'product_id':productid,'bundle_id':bnid,'active':active}; 
                                   // console.log(inappdata);
                                //$(".inappdetails").show();
                                inapp.child(bnid).set(inappdata);
                                }*/
                       //alert(subcatnm);

                            firebaseRef.child(bnid).set({
                                bundle_name: bundlename,
                                bundle_description: desc,
                                bundle_parent_category: cat,
                                bundle_category: subcatnm,
                                bundle_img: bimg,
                                bundle_id: bnid,
                                Session: s,
                            }); 
                   }else if($("#cat option:selected").text() == $("#catid").val()){
                                
                                window.id = bid;                
                                var inappdata = {'product_id':productid,'bundle_id':bid,'type':"Bundle",'active':active}; 
                                
                          data.bundle_category = subcatnm;
                          data.bundle_parent_category = catnm;
                         data.bundle_description = desc;
                          data.bundle_name = bundlename;
                          data.bundle_img = bimg;
                          data.bundle_id = bid;
                                update[bid] = data;
                           }
                            if($('.inapp').is(':checked')){
                                //    alert(5);
                                    if(window.flag){
                                        inapp.child(bid).remove();
                                    }
                                 inapp.child(window.id).set(inappdata);
                                }else{ 
                                    if(window.flag){
                                        inapp.child(bid).remove();

                                    }else{
                                      //  inapp.child(window.id).set(inappdata);      
                                    }
                                   // console.log(inappdata);
                                //$(".inappdetails").show();
                                }
                            return booksRef.update(update);
                           
            });
                            swal({
                                title: "Updated!",
                                text: "Bundle has been Updated.",
                                html:true,
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#86CCEB",
                                confirmButtonText: "OK",
                                closeOnConfirm: false
                            }, function () {
                                 window.setTimeout(function() {
                                  window.location.href = "bundle_list.php";
                                }, 1000);
                            });
        }
    });
        
    });
    
});
    </script>
</body>

</html>