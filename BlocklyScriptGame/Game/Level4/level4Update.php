<?php

$username = $_POST['username'];
$level4won = $_POST['level4won'];
$level4time = $_POST['level4time'];
$level4stars = $_POST['level4stars'];
$level4attempts = $_POST['level4attempts'];
$level4score = $_POST['level4score'];
$level4firsttimewon = $_POST['level4firsttimewon'];
$level4timesreseted = $_POST['level4timesreseted'];
$level4badge = $_POST['level4badge'];



$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level4won=$level4won, level4time=$level4time, level4stars=$level4stars, level4attempts=$level4attempts, level4score=$level4score, level4firsttimewon=$level4firsttimewon, level4timesreseted=$level4timesreseted, level4badge=$level4badge WHERE username='$username'";

mysqli_query($db, $sql);

?>