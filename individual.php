
<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

//echo $id;
//die;
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$subacat = [];
$bundle = [];
$Bchk = false;
$Schk = false;
$sub = get("Category/Deep Dive");
foreach($sub as $key => $value)
{
		if($key == "SubCategory"){
			
			foreach($value as $k => $v){
				foreach($v as $s => $sa){
              if(isset($v["Bundle"]) && $v["Bundle"] != ""){
                  $Bchk = true;
              }else{
                  $Bchk = false;
              }
          }
          if($Bchk){
				$subacat[] = $v;
          }
			}
			
			
		}
}
$bnd = '';
$bndid = '';
$session = [];
$s=0;
$b=0;
//$id = $_POST['bundle'];

foreach($subacat as $p => $a){
	if(isset($a['Bundle']) ){
//		if($a['subcategory_name'] == $a['Bunlde']['bunlde_category'])
	if($s == 0){
		$sid = isset($_POST['subcatid'])? $_POST['subcatid']:$a['subcategory_id'];
	}
	$bundle[$a['subcategory_id']] = $a['Bundle'];
	foreach($a['Bundle'] as $key => $val){
			//print_r();
			if($b == 0){
				$id = isset($_POST['bundle'])? $_POST['bundle'] : $val['bundle_id'];
			}
	if($id == $val['bundle_id']){
		// $val['Session'];
		$bnd = $val['bundle_name'];
		$bid = $val['bundle_id'];
		foreach($val['Session'] as $sk => $sess){
			if($val['Session'] != "" && isset($val['Session'])){

				$session [] = $sess;
			}
		}
	}
	$b++;
	}
		
	}
	$s++;
}

//print_r($session);

function get($path){
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);


//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Session</title>
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
 <link rel="shortcut icon" href="img/feb.ico" />
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<link rel="stylesheet" href="css/dashboard.css">

<link rel="stylesheet" href="css/footercss.css" type="text/css" >
<!-- <link href="css/individual.css" rel="stylesheet" type="text/css"> -->

<link href="css/owl.carousel.min.css" rel="stylesheet" type="text/css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.10.0/firebase.js"></script>
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
  firebase.initializeApp(config);

</script>
<script type="text/javascript">
			var user = JSON.parse(window.localStorage.getItem('user'));	
	window.h = [];
	firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();

					if(key == "streak"){
						$.map(childData, function(value, index) {
							$.map(value, function(value2, index2) {
								$.map(value2, function(value3, index3) {
									window.h.push(index3);
									console.log(index3);	
								});
							});
						});
					}

			});
			window.localStorage.setItem("SessionHistory2",JSON.stringify(window.h));
		});
</script>

<style type="text/css">
  .btn2 {
  display: inline-block;
  font-weight: 400;
  color: #FFF;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 1.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.current{
	
	font-weight: 550;
	color: #727 !important;
}
.list1 p {  
	 color: #34495e;
	 font-size: 21px;

}
.list ul li  {
	font-size: 18px;
	color: gray;
		cursor: pointer;
		list-style: disc;
}

.currentbundle{
	
	font-weight: bold;
}
.boxStyle{
	height: 240px;
}
@media(min-width:2560px){
}


@media (max-width:425px){
	
.hover-box1 {
  width: 100%;
  height: auto;
}
.boxStyle{
	height: 167px;
}

.btn2 {
    font-size: 11px!important;
    margin: 4px 0;
}
}	
@media (max-width:768px) and (min-width: 424px){
.hover-box1 {
  width: 100%;
  height: 155px;
}
.boxStyle{
	height: 168px;
}
      .bundle{
      	font-size: 15px;
      }
}

.owl-text-overlay {
  position: absolute;
  text-align: center;
  width: 60%;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.4);
  padding-bottom: 20px;
  font-family: "Open Sans", sans-serif;
  border-radius: 1px 1px 1px 1px;
}

h2.owl-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
}

p.owl-caption {
  font-size: 18px;
  line-height: 24px;
 /* margin: auto;*/
}

.box1a {
/*	width: 100%;
           height: 100%;
           background-color: rgba(0,0,0,0.5);
           position: absolute;
           text-align: center;*/
       }

    .box1a i {color: #fff;
            font-size: 28px;
           /* margin-left: 41%;
            margin-top: 29%;*/
            }
