<?php 
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;


$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$user = get("Users");
$Deep = get("Category/Deep Dive");
$Quick = get("Category/Quick Dive");

function get($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}

//$Dbundle = [];
foreach($Deep as $k => $v){

	if($k == "SubCategory"){
		foreach($v as $kl => $vl){
			if($vl["Bundle"] != ""){
				
				foreach($vl["Bundle"] as $k1 => $v1){
						$Dbundle[$k1] = $v1["bundle_name"];
						$D[] = $k1;

				}
			}
		}
	}
}

foreach($Quick as $k => $v){

	if($k == "SubCategory"){
		foreach($v as $kl => $vl){
								$Qsubcat[$kl] = $vl["subcategory_name"];
						$Q[] = $kl;
			/*if($vl["Session"] != ""){
				
				foreach($vl["Session"] as $k1 => $v1){
						$Qsesssion[$k1] = $v1["sesssion_name"];
						$D[] = $k1;

				}
			}*/
		}
	}
}
	//	print_r($Qsubcat);
$t = [];
$tQ = [];
$tot = 0;
$tot2 = 0;
$i =0;
						foreach($D as $dk => $dv){
$tot = 0;
foreach($user as $k => $V){
	if(isset($V['streak'])){
		if($V['streak'] != ""){
		foreach($V['streak'] as $ky => $vl){
			
				foreach($vl as $k2 => $v2){
					foreach($v2 as $k3 => $v3){
							
						if($ky == $dv){
							
$tot= $tot + $v3["total_visited"]."</br>";

							$t[$Dbundle[$ky]] = $tot;
						}
						

						}
					}
				}
		}
		}
	}
}

foreach($Q as $qk => $qv){
							$tot2=0;
foreach($user as $k => $V){
	if(isset($V['streak'])){
		if($V['streak'] != ""){
		
		foreach($V['streak'] as $ky => $vl){
			
				foreach($vl as $k2 => $v2){
					foreach($v2 as $k3 => $v3){
							
						if($ky == $qv){
							
							//echo $ky."==".$qv;
$tot2= $tot2 + $v3["total_visited"]."</br>";
//echo $tot2;
							$tQ[$Qsubcat[$ky]] = $tot2;
						}
						

						}
					}
				}
			}
		}
	}
}


$monthly = 0;
$yealry = 0;
$lifetime = 0;
$deepbundle = 0;
$quicksession = 0;
$purchasesesession = [];
$purchasebundle = [];
foreach($user as $k => $V){
	if(isset($V['IndividualSubscription'])){
		if($V['IndividualSubscription'] != ""){	
			foreach($V['IndividualSubscription'] as $key => $val){
				if($key == "session"){
					foreach($val as $k3 => $v3){
		//				print_r($v3['id'])."</br>";
						$quicksession++;
					}
				}
				if($key == "bundle"){
						//$purchasebundle[]] = $v3['id']; 
//						print_r($v3['id'])."</br>";
					foreach($val as $k4 => $v4){
						$deepbundle++;
					}
				}
			}
		}
	}
		if(isset($V['payment'])){
		if($V['payment'] != ""){
				
			foreach($V['payment'] as $ky => $vl){
				foreach($vl as $k2 => $v2){
						if($k2 == "subscription_type"){
							if($v2 == "Monthly"){
								$monthly++;
							}
							if($v2 == "Yearly"){
								$yealry++;
							}
							if($v2 == "Lifetime"){
								$lifetime++;
							}
							
						}
					}
				}
			}
		}
	}
	
	
/*echo $deepbundle."===".$quicksession;*/
arsort($t,1);
arsort($tQ,1);
$popularbundle;
$popularsubcategory;
foreach($t as $kt => $vt){
		$popularbundle = $kt;
		break;
}
foreach($tQ as $ktQ => $vtQ){
		$popularsubcategory = $ktQ;
		
		break;
}

$d =0 ;
$q =0 ;
$numuserofbundle=0;
$numuserofbundlecomp=0;
$numuserofsubc=0;
$numuserofsubccomp=0;
$Dcompletdsession = 0;
$Qcompletdsession = 0;
print_r($purchasebundle);
foreach($Deep as $k => $v){

	if($k == "SubCategory"){
		foreach($v as $kl => $vl){
			if($vl["Bundle"] != ""){
				
				foreach($vl["Bundle"] as $k1 => $v1){
						 if($popularbundle == $v1["bundle_name"]){
							 $Pbundleid = $v1["bundle_id"];
								 if($v1["Session"] != ""){
									foreach($v1["Session"] as $ks => $vs){
										$deepcompltedsession[] = $ks;
									//print_r($ks)."</br></br></br>";
							$d++;
									}
								 }
						}
				}
			}
		}
	}
}




