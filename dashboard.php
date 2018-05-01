<?php
session_start();
//session_destroy();
require 'payment.php';
//require 'vendor/autoload.php';

use PayPal\Rest\ApiContext;
//use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Payment;
use PayPal\Api\Payer;
use PayPal\Api\Details;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\CreditCard;
use PayPal\Api\FundingInstrument;
use PayPal\Api\Address;
use PayPal\Api\BillingInfo;
use PayPal\Api\Cost;
use PayPal\Api\Currency;
use PayPal\Api\Invoice;
use PayPal\Api\InvoiceAddress;
use PayPal\Api\InvoiceItem;
use PayPal\Api\MerchantInfo;
use PayPal\Api\PaymentTerm;
use PayPal\Api\Phone;
use PayPal\Api\ShippingInfo;

  if(isset($_GET["paymentId"])){
  
      $paymentid = $_GET["paymentId"];
      try{
        $paydetail = Payment::get($paymentid,$apiContext);
        $obj = json_decode($paydetail);
        
         //print_r($obj);
        // die;
      }catch(Exception $ex){
//        print_r($ex);
        echo "Exception";
      }
    } 
  ?>
<!DOCTYPE html>
<html style="height: 100%">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="css/footercss.css" type="text/css" >
<link rel="stylesheet" href="css/sweetalert.css" type="text/css" >
<script src="js/sweetalert.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.10.0/firebase.js"></script>
<script type="text/javascript" src="js/jquery.redirect.js"></script>
<script>
  localStorage.removeItem('cat');
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
<script src="js/signout.js"></script>
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
.modal-footer1 {
    padding: 1rem;
    border-top: 1px solid #e9ecef;
}
.center{position: absolute;
    top: 90%;
    left: 92%; 
  text-align:center;
    transform: translateX(-50%) translateY(-50%);}

</style>
</head>
<body style="margin-top: 100px;">

<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
//require 'vendor/autoload.php';
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
      <button class="bannerButton" id="close_account"  style="outline:none; cursor: pointer; font-weight: 400;" type="button"><i class="fa fa-play" aria-hidden="true"></i> &nbsp; B E G I N</button>

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
<div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body text-center">
        <h1 class="modal-title Modalcat" id="exampleModalLongTitle" style="color: #34495e;font-size: 28px;">Title</h1>
        <br>
       <p style="color: #727272;">Description</p>

          <a class="btn1 mt-2 mx-1 " data-dismiss="modal" style="background-color: #7DD3D5 !important; outline: none !important; letter-spacing: 3; color:#FFF;  border-color:  #7DD3D5 !important; text-decoration: none;">GOT IT</a>
      </div>
     
      
    
  </div>
</div>
</div>


<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header title_center">
        <h4 class="modal-title" id="exampleModalLongTitle" style="color: #34495e;">10 day Intro program</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-center">
       <h5 style="color: #727272;">Purchase for a subscription or continue and check out the exciting bundles and activities that can be unlocked when subscribing to the full Dive Thru account.</h5>
      </div>
      <div class="modal-footer1 text-center">
        <a href="http://34.215.40.163/player.php" class="btn1 mt-2 mx-1 " style="background-color: #7DD3D5 !important; outline: none !important; color:#FFF;  border-color:  #7DD3D5 !important; text-decoration: none;">Continue with free program</a>
        <a href="http://34.215.40.163/subscription.php" class="btn1  mt-2 mx-1 " style="color:#FFF; text-decoration: none; background-color: #7DD3D5 !important; outline: none !important; border-color:  #7DD3D5 !important;">Purchase for a subscription</a>
    </div>
  </div>
</div>
</div>
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
    <!---  <div class="col-md-4 boxStyle" style="background-color:#aaa;">
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

