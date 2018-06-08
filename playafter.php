<?php 
	$d = isset($_POST["qdesc"]) ? $_POST["qdesc"] : "diveThru is best meditation site";
	$qimg = isset($_POST["qimg"]) ? $_POST["qimg"] : "http://34.215.40.163/img/quote1.png";
	$nm = isset($_POST["nm"]) ? $_POST["nm"] : "Session";
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@DiveThru">
<meta name="twitter:creator" content="@divethru">
<meta name="twitter:url" content="http://34.215.40.163/playafter.php">
<meta name="twitter:title" content="<?php echo $nm;?>">
<meta name="twitter:description" content="<?php echo $d;?>">
<meta name="twitter:image:src" content="<?php echo $qimg;?>">
<!--   
<meta property="fb:app_id" content="176915049742280"/>
<meta property="og:title" content="DiveThru" />
 <meta name="fbimage" property="og:image" content="http://34.215.40.163/img/quote1.png"/>
<meta name="fbdesc" property="og:description" content="" />
<meta property="og:url" content="http://34.215.40.163/playafter.php"/>
<meta property="og:type" content="website">
<meta property="og:site_name" content="DiveThru"/>
 -->
<title>DiveThru</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
  <link href="css/" rel="stylesheet" type="text/css">
  <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <link 
  href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" 
  rel="stylesheet"  type='text/css'>
  <link href="css/share-style.css" rel="stylesheet" type="text/css">
  <style>
.hidden{
	display: none;
}
.comp{
	margin-top: 175px;
	 outline:none;
}
@media (max-width: 1440px) and (min-width: 769px){

.comp {
    margin-top: 80px;
     outline:none;
	}
}
/* Modal css */
.col-c{
	    width: 648px;
    min-width: 648px;
    margin-right: 24px;
    flex: 0 1 0%;
}
.col-c2{
	 width: 456px;
    min-width: 456px;
    margin-right: 0px;
    flex: 0 1 0%;
}
.col-c3{
	 padding-left: 40px;
	 flex-basis: 100%;
    flex: 0 1 0%;
}
.share{
	
      font-size: 24px;
    line-height: 32px;
    margin: 0px 0px 40px;
    text-align: center;
    font-family: Apercu, sans-serif;
    font-style: normal;
    letter-spacing: 2.5px;
    /* font-size: 16px; */
    font-weight: 600;
    text-transform: uppercase;
    color: rgb(90, 97, 117);
}
.css-wlgw4p{
	    -webkit-box-align: center;
    font-size: 24px;
    line-height: 40px;
    display: flex;
    font-weight: 400;
    align-items: center;
    margin-bottom: 24px;
    font-family: Apercu, sans-serif;
    font-style: normal;
    color: rgb(90, 97, 117) !important;
	margin-left: 12%;
}
.close2{
	    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 3%;
    /*padding: 32px;*/
	font-size: 55px;
	color: rgb(90, 97, 117);;
}
.modal-share{
	max-width: 60% !important;
}
.share2{
		display: none;
	}
.share{
		display: block;
	}	
	
@media (max-width: 425px){
	.modal-share-content{
		width: 100%;
		height: 100%;
	}
	.share2{
		display: unset;
		width: 100%;
		color: rgb(90, 97, 117) !important;
	}
	.col-c3{
	 padding-left: 0;
	 flex-basis: 100%;
    flex: 0 1 0%;
	padding-top: 20%;
}
	.share{
		display: none;

	}
	
	.modal-share{
		max-width: 100% !important;
	}
	i.fa.fa-facebook,i.fa.fa-twitter,i.fa.fa-link{
		margin-right: 15px;
	}
}
</style>
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

</head>
<body>

<div class="container-fluid px-0">
    <div class="row mx-0" style="color: rgb(90, 97, 117);">
	    <div class="col-lg-6 part1 text-center">
		    <div class="row part11 py-4">
			    <div class="col-12">
				    <p>WELL DONE</p>
				</div>
			</div>
			
			<div class="row">
			    <div class="col-6 col-lg-12 part22">
				    <h3 class="meditate-time">385</h3>
					<p>MINUTES MEDITATED</p>
				</div>
			    <div class="col-6 col-lg-12 part33">
				    <h3 class="currentday">1</h3>
					<p>DAY IN A ROW</p>
				</div>
			</div>
		</div>
		
		<div class="col-lg-6 part2 text-center">
			<i class="fa fa-quote-left" aria-hidden="true"></i>
            <p class="quotetext">Throughout the day, try to catch the mind when it wanders off and notice if it's thinking or feeling.</p>
			<i class="fa fa-quote-right" aria-hidden="true"></i><br>
			<a href="#" id="SModal" class=" btn1 btn-primary1 px-4 py-2 mx-2"><i class="fa fa-paper-plane mr-2" aria-hidden="true"></i>SHARE</a>
			<button class="btn1 btn-primary2 px-4 py-2 mx-2 comp">COMPLETE</button>
		</div>
	</div>
