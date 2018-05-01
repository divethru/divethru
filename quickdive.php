
<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

//echo $id;
//die;
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$subacat = [];
$bundle = [];
$Bundle = [];
$Sub = [];
$sub = get("Category/Quick Dive");
foreach($sub as $key => $value)
{
		if($key == "SubCategory"){
			if($value != ""){
				
				foreach($value as $k => $v){
					$Sub[] = $v;
				}
			}
		}
		if($key == "Bundle"){
			if($value != ""){
				
			foreach($value as $k => $v){
				$Bundle[] = $v;
			}
			}
		}
}


$bnd = '';
$bndid = '';
$session = [];
$s=0;
$b=0;
//$id = $_POST['bundle'];
if(count($Sub)>0){
	foreach($Sub as $s => $sa){
		if($sa["Session"]){
			if($s == 0){
				$sid = isset($_POST['bundle'])? $_POST['bundle']:$sa['subcategory_id'];
			}
			$bundle[$sa['subcategory_id']] = $sa['Session'];
			foreach($sa['Session'] as $key => $val){
				if($b == 0){
				$id = $val['session_id'];
					if($id == $val['session_id']){
						// $val['Session'];
						$bnd = $val['session_name'];
						$bid = $val['session_id'];
						//foreach($val['Session'] as $sk => $sess){
							//$session [] = $sess;
						//}
					}
					$b++;
				}
			}
		}
	}
}

if(count($Bundle)>0){
foreach($Bundle as $p => $a){
	if(isset($a['Session']) ){
//		if($a['subcategory_name'] == $a['Bunlde']['bunlde_category'])
	if($s == 0){
		$sid = isset($_POST['bundle'])? $_POST['bundle']:$a['bundle_id'];
	}
	$bundle[$a['bundle_id']] = $a['Session'];
	foreach($a['Session'] as $key => $val){
			//print_r();
			if($b == 0){
				$id = $val['session_id'];
			}
	if($id == $val['session_id']){
		// $val['Session'];
		$bnd = $val['session_name'];
		$bid = $val['session_id'];
		//foreach($val['Session'] as $sk => $sess){
			//$session [] = $sess;
		//}
	}
	$b++;
	}
		
	}
	$s++;
}
}


function get($path){
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);


//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}
//die;

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Session</title>

 <link rel="stylesheet" href="css/not.the.skin.css">
    <link rel="stylesheet" href="img/playerimg/circle.player.css">

<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="css/owl.carousel.min.css" rel="stylesheet" type="text/css">
<link href="css/owl.theme.default.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="css/footercss.css" type="text/css" >
 <!-- <link rel="stylesheet" href="css/not.the.skin.css">
    <link rel="stylesheet" href="img/playerimg/circle.player.css">-->


<!-- <link href="css/individual.css" rel="stylesheet" type="text/css"> -->
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
  $( window ).on( "load", function() {
  	//on load hide the box if issue occure delete
    		$(".box1").css("display","none");
    		$(".cp-pause").css("display","none");
    		$(".cp-play").css("display","none");
    	//over
    });
</script>
<style type="text/css">
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
.current{
	
	font-weight: 550;
	color: #727 !important;
}
.list1 p {  
	 color: #34495e;
	 font-size: 21px;

}
.list ul li  {
	font-size: 18px;
	color: gray;
		cursor: pointer;
}

.currentbundle{
	
	font-weight: bold;
}
.boxStyle{
	height: 240px;
}
@media(min-width:2560px){
}


@media (max-width:329px){

}
@media (max-width:425px){


.boxStyle{
	height: 167px;
}

.btn2 {
    font-size: 11px!important;
    margin: 4px 0;
}
}	
@media (max-width:768px) and (min-width: 424px){
.boxStyle{
	height: 168px;
}
      .bundle{
      	font-size: 15px;
      }
   /*    .list1 p {  
	 color: #34495e;
	 font-size: 12px;

}
.list ul li  {
	font-size: 10px;
	color: gray;
}*/ 
}


.box1a {width: 100%;
           height: 100%;
           background-color: rgba(0,0,0,0.5);
           position: absolute;
           text-align: center;}

    .box1a i {color: #fff;
            font-size: 28px;
            margin-left: 41%;
            margin-top: 29%;
            }
body {font-family: roboto; margin:0}
.box_1 {width: 100%;
      height: 50px;
      }

.box_11 {width: 7%;
       
         height: 30px;
         float: left;
         }


.box_12 {width: 86%;
         
         height: 30px;
         float: left;
         }

.box_12 p {font-size: 28px;
          color: #fff;
          }

@media(max-width:320px){
	.box_12 p {font-size: 18px !important;
          color: #fff;
          }	
}
@media(max-width:425px){
.box_12 p {font-size: 20px;
          color: #fff;
          }	
}
@media(max-width:576px){
	
.box_11 {width: 15%;
        
         height: 30px;
         float: left;
}


.box_12 {width: 70%;
        
         height: 30px;
         float: left;
}

}

.box_1 {
    width: 100%;
    height: 100px;
}

.pad {
    padding: 0 40px;
}

.bg1 {
    /*background-image: url(http://34.215.40.163/Admin/uploads/session/box2.png);*/
    padding-top: 20px;
    padding-bottom: auto;
    background-size: cover;
    background-repeat: no repeat;
    width: 100%;
    height: 100% !important;
}
.bg1 h2 {
    color: #fff;
    font-size: 48px;
    margin: 0;
    font-weight: normal;
}
.bg1 h6 {
    color: #fff;
    font-size: 28px;
    font-weight: normal;
}

.box1a {width: 100%;
           height: 100%;
           /*background-color: rgba(0,0,0,0.5);*/
           background-color: #727 !important;
           position: absolute;
           text-align: center;}
.mb {width: 176px;
           height: 100%;
           background-color: rgba(0,0,0,0.5);
           position: absolute;
           text-align: center;
		   top: 0;
		   }
		   
    .box1a i {color: #fff;
           font-size: 216px;
        /* 
           margin-left: 41%;
            margin-top: 32%;
           */
           margin: 0 auto;
            }
.mb i {color: #fff;
        /*    font-size: 28px;*/
            margin-left: 41%;
            margin-top: 27%;
}
@media(max-width:425px){
	
.boxStyle{
	padding-top:60% !important;
}

}

@media (max-width:425px){
	
.hover-box1 {
  width: 100%;
  height: auto;
}
.hover-box2a{
	    position: absolute;
   width: inherit;
    height: 100%;
    background-color: rgba(0, 0,0,0.8);
    top: -100%;
    transition: all 0.5s;

}
.hover-box1:hover .hover-box2a {top: 0;}

}	
@media (min-width:768px){
.hover-box1 {
  width: 100%;
  height: 155px;
}
.hover-box2a{
	    position: absolute;
   width: inherit;
    height: 100%;
    background-color: rgba(0, 0,0,0.8);
    top: -100%;
    transition: all 0.5s;

}
.hover-box1:hover .hover-box2a {top: 0;}
}

