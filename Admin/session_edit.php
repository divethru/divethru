
<?php
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require '../vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
//print_r($_POST);

$id = $_POST['id'];
$bundle1 = $_POST['bundle'];
$sub = $_POST['session'];
$categorynm = $_POST['cat'];
//die;
//$id = $_GET["id"];
//echo $id;
$cate = '';
$subcate = '';
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);
if($bundle1!='0' && $sub=='0'){
	$cate = 'Quick Dive';
	$session = getsingle("Category/".$categorynm."/Bundle/".$bundle1."/Session/".$id);

}else if($sub!='0' && $bundle1!='0'){
	
	$cate = 'Deep Dive';
	$session = getsingle("Category/".$categorynm."/SubCategory/".$sub."/Bundle/".$bundle1."/Session/".$id);
	

}else if($sub!='0' && $bundle1=='0'){
    $session = getsingle("Category/".$categorynm."/SubCategory/".$sub."/Session/".$id);
    
}else if($sub=='0' && $bundle1=='0'){
	$cate = 'Open Dive';
	$session = getsingle("Category/".$categorynm."/Session/".$id);
}

//print_r($session);
//die;
//$session = getsingle("/session/".$id);
$category = get("Category");
$product = get("InAppProducts");
foreach($product as $in => $v){
    if($in == $id){

    $active = $v['active'];
    $productid = $v['product_id'];
    $session_id = $v['session_id'];
    $type = $v['type'];

    }
}
foreach($category as $k => $v){
    if(!empty($v['SubCategory'])){
            
        foreach($v['SubCategory'] as $key => $value){
            
            $subcategory[] = $value;
        }
    }
}

foreach($category as $k => $v){
	if($v['Session'] != ''){
		
		 foreach($v['Session'] as $key => $val ){
			// $session[] = $val;
			// $cat[] = 0;
			//	$bdn[] = 0;
		 }
	}else if($v['SubCategory'] != ''){
		
			foreach($v['SubCategory'] as $s=> $c){
                if($c['Bundle']!=''){
				foreach($c['Bundle'] as $b => $bl){
                    if($k == $categorynm){
                    $bundle[] = $bl;
                    }
					if($bl['Session'] != ''){
						
						foreach($bl['Session'] as $b => $v2){
							
				//$cat[] = $s;
				//$bdn[] = $bl['bundle_id'];
						}
					}
					//die;
				}
                }
			} 
		
	}else if($v['Bundle'] != '' && $k == $categorynm){
		foreach($v['Bundle'] as $b2 => $bl2){
            if($k == $categorynm){
            $bundle[] = $bl2;
            }
					if($bl['Session'] != ''){
						
						foreach($bl2['Session'] as $b3 => $v3){
							 
							 	//			$cat[] = 0;
							//$bdn[] = $v3['budle_id'];
						}
					}
					//die;
				}
	}
}
//print_r($bundle);
//die;
function get($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}


function getsingle($path){
	//echo $path;
	//die;
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;

}


//die;
$ele = '';
foreach($session['meditation_audio'] as $k => $s){
    
    //var lastslashindex = .lastIndexOf('/');
    $whatIWant = substr($s, strrpos($s, '/') + 1);
$a[$k]= $whatIWant;
    echo substr($whatIWant,0 , strpos($whatIWant,"/"));
}
foreach($session['meditation_audio_time'] as $k2 => $t){
        $time[$k2] = $t ;
}
//print_r($a);
//die;
$mp3 = implode($a,',');
//echo $mp3;
//die;
?>




