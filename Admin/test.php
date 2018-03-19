<?php
require_once('MP3.php');
$path = isset($_POST["path"])?$_POST["path"]:'http://34.215.40.163/Admin/uploads/meditation/day01.mp3';
$mp3file = new MP3File($path);//http://www.npr.org/rss/podcast.php?id=510282
$duration1 = $mp3file->getDurationEstimate();//(faster) for CBR only
$duration2 = $mp3file->getDuration();//(slower) for VBR (or CBR)
echo "duration: $duration1 seconds"."\n";
echo "estimate: $duration2 seconds"."\n";
echo MP3File::formatTime($duration2)."\n";
?>