.owl-text-overlay {
  position: absolute;
  text-align: center;
  width: 60%;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.4);
  padding-bottom: 20px;
  font-family: "Open Sans", sans-serif;
  border-radius: 1px 1px 1px 1px;
}

h2.owl-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
}

p.owl-caption {
  font-size: 18px;
  line-height: 24px;
 /* margin: auto;*/
}        

.new{
	    -webkit-box-align: center;
    display: inline-block;
    text-align: center;
    align-items: center;
    min-width: 176px;
    width: 176px;
    height: 216px;
    border-radius: 4px;
}
.newc{
	    z-index: 0;
    position: relative;
    list-style-type: none;
    overflow-x: scroll;
    overflow-y: hidden;
      -webkit-overflow-scrolling:touch;
    display: flex;
    width: 100%;
    margin: 0px;
    padding: 0px 0px 0px 35.9px;
}
.newp{
	font-family: Apercu, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 15px;
    line-height: 24px;
    margin-top: 6px;
    color: rgb(253, 245, 235);
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
}    
.pad2{
	position: relative;
}

.new-bg {width: 100%;
           height: 100%;
          
           position: absolute;
           text-align: center;}
	
.new-bg p {color:#fff;
	       font-size: 26px;}
	
.get-button {
    background-color: #7dd3d5;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 40px;
}
	
	.new-bg1 h4 {font-size: 26px;
                 padding-top: 80px;
	             color: #80429c;}
	
	.new-bg1 h2 {font-size: 52px;
                 padding: 50px 0;
	             color: #80429c;}
.modal-footer1 {
    padding: 1rem;
    border-top: 1px solid #e9ecef;
}
</style>
<script type="text/javascript">

var sessiontime = [];
			var session = [];
      var ctime=0;
    $(document).ready(function(){



			 window.session = [];
    		firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
          window.location.href = "http://34.215.40.163/login.php";
        // User is signed in.
    } else{
    	console.log(user.uid);
		   auth = user;
		firebase.database().ref("Users/"+user.uid).on("value", function(snapshot) {
			window.localStorage.setItem('user',JSON.stringify(snapshot));
		});		

    }
});




    	$('a').each(function(){
                var path = window.location.href;
                var current = path.substring(path.lastIndexOf('/')+1);
                var url = $(this).attr('href');
                if(url == current ){
                    $(this).addClass('active');
                };
                
            });  
///		  window.history.forward(1);
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
// storedNames = JSON.parse(window.localStorage.getItem("session"));


    /*  var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",{
        cssSelectorAncestor: "#cp_container_1"
      });*/

      // This code creates a 2nd instance. Delete if not required.

      
		//$(".bg1").css('background', 'url("http://34.215.40.163/Admin/uploads/session/box2.png")');
		//$(".new-bg").css('background', 'url("http://34.215.40.163/Admin/uploads/session/box2.png")');

	 // console.log(user.halted);
	  var bid = $(".current").data("cat");
			var sid = $(".current").attr("id");
			 window.bundle_id=bid ;
    window.session_id=sid ;
			//$("ul > li").removeClass("current");
		//	$(this).addClass("current");
			//var bid = $(this).data("cat");
			//var sid = $(this).attr("id");
			var content = '';
			 var vid = document.getElementById("jp_audio_0");
			

			 			 /*Dynamic category selecttion according to bundle and subcategory_*/
			 
			 firebase.database().ref("Category").orderByChild("session_id").on("value", function(snapshot) {
				   snapshot.forEach(function(childSnapshot) {
					   var key = childSnapshot.key;
					var childData = childSnapshot.val();
						  snapshot.forEach(function(childSnapshot) {
					   var key = childSnapshot.key;
					var childData = childSnapshot.val();
							
					   if(childData.Bundle != ""){
						
								window.sub = false;
								window.bundle = true;
								
								$.map(childData.Bundle, function(value, index) {
										//	alert(index);
										if(index == bid){
											window.session = [];
											window.sessiontime = [];
										$.map(value.Session, function(value2, index2) {
											if(index2 == sid){	
												$(".conv").html(value2.session_name);
												$(".sessionnm").html(value2.session_name);
												$("#exampleModalLongTitle").html(value2.session_name);
												$(".modal-body > p").html(value2.session_description);
												$(".bg1").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
												$(".new-bg").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
												for(i in value2.meditation_audio){
													if(i == 0){
														var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
														  {
															mp3:value2.meditation_audio[i],
															oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
														  }, {
															cssSelectorAncestor: "#cp_container_2",
															supplied: "mp3"
														  });
													//console.log(value2.meditation_audio);
													//session.push(value2.meditation_audio[i]);
                          // $('.cp-pause').css("display","none");
                          //     $('.cp-play').css("display","inherit");
													window.session.push(value2.meditation_audio[i]);
													}
													
												}
												
													ts = '';
												for(i in value2.meditation_audio_time){
													if(i == 0){
														ts += '<div class="box box1" id="'+childData[i]+'"><p>'+childData[i]+' <br> min</p></div>'
													}else{
														ts += '<div class="box " id="'+childData[i]+'"><p>'+childData[i]+' <br> min</p></div>'
													}
													window.sessiontime.push(value2.meditation_audio_time[i]);
												}
												$(".timeslot").html(ts);
											}	
											
										});		
									}
								});
								
								
							
					   }else if(childData.SubCategory != ""){
							      
							  // console.log(childData);
							   window.sub = true;
							window.bundle = false;
							$.map(childData.SubCategory, function(value, index) {
										if(index == bid){
										$.map(value.Session, function(value2, index2) {
											
											if(index2 == sid){	
												window.session = [];
												window.sessiontime = [];
                        localStorage.setItem('session_id',$(".current").attr('id'));
                        localStorage.setItem('subcategory_id',$(".box_12 > p").attr("id"));
                        localStorage.setItem('bid','');
													$(".conv").html(value2.session_name);
													$(".sessionnm").html(value2.session_name);
                          $("#exampleModalLongTitle").html(value2.session_name);
													$(".modal-body > p").html(value2.session_description);
													$(".bg1").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
													$(".new-bg").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
													for(i in value2.meditation_audio){
														if(i == 0){
															var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
															  {
																mp3:value2.meditation_audio[i],
																oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
															  }, {
																cssSelectorAncestor: "#cp_container_2",
																supplied: "mp3"
															  });
                              // $('.cp-pause').css("display","none");
                              // $('.cp-play').css("display","inherit");
                              
													//	console.log(value2.meditation_audio);
														}
														//session.push(value2.meditation_audio[i]);
														window.session.push(value2.meditation_audio[i]);
													}
													//console.log(value2.meditation_audio_time);
														ts = '';
													for(i in value2.meditation_audio_time){
														if(i == 0){
															ts += '<div class="box box1" id="'+value2.meditation_audio_time[i]+'"><p>'+value2.meditation_audio_time[i]+' <br> min</p></div>'
														}else{
															ts += '<div class="box " id="'+value2.meditation_audio_time[i]+'"><p>'+value2.meditation_audio_time[i]+' <br> min</p></div>'
														}
														window.sessiontime.push(value2.meditation_audio_time[i]);
													}
													$(".timeslot").html(ts);
											}
											
										});		
									}
								});
//console.log(session);
							
							
						   
						   }

                /* pause event Start*/
    
                    // $("audio").bind('pause',function(){
                    // //  alert(5);
                    //   var vid = document.getElementById("jp_audio_0");
                    //   const currentTime = Math.floor(vid.currentTime)/60;
                    //  // const min = currentTime/60;
                    //   console.log("c"+currentTime+user.user_id);
                    //   var db = firebase.database();
                    //   if(window.localStorage.getItem("cat") != "10 Day Intro Program"){
                    //       hdata = {"halted":currentTime};
                    //    db.ref("Users/"+user.user_id+"/sessionHalted").child(window.session_id).set(hdata); // Update lalted time on pause
                    //   }
                    // }); 
                /*Pause Event end*/
					   
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
						});
				   });
			   });

		/* End Dynamic category selecttion according to bundle and subcategory_*/
	  


		/*	firebase.database().ref("Category/Quick Dive/Bundle/"+bid+"/Session/"+sid).on("value", function(snapshot) {
					//childData1 = snapshot.val(); 
				snapshot.forEach(function(childSnapshot) {
					var key = childSnapshot.key; 
					var childData = childSnapshot.val(); 
					$(".modal-title").html("Quick Dive");
					if(key == "session_name"){
						$(".conv").html(childData);
						$("#exampleModalLongTitle").html(childData);
					}
					
					if(key == "session_description"){
						$(".modal-body > p").html(childData);
					}
					
					if(key == "session_img"){
						//$(".bg1").html();
					$(".bg1").css('background', 'url('+childData+') '); /*Dynamic image from database*/
				/*	}
					if(key == "meditation_audio"){
						
							console.log(childData);
						$.map(childData, function(value, index) {
						});
						for(i in childData){
							if(i == 0){
								var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
								  {
									mp3:childData[i],
								    oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
								  }, {
									cssSelectorAncestor: "#cp_container_2",
									supplied: "mp3"
								  });
							console.log(myOtherOne);
							}
							session.push(childData[i]);
						}
						
					}
					if(key == "meditation_audio_time"){
						
						ts = '';
						for(i in childData){
							if(i == 0){
								ts += '<div class="box box1" id="'+childData[i]+'"><p>'+childData[i]+' <br> min</p></div>'
							}else{
								ts += '<div class="box " id="'+childData[i]+'"><p>'+childData[i]+' <br> min</p></div>'
							}
							sessiontime.push(childData[i]);
						}
						$(".timeslot").html(ts);
						
					}

			});
			});*/

