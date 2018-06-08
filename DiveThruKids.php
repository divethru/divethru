<?php
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
 ?>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>DiveThru Kids</title>
    
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="css/divethruforkids.css" rel="stylesheet" type="text/css">
    <link href="css/footercss.css" rel="stylesheet" type="text/css">
    <link href="css/reg.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">

 <link rel="stylesheet" href="css/dashheader.css">
 
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script src="js/credential.js"></script>

  <style type="text/css">
  /*SLIDER3 START*/


.slider3-pad {background-image:url(../img/home%20page_img_2.png); 
              padding-top:310px;
        padding-bottom:350px;  
        min-width: 100%; 
        background-size: cover; 
        background-repeat: no-repeat; 
        background-position: center;}
        
.slider3-pad h1 {font-size:62px;}

.video img {width:200px;
            height:200px;
      margin-top:70px;}

@media (max-width:2560px){ 


.slider3-pad {background-image:url(img/home%20page_img_2.png); 
        padding-top:260px !important;
        padding-bottom:350px;  
        min-width: 100%; 
        background-size: cover; 
        background-repeat: no-repeat; 
        background-position: center;}
        
.slider3-pad h1 {font-size:58px;}

.video img {width:200px;
            height:200px;
      margin-top:70px;}

}
    
@media (max-width:2240px){  
.slider3-pad {background-image:url(img/home%20page_img_2.png); 
              padding-top:310px;
        padding-bottom:350px;  
        min-width: 100%; 
        background-size: cover; 
        background-repeat: no-repeat; 
        background-position: center;}
        
.slider3-pad h1 {font-size:52px;}

.video img {width:150px;
            height:150px;
      margin-top:70px;}
      
}
      
@media (max-width:768px){
.slider3-pad {
              padding-top:310px;
        padding-bottom:350px;}
        
.slider3-pad h1 {font-size:46px;}

.video img {width:150px;
            height:150px;
      margin-top:70px;}
  
  }
  
@media (min-width:768px) and (max-width:849px){.slider3-pad {
              padding-top:260px !important;
        padding-bottom:350px;}
        
.slider3-pad h1 {font-size:46px;}

.video img {width:150px;
            height:150px;
      margin-top:70px;}}
  
@media (min-width:426px) and (max-width:755px){
  
.slider3-pad {
              padding-top:280px;
        padding-bottom:350px;}
        
.slider3-pad h1 {font-size:24px;}

.video img {width:150px;
            height:150px;
      margin-top:70px;}
  
  
  }
 @media (min-width:320px) and (max-width:375px ){
      .slider3-pad {height: 500px;
              padding-top:125px !important;
        padding-bottom:125px;}
        
.slider3-pad h1 {font-size:24px !important;}

.video img {width:80px;
            height:80px;
      margin-top:-10px;}
  

 } 

  
@media (min-width:388px) and (max-width:425px ){
   
.slider3-pad {height: 500px;
              padding-top:140px !important;
        padding-bottom:140px;}
        
.slider3-pad h1 {font-size:24px !important;}

.video img {width:80px;
            height:80px;
      margin-top:-10px;}
  
   }  

  
@media (max-width:387px){



.slider3-pad {
            height: 500px;
              padding-top:140px;
        padding-bottom:140px;}
        
.slider3-pad h1 {font-size:24px;}

.video img {width:50px;
            height:50px;
      margin-top:-10px;} }

.modal-dialog {
      max-width: 800px;
      margin: 30px auto;}
   
   
.modal-body {
  position:relative;
  padding:0px;
}
.close {
  position:absolute;
  right:14px;
  top:0;
  z-index:999;
  font-size:2rem;
  font-weight: normal;
  color:#fff;
  opacity:1;
}

