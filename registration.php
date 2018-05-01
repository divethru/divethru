<?php 
	session_start();
	//echo $_SESSION['id'];
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
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="simplehttpsserver.js"></script>
    <script src="js/jquery-1.10.2.js"></script>
	<link href="css/jquery-ui.css" rel="stylesheet">
	<script src="js/jquery-ui.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('.bdate').datepicker({
			dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0",
                minDate: new Date(1980, 1, 1),
                maxDate: "+0M +0D"
			});
		});
	</script>
	<!-- Firebase Start -->
		
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

    <script type="text/javascript" src="register_user.js"></script>
	<!-- Firebase End -->
   
    <title>Dive Thru</title>
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
    border-radius: 1.25rem;
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
::-webkit-input-placeholder {
   text-transform: initial;
}

:-moz-placeholder { 
   text-transform: initial;
}

::-moz-placeholder {  
   text-transform: initial;
}

:-ms-input-placeholder { 
   text-transform: initial;
}
</style>
  </head>
  <body background="img/banner.png" style="background-repeat: no-repeat; padding-top: 118px;">
    
 		<?php include'header.php'; ?>

		<div class="container">
			<div class="row justify-content-md-center">
					<div class=" col-md-3 col-sm-2 col-xs-12"></div>
					<div class="col-md-6 col-sm-8 col-xs-12 ">
						<br><br>
                        
						<div class="card" style=" box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);" >
						  <div class="card-body">
						    <h2 class="card-title" style="text-align: center; color: #34495e; margin: 0 0 0 0;">Registration</h2>
						    	
					 <form>
						    			<p id="head"  style="text-align: center;" class="p1"></p>
						    			
						    		  <div class="form-group-log">
                                        <input type="text" class="form-control-log" name="first_name" id="first_name"  placeholder="First name" style="text-transform: capitalize;" onchange="inputfAlphabet();">
									    <p id="p1" class="p1"></p>
									  </div>

									  <div class="form-group-log">
                                        <input type="text" class="form-control-log" name="last_name" id="last_name" aria-describedby="emailHelp" style="text-transform: capitalize;" placeholder="Last name" onchange="inputlAlphabet();">
									    <p id="p2" class="p1"></p>
									  </div>
									  <div class="form-group-log">
                                        <input type="text" class="form-control-log"  id="email" name="email" aria-describedby="emailHelp" style="text-transform: lowercase;" placeholder="Email address" onchange="emailValidation()">
									    <p id="p3" class="p1"></p>
									  </div>
                                      <div class="form-group-log">
                                        <div class="pwstrength_viewport_progress"></div>
                                        <input type="password" class="form-control-log" name="password" id="password" onkeyup="CheckPasswordStrength();" placeholder="Password" >
                                      <p id="password_strength" class="p1"></p>
                                        
                                      </div>
                                      <div class="form-group-log">
                                        <input type="password" class="form-control-log" name="confirm_password" id="confirmpassword" placeholder="Confirm password" onchange="PasswordConfirm();">
									   <p id="boldStuff" class="p1"></p>
									  </div>
									 
									  <div class="form-group-log">
                                        <input type="text" name="dob" class="form-control-log bdate" id="birthdate"   placeholder="Date of birth" onchange="_calculateAge();">
										<p id="bdt" class="p1"></p>
									  </div>
									  
                                     <div class="form-group-log">
                                        <input type="text" class="form-control-log" name="access_code" id="access_code"  placeholder="Access Code (Optional)" >
                                        <p id="p5" class="p1"></p>
 
                                      </div>

									<div class="form-group-log">
							            <label >Gender : </label>
							             <div class="gender">
										 <p>
							                <input type="radio" id="test1" name="gender" value="Male" class="gen">
							                <label for="test1" class="gen">Male</label>
							              </p>
							              <p>
							                <input type="radio" id="test2" name="gender" value="Female" class="gen">
							                <label for="test2" class="gen">Female</label>
							              </p>
							              <p>
							                <input type="radio" id="test3" name="gender" value="Other" class="gen">
							                <label for="test3" class="gen">Other</label>
							              </p>
                                      </div></div>
                                     
                                          <div class="gmsg"><p id="gender" class="p1"></p></div>
							         
							           <div class="form-group-log">
									  <button  type="button"  id="submit" onclick="btnclick();" name="login"  class="btn1 " style="background-color: #7dd3d5; letter-spacing: 4; border: none; border-radius: unset;  line-height: 27px; cursor: pointer; outline: none; color: white;"><i class="fa fa-spinner fa-spin"></i>GET STARTED</button>
                                         <br><br>
                                    <center><img src="http://34.215.40.163/img/or.png" style="width: 100%" class="img-responsive"></center>
       								</div>
									
									<!-- <a href="fblogin.php">-->
									<button type="button" class=" btn1  fb-font" style="background-color: #3b5998; border: none;  border-radius: 3px; letter-spacing: 3; color: #fff; outline: none; line-height: 27px; cursor: pointer;" onclick="fbsave_user();"><i class="fa fa-facebook-official fa-lg" style="color:white"></i>&nbsp;CONTINUE WITH FACEBOOK</button><!---</a>-->
