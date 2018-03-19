<!DOCTYPE html>
<html style="height: 100%">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="css/footercss.css" type="text/css" >
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
   .btn1 {
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
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
</head>
<body>

<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);


function get($path){
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);


//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}
//print_r($user);
 include 'dashbordHeader.php'; ?>
<!-- <div class="loader"></div> -->
   
		<!--<div class="row Margins">
	  <p class="MainMenu">QUICK DIVE&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p>
	</div>
	
	<br>-->
	

<div class="container-fluid py-5">    

  
       
<div class="container text-center cardContainers">
    <div class="row Margins text-center cat1">
    
    </div>
</div>

</div>
<!--     <div class="col-md-4 col-xs-6 boxStyle" style="background-color:#aaa;">
	    <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 col-xs-4 boxStyle" style="background-color:#bbb;">
	  <p class="Center">Overcome by Anxiety</p>
      </div>
      <div class="col-md-4 col-xs-4 boxStyle" style="background-color:#ccc;">
	  <p class="Center">Consumed By Insecurities</p>
      </div>
	  <div class="col-md-4 col-xs-4 boxStyle hiddens" style="background-color:#ccc;">
	  <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 col-xs-4 boxStyle hiddens" style="background-color:#aaa;">
	  <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 col-xs-4 boxStyle hiddens" style="background-color:#bbb;">
	  <p class="Center">Having A Bad Day</p>
      </div>
	  <br>
	  <p class="exploreMore">EXPLORE MORE</p> 
    </div>
</div>

		<div class="row Margins">
	  <p class="MainMenu">DEEP DIVE&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p>
	</div>
	
	<br>
	     
<div class="container text-center cardContainers">
    <div class="row Margins text-center">
    <!--  <div class="col-md-4 boxStyle" style="background-color:#aaa;">
	    <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 boxStyle" style="background-color:#bbb;">
	  <p class="Center">Overcome by Anxiety</p>
      </div>
      <div class="col-md-4 boxStyle" style="background-color:#ccc;">
	  <p class="Center">Consumed By Insecurities</p>
      </div>
	  <div class="col-md-4 boxStyle hiddens1" style="background-color:#ccc;">
	  <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 boxStyle hiddens1" style="background-color:#aaa;">
	  <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 boxStyle hiddens1" style="background-color:#bbb;">
	  <p class="Center">Having A Bad Day</p>
      </div>
	  <br>
	  <p class="exploreMore1">EXPLORE MORE</p>  
    </div>
</div>

		<div class="row Margins">
	  <p class="MainMenu">OPEN DIVE&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p>
	</div>
	
	<br>
	     
<div class="container text-center cardContainers">
    <div class="row Margins text-center">
      <div class="col-md-4 boxStyle" style="background-color:#aaa;">
	    <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 boxStyle" style="background-color:#bbb;">
	  <p class="Center">Overcome by Anxiety</p>
      </div>
      <div class="col-md-4 boxStyle" style="background-color:#ccc;">
	  <p class="Center">Consumed By Insecurities</p>
      </div>
	  <div class="col-md-4 boxStyle hiddens2" style="background-color:#ccc;">
	  <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 boxStyle hiddens2" style="background-color:#aaa;">
	  <p class="Center">Having A Bad Day</p>
      </div>
      <div class="col-md-4 boxStyle hiddens2" style="background-color:#bbb;">
	  <p class="Center">Having A Bad Day</p>
      </div>
	  <br>
	  <p class="exploreMore2">EXPLORE MORE</p> 
    </div>-->
</div>
</div>
<!---<div class="container-fluid mt-5"><div class="box-slider">

  
       <h3>QUICK DIVE</h3>
      
         <div class="container">
                <div class="row text-center box justify-content-center">

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/1.png">
                        <div class="card-img-overlay1">
                           <p class="center">Having A Bed Day</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/2.png">
                        <div class="card-img-overlay1">
                           <p class="center">Overcome by Anxiety</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/3.png">
                        <div class="card-img-overlay1">
                           <p class="center">Consumed by Insecurities</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/4.png">
                        <div class="card-img-overlay1">
                           <p class="center">Busy Mind</p>
                        </div>
                        </div>
                     </div>

                   </div>
            
       </div>
  
  </div>
  
</div>
-------->


<?php include 'footer.php'; ?>

    
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/jquery.redirect.js"></script>
<script src="js/quickdive.js"></script>


<script>

/*$(document).on('mouseover', 'div.cat1', function(e) {
		console.log($(e.target).attr('class'));
			
			$(e.target).click(function(){
				if($(e.target).attr('class') == "Center bundle"){
							alert($(this).text());
							var bundle = $(this).attr("id");
							//alert(bundle);
							//function edit(id){
								//$.redirect("bundle.php",{ bundle: bundle}); 
								/*firebase.database().ref("Category").on("value", function(snapshot) {
										snapshot.forEach(function(childSnapshot) {
											var data = childSnapshot.val();
											if(childSnapshot.hasChild("Bundle")){
													$.map(data.Bundle, function(value, index) {
														if(value.Session != '' && value.Session){
														
															flag = true;
														}else{
															flag = false;
														}
													});
											}
											
										});
								});*/
								
								
							//window.location = "bundle.php?id="+bundle;
							 
							 //}
					/*}
			});
		});*/
		
		/*$("div.cat1").on('click','.boxStyle > .bundle',function(e){
			console.log($(e.target).attr('class'));
			var flag = false;
			var t ='';
			var bundle = $(this).attr("id");
			//alert(bundle);
			firebase.database().ref("Category/Quick Dive/Bundle/"+bundle).on("value", function(snapshot) {
										snapshot.forEach(function(childSnapshot) {
											var data = childSnapshot.val();
											var key = childSnapshot.key;
											console.log(key);
												if(key != 'Session'){
														flag = false;
												}else{
													flag = true;
													return true;
												}
								
										});
											/*if(childSnapshot.hasChild("Bundle")){
													$.map(data.Bundle, function(value, index) {
														t = value.Session ? value.Session : {};
														if(value.hasOwnProperty('Session')){
														//console.log(value);
														
															flag = true;
														}
														if(!value.hasOwnProperty('Session')){
															flag = false;
														}
													});
											}*/
											
						/*		});

					if(flag){
							var bundle = $(this).attr("id");
							$.redirect("bundle.php",{bundle: bundle},"POST",null,null,true);
						
					}else{
							
										alert("there is no session");
					}
		});*/
$(document).ready(function(){
	/*$("div.hover-box1a").click(function() {
  alert('5');
});				
    $(".exploreMore").click(function(){
        $(".hiddens").show();
		$(".exploreMore").hide();
    });*/
	
	
	
});
$(document).ready(function(){
    $(".exploreMore1").click(function(){
        $(".hiddens1").show();
		$(".exploreMore1").hide();
    });
});
$(document).ready(function(){
    $(".exploreMore2").click(function(){
        $(".hiddens2").show();
		$(".exploreMore2").hide();
    });
});
</script>


<script src="js/bootstrap.bundle.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html> 