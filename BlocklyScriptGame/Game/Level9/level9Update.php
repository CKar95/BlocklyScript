<?php

$username = $_POST['username'];
$level9won = $_POST['level9won'];
$level9time = $_POST['level9time'];
$level9stars = $_POST['level9stars'];
$level9attempts = $_POST['level9attempts'];
$level9score = $_POST['level9score'];
$level9firsttimewon = $_POST['level9firsttimewon'];
$level9timesreseted = $_POST['level9timesreseted'];
$level9badge = $_POST['level9badge'];



$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level9won=$level9won,level9time=$level9time,level9stars=$level9stars,level9attempts=$level9attempts,level9score=$level9score,level9firsttimewon=$level9firsttimewon,level9timesreseted=$level9timesreseted,level9badge=$level9badge WHERE username='$username'";

mysqli_query($db, $sql);

?>