//for re-do / replay audio

    if(user.sessionHalted || user.sessionHalted != 0.0){
      $.map(user.sessionHalted, function(value, index) {
         //var vid = document.getElementById("jp_audio_0");
            console.log(index+"=="+window.session_id);
            if(index == window.session_id){
                console.log(value.halted);
              $('#memberModal').modal("show");
                $(".continue").click(function(){
                  //alert(value.halted);
                  vid.currentTime = value.halted*60; //time is in minute to second (time*60)
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
         //var vid = document.getElementById("jp_audio_0");
    vid.currentTime = 0; //time is in minute to second (time*60)
    }

//over

  /* Play auio on halted time Start
    if(user.halted != 0.0 || user.halted != ''){
      $('#memberModal').modal("show");
    var vid = document.getElementById("jp_audio_0");
    // code for Continue from where you stop
    $(".continue").click(function(){
        //alert(5);
      vid.currentTime = user.halted*60; //time is in minute to second (time*60)
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
     Play audio on halted End*/
    
	  
	  
	  /* Audio ended event Start*/
	  
	  $("audio").bind('ended',function(){
      alert(5);
		 // var vid = document.getElementById("jp_audio_1");
		/*	var db = firebase.database();
			db.ref("Users/"+user.user_id+"/halted").set(0.0); // Update lalted time on pause
			//if((user.last_free_conversation_id+1)!=10 && user.membership_type == "Free"){	
            db.ref("Users/"+user.user_id+"/last_free_conversation_id").set(user.last_free_conversation_id + 1);*/
			//}
 			//$('#exampleModalCenter').modal({backdrop: "static"});

    }); 
    
	  /* Audio ended Event end*/
	  
	//  myOtherOne.option("enableRemoveControls", true); // Set option
    });
    </script>
</head>

<body style="margin-top: 150px;">
<!--HEADER-->
<?php include 'dashbordHeader.php'; ?>
<div class="container-fluid  text-center cardContainers" >
  <div class="container cat1">
     <div class="row mt-5 q-desk">

           <div class="col-md-4 col-lg-3 mt-5 px-md-5 px-lg-0">
			  <?php 
			  
				$sidebar = '';
				if(count($Bundle)>0){
				foreach($Bundle as $skey => $s){
					if($sid == $s['bundle_id']){
					 $sidebar .= '<div class="row  list1"><p  id='.$s['bundle_id'].'>'.$s['bundle_name'].'</p></div>';
						
					}else{
						
					 $sidebar .= '<div class="row list1"><p id='.$s['bundle_id'].'>'.$s['bundle_name'].'</p></div>';
					}
					 if(count($bundle)>0){
						 if(!empty($bundle[$s['bundle_id']])){
						 $sidebar .= '<div class="row  list"><ul>';
						 foreach($bundle as $bk => $bv){
								 
							 		$i=0;
									foreach($bv as $bkey => $bval){										
							 if($s['bundle_id'] == $bval['budle_id']){
									if($bid == $bkey){
										
										$sidebar .= '<li class="current" data-cat='.$s['bundle_id'].' data-menu='.$i.' id='.$bval['session_id'].'>'.$bval['session_name'].'</li>';
										$i++;
									}else{
										$sidebar .= '<li  data-cat='.$s['bundle_id'].' data-menu='.$i.' id='.$bval['session_id'].'>'.$bval['session_name'].'</li>';	
										$i++;
									}
							 }
									}
						 }
						 $sidebar .= '</ul></div>';
						 }
					 }
					 
				}
				}else if(count($Sub)>0){
					foreach($Sub as $skey => $s){
					if($sid == $s['subcategory_id']){
					 $sidebar .= '<div class="row  list1"><p  id='.$s['subcategory_id'].'>'.$s['subcategory_name'].'</p></div>';
						
					}else{
						
					 $sidebar .= '<div class="row list1"><p id='.$s['subcategory_id'].'>'.$s['subcategory_name'].'</p></div>';
					}
					 if(count($bundle)>0){
						 if(!empty($bundle[$s['subcategory_id']])){
						 $sidebar .= '<div class="row  list"><ul>';
						 foreach($bundle as $bk => $bv){
								 
							 		$i=0;
									foreach($bv as $bkey => $bval){										
							 if($s['subcategory_id'] == $bval['budle_id']){
									if($bid == $bkey){
										
										$sidebar .= '<li class="current" data-cat='.$s['subcategory_id'].' data-menu='.$i.' id='.$bval['session_id'].'>'.$bval['session_name'].'</li>';
										$i++;
									}else{
										$sidebar .= '<li  data-cat='.$s['subcategory_id'].' data-menu='.$i.' id='.$bval['session_id'].'>'.$bval['session_name'].'</li>';
										$i++;	
									}
							 }
									}
						 }
						 $sidebar .= '</ul></div>';
						 }
					 }
					 
				}
				}
			 echo $sidebar;
			// die;
			  ?>
			
			
		   </div>
		   
    
        <div class="col-md-8 col-lg-9 bg1 position-relative px-0">
              <div class="box_1 pad">
				<div class="box_11 text-center">
					<a data-toggle="modal" data-target="#exampleModalCenter2">
						<img  class="bgicon" src="img/ic_info@3x.png" width="30"/>
					</a>  
				</div>
				<div class="box_12 text-center">
					<p>10 days</p>
				</div>
				<div class="clearfix"></div>
			</div>
      <div class="" style="top:0;"><i class="fa fa-check-circle fa-3x center chk" style="position: absolute;top: 7%;color: #fff;left: 92%;z-index: 5;display: none;"></i></div>
			<div class="container txt-top" >
					  
				<div class="row text-center">
							<div class="col-12 abc" >  
							 
								<center>
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
											  <li><a class="cp-play"  tabindex="1" style="display:none;">play</a></li>
											  <li><a class="cp-pause" style="margin-left: -4px; display:none; " tabindex="1">pause</a></li>
											</ul>
										  </div>
									</div>
				<!-- 	<span class="time" style="font-size: 25px;color:white;">00:00</span> -->
								</center>
								<h6 class="conv1">Tap anywhere to play</h6>
							</div>
				</div>

				  <div class="row justify-content-center timeslot">
									
									<div class="box" id="3">
										<p>3 <br> min</p>
									</div>
									
									<div class="box box1 " id="5" style="display:none;">
										<p>5 <br> min</p>
								   
									</div>
						
									<div class="box " id="10">
										<p>10 <br> min</p>
								   
									</div>
								  
				 </div>
					
				   
					
			</div>
           
           
           </div>

      </div>
</div>
</div>
<br><br>


<!--Onload Modal start -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header title_center" style="margin: auto;padding: 15px !important;">
        <h4 class="modal-title text-center" id="OnloadModalTitle" style="text-align: center !important; margin:auto;  color: #34495e;">Quick Dive</h4>
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
	 <div class="modal-header" style="margin: 0 auto;">
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body text-center">
        <h2 class="modal-title" id="exampleModalLongTitle" style="color: #34495e;"></h2>
        <br>
       <p style="color: #727272;">10 Day Free program</p>

          <a href="#"  data-dismiss="modal" class="btn btn-color">DIVE THRU</a>
      </div>
     
      
    
  </div>
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
      <div class="modal-footer mt-0 justify-content-center" style="border-top: 0 !important;">
        <button type="button" class="btn1 journaladd"  style="color:#FFF; background-color: #7DD3D5 !important; outline: none !important; border-color:  #7DD3D5 !important;"  >Add in My Journal</button>
      </div>
    </div>
  </div>
</div>
  <!--Endplayer modal end -->

<?php include 'footer.php'; ?>




      <script type="text/javascript" src="js/jquery.redirect.js"></script>
     <script src="js/dashboardheader.js" type="text/javascript"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/owl.carousel.min.js"></script>

<script type="text/javascript">

//localStorage.setItem('package_type','session');

if(window.performance.navigation.type>0){
	window.localStorage.setItem("back",true);
}else{
	window.localStorage.setItem("back",false);	
}
	
/* Sign out method */

function sign_out(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  		window.location = "index.php";
		}, function(error) {
		  // An error happened.
		   console.log("Logout Failed!", error);
		});
	}
/*   End Sign out method */

/******************** link click code ******************/
$("document").ready(function(){

/************** Jounral validation ****************/

var seesion_id1=0;
		$("#message-text").keyup(function(){
  
	      if($(this).val() == "" || $(this).val().replace(/ /g,"").replace(/\n/g, "").length <= 35){
	      document.getElementById('boldStuff').innerHTML = '* Please write your journal';

	      }else{
	      	document.getElementById('boldStuff').innerHTML = '';
	        
	      }
		});

	/************** End Jounral validation ****************/

	$(".nav-link").click(function(e){
e.preventDefault();
//$(".dropdown-item").click(function(){
	var cat = $(this).text();
		if(cat == "HOME"){
		window.location = "dashboard.php";
	}


	firebase.database().ref("Category").on("value",function(snapshot){
			snapshot.forEach(function(childSnapshot) {

				if(childSnapshot.hasChild("Bundle") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				console.log("quick");
				window.location = "quickdive.php";
				
			}
			if( (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() == ""){
				console.log("open");
				window.localStorage.setItem("cat",childSnapshot.key);
				window.location = "session.php";
				
			}
			});
	});
	

});

/******************** End link click code ******************/

//alert(window.screen.width);


$(".list1 > p").each(function(index){

				if(index == 0){
					$(".box_12 > p").html($(this).html());
					$(".box_12 > p").attr("id",$(this).attr("id"));
					//seesion_id1=$(this).attr("id");
					//localStorage.setItem('session_id1',$(this).attr("id"));
					//console.log(seesion_id1);
				}
			});
			var sessiontime = [];
			var session = [];
var user = JSON.parse(window.localStorage.getItem('user'));
	if(user.membership_type == "Free"){

	//$(".bg1").append('<div class="box1a" style="top:0;"><i class="fa fa-lock fa-5x center"></i></div>');
	$(".bg1").append('<div class="boxA new-bg py-3" style="top:0;"><div class="row py-5"><div class="col-12"><h2 class="mb-4 sessionnm">Conversation 1</h2><p>One Subscription. Unlimited Access.</p></div></div><div class="row justify-content-center new-bg1"><div class="col-md-6 col-lg-5 bg-white"><h4>L I F E T I M E</h4><h2>$ 7.99</h2><a href="javascript:void(0)" class="btn get-button" style="color: #fff; margin-bottom: 66px;" data-amount="2" data-cycle="0" data-plan="L">G O <span>&nbsp;&nbsp;&nbsp;</span>U N L I M I T E D</a></div></div></div></div>	');
}
			//$(".sess").html("");
/************************************** Dynamic Session Play ***************************************/
if(window.screen.width > 425){	
		$(".row > ul > li").click(function(){
						var index = $(this).index();
			//alert(index);
if(index){
	$(".boxA").remove();
if(user.membership_type == "Free"){
  $(".bg1").append('<div class="boxA new-bg py-3" style="top:0;"><div class="row py-5"><div class="col-12"><h2 class="mb-4 sessionnm">Conversation 1</h2><p>One Subscription. Unlimited Access.</p></div></div><div class="row justify-content-center new-bg1"><div class="col-md-6 col-lg-5 bg-white"><h4>L I F E T I M E</h4><h2>$ 7.99</h2><a href="javascript:void(0)" class="btn get-button" style="color: #fff; margin-bottom: 66px;" data-amount="2" data-cycle="0" data-plan="L">G O <span>&nbsp;&nbsp;&nbsp;</span>U N L I M I T E D</a></div></div></div></div>	');
//	$(".bg1").append('<div class="box1a" style="top:0;"><i class="fa fa-lock fa-5x center"></i></div>');
}
}
//}
//if(index == 0){
//	$(".box1a").remove();
//}
			var bid = $(this).data("cat");
			$(".list1 > p").each(function(index){

				console.log($(this).attr("id")+"=="+bid);
				if($(this).attr("id") == bid){
					$(".box_12 > p").html($(this).html());


					$(".modal-title").html($(this).html());
				}

			});
			$("ul > li").removeClass("current");
			$(this).addClass("current");
			window.bundle_id= bid;
			var sid = $(this).attr("id");
			window.session_id= sid ;
			var content = '';
			 var vid = document.getElementById("jp_audio_0");

/***************************************************************************************/
				
								 /*Dynamic category selecttion according to bundle and subcategory_*/
			 window.chkcount=0;
       firebase.database().ref("Category").orderByChild("session_id").on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
        window.sub_id= window.localStorage.getItem('subcategory_id');
					   var key = childSnapshot.key;
					var childData = childSnapshot.val();
						  snapshot.forEach(function(childSnapshot) {
					   var key = childSnapshot.key;
					var childData = childSnapshot.val();
							
					   if(childData.Bundle != ""){
						
								window.sub = false;
								window.bundle = true;
                $.map(childData.Bundle, function(value, index) {
                      
                    if(index == bid){
                    $.map(value.Session, function(value2, index2) {
											if(index2 == sid){	
												window.session = [];
												window.sessiontime = [];
												$(".conv").html(value2.session_name);
												$(".sessionnm").html(value2.session_name);
												$("#exampleModalLongTitle").html(value2.session_name);
												$(".modal-body > p").html(value2.session_description);
												$(".bg1").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
												$(".new-bg").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
                        //alert(value2.session_id);
												for(i in value2.meditation_audio){
													if(i == 0){
														var vid = document.getElementById("jp_audio_0");
														  vid.pause();
														  vid.currentTime=0;
														  vid.src = value2.meditation_audio[i];
														var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
														  {
															mp3:value2.meditation_audio[i],
															oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
														  }, {
															cssSelectorAncestor: "#cp_container_2",
															supplied: "mp3"
														  });
														$('.cp-pause').css("display","none");
														$('.cp-play').css("display","inherit");
													//console.log(myOtherOne);
													}
													window.session.push(value2.meditation_audio[i]);
												}
												
													ts = '';
												for(i in value2.meditation_audio_time){
													if(i == 0){
														ts += '<div class="box box1" id="'+value2.meditation_audio_time[i]+'"><p>'+value2.meditation_audio_time[i]+' <br> min</p></div>'
													}else{
														ts += '<div class="box " id="'+value2.meditation_audio_time[i]+'"><p>'+value2.meditation_audio_time[i]+' <br> min</p></div>'
													}
													window.sessiontime.push(value2.meditation_audio_time[i]);
												}
												$(".timeslot").html(ts);
											}	
											
										});		
									}
								});
								
								
							
					   }else if(childData.SubCategory != ""){
							      
							  // console.log(childData);
							   window.sub = true;
							window.bundle = false;
              window.chk=false;
              
                      
              $.map(childData.SubCategory, function(value, index) {
                    if(index == bid){
										$.map(value.Session, function(value2, index2) {
											
											if(index2 == sid){	
												window.session = [];
												window.sessiontime = [];
													$(".conv").html(value2.session_name);
													$(".sessionnm").html(value2.session_name);
													$("#exampleModalLongTitle").html(value2.session_name);
													$(".modal-body > p").html(value2.session_description);
													$(".bg1").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
													$(".box_12 > p").attr('id',index);
													$(".new-bg").css('background', 'url('+value2.session_img+') '); /*Dynamic image from database*/
                          if($.inArray(session_id, history) > -1){
                            if(window.sub_id==bid &&  window.chk1){
                              //alert(window.chk1);
                               window.chkcount++;
                                //window.chk1 = false;
                            }
                            window.chk=true;
                           
                            
                          }

													for(i in value2.meditation_audio){
														if(i == 0){
															//var vid = document.getElementById("jp_audio_0");
														  var vid = document.getElementById("jp_audio_0");
														  vid.pause();
														  vid.currentTime=0;	
														  vid.src = value2.meditation_audio[i];
															var myOtherOne = new CirclePlayer("#jquery_jplayer_2",
															  {
																//mp3:value2.meditation_audio[i],
																oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
															  }, {
																cssSelectorAncestor: "#cp_container_2",
																//supplied: "mp3"
															  });
															$('.cp-pause').css("display","none");
															$('.cp-play').css("display","inherit");
														//console.log(myOtherOne);
														}
														window.session.push(value2.meditation_audio[i]);
													}
													//console.log(value2.meditation_audio_time);
														ts = '';
													for(i in value2.meditation_audio_time){
														if(i == 0){
															ts += '<div class="box box1" id="'+value2.meditation_audio_time[i]+'"><p>'+value2.meditation_audio_time[i]+' <br> min</p></div>'
														}else{
															ts += '<div class="box " id="'+value2.meditation_audio_time[i]+'"><p>'+value2.meditation_audio_time[i]+' <br> min</p></div>'
														}
														window.sessiontime.push(value2.meditation_audio_time[i]);
													}
													$(".timeslot").html(ts);
											}
											
										});		
									}
								});

						   
						   }
					   
						});
				   });

             if(window.chk){
               //alert(window.chkcount);
                //$(".bg1").append('<div class="" style="top:0;"><i class="fa fa-check-circle fa-5x center chk"></i></div>');

                $(".chk").css("display","unset");
              }
              else{

                $(".chk").css("display","none");
              } 
			   });

			//alert(result);


$(".get-button").click(function(){
	var plan = $(this).data('plan');
	var cycle = $(this).data('cycle');
			var price = $(this).data('amount');
//	alert(result);
	$.post("http://34.215.40.163/test.php", {"price": price}, function(result){
			        console.log(result);
			
			localStorage.setItem('payment','true');
			localStorage.setItem('session_id',$(".current").attr('id'));
			localStorage.setItem('session_name',$(".current").html());
			localStorage.setItem('subcategory_id',$(".box_12 > p").attr("id"));
			localStorage.setItem('prevcat','Quick Dive');

	 $.redirect("Process.php",{select_cycles: cycle ,product_name : "session","select_plan":plan,"price":price,"userid":user.user_id,"token":result},"POST",null,null,true);
	});
			        
});
				
/***************************************************************************************/



			/*firebase.database().ref("Category/Quick Dive/Bundle/"+bid+"/Session/"+sid).on("value", function(snapshot) {
					//childData1 = snapshot.val(); 
				snapshot.forEach(function(childSnapshot) {
					var key = childSnapshot.key; 
					var childData = childSnapshot.val(); 
					//$(".modal-title").html("Quick Dive");
					if(key == "session_name"){
						$(".conv").html(childData);
						$("#exampleModalLongTitle").html(childData);
					}
					//if(key == "budle_id"){
					
				//	}
					
					if(key == "session_description"){
						$(".modal-body > p").html(childData);
					}
					
					if(key == "session_img"){
						//$(".bg1").html();
					$(".bg1").css('background', 'url('+childData+') '); /*Dynamic image from database*/
				/*	}
					if(key == "meditation_audio"){
						
							console.log(childData);
						$.map(childData, function(value, index) {
						});
						for(i in childData){
							session.push(childData[i]);
						}
						
					}
					if(key == "meditation_audio_time"){
						
						ts = '';
						for(i in childData){
							if(i == 0){
								ts += '<div class="box box1" id="'+childData[i]+'"><p>'+childData[i]+' <br> min</p></div>'
							}else{
								ts += '<div class="box " id="'+childData[i]+'"><p>'+childData[i]+' <br> min</p></div>'
							}
							sessiontime.push(childData[i]);
						}
						$(".timeslot").html(ts);
						
					}

			});
			});*/
			
		});
	}

		
