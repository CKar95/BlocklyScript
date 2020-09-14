<?php

$username = $_POST['username'];
$level6won = $_POST['level6won'];
$level6time = $_POST['level6time'];
$level6stars = $_POST['level6stars'];
$level6attempts = $_POST['level6attempts'];
$level6score = $_POST['level6score'];
$level6firsttimewon = $_POST['level6firsttimewon'];
$level6timesreseted = $_POST['level6timesreseted'];
$level6badge = $_POST['level6badge'];




$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level6won=$level6won, level6time=$level6time, level6stars=$level6stars, level6attempts=$level6attempts, level6score=$level6score, level6firsttimewon=$level6firsttimewon, level6timesreseted=$level6timesreseted,level6badge=$level6badge WHERE username='$username'";

mysqli_query($db, $sql);

?>