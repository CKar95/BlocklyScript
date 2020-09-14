<?php include('../server.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Start Page</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w"
    crossorigin="anonymous">
	<link href='https://fonts.googleapis.com/css?family=Covered By Your Grace' rel='stylesheet'>
	<style>


</style>
</head>
<body>

<ul>
  <li><a href="#playTheGame">Home</a></li>
  <li><a href="#scenario">Scenario</a></li>
  <li><a href="#gameLevels">Game Levels</a></li>
  <li><a href="#highScores">High Scores</a></li>
  <li id="title"><h3>BlocklyScript</h3></li>
</ul>

<div id="playTheGame">
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<span>BlocklyScript</span>
	<p>
	<?php if(isset($_SESSION['success'])): ?>
	 <?php 
	 echo $_SESSION['success'];
	 unset($_SESSION['success']);
	 ?>
	 <?php endif ?>
	 
	 <?php if(isset($_SESSION['username'])): ?>
	 <strong><?php echo $_SESSION['username'];?></strong> !	
	 <?php endif ?>
	 <?php if(!isset($_SESSION['username'])): ?>
	 You are not logged in! 	
	 <?php endif ?>
	 <br>
	Welcome to <b>BlocklyScript</b>. <b>BlocklyScript</b> is a game that will take 
	you to the magical world of computer science and help you improve your computational thinking. In order to solve a complex problem you will have to brake it down into smaller manageable parts. Let's get started! 
		 <br>
		 	 <br>
	<?php if(isset($_SESSION['username'])): ?>
	 <a href="index.php?logout='1'" style="color: red;">Logout</a></p>	
	 <?php endif ?>	
	<?php if(!isset($_SESSION['username'])): ?>
	 <a href="../login.php" style="color: red;">Login</a></p>	
	 <?php endif ?>		 
	
	<br>
	<button class="button-success pure-button" id="startLevel1"><b><a id="startLevelRef" href="Level1/index.html">Start Game</a></b></button>
	<br>


</div>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p style="text-align:center;line-height: 1.8;"><img src="assets/IdleGirl.png" alt="Italian Trulli" width="80px" height="65px">
	<img src="assets/IdleBoy.png" alt="Italian Trulli" width="45px" height="65px"></br>
	Player Gender: <input type="radio" name="gender" value="girl" checked="checked"> Girl <input type="radio" name="gender" value="boy"> Boy</br>
	</br>
	<input type="button" onclick="saveName()" value="Save gender!" class="button-success pure-button" style="background-color: orange;"></p>
	
  </div>
  
</div>

<div id="scenario">

<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<span id="scenarioSp">Scenario</span>
	<p id="scenarioParag">Welcome to the magical wolrd of Blocklyland. Until some weeks ago, Blocklyland was a peaceful place where people lived happily without any concerns. Howerver, all changed when stars suddenly began to fall from the sky. Seeing that, Blockly citizens started to worry about what will happen if all the stars disappear from the sky. Will they live in eternal darkness? To prevent that from happening, brave adventurers appeared. Their target is to collect all the fallen stars arround Blocklyland and restore them to the sky. Your task is to guide an adventurer to explore Blocklyland and collect all the fallen stars. Are you ready for the journey?</p>
	<br>
	
</div>

<div id="gameLevels">
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<span id="gameLevelsSp">Game Levels</span>	
	<table>
  <tr >
    <th>Level</th>
    <th>Name</th>
	<th>Level</th>
    <th>Name</th>
  </tr>
  <tr>
    <td id="tdlevel1">1</td>
    <td id="tdname1"><a href="Level1/index.html" id="tdlink1">Movement</a></td>
	<td id="tdlevel7">7</td>
    <td id="tdname7"><a href="Level7/index.html" id="tdlink7">If - else</a></td> 
  </tr>
  <tr>
    <td id="tdlevel2">2</td>
    <td id="tdname2"><a href="Level2/index.html" id="tdlink2">Jump</a></td>
	<td id="tdlevel8">8</td>
    <td id="tdname8"><a href="Level8/index.html" id="tdlink8">Nested if</a></td> 
  </tr>
  <tr>
    <td id="tdlevel3">3</td>
    <td id="tdname3"><a href="Level3/index.html" id="tdlink3">Repeat 'n' times</a></td>
	<td id="tdlevel9">9</td>
    <td id="tdname9"><a href="Level9/index.html" id="tdlink9">Method</a></td> 
  </tr>
  <tr>
    <td id="tdlevel4">4</td>
    <td id="tdname4"><a href="Level4/index.html" id="tdlink4">Repeat While</a></td>
	<td id="tdlevel10">10</td>
    <td id="tdname10"><a href="Level10/index.html" id="tdlink10">Limited Blocks</a></td> 
  </tr>
  <tr>
    <td id="tdlevel5">5</td>
    <td id="tdname5"><a href="Level5/index.html" id="tdlink5">Repeat Until</a></td>
	<td id="tdlevel11">11</td>
    <td id="tdname11"><a href="Level11/index.html" id="tdlink11">Variable</a></td> 
  </tr>
  <tr>
    <td id="tdlevel6">6</td>
    <td id="tdname6"><a href="Level6/index.html" id="tdlink6">Simple If</a></td>
	<td id="tdlevel12">12</td>
    <td id="tdname12"><a href="Level12/index.html" id="tdlink12">Restore the stars</a></td> 
  </tr>
</table>
	
</div>



<div id="highScores">
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<span id="highScoresSp">Top 5 High Scores</span>	
	<table id="top5">
  <tr>
	<th>Place</th>
    <th>Name</th>
    <th >Score</th>
	<th>Time (min.)</th>
  </tr>
  
 
</table>
	
</div>


<script>
localStorage.clear();
// Get the modal
var modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

function saveName(){

	//localStorage.setItem("explorerName", document.getElementById("playerTextInput").value);
	
	var radios = document.getElementsByName('gender');

	for (var i = 0, length = radios.length; i < length; i++)
	{
	 if (radios[i].checked)
	 {
	  break;
	 }
	}

	localStorage.setItem("playerGender", radios[i].value);
	
	modal.style.display = "none";
}

</script>
	

	

<script>


	
	var data = <?php echo $_SESSION['playerData']; ?>;
	console.log(data);
	
	var userName = data[0].username;
	var gender = data[0].gender;
	
	if(gender !== '0')
	{
		localStorage.setItem("playerGender", gender);
		document.getElementById("myModal").style.zIndex = "-100";
	}
	
	localStorage.setItem("explorerName", userName);
	//level 1
			var level1won = data[0].level1won;
			var level1score = data[0].level1score;
			var level1start = data[0].level1start;
			var level1moveleft = data[0].level1moveleft;
			var level1moveright = data[0].level1moveright;
			var level1time = data[0].level1time;
			var level1firsttimewon = data[0].level1firsttimewon;
			var level1timesreseted = data[0].level1timesreseted;
			var level1attempts = data[0].level1attempts;
			var level1stars = data[0].level1stars;
			
			localStorage.setItem("userName", userName);
			localStorage.setItem("level1won", level1won);
			localStorage.setItem("level1score", level1score);
			localStorage.setItem("level1start", level1start);
			localStorage.setItem("level1moveleft", level1moveleft);
			localStorage.setItem("level1moveright", level1moveright);
			localStorage.setItem("level1time", level1time);
			localStorage.setItem("level1firsttimewon", level1firsttimewon);
			localStorage.setItem("level1timesreseted", level1timesreseted);
			localStorage.setItem("level1attempts", level1attempts);
			localStorage.setItem("level1stars", level1stars);
	
	//level 2
			var level2won = data[0].level2won;
			var level2score = data[0].level2score;
			var level2start = data[0].level2start;
			var level2moveleft = data[0].level2moveleft;
			var level2moveright = data[0].level2moveright;
			var level2time = data[0].level2time;
			var level2firsttimewon = data[0].level2firsttimewon;
			var level2timesreseted = data[0].level2timesreseted;
			var level2attempts = data[0].level2attempts;
			var level2stars = data[0].level2stars;
			var level2jump = data[0].level2jump;
			
			
			localStorage.setItem("level2won", level2won);
			localStorage.setItem("level2score", level2score);
			localStorage.setItem("level2start", level2start);
			localStorage.setItem("level2moveleft", level2moveleft);
			localStorage.setItem("level2moveright", level2moveright);
			localStorage.setItem("level2time", level2time);
			localStorage.setItem("level2firsttimewon", level2firsttimewon);
			localStorage.setItem("level2timesreseted", level2timesreseted);
			localStorage.setItem("level2attempts", level2attempts);
			localStorage.setItem("level2stars", level2stars);
			localStorage.setItem("level2jump", level2jump);
			
			
			//level 3
			var level3won = data[0].level3won;
			var level3score = data[0].level3score;
			var level3time = data[0].level3time;
			var level3firsttimewon = data[0].level3firsttimewon;
			var level3timesreseted = data[0].level3timesreseted;
			var level3attempts = data[0].level3attempts;
			var level3stars = data[0].level3stars;
			
			
			
			localStorage.setItem("level3won", level3won);
			localStorage.setItem("level3score", level3score);
			localStorage.setItem("level3time", level3time);
			localStorage.setItem("level3firsttimewon", level3firsttimewon);
			localStorage.setItem("level3timesreseted", level3timesreseted);
			localStorage.setItem("level3attempts", level3attempts);
			localStorage.setItem("level3stars", level3stars);
			
			//level 4
			var level4won = data[0].level4won;
			var level4score = data[0].level4score;
			var level4time = data[0].level4time;
			var level4firsttimewon = data[0].level4firsttimewon;
			var level4timesreseted = data[0].level4timesreseted;
			var level4attempts = data[0].level4attempts;
			var level4stars = data[0].level4stars;
			
			
			
			localStorage.setItem("level4won", level4won);
			localStorage.setItem("level4score", level4score);
			localStorage.setItem("level4time", level4time);
			localStorage.setItem("level4firsttimewon", level4firsttimewon);
			localStorage.setItem("level4timesreseted", level4timesreseted);
			localStorage.setItem("level4attempts", level4attempts);
			localStorage.setItem("level4stars", level4stars);
			
			//level 5
			var level5won = data[0].level5won;
			var level5score = data[0].level5score;
			var level5time = data[0].level5time;
			var level5firsttimewon = data[0].level5firsttimewon;
			var level5timesreseted = data[0].level5timesreseted;
			var level5attempts = data[0].level5attempts;
			var level5stars = data[0].level5stars;
			
			
			
			localStorage.setItem("level5won", level5won);
			localStorage.setItem("level5score", level5score);
			localStorage.setItem("level5time", level5time);
			localStorage.setItem("level5firsttimewon", level5firsttimewon);
			localStorage.setItem("level5timesreseted", level5timesreseted);
			localStorage.setItem("level5attempts", level5attempts);
			localStorage.setItem("level5stars", level5stars);
			
			//level 6
			var level6won = data[0].level6won;
			var level6score = data[0].level6score;
			var level6time = data[0].level6time;
			var level6firsttimewon = data[0].level6firsttimewon;
			var level6timesreseted = data[0].level6timesreseted;
			var level6attempts = data[0].level6attempts;
			var level6stars = data[0].level6stars;
			
			
			
			localStorage.setItem("level6won", level6won);
			localStorage.setItem("level6score", level6score);
			localStorage.setItem("level6time", level6time);
			localStorage.setItem("level6firsttimewon", level6firsttimewon);
			localStorage.setItem("level6timesreseted", level6timesreseted);
			localStorage.setItem("level6attempts", level6attempts);
			localStorage.setItem("level6stars", level6stars);
			
			
			//level 7
			var level7won = data[0].level7won;
			var level7score = data[0].level7score;
			var level7time = data[0].level7time;
			var level7firsttimewon = data[0].level7firsttimewon;
			var level7timesreseted = data[0].level7timesreseted;
			var level7attempts = data[0].level7attempts;
			var level7stars = data[0].level7stars;
			
			
			
			localStorage.setItem("level7won", level7won);
			localStorage.setItem("level7score", level7score);
			localStorage.setItem("level7time", level7time);
			localStorage.setItem("level7firsttimewon", level7firsttimewon);
			localStorage.setItem("level7timesreseted", level7timesreseted);
			localStorage.setItem("level7attempts", level7attempts);
			localStorage.setItem("level7stars", level7stars);
			
			
			//level 8
			var level8won = data[0].level8won;
			var level8score = data[0].level8score;
			var level8time = data[0].level8time;
			var level8firsttimewon = data[0].level8firsttimewon;
			var level8timesreseted = data[0].level8timesreseted;
			var level8attempts = data[0].level8attempts;
			var level8stars = data[0].level8stars;
			
			
			
			localStorage.setItem("level8won", level8won);
			localStorage.setItem("level8score", level8score);
			localStorage.setItem("level8time", level8time);
			localStorage.setItem("level8firsttimewon", level8firsttimewon);
			localStorage.setItem("level8timesreseted", level8timesreseted);
			localStorage.setItem("level8attempts", level8attempts);
			localStorage.setItem("level8stars", level8stars);
			
			//level 9
			var level9won = data[0].level9won;
			var level9score = data[0].level9score;
			var level9time = data[0].level9time;
			var level9firsttimewon = data[0].level9firsttimewon;
			var level9timesreseted = data[0].level9timesreseted;
			var level9attempts = data[0].level9attempts;
			var level9stars = data[0].level9stars;
			
			
			
			localStorage.setItem("level9won", level9won);
			localStorage.setItem("level9score", level9score);
			localStorage.setItem("level9time", level9time);
			localStorage.setItem("level9firsttimewon", level9firsttimewon);
			localStorage.setItem("level9timesreseted", level9timesreseted);
			localStorage.setItem("level9attempts", level9attempts);
			localStorage.setItem("level9stars", level9stars);
			
			//level 10
			var level10won = data[0].level10won;
			var level10score = data[0].level10score;
			var level10time = data[0].level10time;
			var level10firsttimewon = data[0].level10firsttimewon;
			var level10timesreseted = data[0].level10timesreseted;
			var level10attempts = data[0].level10attempts;
			var level10stars = data[0].level10stars;
			
			
			
			localStorage.setItem("level10won", level10won);
			localStorage.setItem("level10score", level10score);
			localStorage.setItem("level10time", level10time);
			localStorage.setItem("level10firsttimewon", level10firsttimewon);
			localStorage.setItem("level10timesreseted", level10timesreseted);
			localStorage.setItem("level10attempts", level10attempts);
			localStorage.setItem("level10stars", level10stars);
			
			//level 11
			var level11won = data[0].level11won;
			var level11score = data[0].level11score;
			var level11time = data[0].level11time;
			var level11firsttimewon = data[0].level11firsttimewon;
			var level11timesreseted = data[0].level11timesreseted;
			var level11attempts = data[0].level11attempts;
			var level11stars = data[0].level11stars;
			
			
			
			localStorage.setItem("level11won", level11won);
			localStorage.setItem("level11score", level11score);
			localStorage.setItem("level11time", level11time);
			localStorage.setItem("level11firsttimewon", level11firsttimewon);
			localStorage.setItem("level11timesreseted", level11timesreseted);
			localStorage.setItem("level11attempts", level11attempts);
			localStorage.setItem("level11stars", level11stars);
			
			//levels Badges
			
			var level1badge = data[0].level1badge;
			var level2badge = data[0].level2badge;
			var level3badge = data[0].level3badge;
			var level4badge = data[0].level4badge;
			var level5badge = data[0].level5badge;
			var level6badge = data[0].level6badge;
			var level7badge = data[0].level7badge;
			var level8badge = data[0].level8badge;
			var level9badge = data[0].level9badge;
			var level10badge = data[0].level10badge;
			var level11badge = data[0].level11badge;
			
			localStorage.setItem("level1badge", level1badge);
			localStorage.setItem("level2badge", level2badge);
			localStorage.setItem("level3badge", level3badge);
			localStorage.setItem("level4badge", level4badge);
			localStorage.setItem("level5badge", level5badge);
			localStorage.setItem("level6badge", level6badge);
			localStorage.setItem("level7badge", level7badge);
			localStorage.setItem("level8badge", level8badge);
			localStorage.setItem("level9badge", level9badge);
			localStorage.setItem("level10badge", level10badge);
			localStorage.setItem("level11badge", level11badge);
			
			var startLevel = "Level1";
			
			//var langSelected = "-GR";
			
			for(var m=1; m<12; m++) {
				startLevel = "Level" + m;
				
				if(Number(localStorage.getItem("level"+m+"won")) === 1){
					document.getElementById("tdlevel"+m).style.color = "green";
					document.getElementById("tdname"+m).style.color = "green";
					document.getElementById("tdlink"+m).style.color = "green";
					document.getElementById("tdlink"+m).style.cursor = "pointer";
					document.getElementById("tdlink"+m).style.opacity = "1.0";
					document.getElementById("tdlink"+m).style.pointerEvents  = "auto";
					
				}
				
				if(Number(localStorage.getItem("level"+m+"won")) === 0){
					break;
				}
			}
			
			if(Number(localStorage.getItem("level11won")) === 0) {
				document.getElementById("startLevelRef").href= startLevel + "/index.html"; 
			}else {
				document.getElementById("startLevelRef").href=  "Level12/index.html"; 
			}
			
	
	
</script>

<script>
var topScores = <?php echo $_SESSION['highScores']; ?>;
console.log(topScores);

var table = document.getElementById("top5");

for (var j=0; j < topScores.length; j++) {
	
var row = table.insertRow(j+1);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);

cell1.innerHTML = j+1;
cell2.innerHTML = topScores[j].Name;
cell3.innerHTML = topScores[j].Score;
cell4.innerHTML = (parseInt(topScores[j].Time / 60)) +':'+ (topScores[j].Time % 60);
}
</script>

</body>
</html>