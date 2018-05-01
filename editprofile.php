<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>Edit Profile</title>
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/editprofile.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="css/dashboard.css">
	<link rel="stylesheet" href="css/dashheader.css">
	<link href="css/footercss.css" rel="stylesheet" type="text/css">
	<link href="css/reg.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link href="css/jquery-ui.css" rel="stylesheet">
	<link href="css/sweetalert.css" rel="stylesheet" />
	 <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
	 <script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
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
<style type="text/css">
	.p1{
	font-size: 14px;
    color: red;
    text-align: -webkit-auto;
    padding-top: 10px;
}

</style>
</head>

<body  background="img/banner.png" style="background-repeat: no-repeat;">
	<?php include 'dashbordHeader.php';  ?>
<div class="container-fluid pt-5 pb-5">
    <div class="container">
	     <div class="row justify-content-center" style="margin-top: 10%;">
		     <div class="col-md-6 bg-white text-center py-5" style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 0 52px;"><form method="post">
			         <h2>Edit Profile</h2>
			         <br>
				      <div class="circle mx-auto">
					       <!-- User Profile Image -->
					       <img class="profile-pic position-relative img-fluid" src="#" >

					       <!-- Default Image -->
					       <!-- <i class="fa fa-user fa-5x"></i> -->
					       <div class="p-image">
					       <i class="fa fa-camera upload-button"></i>
					        <input class="file-upload" id="profile_image" type="file" onchange="uplaoduserimg()" accept="image/*"/>
					        <input type="hidden" id="imgurl">
					  </div>
					     </div>
				      
					  <br>
					
				 	<input type="hidden" id="uid">
				     <div class="form-group form-group-log">
					     <input type="text" id="first_name"   name="first_name"  class="form-control form-control-log" onchange="inputlAlphabet();">
					     <p id="p1" class="p1"></p>
					 </div>
					 
					 <div class="form-group form-group-log">
					     <input type="text"  id="last_name" name="last_name"  class="form-control form-control-log">
					     <p id="p1" class="p1"></p>
					 </div>
					 
					 <div class="form-group form-group-log">
					     <input type="email" id="email" name="email" disabled="" class="form-control form-control-log">
					 </div>
					 
					 <div class="form-group form-group-log">
					     <input type="text" placeholder="Mobile Number(Optional)" name="mobile_number" id="mobile_number" class="form-control form-control-log">
					 </div>

					 <div class="form-group form-group-log">
					     <input type="text" placeholder="Company Name(Optional)" name="company_name" id="company_name" class="form-control form-control-log">
					 </div>

					 <div class="form-group form-group-log">
					      <input type="text" name="dob" class="form-control-log bdate" id="birthdate" onchange="_calculateAge();" placeholder="Date of birth">
					      <p id="bdt" class="p1"></p>
					 </div>
					 
					 
					 <div class="form-group">
					 <button  class="btn btn-primary-log w-100 EditProfile " onclick="profileValidation();"  type="button" >S A V E &nbsp; C H A N G E S</button>
					    <!--  <input type="submit" class="btn btn-primary-log w-100 editProfile" value="S A V E &nbsp; C H A N G E S"> -->
					 </div>
					 <h6 style="color: #727272 !important; font-size: 18px;">User <span style="color: #7dd3d5">Support</span></h6>
				</form>
			 </div>
		 </div>
	</div>	