.side-scroll{
  max-height: 594px;
  overflow-y : scroll;
  overflow-x: hidden;
}
/*.side-scroll::-webkit-scrollbar {
    width: 0.5em;
}
.side-scroll::-webkit-scrollbar-thumb {
    background: #80429c;
}
.side-scroll::-moz-scrollbar:vertical {
    width: 0.5em;
}
.side-scroll::-moz-scrollbar-thumb:vertical {
    background: #80429c;
}*/

/* Page Loader ================================= */
.page-loader-wrapper {
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: hidden;
  text-align: center; }
  .page-loader-wrapper p {
    font-size: 13px;
    margin-top: 10px;
    font-weight: bold;
    color: #444; }
  .page-loader-wrapper .loader {
    position: relative;
    top: calc(50% - 30px); }

</style>

</head>

<body style="margin-top: 150px;">
	 <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <!-- <div class="loader"> -->
       <img src="img/loader.gif" style="margin-top: 10% !important;">
     <!-- </div> -->
    </div>
    <!-- #END# Page Loader -->
<!--HEADER-->
<?php include 'dashbordHeader.php'; ?>
<div class="container-fluid" >
  <div class="container">
     <div class="row mt-5">

           <div class="col-md-4 col-lg-3 mt-5 side-scroll">
			  <?php 
			  //echo $id;
			  //die;
				
			  //echo $id;
			  //die;
				$sidebar = '';
				foreach($subacat as $skey => $s){
					if($sid == $s['subcategory_id']){
					 $sidebar .= '<div class="row  list1"><p  id='.$s['subcategory_id'].'>'.$s['subcategory_name'].'</p></div>';
						
					}else{
						
					 $sidebar .= '<div class="row list1"><p id='.$s['subcategory_id'].'>'.$s['subcategory_name'].'</p></div>';
					}
					 if(count($bundle)>0){
						 if(!empty($bundle[$s['subcategory_id']])){
						 $sidebar .= '<div class="row  list"><ul>';
						 foreach($bundle as $bk => $bv){
								 
							 
									foreach($bv as $bkey => $bval){										
							 if($s['subcategory_name'] == $bval['bundle_category']){
									if($bid == $bkey){
										
										$sidebar .= '<li class="current" data-cat='.$s['subcategory_id'].' id='.$bval['bundle_id'].'>'.$bval['bundle_name'].'</li>';
									}else{
										$sidebar .= '<li  data-cat='.$s['subcategory_id'].' id='.$bval['bundle_id'].'>'.$bval['bundle_name'].'</li>';	
									}
							 }
									}
						 }
						 $sidebar .= '</ul></div>';
						 }
					 }
					 
				}
			 echo $sidebar;
			// die;
			  ?>
			
			  <!--- <div class="row justify-content-center justify-content-md-end list1">
			       <p>Cultivate</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       <ul>
				     <li>testsdg</li>
					 <li>CultivateOne</li>
				   </ul>
			   </div>
			   
			   <div class="row justify-content-center justify-content-md-end list1">
			       <p>Explore</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       
			   </div>
			   
			   <div class="row justify-content-center justify-content-md-end list1">
			       <p>Forgive</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       
			   </div> 
			   <div class="row justify-content-center justify-content-md-end list1">
			       <p>Student Life</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       
			   </div>
			   <div class="row justify-content-center justify-content-md-end list1">
			       <p>Parenthood</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       
			   </div>
			   <div class="row justify-content-center justify-content-md-end list1">
			       <p>Inspired Living</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       
			   </div>
			   <div class="row justify-content-center justify-content-md-end list1">
			       <p>Creativity</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       
			   </div>
			   <div class="row justify-content-center justify-content-md-end list1">
			       <p>Relationships</p>
			   </div>
			   <div class="row justify-content-center justify-content-md-end list">
			       
			   </div>-->
			
		   </div>
		   
    
           <div class="col-md-8 col-lg-9 sess">
                
			   <h3 style="margin-bottom: 50px;color: #34495e;font-size: 26px;text-align: justify;" id="<?php echo $bid;?>"><?php echo $bnd;?></h3>
                    <div class="row mx-lg-5 mx-md-3 justify-content-center justify-content-md-start">
           <!--BOX1-->
					<?php
					 $i=0;
					 $count = 1 ;
					$SeS = '';
						foreach($session as $sk => $sv){
							if(strlen($sv['session_description']) > 25){
								
							$small = substr($sv['session_description'], 0, 25).'....';
							}else{
								$small = substr($sv['session_description'], 0, 25);
							}
							$SeS .= '<div class="col-lg-4 col-md-6 col-7 hover-box1 p-0 boxStyle deepin" style=" background-image: url('.$sv['session_img'].');" id="'.$i.'"><p class="Center bundle" id="'.$sv['session_id'].'">'.$sv['session_name'].'</p><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'.$small.'</p><div class="btn btn2 btn-outline-light" id="'.$sv['session_id'].'" data-count="'.$count.'" style="border-radius: 0;">Start to DiveThru</div></div></div>';
							$i=0;
							$count ++;
						}	
						echo $SeS;
			//			die;
					?>
           
                    </div>
           
           </div>

      </div>
</div>
</div>
<br><br>
<?php include 'footer.php'; ?>



<!-- <script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script> -->
      <script type="text/javascript" src="js/jquery.redirect.js"></script>
     <script src="js/dashboardheader.js" type="text/javascript"></script>
     <script src="js/signout.js"></script>

<script src="js/bootstrap.bundle.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
 var pos = $(".current").position().top;
 $( "div.side-scroll" ).scrollTop((pos-10));
window.localStorage.removeItem("Dname");
		var user = JSON.parse(window.localStorage.getItem('user'));	

//function streak(){
	window.h = [];
	firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();

					if(key == "streak"){
						$.map(childData, function(value, index) {
							$.map(value, function(value2, index2) {
								$.map(value2, function(value3, index3) {
									window.h.push(index3);
									console.log(index3);	
								});
							});
						});
					}

			});
			window.localStorage.setItem("SessionHistory2",JSON.stringify(window.h));
		});
