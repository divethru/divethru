<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>My Streak</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link href="css/mystreak.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="css/footercss.css" type="text/css">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>

<!--HEADER-->
	
<?php   include 'dashbordHeader.php'; ?>

<!--	
BODY-->

<!--SLIDER-->

<div class="container-fluid slider-bg py-5">

	<div class="container">
	     
		<div class="row justify-content-center text-center">
		     
			<div class="col-2 text-right">
			    <h2 class="center1">Current</h2>
			</div>
			
			<div class="col-6 col-md-3">
			    <div class="card text-white card1">
                     <img class="card-img1 marg" src="img/triangle.png" style="max-width: 150px; height: auto;">
                            <div class="card-img-overlay1 center triangle">
                                     <p class="pt-4">5<br>Day</p>
                            </div>
                </div>
			</div>
			
			<div class="col-2">
			    <h2 class="center2">Streak</h2>
			</div>
		</div>
		
	</div>

</div>
	
<!--CONTENT-->
	
<div class="container-fluid py-5">
	
     <div class="container">
	      
		 <div class="row justify-content-center">
		      <div class="col-md-4 col-lg-4 text-center option">
			      <img src="img/stat reminder logo.png" style="width: 80px; height: 80px;" />
				  <h6 class="pt-3">TOTAL TIME</h6>
				  <h6>DIVING THRU</h6>
				  <h2 class="pt-3">10<span style="color:#34495e;">MIN</span></h2>
			  </div>
			 <div class="line"></div>
			 <div class="col-md-4 col-lg-4 text-center option">
			     <img src="img/stat divethru logo.png" style="width: 80px; height: 80px;" />
				  <h6 class="pt-3">COMPLETED</h6>
				  <h6>CONVERSATION</h6>
				  <h2 class="pt-3">30</h2>
			 </div>
		 </div>
	   <hr class="mt-5"/>
	</div>
	
</div>
	
	

<div class="container-fluid pb-5">
	
     <div class="container">
		   
		   <div class="row">
	      
		 <div class="col-10 dive">
		     <h2>Dive With Friends</h2>
		 </div>
		 
		 <div class="col-2 text-center">
		     <img src="img/add.png" class="img-fluid" style="max-width: 40px; height: auto;" />
		 </div>
			   
		  </div>
	 
    </div>
	
</div>
	
	
	
<!--FOOTER-->
<?php  include 'footer.php'; ?>

<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>

</body>
</html>
