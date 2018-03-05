<!DOCTYPE html>
<html style="height: 100%">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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
<script src="Admin/js/sign_out.js"></script>
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

$user = get("DailyQuotes/qoute_description");


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
    <div class="mainBanner">
	  <center>
	    <div class="bannerCenter">
	      <p class="bannerDay">Day <span class="day"></span> of 10</p>
		  <p class="bannerHeader">Intro Program</p>
		  <button class="bannerButton" style="outline:none; font-weight: 400;" type="button"><i class="fa fa-play" aria-hidden="true"></i> &nbsp; B E G I N</button>
		</div>
	  </center>
	</div>
	
	<br>
	<br>
	<div class="card Margins startCard"  width="100%">
	  <center>
        <div class="card-body" width="100%">
          <h4 class="cardtitles" style="letter-spacing: 3px;">WORDS TO SIT WITH</h4>
		  <hr />
          <p class="cardtexts"></p>
        </div>
		</center>
    </div>
	<!--<div class="row Margins">
	  <p class="MainMenu">QUICK DIVE&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p>
	</div>
	
	<br>-->
	

<div class="cat container-fluid">    
<!-- <div class="container text-center cardContainers">
    <div class="row Margins text-center">
     <div class="col-md-4 col-xs-6 boxStyle" style="background-color:#aaa;">
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
------->
<div class="bottomCard" width="100%"> 
	  <center>
          <p style="color: #34495e; ">Unlock the Dive thru Library</p>
		  <a href="#" class="bottomCardButton " style="color: #FFF; text-decoration: none;">SUBSCRIBE NOW</a>
	  </center>
</div>

<?php include 'footer.php'; ?>

<script src="js/dashboard.js"></script>


<script>
$(document).ready(function(){
    $(".exploreMore").click(function(){
        $(".hiddens").show();
		$(".exploreMore").hide();
    });
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


<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html> 