<?php
	session_start();
	
	
	
	$username = "";
	$errors = array();

	$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');
	
	if(isset($_POST['register'])) {
		$username = mysqli_real_escape_string($db, $_POST['username']);
		$password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
		$password_2 = mysqli_real_escape_string($db, $_POST['password_2']);
		
		if(empty($username)){
			array_push($errors, "Username is required");
		}
		
		if(!empty($username)){
			$query = "SELECT username FROM users WHERE username='$username'";
			$result = mysqli_query($db, $query);
			if(mysqli_num_rows($result) == 1){
				array_push($errors, "Username already exists. Try a new one.");
			}
		}
		
		if(empty($password_1)){
			array_push($errors, "Password is required");
		}
		
		if($password_1 != $password_2) {
			array_push($errors, "The two password do not match");
		}
		
		if(count($errors) ==0) {
			$password = md5($password_1);
			$sql = "INSERT INTO users (username, password) 
					VALUES ('$username', '$password')";
			mysqli_query($db, $sql);	
			$_SESSION['username'] = $username;
			$_SESSION['success'] = "You are now logged in";
			header('location: Game/index.php');
			
		}
	}
	
	if(isset($_POST['login'])) {
		$username = mysqli_real_escape_string($db, $_POST['username']);
		$password = mysqli_real_escape_string($db, $_POST['password']);

		
		if(empty($username)){
			array_push($errors, "Username is required");
		}
		if(empty($password)){
			array_push($errors, "Password is required");
		}
		
		if(count($errors) == 0 ) {
			$password = md5($password);
			$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
			$result = mysqli_query($db, $query);
			if(mysqli_num_rows($result) == 1){
				while($row = mysqli_fetch_assoc($result))
				{
					$playerData[] = $row;
				}
				
				$_SESSION['username'] = $username;
				$_SESSION['success'] = "You are now logged in";
				header('location: Game/index.php');
			}else{
				array_push($errors, "Wrong username/password combination");
			}
		}
	}
	
	if(isset($_GET['logout'])) {
		session_destroy();
		unset($_SESSION['username']);
		header('location: ../login.php');
	}
	
	if(isset($_SESSION['username'])) {
	$playerData = array();
	$query = "SELECT * FROM users WHERE username='".$_SESSION['username']."'";
			$result = mysqli_query($db, $query);
				while($row = mysqli_fetch_assoc($result))
				{
					$playerData[] = $row;
				}
	$_SESSION['playerData'] = json_encode($playerData);
	}
	
	
	if(isset($_SESSION['username'])) {
	$highScores = array();
	$query = "SELECT username as Name,level11score as Score, (level1time + level2time + level3time + level4time + level5time + level6time + level7time + level8time + level9time + level10time + level11time) as Time FROM `users` WHERE 1 ORDER BY Score DESC, Time LIMIT 5";
			$result = mysqli_query($db, $query);
				while($row = mysqli_fetch_assoc($result))
				{
					$highScores[] = $row;
				}
	$_SESSION['highScores'] = json_encode($highScores);
	}
	
?>