<?php include('server.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<title>User registration system</title>
	<link rel="stylesheet" type="text/css" href="regStyle.css">
</head>
<body>
<br>
	<br>
	<br>
	<span>BlocklyScript</span>
	<div class="header">
		<h2>Login</h2>
	</div>
	
	<form method="post" action="login.php">
		<?php include('errors.php');?>
		<div class="input-group">
			<label>Username</label>
			<input type="text" name="username">
		</div>
		<div class="input-group">
			<label>Password</label>
			<input type="password" name="password">
		</div>
		<br>
		<div class="input-group">
			<button type="submit" name="login" class="btn">Login</button>
		</div>
		<br>
		<p>You are not a member yet? <a href="register.php">Register</a></p>
	</form>
</body>
</html>