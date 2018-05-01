<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$subacat = [];
$bundle = [];
$sub = count(get("Category/Deep Dives"))>0?get("Category/Deep Dives"):get("Category/Deep Dive");
foreach($sub as $key => $value)
{
		if($key == "SubCategory"){
			
			foreach($value as $k => $v){
				$subacat[] = $v;
			}
		}
}

foreach($subacat as $p => $a){
	if(isset($a['Bundle'])){
//		if($a['subcategory_name'] == $a['Bunlde']['bunlde_category'])
		$bundle[$a['subcategory_id']] = $a['Bundle'];
		
	}
}


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
//print_r($subacat);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Deep Dive</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/footercss.css" type="text/css" >
<link rel="stylesheet" href="css/sweetalert.css" type="text/css" >
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/sweetalert.min.js"></script>
<!-- 
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/individual.css" rel="stylesheet" type="text/css"> 
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">-->
<style type="text/css">
@media(min-width:992px){
.pad2 {padding:0 85px;}
}
.boxStyle{
	padding-top:17% !important;
}
.progress{
	background-color: rgba(255,255,255,0.2)
}
.progress-bar{
	background: #fff !important;
}
.ptext{
	font-size:18px;
	
}
@media(max-width:768px){
.boxStyle{
	padding-top:15% !important;
}	
.bundle{
	font-size: 16px;
}
.ptext{
	font-size:14px;
	/*padding-top: 26px;*/
    margin-bottom: 5px !important;
}
}
@media(max-width:425px){
	
.boxStyle{
	padding-top:60% !important;
}
.bundle{
	font-size: 16px;
}
.ptext{
	font-size:14px;
}
}
@media(min-width: 426px){
	.bnd{
				margin: 0 39px 0 0;
		}
		
}
.new-bg1 h4 {font-size: 26px;
                padding-top: 40px;
	             color: #80429c;}
	
.new-bg1 h2 {font-size: 52px;
                 padding: 23px 0;
	             color: #80429c;}
	
.get-button {
    background-color: #7dd3d5;
    padding-left: 15px;
    padding-right: 15px;
   /* margin-bottom: 40px;*/
}
</style>
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
</head>

<body style="margin-top: 150px;">
	
<!--HEADER-->
<?php include 'dashbordHeader.php'; ?>
<!--EMBODY-->
	<div class="cat1">    

	     <?php 
		 $content = '';
			foreach($subacat as $skey => $sval){
				$content .= '<div class="container-fluid text-center"><div class="container pad2"><div class="row my-5 justify-content-center justify-content-md-start"><h4>'.$sval['subcategory_name'].'</h4></div>';
				 if(count($bundle)>0){
					if(!empty($bundle[$sval['subcategory_id']])){
						$content .= '<div class="row px-5 bnd">';
						foreach($bundle as $bk => $bv){
								 foreach($bv as $bkey => $bval){	
	//var_dump($bval['Session']);
	//die;
							$total = count($bval['Session']);
							
							if($bk == $sval['subcategory_id']){
								
							/*$content .= '<div class="col-sm-6 col-md-4 p-0"><div class="card text-white card1"><img class="card-img1" src="'.$bval['bundle_img'].'"><div class="card-img-overlay1 center" id="'.$sval['subcategory_id'].'"><p id="'.$bval['bundle_id'].'">'.$bval['bundle_name'].'</p></div></div></div>';*/
							
							if(strlen($bval['bundle_description']) > 80){
								
								$small = substr($bval['bundle_description'], 0, 80).'....';
							}else{
								$small = substr($bval['bundle_description'], 0, 80);
							}
                          $content .= '<div class="col-md-4 col-xs-6 hover-box1 p-0 boxStyle" style=" background-image: url('.$bval['bundle_img'].');"><p class="Center bundle" id="'.$sval['subcategory_id'].'">'.$bval['bundle_name'].'</p><p class="ptext mt-4" > <span>0</span> Of '.$total.'</p><div class="progress" style="height:7px;width:80%;margin:auto;"><div class="progress-bar" style="height:10px;width:0%;"></div></div>	<div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'.$small.'</p><div class="btn btn2 btn-outline-light" data-total="'.$total.'" data-img="'.$bval['bundle_img'].'" data-bundle= "'.$bval['bundle_name'].'" id="'.$bval['bundle_id'].'" style="border-radius: 0;">S E S S I O N</div></div></div>';
							}
							/*$content .= '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('.$bval['bundle_img'].');"><p class="Center bundle" id="'.$bval['bundle_id'].'">'.$bval['bundle_name'].'</p></div>';*/
						}
						}
						$content .= '</div>';
					}
				 }
						$content .= '</div></div>';
			}
//die;
			echo $content;
		 ?>
		 
		   
	 	       
	 	  </div>         
			   
	<br><br>

<?php include 'footer.php'; ?> 	   

<!--Onload Modal start -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content" style="background-image: url('img/box.png');">
      <div class="modal-header text-center" style="border-bottom:0px;padding:0px;">
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin:-1rem 0rem -1rem auto;">
          <span aria-hidden="true" style="color:#fff;">&times;</span>
        </button>
      </div>
      
      <div class="modal-body text-center" style="padding-top:0px;">
		<div class="boxA new-bg" style="top:0;"><div class="row "><div class="col-12"><h4 class="modal-title mb-4 sessionnm " id="exampleModalLongTitle" style="color: white;">Conversation 1</h4><h6 class="mb-4" style="color:white">One Time Subscription. Unlimited Access.</h6></div></div><div class="row justify-content-center new-bg1"><div class="col-md-6 col-lg-6 bg-white"><h4>L I F E T I M E</h4><h2>$ 6.00</h2><a href="javascript:void(0)" class="btn get-button subscribe" style="color: #fff;" data-amount="6" data-cycle="0" data-plan="L">G O <span>&nbsp;&nbsp;&nbsp;</span>U N L I M I T E D</a>
		      <div style="margin-top: 8px;margin-bottom: 8px;font-weight: bold;color:#111;"> OR</div>
		<a href="javascript:void(0)" class="btn get-button freetrial" style="color: #fff; margin-bottom: 25px;" >C O N T I N U E <span>&nbsp;&nbsp;&nbsp;</span> F R E E </a></div></div></div>
	</div>	


      
  </div>
</div>
</div>
 <!--Onload modal end -->  
<!--
<script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script>-->
      <script type="text/javascript" src="js/jquery.redirect.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/deepdive.js"></script>
<script src="js/signout.js"></script>
<script type="text/javascript">
	$(document).ready(function(){

		localStorage.setItem('package_type','bundle');
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
 });  
	$(".btn").click(function(){
		//alert($(this).data("total"));
		 var user = JSON.parse(window.localStorage.getItem('user'));
		var sid = $(".Center").attr("id");
		var id = $(this).attr("id");
		if(user.membership_type != "Free"){
			$.redirect("individual.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
		}else{
			if($(this).data("total") > 1){

				$("#memberModal").modal("show");
				$(".modal-content").css("background-image","url('"+$(this).data("img")+"')");
				$("#exampleModalLongTitle").html($(this).data("bundle"));
			}else if($(this).data("total") == 0){

				swal("No session available right now!");
			}else if($(this).data("total") == 1){
			$.redirect("individual.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
				//swal("No session available right now!");
			}

			$(".freetrial").click(function(){
				$("#memberModal").modal("hide");
				$.redirect("individual.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
			});

			$(".subscribe").click(function(){
				var cycle = $(this).data('cycle');
				var plan = $(this).data('plan');
				var price = $(this).data('amount');
				window.localStorage.setItem("session_name",$("#exampleModalLongTitle").html());
				$("#memberModal").modal("hide");
					$.post("http://34.215.40.163/test.php", {"price": price}, function(result){
			        console.log(result);
			
			
			localStorage.setItem('session_id',id);
//			localStorage.setItem('session_name',$(".current").html());
//			localStorage.setItem('subcategory_id',$(".box_12 > p").attr("id"));
			localStorage.setItem('prevcat','Deep Dive');
			localStorage.setItem('payment','true');
				 //$.redirect("Process.php",{select_cycles: cycle ,product_name : "session","select_plan":plan,"price":price,"userid":user.user_id,"token":result},"POST",null,null,true);
				});
			});
		}
	//	alert(id);
	});
</script>

</body>
</html>
