<?php  session_start();
//$_SESSION['uid']='s';
//$_SESSION['email']='companytest1206@gmail.com';
?>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" >
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" >
    <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/style.css" type="text/css" >
  <link rel="stylesheet" href="css/reg.css" type="text/css">

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/jquery-1.10.2.js"></script>
  <link href="css/jquery-ui.css" rel="stylesheet">
  <script src="js/jquery-ui.js"></script>
    <title>Dive Thru</title>
  </head>
  <body background="img/banner.png" style="background-repeat: no-repeat;" onload="sg_out();">
    
    <?php include'header.php'; ?>
<div class="container" >
      <div class="row">

          <div class="col-md-8 col-sm-8 col-xs-12 " style="margin:auto;">
            <br><br>
            <div class="card" >
              <div class="card-body">
                 <div class="col-md-12 col-sm-12 col-xs-12">
                <h3 class=" verify" >
                 Email verification link expired
                 </h3>
                
                 <p class="resend">Re-send verification email to:</p>
                 <p style="font-size:18px;"><?php echo $_SESSION['email'];?></p>
                <a class="btn btn-block btn-danger " href="http://34.215.40.163/verifyEmail.php?status=EmailVerify&uid=<?php echo  $_SESSION['uid'];?>">Send</a>
                </div>
          </div>
          </div>
          </div>


      </div>
    </div>
    
    <br><br>
    
    <?php include 'footer.php'; ?>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->


  </body>
</html>