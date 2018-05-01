<?php 
session_start();
?>

<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" >
   <link rel="stylesheet" href="css/reg.css" type="text/css" >
    <link rel="stylesheet" href="css/footercss.css" type="text/css" >
    <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css">
    <link href="css/sweetalert.css" rel="stylesheet" />
     <link rel="shortcut icon" href="img/feb.ico" />
    <link rel="stylesheet" type="text/css" href="css/formvalid.css">
    
   <!-- <script type="text/javascript" src="js/loginvalidation.js"></script> -->
 
    <title>Dive Thru</title>

    <!-- Firebase Start -->
<script src="https://www.gstatic.com/firebasejs/ui/live/0.4/firebase-ui-auth.js"></script>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/0.4/firebase-ui-auth.css" />

<script src="https://www.gstatic.com/firebasejs/4.9.1/firebase.js"></script>

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
		<script  src="login_user.js"></script>
	<!-- Firebase End -->
	<style type="text/css">
		.btn1 {
      display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    /* border: 1px solid #ced4da; */
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
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
button:focus{outline: none;}
	</style>
  </head>
  <body background="img/banner.png" style="background-repeat: no-repeat; margin-top: 118px;">
    
 		<?php include'header.php'; ?>

		<div class="container-fluid">
			<div class="row">
					<div class="col-md-3 col-sm-3 col-xs-12 col-xl-4"></div>
					<div class="col-md-6 col-sm-6 col-xs-12 col-xl-4">
						<br><br>
						<center>
						<div class="card" style=" box-shadow: 0 0px 37px 0 rgba(0,2,0,0.1);" >
						  <div class="card-body login-card">
						    <h1 class="card-title" style="text-align: center; color: #34495e; padding: 5px 23px 35px 25px;">Log in</h1>
						   	<form autocomplete="off">
						   		<p id="all"  style="text-align: center;" class="p1"></p>
									  <div class="form-group-log" id ="login_div">
									    <p id="p1"  class="p1"></p>
									    <input type="text" class="form-control-log" id="email" name="email" aria-describedby="emailHelp" placeholder="Email address" >
										<p id="p2"  class="p1" style="text-align: left;"></p>
									  </div>
									  <div class="form-group-log" id ="login_div">
									    <input type="password"  name="password" class="form-control-log" id="password"  name="password" placeholder="Password"><span toggle="#password" class="fa fa-fw fa-eye-slash field-icon toggle-password" style="margin-left: 86%; cursor: pointer;  position: relative;
    									bottom: 31px;"></span>
									    <p id="p3" class="p1" style=" text-align: left;"></p>     
									  </div>
									  <p style="text-align: right;"><a href="forgetpassword.php" style="text-align:right;color: #a4a4a4; font-size: 14px;">Forgot Your Password?</a></p>
									  <br>
									   <div class="form-group-log">
									  <!--<input type="button" onclick="loginclick()" class="form-control btn btn-primary btn-lg" style="background-color: #7dd3d5;border: none;letter-spacing: 3;font-size: 16px;border-radius: 3px;color: white;" value="LOG IN">-->
									  <button type="button" class=" btn1 btn-lg" style="background-color: #7dd3d5;border: none;letter-spacing: 3;font-size: 16px; cursor: pointer; border-radius: 3px;color: white;" id="log" onclick="loginclick()"><i class="fa fa-spinner fa-spin"></i>LOG IN</button>

									</div>
									 
									
									  
									   <p style="text-align: center; margin-top: 10%; font-size: 1rem;">NEW TO DIVE THRU? <a href="registration.php" style="color: #7dd3d5; text-decoration: none;">SIGN UP FOR FREE</a> </p>
									
										
										<!-- <a href="fblogin.php">
									  <button type="button" class=" form-control btn btn-primary btn-lg" style="background-color: #3b5998; border: none; border-radius: unset;"><i class="fa fa-facebook fa-lg"></i> &nbsp; &nbsp;Continue With Facebook</button></a>---->
 
 									 <br>
 <button type="button" class="btn1 fb-font" style="background-color: #3b5998; border: none; color: #FFF;  border-radius: 3px; cursor: pointer; letter-spacing: 3;line-height: 27px;" onclick="fbsave_user();"><i class="fa fa-facebook-official fa-lg" style="color:white"></i>&nbsp;CONTINUE WITH FACEBOOK</button>
<br><br>
 <button type="button" class=" form-control btn1 fb-font" onclick="googlesave_user();" style="background-color:#dd4b39; cursor: pointer; border: none; color:#fff;  border-radius: 3px; letter-spacing: 3;line-height: 27px;"><i class="fa fa-google fa-lg" aria-hidden="true"></i>&nbsp;CONTINUE WITH GOOGLE</button>
 <br>
									   								</form>
						  </div>
						 

						</div>
						</center>
					</div>
					<div class="col-md-3 col-sm-3 col-xs-12 col-xl-4"></div>
			</div>
		</div>
		<br><br>
<?php include 'footer.php'; ?>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/sweetalert.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="js/bootstrap.min.js" type="text/JavaScript"></script>
    <script type="text/javascript">
    	$(".toggle-password").click(function() {

		  $(this).toggleClass("fa-eye fa-eye-slash");
		  var input = $($(this).attr("toggle"));
		  if (input.attr("type") == "password") {
		    input.attr("type", "text");
		  } else {
		    input.attr("type", "password");
		  }
		});

$("form").keypress(function(e) {
			if(e.which == 13) {
			//	alert('You pressed enter!');
			//$("#go").click();
		login_user();
			}
		});

$(".fa-spinner").hide();

	/*function fbsave_user(){
	
	//alert(55);
	var provider = new firebase.auth.FacebookAuthProvider();
//	provider.addScope('email');
provider.addScope('user_birthday');
	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  //console.log();
  var user = result.user;
  var uid = user.uid;
  var detail = result.additionalUserInfo.profile;
  var first_name = detail.first_name;
  var last_name = detail.last_name;
  var gender = detail.gender;
  var fbid = detail.id;
  var birthday = detail.birthday;
  var loginvia = "Facebook";
  //var membership_type = "free";
  // ...
save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender);
});
}*/


function loginValidation() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var email_status = 0;
	var password_status= 0;


var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(mailformat.test(email)){
	document.getElementById("p2").innerHTML = '';
	email_status=1;
} else {
	document.getElementById("p1").innerHTML = "";
	document.getElementById("p2").innerHTML = "Please enter valid email address ";
}

  if(!password)
  {
	document.getElementById("p1").innerHTML = "";
	document.getElementById("p3").innerHTML = "Please enter password ";
  }
  else{
	  document.getElementById("p3").innerHTML = "";
	  password_status=1;
  }
  
  if(email_status === 1 && password_status === 1)
  {
	login_user();
  }
}