//}

			var catRef = firebase.database().ref("Users").child(user.user_id);
			
			//console.log(catRef);
			// firebase.database().ref('Users/'+user.user_id+"/streak").set(null);
    catRef.on('child_changed', function(snapshot) {
			
window.h = [];
	firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();

					if(key == "streak"){
						$.map(childData, function(value, index) {
							$.map(value, function(value2, index2) {
								$.map(value2, function(value3, index3) {
									window.h.push(index3);
									console.log(index3);	
								});
							});
						});
					}

			});
			window.localStorage.setItem("SessionHistory2",JSON.stringify(window.h));
		});

  });
	console.log(window.localStorage.getItem("SessionHistory2"));
		/*var user = JSON.parse(window.localStorage.getItem('user'));	
			//for get session paid detail
		var cname="/IndividualSubscription";
		var subcate_index=[];
		var final_conve_data=[];
			
		
		window.cat_index=0;
		firebase.database().ref("Users/"+user.user_id+cname+"/bundle").once("value",function(snapshot){
									//alert();
			snapshot.forEach(function(childSnapshot) {
	  		console.log(childSnapshot.val());
	  		//alert(childSnapshot.val());
	  		childData=childSnapshot.val();
	      final_conve_data.push(childData['id']);
				
			});
				$( ".col-md-8 > 	.row" ).each(function( index ) {
					var bid = $(this).find("h2").attr('id');
					//alert(bid);

						$(this).find( "div.boxStyle" ).each(function( index ) {
							console.log($("div.boxStyle").index() );
							//alert(index);
					
							if($.inArray(bid,final_conve_data) > -1){

								$(this).remove('<div class="box1a"><i class="fa fa-lock fa-2x center"></i></div>');
							}
						});
						
				  		
					});
		});*/

	});
	//console.log(final_conve_data);
