
<?php 
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
//define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
//define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require_once("credential.php");
require '../vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;


$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$category = get("Category");
$C = [];

foreach($category as $k => $v){
	if($v['session_subcription_type'] != "Free"){
					$C[$k] = [];
		if(isset($v["SubCategory"]) && $v["SubCategory"] != ""){
			foreach($v["SubCategory"] as $sk => $sv){
				if(isset($sv["Bundle"]) && $sv["Bundle"] != ""){
					foreach($sv["Bundle"] as $bk => $bv){
						
					$Sub[] = ["name" => $bv["bundle_name"] ,"id" => $bk,"type" => "Bundle"];
					}
							$C[$k] = $Sub;
				}else if(isset($sv["Session"]) && $sv["Session"] != ""){
					foreach($sv["Session"] as $Sk => $Sv){
						$Ses[] = ["name" => $sv["subcategory_name"]." ".$Sv["session_name"] ,"id" => $Sk,"type"=>"Session"];					
							$C[$k] = $Ses;
					}
				}
			}
		}

	}
}
 

function get($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}

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
    <!-- Bootstrap Select Css -->
    <link href="plugins/bootstrap-select/css/bootstrap-select.css" rel="stylesheet" />
  <!-- JQuery DataTable Css -->
    <link href="plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <!-- JQuery Datapicker Css -->
    <link href="plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="css/style.css" rel="stylesheet">
    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="css/themes/all-themes.css" rel="stylesheet" />
	<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
	<script src="js/credential.js"></script>
	<script>
		
		  // Initialize Firebase
		/*  var config = {
    apiKey: "AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw",
    authDomain: "divethru-71c56.firebaseapp.com",
    databaseURL: "https://divethru-71c56.firebaseio.com",
    projectId: "divethru-71c56",
    storageBucket: "divethru-71c56.appspot.com",
    messagingSenderId: "53159239409"
  };*/
  // var config = {
  //   apiKey: "AIzaSyBwDEs5JfwQNSRKCDMHE9TrVlWArbYG9NU",
  //   authDomain: "divethrutest.firebaseapp.com",
  //   databaseURL: "https://divethrutest.firebaseio.com",
  //   projectId: "divethrutest",
  //   storageBucket: "divethrutest.appspot.com",
  //   messagingSenderId: "19401978174"
  // };
  // firebase.initializeApp(config);
		</script>
		  <!---  <script type="text/javascript" src="../register_user.js"></script>
		    <script type="text/javascript" src="../js/dashboard.js"></script>----->

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
                <h2>Promo Codes</h2>
            </div>
			
			 <!-- Basic Examples -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Create</h2>
                            <ul class="header-dropdown m-r--5">
                                <li class="dropdown">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li><a href="accesscode_list.php" class=" waves-effect waves-block">List</a></li>

                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="body">
                            <form id="form_validation_accesscode"  >
                                
							  <div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="text" class="form-control" id="npromocode" name="npromocode"  aria-invalid="true">
                                        <label class="form-label">New Promo Code</label>
                                    </div>
                               </div>
							   
								<div class="form-group form-float sub">
                                    <div class="form-line error">
                                        <label class="form-label">Access Type</label>
										<br>
										<br>
										<select id="access_type" name="access_type" class="form-control show-tick">
											<option value="">-- Access Type --</option>
											<option value="friends-family">Friends/Family</option>
											<option value="media">Media</option>
											<option value="influencer">Influencer</option>
											<option value="corporate">Corporate</option>
											<option value="brandpartnership">Brand Partnership</option>
											<option value="other">Other</option>
										</select>
                                    </div>
                               </div>
								
								<div class="form-group form-float">
                                    <div class="form-line error">
                                        <label class="form-label">Length Of Validity</label>
                                        <br>
                                        <br>
                                        <!--<input type="text" class="form-control" id="lvalidity" name="lvalidity"  aria-invalid="true">-->
                                        <div class="row">
                                            <div class="col-sm-6 " style="margin-bottom:0px;">
                                                <div class="input-group " style="margin-bottom:0px;">
                                                    <span class="input-group-addon">
                                                        <i class="material-icons">date_range</i>
                                                    </span>
                                                    <div class="form-line">
                                                        <input type="text" id="start" name="start"class="form-control" placeholder="Start Date">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 " style="margin-bottom:0px;">
                                                <div class="input-group " style="margin-bottom:0px;">
                                                    <span class="input-group-addon">
                                                        <i class="material-icons">date_range</i>
                                                    </span>
                                                    <div class="form-line">
                                                        <input type="text" id="end" name="end" class="form-control" placeholder="End Date">
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        
                                    </div>
                               </div>
								