.mobileShow {display: none;} 
 /* Smartphone Portrait and Landscape */ 
  @media only screen 
    and (min-device-width : 320px) 
    and (max-device-width : 480px){ 
      .mobileShow {display: inline; }
      .fullscreen {
    width: 100% !important;
    height: auto !important;
    margin: 0;
    top: 100;
    left: 0;
    position: fixed;

}
.video-responsive{
        overflow:hidden;
        /*padding-bottom:56.25%;*/
        position:relative;
        height:0;
        margin:-14% 0% 0% 0% !important;
    }
.cls{
  margin-right: 41px;
}
  }
  @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1023px){ 
      .fullscreen {
    width: 100% !important;
    height: auto !important;
    margin: 0;
    top: 0;
    left: 0;
    position: fixed;

}
.video-responsive{
        overflow:hidden;
        /*padding-bottom:56.25%;*/
        position:relative;
        height:0;
        margin:-6% 0% 0% 0% !important;
    }
.cls{
  margin-right: 41px;
}
    }
    @media only screen and (max-device-width: 768px) and (orientation: 

landscape) and (max-device-width : 1023px){
      .fullscreen {
          width: 130% !important;
          height: auto !important;
          margin: 0;
          top: ;
          left: 0;
          position: fixed;

      }
      .cls{
        margin-right: 41px;
      }

    }

     @media only screen 
    and (min-device-width : 1024px) 
    and (max-device-width : 1300px){ 
      .fullscreen {
    width: 128% !important;
    height: auto !important;
    margin: 0;
    top: ;
    left: 0;
    position: fixed;

}
.video-responsive{
        overflow:hidden;
        /*padding-bottom:56.25%;*/
        position:relative;
        height:0;
        margin:-5% 0% 0% 0% !important;
    }
.cls{
  margin-right: 41px;
}
    }

      @media only screen 
    and (min-device-width : 1310px) 
    and (max-device-width : 1440px){ 
      .fullscreen {
    width: 171% !important;
    height: auto !important;
    margin: 0;
    top: 0;
    left: 0;
    position: fixed;

}
.video-responsive{
        overflow:hidden;
        /*padding-bottom:56.25%;*/
        position:relative;
        height:0;
        margin:-4% 0% 0% 0%;
    }
.cls{
  margin-right: 41px;
}
    }
     @media only screen 
    and (min-device-width : 1440px) 
    and (max-device-width : 1610px){ 
      .fullscreen {
    width: 200% !important;
    height: auto !important;
    margin: 0;
    top: 0;
    left: 0;
    position: fixed;
    }
}
@media only screen 
    and (min-device-width : 1620px) 
    and (max-device-width : 2559px){ 
      .fullscreen {
    width: 238% !important;
    height: auto !important;
    margin: 0;
    top: 0;
    left: 0;
    position: fixed;
}

.cls{
  margin-right: 61px;
}
    }


.video-responsive{
        overflow:hidden;
        /*padding-bottom:56.25%;*/
        position:relative;
        height:0;
         margin:-4% 0% 0% 0%;
    }
    .video-responsive iframe{
        left:0;
        top:0;
        height:100%;
        width:100%;
        position:absolute;
    }
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

<body style="margin-top:118px;">
	
<!--SLIDER-->
	<?php //include 'header.php'; ?> 
   <div id="result"></div>
<div class="container-fluid slider">
        	
        <div class="container text-center">
	         <div class="btn1 btn-primary1 py-3 mt-4 mx-md-3 mx-1">S U B S C R I B E & H E L P &nbsp; Y O U T H</div>
			 <div class="btn1 btn-primary1 btn-primary2 py-3 mt-4 mx-md-3 mx-1">R E Q U E S T &nbsp; S C H O O L</div>
	    </div>
	
</div>
	
<!--MADITATION-->
	
<div class="container-fluid py-5">

	<div class="container text-center maditation py-5">
	     <h2 class="mb-4">Meditation for kids</h2>
		<p>We have harnessed the power of guided meditation and journaling to bring you 100s of<br>
conversations that will reconnect you with yourSelf. We have harnessed<br>
the power of guided meditation and journaling to bring you 100s of conversations that will reconnect you with yourSelf.<br>
</p>
	</div>
	
</div>
	<header class=" text-white text-center mt-0 ">
                      <!-- video back play start -->
                      <div class="videohide video-responsive">
                            
                          <iframe class="embed-responsive-item show"  id="videoplayback" width="1000" height="315" src="" id="video"  allowscriptaccess="always" frameborder="0" allowfullscreen></iframe>
                        </div>
                          <div id="videotrigger"  >
                      <!-- video back play over -->

                          <div class="container slider3-pad mt-5">
                            <div class="row">
                              <div class="col-xl-9 mx-auto">
                                <h1 style="font-weight: 400;">
                                    Discover How DiveThru Helps You<br>&
                                </h1>
                                <h1 style="font-weight: 400;">
                                   How Your Membership Helps Youth
                                </h1>
                                <br>
                              <!--   <a href=""><img src="img/play.png" height="100" width="100" data-toggle="modal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk" data-target="#myModal" ></a> -->
                              <div class="video">
                                <img src="img/play.png"  class=" video-btn" data-toggle="modal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk" data-target="#myModal">       </div>
                               
                              
                            </div>
                          </div>
                           </div>
                          </div>
                    </header>
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog fullscreen" role="document">
                          <div class="modal-content fullscreen">

                            
                            <div class="modal-body">

                             <button type="button" style="background-color: #fff; padding: 5px 10px; border-radius: 5px;color: #000; margin-top: 2%;
" class="close cls" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>        
                              <!-- 16:9 aspect ratio -->
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="" id="video"  allowscriptaccess="always">></iframe>
                      </div>
                              
                              
                            </div>

                          </div>
                        </div>
                      </div>