//localStorage.setItem('package_type','bundle');
if(window.performance.navigation.type>0){
	window.localStorage.setItem("back",true);
}else{
	window.localStorage.setItem("back",false);	
}
	
	/* Sign out method 

function sign_out(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  		window.location = "index.php";
		}, function(error) {
		  // An error happened.
		   console.log("Logout Failed!", error);
		});
	}
*/
$('a').each(function(){
                var path = window.location.href;
                var current = path.substring(path.lastIndexOf('/')+1);
                var url = $(this).attr('href');
                if(url == current ){
                    $(this).addClass('active');
                };
                if($(this).text() == "DEEP DIVE"){
                    $(this).addClass('active');

                }
            });  


	$(".nav-link").click(function(e){
e.preventDefault();
console.log($(this).next().find("dropdown-item"));
//$(".dropdown-item").click(function(){
	var cat = $(this).text();
		if(cat == "HOME"){
		window.location = "dashboard.php";
	}
	firebase.database().ref("Category").on("value",function(snapshot){
			snapshot.forEach(function(childSnapshot) {

				if(childSnapshot.hasChild("Bundle") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("SubCategory").val() != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				console.log("quick");
				//window.location = "quickdive.php";
				
			}
			if(childSnapshot.hasChild("SubCategory") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("SubCategory").val() != "" ){
				//alert($(this).hasClass('nav-link dropdown-toggle dropdown-toggle1'));
				
				window.localStorage.setItem("cat",childSnapshot.key);
				console.log("quick");
				window.localStorage.setItem("back",false);
				if(cat=="QUICK DIVE")
				{
						window.location = "quickdive.php";
				}

						
			


				
			}
			if( (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("SubCategory").val() == ""){
				console.log("open");
				window.localStorage.setItem("cat",childSnapshot.key);
				//window.location = "opendive.php";
				window.location = "session.php";
			}
			});
	});
	

});

	/* End of Sign out*/

window.localStorage.removeItem("bundle");
		window.localStorage.removeItem("Snm");
		var user = JSON.parse(window.localStorage.getItem('user'));	
		var oldb = window.localStorage.getItem("bid");
		
	
	var Shistory = JSON.parse(window.localStorage.getItem("SessionHistory2"));

	/*$(".card").click(function(){
			var session = [];
		var bid = $("h2").attr('id');
		var subid = $(".current").attr('id');
		var sessionid = $(this).find(".center > p").attr("id");
				firebase.database().ref("Category/Deep Dive/SubCategory/"+subid+"/Bundle/"+bid).on("value", function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
							childData = childSnapshot.val(); 
					if(childSnapshot.key == "Session"){
						
							$.map(childData, function(value, index) {
									if(index == sessionid){
										window.localStorage.setItem("session",JSON.stringify(value));
								console.log(value);
									}
							});
						if(Object.keys(childSnapshot.val()) == sessionid){
							session.push(childSnapshot.val());
							console.log(childSnapshot.val());
						}
					}
						window.localStorage.setItem("cat","Deep Dives");
				//$.redirect("player.php",{cat: "Deep Dives"},"POST",null,null,true);
				});
						
	});

		//$.redirect("DeepMain.php",{bundle: id},"POST",null,null,true);
		alert(sessionid);
	});*/

															
//if(user.membership_type == 'Free'){

								//$("div.boxStyle").append('<div class="box1a"><i class="fa fa-lock fa-2x center"></i></div>');
								/*$( ".col-md-8 > 	.row" ).each(function( index ) {
								var bid = $(this).find("h2").attr('id');
								//alert(bid);
									
									$(this).find( "div.boxStyle" ).each(function( index ) {
										console.log($("div.boxStyle").index() );
										//alert(index);
										if(index != 0){

											$(this).append('<div class="box1a"><i class="fa fa-lock fa-2x center"></i></div>');
										}
									});
									
							  		
								});*/
							
			var catRef = firebase.database().ref("Users").child(user.user_id);
			
			//console.log(catRef);
			// firebase.database().ref('Users/'+user.user_id+"/streak").set(null);
    // catRef.on('child_changed', function(snapshot) {

    // });
		var cname="/IndividualSubscription";
		var subcate_index=[];
		var final_conve_data=[];
			
		
		window.cat_index=0;
		firebase.database().ref("Users/"+user.user_id+cname+"/bundle").once("value",function(snapshot){
									//alert();
			snapshot.forEach(function(childSnapshot) {
	  		console.log(childSnapshot.val());
	  		//alert(childSnapshot.val());
	  		childData=childSnapshot.val();
	      final_conve_data.push(childData['id']);
				
			});
			console.log(final_conve_data);

//					var totalLen = 1 ;		
				$( ".col-md-8 > 	.row" ).each(function( index ) {
					var bid = $(".current").attr("id");
//alert(totalLen+index);
	var Shistory = JSON.parse(window.localStorage.getItem("SessionHistory2"));
						$(this).find( "div.boxStyle" ).each(function( index ) {
							var trace = index;
							var sid = $(this).find("p").attr("id");
							console.log(JSON.parse(window.localStorage.getItem("SessionHistory2")));
							
							/* May be issue comes becuase can't check $.inArray(sid,Shistory) <= -1*/
							if(index != 0 && $.inArray(bid,final_conve_data) == -1 && user.membership_type == 'Free' ){

								$(this).append('<div class="box1a" style="width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);position: absolute;text-align: center;"><i class="fa fa-lock fa-2x center" style="left: 88%;top: 88%;"></i></div>');
							}
							/* May be issue comes becuase can't check $.inArray(sid,Shistory) <= -1 */

							if($.inArray(sid,Shistory) != -1 ){

								if(user.membership_type == 'Free'){
									//alert("check");

									// Code for making lock icon on next to next session 

									if(index == 0 && $.inArray(bid,final_conve_data == -1)){
// alert(index);
									$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0);"><i class="fa fa-check-circle fa-2x center" style="top: 88%;left: 88%;"></i></div>');
									}else if(index != 0  && final_conve_data.length != 0 && $.inArray(bid,final_conve_data != -1)){
// alert(index);
									$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0);"><i class="fa fa-check-circle fa-2x center" style="top: 88%;left: 88%;"></i></div>');

									}

								}else if(user.membership_type != 'Free'){
									//alert(222);
									$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0);"><i class="fa fa-check-circle fa-2x center" style="top: 88%;left: 88%;"></i></div>');
								}

								//$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0)"><i class="fa fa-check-circle fa-2x center"></i></div>');
							}
							if($.inArray(sid,Shistory) != -1 && user.membership_type != "Free"){

//alert(sid);
								$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0);"><i class="fa fa-check-circle fa-2x center" style="top: 88%;left: 88%;"></i></div>');
							}
						});
						
				  		
					});
 $(".page-loader-wrapper").fadeOut();	
		});
