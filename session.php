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
<link rel="stylesheet" href="css/sweetalert.css" type="text/css" >
<script src="js/sweetalert.min.js"></script>


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
<!-- <script src="Admin/js/sign_out.js"></script> -->
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

    
    .box1a {width: 100%;
           height: 100%;
           background-color: rgba(0,0,0,0.5);
           position: absolute;
           text-align: center;}

    .box1a i {color: #fff;
            font-size: 28px;
            }
    .center{position: absolute;
    top: 90%;
    left: 92%; 
  text-align:center;
    transform: translateX(-50%) translateY(-50%);}
</style>
</head>
<body style="margin-top: 118px;">

<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;


$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$user = get("Category");


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
    <div class=" cat1 row Margins text-center">

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
<script src="js/jquery.backDetect.min.js"></script>

<script src="js/opendive.js"></script>


<script>
  window.localStorage.removeItem("bundle");

$(document).ready(function(){
 
  /*$("div.hover-box1a").click(function() {
  alert('5');
});       
    $(".exploreMore").click(function(){
        $(".hiddens").show();
    $(".exploreMore").hide();
    });*/
  $('.header-item > ul li a.nav-link').each(function(){
                var path = window.location.href;
                var current = path.substring(path.lastIndexOf('/')+1);
                var url = $(this).attr('href');
                if(url == current){
                    $(this).addClass('active');
                };
            });     
  
  
});
  function sign_out()
{
  firebase.auth().signOut().then(function() {
    window.location = "index.php";
  }, function(error) {
    // An error happened.
  });
}

  $("div.cat1").on('click','.boxStyle > .bundle',function(e){
     var user = JSON.parse(window.localStorage.getItem('user'));
      console.log($(this).next().attr("class"));
      var flag = false;
      var t ='';
      var SESSION = $(this).attr("id");
      var S = $(this).text();
      var cid = $(this).data("cat");
      var ct = window.localStorage.getItem("cat");
    console.log(ct);
      window.localStorage.setItem("cat",ct);
      window.localStorage.setItem("Snm",S);
      window.localStorage.setItem("cid",cid);
            window.localStorage.setItem("subcategory_id","");
      window.localStorage.setItem("bid","");
      if(user.membership_type == "Free" && $(this).next().attr("class") == "box1"){
          swal("You have already listen..!!");
      }else{

       $.redirect("player.php",{bundle: SESSION},"POST",null,null,true);
      }
      firebase.database().ref("Category/"+ct+"/Session/"+SESSION).on("value", function(snapshot) {
                    window.localStorage.setItem("session", JSON.stringify(snapshot.val()));
                snapshot.forEach(function(childSnapshot) {
                  var data = childSnapshot.val();
                  var key = childSnapshot.key;
   
              //    alert(key);
                });
              })
  }); 

</script>



<script src="js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html> 