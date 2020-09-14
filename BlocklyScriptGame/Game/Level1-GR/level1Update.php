<?php

$username = $_POST['username'];
$level1won = $_POST['level1won'];
$level1start = $_POST['level1start'];
$level1moveleft = $_POST['level1moveleft'];
$level1moveright = $_POST['level1moveright'];
$level1time = $_POST['level1time'];
$level1stars = $_POST['level1stars'];
$level1attempts = $_POST['level1attempts'];
$level1score = $_POST['level1score'];
$level1firsttimewon = $_POST['level1firsttimewon'];
$level1timesreseted = $_POST['level1timesreseted'];
$level1badge = $_POST['level1badge'];

$gender = $_POST['gender'];



$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level1won=$level1won, level1start=$level1start, level1moveleft=$level1moveleft, level1moveright=$level1moveright, level1time=$level1time, level1stars=$level1stars, level1attempts=$level1attempts, level1score=$level1score, level1firsttimewon=$level1firsttimewon, level1timesreseted=$level1timesreseted, level1badge=$level1badge, gender=$gender WHERE username='$username'";

mysqli_query($db, $sql);

?>