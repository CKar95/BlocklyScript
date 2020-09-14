		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		var totalStarsCollected = Number(localStorage.getItem("level2stars")) || 0;
		var beamCounter;
		
		
		var userName = localStorage.getItem("userName") || '';
			 var level3won = Number(localStorage.getItem("level3won")) || 0;
			 var level3score; 
			 var level3time; 
			 var level3firsttimewon; 
			 var level3timesreseted = Number(localStorage.getItem("level3timesreseted")) || 0;
			 var level3attempts;
			 var level3stars; 
			 
			
			 
			 
		
		window.addEventListener('load', function() {
			if(level3won){
			document.getElementById('nextLevel').disabled = false;	
			}else{
			document.getElementById('nextLevel').disabled = true;
			}
			var x = document.getElementsByClassName("spanPlayerName");
			var i;
			for (i = 0; i < x.length; i++) {
			  x[i].innerHTML= playerName;
			} 
		})
		
		// Level 3 Phaser Scene
		class Level3 extends Phaser.Scene {
			
			constructor() {
			super('level3');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/racing_road_game_background_game_assets_dribbble.png');
		  this.load.image('ground', '../assets/platform.png');
		  this.load.image('star', '../assets/star.png');
		  this.load.image('bomb', '../assets/bomb.png');
		  this.load.image('spikes', '../assets/spikes.png');
		  this.load.image('beam', '../assets/beam.png');
		  this.load.spritesheet('WalkRight', '../assets/'+playerGender+'WalkRight.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('WalkLeft', '../assets/'+playerGender+'WalkLeft.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('Idle', '../assets/'+playerGender+'Idle.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('alienWalkLeft', '../assets/alienWalkLeft.png', { frameWidth: 50, frameHeight: 40 });
		  this.load.spritesheet('alienWalkRight', '../assets/alienWalkRight.png', { frameWidth: 50, frameHeight: 40 });
		  
		  this.load.audio('theme', ['../assets/Grasslands Theme.mp3']);
		  this.load.audio('starsMusic', ['../assets/Money.mp3']);
		  this.load.audio('victoryMusic', ['../assets/Victory!.wav']);
		  this.load.audio('heroHurt', ['../assets/Hero_Dies.mp3']);
		  this.load.audio('laserBeam', ['../assets/Laser.mp3']);
		  this.load.audio('alienHurt', ['../assets/Hero_Hurt.mp3']);
		}
		
		// ===============================================================
		// Create
		 create() {
			 
			  level3score = Number(localStorage.getItem("level3score")) || 0; 
			  level3time = Number(localStorage.getItem("level3time")) || 0;
			  level3firsttimewon = Number(localStorage.getItem("level3firsttimewon")) || 0;
			  level3attempts = localStorage.getItem("level3attempts") || ' ';	 
			  level3stars = Number(localStorage.getItem("level3stars")) || 0;
			  
			  
			 
			 
			 
			 
			 
			 beamCounter = 0;
			 
		  	
			  levelScore = 0;
		  
		  runOnce = true;
		  levelLost = false;
		  starCollected = 0;
		  victoryMusic = this.sound.add('victoryMusic', { rate: 0.9, volume: 0.1});
		  loseMusic = this.sound.add('heroHurt', { rate: 0.9, volume: 0.1});
		  
		  music = this.sound.add('theme', {loop: true, rate: 0.9, volume: 0.1});
		  music.play();
		  
		  this.add.image(400, 300, 'sky');
		  this.createParticles();
		  this.createPlatforms();
		  this.createPlayer();
		  this.createStars();
		  this.createSpikes();
		  //this.createBombs();
		  this.createEnemies();
		  this.createLaserBeams();


		  starsCollectedText = this.add.text(0, 0, 'Stars collected: 0', { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  totalScoreText = this.add.text(250, 0, 'Score: '+ (levelScore + totalScore), { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  gameEndedText = this.add.text(150, 120, '', { fontSize: '70px', fontFamily:'Times New Roman', align:'center', color:'rgb(204, 0, 0)',backgroundColor:'rgb(30, 20, 100)' });
		  gameEndedText.setText('');
		  
		  this.physics.add.collider(player, platforms);

		  this.physics.add.collider(player, bombs, this.hitBomb, null, this);
		  
		  timeEvent = this.time.addEvent({
				delay: 1000,
				callback: this.updateTimer,
				loop: true
			});	
		  
		  timeText = this.add.text(400, 0, 'Time: ' + time, { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  
		   
		}
		
		updateTimer() {
			time++;
			timeText.setText('Time: '+ (parseInt(time / 60)) +':'+ (time % 60));
		}
		
		createPlatforms() {
			platforms = this.physics.add.staticGroup();
			platforms.create(400, 568, 'ground').setScale(2).refreshBody();
			platforms.create(200, 450, 'ground').setScale(1.75, 1).refreshBody();
			platforms.create(300, 330, 'ground').setScale(0.2, 1).refreshBody();
			platforms.create(500, 330, 'ground').setScale(0.6, 1).refreshBody();
			platforms.create(700, 330, 'ground').setScale(0.2, 1).refreshBody();
			
		}
		
		createParticles() {
			particles = this.add.particles('star');
			this.emitter = particles.createEmitter({
					x: 400,
					y: 300,
					speed: 200,
					lifespan: 500,
					blendMode: 'ADD',
					scale: { start: 1, end: 0},
					on: false,
				});
		}
		
		
		createPlayer() {
			
			player = this.physics.add.sprite(100, 500, 'dude');
			player.setOffset(15, 5);
			player.setSize(20, 42, false);
			player.setBounce(0);
			player.setCollideWorldBounds(true);
			this.physics.add.collider(player, platforms);

			this.anims.create({
				key: 'left',
				frames: this.anims.generateFrameNumbers('WalkLeft', { start: 0, end: 7 }),
				frameRate: 10,
				repeat: -1
			});
			

			this.anims.create({
				key: 'turn',
				frames: [ { key: 'Idle', frame: 0 } ],
				frameRate: 20
			});

			this.anims.create({
				key: 'right',
				frames: this.anims.generateFrameNumbers('WalkRight', { start: 0, end: 7 }),
				frameRate: 10,
				repeat: -1
			});
	
		}
		
		
		
		createEnemies() {
			enemy2 = this.physics.add.sprite(350, 400, 'alienWalkLeft');
		
			
			this.anims.create({
				key: 'alienLeft',
				frames: this.anims.generateFrameNumbers('alienWalkLeft', { start: 0, end: 7 }),
				frameRate: 10,
				repeat: -1
			});
			
			this.anims.create({
				key: 'alienRight',
				frames: this.anims.generateFrameNumbers('alienWalkRight', { start: 0, end: 7 }),
				frameRate: 10,
				repeat: -1
			});
		
			enemies = this.physics.add.group();
			this.physics.add.collider(enemies, platforms);
			this.physics.add.collider(player, enemies, this.hitBomb, null, this);
			enemies.add(enemy2);
			enemy2.createdX = 350;
			enemy2.moveLeft = true;
			enemy2.body.allowGravity = false;
		}
		
		moveEnemies() {
				 if(enemy2.moveLeft && (enemy2.x > enemy2.createdX - 100)){
					
					 enemy2.setVelocityX(-50);
					 enemy2.anims.play('alienLeft', true);
				 }else if(enemy2.moveLeft && (enemy2.x <= enemy2.createdX - 100)){
					 
					 enemy2.setVelocityX(50);
					  enemy2.anims.play('alienRight', true);
					 enemy2.moveLeft = false;
				 }else if(!enemy2.moveLeft && (enemy2.x >= enemy2.createdX + 100)){
					 enemy2.moveLeft = true;
					  
				 }
			
		}
		
		createSpikes() {
			spikes = this.physics.add.group();
			this.physics.add.collider(spikes, platforms);
			this.physics.add.collider(player, spikes, this.hitSpike, null, this);
			spikes.create(450, 300, 'spikes');
			spikes.create(550, 300, 'spikes');
			spikes.create(150, 420, 'spikes');
			spikes.create(120, 420, 'spikes');
			spikes.create(90, 420, 'spikes');
			spikes.create(60, 420, 'spikes');
			spikes.create(30, 420, 'spikes');
			spikes.create(650, 520, 'spikes');
			spikes.create(680, 520, 'spikes');
			spikes.create(710, 520, 'spikes');
			spikes.create(740, 520, 'spikes');
			spikes.create(770, 520, 'spikes');
			
			spikes.children.iterate((child) => {
				
				child.setOffset(0, 15);
				child.setSize(30, 16, false);
				child.setBounce(0);
			});
			
		}
		
		createBombs() {
			bombs = this.physics.add.group();
			this.physics.add.collider(bombs, platforms);
			this.physics.add.collider(player, bombs, this.hitBomb, null, this);
			var bomb = bombs.create(200, 16, 'bomb');
		}
		
		createLaserBeams() {
			laserBeams = this.physics.add.group();
			this.physics.add.collider(laserBeams, platforms);
			this.physics.add.collider(laserBeams, enemies, this.hitAlien, null, this);
		}
		
		createInstanceOFLaserBeam() {
			if(beamLeft) {
				var beamCreatedMusic = this.sound.add('laserBeam', {rate: 0.9, volume: 0.1});
				beamCreatedMusic.play();
				var lb1 = laserBeams.create( player.x, player.y, 'beam');
				lb1.body.allowGravity = false;
				lb1.setVelocityX(-100);
				beamLeft = false;
			}else if(beamRight) {
				var beamCreatedMusic = this.sound.add('laserBeam', {rate: 0.9, volume: 0.1});
				beamCreatedMusic.play();	
				var lb2 = laserBeams.create( player.x, player.y, 'beam');
				lb2.body.allowGravity = false;
				lb2.setVelocityX(100);
				beamRight = false;
				
			}
		}
		
		createStars() {
			stars = this.physics.add.group({
				key: 'star',
				repeat: 5,
				setXY: { x: 100, y: 500, stepX: 100 }
			});
			
			//floor 1
			stars.create(200, 400, 'star');

			stars.create(500, 400, 'star');
			
			//floor 2
			stars.create(300, 300, 'star');
			stars.create(400, 300, 'star');
			stars.create(500, 300, 'star');
			stars.create(600, 300, 'star');
			stars.create(700, 300, 'star');

			stars.children.iterate((child) => {

				child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
				child.setCircle(12);

			});
			this.physics.add.overlap(player, stars, this.collectStar, null, this);
			this.physics.add.collider(stars, platforms);
			
		}
		
		collectStar (player, star) {
			starCollected += 1;
			this.starMusic = this.sound.add('starsMusic', {volume: 0.1});
		    this.starMusic.play();
			star.disableBody(true, true);
			
			particles.emitParticleAt(star.x, star.y, 50);
			
			
			starsCollectedText.setText('Stars collected: ' + starCollected);
			if(!levelWon){
				levelScore += 10;
			    totalScoreText.setText('Score: ' + (totalScore + levelScore));
				if(starCollected === 13) {

					levelWon = true;
				}
			}
			
		
		//	this.scoreText.setText('Score: ' + this.score);
			
			
		}
		

		
		// ===============================================================
		// Update
		 update() {

		  if (goToTheLeft) {
			goLeft();
		  }
		  else if (goToTheRight) {
			goRight();
			
		  }
		  else {
			player.setVelocityX(0);
			player.anims.play('turn');
		  }

		  if ((goJump==true) && player.body.touching.down) {
			player.setVelocityY(-450);
		  }
		  
		  this.moveEnemies();
		  this.checkGameEndResult();
		  this.createInstanceOFLaserBeam();
		  
		  
		  
		  
		  


		}

		hitAlien(beam, alien) {
			var alienHurtMusic = this.sound.add('alienHurt', {rate: 0.9, volume: 0.1});
			 alienHurtMusic.play();
			beam.setVisible(false);
			beam.body.enable =false;
			alien.setVisible(false);
			alien.body.enable =false;
			
			
			
	
		}
		
		 hitBomb(player, bomb) {
			 levelLost = true;
			 music.stop();
			 var heroHurtMusic = this.sound.add('heroHurt', {rate: 0.9, volume: 0.1});
			 heroHurtMusic.play();
		  this.physics.pause();

		  player.setTint(0xff0000);

		  player.anims.play('turn');

		  
		}
		
		hitSpike(player, spike) {
			levelLost = true;
			music.stop();
			
		  var heroHurtMusic = this.sound.add('heroHurt', {rate: 0.9, volume: 0.1});
		  heroHurtMusic.play();
		  this.physics.pause();

		  player.setTint(0xff0000);

		  player.anims.play('turn');


		  
		}

		checkGameEndResult() {
			var moving = this.isPlayerMoving();
			if(blocklyScriptCompleted && !moving) {
		
				
		
				
				if(starCollected === 13 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 12){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Χρησιμοποίησες τον ελάχιστο αριθμό μπλοκ για να κερδίσεις το Επίπεδο 3. Θα ανταμειφτείς με +100 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 12){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						
						outputArea.value +=  'Συμβουλή: Εάν χρησιμοποίησες δύο ή περισσότερα μπλοκ του ίδιου τύπου το ένα κάτω από το άλλο, τότε θα έπρεπε να χρησιμοποιήσεις το repeat N times μπλοκ για να κερδίσεις περισσότερους πόντους';
						outputArea.value +=  '\n';
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 3. Ωστόσο χρησιμοποίησες περισσότερα μπλοκ για να κερδίσεις το Επίπεδο 3 από ότι χρειαζόταν και για αυτόν το λόγο θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}else if(totalBlocksUsed < 12){
						blocklyPoints = 150;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Ολοκλήρωσες το Επίπεδο 3 χρησιμοποιώντας λιγότερα μπλοκ από ότι χρειαζόταν. Θα ανταμειφτείς με +150 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
				
					outputArea.value += '\n<< Program completed >>';
					
					
					/////////////////////////////
					
					if(level3won === 0){
						localStorage.setItem("level3firsttimewon", level3time + time);
					}
					
					level3won = 1;
					localStorage.setItem("level3won", level3won);
					localStorage.setItem("level3score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level3time", level3time + time);
					localStorage.setItem("level3timesreseted", level3timesreseted + gameTimesReseted);
					localStorage.setItem("level3attempts", level3attempts + blocks +"\n\n");
					localStorage.setItem("level3stars", starCollected);
					localStorage.setItem("level3badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level3Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level3won="+level3won+"&level3time="+(level3time + time)+"&level3score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level3firsttimewon="+ Number(localStorage.getItem("level3firsttimewon"))+"&level3timesreseted="+(level3timesreseted + gameTimesReseted)+"&level3attempts='"+ ( level3attempts + blocks +"\n\n")+ "'&level3stars="+starCollected+"&level3badge="+levelBadge);
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					if(!levelLost) {
						music.stop();
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value +=  '\n';
					outputArea.value +=  'Συμβουλή: Εάν χρησιμοποίησες δύο ή περισσότερα μπλοκ του ίδιου τύπου το ένα κάτω από το άλλο, τότε θα πρέπει να τοποθετήσεις το συγκεκριμένο μπλοκ μία φορά μέσα σε ένα repeat N times μπλοκ.';
					outputArea.value +=  '\n';

					gameEndedText.setText('Try again.\n Collect every star.');
					
					if(repeatNTimes < 3){
						outputArea.value +=  '\n Μάλλον σύνδεσες μπλοκ ίδιου τύπου το ένα κάτω από το άλλο. Χρησιμοποίησε το συγκεκριμένο μπλοκ 1 φορά μέσα σε ένα repeat N times μπλοκ';
					}else if(useLaserBeam === 0 || shootBeamDir=== 0){
						outputArea.value +=  '\n Για να καθαρίσεις το μονοπάτι από τον εξωγήινο πρέπει να χρησιμοποιήσεις την ακτίνα φωτός και να στοχεύσεις προς την σωστή κατεύθυνση';
					}else if(jumpBlock < 3 ){
						outputArea.value +=  '\n Πρέπει να χρησιμοποίησες το jump μπλοκ τουλάχιστον τρεις φορές για να κερδίσεις το Επίπεδο.';
					}else{
						outputArea.value +=  '\n Χμμ φαίνεται ότι δεν τα κατάφερες. Προσπάθησε ξανά, βρίσκεσαι κοντά στην λύση.';
					}
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
				
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					localStorage.setItem("level3won", level3won);
					localStorage.setItem("level3score", (totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level3time", level3time + time);
					localStorage.setItem("level3timesreseted", level3timesreseted + gameTimesReseted);
					localStorage.setItem("level3attempts", level3attempts + blocks +"\n\n");
					localStorage.setItem("level3stars", starCollected);
					localStorage.setItem("level3badge", levelBadge);
					
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level3Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level3won="+level3won+"&level3time="+(level3time + time)+"&level3score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level3firsttimewon="+ Number(localStorage.getItem("level3firsttimewon"))+"&level3timesreseted="+(level3timesreseted + gameTimesReseted)+"&level3attempts='"+ ( level3attempts + blocks +"\n\n")+ "'&level3stars="+starCollected+"&level3badge="+levelBadge);
					
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 2 Phaser Scene
	function losePoints(){
		if((level3timesreseted + gameTimesReseted) * 10 < 130) {
			return ((level3timesreseted + gameTimesReseted) * 10);
		}else {
			return 130;
		}
			
	}
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level3");
		//	demoWorkspace.clear();
			resetInterpreter();
            resetStepUi(false);
			goToTheRight = false;
			goToTheLeft = false;
			goJump = false;
			gameEndedText.setText('');
			runButton.disabled = '';
			programEnded = false;
		}
		
		
		var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
		scale: {
		parent: document.getElementById("phaserDivCanvas"),
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics: {
			default: 'arcade',
			arcade: {
			  gravity: { y: 700 },
			  debug: false
			}
		},
        scene: Level3
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level2score"));
		var levelScore;
		var platforms;
		var bombs;
		var enemies;
		var spikes;
		var starsCollectedText;
		var totalScoreText;
		var gameEndedText;
		var music;
		var victoryMusic;
		var loseMusic;
		var stars;
		var particles;
		var starCollected;
		var levelWon = false;
		var gameTimesReseted = 0;
		var timeEvent;
		var time = 0 ;
		var timeText;
		var levelBadge;
		
		var laserBeams;
		var beamLeft;
		var beamRight;
		
		var programEnded = false;
		var runOnce;
		
		var levelLost;

		var enemy1, enemy2;
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;