</div>
<br><br>
	<?php include'footer.php' ?>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script>
  <script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/bootstrap.bundle.js"></script>
	
	<script src="js/sweetalert.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
		var user = JSON.parse(window.localStorage.getItem('user'));
		//console.log(user);
		 var uid = $('#uid').val(user.user_id);
         var fname=$('#first_name').val(user.first_name);
         var lname=$('#last_name').val(user.last_name);
         var email=$('#email').val(user.email);
         var mob=$('#mobile_number').val(user.mobile_number);
         var dob=$('#birthdate').val(user.birthdate);
         var cimg = $("#oldimg").val(user.profile_image);
		 if(cimg){
			 
		$(".profile-pic").attr("src",user.profile_image);
		 }
          var data = {
	            first_name: fname,
	            last_name: lname,
	            mobile_number: mob,
	            birthdate:dob,
	            category_img: cimg,
	         };
		
			$('.bdate').datepicker({
			dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0",
                minDate: new Date(1980, 1, 1),
                maxDate: "+0M +0D"
			});

			

			var readURL = function(input) {
		        if (input.files && input.files[0]) {
		            var reader = new FileReader();

		            reader.onload = function (e) {
		                $('.profile-pic').attr('src', e.target.result);
		            }
		    
		            reader.readAsDataURL(input.files[0]);
		        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });

  

		   $(".EditProfile").click(function(){
		    var uid = $('#uid').val();
		    alert(uid);
		    var booksRef = firebase.database().ref('Users').child(uid);
		    
		    var fname=$('#first_name').val();
		    var lname=$('#last_name').val();
		    var email=$('#email').val();
		    var mob=$('#mobile_number').val();
		    var dob=$('#birthdate').val();
		     var cimg = $("#imgurl").val();
		    //alert(fname);
		    booksRef.update({ first_name: fname, last_name: lname, mobile_number: mob, birthdate: dob, profile_image: cimg }).then(function() {
		   alert('success');
		    }).catch(function(error){
		         alert('err' + error);
		          });
		    firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {

		   	window.localStorage.setItem('user',JSON.stringify(snapshot));
		   });
		   });
		   //alert(uid;);
		    
		   

		});
	</script>
	<script type="text/javascript">
		//image upload code
		   		 function uplaoduserimg() {
   				 document.getElementsByClassName("EditProfile").disabled = true;

			$(".EditProfile").attr("disabled","disabled");

			    
			    
			    var file_data = $('#profile_image').prop('files')[0];   
			    var form_data = new FormData();                  
			    form_data.append('userprofile', file_data);
			 //   alert(form_data);                             
			    $.ajax({
			        url: 'action.php', // point to server-side PHP script 
			        dataType: 'text',  // what to expect back from the PHP script, if anything
			        cache: false,
			        contentType: false,
			        processData: false,
			        data: form_data,                         
			        type: 'post',
			        success: function(data){
			           // alert(data);
			            $("#imgurl").val("http://localhost/divethru-DiveThru_web_19_03/"+data.replace(/\n/g, ''));
			            $(".EditProfile").removeAttr("disabled");
			            console.log(data); // display response from the PHP script, if any
			        }
			     });
			}
		   //end image upload code


		   //vlidations start
		   function profileValidation() {
		   	var Fname=document.getElementById("first_name").value;
		   	var Lname=document.getElementById("last_name").value;
		 	// var mob=document.getElementsById("mobile_number").value;
		 	// var birthdate = document.getElementById('birthdate').value;
		 	//alert(Fname);
		 		if (inputfAlphabet(first_name, "* For your First name please use alphabets only ")) {
				if (inputlAlphabet(last_name, "* For your Last name please use alphabets only ")) {
				return true;
				}
				}

				return false;
		   		function inputfAlphabet() {
					var alphaExp = /^[a-zA-Z]+$/;


					var Fname = document.getElementById('first_name').value;

					if (Fname.match(alphaExp)) {
					   if(Fname.length > 15){
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


				function inputlAlphabet() {
        
					var alphaExp = /^[a-zA-Z]+$/;

					var Lname = document.getElementById('last_name').value;

					    if (Lname.match(alphaExp)) {
					      if(Lname.length < 8 ){
					          document.getElementById('p2').innerHTML = " * Your Last name must be atleast 8  character long";
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
		 	}
			
			
			function _calculateAge() { // birthday is a date
        var date1 = new Date();
        var  dob= document.getElementById("birthdate").value;
        //alert(dob);
        var date2=new Date(dob);
        var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/; //Regex to validate date format (dd/mm/yyyy)
        if (pattern.test(dob)) {
            var y1 = date1.getFullYear(); //getting current year
            var y2 = date2.getFullYear(); //getting dob year
            var age = y1 - y2;           //calculating age 
          //  confirm("Age : " + age);
            if(age<8)
            {
                //alert("please come after 8");
                document.getElementById("bdt").innerHTML = "* User must be 8 year old or above";
                document.getElementById("birthdate").value = '';
            }else{
                  document.getElementById("bdt").innerHTML = "";
            }
        } else {
            alert("Please Input in (dd/mm/yyyy) format!");
        }
}
		   //end validations
			

	</script>
</body>
</html>
