<?php 
ini_set('upload_max_filesize', '10M');
//print_r($_FILES["meditation"]["size"]);
//return;
if(!empty($_FILES["cat"]["name"]) ){
$target_dir = "uploads/category/";
//$target_file = $target_dir . strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["cat"]["name"]))));
$target_file = $target_dir . str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["cat"]["name"])))));
	
//return;
}else if(!empty($_FILES["subcat"]["name"])){
$target_dir = "uploads/subcategory/";	
//$target_file = $target_dir . strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["subcat"]["name"]))));
$target_file = $target_dir . str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["subcat"]["name"])))));

}else if(!empty($_FILES["bundle"]["name"])){
$target_dir = "uploads/bundle/";	
//$target_file = $target_dir . strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["bundle"]["name"]))));
$target_file = $target_dir . str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["bundle"]["name"])))));
}else if(!empty($_FILES["session"]["name"]) ){
$target_dir = "uploads/session/";	
//$target_file = $target_dir . strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["session"]["name"]))));
$target_file = $target_dir . str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["session"]["name"])))));
}else if(!empty($_FILES["meditation"]["name"]) ){
$target_dir = "uploads/meditation/";	
//$target_file = $target_dir . strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["meditation"]["name"]))));
$target_file = $target_dir . str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["meditation"]["name"])))));
}
//echo $target_file;

$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
//if(isset($_POST["submit"])) {
	if(!empty($_FILES["cat"]["name"]) ){
    $check = getimagesize($_FILES["cat"]["tmp_name"]);
	}else if(!empty($_FILES["subcat"]["name"])){
		$check = getimagesize($_FILES["subcat"]["tmp_name"]);
	}else if(!empty($_FILES["bundle"]["name"])){
		$check = getimagesize($_FILES["bundle"]["tmp_name"]);
	}else if(!empty($_FILES["session"]["name"]) ){
		$check = getimagesize($_FILES["session"]["tmp_name"]);
	}else if(!empty($_FILES["meditation"]["name"]) ){
		$check = $_FILES["meditation"]["size"];
	}

    if($check !== false) {
       // echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
      //echo "File is not an image.";
        $uploadOk = 0;
    }
//}

// Check if file already exists
/*if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}*/

// Check file size
if($_FILES["cat"]["size"] > 500000 ){
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
	}else if($_FILES["subcat"]["size"] > 500000){
		 echo "Sorry, your file is too large.";
    $uploadOk = 0;
	}else if($_FILES["bundle"]["size"] > 500000){
		 echo "Sorry, your file is too large.";
    $uploadOk = 0;
	}else if($_FILES["session"]["size"] > 500000 ){
	 echo "Sorry, your file is too large.";
    $uploadOk = 0;
	}


// Allow certain file formats
/*if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}*/
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    return "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
	if(!empty($_FILES["cat"]["name"]) ){
		if (move_uploaded_file($_FILES["cat"]["tmp_name"], $target_file)) {
	//		echo  $target_dir.strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["cat"]["name"]))));
			echo  $target_dir.str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["cat"]["name"])))));
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
	}else if(!empty($_FILES["subcat"]["name"]) ){
	
		if (move_uploaded_file($_FILES["subcat"]["tmp_name"], $target_file)) {
			//echo $target_dir.strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["subcat"]["name"]))));
			echo $target_dir.str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["subcat"]["name"])))));
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
	}else if(!empty($_FILES["bundle"]["name"]) ){
		if (move_uploaded_file($_FILES["bundle"]["tmp_name"], $target_file)) {
			//echo $target_dir.strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["bundle"]["name"]))));
			echo $target_dir.str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["bundle"]["name"])))));
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
	}else if(!empty($_FILES["session"]["name"]) ){
		
		if (move_uploaded_file($_FILES["session"]["tmp_name"], $target_file)) {
			//echo $target_dir.strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["session"]["name"]))));
			echo $target_dir.str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["session"]["name"])))));
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
	}else if(!empty($_FILES["meditation"]["name"]) ){
		//echo basename( $_FILES["meditation"]["name"]);
		if (move_uploaded_file($_FILES["meditation"]["tmp_name"], $target_file)) {
			//echo $target_dir.strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["meditation"]["name"]))));
			echo $target_dir.str_replace(array('(',')'),'',strtolower(str_replace("-","",str_replace(" ","",basename( $_FILES["meditation"]["name"])))));
		} else {
			echo "Sorry, there was an error uploading your file.";
		}
	}
}

?>


