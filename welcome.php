<!DOCTYPE html>
<html style="width:100%; height: 100%;">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
 <link rel="stylesheet" href="css/not.the.skin.css">
    <link rel="stylesheet" href="img/playerimg/circle.player.css">

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js"></script>
    <script type="text/javascript" src="js/playerjs/jquery.transform2d.js"></script>
    <script type="text/javascript" src="js/playerjs/jquery.grab.js"></script>
    <script type="text/javascript" src="js/playerjs/jquery.jplayer.js"></script>
    <script type="text/javascript" src="js/playerjs/mod.csstransforms.min.js"></script>
    <script type="text/javascript" src="js/playerjs/circle.player.js"></script>
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
    <script type="text/javascript" src="js/dashboard.js"></script>
<style>
* {box-sizing: border-box}
body {font-family: roboto; margin:0}

.mySlides 
   { 
     display: none; 
   height: 100%; 
   width: 100%; 
   -moz-background-size: cover;
     background-size: cover;
   }
img {vertical-align: middle;}
/* Slideshow container */
.slideshow-container {
}
/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
}

/* css for upper image */
.upperImage{
  width: 250px;
  height: 150px;
  float: left;
}

.secondUpper{
  position: relative;
  right: 5px;
}

/* css for bottm image */
.underImage{
  width: 150px;
  height: 150px;
  float: left;
}
/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}
/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}
/* Caption text */
.text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 28px;
    color: white;
    font-weight: 100;
    text-align: center;
    transform: translateX(-50%) translateY(-50%);
}
/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}
/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 10px;
  width: 10px;
  margin: 0 2px;
  background-color: #ffffff6b;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}
.active, .dot:hover {
  background-color: #ffff;
}
  .spacesDown{
    right: 8.9px; 
  }
  .spacesUp{
    left: 8.9px; 
  }