foreach($Quick as $k => $v){

	if($k == "SubCategory"){
		foreach($v as $kl => $vl){
				if($popularsubcategory == $vl["subcategory_name"]){
									$Psubcatid  = $vl["subcategory_id"];
									
								 if($v1["Session"] != ""){
									foreach($vl["Session"] as $ks => $vs){
										$quickcompltedsession[] = $ks;
									//print_r($ks)."</br>";
									$q++;
									}
								 }
				}
		}
	}
}


$totaluser = 0;
foreach($user as $k => $V){
	if(isset($V['streak'])){
		if($V['streak'] != ""){
		foreach($V['streak'] as $ky => $vl){
			
				foreach($vl as $k2 => $v2){
					foreach($v2 as $k3 => $v3){
							
						if($ky == $Pbundleid){
							$Dcompletdsession += count($v2); 
							if(count($v2)==$d){
								$numuserofbundlecomp++;
							}
						//	echo $k."==".$k3."</br>";
						$numuserofbundle++;
						}
						
						if($ky == $Psubcatid){
							$Qcompletdsession += count($v2);
							if(count($v2)==$q){
								$numuserofsubccomp++;
							}
						//	echo $k."==".$k3."</br>";
						$numuserofsubc++;
						}
						

						}
					}
				}
		}
		}
		$totaluser++;
	}
	
	

//Quick dive& Deep dive session breakdown
$Qses=[];
//print_r($Qsubcat);
foreach ($Qsubcat as $key => $value) {


	foreach($Quick as $k => $v){
		
		if($k == "SubCategory"){

			foreach($v as $kl => $vl){
									//$Qsubcat[$kl] = $vl["subcategory_name"];
									//$Qses[$kl] = $vl["subcategory_name"];
							//$Q[] = $kl;
//print_r($vl);
							
				 if($vl["Session"] != ""){
					
				 	foreach($vl["Session"] as $k1 => $v1){
				 		//print_r($kl);
				 			if($key==$kl){
				 				$Qses[$vl['subcategory_name']." , ".$v1['session_name']]=$v1['session_id'];
				 			}

				 	}
				 }
			}
		}
	}
}
//print_r($Dbundle);
foreach ($Dbundle as $key => $value) {
		
	foreach($Deep as $k => $v){

		if($k == "SubCategory"){
			foreach($v as $kl => $vl){
				if(isset($vl["Bundle"])){
				if($vl["Bundle"] != ""){
					//print_r($vl["Bundle"]);
					foreach($vl["Bundle"] as $k1 => $v1){
					//print_r($k1);
							 if($key==$k1){
						//print_r($key."==".$v1['bundle_id']);
					 	 			$Qses[$v1['bundle_name']]=$v1['bundle_id'];
					 	 		}

					}
				}
			}
			}
		}
	}
}
//print_r($Qses);
$totses = 0;
$totses1=0;
$totsesQ=[];
$totsesD=[];
foreach ($Qses as $key => $value) {
	$totses = 0;
	$totses1=0;
//print_r($value);
	foreach($user as $k => $V){
		if(isset($V['IndividualSubscription'])){
			if($V['IndividualSubscription'] != ""){
				foreach($V['IndividualSubscription'] as $ky => $vl){
						//print_r($vl);
						if($ky=="session")
						{
							foreach($vl as $kt => $vt){
								if($value==$vt['id']){
									$totses= $totses + 1;
									$totsesQ[$key] = $totses;
									//print_r($totses1);
								}
							}
						}
						elseif($ky=="bundle")
						{
							foreach($vl as $kt => $vt){
								if($value==$vt['id']){
									$totses1= $totses1 + 1;
									$totsesD[$key] = $totses1;
									//print_r($totses1);
								}
							}
						}
				}
			}
		}
	}
}
//PRINTING SESSION WISE DATA ODQUICK DIVE
//print_r($totsesQ);
//PRINTING BUNDLE WISE DATA DEEP DIVE
//print_r($totsesD);
//print_r($totses1);	
	