//}


$('.hover-box1').each(function(){
								$(this).hover(function() {
								$(".hover-box1a").removeAttr('style');
								$(this).find(".hover-box1a").css("top",0);
	         				 //$(this).toggleClass('hover-box1a');
								});
							});


	
			//$(".sess").html("");
		$(".row > ul > li").click(function(){
			$("ul > li").removeClass("current");
			$(this).addClass("current");
			var subid = $(this).data("cat");
			
			var bid = $(this).attr("id");
			var content = '';
			firebase.database().ref("Category/Deep Dive/SubCategory/"+subid+"/Bundle/"+bid).on("value", function(snapshot) {
					childData1 = snapshot.val(); 
				snapshot.forEach(function(childSnapshot) {
					childData = childSnapshot.val(); 
					var i = 0;
					var count = 1;
					content += '<h3 style="margin-bottom: 50px;color: #34495e;font-size: 26px;" id="'+childData1.bundle_id+'">'+childData1.bundle_name+'</h3>';
					if(childSnapshot.key == "Session"){
					//alert(Object.keys(childData).length);
						content += ' <div class="row mx-lg-5 mx-md-3 justify-content-center justify-content-md-start">';
						$.map(childData, function(value, index) {
							if(value.session_description.length >= 25){

							var desc = value.session_description.substring(0, 25)+ '....';

							}else{
								
							var desc = value.session_description.substring(0, 25);
							}

							content += '<div class="col-lg-4 col-md-6 col-7 hover-box1 p-0 boxStyle deepin" style=" background-image: url('+value.session_img+');" id="'+i+'"><p class="Center bundle" id="'+value.session_id+'">'+value.session_name+'</p><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" id="'+value.session_id+'" data-count="'+count+'" style="border-radius: 0;">Start DiveThru</div></div></div>';
							i++;
							count++;
						});
						content += '</div>';
				
							$(".sess").html(content);
							

															
								//	if(user.membership_type == 'Free'){

								//$("div.boxStyle").append('<div class="box1a"><i class="fa fa-lock fa-2x center"></i></div>');
								/*$( ".col-md-8 > 	.row" ).each(function( index ) {
								var bid = $(this).find("h2").attr('id');
								//alert(bid);
									
									$(this).find( "div.boxStyle" ).each(function( index ) {
										console.log($("div.boxStyle").index() );
										//alert(index);
										if(index != 0){

											$(this).append('<div class="box1a"><i class="fa fa-lock fa-2x center"></i></div>');
										}
									});
									
							  		
								});*/
							

		var cname="/IndividualSubscription";
		var subcate_index=[];
		var final_conve_data=[];
			
		
		window.cat_index=0;
		var check = true;
		firebase.database().ref("Users/"+user.user_id+cname+"/bundle").once("value",function(snapshot){
									//alert();
			snapshot.forEach(function(childSnapshot) {
	  		console.log(childSnapshot.val());
	  		//alert(childSnapshot.val());
	  		childData=childSnapshot.val();
	      final_conve_data.push(childData['id']);
				
			});
				$( ".col-md-8 > 	.row" ).each(function( index ) {
					var bid = $(".current").attr("id");
					

						$(this).find( "div.boxStyle" ).each(function( index ) {
							var sid = $(this).find("p").attr("id");
							//variable for managing session for making lock ,tick and open icon
							var trace = index;
							console.log(final_conve_data);
					
							if(index != 0 && $.inArray(bid,final_conve_data) == -1 && user.membership_type == 'Free'){
//alert(5);
								$(this).append('<div class="box1a" style="width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);position: absolute;text-align: center;"><i class="fa fa-lock fa-2x center" style="left: 88%;top: 88%;"></i></div>');
							}
							
							if($.inArray(sid,Shistory) != -1 && user.membership_type != "Free"){
								//alert(sid);
								$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0);"><i class="fa fa-check-circle fa-2x center" style="top: 88%;left: 88%;"></i></div>');
								check = false;
							}else{
								//alert(index);
								//alert(index+"=="+(trace+2));
								if(index == 0 && $.inArray(sid,Shistory) != -1 && user.membership_type == 'Free'){
									//alert(check);
									// Code for making lock icon on next to next session 
									$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0);"><i class="fa fa-check-circle fa-2x center" style="top: 88%;left: 88%;"></i></div>');
								}else if ($.inArray(bid,final_conve_data) != -1&& $.inArray(sid,Shistory) != -1 && user.membership_type == 'Free'){
										$(this).append('<div class="box1a" style="background-color:rgba(0,0,0,0.0);"><i class="fa fa-check-circle fa-2x center" style="top: 88%;left: 88%;"></i></div>');
								}
							}
						});
						
				  		
					});
		});
		//}
							$('.hover-box1').each(function(){
								$(this).hover(function() {
								$(".hover-box1a").removeAttr('style');
								$(this).find(".hover-box1a").css("top",0);
	         				 //$(this).toggleClass('hover-box1a');
								});
							});

					}
			});
			});
						/*$('.hover-box1').hover(function() {
								$(".hover-box1a").css("top",0);
         		 				//$(this).toggleClass('hover-box1a');
     						});*/
		
		});
		
		
		/*$('body').on('hover', '.hover-box1', function() {

						$(".hover-box1a").css("top",0);

		});*/
		$('body').on('click', '.btn', function() {
			var subid = $(".current").data("cat");
			var bid = $(".current").attr("id");
			var bundle = $(".current").text();
			var sessionid = $(this).attr("id");
			var CN = $(this).data("count");
			//alert("s"+subid);
			firebase.database().ref("Category/Deep Dive/SubCategory/"+subid+"/Bundle/"+bid).on("value", function(snapshot) {
						snapshot.forEach(function(childSnapshot) {
											childData = childSnapshot.val(); 
									if(childSnapshot.key == "Session"){
											$.map(childData, function(value, index) {
													if(index == sessionid){
										window.localStorage.setItem("Slen",Object.keys(childData).length);
														window.localStorage.setItem("session",JSON.stringify(value));
												console.log(value);
													}
											});
										/*if(Object.keys(childSnapshot.val()) == sessionid){
											session.push(childSnapshot.val());
											console.log(childSnapshot.val());
										}*/
									}
										window.localStorage.setItem("cat","Deep Dive");
										window.localStorage.setItem("bundle",bundle);
										window.localStorage.setItem("subcategory_id",subid);
										window.localStorage.setItem("bid",bid);
										window.localStorage.setItem("streak",CN);
									window.localStorage.setItem("subcription_type","paid");
								$.redirect("player.php",{cat: "Deep Dive"},"POST",null,null,true);
						});
					});
			});


		
	
</script>
</body>
</html>