<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Session | DiveThru Admin </title>
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
	     <!-- Bootstrap Tags Input Plugin Js -->
    <link href="plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet">
  <!-- JQuery DataTable Css-->
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
.icon1{
 width: 48px;
 height: 45px;
 background:url(images/audio.png); 
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
                <h2>Session</h2>
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
                            <form id="form_validation_session"  enctype="multipart/form-data" novalidate="novalidate">
                                <div class="form-group form-float">
                                    <div class="form-line error">
										<input type="hidden" id="catnm" value="<?php echo $categorynm;?>">
										<input type="hidden" id="sid" value="<?php echo $id;?>">
										<input type="hidden" id="subid" value="<?php echo $sub;?>">
										<input type="hidden" id="bid" value="<?php echo $bundle1;?>">
                                        <input type="text" class="form-control" id="sessionname" name="name" required="" aria-required="true" aria-invalid="true" value="<?php echo $session['session_name'];?>">
                                        <label class="form-label">Name</label>
                                    </div>
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label>-->
                               </div>
                                        
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                       <!-- <label class="form-label">Description</label>
                                        </br>
                                        </br>-->
                                        <textarea name="description" id="ckeditor" cols="30" rows="5" class="form-control no-resize" required="" aria-required="true" placeholder="Desciption"><?php echo $session['session_description'];?></textarea>
                                    </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label>-->
                                </div>
                                
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Category </label>
                                        <br>
                                        <select id="cat" class="form-control show-tick" name="cat">
                                        <?php
                                        if($category){
                                         //   echo "<option value='0'>Nothing selcted</option>";
                                            foreach($category as $k => $c){
												if($c['category_name'] == $categorynm){
													
                                                echo '<option value="'.$k.'" selected>'.$c["category_name"].'</option>';
												}else{
													
                                                echo '<option value="'.$k.'">'.$c["category_name"].'</option>';
												}
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
                                        </br>
                                        </br>
                                        <select id="subcat" class="form-control show-tick" name="subcat">
                                        <?php
                                        if($subcategory){
                                           // if($sub != 0){

                                                foreach($subcategory as $s){
                                                    if($s['subcategory_id'] == $sub){
                                                    
                                                    echo "<option value=".$s['subcategory_id']." selected>".$s["subcategory_name"]."</option>";
                                                    }else{
                                                    
                                                    echo "<option value=".$s['subcategory_id'].">".$s["subcategory_name"]."</option>";
                                                    }
                                                }
                                            /*}else if($sub == 0){

                                               echo "<option value=''> select SubCategory</option>";
                                            }*/
                                        }
                                        ?>
                                        </select>
                                        
                                    </div>
                                </div>
                                
                                <div class="form-group form-float bnd">
                                    <div class="form-line error">
                                        <label class="form-label">Bundle </label>
                                        </br>
                                        </br>
                                        <select id="bundle" class="form-control show-tick" name="bundle">
                                        <?php
                                        if($bundle){
                                            
                                            foreach($bundle as $b){
												if($b['bundle_id'] == $bundle1){
													
                                                echo "<option value=".$b['bundle_id']." selected>".$b["bundle_name"]."</option>";
												}else{
                                                echo "<option value=".$b['bundle_id'].">".$b["bundle_name"]."</option>";
													
												}
                                            }
                                        }else if($bundle1 == 0){
                                            echo "<option value=''> select Bundle</option>";
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
                                                <input name="session" class=" form-control input-file" id="sessionimage" type="file" onchange="uplaodsimgfile()" accept="image/*" />
                                                </div>
                                                <br>
												<img src="<?php echo $session['session_img'];?>" id="oldsimg" width="50" height="50">
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
                                    <div class="form-line error">
                                    <label class="form-label">Meditation audio</label>
                                    </br>
                                    </br>
                                     
                                                 <div class='flex-style'>
                                                <div class='icon1'></div>
                                                <input name="meditaion" class="form-control input-file" id="maudio" type="file"  accept="audio/*" />
                                                </div>
                                                <br>
                                                <input type="hidden" id="murl">
                                                <input type="hidden" id="mtime">
                                                <input type="text" id="audio" class="form-control" data-role="tagsinput" value="<?php echo $a[0];?>">
                                      

                                        
                                    </div>
                                </div>
                                <div class="form-group form-float audio1">
                                    <div class="form-line error">
                                    <label class="form-label">Meditation audio</label>
                                    </br>
                                    </br>
                                     
                                                 <div class='flex-style'>
                                                <div class='icon1'></div>
                                                <input name="meditaion1" class="form-control input-file" id="maudio2" type="file"  accept="audio/*" />
                                                </div>
                                                <br>
                                               
                                                <input type="text" id="audio3" class="form-control" data-role="tagsinput" value="<?php echo $a[1];?>">
                                      

                                        
                                    </div>
                                </div>
                                <div class="form-group form-float audio2">
                                    <div class="form-line error">
                                    <label class="form-label">Meditation audio</label>
                                    </br>
                                    </br>
                                     
                                                 <div class='flex-style'>
                                                <div class='icon1'></div>
                                                <input name="meditaion2" class="form-control input-file" id="maudio3" type="file"  accept="audio/*" />
                                                </div>
                                                <br>
                                               
												<input type="text" id="audio4" class="form-control" data-role="tagsinput" value="<?php echo $a[2];?>">
                                      

                                        
                                    </div>
                                </div>
                                
                                    <!----  This is for In app purchase section ---->

                                   <div class="form-group form-float SINAPP">
                                    <div class="form-line error " style="display:inline-flex;">
                                    <?php if($session_id != '') {
                                        echo '<input type="checkbox" id="checkbox" data-bid="'.$session_id.'" class="inapp" name="checkbox" checked>';
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
	  <script src="plugins/bootstrap-tagsinput/bootstrap-tagsinput.js"></script>
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

    <!--     <script type="text/javascript" src="../register_user.js"></script>-->
    <!-- Custom Js -->

      <
    <script src="js/admin.js"></script>
    <script type="text/javascript" src="js/upload.js"></script>
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
            $(".SINAPP").hide();
            $(".fa-spinner").hide();
            $('#audio').tagsinput({
    itemValue: 'id'
});
            window.subcat = false;
            window.bundle = false;
            window.session = true;
           // $(".fa-spinner").hide();
			$(".audio2").hide();
            $(".audio1").hide();
            var category_name_edit = $("#cat option:selected").text();
             //alert(category_name_edit);
             if($("#subid").val()!=0 && $("#bid").val() != 0){
                $(".sub").show();
                $(".bnd").show();
                $(".audio1").show();
                $(".audio2").show();
                $(".SINAPP").hide();
             }
             else if($("#subid").val()==0 && $("#bid").val() != 0){
                $(".sub").hide();
                $(".bnd").show();
                 $(".audio1").show();
                $(".audio2").show();
                $(".SINAPP").hide();
             }else if($("#subid").val()!=0 && $("#bid").val() == 0){
                $(".sub").show();
                $(".bnd").hide();
                 $(".audio1").show();
                $(".audio2").show();
                $(".SINAPP").show();
             }else if($("#subid").val() == 0 && $("#bid").val() == 0 && category_name_edit != "10 Day Intro Program"){
                     $(".audio1").show();
                $(".audio2").show();
                $(".sub").hide();
                $(".bnd").hide();
                $(".SINAPP").hide();
             }else if($("#subid").val() == 0 && $("#bid").val() == 0 && category_name_edit == "10 Day Intro Program"){
                     $(".audio1").hide();
                $(".audio2").hide();
                $(".sub").hide();
                $(".bnd").hide();
                $(".SINAPP").hide();
             }
			/*
			$(".dropdown-menu.inner li").each(function( index ) {
  console.log( index + ": " + $( this ).html() );
  if(index == 0){
	  
	  $( this ).removeClass( "selected" );
  }
  if(index == 1)
  {
	  $(".filter-option").text($(this).text());
	  $( this ).addClass( "selected" );
  }
});*/
			
			
		//	var config = {};
	//		config.placeholder = 'Description'; 
//CKEDITOR.replace('ckeditor',config);
  //  CKEDITOR.config.height = 300;
	
    $('.js-basic-example').DataTable({
        responsive: true,
		//pagination: true,
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

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
			
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


$('select').selectpicker('refresh');
	
$("#cat").change(function(){
        //alert($("#cat option:selected").text());
        var c = $("#cat option:selected").text();
           $('#bundle').empty().append('<option selected="selected" value="">Select bundle</option>');
        var op = "";
        if($("#cat option:selected").text() == 'Deep Dive'){
            //  alert(55);
            $(".sub").show();
            $(".bnd").show();
            //$(".audio1").show();
            //$(".audio2").show();

        }else if($("#cat option:selected").text() == 'Quick Dive'){
            $(".sub").hide();
            $(".bnd").show();
          //  $(".audio1").show();
          //  $(".audio2").show();
        }else{
            $(".sub").hide();
            $(".bnd").hide();
          //  $(".audio1").hide();
          //  $(".audio2").hide();
        }
        firebase.database().ref("/Category/"+c).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key
                var key = childSnapshot.key;
                // value, could be object
                var childData = childSnapshot.val();

                if(childSnapshot.key == "session_subcription_type" && childData == "Paid"){
//console.log(childSnapshot.key);
                     $(".audio1").show();
                        $(".audio2").show();
                }else{
                      $(".audio1").hide();
                      $(".audio2").hide();
                }
            /*  childData.forEach(function(child) {
                    
                op += "<option value"+child.subcategory_id+">"+child.subcategory_name+"</option>";
                });*/
                if(childSnapshot.key == 'SubCategory'){
                    var t = Object.values(childData);
                    //console.log(t);
                    if(t != ''){
                        $(".SINAPP").show();
                        window.subcat = true;
                        
                        $(".audio1").show();
                        $(".audio2").show();
                        $(".sub").show();
                         $(".bnd").show();
                    }
                    if(t == ""){
                        //window.bundle = false;                  
                        window.subcat = false;   
                    }
                    op = "<option value=''>Select Subcategory</option>";
                    $.map(t, function(value, index) {
                        $(".SINAPP").hide();
                        if(Object.keys(value.Bundle).length > 0){

                        window.bundle = true;
                    }
                    /* Hide bundle if subcategory don't have */
                    if(Object.keys(value.Bundle).length == 0){
                                 //    $(".bnd").hide();
                                 $(".SINAPP").show();
                                      window.bundle = false;                  
                                    window.subcat = true;   
                       }
                       // window.bundle = true;
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
                 if(t != ''){
                    window.subcat = false;
                    window.bundle = true;
                        $(".audio1").show();
                        $(".audio2").show();
                         $(".sub").hide();
                        $(".bnd").show();
                    }
                  //  console.log(t);
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

                        if(Object.keys(value.Session).length > 0){
                                     $(".bnd").hide();
                                      window.bundle = false;                  
                                    window.subcat = true;   
                                }else if(Object.keys(value.Bundle).length == 0){
                                     window.bundle = false;                  
                                    window.subcat = true;   
                                }else if(Object.keys(value.Bundle).length > 0){
                                    $(".bnd").show();
                                      window.bundle = true;                  
                                    window.subcat = true;   
                                }
                        //var Bb = Object.values(B.Bundle);
                   // console.log(B);
                            $.map(B, function(value, index) {
                                $.map(value.Bundle, function(value, index) {
                                    window.bundle = true;
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
                       // required: true,
                        accept: "image/jpeg, image/png,image/gif"
                    }, 
                    'meditaion': {
                        required: function() {
                              return $("#audio").val() == "";
                        },
                        accept: "audio/aac, audio/ogg,audio/mp3,audio/mpeg,audio/mpeg3"
                    },
                    'meditaion1': {
                       required: function() {
                              return $("#cat option:selected").text() != '10 Day Intro Program' && $("#audio3").val() == "";
                        },
                        accept: "audio/aac, audio/ogg,audio/mp3,audio/mpeg,audio/mpeg3"
                    }, 
                    'meditaion2': {
                        required: function() {
                              return $("#cat option:selected").text() != '10 Day Intro Program' && $("#audio4").val() == "";
                        },
                        accept: "audio/aac, audio/ogg,audio/mp3,audio/mpeg,audio/mpeg3"
                    }, 
                    'cat':{
                        required:true
                    },
                    'bundle':{
                         required: function() {
                              return $("#cat option:selected").text() == 'Deep Dive';
                        }
                    },
                    'subcat':{
                         required: function() {
                              return $("#cat option:selected").text() != '10 Day Intro Program' && $("#cat option:selected").text() != 'Open Dive';
                        }
                    },
                    'productid':{
                        required: function() {
                               return $(".inapp").is(':checked');
                               
                        }
                    },
                },
                messages: {
                  name: {
                    required:"Please enter your Session Name",
                    minlength: "Enter name must be at least 6 characters long",
                    maxlength: "Enter name maximum 50 characters allow"
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
                },
                success: function(form){
                                        
                }
                
            });
	
	$(".sessionadd").click(function(){

		var temp=$('#form_validation_session').valid();
		if(temp==true){
		        	 	



						var old = $("#catnm").val();
		var booksRef = '';
		var Ref = '';
		var ref = '';
		var sub = $("#subid").val();
        var bnd = $("#bid").val();
		var cnm = $("#catnm").val();
		var s = $("#sid").val();
     console.log("SUB"+window.subcat);
     console.log("BUND"+window.bundle);
               
        var bundle2 = false;
        var sub2 = false;

        if(bnd==0 && sub==0 ){
            bundle2 = false;
            sub2 = false;
        }else if(bnd!=0 && sub==0){
            bundle2 = true;
            sub2 = false;
                
        }else if(bnd==0 && sub!=0){
            bundle2 = false;
            sub2 = true;
                
        }else if(bnd!=0 && sub!=0){
            bundle2 = true;
            sub2 = true;
            
        }
        //var t = '';
    
        var fireref  =  firebase.database().ref('Category');
        fireref.once('value', function(snapshot) {
            /*Fetching all value from Category node*/
            
             snapshot.forEach(function(childSnapshot) {
                                // ref ='Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/';
        //t = 5;
                /*Comparing old and new value from database */
					if(bundle2  && sub2  && childSnapshot.key == cnm){
                                         var bnd = $("#bid").val();
                                         var sub = $("#subid").val();
                                       //  alert(sub);
                                     booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/');
                                }else if(!bundle2  && sub2  && childSnapshot.key == cnm){
                                         var sub = $("#subid").val();
                                     booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Session/');
                                    
                                }else if(bundle2 && !sub2 &&childSnapshot.key == cnm){
                                     var bnd = $("#bid").val();
									booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+bnd+'/Session/');
								}else if(!sub2 && !bundle2  && childSnapshot.key == cnm){
									 booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/Session/');
								}
					if(old == $("#cat option:selected").val()){
									//alert('opne');
							/*Checking SubCategory exist or not for know deep dive category */
							if(childSnapshot.hasChild("SubCategory")) {
								
								
								
								/* Checking subcategory or bundle change or not */
								
								if(sub != $("#subcat option:selected").val() && window.bundle){
									
									var n = $("#subcat option:selected").val(); // new subcategory
									/*Referance for fetching old value for update */
								
									/*Referance add data to new seletecd value*/
								 Ref = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+n+'/Bundle/'+bnd+'/Session/');
								 
								}else if(sub != $("#subcat option:selected").val() && bnd != $("#bundle option:selected").val() && window.bundle && window.subcat){
									
									var n = $("#subcat option:selected").val(); // new subcategory
									var nw = $("#bundle").val();   // new bundle
									/*Referance for fetching old value for update */
								// booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/');
									/*Referance add data to new seletecd value*/
								 Ref = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+n+'/Bundle/'+nw+'/Session/');
								 ref ='Category/'+childSnapshot.key+'/SubCategory/'+n+'/Bundle/'+nw+'/Session/';
									
								}else if(sub != $("#subcat option:selected").val() && !window.bundle && childSnapshot.key == $("#cat option:selected").text()){
                                    var n = $("#subcat option:selected").val();
                                    Ref = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+n+'/Session/');

                            }else{
															
									/*Referance for fetching old value for update */
		//booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/');
								 ref ='Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/';
								}
							//	  Ref = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/');
							}else if(childSnapshot.hasChild("Bundle")) {
								
								if(bnd != $("#bundle option:selected").val()){
									
									var nw = $("#bundle").val(); // new bundle
									
									/*Referance add data to new seletecd value*/
								 Ref = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+nw+'/Session/');
									/*Referance for fetching old value for update */
								// booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+bnd+'/Session/');
								  ref = 'Category/'+childSnapshot.key+'/Bundle/'+nw+'/Session/'+s;
								}else{
									
									/*Referance for fetching old value for update  */
		//booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+bnd+'/Session/');
								  ref = 'Category/'+childSnapshot.key+'/Bundle/'+bnd+'/Session/'+s;
								}
								//  Ref = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+bnd+'/Session/');
							}else{
								  //Ref = firebase.database().ref('Category/'+childSnapshot.key+'/Session/');
									/*Referance for fetching old value for update  */
								// booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/Session/');
								ref = 'Category/'+childSnapshot.key+'/Session/'+s;
							}
					}
					if(old != $("#cat option:selected").text() ){

							if(childSnapshot.hasChild("SubCategory") && window.subcat && window.bundle && childSnapshot.key == $("#cat option:selected").text() ) {
                                var n = $("#subcat option:selected").val();
                                var bnd = $("#bundle option:selected").val();
								//if(sub != $("#subact option:selected").val()){
									//var n = $("#subact option:selected").val();
                                 //   alert($("#subcat option:selected").val());
								  Ref = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+n+'/Bundle/'+bnd+'/Session/');
							/*	}else{
									
								  Ref = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/');
								}*/
		//						 booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/');
								 ref ='Category/'+childSnapshot.key+'/SubCategory/'+sub+'/Bundle/'+bnd+'/Session/';
							}else if(childSnapshot.hasChild("Bundle") &&  window.bundle && childSnapshot.key == $("#cat option:selected").text()) {
							//	if(bnd != $("#bundle option:selected").val()){
								//alert(5);
									var nw = $("#bundle").val();
								  Ref = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+nw+'/Session/');
								/*}else{
								  Ref = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+bnd+'/Session/');
									
								}*/
			//					 booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/Bundle/'+bnd+'/Session/');
								  ref = 'Category/'+childSnapshot.key+'/Bundle/'+nw+'/Session/';
							}else if(window.subcat && !window.bundle && childSnapshot.key == $("#cat option:selected").text()){
                                    var n = $("#subcat option:selected").val();
                                    Ref = firebase.database().ref('Category/'+childSnapshot.key+'/SubCategory/'+n+'/Session/');

                            }else if(!window.subcat && !window.bundle && childSnapshot.key == $("#cat option:selected").text()){
			//alert($("#cat option:selected").text()+'='+childSnapshot.key);
								  Ref = firebase.database().ref('Category/'+childSnapshot.key+'/Session/');
				//				 booksRef = firebase.database().ref('Category/'+childSnapshot.key+'/Session/');
								ref = 'Category/'+childSnapshot.key+'/Session/'+s;
							}
					}
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
			 });
			// alert(Ref);
		// alert(booksRef);
 var inapp = firebase.database().ref('InAppProducts');
                     var productid = $("#productid").val();
                    if($("#active").is(':checked')){
                        
                    var active = true;
                    }else{
                    var active = false;
                        
                    }
			  booksRef.child(s).once('value').then(function(snap) {
								var sessionid = $("#sid").val();
								var desc = $('#ckeditor').val();
								var sessionnm = $("#sessionname").val();
								var subname = $("#subname").val();
                                 var scatid = $("#subcat option:selected").val();
								var sid = $("#sid").val();
								var bundle = $("#bundle option:selected").val();
							
								var cat = $("#cat option:selected").val();
								var catnm = $("#cat option:selected").text();
								
								if($("#simgurl").val()){
								 var simg = $("#simgurl").val();
									 
								 }else{
								 var simg = $("#oldsimg").attr('src');
									 
								 }
							var data = snap.val();
							console.log(data);
							data.session_name = sessionnm;
							data.session_description = desc;
							data.session_img = simg;
                            var oldm = data.meditation_audio;
                            var oldmt = data.meditation_audio_time;
                            if($("#murl").val()){   
                                    var murl = $("#murl").val();
                                    var audio = murl.split(',');
                                //   alert (audio.length);
                                    if(audio.length <=1 && catnm == "10 Day Intro Program"){
                                       data.meditation_audio = audio;
                                        console.log(audio);
                                    }else if(audio.length <=1 && catnm != "10 Day Intro Program"){
                                       data.meditation_audio = audio;
                                        console.log(audio);

                                    }else if(audio.length >1 && audio.length <3){
                                        var naudio = oldm.concat(audio);
                                      data.meditation_audio = naudio;

                                    }else if(audio.length == 3){
                                             data.meditation_audio = audio;
                                    }
							}
                            if($("#mtime").val()){  
                                    var mtime = $("#mtime").val();
                                    var audio_time = mtime.split(',');
                                    if(audio_time.length <=1 && catnm == "10 Day Intro Program"){
                                       //data.meditation_audio_time = audio_time;
                                        data.meditation_audio_time = audio_time;
                                        console.log(naudio);
                                    }else if(audio.length <=1 && catnm != "10 Day Intro Program"){
                                       data.meditation_audio = audio;

                                    }else if(audio_time.length >1 && audio_time.length <3){
                                        var naudio_time = oldmt.concat(audio_time);
                                      data.meditation_audio_time = naudio_time;

                                    }else if(audio_time.length == 3){
                                        data.meditation_audio_time = audio_time;
                                            
                                    }
                            }
                                if(bundle!=""){
                                    var b = bundle;
                                }else if(scatid!=""){
                                    var b = scatid;
                                }else{
                                    var b ="";
                                }
							data.budle_id = b;
			  //data.bookInfo.bookTitle = newTitle;
						var update = {};
						update[s] = null;
			//  alert(old+"="+$("#cat option:selected").text());
					if(old != $("#cat option:selected").text()){
							console.log("in"+data);

								var p = Ref.push();
								var k = p.key;

                                 window.id = k;
                                var inappdata = {'product_id':productid,'type':"Session",'session_id':k,'active':active}; 

								data.session_id = k;
							//	data.session_id = k;
								Ref.child(k).set(data);
					}else if(old == $("#cat option:selected").text() && sub != $("#subcat option:selected").val() && sub != 0){
				console.log(sub+"=="+$("#subcat option:selected").text());
						var p = Ref.push();
								var k = p.key;
                                 window.id = k;
                                var inappdata = {'product_id':productid,'type':"Session",'session_id':k,'active':active}; 
								data.session_id = k;
								//data.session_id = k;
								Ref.child(k).set(data);
					}else if(old == $("#cat option:selected").text() && sub == $("#subcat option:selected").val() && bnd != $("#bundle option:selected").val() && sub != 0 && bnd != 0)
					{
							console.log(data);
							var p = Ref.push();
								var k = p.key;
								data.session_id = k;
                                 window.id = k;
                                var inappdata = {'product_id':productid,'type':"Session",'session_id':k,'active':active}; 
								Ref.child(k).set(data);
					}else{
							console.log(data);
						 window.id = sessionid;
                                var inappdata = {'product_id':productid,'type':"Session",'session_id':sessionid,'active':active}; 
						//data.session_id = sessionid;
						update[sessionid] = data;
					}
                          if($('.inapp').is(':checked')){
                                //    alert(5);
                                    if(window.flag){
                                        inapp.child(sessionid).remove();
                                    }
                                 inapp.child(window.id).set(inappdata);
                          }else{ 
                                    if(window.flag){
                                        inapp.child(sessionid).remove();

                                    }else{
                                      //  inapp.child(window.id).set(inappdata);      
                                    }
                                   // console.log(inappdata);
                                //$(".inappdetails").show();
                          }

					return booksRef.update(update);
			  
			});
		});
		

            		 
            		
                           swal({
                                title: "Updated!",
                                text: "Session has been Updated.",
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
                     
            	
             
            		 
            	//var firebaseRef = firebase.database().ref();

            //		var catRef = firebaseRef.child("category");
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
               
	}
		
		
	});
	
});
	</script>
</body>

</html>