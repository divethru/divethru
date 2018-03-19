
<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
$id = $_POST['bundle'];
$sid = $_POST['subcatid'];
//echo $id;
//die;
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$subacat = [];
$bundle = [];
$sub = get("Category/Deep Dives");
foreach($sub as $key => $value)
{
		if($key == "SubCategory"){
			
			foreach($value as $k => $v){
				$subacat[] = $v;
			}
		}
}
$bnd = '';
$bndid = '';
$session = [];
foreach($subacat as $p => $a){
	if($p == 'Bundle' ){
//		if($a['subcategory_name'] == $a['Bunlde']['bunlde_category'])
	$bundle[$a['subcategory_id']] = $a['Bundle'];
	foreach($a['Bundle'] as $key => $val){
			//print_r();
	if($id == $val['bundle_id']){
		// $val['Session'];
		$bnd = $val['bundle_name'];
		$bid = $val['bundle_id'];
		foreach($val['Session'] as $sk => $sess){
			$session [] = $sess;
		}
	}
	}
		
	}
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
<title>Untitled Document</title>

<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/deepmain.css" rel="stylesheet" type="text/css">
 <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css">
 <link rel="stylesheet" href="css/reg.css" type="text/css" >
<link href="css/footercss.css" rel="stylesheet" type="text/css">
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
	
	font-weight: bold;
}
</style>
</head>

<body>
<!--HEADER-->
<?php include 'dashbordHeader.php'; ?>
<div class="container-fluid" >
  <div class="container">
     <div class="row mt-5">

           <div class="col-md-4 col-lg-2 mt-5">
			  <?php 
			  //echo $id;
			  //die;
				$sidebar = '';
				foreach($subacat as $skey => $s){
					if($sid == $s['subcategory_id']){
					 $sidebar .= '<div class="row justify-content-center justify-content-md-end list1"><p class="current" id='.$s['subcategory_id'].'>'.$s['subcategory_name'].'</p></div>';
						
					}else{
						
					 $sidebar .= '<div class="row justify-content-center justify-content-md-end list1"><p id='.$s['subcategory_id'].'>'.$s['subcategory_name'].'</p></div>';
					}
					 if(count($bundle)>0){
						 if(!empty($bundle[$s['subcategory_id']])){
							 
						 $sidebar .= '<div class="row justify-content-center justify-content-md-end list"><ul>';
						 foreach($bundle as $bk => $bv){
									foreach($bv as $bkey => $bval){										
										$sidebar .= '<li id='.$bval['bundle_id'].'>'.$bval['bundle_name'].'</li>';
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
		   
    
           <div class="col-md-8 col-lg-10">
                
			   <h2 style="margin-bottom: 50px" id="<?php echo $bid;?>"><?php echo $bnd;?></h2>
                    <div class="row mx-5">
           <!--BOX1-->
					<?php
					$SeS = '';
						foreach($session as $sk => $sv){
							$SeS .= '<div class="col-sm-6 col-md-4 p-0" ><div class="card text-white card1"><img class="card-img1" src="'.$sv['session_img'].'"><div class="card-img-overlay1 center"><p id="'.$sv['session_id'].'">'.$sv['session_name'].'</p></div></div></div>';
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



<script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script>
      <script type="text/javascript" src="js/jquery.redirect.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script type="text/javascript">

	$(".card").click(function(){
			var session = [];
		var bid = $("h2").attr('id');
		var subid = $(".current").attr('id');
		var sessionid = $(this).find(".center > p").attr("id");
				firebase.database().ref("Category/Deep Dives/SubCategory/"+subid+"/Bundle/"+bid).on("value", function(snapshot) {
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
				$.redirect("player2.php",{cat: "Deep Dives"},"POST",null,null,true);
				});
						
	});

		//$.redirect("DeepMain.php",{bundle: id},"POST",null,null,true);
		alert(sessionid);
	});
</script>
</body>
</html>