function loginclick(){
	loginValidation();
}
function fbsave_user(){
	
	//alert(55);
	var provider = new firebase.auth.FacebookAuthProvider();
//	provider.addScope('email');
//provider.addScope('user_birthday');
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var fbuser = firebase.auth().currentUser
		// if(fbuser){
		// 	 window.location.href = "http://34.215.40.163/welcome.php";
		// 	}else{
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  				var token = result.credential.accessToken;
  // The signed-in user info.
  //console.log();
  		 	  var user = result.user;
  			  var uid = user.uid;
 			  var detail = result.additionalUserInfo.profile;
 		  	  var first_name = detail.first_name;
           	  var last_name = detail.last_name;
           	  var email=detail.email;
           	  var gender = detail.gender;
  		   	  var fbid = detail.id;
  		      var birthday = "";
  		      var loginvia = "Facebook";
  //var membership_type = "free";
  			// ...
  			var ref = firebase.database().ref('Users').child(user.uid);
          ref.once('value').then( function(dataSnapshot) {
              if(dataSnapshot.val() !== null){

                ref.update({"fbid":fbid});
                swal({
	                        title: "Login!",
	                        text: "User Login Sucessfully.",
	                        html:true,
	                        type: "success",
	                        showCancelButton: false,
	                        confirmButtonColor: "#86CCEB",
	                        confirmButtonText: "OK",
	                        closeOnConfirm: false
	                    }, function () {
	                        window.setTimeout(function() {
	                        
	                          window.location.href = "welcome.php";
	                        }, 1000);
	                    });
              }else{
			save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender);
              }

          });
	// }
}).catch(function(error){
	console.log(error.message);
	$("p#all").html(error.message);
});
}

	
function save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender) {

			//alert(uid);
			//return;
			var currentdate = new Date(); 
			var datetime = 
			    + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
			 var PCstatus = 'Mobile';
			
			 var isMobile = {
			    Android: function() {
			        return navigator.userAgent.match(/Android/i);
			    },
			    BlackBerry: function() {
			        return navigator.userAgent.match(/BlackBerry/i);
			    },
			    iOS: function() {
			        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			    },
			    Opera: function() {
			        return navigator.userAgent.match(/Opera Mini/i);
			    },
			    Windows: function() {
			        return navigator.userAgent.match(/IEMobile/i);
			    },
			    any: function() {
			        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			    }
			}
			if( !isMobile.any() ){
							 var PCstatus = 'Desktop';
			}

			    var x = document.getElementsByName("gender");
			    var s;
				for (var i = 0, length = x.length; i < length; i++)
				{
				 if (x[i].checked)
				 {
				  // do whatever you want with the checked radio
				   s = x[i].value;
				  //alert(s);

				  // only one radio can be logically checked, don't check the rest
				  break;
				 }
				}
				
			//	console.log("ss"+uid);
                 //  var uid = user.uid;
				   	var data = {
							 "user_id": uid,
                            "first_name": first_name,
                            "last_name": last_name,
                            "email": email,
                            "fb_id":fbid,
                            "google_id": "",
                            "visited":0,
                            "login_via": "facebook",
                            "birthdate":"",
                            "gender":gender,
                            "registered_on":datetime,
                            "lastUpdated_on":datetime,
                            "halted":0.0,
                            "last_free_conversation_id":0,
                            "device_type":PCstatus,
                            "activated_on":"",
                            "activation_code":"",
                            "device_token" : "",
                            "membership_type" : "Free",
                            "total_time_divethru": 0,
                            "completed_conversation": 0,
                            "streak": '',
						}
						var updates = {};
						updates['/Users/' + uid] = data;
        				firebase.database().ref().update(updates);
        				//alert('This User Created Sucessfully');
	        				swal({
	                        title: "Login!",
	                        text: "User Login Sucessfully.",
	                        html:true,
	                        type: "success",
	                        showCancelButton: false,
	                        confirmButtonColor: "#86CCEB",
	                        confirmButtonText: "OK",
	                        closeOnConfirm: false
	                    }, function () {
	                        window.setTimeout(function() {
	                        
	                          window.location.href = "welcome.php";
	                        }, 1000);
	                    });
                    
            	
				
}	

    </script>
  </body>
</html>