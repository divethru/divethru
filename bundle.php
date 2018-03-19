<!DOCTYPE html>
<html style="height: 100%">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="css/footercss.css" type="text/css" >
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
<script src="Admin/js/sign_out.js"></script>
 <style type="text/css">
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
  border-radius: .25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

		   
.list ul li {list-style: none;
             letter-spacing: 2px;}
.list ul {
	padding-left:0;
}

.list ul li  {font-size: 20px;
             transition: all 0.5s;}

.list ul li p {padding-top: 16px; }

.list ul li:hover {background-color: white;
                  color: gray;}
				  
.selected{background-color: #727272;
                  color: #fff;}

.list1 p {margin-right: 30px;
         font-size: 28px;
         margin-bottom: 12px;}

.see {display: block;}

.see1 {display: none;}



@media(max-width:991px){
	
	.see {display: none;}

       .see1 {display: block;}
}
		 
@media(min-width:320px) and (max-width:425px){
	.list ul li  {font-size: 14px;}
	
	h2 {text-align: center;
	   font-size: 24px;}
}

@media(min-width:426px) and (max-width:768px){
	.list ul li  {font-size: 16px;}
}

@media(min-width:1200px){
	
	.box {margin: 0 300px !important;}
}		 

</style>
</head>
<body>

<?php 
$bundle = $_POST["bundle"];
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;


$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$bundle = get("Category/Quick Dive/Bundle/".$bundle."/Session");
$seesion = [];


function get($path){
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);


//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}
//print_r($user);
 include 'dashbordHeader.php'; ?>
<!-- <div class="loader"></div> -->
   
		<!--<div class="row Margins">
	  <p class="MainMenu">QUICK DIVE&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p>
	</div>
	
	<br>-->
<!--	<nav class="navbar navbar-light bg-white box-shadow see1">
	<a href="#" class="navbar-brand"></a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#aj">
	      <span class="navbar-toggler-icon"></span>
	</button>
	
	<div class="collapse navbar-collapse nav-style" id="aj">
	     <ul class="navbar-nav">
		     <li class="nav-item">
			     <a class="nav-link" href="#">Feeling Triggered?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Bad Day?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Consumed By Insecurities?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Organize Your Mind Stuck On A Negative comment?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Mad At Your Partner?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Bad Body Day?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Stressful Day At Work?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Busy Mind</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">Gratitude Hit Panicking?</a>
			 </li>
			 
			 <li class="nav-item">
			     <a class="nav-link" href="#">TestMarchnew</a>
			 </li>
			 
		 </ul>
	</div>

</nav>



<div class="container-fluid" >

     <div class="row mt-5">
			
           <!-- <div class="col-md-6 col-lg-4 col-xl-3 see">
			  
			  
			   <div class="row justify-content-center justify-content-md-start list mx-5 side" style="border: 1px solid #ccc; margin-top: 90px;">
			       <ul style="margin-bottom: 0;">
				     <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Feeling Triggered?</p></li>
					 <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Bad Day?</p></li>
					 <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Consumed By Insecurities?</p></li>
					 <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Organize Your Mind Stuck On A Negative comment?</p></li>
				     <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Mad At Your Partner?</p></li>
					 <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Bad Body Day?</p></li>
					 <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Stressful Day At Work?</p></li>
					 <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Busy Mind</p></li>
				     <li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4">Gratitude Hit Panicking?</p></li>
					 <li class="my-0" style="border-bottom: 1px solid #fff;"><p class="pl-4">TestMarchnew</p></li>
					 
				   </ul>
			   </div>
			
		   </div>-->
		   
		   
    <!--
           <div class="col-md-6 col-lg-8 col-xl-9">
                
			   <h2 style="margin-bottom: 50px" id="<?php //echo $_POST['bundle'];?>">LOVE BUNDLE</h2>
                    <div class="row mx-5 Dsess">
           <!--BOX1-->
						<?php //foreach($bundle as $k => $v) 
                        //  echo '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('.$v['session_img'].');"><p class="Center bundle" id="'.$v['session_id'].'">'.$v['session_name'].'</p></div>';
						?>
          <!-- 
                    </div>
           
           </div>

      </div>
</div>-->
<div class="container-fluid text-center py-5">
					<h2 id="<?php echo $_POST['bundle'];?>">LOVE BUNDLE</h2>
      <div class="container text-center cardContainers py-5">
		 
		 <div class="row cat Margins text-center">
                   
			<?php foreach($bundle as $k => $v) 
                          echo '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('.$v['session_img'].');"><p class="Center bundle" id="'.$v['session_id'].'">'.$v['session_name'].'</p></div>';
						?>
		</div>	
	 </div>	
</div>
<!---<div class="container-fluid mt-5"><div class="box-slider">

  
       <h3>QUICK DIVE</h3>
      
         <div class="container">
                <div class="row text-center box justify-content-center">

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/1.png">
                        <div class="card-img-overlay1">
                           <p class="center">Having A Bed Day</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/2.png">
                        <div class="card-img-overlay1">
                           <p class="center">Overcome by Anxiety</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/3.png">
                        <div class="card-img-overlay1">
                           <p class="center">Consumed by Insecurities</p>
                        </div>
                        </div>
                     </div>

                       <div class="col-md-3 px-0">
                        <div class="card1 text-white b1">
                        <img class="card-img1" src="img/4.png">
                        <div class="card-img-overlay1">
                           <p class="center">Busy Mind</p>
                        </div>
                        </div>
                     </div>

                   </div>
            
       </div>
  
  </div>
  
</div>
-------->


<?php include 'footer.php'; ?>
	
    
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/jquery.redirect.js"></script>

<script>	
/* Changing style of bundle list on seleted and hover*/

$(".list").find('ul > li').on('hover',function(e){
					$(".list > ul > li.selected").removeClass("selected");
});

/*Dynamic content of sesion with redirect to player on click*/
var mn = '<ul style="margin-bottom: 0;">';
var id = $("h2").attr("id");
firebase.database().ref("Category/Quick Dive/Bundle").on("value", function(snapshot) {
										snapshot.forEach(function(childSnapshot) {
											var data = childSnapshot.val();
											var key = childSnapshot.key;
											if(key == id){
											 mn += ' <li class="my-0 selected" style="border-bottom: 1px solid #ccc;"><p class="pl-4 "  id="'+data.bundle_id+'">'+data.bundle_name+'</p></li>';
											$("h2").html(data.bundle_name);
											}else{
											 mn += '<li class="my-0" style="border-bottom: 1px solid #ccc;"><p class="pl-4" id="'+data.bundle_id+'">'+data.bundle_name+'</p></li>';
											}

						
											console.log(data.bundle_name);
												if(key != 'Session'){
														flag = false;
												}else{
													flag = true;
													return true;
												}
								
										});
	mn += '</ul>';
									console.log(mn);
				$(".side").html(mn);
				$(".list").find('ul > li').on('click',function(e){
					$(".list > ul > li.selected").removeClass("selected");
					$(this).addClass("selected");
					var i = $(this).find("p").attr('id');
					var t = $(this).find("p").text();
					$("h2").attr("id",i);
					$("h2").html(t);
					$(".Dsess").html("");
					var id = $("h2").attr("id");
					var Bundlesession = '';
			//	var sessionid = $(this).find(".bundle").attr("id");
				firebase.database().ref("Category/Quick Dive/Bundle/"+id).on("value", function(snapshot) {
					snapshot.forEach(function(childSnapshot) {
						childData = childSnapshot.val(); 
							if(childSnapshot.key == "Session"){
								$.map(childData, function(value, index) {
									Bundlesession += '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.session_img+');"><p class="Center bundle" id="'+value.session_id+'">'+value.session_name+'</p></div>';
								});
							}
					});
				});
									$(".Dsess").html(Bundlesession);
									
									$("div.col-md-6").find(".row").find(".boxStyle").on('click',function(e){

	var session = [];
		var sessionid = $(this).find(".bundle").attr("id");
	firebase.database().ref("Category/Quick Dive/Bundle/"+id).on("value", function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
							childData = childSnapshot.val(); 
					if(childSnapshot.key == "Session"){
						
							$.map(childData, function(value, index) {
									if(index == sessionid){
										window.localStorage.setItem("session",JSON.stringify(value));
								console.log(value);
									}
							});
						if(Object.keys(childSnapshot.val()) == sessionid){
							session.push(childSnapshot.val());
							console.log(childSnapshot.val());
						}
					}
						window.localStorage.setItem("cat","Quick Dive");
				$.redirect("player2.php",{cat: "Quick Dive"},"POST",null,null,true);
				});
						
	});

});
				alert($(this).find("p").attr('id'));
				});
});


$("div.py-5").find(".row").find(".boxStyle").on('click',function(e){

	var session = [];
		var sessionid = $(this).find(".bundle").attr("id");
	firebase.database().ref("Category/Quick Dive/Bundle/"+id).on("value", function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
							childData = childSnapshot.val(); 
					if(childSnapshot.key == "Session"){
						
							$.map(childData, function(value, index) {
									if(index == sessionid){
										window.localStorage.setItem("session",JSON.stringify(value));
								console.log(value);
									}
							});
						if(Object.keys(childSnapshot.val()) == sessionid){
							session.push(childSnapshot.val());
							console.log(childSnapshot.val());
						}
					}
						window.localStorage.setItem("cat","Quick Dive");
				$.redirect("player2.php",{cat: "Quick Dive"},"POST",null,null,true);
				});
						
	});

});



</script>


<script src="js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html> 