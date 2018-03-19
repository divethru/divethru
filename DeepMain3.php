<?php 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$subacat = [];
$bundle = [];
$sub = count(get("Category/Deep Dives"))>0?get("Category/Deep Dives"):get("Category/Deep Dive");
foreach($sub as $key => $value)
{
		if($key == "SubCategory"){
			
			foreach($value as $k => $v){
				$subacat[] = $v;
			}
		}
}

foreach($subacat as $p => $a){
	if(isset($a['Bundle'])){
//		if($a['subcategory_name'] == $a['Bunlde']['bunlde_category'])
		$bundle[$a['subcategory_id']] = $a['Bundle'];
		
	}
}


function get($path){
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);


//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}
//print_r($subacat);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Deep Dive</title>
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/dashheader.css">
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/individual.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">

</head>

<body>
	
<!--HEADER-->
<?php include 'dashbordHeader.php'; ?>
<!--EMBODY-->
	

	     <?php 
		 $content = '';
			foreach($subacat as $skey => $sval){
				$content .= '<div class="container-fluid text-center"><div class="container"><div class="row my-5 justify-content-center justify-content-md-start"><h4>'.$sval['subcategory_name'].'</h4></div>';
				 if(count($bundle)>0){
					if(!empty($bundle[$sval['subcategory_id']])){
						$content .= '<div class="row px-5">';
						foreach($bundle as $bk => $bv){
								 foreach($bv as $bkey => $bval){	
	//var_dump($bk);
							if($bk == $sval['subcategory_id']){
								
							$content .= '<div class="col-sm-6 col-md-4 p-0"><div class="card text-white card1"><img class="card-img1" src="'.$bval['bundle_img'].'"><div class="card-img-overlay1 center" id="'.$sval['subcategory_id'].'"><p id="'.$bval['bundle_id'].'">'.$bval['bundle_name'].'</p></div></div></div>';
							
							}
							/*$content .= '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('.$bval['bundle_img'].');"><p class="Center bundle" id="'.$bval['bundle_id'].'">'.$bval['bundle_name'].'</p></div>';*/
						}
						}
						$content .= '</div>';
					}
				 }
						$content .= '</div></div>';
			}
//die;
			echo $content;
		 ?>
		 
		   
	 	           
	



<script
  src="https://code.jquery.com/jquery-3.3.1.slim.js"
  integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA="
  crossorigin="anonymous"></script>
      <script type="text/javascript" src="js/jquery.redirect.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script type="text/javascript">

	$(".card").click(function(){
		var sid = $(this).find(".center").attr("id");
		var id = $(this).find(".center > p").attr("id");
		$.redirect("individual2.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
		alert(id);
	});
</script>

</body>
</html>