</div>
<!--Modal start -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-share" role="document" >
    <div class="modal-content modal-share-content" >
      <div class="modal-header text-center">
	  				<h2 class="share2 modal-title">SHARE</h2>
       <div  class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </div>
      </div>
      <div class="modal-body">
	  <div class="row">
		<div class="col-md-6">
			<img class="shareimg" src="../img/quote1.png" style="width:100%;"/>
		</div>
		<div class="col-md-6" style="margin:auto;">
			<div class="col-c3">
				<p class="share">SHARE</p>
				<div style="display:block;">
					<a class="css-wlgw4p btnShare" data-js="facebook-share" data-image="img/quote1.png" data-title="Article Title" data-desc="Some description for this article" ><i class="fa fa-facebook fa-lg white-text mr-md-3"> </i> Facebook</a>
				</div>
				<div style="display:block;">
					<a class="css-wlgw4p twitter-share" data-js="twitter-share"><i class="fa fa-twitter fa-lg white-text mr-md-3"> </i> Twitter</a>
				</div>
				<div style="display:block;">
					
					<a href="#" class="css-wlgw4p copylink"><span><i class="fa fa-link fa-lg white-text mr-md-3"></i></span> Copy Link<input type="hidden" name="myInput" id="myInput" value="www.divethru.com"></a>
	
				</div>
			</div>
		</div>
		</div>
      </div>
      
  </div>
</div>
</div>
 <!-- modal end -->

</body>
<script type="text/javascript">
	window.fbAsyncInit = function(){
FB.init({
    appId: '176915049742280', status: true, cookie: true, xfbml: true }); 
};
(function(d, debug){var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if(d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; 
    js.async = true;js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);}(document, /*debug*/ false));
function postToFeed(title, desc, url, image){
var obj = {method: 'feed',link: url, picture: 'http://34.215.40.163/'+image,name: title,description: desc};
function callback(response){}
FB.ui(obj, callback);
}

</script>	
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
      <script type="text/javascript" src="js/jquery.redirect.js"></script>
  <script src="js/afterplay.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/color-thief.js"></script>