<!--BUTTON-->
	
<div class="container-fluid px-0">
	
	<div class="container py-5">
	     <div class="row justify-content-center">
		     <div class="btn1 btn-primary4 py-3 mt-3">S U B S C R I B E &nbsp; A N D &nbsp; H E L P &nbsp; Y O U T H </div>
		 </div>
		<div class="row justify-content-center">
		     <div class="btn1 btn-primary3 py-3 mt-4">S U B M I T &nbsp; S C H O O L &nbsp; F O R &nbsp; A C C E S S</div>
		 </div>
	</div>
	
</div>
	
	
	
<!--ROUND-->
	

	
<div class="container-fluid py-5">
     <div class="container text-center here">
	      
		 <h2>Here's how it works</h2>
		 
		 <div class="row justify-content-center">
		      <div class="col-8 col-md-4 col-lg text-center mt-5">
			     <img src="img/c1.png" class="img-fluid" />
				  <h4 class="mt-4">Title</h4>
				  <h6>Subtexts Subtexts</h6>
			  </div>
			 
			 <div class="col-8 col-md-4 col-lg text-center mt-5">
			     <img src="img/c2.png" class="img-fluid" />
				 <h4 class="mt-4">Title</h4>
				  <h6>Subtexts Subtexts</h6>
			  </div>
			 
			 <div class="col-8 col-md-4 col-lg text-center mt-5">
			     <img src="img/c3.png" class="img-fluid" />
				 <h4 class="mt-4">Title</h4>
				  <h6>Subtexts Subtexts</h6>
			  </div>
			 
			 <div class="col-8 col-md-4 col-lg text-center mt-5">
			     <img src="img/c4.png" class="img-fluid" />
				 <h4 class="mt-4">Title</h4>
				  <h6>Subtexts Subtexts</h6>
			  </div>
			 
			 <div class="col-8 col-md-4 col-lg text-center mt-5">
			     <img src="img/c5.png" class="img-fluid" />
				 <h4 class="mt-4">Title</h4>
				  <h6>Subtexts Subtexts</h6>
			  </div>
		 </div>
	    
	</div>	
</div>
<hr />
	

<!--WORD FOR SHOPIN-->
	
<div class="container-fluid py-5">

	<div class="container word">
	     <h2 class="mb-0">Words From Sophie</h2>
		 <div class="row justify-content-center my-4">
		     <div class="col-6 text-center">
			     <img src="img/2.png" class="img-fluid">
			 </div>
		 </div>
		<p>We have harnessed the power of guided meditation and journaling to bring you 100s of
conversations that will reconnect you with yourSelf.It’s simple Choose to Dive Thru for 11, 18 or
25 minutes, press, play, meditate, journal, then meditate again. Each session provides
you with everything you need to Dive Thru what you go Thru.

</p>
<h4>Sophie Gray / Founder and CEO</h4>
		<div class="row justify-content-center">
		     <div class="btn1 btn-primary4 py-3 mt-3">S U B S C R I B E &nbsp; A N D &nbsp; H E L P &nbsp; Y O U T H </div>
		 </div>
		<div class="row justify-content-center">
		     <div class="btn1 btn-primary3 py-3 mt-4">S U B M I T &nbsp; S C H O O L &nbsp; F O R &nbsp; A C C E S S</div>
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
                              <br>
                               <a href="http://34.215.40.163/subscription.php" class="btn btn-primary btnpos" style="border-color: #7dd3d5; box-shadow: none!important;  background-color: #7dd3d5;">S U B S C R I B E &nbsp; N O W</a>
                               <br><br>
                                <a href="http://34.215.40.163/registration.php" class="btn btn-primary btnpos" style="border-color: #7dd3d5; box-shadow: none!important; background-color: #7dd3d5;"> &nbsp;J O I N &nbsp; F O R &nbsp; F R E E &nbsp;  </a>
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



<!-- <script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script> -->
<script src="js/bootstrap.bundle.min.js" type="text/javascript"></script>
 <script type="text/javascript">


       $(document).ready(function() {
        
          $("#videoplayback").hide();
// Gets the video src from the data-src on each button

var $videoSrc;  
$('.video-btn').click(function() {
  $("#videoplayback").show();
  $("#videotrigger").hide();
    $videoSrc = $(this).data( "src" );
    $("#videoplayback").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
    videomute();
});
// console.log($videoSrc);

  $('.close').click(function() {
     //unmutevideo();
    $(".video-responsive").css("padding-bottom", "56.25%");
});
  
// when the modal is opened autoplay it  
$('#myModal').on('shown.bs.modal', function (e) {
    
// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
$("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" ); 
})
  
  
// stop playing the youtube video when I close the modal
$('#myModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src',$videoSrc); 
}) 
// document ready  
});


    </script>
</body>
</html>
