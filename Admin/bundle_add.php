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
//$subcategory = get("subcategory");

function get($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}

foreach($category as $k => $v){
	if($v['SubCategory'] != ''){
			
		foreach($v['SubCategory'] as $key => $value){
			
			$subcategory[] = $value;
		}
	}
}
//	print_r($subcategory);
//die;
?>



<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Bundle | DiveThru Admin</title>
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
                            <form id="form_validation_bundle"  novalidate="novalidate">
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="text" class="form-control" id="bundlename" name="name" required="" aria-required="true" aria-invalid="true">
                                        <label class="form-label">Name</label>
                                    </div>
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label>-->
                               </div>
										
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <!--<label class="form-label">Description</label>
										</br>
										</br>-->
                                        <textarea name="description" id="ckeditor" cols="30" rows="5" class="form-control no-resize" required="" aria-required="true" placeholder="Desciption"></textarea>
                                    </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label>-->
								</div>
								
								<div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Category</label>
										<br><br>
										<select id="cat" class="form-control show-tick" name="cat">
										<?php
										if($category){
											echo "<option value=''>Select Category</option>";
											foreach($category as $c){
												echo "<option value=".$c['category_id'].">".$c["category_name"]."</option>";
											}
										}
										?>
										</select>
										
                                    </div>
								</div>
								
								<div class="form-group form-float sub">
                                    <div class="form-line error">
                                        <label class="form-label">SubCategory</label>
										<br><br>
										<select id="subcat" class="form-control show-tick" name="subcat">
										<?php
										if($subcategory){
											echo "<option value=''>Select SubCategory</option>";
											foreach($subcategory as $s){
												echo "<option value=".$s['subcategory_id'].">".$s["subcategory_name"]."</option>";
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
									<label class="form-label">Image</label>
									</br>
									</br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
											<div class="dropzone-previews"></div>
											<div class="fallback"> <!-- this is the fallback if JS isn't working -->
												<input name="bundle" class="form-control" id="bundleimage" type="file" onchange="uplaodbimgfile()" accept="image/*" />
												<input type="hidden" id="bimgurl">
										<!--	</div> -->

										
                                    </div>
                                </div>
								

                             <!--  <label id="password-error" class="error" for="password">This field is required.</label></div>-->
                                <!-- <div class="form-group">
                                    <input type="checkbox" id="checkbox" name="checkbox" aria-required="true">
                                    <label for="checkbox">I have read and accept the terms</label>
                               <label id="checkbox-error" class="error" for="checkbox">This field is required.</label></div>-->
                                <button class="btn btn-primary waves-effect bundleadd" type="submit">SUBMIT</button>
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
    <!-- Sweetalert Css -->
    <link href="plugins/sweetalert/sweetalert.css" rel="stylesheet" />

		
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
		 <script type="text/javascript" src="../register_user.js"></script>
    <!-- Custom Js -->
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
			var config = {};
			config.placeholder = 'Description'; 
//CKEDITOR.replace('ckeditor',config);
  //  CKEDITOR.config.height = 300;
	
    $('.js-basic-example').DataTable({
        responsive: true,
		//pagination: true,
    });

    $('select').selectpicker().change(function(){
        $(this).valid()
    });
    $('#bundleimage').on('change', function(){
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
	$("#cat").change(function(){
		//alert(55);.
		var op ='';
		var c = $("#cat option:selected").text();
		
		/* Code for hide and show subcategory according to category */
		if($("#cat option:selected").text() != 'Deep Dives'){
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
	
	
	$(".bundleadd").click(function(){


		var cat = $("#cat").val();
		var catnm = $("#cat option:selected").text();
		var subcatnm = $("#subcat option:selected").text();
		if(catnm == 'Deep Dives'){
			
		var subcat = $("#subcat").val();
				var firebaseRef = firebase.database().ref("Category/"+catnm+"/SubCategory/"+subcat+"/Bundle");
			//	var f = "category/"+catnm+"/subcategory/"+subcat+"/bundle";
		}else{
			var subcat = '';
			var firebaseRef = firebase.database().ref("Category/"+catnm+"/Bundle");
		//	var f = "category/"+catnm+"/bundle";
		}
	//	alert(bundle);
		//return;
		// var desc = CKEDITOR.instances['ckeditor'].getData();
		 var desc = $('#ckeditor').val();
		 var bundlename = $("#bundlename").val();
		 var bimg = $("#bimgurl").val();

		 	if(cat == '' || catnm == '' || desc == '' || bimg == ''){
		 		window.location.reload();
		 	}

	//	var outro = surl.split(',');
//console.log(array);
		//var catRef = firebaseRef.child("bundle");

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
		});

		window.location = "bundle_list.php";
		//alert(cimg);
		//alert(f);
		
	});
	
});
	</script>
</body>

</html>