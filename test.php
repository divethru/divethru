<?php 

// the message
$date = date("Y-m-d H:s:i");
$msg = "First line of text\nSecond line of text DT => ".$date;

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("companytest1206@gmail.com","My subject",$msg);

?>