<!-- 								<div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="text" class="form-control" id="amount" name="amount"  aria-invalid="true">
                                        <label class="form-label">Equivaleant Amount</label>
                                    </div>
                               </div> -->
								
								<div class="form-group form-float">
                                    <div class="form-line error">
                                        <input type="text" class="form-control" id="npeople" name="npeople"  aria-invalid="true">
                                        <label class="form-label">No. of people using</label>
                                    </div>
                               </div>
																
								
                                <div class="form-group form-float sub">
                                    <div class="form-line error">
                                        <label class="form-label">Access To</label>
                                        <br>
                                        <br>
                                        <select id="access_to" name="access_to" class="form-control show-tick">
                                            <option value="">-- Access To --</option>
                                            <?php
                                                foreach($C as $ck => $cv){
                                                    echo '<option value="'.$ck.'">'.$ck.'</option>';
                                                }
                                            
                                            ?>
                                            <option value="all">All</option>
                                            <option value="custom">Custom</option>
                                            
                                        </select>
                                    </div>
                               </div>
																
								
							  <div class="form-group form-float customselect" style="display:none;">
                                    <fieldset style="border:1px solid #e5e5e5;!important;">
											<legend>Select category:</legend>
											
										<?php
										
																					
										foreach($C as $ck => $cv){

											echo '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12"><div class="card"><div class="header"><h2><input type="checkbox" id="'.$ck.'" class="catsel filled-in" name="checkbox" value="'.$ck.'"><label for="'.$ck.'" style="width:200px;">'.$ck.'</label></h2></div><div class="body" style="max-height:300px;overflow-y:scroll;">';
											foreach($cv as $key => $val){
												
												echo '<input type="checkbox" id="'.$ck.$key.'" class="selsingle filled-in" data-type="'.$val["type"].'" name="checkbox" value="'.$val["id"].'"><label for="'.$ck.$key.'" style="width:200px;">'.$val["name"].'</label>';
												}
											echo '</div></div></div>';
										}


										
										?>
                                </fieldset>
                               </div>
								
								
                             <!--  <label id="password-error" class="error" for="password">This field is required.</label></div>-->
                                <!-- <div class="form-group">
                                    <input type="checkbox" id="checkbox" name="checkbox" aria-required="true">
                                    <label for="checkbox">I have read and accept the terms</label>
                               <label id="checkbox-error" class="error" for="checkbox">This field is required.</label></div>-->
                                <button class="btn btn-primary waves-effect codeadd" type="submit">SUBMIT</button>
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
    <!-- Select Plugin Js -->
    <script src="../../plugins/bootstrap-select/js/bootstrap-select.js"></script>
        <!-- Jquery Datetime Plugin Js -->
    <script src="plugins/momentjs/moment.js"></script>
    <script src="plugins/momentjs/ender.js"></script>
    <script src="plugins/momentjs/package.js"></script>
    <script src="plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
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
    <!-- Custom Js -->
    <script src="js/admin.js"></script>

    <!-- Demo Js -->
    <script src="js/demo.js"></script>
	<script type="text/javascript">

		$(function () {


            $('#end').bootstrapMaterialDatePicker({
                weekStart : 0,
                format : 'dddd DD MMMM YYYY' 
            }).on('change',function(e,date){
                var dt = new Date(date);
                    var e = moment(date).format("YYYY-MM-DD HH:mm:ss");
                window.enddate = e;
            });
            
            var dt = new Date();
        
            $('#start').bootstrapMaterialDatePicker({
                weekStart : 0,
                minDate: dt,
                format : 'dddd DD MMMM YYYY' 
            }).on('change', function(e, date){
                var dt = new Date(date);
                    var s = moment(date).format("YYYY-MM-DD HH:mm:ss");
                window.startdate = s;
                //alert(date);
                dt.setDate(dt.getDate() + 1);
                $('#end').bootstrapMaterialDatePicker('setMinDate', dt);
            });

            
            $("#access_to").change(function(){
                var v = $(this).val();
                
                
                if(v == "custom"){
                    $(".customselect").show();
                }else{
                    $(".customselect").hide();
                    
                }
            });
            

			
			$(".body").find("input:checkbox").click(function(){
				if(this.checked){
					
				}else if(!this.checked){
					
				}
			});
			$("input:checkbox").click(function(){
				//alert(this.checked);
				if(this.checked){
					
					$(this).parent().parent().next(".body").find("input:checkbox").each(function(){
						//alert($(this).val());
						$(this).attr('checked',true);
					});
				}else if(!this.checked){
					$(this).parent().parent().next(".body").find("input:checkbox").each(function(){
						//alert($(this).val());
						$(this).attr('checked',false);
					});
				}
				
			});
			
			var config = {};
	//		config.placeholder = 'Description'; 
//CKEDITOR.replace('ckeditor',config);
    //CKEDITOR.config.height = 300;
	
	
	$.validator.addMethod("regex", function(value, element, regexpr) {          
                 return regexpr.test(value);
               }, "Please enter Only characters"); 
    $('#form_validation_accesscode').validate({
		        rules: {
		            'npromocode': {
		                required: true,
		                minlength: 2,
		                maxlength: 80,
                        regex:  /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
		            },
		            'access_type':{
		                required:true
		            },
		            'lvalidity': {
		                required: true,
                        //regex:  /^[0-9]*$/
		            },
		            'amount': {
		                required: true,
                        //regex:  /^[0-9]*$/
		            },
		            'npeople': {
		                required: true,
                       // regex:  /^[0-9]*$/
		            }, 
		            'access_to':{
		          		 required: true
                     },
                     "checkbox": {
                        required: true,
                        minlength: 1
                    }		            
		        },
		        messages: {
		          name: {
		            required:"Please enter your Access Code",
		            minlength: "Enter name must be at least 6 characters long",
		            maxlength: "Enter name maximum 50 characters allow"
		            },
					access_type:"Please Select Access Type",
					lvalidity : {
						required:"Please enter validity",
						 number: true
					},
					amount : {
						required:"Please enter equivaleant amount",
						 number: true
					},
					npeople : {
						required:"Please enter number of people",
						 number: true
					},
		          	access_to: "Please Select Acces to",
		            description:"Please enter Description",
                    productid: "Please Enter Product Id",
                    "checkbox":"Please select at least one tag"
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
		        	 console.log("dfg");  
		        },
		        success: function(form){
		                             
		        }
		    });

	
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
	
	
	
	$("form").submit(function(e){
		//alert(55);
        e.preventDefault();
    });
	
	$(".codeadd").click(function(){
			var temp=$('#form_validation_accesscode').valid();
		
		
			if(temp == true){	
				var Scat = [];
				var SBundle = [];
				var SSession = [];
				var code = $("#npromocode").val();
				var accesstype = $("#access_type").val();
				var accessto = $("#access_to").val();
			/*	var Eamount = $("#amount").val();*/
				var Npeople = $("#npeople").val();
				var validity = $("#lvalidity").val();
				
							$("input:checkbox:checked").each(function(){
								
								if($(this).hasClass("selsingle")){
										//individual 
									if($(this).data("type") == "Bundle"){
											SBundle.push($(this).val());
									}else if($(this).data("type") == "Session"){
											SSession.push($(this).val());
									}
								}
								
								if($(this).hasClass("catsel")){
									//whole category
									Scat.push($(this).val());
									
								}
							});

			
				 //var desc = CKEDITOR.instances['ckeditor'].getData();
				// var desc = $(".editor").val();
				// alert(desc);
				 //var catnm = $("#catname").val();
				// var cimg = $("#imgurl").val();
				//  var subname = $("#subname").val();
				var currentdate = new Date(); 
					var datetime = +currentdate.getFullYear() + "-"
							+ ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
							+ ("0" + currentdate.getDate()).slice(-2)  + " "  
							+ ("0"+ currentdate.getHours()).slice(-2)  + ":"  
							+ ("0"+ currentdate.getMinutes()).slice(-2) + ":" 
							+ ("0"+currentdate.getSeconds()).slice(-2);
							
				var firebaseRef = firebase.database().ref();

				var catRef = firebaseRef.child("AccessCodes");

				var pushedCatRef = catRef.push();

				// Get the unique key generated by push()
				var qId = pushedCatRef.key;

				catRef.child(code).set({
					accesscode: code,
					maxpeopleallowed: Npeople,
					nopeopleused: 0,
					/*equivaleantamount: Eamount,
					validity: validity,*/
                    startdate: startdate,
                    enddate: enddate,
					acsesstype:accesstype,
					accessto:accessto,
					category: Scat.toString(),
					bundle: SBundle.toString(),
					session: SSession.toString(),
					createdOn: datetime
				}).then(function(snap){
									swal({
											title: "Inserted!",
											text: "Access Code has been Inserted.",
											html:true,
											type: "success",
											showCancelButton: false,
											confirmButtonColor: "#86CCEB",
											confirmButtonText: "OK",
											closeOnConfirm: false
										}, function () {
											// window.setTimeout(function() {
											  window.location.href = "accesscode_list.php";
											//}, 1000);
										});
				});
	}
				//alert(cimg);
		//alert(55);
		
	});
	
});
	</script>
</body>

</html>