.videoPlayer{
  margin-top: 6%;
  width: 420px;
}
.playerimage{
  height: 40%; 
  width: 40%;
}
.marketbtn{
  background-color: white;
  color: #FFF;
  font-size: 16px;
  border-radius: .25rem;
  padding: 15px 7px 15px 20px;
  border-width: 0px;
}
.buttonross{
  width: 20px;
    height: 20px;
    right: 10px;
    top: 10px;
    position: absolute;
}
/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 0.2s;
  animation-name: fade;
  animation-duration: 0.2s;
}
@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}
@keyframes fade {
  from {opacity: .6} 
  to {opacity: 1}
}
/* On smaller screens, decrease text size */
@media screen and (max-width: 898px){
  .text {font-size: 19px; width: 100%;}
  .text1 {font-size: 18px}
  .playerimage{
  height: 50px; 
  width: 50px;
  }
  .spacesDown{
    right: 7px; 
  }
  .spacesUp{
    left: 7px; 
  }
}
@media screen and (max-width: 658px){
  .text {font-size: 18px; width: 80%;}
}
@media screen and (max-width: 520px){
  .text {font-size: 18px}
  .videoPlayer{    
    width: 279px;
  }
  .bottomAny{
  font-size: 14px
  }
  .lastimageTextView{
  font-size: 16px;
  width: 100%;
  }
}
@media screen and (max-width: 443px) {
  .text {font-size: 17px}
  .videoPlayer{    
    width: 260px;
  }
    .bottomAny{
  font-size: 12px
  }
}
</style>
<script type="text/javascript">
    $(document).ready(function(){
    
    var user = JSON.parse(window.localStorage.getItem('user'));
      if(user.visited != 0){
// /console.log(user);
        window.location = "dashboard.php";
      }
      /*
       * Instance CirclePlayer inside jQuery doc ready
       *
       * CirclePlayer(jPlayerSelector, media, options)
       *   jPlayerSelector: String - The css selector of the jPlayer div.
       *   media: Object - The media object used in jPlayer("setMedia",media).
       *   options: Object - The jPlayer options.
       *
       * Multiple instances must set the cssSelectorAncestor in the jPlayer options. Defaults to "#cp_container_1" in CirclePlayer.
       */
var storedNames = JSON.parse(window.localStorage.getItem("session"));




    /*  var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",{
        cssSelectorAncestor: "#cp_container_1"
      });*/

      // This code creates a 2nd instance. Delete if not required.

      var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
      {
       // m4a:"http://www.jplayer.org/audio/m4a/Miaow-04-Lismore.m4a",
      //  oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
      }, {
        cssSelectorAncestor: "#cp_container_2"
      });
for (i in storedNames)
{
  var conversation = 1;
   for(j in storedNames[i]){

//console.log(conversation);
    //if(conversation == window.localStorage.getItem('content')){
    if(conversation == 1){
      $(".conv").html(storedNames[i][j].session_name);
      console.log('M'+storedNames[i][j].meditation_audio[0]);
      $('audio').attr('src',storedNames[i][j].meditation_audio[0])[0];
      $('audio').attr('type','audio/mp3')[0];
      var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
        {
          mp3:storedNames[i][j].meditation_audio[0],
        //  oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
        }, {
        cssSelectorAncestor: "#cp_container_2"
        });
    }
  conversation++;
  }

}
    console.log(user.halted);
    
    /* Play auio on halted time Start*/
    
    var vid = document.getElementById("jp_audio_0");
    vid.currentTime = user.halted*60; //time is in minute to second (time*60)

    /* Play audio on halted End*/
    
    /* pause event Start*/
    
    $("audio").bind('pause',function(){
      var vid = document.getElementById("jp_audio_0");
      const currentTime = Math.floor(vid.currentTime)/60;
     // const min = currentTime/60;
      console.log(currentTime);
      var db = firebase.database();
      db.ref("Users/"+user.user_id+"/halted").set(currentTime); // Update lalted time on pause
    }); 
    /*Pause Event end*/
    
    
    /* Audio ended event Start*/
    
    $("audio").bind('ended',function(){
     // var vid = document.getElementById("jp_audio_0");
      var db = firebase.database();
      db.ref("Users/"+user.user_id+"/halted").set(0.0); // Update lalted time on pause
//            db.ref("Users/"+user.user_id+"/last_free_conversation_id").set(); // Update lalted time on pause
    }); 
    
    /* Audio ended Event end*/
    
    /* Audio Time Event Start*/
    
    $("audio").bind('timeupdate',function(){
      var vid = document.getElementById("jp_audio_0");
     const currentTime = Math.floor(vid.currentTime);
            const duration = Math.floor(vid.duration);
            var sec = 0;
            var min = 0;
            var hur = 0;
      //var min = currentTime/60;
//alert(vid.currentTime);
    if((currentTime % 60)<=9){
      sec = '0' + Math.floor((currentTime % 60));
    }else{
      sec =  Math.floor((currentTime % 60));
    }

    if((currentTime / 60)<=9){
      min = '0' + Math.floor((currentTime / 60));
    }else{
      min = Math.floor((currentTime / 60));
    }

    if((currentTime / 120)<=9){
      hur = '0' + Math.floor((currentTime / 60));
    }else{
      hur = Math.floor((currentTime / 60));
    }


 var str =  min + ':' + sec;
  $(".time").html(str);
      console.log("time"+currentTime);
    });
  //  myOtherOne.option("enableRemoveControls", true); // Set option
    });
    </script>
</head>
<body style="width:100%; height: 100%;">

<div class="slideshow-container" style="width:100%; height: 100%; background-color: lightblue;">
    <div>
        <a href="http://34.215.40.163/dashboard.php"><img class="buttonross"  onclick="redirect_page();" src="img/ic_close.png"></a>
    </div>
<div class="mySlides" style="background: #66348b url('img/spls 1.png') no-repeat center center;" onclick="plusSlides(1)">
  <div class="text">Congratulations!<br>You are now ready to<br>DIVE THRU</div>
</div>

<div class="mySlides fade" style="background: #5fb399 url('img/spls 1.png') no-repeat;" onclick="plusSlides(1)">
    <div class="text"><p style="display:inline">Dive Thru will help you</p>
  <br>
    <p style="display:inline">dive thru what you go thru.</p>
  <br>
    Here's how
  </div>
</div>

