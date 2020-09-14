<?php

$username = $_POST['username'];
$level7won = $_POST['level7won'];
$level7time = $_POST['level7time'];
$level7stars = $_POST['level7stars'];
$level7attempts = $_POST['level7attempts'];
$level7score = $_POST['level7score'];
$level7firsttimewon = $_POST['level7firsttimewon'];
$level7timesreseted = $_POST['level7timesreseted'];
$level7badge = $_POST['level7badge'];



$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level7won=$level7won, level7time=$level7time, level7stars=$level7stars, level7attempts=$level7attempts, level7score=$level7score, level7firsttimewon=$level7firsttimewon, level7timesreseted=$level7timesreseted,level7badge=$level7badge WHERE username='$username'";

mysqli_query($db, $sql);

?>