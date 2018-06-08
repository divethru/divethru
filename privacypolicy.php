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

<title>Privacy Policy</title>
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/reg.css" rel="stylesheet" type="text/css">
<link href="css/privacy-policiy.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
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
	     <!--<h2>Terms and Conditions</h2>-->
	     <h2>Privacy Policy</h2>
	</div>
</div>
	
<div class="container-fluid">
     <div class="container py-5" style="text-align: justify;">
	     <h4 class="mb-3">Terms of Use</h4>
		 <p class="mb-4" >Thank you for visiting our website(s) (the “Site”), which are owned and provided by Donald Miller Words, LLC (“DM Words,” “StoryBrand,” “we” or “us”). Your use and access of the Site(s) and the services offered through the Site(s) is governed by and subject to the following terms and conditions (the “Terms”). If you do not agree to these Terms, or if you do not agree with our Privacy Policy https://storybrand.com/terms-and-conditions/, which is incorporated herein by reference, please do not use the Site or any services offered through the Site. BY ENTERING, ACCESSING, BROWSING, SUBMITTING INFORMATION TO, OR OTHERWISE USING THIS SITE AND THE SERVICES AND CONTENT AVAILABLE THEREIN, YOU ACKNOWLEDGE AND AGREE TO THESE TERMS AND REPRESENT AND WARRANT THAT YOU ARE AT LEAST EIGHTEEN (18) YEARS OLD OR OLDER AND POSSESS THE LEGAL RIGHT AND ABILITY TO AGREE TO THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS OR YOU ARE YOUNGER THAN EIGHTEEN (18) YEARS OLD, DO NOT USE THIS SITE.</p>
		 
		 <h4 class="mb-3">Services Provided</h4>
		 <p class="mb-4">DM Words provides content and workshops for creating and managing a robust branding and marketing strategy for businesses of all kinds (“Services”). Services include the StoryBrand Workshop, an interactive experience designed to help you (in-person or online), clarify branding identity and make marketing messages simple, clear, and actionable.</p>
		 <p class="mb-4">Access to certain portions of the Site are restricted to registered users of our Services. As part of our registration process, you must provide us with certain information. We need this information so that we can verify your identity, and make the full use of the Services we provide through the Site. Additionally, you must be required to provide a credit, debit, or charge card number, or other payment information, as well as your name, telephone number(s), email, and/or street address, and other personally identifiable information (“Personal Information”), which will be maintained and used by us as permitted by these Terms and the Privacy Policy.</p>
		 
		 <h4 class="mb-3">Registration and Security</h4>
		 <p class="mb-4">DM Words provides content and workshops for creating and managing a robust branding and marketing strategy for businesses of all kinds (“Services”). Services include the StoryBrand Workshop, an interactive experience designed to help you (in-person or online), clarify branding identity and make marketing messages simple, clear, and actionable.</p>
		 <p class="mb-4">Access to certain portions of the Site are restricted to registered users of our Services. As part of our registration process, you must provide us with certain information. We need this information so that we can verify your identity, and make the full use of the Services we provide through the Site. Additionally, you must be required to provide a credit, debit, or charge card number, or other payment information, as well as your name, telephone number(s), email, and/or street address, and other personally identifiable information (“Personal Information”), which will be maintained and used by us as permitted by these Terms and the Privacy Policy.</p>
		 
		 <h4 class="mb-3">Disclaimer of Representations and Warranties</h4>
		 <p class="mb-4">Your use of the Services and Content is at your sole discretion and risk. The Services and Content, and all materials, information, products and services included therein, are provided on an “AS IS” and “AS AVAILABLE” basis without warranties of any kind.</p>
		 <p class="mb-4">WE AND OUR LICENSORS AND AFFILIATES EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, OR STATUTORY, RELATING TO THE SERVICES AND CONTENT, INCLUDING WITHOUT LIMITATION THE WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT OF PROPRIETARY RIGHTS, COURSE OF DEALING, OR COURSE OF PERFORMANCE.</p>
		 <p class="mb-4">IN ADDITION, WE AND OUR LICENSORS AND AFFILIATES DISCLAIM ANY WARRANTIES REGARDING SECURITY, ACCURACY, RELIABILITY, TIMELINESS, AND PERFORMANCE OF THE SERVICES OR THAT THE SERVICES WILL BE ERROR FREE OR THAT ANY ERRORS WILL BE CORRECTED.</p>
		 <p class="mb-4">WE MAKE NO REPRESENTATIONS CONCERNING, AND DO NOT GUARANTEE, THE ACCURACY OF THE SERVICES, INCLUDING, BUT NOT LIMITED TO, ANY INFORMATION PROVIDED THROUGH THE SERVICES OR THEIR APPLICABILITY TO YOUR INDIVIDUAL CIRCUMSTANCES. OUR SERVICES AND CONTENT ARE DEVELOPED FOR USE IN THE UNITED STATES AND WE AND OUR LICENSORS AND AFFILIATES MAKE NO REPRESENTATION OR WARRANTY CONCERNING THE SERVICES OR CONTENT WHEN THEY ARE USED IN ANY OTHER COUNTRY.</p>
		 <p class="mb-4">SOME JURISDICTIONS DO NOT PERMIT US TO EXCLUDE WARRANTIES IN THESE WAYS, SO IT IS POSSIBLE THAT THESE EXCLUSIONS WILL NOT APPLY TO OUR AGREEMENT WITH YOU. IN SUCH EVENT, THE EXCLUSIONS SHALL APPLY TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW.</p>
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
