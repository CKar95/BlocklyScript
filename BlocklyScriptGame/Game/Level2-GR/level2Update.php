<?php

$username = $_POST['username'];
$level2won = $_POST['level2won'];
$level2start = $_POST['level2start'];
$level2moveleft = $_POST['level2moveleft'];
$level2moveright = $_POST['level2moveright'];
$level2time = $_POST['level2time'];
$level2stars = $_POST['level2stars'];
$level2attempts = $_POST['level2attempts'];
$level2score = $_POST['level2score'];
$level2firsttimewon = $_POST['level2firsttimewon'];
$level2timesreseted = $_POST['level2timesreseted'];
$level2jump = $_POST['level2jump'];
$level2badge = $_POST['level2badge'];



$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level2won=$level2won, level2start=$level2start, level2moveleft=$level2moveleft, level2moveright=$level2moveright, level2time=$level2time, level2stars=$level2stars, level2attempts=$level2attempts, level2score=$level2score, level2firsttimewon=$level2firsttimewon, level2timesreseted=$level2timesreseted, level2jump=$level2jump, level2badge=$level2badge WHERE username='$username'";

mysqli_query($db, $sql);

?>