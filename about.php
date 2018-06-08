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
<title>About</title>

<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" >
<link href="css/about.css" rel="stylesheet" type="text/css">
 <link rel="stylesheet" href="css/reg.css" type="text/css" >
 <link href="css/subscription.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/footercss.css" type="text/css" >
 <!-- <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css"> -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
 <link rel="stylesheet" href="css/dashheader.css">
 
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script src="js/credential.js"></script>

<style type="text/css">
  /*SLIDER3 START*/
.btn-primary2 {
  color: #7dd3d5 !important;
  background-color: transparent;
  border-color: #7dd3d5 !important;
  border: 2px solid #7dd3d5;
  font-weight: 500;}

.btn-primary2:hover {background-color: #7dd3d5; 
  color: #fff !important;}

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
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-

out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn2 {
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
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 1.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
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
<?php //include'header.php'; ?>
  <div id="result"></div>
<!--SLIDER-->
  
<div class="container-fluid slider-bg mb-0">
  <div class="container text-center">
       <h2>DIVE THRU WHAT YOU GO THRU</h2>
     <h4>AND RECONNECT WITH YOURSELF </h4>
     <a href="subscription.php" style="box-shadow: none !important;text-decoration:none;color: #fff;" class="btn1 btn-primary1  mt-md-5 mt-4 py-2 mx-2 px-3">S U B S C R I B E &nbsp; N O W</a>
    <a href="registration.php" style="box-shadow: none !important;text-decoration:none;" class="btn1 btn-primary1 btn-primary2 mt-md-5 mt-4 py-2 mx-2 px-4">J O I N &nbsp; F O R &nbsp; F R E E</a>
  </div>
</div>
  
  
  
<!-- video back play over -->
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
                                <h1 style="font-weight: 300;">
                                    Discover How DiveThru Helps You<br>&
                                </h1>
                                <h1 style="font-weight: 300;">
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
                          

  
<!--123-->
  
<div class="container-fluid py-5">
     <div class="container text-center here">
        
     <h2 style="font-weight: 700;">Here's how it works</h2>
     
     <div class="row justify-content-center">
          <div class="col-md-3 col-7 text-center mt-5">
           <img src="img/round1.png" class="img-fluid" />
          <h4 class="mt-4" style="font-weight: 700;">Title</h4>
          <h6>Subtexts Subtexts</h6>
        </div>
       
       <div class="col-md-3 col-7 text-center mt-5">
           <img src="img/round2.png" class="img-fluid" />
         <h4 class="mt-4" style="font-weight: 700;">Title</h4>
          <h6>Subtexts Subtexts</h6>
        </div>
       
       <div class="col-md-3 col-7 text-center mt-5">
           <img src="img/round3.png" class="img-fluid" />
         <h4 class="mt-4" style="font-weight: 700;">Title</h4>
          <h6>Subtexts Subtexts</h6>
        </div>
     </div>
   </div> 
</div>
  
    <div class="container-fluid mt-5" style="background-color: #f3f3f3; padding: 5% 0%;">
  
       <div class="container">
       <div class="box-slider">
  
       <h3 class="text-center py-2" style="padding: 0;font-weight: 700;">Here's What's Inside</h3>
      </div>

           <div id="aj1" class="carousel slide" data-ride="carousel" data-interval="false">
                            
                
            <div class="carousel-inner">
                 
                <div class="carousel-item active">
                  
                                         
                  <div class="row text-center box justify-content-center">

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/10.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 1</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/2.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 2</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/3.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 3</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/4.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 4</p>
                        </div>
                        </div>
                     </div>

                   </div>
                                         
                </div>

                <div class="carousel-item">
                                        
                  <div class="row text-center box justify-content-center">

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/10.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 5</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/2.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 6</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/3.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 7</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/4.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 8</p>
                        </div>
                        </div>
                     </div>

                   </div>
                                         
                </div>

                <div class="carousel-item">
                                        
                  <div class="row text-center box justify-content-center">

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/10.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 9</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/2.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 10</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/3.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 11</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-2 col-8 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/4.png">
                        <div class="card-img-overlay1">
                           <p class="center">Session 12</p>
                        </div>
                        </div>
                     </div>

                   </div>
                                        
                </div>
              
            </div>

          <a class="carousel-control-prev" href="#aj1" style="width: 24%;" role="button" data-slide="prev">
                         <span><img src="img/ic_back_l.png" class="d-none d-md-block"/></span>
                    </a>
                   
            <a class="carousel-control-next" href="#aj1"  style="width: 24%;" role="button" data-slide="next">
                           <span><img src="img/ic_back_r.png" class="d-none d-md-block"/></span>
   
                    </a>  
  </div>     

               </div>
          
  

  </div>



  
<section class="bg-white text-center pt-5 pb-5">
                      <div class="container">
                        <div class="row mt-5">
                            <div class="col-lg-6 mb-5">
                                 <img src="img/mobile.png" class="img-responsive" height="400" width="200">
                            </div>
              
                            <div class="col-lg-6">
                                <h3 class="mb-2 txtpos" style="color: #34495e; font-weight: 700;">
                                    It's Time To<br> DiveThru 
                               </h3>
                               <br>
                                <h6 class="lead mb-0 txtpos" style="color: #727272; font-weight: 400;  font-size: 20px;"> 
                                   Download the DiveThru app<br>or sign up online to find<br>the peace within.
                              </h6>
                              <br>
                               <a href="subscription.php" class="btn btn-primary btnpos" style="border-color: #7dd3d5;box-shadow: none !important;   background-color: #7dd3d5;">S U B S C R I B E &nbsp; N O W</a>
                               <br><br>
                                <a href="registration.php" class="btn btn-primary btnpos" style="border-color: #7dd3d5;  box-shadow: none !important; background-color: #7dd3d5;"> &nbsp;J O I N &nbsp; F O R &nbsp; F R E E &nbsp;  </a>
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
<script src="js/bootstrap.bundle.min.js"></script>
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