<br><br>
 <button type="button" class=" form-control btn1 fb-font" onclick="googlesave_user();" style="background-color:#dd4b39; cursor: pointer; border: none; color:#fff;  border-radius: 3px; letter-spacing: 3;line-height: 27px;"><i class="fa fa-google fa-lg" aria-hidden="true"></i>&nbsp;CONTINUE WITH GOOGLE</button>
 <br>
        							
								</form>
                                <p style="text-align: center;">By signing up, you agree to Dive thru<br> <a href="http://34.215.40.163/termsandconditions.php" style="color:#5191d6;">  Terms & Conditions</a> And <a href="http://34.215.40.163/privacypolicy.php" style="color:#5191d6;">Privacy Policy</a></p>
						  </div>

						</div>
                        
					</div>
					<div class=" col-md-3 col-sm-2 col-xs-12"></div>
			</div>
		</div>
		<br><br>
		<?php include 'footer.php'; ?>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/sweetalert.min.js"></script>
 <script type="text/javascript" src="js/passwordStrength.js"></script>
    <script src="js/bootstrap.min.js" type="text/JavaScript"></script>

    <script type="text/javascript">
    $(function () {

      $( ".gen" ).change(function() {
        $('#gender').html("");
      });

$(".fa-spinner").hide();
        $('#password').passwordStrength();

        $(".password-progress").hide(); // initail hide password indicator 

        $("#submit").click(function () {
            var password = $("#password").val();
            var confirmPassword = $("#confirmpassword").val();
            if (password != confirmPassword) {
               //alert("Passwords do not match.");
                document.getElementById('boldStuff').innerHTML = '* Your password and confirmation password do not match.';
                return false;
            }else{
                document.getElementById('boldStuff').innerHTML = '';
            return true;
            }
        });

$("form").keypress(function(e) {
      if(e.which == 13) {
      //  alert('You pressed enter!');
      //$("#go").click();
        save_user();
        //$(this).reset();  // Reset all form data
      }
    });



    });
</script>