$DCOMPETION = round(($numuserofbundlecomp*100)/$numuserofbundle); // completion/bundle in percentage DEEP
$DSCOMPETION = round(($Dcompletdsession*100)/($totaluser * $d));  // completion/session in percentage DEEP
$QCOMPETION =  round((($numuserofsubccomp*100)/$numuserofsubc)); // completion/subcategory in percentage QUICK
$QSCOMPETION = round(($Qcompletdsession*100)/($totaluser * $q)); // completion/session in percentage QUICK
//echo $QSCOMPETION;	
//print_r($maxs);
//die;
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>My Streak</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link href="css/mystreak.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/dashheader.css">
<link href="css/journel.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/footercss.css" type="text/css">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
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
  // var config = {
  //   apiKey: "AIzaSyBwDEs5JfwQNSRKCDMHE9TrVlWArbYG9NU",
  //   authDomain: "divethrutest.firebaseapp.com",
  //   databaseURL: "https://divethrutest.firebaseio.com",
  //   projectId: "divethrutest",
  //   storageBucket: "divethrutest.appspot.com",
  //   messagingSenderId: "19401978174"
  // };
  firebase.initializeApp(config);
        </script>
<style>
.hidden{
	display: none;
}
/* Modal css */
.col-c{
	    width: 648px;
    min-width: 648px;
    margin-right: 24px;
    flex: 0 1 0%;
}
.col-c2{
	 width: 456px;
    min-width: 456px;
    margin-right: 0px;
    flex: 0 1 0%;
}
.col-c3{
	 padding-left: 40px;
	 flex-basis: 100%;
    flex: 0 1 0%;
}
.share{
	
      font-size: 24px;
    line-height: 32px;
    margin: 0px 0px 40px;
    text-align: center;
    font-family: Apercu, sans-serif;
    font-style: normal;
    letter-spacing: 2.5px;
    /* font-size: 16px; */
    font-weight: 600;
    text-transform: uppercase;
    color: rgb(90, 97, 117);
}
.css-wlgw4p{
	    -webkit-box-align: center;
    font-size: 24px;
    line-height: 40px;
    display: flex;
    font-weight: 400;
    align-items: center;
    margin-bottom: 24px;
    font-family: Apercu, sans-serif;
    font-style: normal;
    color: rgb(90, 97, 117) !important;
	margin-left: 12%;
}
.close2{
	    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 3%;
    /*padding: 32px;*/
	font-size: 55px;
	color: rgb(90, 97, 117);;
}
.modal-share{
	max-width: 60% !important;
}
.share2{
		display: none;
	}
.share{
		display: block;
	}	
	
@media (max-width: 425px){
	.modal-share-content{
		width: 100%;
		height: 100%;
	}
	.share2{
		display: unset;
		width: 100%;
	}
	.col-c3{
	 padding-left: 0;
	 flex-basis: 100%;
    flex: 0 1 0%;
	padding-top: 20%;
}
	.share{
		display: none;

	}
	
	.modal-share{
		max-width: 100% !important;
	}
	i.fa.fa-facebook,i.fa.fa-twitter,i.fa.fa-link{
		margin-right: 15px;
	}
}
</style>
</head>

<body>

<!--HEADER-->
	
<?php  // include 'dashbordHeader.php'; ?>

<!--	
BODY-->

<!--SLIDER-->

<div class="container-fluid slider-bg py-5">

	<div class="container">
	     <button name="btn" class="btn-info" id="modal">MODAL</button>
		<div class="row justify-content-center text-center">
		     
			<div class="col-2 text-right">
			    <h2 class="center1">Current</h2>
			</div>
			
			<div class="col-6 col-md-3">
			    <div class="card text-white card1">
                     <img class="card-img1 marg" src="img/triangle.png" style="max-width: 150px; height: auto;">
                            <div class="card-img-overlay1 center triangle">
                                     <p class="pt-4">5<br>Day</p>
                            </div>
                </div>
			</div>
			
			<div class="col-2">
			    <h2 class="center2">Streak</h2>
			</div>
		</div>
		
	</div>

</div>
<!--Onload Modal start -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-share" role="document" >
    <div class="modal-content modal-share-content" >
      <div class="modal-header text-center">
	  				<h2 class="share2 modal-title">SHARE</h2>
       <div  class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </div>
      </div>
      <div class="modal-body">
	  <div class="row">
		<div class="col-md-6">
			<img src="http://localhost/DiveThru/10_day_program/qoute/quote%201.png" style="width:100%;"/>
		</div>
		<div class="col-md-6" style="margin:auto;">
			<div class="col-c3">
				<p class="share">SHARE</p>
				<div style="display:block;">
					<a class="css-wlgw4p"><i class="fa fa-facebook fa-lg white-text mr-md-3"> </i> Facebook</a>
				</div>
				<div style="display:block;">
					<a class="css-wlgw4p"><i class="fa fa-twitter fa-lg white-text mr-md-3"> </i> Twitter</a>
				</div>
				<div style="display:block;">
					<a class="css-wlgw4p"><span><i class="fa fa-link fa-lg white-text mr-md-3"></i></span> Copy Link</a>
				</div>
			</div>
		</div>
		</div>
      </div>
      
  </div>
