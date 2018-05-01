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
     <link rel="shortcut icon" href="img/feb.ico" />
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
    
    <title>Dive Thru</title>
    <style type="text/css">
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
    </style>
  </head>
  <body background="img/banner.png" style="background-repeat: no-repeat; padding-top: 118px;">
    
 		<?php include'header.php'; ?>
		<div class="container-fluid">
			<div class="row">
					<div class="col-md-3 col-sm-3 col-xs-12 col-xl-4"></div>
					<div class="col-md-6 col-sm-6 col-xs-12 col-xl-4">
						<br><br>
						<div class="card" style=" box-shadow: 0 0px 37px 0 rgba(0,2,0,0.1);" >
						  <div class="card-body">
						    <h2 class="card-title" style="text-align: center;  font-size: 38px; color: #34495e; padding: 28px 23px 5px 25px">What's your email?</h2>
						    	<h5 style="text-align: center; color: #727272; font-size: 18px; font-weight: 400;">Please verify your email for us.<br>
						    	Once you do, we'll send instructions <br>  to reset your password. </h5>
						    	<br>
						    	<form>
						    		  
									  <div class="form-group-log">
									   
									    <input type="email" style="border-radius: 3px;" class="form-control-log" aria-describedby="emailHelp" name="email" id="email" placeholder="Email ">
									     <p id="demo" style="color:red;"></p>
									  </div>
							           <div class="form-group-log">
									  <input type="button" class="form-control btn btn-primary btn-lg" onclick="btnclick();" style="background-color: #7dd3d5; color: white; border: none; letter-spacing: 3; font-size: 17px; border-radius: 3px;" value="SEND">
									</div>
								</form>
						  </div>
						</div>
					</div>
					<div class="col-md-3 col-sm-3 col-xs-12 col-xl-4"></div>
			</div>
		</div>
		<br><br>
		<?php include 'footer.php'; ?>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="js/bootstrap.min.js" type="text/JavaScript"></script>
	<script>
	function btnclick(){		
	    var email=document.getElementById('email').value;
        var emailExp =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	

		 if (email.match(emailExp)) {

		    firebase.auth().sendPasswordResetEmail(email).then(function() {
                  
                   document.getElementById("demo").innerHTML = "A link to reset your password has been sent. please check your email.";
                   document.getElementById("demo").style.color="green";
            }, function(error) {
                   
                   document.getElementById("demo").innerHTML = "* Sorry. DiveThru does not recognize this email";

            });
        } 
		else 
		{
	 	document.getElementById("demo").innerHTML = "* Enter your email address";
        } 

	}
	


    </script>
  </body>
</html>