<script type="text/javascript">

        function PasswordConfirm(){
             var password = $("#password").val();
            var confirmPassword = $("#confirmpassword").val();

            if (password != confirmPassword) {
               //alert("Passwords do not match.");
                document.getElementById('boldStuff').innerHTML = '* Your password and confirmation password do not match.';
                return false;
            }else{
                 document.getElementById('boldStuff').innerHTML = '';
            }
            return true;
        }

    function CheckPasswordStrength() {
        var password_strength = document.getElementById("password_strength");
        var psd = document.getElementById('password').value;
        //var psdExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&];
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

 		 $(".password-progress").show(); // show password indicator when inputed password
        
        //TextBox left blank.
        var test;
        if (psd.length == 0) {
            password_strength.innerHTML = "* Please Password Is Required.";
             password_strength.style.color =  "red";
             test=false;
            return ;
        }
        else if(psd.length < 8){
        	password_strength.innerHTML = " * Your password must be atleast 8 characters long";
             password_strength.style.color =  "red";
             test=false;
            return ;
        }
         else if(psd.length > 20){
          password_strength.innerHTML = " * Your password not be more then 20 characters";
             password_strength.style.color =  "red";
             test=false;
            return ;
        }else{
          test=true;
          
        }
       // alert(test);
       if(test==true){
         if(strongRegex.test(psd)){
         
          password_strength.innerHTML = " ";
            return true;
           
          }
          else{
            
            password_strength.innerHTML = " * Passwords must have uppercase letters, lowercase letters, numbers, and symbols.";
             password_strength.style.color =  "red";
            return false;
            
          }
        }
      



 
        //Regular Expressions.
        var regex = new Array();
        regex.push("[A-Z]"); //Uppercase Alphabet.
        regex.push("[a-z]"); //Lowercase Alphabet.
        regex.push("[0-9]"); //Digit.
        regex.push("[$@$!%*#?&]"); //Special Character.
        var passed = 0;
 
        //Validate for each Regular Expression.
        for (var i = 0; i < regex.length; i++) {
            if (new RegExp(regex[i]).test(password)) {
                passed++;
            }
        }
 
        //Validate for length of Password.
        if (passed > 2 && password.length > 8) {
            passed++;
        }
 		
        //Display status.
        var color = "";
        var strength = "";
       /* switch (passed) {
            case 0:
            case 1:
                strength = "Weak";
                color = "red";
                break;
            case 2:
                strength = "Medium";
                color = "darkorange";
                break;
            case 3:
            case 4:
                strength = "Strong";
                color = "green";
                break;
            case 5:
                strength = "Very Strong";
                color = "darkgreen";
                break;
        }*/
        password_strength.innerHTML = strength;
        password_strength.style.color = color;
    }

    
    
</script>
<script type="text/javascript">
	function formValidation() {
// Make quick references to our fields.
var Fname = document.getElementById('first_name').value;
var Lname = document.getElementById('last_name').value;
var Email = document.getElementById('email').value;
var pwd = document.getElementById('password').value;
var birthdate = document.getElementById('birthdate').value;
var cpwd = document.getElementById('confirmpassword').value;

var gen_status = 0;
var fname_status = 0;
var lname_status = 0;
var email_status = 0;
var pwd_status = 0;
	var cpwd_status = 0;
var birthdate_status = 0;

var confirmPassword = $("#confirmpassword").val();
var password1 = $("#password").val();




	// To check gender selected or not.
	if($('input[name=gender]:checked').length<=0)
	{
		gen_status = 0 ;
			document.getElementById('gender').innerHTML = "* Please select your gender";
		 //return false;
	}else{
		gen_status = 1 ;
	}

		if(!Fname){

		    document.getElementById('p1').innerHTML = "* Firstaname is require";
		    document.getElementById('head').innerHTML = '';
		    fname_status = 0;
		}else{
		    fname_status =1;
		}

		if(!Lname){
		    document.getElementById('p2').innerHTML = "* Lastaname is require";
		      document.getElementById('head').innerHTML = '';
		      //$("#submit").attr("disabled", "disabled");
		      lname_status = 0;
		}else{
		    lname_status = 1;
		}


		if(!Email){
		    document.getElementById('p3').innerHTML = "* Email is require";
		      document.getElementById('head').innerHTML = '';
		    //  $("#submit").attr("disabled", "disabled");
		     email_status = 0;
		}else{
		    email_status = 1;
		}

		if(!pwd){
		    document.getElementById('password_strength').innerHTML = "* Password is require";
		      document.getElementById('head').innerHTML = '';
		       pwd_status = 0;
		}else{
		    pwd_status = 1;
		}

		if(!birthdate){
		    document.getElementById('bdt').innerHTML = "* Birthdate is require";
		      document.getElementById('head').innerHTML = '';
		     // $("#submit").attr("disabled", "disabled");
		      birthdate_status = 0;
		}else{
		    birthdate_status = 1;
		}

		if(!cpwd){
		    document.getElementById('boldStuff').innerHTML = "* Confirm Password is require";
		      document.getElementById('head').innerHTML = '';
		    //  $("#submit").attr("disabled", "disabled");
		    		  cpwd_status = 0;
		}else{
					  cpwd_status = 1;
		}






	// To check Form field is empty or not.
	if (first_name.value.length == 0  || last_name.value.length == 0 || email.value.length == 0 || password.value.length == 0  || gen_status === 0 || birthdate_status == 0) {
		//document.getElementById('head').innerHTML = "* All fields are mandatory *"; // This segment displays the validation rule for all fields


		return false;
	}

	if (first_name.value.length == 1  || last_name.value.length == 1 || email.value.length == 1 || password.value.length == 1  || gen_status === 1 || birthdate_status == 1) {
		//document.getElementById('head').innerHTML = "* All fields are mandatory *"; // This segment displays the validation rule for all fields

		return true;
	}

if(password1 != confirmPassword){
    return false;
}else{
    pwd_status = 1;
}
// Check each input in the order that it appears in the form.
if (inputfAlphabet(first_name, "* For your First name please use alphabets only ")) {
if (inputlAlphabet(last_name, "* For your Last name please use alphabets only ")) {
if (emailValidation(email, "* Please enter a valid email address ")) {
    $("#submit").removeAttr("disabled");
return true;
}
}
}	

    /*if(fname_status===1 && lname_status===1 && email_status === 1 && birthdate_status === 1 && pwd_status === 1)
    {
        alert('ss');
        
    }*/
return false;

}