<div class="mySlides fade" style="background: #b679d3 url('img/spls 1.png') no-repeat;" onclick="plusSlides(1)">
  <div class="text text1">We combine the power of guided<br>meditation with journaling to create<br>CONVERSATION that will help you<br>reconnect with yourself.</div>
</div>

<div class="mySlides fade" style="background: #139e8c url('img/spls 1.png') no-repeat;" onclick="plusSlides(1)">
  <div class="text">Never meditated or journaled?<br>Dive Thru makes it simple.<br>All you need is quiet space,<br>a journal and time for yourself.</div>
</div>

<div class="mySlides fade" onclick="plusSlides(1)" style="background: #66348b url('img/spls 1.png') no-repeat;">
  <div class="text" >
      Here's everything you<br>need to know:<br>
      <video class="videoPlayer" id="video" controls="">
        <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4">
      </video>
  </div>
</div>

<div class="mySlides fade"  onclick="pause();">
  <img src="img/spls 2.png" height="100%" width="100%" style="object-fit: cover;" onclick="plusSlides(1)">
  <div class="text">
    Let's dive in.<br>
    <h2 style="font-weight: 100;">Conversation 1</h2><br>
      <center>
        <div id="jquery_jplayer_1" class="cp-jplayer"></div>
        <div id="jquery_jplayer_2" class="cp-jplayer"></div>
        <div class="prototype-wrapper">
              <div id="cp_container_2" class="cp-container">
                <div class="cp-buffer-holder">
                  <div class="cp-buffer-1"></div>
                  <div class="cp-buffer-2"></div>
                </div>
                <div class="cp-progress-holder">
                  <div class="cp-progress-1"></div>
                  <div class="cp-progress-2"></div>
                </div>
                <div class="cp-circle-control"></div>
                <ul class="cp-controls">
                  <li><a class="cp-play" tabindex="1">play</a></li>
                  <li><a class="cp-pause" style="display:none;" tabindex="1">pause</a></li>
                </ul>
              </div>
        </div>
        <!-- <span class="time">00:00</span> -->
      </center>
        
  </div>
</div>

<div class="mySlides fade" style="background: #b679d3 url('img/spls 1.png') no-repeat;">
  <div class="text lastimageTextView">
    <br><br><br>
       <a class="btn btn-primary marketbtn" href="http://34.215.40.163/dashboard.php" style=" border-color: #7dd3d5; text-decoration: none; background-color: #7dd3d5;">S T A R T &nbsp; T O &nbsp; D I V E T H R U &nbsp;</a>
    </p><br><br>

          
        
        
        </div>
  </div>

</div>

<div style="text-align: center; margin-top: -48px; color: white; font-family: inherit; opacity: 1;">
  <span class="bottomAny">
        T A P  &nbsp A N Y W H E R E  &nbsp T O  &nbsp C O N T I N U E
    </span>
</div>

<div style="text-align: center; margin-top: -50px;">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span>
  <span class="dot" onclick="currentSlide(4)"></span> 
  <span class="dot" onclick="currentSlide(5)"></span> 
  <span class="dot" onclick="currentSlide(6)"></span>
  <span class="dot" onclick="currentSlide(7)"></span>
</div>
<script>
    $(document).ready(function () {
        //$('.mediPlayer').mediaPlayer();
  //  var t1 = $("#jquery_jplayer_2").jPlayer("pause", event.jPlayer.status.currentTime);
 //$("#jquery_jplayer_2").jPlayer("play", "10");
//console.log('d'+$("#jquery_jplayer_2").data('jPlayer').status.currentTime);
//console.log('d'+t);


    firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
          window.location.href = "http://34.215.40.163/login.php";
        // User is signed in.
    } 
});

    });
</script>
<script type="text/javascript">
function pause(){
  
   var vid = document.getElementById("jp_audio_0");
   vid.pause();
}
function pausevideo(){
  var v = document.getElementById("video");
  v.pause();
}
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
function redirect_page()
{
	window.location.href = "dashboard.php";
}  
</script>
<script>
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  if(n != 6){
    pause();
  }
 /* if(n != 5){
    pausevideo();
  }*/
  showSlides(slideIndex = n);
}
function showSlides(n) {
  /**/
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

</script>

</body>
</html> 