		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		var totalStarsCollected = Number(localStorage.getItem("level1stars")) || 0;
		
		var userName = localStorage.getItem("userName") || '';
			 var level2won = Number(localStorage.getItem("level2won")) || 0;
			 var level2score; 
			 var level2start; 
			 var level2moveleft; 
			 var level2moveright;
			 var level2time; 
			 var level2firsttimewon; 
			 var level2timesreseted = Number(localStorage.getItem("level2timesreseted")) || 0;
			 var level2attempts;
			 var level2stars; 
			 
			 var attempts = "";
			 
			 var level2jump;
		
		window.addEventListener('load', function() {
			if(level2won){
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
		
		// Level 2 Phaser Scene
		class Level2 extends Phaser.Scene {
			
			constructor() {
			super('level2');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/game-assets-game-background-sidescroller.png');
		  this.load.image('ground', '../assets/platform.png');
		  this.load.image('star', '../assets/star.png');
		  this.load.image('bomb', '../assets/bomb.png');
		  this.load.image('spikes', '../assets/spikes.png');
		  this.load.spritesheet('WalkRight', '../assets/'+playerGender+'WalkRight.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('WalkLeft', '../assets/'+playerGender+'WalkLeft.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('Idle', '../assets/'+playerGender+'Idle.png', { frameWidth: 56, frameHeight: 48 });
		  
		  this.load.audio('theme', ['../assets/Grasslands Theme.mp3']);
		  this.load.audio('starsMusic', ['../assets/Money.mp3']);
		  this.load.audio('victoryMusic', ['../assets/Victory!.wav']);
		  this.load.audio('heroHurt', ['../assets/Hero_Dies.mp3']);
		}
		
		// ===============================================================
		// Create
		 create() {
			 
			 level2score = Number(localStorage.getItem("level2score")) || 0;
			  level2start = Number(localStorage.getItem("level2start")) || 0;
			  level2moveleft = Number(localStorage.getItem("level2moveleft")) || 0;
			  level2moveright = Number(localStorage.getItem("level2moveright")) || 0;
			  level2time = Number(localStorage.getItem("level2time")) || 0;
			  level2firsttimewon = Number(localStorage.getItem("level2firsttimewon")) || 0;
			  
			  level2attempts = localStorage.getItem("level2attempts") || ' ';
			 
			  level2stars = Number(localStorage.getItem("level2stars")) || 0;
			  
			  level2jump = Number(localStorage.getItem("level2jump")) || 0;
			  
			  
			 
			
			
			
			 
		  	
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


		  starsCollectedText = this.add.text(0, 0, 'Stars collected: 0', { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  totalScoreText = this.add.text(250, 0, 'Score: '+ (levelScore + totalScore), { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  gameEndedText = this.add.text(150, 150, '', { fontSize: '70px', fontFamily:'Times New Roman', align:'center', color:'rgb(204, 0, 0)' });
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
			platforms.create(200, 450, 'ground').setScale(0.70, 1).refreshBody();
			platforms.create(600, 450, 'ground').setScale(0.70, 1).refreshBody();
			
			//platforms.create(400, 300, 'ground').setScale(0.45, 3).refreshBody();
			
			platforms.create(400, 300, 'ground').setScale(0.45, 3).refreshBody();
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
			
			player = this.physics.add.sprite(400, 500, 'dude');
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
		
		createSpikes() {
			spikes = this.physics.add.group();
			this.physics.add.collider(spikes, platforms);
			this.physics.add.collider(player, spikes, this.hitSpike, null, this);
			spikes.create(250, 420, 'spikes');
			spikes.create(650, 420, 'spikes');
		}
		
		createBombs() {
			bombs = this.physics.add.group();
			this.physics.add.collider(bombs, platforms);
			this.physics.add.collider(player, bombs, this.hitBomb, null, this);
			var bomb = bombs.create(200, 16, 'bomb');
		}
		
		createStars() {
			stars = this.physics.add.group({
				key: 'star',
				repeat: 6,
				setXY: { x: 100, y: 400, stepX: 100 }
			});

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
				if(starCollected === 7) {

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
		  
		  
		  this.checkGameEndResult();
		  
		  
		  
		  
		  


		}

		 hitBomb(player, bomb) {
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
		
				
		
				
				if(starCollected === 7 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 15){
						blocklyPoints = 50;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Χρησιμοποίησες τον ελάχιστο αριθμό μπλοκ για να κερδίσεις το Επίπεδο 2. Θα ανταμειφτείς με +50 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 15){
						blocklyPoints = 30;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 2. Ωστόσο χρησιμοποίησες περισσότερα μπλοκ για να κερδίσεις το Επίπεδο 2 από ότι χρειαζόταν και για αυτόν το λόγο θα ανταμειφτείς με +30 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						blocklyPoints = 30;
					}else if(totalBlocksUsed < 15){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Ολοκλήρωσες το Επίπεδο 2 με λιγότερα μπλοκ απο οτι χρειαζόταν. α ανταμειφτείς με +100 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					
					
					
					/////////////////////////////
					
					if(level2won === 0){
						localStorage.setItem("level2firsttimewon", level2time + time);
					}
					
					level2won = 1;
					localStorage.setItem("level2won", level2won);
					localStorage.setItem("level2score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					localStorage.setItem("level2start", startBlock);
					localStorage.setItem("level2moveleft", moveLeft);
					localStorage.setItem("level2moveright", moveRight);
					localStorage.setItem("level2time", level2time + time);
					localStorage.setItem("level2timesreseted", level2timesreseted + gameTimesReseted);
					localStorage.setItem("level2attempts", level2attempts + blocks +"\n\n");
					localStorage.setItem("level2stars", starCollected);
					localStorage.setItem("level2jump", jumpBlock);
					localStorage.setItem("level2badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level2Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level2won="+level2won+"&level2start="+startBlock+"&level2moveleft="+moveLeft+"&level2moveright="+moveRight+"&level2time="+(level2time + time)+"&level2score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level2firsttimewon="+ Number(localStorage.getItem("level2firsttimewon"))+"&level2timesreseted="+(level2timesreseted + gameTimesReseted)+"&level2attempts='"+ ( level2attempts + blocks +"\n\n")+ "'&level2stars="+starCollected+"&level2jump="+jumpBlock+"&level2badge="+levelBadge);
					
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					if(!levelLost) {
						music.stop();
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value += '\nΘυμήσου να χρησιμοποιήσεις το Jump μπλοκ πριν προσπαθήσεις να χρησιμοποιήσεις το Move Left ή Right μπλοκ';
					outputArea.value += '\nΜην τοποθετείς δύο ή περισσότερα jump μπλοκ το ένα κάτω από το άλλο. Ο/Η εξερευνητής θα πηδήξει γρήγορα μόνο μια φορά  και μετά θα εκτελέσει τις υπόλοιπες εντολές που ακολουθούν.';
					outputArea.value += '\nΣυμβουλή: Προσπάθησε να αφήσεις τον/την εξερευνητής/τρια να πέσει από την πλαρφόρμα που βρίσκονται τα αστέρια και μετά χρησιμοποίησε το jump μπλοκ για να ανέβεις στην πλατφόρμα που βρίσκεται δίπλα της.';
					gameEndedText.setText('Try again.\n Collect every star.');
					
					if(moveRight < 3 || moveLeft < 3){
						outputArea.value +=  '\n Πρέπει να χρησιμοποιήσεις τουλάχιστον 3 μπλοκ Move Left και Move Right. Προσπάθησε να βάλεις περισσότερα Move (left ή right) μπλοκ';
					}else if(jumpBlock < 5){
						outputArea.value +=  '\n Πρέπει να χρησιμοποιήσεις τουλάχιστον 5 jump μπλοκ. Προσπάθησε να βάλεις περισσότερα jump blocks';
					}else{
						outputArea.value +=  '\n Χμμ από ότι φαίνεται δεν τα κατάφερες. Ξαναπροσπάθησε, βρίσκεσαι πολύ κοντά στην λύση';
					}
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					
					localStorage.setItem("level2won", level2won);
					localStorage.setItem("level2score", (totalScore + levelScore)  - losePoints());
					localStorage.setItem("level2start", startBlock);
					localStorage.setItem("level2moveleft", moveLeft);
					localStorage.setItem("level2moveright", moveRight);
					localStorage.setItem("level2time", level2time + time);
					localStorage.setItem("level2timesreseted", level2timesreseted + gameTimesReseted);
					localStorage.setItem("level2attempts", level2attempts + blocks +"\n\n");
					localStorage.setItem("level2stars", starCollected);
					localStorage.setItem("level2jump", jumpBlock);
					localStorage.setItem("level2badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level2Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level2won="+level2won+"&level2start="+startBlock+"&level2moveleft="+moveLeft+"&level2moveright="+moveRight+"&level2time="+(level2time + time)+"&level2score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level2firsttimewon="+ Number(localStorage.getItem("level2firsttimewon"))+"&level2timesreseted="+(level2timesreseted + gameTimesReseted)+"&level2attempts='"+ ( level2attempts + blocks +"\n\n")+ "'&level2stars="+starCollected+"&level2jump="+jumpBlock+"&level2badge="+levelBadge);
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 2 Phaser Scene
	function losePoints(){
		if((level2timesreseted + gameTimesReseted) * 10 < 70) {
			return ((level2timesreseted + gameTimesReseted) * 10);
		}else {
			return 70;
		}
			
	}
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level2");
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
        scene: Level2
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level1score"));
		var levelScore;
		var platforms;
		var bombs;
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
		var gameTimesReseted = 0 ;
		var timeEvent;
		var time = 0 ;
		var timeText;
		var levelBadge;
		
		var programEnded = false;
		var runOnce;
		
		var levelLost;

		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;