// Function that checks whether input text is an alphabetic character or not.
function inputfAlphabet() {
var alphaExp = /^[a-zA-Z]+$/;


var Fname = document.getElementById('first_name').value;

/*
if(inputtext.value.length < 3){
document.getElementById('p1').innerText = "* First name shuold not less than 3 word"; // This segment displays the validation rule for name.
inputtext.focus();
return false;
    
}else{
document.getElementById('p1').innerText = ""; // This segment displays the validation rule for name.
    
}*/


if (Fname.match(alphaExp)) {
  if(Fname.length < 4){
      document.getElementById('p1').innerHTML = " * Your First name must be atleast 4 character long";
      document.getElementById('first_name').focus();     
      return false;
  }
  else if(Fname.length > 15){
      document.getElementById('p1').innerHTML = " * Your First name  Maximum 15  character long only";
      document.getElementById('first_name').focus();        
        return false;
  }
  else{
      document.getElementById('p1').innerText = '';
      return true;
  }
      

} else {
document.getElementById('p1').innerHTML = "* For your First name please use alphabets only"; // This segment displays the validation rule for name.
//alert("alertMsg");
document.getElementById('first_name').focus();
return false;
}
}
// Function that checks whether input text is an alphabetic character or not.
function inputlAlphabet() {
        
var alphaExp = /^[a-zA-Z]+$/;

var Lname = document.getElementById('last_name').value;
/*    if(inputtext.value.length < 3){
        document.getElementById('p2').innerText = "* First name shuold not less than 3 word"; // This segment displays the validation rule for name.
        inputtext.focus();
        return false;
        
    }else{
        document.getElementById('p2').innerText = ""; // This segment displays the validation rule for name.
        
    }*/



    if (Lname.match(alphaExp)) {
      if(Lname.length < 4 ){
          document.getElementById('p2').innerHTML = " * Your Last name must be atleast 4  character long";
          document.getElementById('last_name').focus();
          return false;
      }else if(Lname.length > 15){
          document.getElementById('p2').innerHTML = " * Your Last name  Maximum 15  character long only";
          document.getElementById('last_name').focus();      
          return false;
      }
      else{
          document.getElementById('p2').innerText = '';
          return true;
      }
    } else {
            document.getElementById('p2').innerText = "* For your Last name please use alphabets only"; // This segment displays the validation rule for name.
            //alert(alertMsg);
           
             document.getElementById('last_name').focus();
        return false;
    }
}


// Function that checks whether an user entered valid email address or not and displays alert message on wrong email address format.
function emailValidation() {
var emailExp =  /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var Email = document.getElementById('email').value;
if (Email.match(emailExp)) {
    document.getElementById('p3').innerText = "";
return true;
} else {
document.getElementById('p3').innerText = "* Please enter a valid email address"; // This segment displays the validation rule for email.
document.getElementById('email').focus();
return false;
}
}

function btnclick() {
	 var chk = formValidation();
   var chk1= inputlAlphabet();
   var chk2= inputfAlphabet();
   var chk3 = emailValidation();
   
      if(chk==true && chk1==true && chk2==true && chk3==true ){
         save_user();
      }
   
        
}
</script>
  </body>
</html>