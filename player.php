<?php $url = $_SERVER['HTTP_REFERER'];?>
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
.btn1 {
  display: inline-block;
  font-weight: 400;
  color: #FFF;
  width: 72%;
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
  border-radius: 0.25rem;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (max-width:400px){
  .btn1 {
  display: inline-block;
  font-weight: 400;
  color: #FFF;
  width: 79%;
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
  border-radius: 0.25rem;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
}
body {font-family: roboto; margin:0}
.modal-footer1 {
    padding: 1rem;
    border-top: 1px solid #e9ecef;
}
</style>
<script type="text/javascript">
    $(document).ready(function(){
      window.history.forward(1);
    var user = JSON.parse(window.localStorage.getItem('user'));

   console.log(user.sessionHalted);
    var time ;
    window.bundle_id="" ;
    window.session_id="" ;
    window.cat_id = "";
    window.subcat_id = "";
    var data ;
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
// storedNames = JSON.parse(window.localStorage.getItem("session"));




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
if(window.localStorage.getItem('cat') == 'Deep Dive' && !window.localStorage.getItem("Dname")){
  //$("#OnloadModalTitle").html(window.localStorage.getItem('prevcat')); 
  $("#OnloadModalTitle").html(window.localStorage.getItem('cat'));
  $(".timeslot").show();
  var bundle = window.localStorage.getItem("bundle");
  $(".txtintro").html(bundle);    
  var s = JSON.parse(window.localStorage.getItem("session"));
  console.log(s);
    $(".bg").css('background', 'url('+s.session_img+') ');
      $(".conv").html(s.session_name);
      console.log(s.meditation_audio[0]);
     window.bundle_id = s.budle_id;
     window.session_id = s.session_id;
     window.subcat_id = window.localStorage.getItem("subcategory_id");
        var ts = '';
        var i = 0 ;
      for(time in s.meditation_audio_time){
        if(ts == 0){
          
        ts += '<div class="box box1" id="'+s.meditation_audio_time[time]+'" data-index="'+i+'"><p>'+s.meditation_audio_time[time]+' <br> min</p></div>'
        }else{
          ts += '<div class="box " id="'+s.meditation_audio_time[time]+'" data-index="'+i+'"><p>'+s.meditation_audio_time[time]+' <br> min</p></div>'
        }
        i++;
      } 
      console.log(ts);
  $(".timeslot").html(ts);
  $(".session").html(s.session_name);
  $(".sdesc").html(s.session_description);
      //$('audio').attr('src',s[i][j].meditation_audio[0])[0];
      //$('audio').attr('type','audio/mp3')[0];
      var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
        {
          mp3:s.meditation_audio[0],
        // oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
        }, {
        cssSelectorAncestor: "#cp_container_2"
      });
  
}else if(window.localStorage.getItem('cat') == 'Quick Dive' && !window.localStorage.getItem("Dname")){
  //$("#OnloadModalTitle").html(window.localStorage.getItem('prevcat')); 
  $("#OnloadModalTitle").html(window.localStorage.getItem('cat'));
  var cat = window.localStorage.getItem("subcategory");
  $(".txtintro").html(cat);
  $(".timeslot").show();
  var s = JSON.parse(window.localStorage.getItem("session"));
  console.log(s);
    $(".bg").css('background', 'url('+s.session_img+') ');
      $(".conv").html(s.session_name);
      console.log(s);
     
       window.bundle_id = window.localStorage.getItem("bid");
       window.session_id = s.session_id;
       window.subcat_id = window.localStorage.getItem("subcategory_id");
      var ts = '';
      var i = 0
  for(time in s.meditation_audio_time){
    if(ts == 0){
      
    ts += '<div class="box box1" id="'+s.meditation_audio_time[time]+'" data-index="'+i+'"><p>'+s.meditation_audio_time[time]+' <br> min</p></div>'
    }else{
      ts += '<div class="box " id="'+s.meditation_audio_time[time]+'" data-index="'+i+'"><p>'+s.meditation_audio_time[time]+' <br> min</p></div>'
    }
    i++;
  }
  $(".session").html(s.session_name);
  $(".sdesc").html(s.session_description);
  console.log(ts);
  $(".timeslot").html(ts);
    
      //$('audio').attr('src',s[i][j].meditation_audio[0])[0];
      //$('audio').attr('type','audio/mp3')[0];
      var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
        {
          mp3:s.meditation_audio[0],
        // oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
        }, {
        cssSelectorAncestor: "#cp_container_2"
      });
  
}else if(window.localStorage.getItem('cat') == 'Open Dive' && !window.localStorage.getItem("Dname")){
 // $("#OnloadModalTitle").html(window.localStorage.getItem('prevcat'));
 $("#OnloadModalTitle").html(window.localStorage.getItem('cat')); 
  $(".timeslot").show();
   $(".txtintro").html(window.localStorage.getItem('cat'));
var storedNames = JSON.parse(window.localStorage.getItem("session"));
var ts = '';
var i = 0;
for(time in storedNames.meditation_audio_time){
    if(ts == 0){
      
    ts += '<div class="box box1" id="'+storedNames.meditation_audio_time[time]+'" data-index="'+i+'"><p>'+storedNames.meditation_audio_time[time]+' <br> min</p></div>'
    }else{
      ts += '<div class="box " id="'+storedNames.meditation_audio_time[time]+'" data-index="'+i+'"><p>'+storedNames.meditation_audio_time[time]+' <br> min</p></div>'
    }
    i++;
  }
  console.log(ts);
$(".timeslot").html(ts);

  if(window.localStorage.getItem("Snm")){
            
      //  for (i in storedNames)
      //  {
         // var conversation = 1;
         //  for(j in storedNames[i]){

       // console.log(storedNames[i][j]);
            if(storedNames.session_name == window.localStorage.getItem("Snm")){
              if(window.localStorage.getItem("cid")){
                 window.bundle_id = window.localStorage.getItem("bid");
                 window.cat_id = window.localStorage.getItem("cid");
                   window.session_id = storedNames.session_id;
              }
            //if(conversation == 1){
             $(".session").html(storedNames.session_name);
               $(".conv").html(storedNames.session_name);
               $(".sdesc").html(storedNames.session_description);
              $(".bg").css('background', 'url('+storedNames.session_img+') '); /*Dynamic image from database*/
              console.log(storedNames.meditation_audio[0]);
              //$('audio').attr('src',storedNames[i][j].meditation_audio[0])[0];
              //$('audio').attr('type','audio/mp3')[0];
              var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
                {
                  mp3:storedNames.meditation_audio[0],
                // oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
                }, {
                cssSelectorAncestor: "#cp_container_2"
                });
            }
          //conversation++;
          //}
        //}

  }
}else if(window.localStorage.getItem('cat') && !window.localStorage.getItem("Dname")){
  $("#OnloadModalTitle").html(window.localStorage.getItem('cat')); 
  $(".timeslot").hide();
   $(".txtintro").html(window.localStorage.getItem('cat'));
var storedNames = JSON.parse(window.localStorage.getItem("session"));
  if(window.localStorage.getItem("Snm")){
            
      //  for (i in storedNames)
      //  {
         // var conversation = 1;
         //  for(j in storedNames[i]){
       

            if(storedNames.session_name == window.localStorage.getItem("Snm")){
              if(window.localStorage.getItem("cid")){
                 window.bundle_id = "";
      window.cat_id = window.localStorage.getItem("cid");
        console.log(window.bundle_id);
                  window.session_id = storedNames.session_id;
              }
            //if(conversation == 1){
             $(".session").html(storedNames.session_name);
               $(".conv").html(storedNames.session_name);
               $(".sdesc").html(storedNames.session_description);
              $(".bg").css('background', 'url('+storedNames.session_img+') '); /*Dynamic image from database*/
              console.log(storedNames.meditation_audio[0]);
              //$('audio').attr('src',storedNames[i][j].meditation_audio[0])[0];
              //$('audio').attr('type','audio/mp3')[0];
              var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
                {
                  mp3:storedNames.meditation_audio[0],
                // oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
                }, {
                cssSelectorAncestor: "#cp_container_2"
                });
            }

          //conversation++;
          //}
        //}

  }else{
  	     window.cat_id = window.localStorage.getItem("cid");
    var storedNames = JSON.parse(window.localStorage.getItem("session"));
        for (i in storedNames)
        {
          var conversation = 1;
           for(j in storedNames[i]){

            if(conversation == window.localStorage.getItem('content')){
        console.log(conversation+'=='+ window.localStorage.getItem('content')+'='+storedNames[i][j].session_name);
            //if(conversation == 1){
             //if(window.localStorage.getItem("cid")){
                 window.bundle_id = "";
                  window.session_id = storedNames[i][j].session_id;
              //}

              $(".conv").html(storedNames[i][j].session_name);
              $(".sdesc").html(storedNames[i][j].session_description);
              $(".bg").css('background', 'url('+storedNames[i][j].session_img+') '); /*Dynamic image from database*/
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

                /* Play auio on halted time Start*/
  /*  if(user.halted != 0.0 || user.halted != ''){
    var vid = document.getElementById("jp_audio_0");
    vid.currentTime = user.halted*60; //time is in minute to second (time*60)
  }else{
    var vid = document.getElementById("jp_audio_0");
    vid.currentTime = 0; //time is in minute to second (time*60)
  }*/
    /* Play audio on halted End*/

          conversation++;
          }
        }
  }
}else if(window.localStorage.getItem("Dname")){
$("#OnloadModalTitle").html(window.localStorage.getItem('cat2')); 
  //$(".timeslot").hide();
   $(".txtintro").html(window.localStorage.getItem('cat2'));

var SS = JSON.parse(window.localStorage.getItem("session2"));
 for (i in SS){
           for(j in SS[i]){
              conversation = 1;

              if(conversation == window.localStorage.getItem('content')){
                window.session_id = SS[i][j].session_id;
              if(SS[i][j].meditation_audio_time.length > 2){
                $(".timeslot").show();
                var ts = '';
                var l = 0;
               for(time in SS[i][j].meditation_audio_time){
                 var t = SS[i][j].meditation_audio_time[time];
                    if(ts == 0){
                      
                    ts = ts + '<div class="box box1" id="'+t+'" data-index="'+l+'"><p>'+t+' <br> min</p></div>'
                    }else{
                      ts = ts + '<div class="box " id="'+t+'" data-index="'+l+'"><p>'+t+' <br> min</p></div>'
                    }
                    l++;
                  }
              }

              $(".timeslot").html(ts);
                  $(".session").html(SS[i][j].session_name);
               $(".conv").html(SS[i][j].session_name);
               $(".sdesc").html(SS[i][j].session_description);
              $(".bg").css('background', 'url('+SS[i][j].session_img+') '); /*Dynamic image from database*/
              console.log(SS[i][j].meditation_audio[0]);
              //$('audio').attr('src',storedNames[i][j].meditation_audio[0])[0];
              //$('audio').attr('type','audio/mp3')[0];
              var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
                {
                  mp3:SS[i][j].meditation_audio[0],
                // oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
                }, {
                cssSelectorAncestor: "#cp_container_2"
                });
              }

          }     
 }
}else{
	     window.cat_id = window.localStorage.getItem("cid");
  $(".timeslot").hide();
     $(".txtintro").html(window.localStorage.getItem('cat'));

var storedNames = JSON.parse(window.localStorage.getItem("session"));
        for (i in storedNames)
        {
          var conversation = 1;
           for(j in storedNames[i]){

            if(conversation == window.localStorage.getItem('content')){
        console.log(conversation+'=='+ window.localStorage.getItem('content')+'='+storedNames[i][j].session_name);
            //if(conversation == 1){
             //if(window.localStorage.getItem("cid")){
                 window.bundle_id = "";
                  window.session_id = storedNames[i][j].session_id;
              //}

              $(".conv").html(storedNames[i][j].session_name);
              $(".sdesc").html(storedNames[i][j].session_description);
              $(".bg").css('background', 'url('+storedNames[i][j].session_img+') '); /*Dynamic image from database*/
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
  }




  // Category name on load modal
  /*if(window.localStorage.getItem('cat') || window.localStorage.getItem('cat') != ""){

  $("#OnloadModalTitle").html(window.localStorage.getItem('cat'));
  }else {
  $("#OnloadModalTitle").html(window.localStorage.getItem('prevcat'));  
  }*/
   // console.log(user.halted);
  /* if((window.localStorage.getItem("cat") != "10 Day Intro Program" || $(".txtintro").html()  != "10 Day Intro Program") && (user.sessionHalted)){
    alert("done");
   }*/


    if((window.localStorage.getItem("cat") != "10 Day Intro Program" || $(".txtintro").html()  != "10 Day Intro Program") && (user.sessionHalted )){
      $.map(user.sessionHalted, function(value, index) {
         var vid = document.getElementById("jp_audio_0");
                console.log(index+"=="+window.session_id);
            if(index == window.session_id){
            	//console.log(value);
            	//alert(value.slot);
                
                if(value.halted != 0.0 || value.halted != 0){
                	//alert($(".box1").data("index")+"=="+value.slot);
                   if(value.slot != undefined){
                		if($(".box1").data("index") == value.slot){
                  		//	vid.currentTime = value.halted; //time is in minute to second (time*60)
                		  $('#memberModal').modal("show");  

                		}
                	}

                }
                $(".continue").click(function(){
                  //alert(5);
                  if(value.slot != undefined){
                		if($(".box1").data("index") == value.slot){
                  			vid.currentTime = value.halted; //time is in minute to second (time*60)
                			
                		}
                	}
                  $('#memberModal').modal("hide");
                });

                // Code for begin with initial 
                $(".start").click(function(){
                  vid.currentTime = 0; //time is in minute to second (time*60)
                  $('#memberModal').modal("hide");
                });
              }
            });
    }else{
         var vid = document.getElementById("jp_audio_0");
    vid.currentTime = 0; //time is in minute to second (time*60)
    }
//alert($(".txtintro").html());
    /* Play auio on halted time Start*/
    if((window.localStorage.getItem("cat") == "10 Day Intro Program" || $(".txtintro").html()  == "10 Day Intro Program") && (user.halted != 0.0 || user.halted != 0  || user.halted != '')){
      $('#memberModal').modal("show");
    var vid = document.getElementById("jp_audio_0");
    // code for Continue from where you stop
    $(".continue").click(function(){
      //  alert(user.halted*60);
      vid.currentTime = user.halted; //time is in minute to second (time*60)
      $('#memberModal').modal("hide");
    });

    // Code for begin with initial 
    $(".start").click(function(){
      vid.currentTime = 0; //time is in minute to second (time*60)
      $('#memberModal').modal("hide");
    });
  }else{
    var vid = document.getElementById("jp_audio_0");
    vid.currentTime = 0; //time is in minute to second (time*60)
  }
    /* Play audio on halted End*/
    
    /* pause event Start*/
    
    $("audio").bind('pause',function(){
  //    alert(window.bundle_id);
  	var slot = '';

      	$(".box").each(function(index){
    			if($(this).hasClass("box1")){
    				console.log("test"+$(this).attr('id'));
    				slot = $(this).attr('id');
    			}
    	});
  	

      var vid = document.getElementById("jp_audio_0");
      const currentTime = vid.currentTime;
     // const min = currentTime/60;
      console.log("c"+currentTime+user.user_id);
      var db = firebase.database();
      if(window.localStorage.getItem("cat") == "10 Day Intro Program"){
        db.ref("Users/"+user.user_id+"/halted").set(currentTime); // Update lalted time on pause
      }else if(window.localStorage.getItem("cat") != "10 Day Intro Program"){
      	if($(".timeslot").css('display') != 'none'){
          hdata = {"halted":currentTime,"slot":$(".box1").data("index")};
  		}else{
          hdata = {"halted":currentTime};
  		}
       db.ref("Users/"+user.user_id+"/sessionHalted").child(window.session_id).set(hdata); // Update lalted time on pause
      }
    }); 
    /*Pause Event end*/
    
    
    /* Audio ended event Start*/
    
    $("audio").bind('ended',function(){
   //    alert(bundle_id);
     // var vid = document.getElementById("jp_audio_1");
            var db = firebase.database();

         if(window.localStorage.getItem("cat") != "10 Day Intro Program"){
          hdata = {"halted":0};
       db.ref("Users/"+user.user_id+"/sessionHalted").child(window.session_id).set(hdata); // Update lalted time on pause
      }
 

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
      console.log("time"+currentTime);

    });
  //  myOtherOne.option("enableRemoveControls", true); // Set option
    });
    </script>
</head>
<body style="width:100%; height: 100%;">

<div class="container-fluid bg" >
 
<div class="row pad" style="    height: 5px;">
  <div class="col-10 col-sm-11 icon" style="padding-left:0;">
   <!--  <img class="bgicon" src="img/ic_reminder_w@3x.png" /> -->
  <a data-toggle="modal" data-target="#exampleModalCenter2">
    <img  class="bgicon" src="img/ic_info@3x.png" />
  </a>  
  </div>
  <div class="col-2 col-sm-1 icon1">
   <a href="javascript:void(0)"><img class="clsicon" src="img/ic_close@3x.png" /></a>
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
                  <li><a class="cp-play"  tabindex="1">play</a></li>
                  <li><a class="cp-pause" style="margin-left: -4px;" style="display:none;" tabindex="1">pause</a></li>
                </ul>
              </div>
        </div>
  <!--  <span class="time" style="font-size: 25px;color:white;">00:00</span> -->
      </center>
           <!--  <h6 class="conv1">Tap anywhere to play</h6>---->
           </div>
    </div>

     
       <!--Endplayer modal Start --> 
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header mx-auto" style="border-bottom: 0 !important;">
        <h5 class="modal-title" id="exampleModalLongTitle" style="text-align: center !important; margin-left:  color: #34495e ! important;">  Write your today journal </h5>
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"> -->
         <!--  <span aria-hidden="true">&times;</span> -->
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group mb-0">
            <!-- <label for="message-text" class="col-form-label">Feedback:</label> -->
            <p id="boldStuff" style="color: red; font-size: 14px;"></p>
            <textarea class="form-control"  maxlength="200" style="height: 100px !important;"  id="message-text" required>As I read what I wrote, I connected with...</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer mt-0" style="border-top: 0 !important;">
        <button type="button" class="btn1 journaladd"  style="color:#FFF; background-color: #7DD3D5 !important; outline: none !important; border-color:  #7DD3D5 !important;"  >Add in My Journal</button>
      </div>
    </div>
  </div>
</div>
  <!--Endplayer modal end -->

       
        
      <div class="row justify-content-center timeslot" style="display: none;">
            
            <div class="box" id="3">
                <p>3 <br> min</p>
            </div>
            
            
            <div class="box box1 " id="5">
                <p>5 <br> min</p>
           
            </div>
        
            
            <div class="box " id="15">
                <p>10 <br> min</p>
           
            </div>
          
     </div>
        
       
        
      
        
    </div>
 </div>
  
</div>


<!--Onload Modal start -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header title_center">
        <h4 class="modal-title text-center" id="OnloadModalTitle" style="text-align: center !important; margin:auto;  color: #34495e;">10 day Intro program</h4>
        <!---<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>---->
      </div>
      
      <div class="modal-footer1 text-center">
        <!----<a href="http://34.215.40.163/player.php" class="btn1 mt-2 mx-1 " style="background-color: #7DD3D5 !important; outline: none !important; color:#FFF;  border-color:  #7DD3D5 !important; text-decoration: none;">Continue from last Session</a>---->
     <button type="button" class="btn1  mt-2 mx-1 continue" style="color:#FFF; background-color: #7DD3D5 !important; outline: none !important; border-color:  #7DD3D5 !important;">Continue from last Session</button>
      <div style="margin-top: 8px;font-weight: bold;"> OR</div>
        <button type="button" class="btn1  mt-2 mx-1 start" style="color:#FFF; background-color: #7DD3D5 !important; outline: none !important; border-color:  #7DD3D5 !important;">Start from beginning</button>
    </div>
  </div>
</div>
</div>
 <!--Onload modal end -->


<!-- Modal -->
<div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body text-center">
        <h2 class="modal-title session" id="exampleModalLongTitle" style="color: #34495e;"></h2>
        <br>
       <p style="color: #727272;" class="sdesc">10 Day Free program</p>

          <a href="#"  data-dismiss="modal" class="btn btn-color">DIVE THRU</a>
      </div>
     
      
    
  </div>
</div>
</div>

    <script type="text/javascript" src="js/dashboard.js"></script>
    <script type="text/javascript" src="js/jquery.redirect.js"></script>
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

    //  $('#exampleModalCenter').on('shown', function(){
    //alert("I want this to appear after the modal has opened!");

//});
  // alert(window.session_id);
      $(".clsicon").click(function(){
         var vid = document.getElementById("jp_audio_0");
         vid.pause();
         var t = $(".txtintro").html();
          if(t != "10 Day Intro Program"){ 
         //alert($(".txtintro").html());
        var user = JSON.parse(window.localStorage.getItem('user'));
             hdata = {"halted":vid.currentTime,"slot":$(".box1").data("index")};
         var db = firebase.database();
            db.ref("Users/"+user.user_id+"/sessionHalted").child(window.session_id).set(hdata); // Update lalted time on pause 
          }
          
           if(t == "10 Day Intro Program"){
           var user = JSON.parse(window.localStorage.getItem('user'));
          var db = firebase.database();
              db.ref("Users/"+user.user_id+"/halted").set(vid.currentTime); // Update lalted time on pause
            //  alert(vid.currentTime);
            
          }
         var referrer =  document.referrer;
         var id = window.localStorage.getItem("bid");
         console.log(referrer);
         if(window.localStorage.getItem("cat") == "Deep Dive"){

         $.redirect(referrer,{"bundle":id},"POST",null,null,true);
         }else{
         	
         window.setTimeout(function() {
                            
                      history.go(-1);
          }, 1000);
         }
      /*  else if(window.localStorage.getItem("cat") == "10 Day Intro Program"){
          window.location = "opendive.php";
         }*/
      });


        $(".box").click(function(){
            $(".box").removeClass('box1');
  $(this).addClass('box1');
  var vid = document.getElementById("jp_audio_0");
      if(window.localStorage.getItem('cat') != '10 Day Intro Program'){
      var s = JSON.parse(window.localStorage.getItem("session"));
      for(t in s.meditation_audio_time){
        if(s.meditation_audio_time[t] == $(this).attr('id')){

          vid.src = s.meditation_audio[t];
           if (vid.paused == false) {
            vid.src = s.meditation_audio[t];
          }
        console.log(s.meditation_audio[t]);
        }

      }
      //alert($(this).attr('id'));

    }
    });

 
//$('#myModal').modal(options)
        //$('.mediPlayer').mediaPlayer();
  //  var t1 = $("#jquery_jplayer_2").jPlayer("pause", event.jPlayer.status.currentTime);
 //$("#jquery_jplayer_2").jPlayer("play", "10");
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

/*if($('#exampleModalCenter').is(':visible')){

}*/
    $(document).ready(function () {

    	// $(".box").each(function(index){
    	// 		if($(this).hasClass("box1")){
    	// 			alert($(this).attr('id'));
    	// 		}
    	// });
    	

             console.log(window.subcat_id);
             console.log(window.cat_id);
             console.log(window.bundle_id);
             console.log(window.session_id);
      var user = JSON.parse(window.localStorage.getItem('user'));
            window.C_catname = "";
            window.C_subcat_id = ""; 
            window.C_session_id = ""; 
            console.log(user.currentStreak);



$("#message-text").keyup(function(){
  
      if($(this).val() == "" || $(this).val().replace(/ /g,"").replace(/\n/g, "").length <= 35 ){
      document.getElementById('boldStuff').innerHTML = '* Please write your journal';

      }else{
      document.getElementById('boldStuff').innerHTML = '';
        
      }
});
// //edit


//                     var user = JSON.parse(window.localStorage.getItem('user'));
//          var vid = document.getElementById("jp_audio_0");
//         var sec = Math.ceil(15000%60);
//           var min = Math.round(15000/60) + (sec<=50?1:0);
//             ;
//       var db = firebase.database();
//  var b = window.bundle_id;
//         var s = window.session_id;
//          var ctnm = localStorage.getItem('cat');
//          var subscrb_type = localStorage.getItem('subcription_type');
//         // alert(subscrb_type);
//         /* check for streak variable there or not */
//     // if(user.membership_type!='Free'){

//      if(!user.streak){
//       if(window.bundle_id != ''){
//       var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
//         //alert(b);
//       }
//        db.ref("Users/"+user.user_id+"/streak").child(b).set(data);
//      }else{
//       var chk = false;
//       $.map(user.streak, function(value, index) {
//           /* check for same bundle if it is then update */
//         if(index == window.bundle_id){

//           $.map(value.Session, function(value, index) { 
//             if(index == window.session_id){
//           console.log(value.total_taken_time+"=="+min);
//               var total_time_taken = value.total_taken_time + min;
//               var total_visit = value.total_visited + 1;

              
//             //var data = {Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}};
//             var data2={[ctnm]:{SubCatgory:{[b]:{Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}}}}};
//             if(subscrb_type=="paid"){
//                 db.ref("Users/"+user.user_id+"/currentstreak/"+b).set(data2);
//             }
//             else{
//                 db.ref("Users/"+user.user_id+"/streak/"+b).set(data2);
//             }
                
//             console.log(value);
//             }else{
//                 var total_time_taken =  min;
//               var total_visit =  1;
//             //  var data = {Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}};
//               var data2={[ctnm]:{SubCatgory:{[b]:{Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}}}}};
//               if(subscrb_type=="paid"){
                  
//                   db.ref("Users/"+user.user_id+"/currentstreak").child(b).set(data2);
//               }
//               else{
//                  db.ref("Users/"+user.user_id+"/streak").child(b).set(data2);
//               }
              
//             }
//             chk = true;
//           });
//         }else{
//          // alert(window.bundle_id);
//           var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
//           if(!chk){

//           db.ref("Users/"+user.user_id+"/streak").child(b).set(data);
//           }
//         }
        
//       });
//      }

// //over

   $(".journaladd").click(function(){

                    var user = JSON.parse(window.localStorage.getItem('user'));
         var vid = document.getElementById("jp_audio_0");
        var sec = Math.ceil(vid.duration%60);
       // alert(sec);

          var min = Math.round(vid.duration/60) + (sec<=50?0:1);
            ;
            //alert(vid.duration);
           // alert(min);
      var db = firebase.database();


    // }

             var Jtext = $("#message-text").val();
             if(Jtext == "" || $("#message-text").val().replace(/ /g,"").replace(/\n/g, "").length <= 35){
              //alert("fail");
               $('#boldStuff').html('* Please write your journal');
              $('#exampleModalCenter').modal('show');
             }  
             else{  

                    
              db.ref("Users/"+user.user_id+"/completed_conversation").set(user.completed_conversation + 1);
            if(user.membership_type != 'Free'){
              if(((user.last_free_conversation_id)!=10 && !window.localStorage.getItem('cat')) || ((user.last_free_conversation_id)!=10 && window.localStorage.getItem('cat') == '10 Day Intro Program')){
        
              db.ref("Users/"+user.user_id+"/last_free_conversation_id").set(user.last_free_conversation_id + 1)
            }else if((user.last_free_conversation_id == 10 && window.localStorage.getItem("cat") == '10 Day Intro Program') || !window.localStorage.getItem("cat")){
              window.location = "subscription.php";
            }
     }else if(user.membership_type == 'Free'){
      if(((user.last_free_conversation_id)!=10 && !window.localStorage.getItem('cat')) || ((user.last_free_conversation_id)!=10 && window.localStorage.getItem('cat') == '10 Day Intro Program')){
        
        db.ref("Users/"+user.user_id+"/last_free_conversation_id").set(user.last_free_conversation_id + 1)
      }else if((user.last_free_conversation_id == 10 && window.localStorage.getItem("cat") == '10 Day Intro Program') || !window.localStorage.getItem("cat")){
        if(!user.membership_type == 'Free'){
          window.location = "subscription.php";
        }
      }
     }
     var slot = '';

      	$(".box").each(function(index){
    			if($(this).hasClass("box1")){
    				console.log("test"+$(this).attr('id'));
    				slot = $(this).attr('id');
    			}
    	});
      db.ref("Users/"+user.user_id+"/halted").set(0.0); // Update lalted time on pause
      if(window.localStorage.getItem("cat")!="10 Day Intro Program" ){ 
         if($(".timeslot").css('display') != 'none'){
          hdata = {"halted":0.0,"slot":slot};
  		}else{
          hdata = {"halted":0.0};
  		}
        db.ref("Users/"+user.user_id+"/sessionHalted").child(window.session_id).set(hdata); // Update lalted time on pause 
      }
            db.ref("Users/"+user.user_id+"/total_time_divethru").set(user.total_time_divethru + min);
          if(window.localStorage.getItem("bid") != ''){

			window.bundle_id = window.localStorage.getItem("bid");
          }
        var cat = window.cat_id;
        var subcat = window.subcat_id;
        var b = window.bundle_id;
        var s = window.session_id;
         var ctnm = localStorage.getItem('cat');
         var subscrb_type = localStorage.getItem('subcription_type');


        // alert(subscrb_type);
        /* check for streak variable there or not */
    // if(user.membership_type!='Free'){

      //if(!user.currentStreak && subscrb_type=="Paid"){
      if(!user.currentStreak ){
//alert(ctnm);


          if((window.bundle_id != "" && window.subcat_id == "") || (window.bundle_id != "" && window.subcat_id != "")){
                  var data2={Bundle:{[b]:{Session:{[s]:{session:s}}}}};
                }else if(window.subcat_id != "" && window.bundle_id == ""){
                  var data2={SubCategory:{[subcat]:{Session:{[s]:{session:s}}}}};
                }else if(window.subcat_id != "" && window.bundle_id != ""){
                  var data2={SubCategory:{[subcat]:{Bundle:{[b]:{Session:{[s]:{session:s}}}}}}};
                }else if(window.subcat_id == "" && window.bundle_id == ""){
                  var data2={Session:{[s]:{session:s}}};
                }
            //if(subscrb_type=="Paid"){
                    db.ref("Users/"+user.user_id+"/currentStreak/"+ctnm).set(data2);
            // }
     // }else if(user.currentStreak && subscrb_type=="Paid"){
      }else if(user.currentStreak ){

              


         $.map(user.currentStreak, function(value, index) {
            if(ctnm == index){
                $.map(value, function(value2, index2) {
                  if(index2 == "SubCategory" ){
                    $.map(value2, function(value3, index3) {
                      if(index3 == window.subcat_id){
                          $.map(value3, function(value4, index4) {
                            if(index4 == "Bundle"){
                               $.map(value4, function(value5, index5) {
                                  if(index5 == window.bundle_id){
                             // alert(index4);
                                     var data2={session:s};
                                      db.ref("Users/"+user.user_id+"/currentStreak/"+index+"/SubCategory/"+index3+"/Bundle/"+index5+"/Session/").child(s).update(data2);
                                     
                                  }else if(index5 != window.bundle_id){
                                      var data2={[b]:{Session:{[s]:{session:s}}}}
                                       db.ref("Users/"+user.user_id+"/currentStreak/"+index+"/SubCategory/"+index3).child("Bundle").set(data2);
                                  }
                                });
                            }else if(index4 == "Session"){
                                $.map(value4, function(value5, index5) {
                                  if(index5 != window.session_id){
                                      var data2={session:s};
                                      db.ref("Users/"+user.user_id+"/currentStreak/"+index+"/SubCategory/"+index3+"/Session/").child(s).update(data2);
                                  }
                                });

                            }
                         });
                      }else if(index3 != window.subcat_id){
                            if(window.subcat_id != "" && window.bundle_id == ""){
                              var data2={[subcat]:{Session:{[s]:{session:s}}}};
                            }else if(window.subcat_id != "" && window.bundle_id != ""){
                              var data2={[subcat]:{Bundle:{[b]:{Session:{[s]:{session:s}}}}}};
                            }

                            db.ref("Users/"+user.user_id+"/currentStreak/"+index).child("SubCategory").set(data2);

                      }
                    });
                  }else if(index2 == "Bundle"){
                    $.map(value2, function(value3, index3) {
                      console.log(index3);
                          if(index3 == window.bundle_id){
                               $.map(value3, function(value4, index4) {
                                  if(index4 != window.session_id){
                                      var data2={session:s};
                                      db.ref("Users/"+user.user_id+"/currentStreak/"+index+"/Bundle/"+index3+"/Session/").child(s).update(data2);
                                  }
                               });
                          }else if(index3 != window.bundle_id){
                            var data2={[b]:{Session:{[s]:{session:s}}}};
                             db.ref("Users/"+user.user_id+"/currentStreak/"+index).child("Bundle").set(data2);
                          }
                    });
                  }else if(index2 == "Session"){
                    $.map(value2, function(value3, index3) {
                        if(index3 != window.session_id){
                               var data2={session:s};
                            db.ref("Users/"+user.user_id+"/currentStreak/"+index+"/Session/").child(s).update(data2);
                        }
                    });
                  }
                });
            }else if(ctnm != index){

                if(window.bundle_id != "" && window.subcat_id == ""){
                  var data2={Bundle:{[b]:{Session:{[s]:{session:s}}}}};
                }else if(window.subcat_id != "" && window.bundle_id == ""){
                  var data2={SubCategory:{[subcat]:{Session:{[s]:{session:s}}}}};
                }else if(window.subcat_id != "" && window.bundle_id != ""){
                  var data2={SubCategory:{[subcat]:{Bundle:{[b]:{Session:{[s]:{session:s}}}}}}};
                }else if(window.subcat_id == "" && window.bundle_id == ""){
                  var data2={Session:{[s]:{session:s}}};
                }

                   db.ref("Users/"+user.user_id).child("currentStreak").child(index).remove();
                   db.ref("Users/"+user.user_id).child("currentStreak").child(ctnm).set(data2);

            }
          });

      }

     if(!user.streak){
      if(window.bundle_id != '' && window.subcat_id == ""){
      var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
        //alert(b);
       db.ref("Users/"+user.user_id+"/streak").child(b).set(data);
      }else if(window.subcat_id != "" && window.bundle_id == ""){
       var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
       db.ref("Users/"+user.user_id+"/streak").child(subcat).set(data);
      }else if(window.bundle_id == "" && window.subcat_id == ""){
        var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
        db.ref("Users/"+user.user_id+"/streak").child(cat).set(data);
      }else if(window.bundle_id != "" && window.subcat_id != ""){
        var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
        db.ref("Users/"+user.user_id+"/streak").child(b).set(data);
      } 

     }else{
      var chk = false;
                      var total_time_taken =  min;
              var total_visit =  1;
      $.map(user.streak, function(value, index) {
          /* check for same bundle if it is then update */
      //  if(index == window.bundle_id || index == window.subcat_id || index == window.cat_id){
         
          $.map(value.Session, function(value, index) { 
            if(index == window.session_id){
          console.log(value.total_taken_time+"=="+min);
               total_time_taken = value.total_taken_time + min;
               total_visit = value.total_visited + 1;

            //var data = {Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}};
//var data2={[ctnm]:{SubCatgory:{[b]:{Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}}}}};
              /*  if(subscrb_type=="paid"){
                   // db.ref("Users/"+user.user_id+"/currentstreak/"+b).set(data2);
                }
                else{
                    //db.ref("Users/"+user.user_id+"/streak/"+b).set(data);
                }*/

                 if(window.bundle_id != '' && window.subcat_id == ""){
                var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                  //alert(b);
                   db.ref("Users/"+user.user_id+"/streak").child(b).child("Session").child(s).set(data);
                   return false;
                }else if(window.subcat_id != "" && window.bundle_id == ""){
                var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                 //var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
                   db.ref("Users/"+user.user_id+"/streak").child(subcat).child("Session").child(s).set(data);
                   return false;
                }else if(window.bundle_id == "" && window.subcat_id == ""){
                var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                    db.ref("Users/"+user.user_id+"/streak").child(cat).child("Session").child(s).set(data);
                    return false;
                  //var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
                //  db.ref("Users/"+user.user_id+"/streak").child(cat).set(data);
                }else if(window.bundle_id != "" && window.subcat_id != ""){
                 // alert(total_visit);
                var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                    db.ref("Users/"+user.user_id+"/streak/"+b+"/Session/").child(s).set(data);
                    return false;
                 // var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
                 // db.ref("Users/"+user.user_id+"/streak").child(subcat).set(data);
                }

            console.log(value);
            }else{

             // alert(5);
              //var data = {Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}};
              //  var data2={[ctnm]:{SubCatgory:{[b]:{Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}}}}};    
              /*if(subscrb_type=="paid"){
                //  db.ref("Users/"+user.user_id+"/currentstreak").child(b).set(data2);
              }
              else{*/
                  if(window.bundle_id != '' && window.subcat_id == ""){
                  //var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
                    var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                   db.ref("Users/"+user.user_id+"/streak").child(b).child("Session").child(s).set(data);
                  }else if(window.subcat_id != "" && window.bundle_id == ""){
                 //  var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
                    var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                   db.ref("Users/"+user.user_id+"/streak").child(subcat).child("Session").child(s).set(data);
                  }else if(window.bundle_id == "" && window.subcat_id == ""){
                    //var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
                    var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                    db.ref("Users/"+user.user_id+"/streak").child(cat).child("Session").child(s).set(data);
                  }else if(window.bundle_id != "" && window.subcat_id != ""){
                    //var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
                    var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                    //db.ref("Users/"+user.user_id+"/streak").child(subcat).set(data);
                    db.ref("Users/"+user.user_id+"/streak/"+b+"/Session/").child(s).set(data);
                    //alert(db.ref);
                    console.log(data);
                  }
            //  }
            }
            chk = true;
          });
//         }else{
//           alert(chk);
//           var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
//           if(!chk){

//                   if(window.bundle_id != '' && window.subcat_id == ""){
//                   var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
//                     //alert(b);
//                   // db.ref("Users/"+user.user_id+"/streak").child(b).set(data);
//                   }else if(window.subcat_id != "" && window.bundle_id == ""){
//                    var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
//                   // db.ref("Users/"+user.user_id+"/streak").child(subcat).set(data);
//                   }else if(window.bundle_id == "" && window.subcat_id == ""){
//                     var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
// //db.ref("Users/"+user.user_id+"/streak").child(cat).set(data);
//                   }else if(window.bundle_id != "" && window.subcat_id != ""){
//                     var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
//                     db.ref("Users/"+user.user_id+"/streak").child(b).set(data);
//                   }
//           }
//         }
        
      });
     }


                         $('#exampleModalCenter').modal('hide');
            var currentdate = new Date(); 
                var datetime = 
                    +currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + ("0" + currentdate.getHours()).slice(-2) + ":"  
                    + ("0" + currentdate.getMinutes()).slice(-2) + ":" 
                    + ("0" + currentdate.getSeconds()).slice(-2);

            var firebaseRef = firebase.database().ref();
            if(window.localStorage.getItem('cat')){
            var catname = window.localStorage.getItem('cat');

            }else if(!window.localStorage.getItem('cat') || window.localStorage.getItem('cat') == "10 Day Intro Program"){
            var catname = "10 Day";
              
            }
            var bundlename = window.localStorage.getItem('bundle');
             var sessionname =  $(".conv").html();
            //alert(s.session_name);
            var JRef = firebaseRef.child("Journal");
             var pushedJoRef = JRef.child(user.user_id);
             //alert(pushedJoRef);
            var pushedJRef = pushedJoRef.push();

            // Get the unique key generated by push()
            var qId = pushedJRef.key;

            pushedJRef.set({
                category_name:catname,
                journal_text: Jtext,
                bundle_name:bundlename,
                session_name: sessionname,
                date: datetime
            });
            

        $("#message-text").val("As I read what I wrote, I connected with...");
       window.bundle_id1= window.localStorage.getItem("bid")
        if(window.localStorage.getItem("cat") == "Deep Dive" || window.localStorage.getItem("cat") == "Open Dive"){
                    var referrer =  document.referrer;
          //alert(window.bundle_id1);
          $.redirect(referrer,{"bundle":window.bundle_id1},"POST",null,null,true);
         }
         else{
                    //var referrer 
            window.location =  document.referrer;
            //window.location = "dashboard.php";
         }
        
        }
          
  });
  });

</script>

</body>
</html> 