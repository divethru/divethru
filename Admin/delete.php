<?php
$file = $_POST["file"];

if($file){
	unlink($file);
	echo "File Deleted";
}else{
	echo "File Path Not Found";
}


?>