<?php

$username = $_POST['username'];
$level5won = $_POST['level5won'];
$level5time = $_POST['level5time'];
$level5stars = $_POST['level5stars'];
$level5attempts = $_POST['level5attempts'];
$level5score = $_POST['level5score'];
$level5firsttimewon = $_POST['level5firsttimewon'];
$level5timesreseted = $_POST['level5timesreseted'];
$level5badge = $_POST['level5badge'];



$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level5won=$level5won, level5time=$level5time, level5stars=$level5stars, level5attempts=$level5attempts, level5score=$level5score, level5firsttimewon=$level5firsttimewon, level5timesreseted=$level5timesreseted,level5badge=$level5badge WHERE username='$username'";

mysqli_query($db, $sql);

?>