/************************************** End Dynamic Session Play ***************************************/	
		
/************************************** Change Design On Mobile ***************************************/	

if(window.screen.width < 770){
	var user = JSON.parse(window.localStorage.getItem('user'));
	$("div.cardContainers").addClass("px-0");
	$("div.cardContainers").addClass("mx-0");
	$("div.cat1").addClass("mx-0");
	$("div.cat1").addClass("px-0");
	$(".q-desk").hide();

firebase.database().ref("Category").orderByChild("session_id").on("value", function(snapshot) {
		var c = [];
		var session = [];
		var ht ='';
var content = '';
		snapshot.forEach(function(childSnapshot) {
			///debugger;
			var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val(); 
				 //console.log(childSnapshot.key);
				c.push(childSnapshot.key);
				var ht ='';	
				var complete = 0;
				var comper = 0;
				if(childData.Bundle != "" && childData.Session == "" && childData.Bundle == ""){
					session.push(childData.Session);
					$.map(childData.Bundle, function(value, index) {
						content += '<div class="container-fluid "><div class="pad2"><div class="row my-3 px-4 justify-content-start justify-content-md-start"><h4 style="font-size:19px;">'+value.bundle_name+'</h4></div>';
							content += '<div class="position-relative"><div class="newc bnd">';
						
						
						/*$.map(user.streak, function(value2, index2) {
							
							if(index == index2){
									complete =	Object.keys(value2.Session).length;
									comper =((complete*100)/total);
										}
							});*/
             // alert(key);
              //window.localStorage.setItem("cat",key);
            $.map(value.Session, function(value2, index2) {
								if(value2.session_description.length <= 40){
							var desc = value2.session_description.substring(0, 40)+ '....';
							}else{
								
							var desc = value2.session_description.substring(0, 40);
							}
								if(user.membership_type == "Free"){
										content += '<div class="  hover-box1 new" style=" background-image: url('+value2.session_img+');height:160px;margin-left:2px;margin-right:2px;"><p class="newp bundle" id="'+value.bundle_id+'">'+value2.session_name+'</p>	<div class="hover-box2a text-center text-white" style="padding:7px 0;"><h2 style="font-size:18px;">Description</h2><p class="m-0" style="font-size:14px;">'+desc+'</p><div class="btn btn2 btn-outline-light" data-sub="'+value.bundle_id+'" id="'+value2.session_id+'" style="border-radius: 0;" >S E S S I O N</div></div><div class="mb"><i class="fa fa-lock fa-2x center"></i></div></div>';
								}else{
										content += '<div class="  hover-box1 new" style=" background-image: url('+value2.session_img+');height:160px;margin-left:2px;margin-right:2px;"><p class="newp bundle" id="'+value.bundle_id+'">'+value2.session_name+'</p>	<div class="hover-box2a text-center text-white" style="padding:7px 0;"><h2 style="font-size:18px;">Description</h2><p class="m-0" style="font-size:14px;">'+desc+'</p><div class="btn btn2 btn-outline-light" data-catname="'+value.bundle_name+'" data-sub="'+value.bundle_id+'" id="'+value2.session_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';
								}
								
						});
								
							content += '</div>';
						content += '</div></div></div>';	
	
										/*	ht = ht + '<div class="col-md-4 boxStyle hover-box1 p-0" style="background-image: url('+value.bundle_img+');"><p class="Center">'+value.bundle_name+'</p><p> <span>'+complete+'</span> Of '+total+'</p><div class="progress" style="height:10px;width:90%;margin:auto;"><div class="progress-bar" style="height:10px;width:'+comper+'%;"></div></div><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" id="'+value.bundle_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';*/
							
						
					});	
				}else if(childData.SubCategory != "" && childData.Session == "" && childData.Bundle == ""){

          //alert(key);
              window.localStorage.setItem("cat",key);
												session.push(childData.Session);
							$.map(childData.SubCategory, function(value, index) {
								if(value.Session){
										content += '<div class="container-fluid text-center"><div class="pad2"><div class="row my-5 justify-content-center justify-content-md-start"><h4>'+value.subcategory_name+'</h4></div>';
											content += '<div class="newc bnd">';
										
										
										/*$.map(user.streak, function(value2, index2) {
											
											if(index == index2){
													complete =	Object.keys(value2.Session).length;
													comper =((complete*100)/total);
														}
											});*/

										$.map(value.Session, function(value2, index2) {
												if(value2.session_description.length <= 20){
											var desc = value2.session_description.substring(0, 20)+ '....';
											}else{
												
											var desc = value2.session_description.substring(0, 20);
											}
												if(user.membership_type == "Free"){

												content += '<div class=" hover-box1 new" style=" background-image: url('+value2.session_img+');height:160px;"><p class="newp" id="'+value.subcategory_id+'">'+value2.session_name+'</p>	<div class="hover-box2a text-center text-white" style="padding:7px 0;"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light"  data-subcatname="'+value.subcategory_name+'"  data-sub="'+value.subcategory_id+'" id="'+value2.session_id+'" style="border-radius: 0;" >S E S S I O N</div></div><div class="mb" data-toggle="modal" data-target="#membersubcrModal"><i class="fa fa-lock fa-2x center"></i></div></div>';
											}else{
												content += '<div class=" hover-box1 new" style=" background-image: url('+value2.session_img+');height:160px;"><p class="newp" id="'+value.subcategory_id+'">'+value2.session_name+'</p>	<div class="hover-box2a text-center text-white" style="padding:7px 0;"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" data-subcatname="'+value.subcategory_name+'" data-sub="'+value.subcategory_id+'" id="'+value2.session_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';
											}
										});
												
										//	content += '</div>';
										content += '</div></div></div>';	
					
														/*	ht = ht + '<div class="col-md-4 boxStyle hover-box1 p-0" style="background-image: url('+value.bundle_img+');"><p class="Center">'+value.bundle_name+'</p><p> <span>'+complete+'</span> Of '+total+'</p><div class="progress" style="height:10px;width:90%;margin:auto;"><div class="progress-bar" style="height:10px;width:'+comper+'%;"></div></div><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" id="'+value.bundle_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';*/
											
										
								}
							});

				}	

			//	ht +='</div></div>';

//if(window.screen.width < 425){
//				$(".q-desk").hide();
				$(".cat1").html();
				$(".cat1").append(content);
				$( "div.new" ).each(function( index ) {
		//if(index != 0 && user.membership_type == 'Free'){

		//	$(this).append('<div class="box1a"><i class="fa fa-lock fa-2x center"></i></div>');
		//}
		
  		
	});
	
//}
$('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
 //   nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
$( ".owl-prev").html('<i class="fa fa-chevron-left" style="color:#727;"></i>');
 $( ".owl-next").html('<i class="fa fa-chevron-right" style="color:#727;"></i>');

/*$(".hover-box1").bind('touchstart', function(event){
		//alert('test');
       $(this).toggleClass('hover-box1a');
});*/
	 /*   $('.hover-box1').each(function(){
		$(this).hover(function() {
		$(".hover-box1a").removeAttr('style');
		$(".hover-box2a").removeAttr('style');
		$(this).find(".hover-box1a").css("top",0);
		$(this).find(".hover-box2a").css("top",0);
          //$(this).toggleClass('hover-box1a');
     });
});*/
$(".pad2").click(function(){
	$(".hover-box2a").removeAttr('style');
});



	
				$(".btn").click(function() {
				  //alert($(this).attr('id'));
				  
				  var flag = false;
			var t ='';
			var session = [];
			var bundle = $(this).attr("id");
			var bundleid = $(this).data("sub");
      var subcatname= $(this).data("subcatname"); 
      window.localStorage.setItem("subcategory",subcatname); 
		//	alert(bundle);
				firebase.database().ref("Category").orderByChild("session_id").on("value", function(snapshot) {
		
				snapshot.forEach(function(childSnapshot) {
					///debugger;
					var key = childSnapshot.key;
						// value, could be object
						var childData = childSnapshot.val(); 
						 //console.log(childSnapshot.key);
						c.push(childSnapshot.key);
						if(childSnapshot.key == 'Quick Dive'){
							session.push(childData.Session);
							if(childData.Bundle != ""){
								$.map(childData.Bundle, function(value, index) {
									if(index == bundleid){
									$.map(value.Session, function(value2, index2) {
													session.push(value2);
											//		console.log(value2);
											if(index2 == bundle){
													console.log(value2);
											window.localStorage.setItem("session",JSON.stringify(value2));
											$.redirect("player.php",{bundle: bundle},"POST",null,null,true);
											}
									});
											//alert("done");
									}
								});
						}else if(childData.SubCategory != ""){
								$.map(childData.SubCategory, function(value, index) {
									if(index == bundleid){
									$.map(value.Session, function(value2, index2) {
													session.push(value2);
											//		console.log(value2);
											if(index2 == bundle){
													console.log(value2);
											window.localStorage.setItem("session",JSON.stringify(value2));
											$.redirect("player.php",{bundle: bundle},"POST",null,null,true);
											}
									});
											//alert("done");
									}
								});
						}


						}
					});
			});

				});
		});
		
});
}
/************************************** End Change Design On Mobile ***************************************/	


/************************************** Dynamic Change Session Acording To Timeslot ***************************************/	

        $("body").on("click",".box",function(){
            $(".box").removeClass('box1');
  $(this).addClass('box1');
  var vid = document.getElementById("jp_audio_0");
       
        console.log(window.sessiontime);
     
      for(t in window.sessiontime){
        if(window.sessiontime[t] == $(this).attr('id')){

          vid.src = window.session[t];
          $('.cp-pause').css("display","none");
          $('.cp-play').css("display","inherit");
           if (vid.paused == false) {
            vid.src = window.session[t];
          }
        }

      }
      //alert($(this).attr('id'));

    
    });
/************************************** End Dynamic Change Session Acording To Timeslot ***************************************/	
	
	// for first free conversion
$(".list li").click(function(){

  var menuid=$(this).data("menu");
  var id=$(this).attr("id");
  console.log(history);
  localStorage.setItem('session_id',id);
  localStorage.setItem('subcategory_id',$(this).data('cat'));
  if(menuid==0 && user.membership_type == "Free"){
  	$(".boxA").css("display","none");
  	$(".box1a").css("display","none");
  }
  else{
  	//for subscribe conversation
  	if($.inArray(id, final_conve_data) > -1){
  		$(".boxA").css("display","none");
  		$(".box1a").css("display","none");

  	}
    else{
      $(".chk").css("display","none");
    }
  }
  console.log(final_conve_data);

 });
var menuid=$(".list li").data("menu");
  if(menuid==0 && user.membership_type == "Free"){
  	$(".boxA").css("display","none");
  	$(".box1a").css("display","none");
  }


	/* Jounral and streak entry code*/
	
	 $(".journaladd").click(function(){
		 
		                     var user = JSON.parse(window.localStorage.getItem('user'));
         var vid = document.getElementById("jp_audio_0");
        var sec = Math.ceil(vid.duration%60);
          var min = Math.round(vid.duration/60) + (sec<=50?1:0);
            ;
      var db = firebase.database();


      
    // }
			/* Jounral code */
             var Jtext = $("#message-text").val();
             if(Jtext == "" || $("#message-text").val().replace(/ /g,"").replace(/\n/g, "").length <= 35){
              //alert("fail");
              $('#boldStuff').html('* Please write your journal');
              $('#exampleModalCenter').modal('show');
             }  
             else{  


             	      if(user.membership_type != 'Free'){
              db.ref("Users/"+user.user_id+"/completed_conversation").set(user.completed_conversation + 1);
     }else if(user.membership_type == 'Free'){
      if(((user.last_free_conversation_id)!=10 && !window.localStorage.getItem('cat')) || ((user.last_free_conversation_id)!=10 && window.localStorage.getItem('cat') == '10 Day Intro Program')){
        
        db.ref("Users/"+user.user_id+"/last_free_conversation_id").set(user.last_free_conversation_id + 1)
      }else if((user.last_free_conversation_id == 10 && window.localStorage.getItem("cat") == '10 Day Intro Program') || !window.localStorage.getItem("cat")){
        window.location = "subscription.php";
      }
     }
      db.ref("Users/"+user.user_id+"/halted").set(0.0); // Update lalted time on pause
       hdata = {"halted":0.0};
        db.ref("Users/"+user.user_id+"/sessionHalted").child(window.session_id).set(hdata); // Update lalted time on pause
      //if((user.last_free_conversation_id+1)!=10 ){ 
       
            db.ref("Users/"+user.user_id+"/total_time_divethru").set(user.total_time_divethru + min);
          
      //}
	  
	          var b = window.bundle_id;
        var s = window.session_id;
        /* check for streak variable there or not */
    // if(user.membership_type!='Free'){

      //currentstreak Start
  var C_catname='';
  var C_subcatid='';
  var C_session_id='';
  var C_type='';
  var Cur_session_id=window.localStorage.getItem('session_id');
  var Cur_subcat_id=window.localStorage.getItem('subcategory_id');
  var Cur_cat=window.localStorage.getItem('cat');
//alert(Cur_cat);
  console.log(user.currentStreak);
   if(user.currentStreak){
          //alert('t');
          $.map(user.currentStreak, function(value, index) {
                  
                  console.log(index);
                  C_catname=index;
              if(C_catname==Cur_cat){
               $.map(value, function(value, index) {
                   $.map(value, function(value, index) {
                      
                      console.log(index);
                      C_subcatid=index;
                      if(C_subcatid==Cur_subcat_id)
                      {
                        $.map(value, function(value, index) {
                        
                          console.log(index);
                          console.log(value);
                          C_type=index;
                          if(C_type=='Session')
                          {
                              $.map(value, function(value, index) {
                                  console.log(index);
                                  C_session_id=index;
                                  if(C_session_id!=Cur_session_id)
                                  {
                                    var data2={session:Cur_session_id};
                                    db.ref("Users/"+user.user_id+"/currentStreak/"+Cur_cat).child("SubCategory/"+Cur_subcat_id+"/Session/").child(Cur_session_id).set(data2);
                                  }

                              });
                          }
                          else if(C_type=='Bundle')
                          {
                              var data2={SubCategory:{[Cur_subcat_id]:{Session:{[Cur_session_id]:{session:Cur_session_id}}}}};

                              // db.ref("Users/"+user.user_id+"/currentStreak/"+C_type).remove();
                              db.ref("Users/"+user.user_id+"/currentStreak/").child(Cur_cat).set(data2);
                          }
                          
                        }); 
                      }
                      else{
                        var data2={[Cur_subcat_id]:{Session:{[Cur_session_id]:{session:Cur_session_id}}}};
                        db.ref("Users/"+user.user_id+"/currentStreak/"+Cur_cat).child('SubCategory').set(data2);
                      }
                   }); 
               }); 
              }
              else{
                //alert('c');
                var data2={[Cur_cat]:{SubCategory:{[Cur_subcat_id]:{Session:{[Cur_session_id]:{session:Cur_session_id}}}}}};
                db.ref("Users/"+user.user_id+"/currentStreak").set(data2);
              } 
          });
      }
      else{
        //alert('f');
        var data2={[Cur_cat]:{SubCategory:{[Cur_subcat_id]:{Session:{[Cur_session_id]:{session:Cur_session_id}}}}}};
        db.ref("Users/"+user.user_id+"/currentStreak").set(data2);
      }
//CurrentStreak over
//var cat=window.localStorage.getItem('cid');
     window.bundle_id='';
     //alert(Cur_subcat_id);
       var total_time_taken =  min;
       var total_visit =  1;
     if(!user.streak){
    // alert(window.bundle_id)
      if(window.bundle_id != '' && Cur_subcat_id == ""){
        var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
          //alert(b);
         db.ref("Users/"+user.user_id+"/streak").child(b).set(data);
      }else if(Cur_subcat_id != "" && window.bundle_id == ""){
         var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
         db.ref("Users/"+user.user_id+"/streak").child(Cur_subcat_id).set(data);
      }else if(window.bundle_id == "" && Cur_subcat_id == ""){
        var data = {Session:{[s]:{total_visited:1,total_taken_time:min}}};
        db.ref("Users/"+user.user_id+"/streak").child(cat).set(data);
      } 

     }else{
      var chk = false;
      $.map(user.streak, function(value, index) {
          /* check for same bundle if it is then update */
        //  alert(index);
        //  alert(Cur_subcat_id);
        
          $.map(value.Session, function(value, index) { 
              if(index == window.session_id){
          //alert(value.total_taken_time+"=="+min);
               total_time_taken = value.total_taken_time + min;
               total_visit = value.total_visited + 1;

            //var data = {Session:{[s]:{total_visited:total_visit,total_taken_time:total_time_taken}}};
         
               console.log(value);
              }
           
              if(Cur_subcat_id != "" && window.bundle_id == ""){
                   var data = {total_visited:total_visit,total_taken_time:total_time_taken};
                  db.ref("Users/"+user.user_id+"/streak").child(Cur_subcat_id).child("Session").child(s).set(data);
                    
              }
          });
    
        
      });
     }


             $('#exampleModalCenter').modal('hide');
            var currentdate = new Date(); 
                var datetime = 
                    +currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

            var firebaseRef = firebase.database().ref();

            var catname = $(".modal-title").html();
            var bundlename = $(".box_12 > p").html();
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

        }
                
		$("#message-text").val("As I read what I wrote, I connected with...");
		 
	 });
	//for get session paid detail
	var cname="/IndividualSubscription";
	var subcate_index=[];
	var final_conve_data=[];
	
	window.cat_index=0;
	firebase.database().ref("Users/"+user.user_id+cname+"/session").once("value",function(snapshot){
								//alert();
		snapshot.forEach(function(childSnapshot) {

  		console.log(childSnapshot.val());
  		//alert(childSnapshot.val());
  		childData=childSnapshot.val();
      final_conve_data.push(childData['id']);
			
		});
		
		console.log(final_conve_data);
	});

var history=[];
 $.map(user.streak, function(value, index) { 
    $.map(value, function(value, index) { 
      $.map(value, function(value, index) { 
        console.log(index);
        history.push(index);
      });
    });
 });
    console.log(history);
       // alert(session_id);
     if($.inArray(session_id, history) > -1){
        //alert(session_id);
        $(".chk").css("display","unset");
      
      }   

});
</script>

