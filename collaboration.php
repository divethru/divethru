<?php
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
 ?>

<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" >

    <!-- <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css"> -->
     <link rel="shortcut icon" href="img/feb.ico" />
     <link href="css/collaboration.css" rel="stylesheet" type="text/css">
      <link href="css/reg.css" rel="stylesheet" type="text/css">
      <link href="css/footercss.css" rel="stylesheet" type="text/css">
     <link href="css/landing-page.min.css" rel="stylesheet">
   <!-- <script type="text/javascript" src="js/loginvalidation.js"></script> -->
 <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
    <title>Dive Thru</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
<link rel="stylesheet" type="text/css" href="css/homestyle.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
 <link rel="stylesheet" href="css/dashheader.css">
 
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script src="js/credential.js"></script>
<style type="text/css">


<!--NEW-->
/*SLIDER1 */

.active2 {background-color:#7DD3D5 !important;
                      border:none;
            color:#fff !important;}
            
.slide a:hover {background-color:transparent;
                color:#fff !important;}
  
@media (min-width:320px) and (max-width:446px) {

.slide h1 {font-size:18px !important;}

.slide p {font-size:14px !important;}}
   
</style>
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
  <body style="padding-top: 100px;">
  

        <?php //include'header.php'; ?>
          <div id="result"></div>
            <header class="masthead text-white text-center">
                  <div class="overlay">
                    <div style="background-image: url('img/home page_img_1.png'); height: 100%; padding: 0;  min-width: 100%; background-size: cover; background-repeat: no-repeat; background-position: center;"></div>
                     
                  </div>
                  <div class="container">
                    <div class="row slide">
                      <div class="col-xl-12 mx-auto">
                        <h1 class="mb-3" >
                            FIND PEACE WITHIN YOURSELF<br>& HELP YOUTH FIND IT, TOO
                        </h1>
                        <p class="mb-5" style="font-size: 30px; ">
                            AN APP THAT HELPS YOU BETTER UNDERSTAND WHO YOU<br>ARE, HANDLE WHAT LIFE THROWS AT YOU AND ACCEPT/LOVE<br>YOURSELF. PLUS EVERY MONTH YOU DIVETHRU,<br>A YOUTH DIVES THRU, TOO.
                        </p>
                       
                       <a href="#" class="btn1 mx-2  my-2 active2 btn-pad" style="letter-spacing:3px; text-decoration: none; padding-top: 10px; padding-bottom: 10px; background-color:#7DD3D5 !important;
                      border:none;
            color:#fff !important;">JOIN FOR FREE</a>
                       <a href="http://34.215.40.163/registration.php" class="btn1 mx-2 px-4 my-2" style="letter-spacing:3px; padding-top: 10px; padding-bottom: 10px; color: #FFF; text-decoration: none; border-color: #fff;">LET'S COLLABARATE</a>
                       
                       </div>
                      
                    </div>
                  </div>
                </header>
    
					<!--WORD FOR SHOPIN-->
						
					<div class="container-fluid py-5">

						<div class="container word text-center">
						     <h2 class="mb-0">Guided Meditation + Journaling = Dive Thru</h2>
							 <div class="row justify-content-center my-4">
							     <div class="col-6 text-center">
								     <img src="img/2.png" class="img-fluid">
								 </div>
							 </div>
							<p>We have harnessed the power of guided meditation and journaling to bring you 100s of
					conversations that will reconnect you with yourSelf.It’s simple Choose to Dive Thru for 11, 18 or
					25 minutes, press, play, meditate, journal, then meditate again. Each session provides<br>
					you with everything you need to Dive Thru what you go Thru.<br>
					We have harnessed the power of guided meditation and journaling to bring you 100s of
					conversations that will reconnect you with yourSelf.It’s simple Choose to Dive Thru for 11, 18 or
					25 minutes, press, play, meditate, journal, then meditate again. Each session provides<br>
					you with everything you need to Dive Thru what you go Thru.
						    </p>
						</div>
						
					</div>
					<hr />
					<!--OPTIONS-->
	
<div class="container-fluid">
     <div class="container">
	         <div class="row">
		 <div class="col-8 col-md-4 my-auto text-center mx-auto">
		     <img src="img/lotus flower.png" class="img-fluid" style="width: 320px;" />
		 </div>
		 <div class="col-md-8 option pl-md-5 py-3 py-md-5 text-center text-md-left">
		      <h2>Get To Know Your Self</h2>
			  <p class="py-4">Create Space to turn within and connect withwho you truly are.</p>
			 <div class="btn1 btn-primary3">L E A R N &nbsp; M O R E</div>
		 </div>
		     </div>
	</div>	
</div>
	<hr />
	
<!--OPTIONS2-->
	
<div class="container-fluid">
     <div class="container">
	         <div class="row">
		 <div class="col-8 col-md-4 my-auto text-center mx-auto">
		     <img src="img/heart.png" class="img-fluid" style="width: 320px;" />
		 </div>
		 <div class="col-md-8 option pl-md-5 py-3 py-md-5 text-center text-md-left">
		      <h2>Emotional Resilience</h2>
			  <p class="py-4">Easily adapt to the experiance you face to move through life with greater ease.</p>
			 <div class="btn1 btn-primary3">L E A R N &nbsp; M O R E</div>
		 </div>
		     </div>
	</div>	
</div>
	<hr />
	
<!--OPTIONS3-->
	
<div class="container-fluid">
     <div class="container">
	         <div class="row">
		 <div class="col-8 col-md-4 my-auto text-center mx-auto">
		     <img src="img/home.png" class="img-fluid" style="width:320px;" />
		 </div>
		 <div class="col-md-8 option pl-md-5 py-3 py-md-5 text-center text-md-left ">
		      <h2>Feel At Home Within Yourself</h2>
			  <p class="py-4">Learn to trust yourSelf and fell confident in you.</p>
			 <div class="btn1 btn-primary3">L E A R N &nbsp; M O R E</div>
		 </div>
		     </div>
	</div>	
</div>
	<hr />
	
<!--MOBILE-->
	
 <section class="bg-white text-center pt-5 pb-5">
                      <div class="container">
                        <div class="row mt-5">
                            <div class="col-lg-6 mb-5">
                                 <img src="img/mobile.png" class="img-responsive" height="400" width="200">
                            </div>
							
                            <div class="col-lg-6">
                                <h3 class="mb-2 txtpos" style="color: #34495e; ">
                                    It's Time To<br> DiveThru 
                               </h3>
                               <br>
                                <h6 class="lead mb-0 txtpos" style="color: #727272; font-weight: 400;  font-size: 20px;"> 
                                   Download the DiveThru app<br>or sign up online to find<br>the peace within.
                              </h6>
                              <br><br>
                               <a href="http://34.215.40.163/subscription.php" class="btn btn-primary btnpos" style="border-color: #7dd3d5;   background-color: #7dd3d5;">S U B S C R I B E &nbsp; N O W</a>
                               <br><br>
                                <a href="http://34.215.40.163/registration.php" class="btn btn-primary btnpos" style="border-color: #7dd3d5;  background-color: #7dd3d5;"> &nbsp;J O I N &nbsp; F O R &nbsp; F R E E &nbsp;  </a>
                                <br><br>
                                <div>
                                <img src="img/app atore.png" class="img-responsive plystr " height="40" width="140"> 
                                 <img src="img/google play.png"  class="img-responsive plystr1 "  height="40" width="140"  ></div>
                                 <br><br>
                            </div>
                           
                        </div>
                      </div>
</section>

                
                   
                   
                  
                    
                     
                 
                
        <?php include 'footer.php'; ?>
  




<!--/*FOOTER2*/ -->




    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
 
    
  <!--   <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="js/bootstrap.min.js" type="text/JavaScript"></script>
      
  </body>
</html>