<?php

$username = $_POST['username'];
$level8won = $_POST['level8won'];
$level8time = $_POST['level8time'];
$level8stars = $_POST['level8stars'];
$level8attempts = $_POST['level8attempts'];
$level8score = $_POST['level8score'];
$level8firsttimewon = $_POST['level8firsttimewon'];
$level8timesreseted = $_POST['level8timesreseted'];
$level8badge = $_POST['level8badge'];




$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level8won=$level8won,level8time=$level8time,level8stars=$level8stars,level8attempts=$level8attempts,level8score=$level8score,level8firsttimewon=$level8firsttimewon,level8timesreseted=$level8timesreseted,level8badge=$level8badge WHERE username='$username'";

mysqli_query($db, $sql);

?>