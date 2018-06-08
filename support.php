<?php 
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;


$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$cms = get("cms");


function get($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Contact us</title>
 <link rel="shortcut icon" href="img/feb.ico" />
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/contact.css" rel="stylesheet" type="text/css">
<link href="css/reg.css" rel="stylesheet" type="text/css">
<link href="css/footercss.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/dashheader.css">
<!-- <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"> -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
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

/* Page Loader ================================= */
.page-loader-wrapper {
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: hidden;
  text-align: center; }
  .page-loader-wrapper p {
    font-size: 13px;
    margin-top: 10px;
    font-weight: bold;
    color: #444; }
  .page-loader-wrapper .loader {
    position: relative;
    top: calc(50% - 30px); }


</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

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
  // var config = {
  //   apiKey: "AIzaSyBwDEs5JfwQNSRKCDMHE9TrVlWArbYG9NU",
  //   authDomain: "divethrutest.firebaseapp.com",
  //   databaseURL: "https://divethrutest.firebaseio.com",
  //   projectId: "divethrutest",
  //   storageBucket: "divethrutest.appspot.com",
  //   messagingSenderId: "19401978174"
  // };
  firebase.initializeApp(config);
		</script>

</head>

<body>
 <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <!-- <div class="loader"> -->
       <img src="img/loader.gif" style="margin-top: 10% !important;">
     <!-- </div> -->
    </div>
    <!-- #END# Page Loader -->
<!--HEADER-->
	<script>
    $(document).ready(function(){

    var user=window.localStorage.getItem('user');
    if(user!=null)
    {
    //alert(user);
      $( "#result" ).load( "dashbordHeader.php", function() {
        //alert( "Load was performed." );

        $(".page-loader-wrapper").fadeOut();
      });
        
    }
    else{
        $( "#result" ).load( "header.php", function() {
        //alert( "Load was performed1 ." );
        $(".page-loader-wrapper").fadeOut();
      });
      
    }
  });
//    $.get('script/SQL/testConnection.php', function(data) {
//   alert(data)
// }); 
  </script>
<?php //include 'header.php'; ?>
<div id="result"></div>
<!--SLIDER-->

<?php 	 foreach ($cms as $value) { ?>
        
			<?php if($value['page_slug']=="support") {echo "<h2>".$value['page_description']."</h2>";} ?>
			<!-- <div class="btn1 btn-primary1 mx-0 mt-3 py-2">C H E C K O U T &nbsp; O U R &nbsp; F A Q</div>
			<div class="btn1 btn-primary2  mt-3 py-2 px-5 sample-btn-pad">C O N T A C T &nbsp; U S </div>  -->
	  
	
<?php } ?>
<!--FOOTER-->

<?php include 'footer.php'; ?>
<script type="text/javascript" src="js/cms.js"></script>
<!-- <script src="js/jquery.js"></script> -->
<script src="js/bootstrap.bundle.min.js"></script>

</body>
</html>