<?php if (isset($_GET["paymentId"])) {
    //echo $_SESSION["userid"];
?>
<input type="hidden" class="tr_id" value="<?php echo $obj->id; ?>">
<input type="hidden" class="payment_type" value="<?php echo $obj->payer->payment_method; ?>">
<input type="hidden" class="payment_status" value="<?php echo $obj->payer->status; ?>">
<input type="hidden" class="payment_time" value="<?php echo date("d-m-Y H:i:s", strtotime($obj->create_time)); ?>">
<input type="hidden" class="state" value="<?php echo $obj->payer->payer_info->shipping_address->state; ?>">
<input type="hidden" class="payer_id" value="<?php echo $obj->payer->payer_info->payer_id; ?>">
<input type="hidden" class="email" value="<?php echo $obj->payer->payer_info->email; ?>">
<input type="hidden" class="total" value="<?php echo $obj->transactions[0]->amount->total; ?>">
<input type="hidden" class="currency" value="<?php echo $obj->transactions[0]->amount->currency; ?>">
<input type="hidden" class="full_name" value="<?php echo $obj->payer->payer_info->first_name. ' '. $obj->payer->payer_info->last_name; ?>">
<input type="hidden" class="description"  value="<?php echo $obj->transactions[0]->description; ?>">
<input type="hidden" class="city" value="<?php echo $obj->payer->payer_info->shipping_address->city; ?>">
<?php
}
?>
</div>
</div>

<script type="text/javascript">
   
    $(window).load(function(){  
    
               $('#exampleModalCenter').modal('show');
              });
</script>
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
<div class="bottomCard" width="100%"> 
    <center>
          <p style="color: #34495e; ">Unlock the Dive thru Library</p>
      <a href="http://34.215.40.163/subscription.php" class="bottomCardButton " style="color: #FFF; text-decoration: none;">SUBSCRIBE NOW</a>
    </center>
</div>

<?php include 'footer.php'; ?>

<script src="js/dashboard.js"></script>
<script type="text/javascript"> 
$(document).ready(function(){

      console.log(JSON.parse(window.localStorage.getItem("SessionHistory")));  
 

 // $(".playe").on('click','.boxStyle > .bundle',function(e){
 //  alert();
 //      console.log($(e.target).attr('class'));
 //      var flag = false;
 //      var t ='';
 //      var SESSION = $(this).attr("id");
 //      var S = $(this).text();
 //      var cid = $(this).data("cat");
 //      var ct = window.localStorage.getItem("cat");
 //    console.log(ct);
 //      window.localStorage.setItem("cat",ct);
 //      window.localStorage.setItem("Snm",S);
 //      window.localStorage.setItem("cid",cid);
 //      $.redirect("player.php",{bundle: SESSION},"POST",null,null,true);
 //      firebase.database().ref("Category/"+ct+"/Session/"+SESSION).on("value", function(snapshot) {
 //                    window.localStorage.setItem("session", JSON.stringify(snapshot.val()));
 //                snapshot.forEach(function(childSnapshot) {
 //                  var data = childSnapshot.val();
 //                  var key = childSnapshot.key;
   
 //              //    alert(key);
 //                });
 //              });
 //  });
}); 
</script>

<script>
$(document).ready(function(){

       /*$('#exampleModalCenter').modal('hide');*/
var catRef = firebase.database().ref().child('/');
    catRef.on('child_changed', function(snapshot) {
      location.reload(true);
    });
    $('.header-item > ul li a.nav-link').each(function(){
                var path = window.location.href;
                var current = path.substring(path.lastIndexOf('/')+1);
                var url = $(this).attr('href');
                if(url == current){
                    $(this).addClass('active');
                };
            });



  $(".bannerButton").click(function(){

  var day = window.localStorage.getItem('content');
  window.localStorage.removeItem("cat","10 Day Intro Program");
  var user = JSON.parse(window.localStorage.getItem('user'));
//alert(user.membership_type);
    if(day>8 && day<=10 && user.membership_type == "Free"){
     // alert(day);
       $('#exampleModalCenter').modal('show');
    }else if(day<=8 || user.membership_type == "paid"){
        
      var url = "http://34.215.40.163/player.php";
      window.location.href = url;
    }else if(day>10 && user.membership_type == "Free"){
       //alert(day);
       // alert(user.membership_type);
      window.location = "subscription.php";
    }
  });
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

<!---
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>---->

<script src="js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html> 