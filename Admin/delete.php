<?php
$file = $_POST["file"];

if($file){
	unlink($file);
}


?>