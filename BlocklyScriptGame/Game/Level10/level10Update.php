<?php

$username = $_POST['username'];
$level10won = $_POST['level10won'];
$level10time = $_POST['level10time'];
$level10stars = $_POST['level10stars'];
$level10attempts = $_POST['level10attempts'];
$level10score = $_POST['level10score'];
$level10firsttimewon = $_POST['level10firsttimewon'];
$level10timesreseted = $_POST['level10timesreseted'];
$level10badge = $_POST['level10badge'];




$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level10won=$level10won,level10time=$level10time,level10stars=$level10stars,level10attempts=$level10attempts,level10score=$level10score,level10firsttimewon=$level10firsttimewon,level10timesreseted=$level10timesreseted,level10badge=$level10badge WHERE username='$username'";

mysqli_query($db, $sql);

?>