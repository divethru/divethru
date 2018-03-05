
<?php
define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
//define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
//define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require '../vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
$id = $_GET["id"];
//echo $id;
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$session = getsingle("/session/".$id);
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
$ele = '';
foreach($session['session_audio'] as $s){
//echo $s;
	
	
	$whatIWant = substr($s, strpos($s, "F") + 1);   
	$a[] = substr($whatIWant,0 , strpos($whatIWant,"?"));
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

    <!-- Animation Css -->
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />
    <!-- Bootstrap Tags Input Plugin Js -->
    <link href="plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet">
  <!-- JQuery DataTable Css -->
    <link href="plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <!-- Custom Css -->
    <link href="css/style.css" rel="stylesheet">
    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="css/themes/all-themes.css" rel="stylesheet" />
	

	<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
	<script>
	/*	
		  // Initialize Firebase
		  var config = {
    apiKey: "AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw",
    authDomain: "divethru-71c56.firebaseapp.com",
    databaseURL: "https://divethru-71c56.firebaseio.com",
    projectId: "divethru-71c56",
    storageBucket: "divethru-71c56.appspot.com",
    messagingSenderId: "53159239409"
  };*/
  var config = {
    apiKey: "AIzaSyBwDEs5JfwQNSRKCDMHE9TrVlWArbYG9NU",
    authDomain: "divethrutest.firebaseapp.com",
    databaseURL: "https://divethrutest.firebaseio.com",
    projectId: "divethrutest",
    storageBucket: "divethrutest.appspot.com",
    messagingSenderId: "19401978174"
  };
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
                            <form id="form_validation"  novalidate="novalidate">
                                <div class="form-group form-float">
                                    <div class="form-line error">
										<input type="hidden" id="sid" value="<?php echo $session['session_id'];?>">
                                        <input type="text" class="form-control" id="sessionname" name="name" value="<?php echo $session['session_name'];?>" required="" aria-required="true" aria-invalid="true">
                                        <label class="form-label">Name</label>
                                    </div>
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label>-->
                               </div>
										
                                <div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Description</label>
										</br>
										</br>
                                        <textarea name="description" id="ckeditor" cols="30" rows="5" class="form-control no-resize" required="" aria-required="true" placeholder="Desciption"><?php echo $session['session_description'];?></textarea>
                                    </div>
                                <!--<label id="description-error" class="error" for="description">This field is required.</label>-->
								</div>
								
								<div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Bundle [ If you don't select bundle consider as OpenDive session ]</label>
										<br>
										<select id="bundle" class="form-control show-tick">
										<?php
										if($bundle){
											
											foreach($bundle as $c){
												if($session['bundle_id'] == $c['category_id']){
													
													echo "<option value=".$c['category_id']." selected>".$c["category_name"]."</option>";
												}else{
													
												echo "<option value=".$c['category_id'].">".$c["category_name"]."</option>";
												}
											}
										}else{
											if($session['bundle_id'] == 0){
											echo "<option value='0' selected>Nothing selcted</option>";
												
											}else{
												
											echo "<option value='0'>Nothing selcted</option>";
											}
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
												<input name="file" class="form-control" id="sessionimage" type="file" onchange="uplaodsimgfile()" accept="image/*" />
												<img src="<?php echo $session['session_img'];?>" id="oldsimg" width=50 height=50>
												<input type="hidden" id="simgurl">
										<!--	</div> -->

										
                                    </div>
                                </div>
								<div class="form-group form-float">
                                    <div class="form-line error">
									<label class="form-label">Outro audio</label>
									</br>
									</br>
                                     <!--  <form id="my-awesome-dropzone" action="/upload" class="dropzone">  
											<div class="dropzone-previews"></div>
											<div class="fallback"> <!-- this is the fallback if JS isn't working -->
												<input name="file" class="form-control" id="soutro" type="file"  accept="audio/*" multiple/>
												<input type="hidden" id="surl">
												 <input type="text" id="audio" class="form-control" data-role="tagsinput" value="<?php echo $mp3;?>">
										<!--	</div> -->

										
                                    </div>
                                </div>
								
									<div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="text" class="form-control" id="subname" name="name" required="" aria-required="true" aria-invalid="true" value="<?php echo $session['session_subcription_type']?>">
                                        <label class="form-label">Subscription Type</label>
                                    </div>
                              <!--  <label id="name-error" class="error" for="name">This field is required.</label>-->
                               </div>
                             <!--  <label id="password-error" class="error" for="password">This field is required.</label></div>-->
                                <!-- <div class="form-group">
                                    <input type="checkbox" id="checkbox" name="checkbox" aria-required="true">
                                    <label for="checkbox">I have read and accept the terms</label>
                               <label id="checkbox-error" class="error" for="checkbox">This field is required.</label></div>-->
                                <button class="btn btn-primary waves-effect sessionedit" type="submit">SUBMIT</button>
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
		 <script src="js/pages/forms/form-validation.js"></script>
		    <script type="text/javascript" src="../register_user.js"></script>
		     <!-- Bootstrap Tags Input Plugin Js -->
    <!-- Custom Js -->
    <script src="js/admin.js"></script>

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
			
			
			var config = {};
			config.placeholder = 'Description'; 
CKEDITOR.replace('ckeditor',config);
    CKEDITOR.config.height = 300;
	
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

	
	$(".sessionedit").click(function(){
		var desc = CKEDITOR.instances['ckeditor'].getData();
		 var sessionnm = $("#sessionname").val();
		 var simg = $("#simgurl").val();
		 var surl = $("#surl").val();
		 var subname = $("#subname").val();
		 var sid = $("#sid").val();
		 
		 var data = {
			session_name: sessionnm,
			session_description: desc,
			session_img: simg,
			session_audio: outro,
			budle_id: bundle,
			session_subcription_type: subname,
			session_id: sid
		 };
		 //alert(cid);
		 
		 
	
 
		 var updates = {};
  updates['/session/' +sid] = data;
	//var firebaseRef = firebase.database().ref();

//		var catRef = firebaseRef.child("category");
	firebase.database().ref().update(updates);
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
	
		
		
	});
	
});
	</script>
</body>

</html>