<!--Onload Modal start -->
<div class="modal fade" id="membersubcrModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content" style="background-image: url('img/box.png');">
      <div class="modal-header text-center" style="border-bottom:0px;padding:0px;">
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin:-1rem 0rem -1rem auto;">
          <span aria-hidden="true" style="color:#fff;">&times;</span>
        </button>
      </div>
      
      <div class="modal-body text-center" style="padding-top:0px;">
    <div class="boxA new-bg" style="top:0;"><div class="row "><div class="col-12"><h4 class="modal-title mb-4 sessionnm " id="exampleModalLongTitle" style="color: white;">Conversation 1</h4><h6 class="mb-4" style="color:white">One Time Subscription. Unlimited Access.</h6></div></div><div class="row justify-content-center new-bg1"><div class="col-md-6 col-lg-6 bg-white"><h4>L I F E T I M E</h4><h2>$ 6.00</h2><a href="javascript:void(0)" class="btn get-button subscribe" style="color: #fff;" data-amount="6" data-cycle="0" data-plan="L">G O <span>&nbsp;&nbsp;&nbsp;</span>U N L I M I T E D</a>
          <div style="margin-top: 8px;margin-bottom: 8px;font-weight: bold;color:#111;"> OR</div>
    <a href="javascript:void(0)" class="btn get-button freetrial" style="color: #fff; margin-bottom: 25px;" >C O N T I N U E <span>&nbsp;&nbsp;&nbsp;</span> F R E E </a></div></div></div>
  </div>  


      
  </div>
</div>
</div>
 <!--Onload modal end -->  
</body>
</html>
