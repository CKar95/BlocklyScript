<?php

$username = $_POST['username'];
$level11won = $_POST['level11won'];
$level11time = $_POST['level11time'];
$level11stars = $_POST['level11stars'];
$level11score = $_POST['level11score'];
$level11firsttimewon = $_POST['level11firsttimewon'];
$level11timesreseted = $_POST['level11timesreseted'];
$level11badge = $_POST['level11badge'];

$level11attempts = $_POST['level11attempts'];

echo $level11attempts;

$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');

$sql = "UPDATE users SET level11won=$level11won,level11time=$level11time,level11stars=$level11stars,level11score=$level11score,level11firsttimewon=$level11firsttimewon,level11timesreseted=$level11timesreseted,level11attempts=$level11attempts,level11badge=$level11badge WHERE username='$username'";

mysqli_query($db, $sql);

if (!mysqli_query($db, $sql))
  {
  echo("Error description: " . mysqli_error($db));
  }

?>