<script type="text/javascript">
	

	/* start fb share 
	var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function(e) {
  e.preventDefault();
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
}
	 end fb share */


		$(document).ready(function(){
			
			var Sessiondata = JSON.parse(window.localStorage.getItem("SESSIONDATA"));
			 
   			/*$.post("twitter_login.php", {qimg: Sessiondata.session_quote_img,msg:Sessiondata.session_quote_description}, function(result){
        			window.qimg = result;
alert(result);

        			/*start twitter share*/
			/*var twitterShare = document.querySelector('[data-js="twitter-share"]');

			twitterShare.onclick = function(e) {
			  e.preventDefault();
			  		var Sessiondata = JSON.parse(window.localStorage.getItem("SESSIONDATA"));
			 // window.open("https://twitter.com/intent/tweet?via=ProgramCafe");
			  var twitterWindow = window.open('https://twitter.com/intent/tweet?text='+Sessiondata.session_quote_description+';hashtags='+Sessiondata.session_name+'&url=' + result+'&via=diveThru', 'twitter-popup', 'height=350,width=600');
			  if(twitterWindow.focus) { twitterWindow.focus(); }
			    return false;
			  }*/
			/* End twitter*/
        	/*		
    		});*/
$(".twitter-share").click(function(){
	//alert(5555);
	var qmsg = Sessiondata.session_quote_description+' #'+Sessiondata.session_name+'@diveThru';
		$.redirect("twitter_login.php",{qimg:Sessiondata.session_quote_img ,msg:qmsg},"POST",null,null,true);
});
   			


			$(".shareimg").attr("src",Sessiondata.session_quote_img);
			$(".quotetext").html(Sessiondata.session_quote_description);
			 var img = window.localStorage.getItem('session_img');
			 var color = window.localStorage.getItem('colorcode');
			 	$(".part1").css('background-color', 'rgb('+color+') ');
			 	$(".part2 > i").css('color', 'rgb('+color+') ');
			
			$(".part1").css('background-image', 'url('+Sessiondata.session_img+') ');
			    var user = JSON.parse(window.localStorage.getItem('user'));
			    $(".meditate-time").html(user.total_time_divethru);

			$("#SModal").click(function(){

				$("#memberModal").modal("show");
			});
			$(".comp").click(function(){
				///alert(5);
				if((user.last_free_conversation_id == 4 || user.last_free_conversation_id == 5 || user.last_free_conversation_id == 10) && user.membership_type == "Free"){
					         window.location = "subscription.php"
				}else{
					         window.location = "dashboard.php"
				}
			});

			/* Day in row*/


 firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {
 	window.localStorage.setItem("user",JSON.stringify(snapshot.val()));
 	var data=snapshot.val();
	 	if(data.currentStreak){
	     $.map(data.currentStreak, function(value, index) {
	            $.map(value, function(value2, index2) {
	                  if(index2 == "SubCategory" ){
	                    $.map(value2, function(value3, index3) {
	                          $.map(value3, function(value4, index4) {
	                            if(index4 == "Bundle"){
	                               $.map(value4, function(value5, index5) {
	                              	 	$.map(value5, function(value6, index6) {
	                              	 		if(index6 == "Session"){

	                  					$(".currentday").html(Object.keys(value6).length);
	                              	 		}
	                                  		//alert("DEP"+Object.keys(value6).length+"index"+index6);
	                                  		//console.log(value6);
	                                	});
	                                });
	                            }else if(index4 == "Session"){
	                                //$.map(value4, function(value5, index5) {
	                  			$(".currentday").html(Object.keys(value4).length);
	                                  		console.log(Object.keys(value4).length);
	                                //});

	                            }
	                         });
	                    });
	                  }else if(index2 == "Bundle"){
	                    $.map(value2, function(value3, index3) {
	                    //  console.log(index3);
	                           $.map(value3, function(value4, index4) {
	                                console.log(Object.keys(value4).length);
	                                if(index4 == "Session"){

	                  					$(".currentday").html(Object.keys(value4).length);
	                                }
	                                  /*$.map(value4, function(value5, index5) {
	                                	});*/
	                           });
	                    });
	                  }else if(index2 == "Session"){
	                  			$(".currentday").html(Object.keys(value2).length);
	                               		console.log(Object.keys(value2).length);
	                    
	                  }
	                });

	     });
	}

 });





			/* Day in row*/



			/* Start code for share on fb */
			$('.btnShare').click(function(){
			elem = $(this);
			//alert(elem.data('image'));
			//$('meta[name=fbimage]').attr('content', 'http://34.215.40.163/img/quote2.png');
		//	postToFeed(elem.data('title'), elem.data('desc'), elem.data('link'), elem.data('image'));
		var Sessiondata = JSON.parse(window.localStorage.getItem("SESSIONDATA"));
 
var BASE_URL = "http://34.215.40.163/playafter.php";
var title = "DiveThru";
var description = Sessiondata.session_quote_description;
var image =  Sessiondata.session_quote_img;
		 FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
            object : {
               'og:url': BASE_URL,
               'og:title': Sessiondata.session_name,
               'og:description': Sessiondata.session_quote_description,
               'og:og:image:width': '2560',
               'og:image:height': '960',
               'og:image': image
            }
        })
    });

			return false;
			});
			/* End code for share on fb */

			/* Start code for copy link*/
			$(".copylink").click(function(){

					var txt = document.createElement('textarea');
				  document.body.appendChild(txt);
				  txt.value = $("#myInput").val(); // chrome uses this
				  txt.textContent = $("#myInput").val(); // FF uses this
				  var sel = getSelection();
				  var range = document.createRange();
				  range.selectNode(txt);
				  sel.removeAllRanges();
				  sel.addRange(range);
				  if(document.execCommand('copy')){
				    console.log('copied');
				  }
				  document.body.removeChild(txt);
				  var oldtext = $(this).html();
  				$(this).html("Copied!");
  				 
  					//setInterval(function(){ 
  						$(".copylink").fadeOut(1000,function() {
						  $(".copylink").html(oldtext).fadeIn(200);
						}); 
  					//}, 300);
  				//	alert(copyText.value);
			});

			/* End code for copy link*/


		});

		
</script>
</html>