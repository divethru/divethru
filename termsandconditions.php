<?php
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
 ?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
	 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>Terms And Conditions</title>
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/privacy-policiy.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/reg.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/footercss.css" type="text/css" >
<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script src="js/credential.js"></script>
<script>
    $(document).ready(function(){

    var user=window.localStorage.getItem('user');
    if(user!=null)
    {
    //alert(user);
      $( "#result" ).load( "dashbordHeader.php", function() {
        //alert( "Load was performed." );

        $(".page-loader-wrapper").fadeOut();
      });
        
    }
    else{
        $( "#result" ).load( "header.php", function() {
        //alert( "Load was performed1 ." );
        $(".page-loader-wrapper").fadeOut();
      });
      
    }
  });

  </script>
</head>

<body style="margin-top: 150px;">
	<?php //include 'dashbordHeader.php'; ?>
	<div id="result"></div>
<div class="container-fluid bg py-5">
    <div class="container text-center text-white">
	     <h2>Terms and Conditions</h2>
	</div>
</div>
	
<div class="container-fluid">
     <div class="container py-5">
	    <h4 class="mb-3">Terms of Use</h4>
		 <p class="mb-4" style="text-align: justify;">Thank you for visiting our website(s) (the “Site”), which are owned and provided by Donald Miller Words, LLC (“DM Words,” “StoryBrand,” “we” or “us”). Your use and access of the Site(s) and the services offered through the Site(s) is governed by and subject to the following terms and conditions (the “Terms”). If you do not agree to these Terms, or if you do not agree with our Privacy Policy https://storybrand.com/terms-and-conditions/, which is incorporated herein by reference, please do not use the Site or any services offered through the Site. BY ENTERING, ACCESSING, BROWSING, SUBMITTING INFORMATION TO, OR OTHERWISE USING THIS SITE AND THE SERVICES AND CONTENT AVAILABLE THEREIN, YOU ACKNOWLEDGE AND AGREE TO THESE TERMS AND REPRESENT AND WARRANT THAT YOU ARE AT LEAST EIGHTEEN (18) YEARS OLD OR OLDER AND POSSESS THE LEGAL RIGHT AND ABILITY TO AGREE TO THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS OR YOU ARE YOUNGER THAN EIGHTEEN (18) YEARS OLD, DO NOT USE THIS SITE.</p>
		 
		 
	 </div>	
</div>
	<?php include 'footer.php'; ?>
<!-- <script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script> -->
<script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>