</div>
</div>
 <!--Onload modal end -->

<!--FOOTER-->
<?php  include 'footer.php'; ?>

<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script type="text/javascript">
		$(document).ready(function(){
			
			$("#modal").click(function(){
			

				$("#memberModal").modal("show");
			});
			
			window.monthly = [];
			window.yearly = [];
			window.lifetime = [];
			window.deepdive = [];
			window.deepdivebundle = [];
			window.Dbundle = [];
			window.Qbundle = [];
			window.QSession = [];
			window.quickdive = [];
			window.quickdivebundle = [];
			window.st = 0;
			window.streak = [];
			window.strid = [];
			window.android = 0;
			window.ios = 0;
			window.pc = 0;
				firebase.database().ref("Category").on("value", function(snapshot) {
					snapshot.forEach(function(childSnapshot) {
					// key
						var key = childSnapshot.key;
					// value, could be object
						var childData = childSnapshot.val();
						
						if(childData.session_subcription_type != 'Free' && childSnapshot.hasChild('SubCategory') && childSnapshot.child('SubCategory').val() != ""){
							if(key == "Deep Dive"){
							
								$.map(childData.SubCategory, function(value, index) {
									$.map(value.Bundle, function(value, index) {
window.Dbundle[index]= value.bundle_name;
										window.deepdivebundle.push(index);
//alert("Deep");
									});
								});
							}
							
							if(key == "Quick Dive"){
								$.map(childData.SubCategory, function(value, index) {
										window.quickdivebundle.push(index);
window.Qbundle[index]= value.subcategory_name;
if(value.Session != ""){
//alert("Quick");
	
									$.map(value.Session, function(value, index2) {
										//alert(index2);
											window.QSession[index] = value.session_name;
									});
}
								});
							}
							
						}
						
					});	
				});	
									//		console.log(window.quickdivebundle);
				var i = 1;
				var j = 0;
				window.chk = true;
				firebase.database().ref("Users").on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				//alert(i+"=="+key);
				// value, could be object
				var childData = childSnapshot.val();
				$.map(childData, function(value, index) {
					if(index == "device_type" ){
						if(value == "ios"){
							window.ios++;
						}else if(value == "Desktop"){
							window.pc++;
						}else if(value == "android"){
							window.android++;
							
						}
						
					}
					if(index == "payment" ){
						$.map(value, function(value, index) {
							if(value.subscription_type == "Monthly"){
								window.monthly.push(value);
							}							
							if(value.subscription_type == "Yearly"){
								window.yearly.push(value);
							}
							if(value.subscription_type == "LifeTime"){
								window.lifetime.push(value);
							}
							
						});
					}

					if(index == "IndividualSubscription"){
						$.map(value, function(value, index) {
							if(index == "bundle"){
								$.map(value, function(value, index) {
									$.map(value, function(value2, index2) {

										if(index2 == "id"){
											
										window.deepdive.push(value2);
										}
									});
								});
							}
							if(index == "session"){
								$.map(value, function(value, index) {
									//window.quickdive.push(value);
									$.map(value, function(value2, index2) {

										if(index2 == "id"){
											
										window.quickdive.push(value2);
										}
									});
								});
							}
						});
					}
				});

							i++;

		});
	//	alert(window.chk);
		
				/*			console.log('Monthly'+window.monthly.length);
							console.log('Yearly'+window.yearly.length);
							console.log('lifetitme'+window.lifetime.length);*/
							console.log(window.deepdive);
							console.log(window.deepdivebundle);
							console.log(window.streak);
							console.log(window.Dbundle);
							//console.log(window.quickdivebundle);
							console.log("Mobile User"+(window.ios+window.android));
							console.log("Desktop User"+window.pc);
			console.log("IOS"+window.ios);
			console.log("Desktop"+window.pc);
			console.log("Android"+window.android);
							/*for(i in window.streak){
								if(window.Dbundle[i]){
							//		alert(i);
						//		console.log("DEEP"+window.Dbundle[i]+"<===>"+window.streak[i]);
								}
								if(window.Qbundle[i]){
							//		console.log("QUICK"+window.Qbundle[i]+"<===>"+window.streak[i]);
								}
							}*/
			// reset all value once it set to html

						window.android = 0;
						window.ios = 0;
						window.pc = 0;

		});
			
		});
		

	</script>
</body>
</html>
