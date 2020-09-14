<?php

$username = $_POST['username'];
$level3won = $_POST['level3won'];
$level3time = $_POST['level3time'];
$level3stars = $_POST['level3stars'];
$level3attempts = $_POST['level3attempts'];
$level3score = $_POST['level3score'];
$level3firsttimewon = $_POST['level3firsttimewon'];
$level3timesreseted = $_POST['level3timesreseted'];
$level3badge = $_POST['level3badge'];




$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level3won=$level3won, level3time=$level3time, level3stars=$level3stars, level3attempts=$level3attempts, level3score=$level3score, level3firsttimewon=$level3firsttimewon, level3timesreseted=$level3timesreseted, level3badge=$level3badge WHERE username='$username'";

mysqli_query($db, $sql);

?>