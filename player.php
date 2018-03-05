<!DOCTYPE html>
<html style="width:100%; height: 100%;">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>

 <link rel="stylesheet" href="css/not.the.skin.css">
    <link rel="stylesheet" href="img/playerimg/circle.player.css">

<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">

<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
    <script  src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
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

<style>
body {font-family: roboto; margin:0}

</style>
<script type="text/javascript">
    $(document).ready(function(){
		  window.history.forward(1);
		var user = JSON.parse(window.localStorage.getItem('user'));
		  

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

    if(conversation == window.localStorage.getItem('content')){
console.log(conversation+'=='+ window.localStorage.getItem('content')+'='+storedNames[i][j].session_name);
		//if(conversation == 1){
			$(".conv").html(storedNames[i][j].session_name);
			console.log(storedNames[i][j].meditation_audio[0]);
			//$('audio').attr('src',storedNames[i][j].meditation_audio[0])[0];
			//$('audio').attr('type','audio/mp3')[0];
			var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
			  {
			    mp3:storedNames[i][j].meditation_audio[0],
			  // oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
			  }, {
				cssSelectorAncestor: "#cp_container_2"
			  });
		}
	conversation++;
	}
}
	 // console.log(user.halted);
	  
	  /* Play auio on halted time Start*/
	  if(user.halted != 0.0 || user.halted != ''){
	  var vid = document.getElementById("jp_audio_0");
	  vid.currentTime = user.halted*60;	//time is in minute to second (time*60)
  }else{
    var vid = document.getElementById("jp_audio_0");
    vid.currentTime = 0; //time is in minute to second (time*60)
  }
	  /* Play audio on halted End*/
	  
	  /* pause event Start*/
	  
	  $("audio").bind('pause',function(){
		  var vid = document.getElementById("jp_audio_0");
		  const currentTime = Math.floor(vid.currentTime)/60;
		 // const min = currentTime/60;
		  console.log("c"+currentTime+user.user_id);
			var db = firebase.database();
			db.ref("Users/"+user.user_id+"/halted").set(currentTime); // Update lalted time on pause
	  }); 
	  /*Pause Event end*/
	  
	  
	  /* Audio ended event Start*/
	  
	  $("audio").bind('ended',function(){
		 // var vid = document.getElementById("jp_audio_1");
			var db = firebase.database();
			db.ref("Users/"+user.user_id+"/halted").set(0.0); // Update lalted time on pause

            db.ref("Users/"+user.user_id+"/last_free_conversation_id").set(user.last_free_conversation_id + 1);
	  }); 
	  
	  /* Audio ended Event end*/
	  
	  /* Audio Time Event Start*/
	  
	  $("audio").bind('timeupdate',function(){
			var vid = document.getElementById("jp_audio_0");
		 const currentTime = Math.floor(vid.currentTime);
            const duration = Math.floor(vid.duration);
			//var min = currentTime/60;
//alert(vid.currentTime);
			console.log("time"+currentTime);
			 var str = parseInt(currentTime / 60) + ':' + (currentTime % 60);
			 $(".time").html(str);
      console.log("time"+str );

	  });
	//  myOtherOne.option("enableRemoveControls", true); // Set option
    });
    </script>
</head>
<body style="width:100%; height: 100%;">

<div class="container-fluid bg" onclick="play();">
 
<div class="row pad" style="    height: 5px;">
  <div class="col-10 col-sm-11 icon" style="padding-left:0;">
    <img class="bgicon" src="img/ic_reminder_w@3x.png" />
  <a data-toggle="modal" data-target="#myModal">
    <img  class="bgicon" src="img/ic_info@3x.png" />
  </a>  
  </div>
  <div class="col-2 col-sm-1 icon1">
   <a href="http://34.215.40.163/dashboard.php"><img class="clsicon" src="img/ic_close@3x.png" /></a>
  </div>
</div>
  <h3 class="txtintro" style="color: #fff; text-align: center;">10 Day Intro Program </h3>

<div class="container txt-top" >
          
    <div class="row text-center">
           <div class="col-12 abc" >  
                 
              <h2 class="conv"> Conversation 1 </h2>
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
	<!-- 	<span class="time" style="font-size: 25px;color:white;">00:00</span> -->
      </center>
             <h6 class="conv1">Tap anywhere to play</h6>
           </div>
    </div>

     
       
       
        
      <!--<div class="row justify-content-center">
            
            <div class="box">
                <p>3 <br> min</p>
            </div>
            
            
            <div class="box box1 ">
                <p>5 <br> min</p>
           
            </div>
        
            
            <div class="box ">
                <p>10 <br> min</p>
           
            </div>
          
     </div>---->
        
       
        
      
        
    </div>
 </div>
  
</div>





<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-size"  role="document">
    <div class="modal-content modal-style">
      
      <div class="modal-body text-center">
        
        <h2 >Conversation</h2>
        
       <!-- <h4>Basic</h4>-->
        
        <p>

        </p>
        
        <a href="#" class="btn btn-color">DIVE THRU</a>
      </div>
      
    </div>
  </div>
</div>
    <script type="text/javascript" src="js/dashboard.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script>
   function play(){
          var vid = document.getElementById("jp_audio_0");
      if (vid.paused == false) {
        vid.pause();
        console.log('music paused LINE NO:262 player.php');
      } else {
        vid.play();
        console.log('music playing LINE NO:265 player.php');
      }
      
    }

    $(document).ready(function () {

//$('#myModal').modal(options)
        //$('.mediPlayer').mediaPlayer();
	//	var t1 = $("#jquery_jplayer_2").jPlayer("pause", event.jPlayer.status.currentTime);
 $("#jquery_jplayer_2").jPlayer("play", "10");
//console.log('d'+$("#jquery_jplayer_2").data('jPlayer').status.currentTime);
//console.log('d'+t);
    });
</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<script>
/*var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
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
}*/

</script>

</body>
</html> 