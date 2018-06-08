<?php
session_start();
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
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

<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script src="js/signout.js"></script>
<style type="text/css">
  @charset "utf-8";
/* CSS Document */

.android h2 {color: #34495e;}

.android p {color: #727272;
            font-size: 20px;}

.android ol li {list-style: disc;
                color: #34495e;
                font-size: 18px;
                margin: 20px 0;}

.android ol li a {color: #727272;}
.android ul li {list-style: decimal;
                color: #34495e;
                font-size: 18px;
                margin: 20px 0;}

.android ul li a {color: #727272;}


@media(max-width:425px){
  
  .android h2 {font-size: 24px;}

  .android p {font-size: 16px;}
  
  .android ol li {font-size: 16px;}
    .android ul li {font-size: 16px;}
}
</style>
<script type="text/javascript">
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

<body>
<?php include 'dashbordHeader.php'; ?>
<div class="container-fluid android py-5" id="android">
  <br>
    <div class="container py-5">
    <ol type="disk" class="pl-0">
       <li><a href="#android" class="js-scroll-trigger">Unsubscribe for Android?</a></li>
       <!-- <li><a href="#ios" class="js-scroll-trigger">Unsubscribe for IOS?</a></li> -->
    </ol>
    
      <h2 class="mb-3">How do I unsubscribe from an auto-renewing subscription on Android devices (Tablet / Handset)?</h2>
    <p><span style="color: red; font-weight: 500;">(IMPORTANT</span>:  Uninstalling the app will not automatically stop your subscription — you must actively cancel the subscription using the process described here.  If you uninstall the app but don't cancel your subscription first, you will still be charged.  And you can always unsubscribe or change the subscription plan anytime before the current subscription period expires.)</p>
    
    <p>If you subscribed to the services (Anywhere Access Pack or Productivity Pack, et al.)  via the Google Play Store (from the Android mobile devices), you only can unsubscribe the services from there.    Here we have summarized the related information about the "unsubscription procedures" on the Google Play Store.  Follow these steps to cancel a subscription on your device:</p>
    
    <ul>
        <li>Launch the Google Play Store app.</li>
      <li>Tap Menu ->  Subscriptions  </li>
      <img src="img/unsub1.png" class="img-fluid" />
      <li>Alternatively, On Subscriptions -> Tap On DiveThru app </li>
      <img src="img/unsub2.png" class="img-fluid" />
      <li>Tap “Cancel Subscriptions” and “Yes” to confirm the cancellation.</li>
      <img src="img/unsub3.png" class="img-fluid" />
          <li>Now, the status of this Subscription has been changed from Subscribed to Canceled.</li>
      <img src="img/unsub4.png" class="img-fluid" />
    </ul>
  </div>  
</div>
  
<div class="container-fluid android py-5" id="ios">
    <div class="container py-5">
    <br>
     <ol type="disk" class="pl-0">
       <!-- <li><a href="#android" class="js-scroll-trigger">Unsubscribe for Android?</a></li> -->
       <li><a href="#ios" class="js-scroll-trigger">Unsubscribe for IOS?</a></li>
    </ol>
      <h2 class="mb-3">How do I unsubscribe from an auto-renewing subscription on iPod / iPhone / iPad?</h2>
  
    <p>If you've purchased an auto-renewing subscription from within the client app, it will be listed under the Manage App Subscriptions section of your Account Information Screen.  And you will need to sign in to your iTunes Store account on your computer or iOS device to modify or cancel your subscription.</p>
    
    <h4>Turning off auto-renewing subscriptions on an iOS device</h4>
    <ul>
        <li>Go to Settings > iTunes & App Store.</li>
      <li>Tap your Apple ID at the top of the screen.</li>
      <li>Tap View Apple ID. You might need to sign in or use Touch ID.</li>
      <li>Tap Subscriptions.</li>
      <li>Tap the subscription that you want to manage.<br>
          If you don't see a subscription but are still being charged, make sure that you're signed in with the correct Apple ID. If so, you might have subscribed directly with the provider and not through iTunes. In this case, contact the content publisher or app developer directly to cancel your subscription.</li>
      <li>Use the options to manage your subscription. You can choose a different subscription offering, or tap Cancel Subscription to cancel your subscription. If you cancel, your subscription will stop at the end of the current billing cycle.</li>
    </ul>
    <h4 class="mb-4">Turning off auto-renewing subscriptions on a computer</h4>
    <h6>(A) To view your app subscriptions:</h6>
        <ul>
           <li>Launch iTunes on your computer.</li>
         <li>Choose Store > Sign In from the iTunes menu.</li>
         <li>Enter your Apple ID and password when prompted.</li>
         <li>Choose Store > View My Account.
           (You may be asked to re-enter your Apple ID password.  Click View Account.)</li>
         <li>In the Account Information screen, scroll to the bottom of the page to the Settings section.</li>
         <li>Click Manage to the right of Subscriptions.</li>
         <li>In the Manage Subscription screen, click on the subscription that you would like to manage.</li>
        </ul>
    <h6>(B) To turn off auto-renewal:</h6>
        <ul>
           <li>In the Edit Subscription screen, you will see the current subscription status and subscription details.</li>
         <li>Click the Off radio button to turn off Auto-Renewal.</li>
         <li>You will see a confirmation window asking you to confirm.</li>
         <li>Click Continue to proceed.<br>
           (Note:  When you turn off Auto-Renewal, you will no longer continue to be billed for your subscription.  However, your current subscription will continue until it expires, with no pro-rated refund.)</li>
        </ul>
  </div>  
</div>
<?php include 'footer.php'; ?>
<script src="js/dashboardheader.js"></script>

<script src="js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html> 