		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		
		
			 var userName = localStorage.getItem("userName") || '';
			 var level1won = Number(localStorage.getItem("level1won")) || 0;
			 var level1score; 
			 var level1start; 
			 var level1moveleft; 
			 var level1moveright;
			 var level1time; 
			 var level1firsttimewon; 
			 var level1timesreseted = Number(localStorage.getItem("level1timesreseted")) || 0;
			 var  level1attempts;
			 var level1stars; 
			 
			 var attempts = "";

		
		window.addEventListener('load', function() {
			if(level1won){
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

		
		// Level 1 Phaser Scene
		class Level1 extends Phaser.Scene {
			
			constructor() {
			super('level1');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/hydro_background_800x600.png');
		  this.load.image('ground', '../assets/platform.png');
		  this.load.image('star', '../assets/star.png');
		  this.load.image('bomb', '../assets/bomb.png');
		  this.load.spritesheet('WalkRight', '../assets/'+playerGender+'WalkRight.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('WalkLeft', '../assets/'+playerGender+'WalkLeft.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('Idle', '../assets/'+playerGender+'Idle.png', { frameWidth: 56, frameHeight: 48 });
		  
		  this.load.audio('theme', ['../assets/Grasslands Theme.mp3']);
		  this.load.audio('starsMusic', ['../assets/Money.mp3']);
		  this.load.audio('victoryMusic', ['../assets/Victory!.wav']);
		}
		
		// ===============================================================
		// Create
		 create() {
			 
			 
			  
			  
			  level1score = Number(localStorage.getItem("level1score")) || 0;
			  level1start = Number(localStorage.getItem("level1start")) || 0;
			  level1moveleft = Number(localStorage.getItem("level1moveleft")) || 0;
			  level1moveright = Number(localStorage.getItem("level1moveright")) || 0;
			  level1time = Number(localStorage.getItem("level1time")) || 0;
			  level1firsttimewon = Number(localStorage.getItem("level1firsttimewon")) || 0;
			  
			  level1attempts = localStorage.getItem("level1attempts") || ' ';
			 
			  level1stars = Number(localStorage.getItem("level1stars")) || 0;
			 
			 runOnce = false;
			 runOnce1 = false;
			 
			timeEvent = this.time.addEvent({
				delay: 1000,
				callback: this.updateTimer,
				loop: true
			});				
			 
			 
		  

			  totalScore = 0;
		  		  
		  
		  starCollected = 0;
		  victoryMusic = this.sound.add('victoryMusic', { rate: 0.9, volume: 0.1});
		  
		  music = this.sound.add('theme', {loop: true, rate: 0.9, volume: 0.1});
		  music.play();
		  
		  this.add.image(400, 300, 'sky');
		  this.createParticles();
		  this.createPlatforms();
		  this.createPlayer();
		  this.createStars();
		  //this.createBombs();


		  starsCollectedText = this.add.text(0, 0, 'Stars collected: 0', { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  totalScoreText = this.add.text(250, 0, 'Score: '+ totalScore, { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  gameEndedText = this.add.text(150, 350, '', { fontSize: '70px', fontFamily:'Times New Roman', align:'center', color:'rgb(204, 0, 0)' });
		  timeText = this.add.text(400, 0, 'Time: ' + time, { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  
		  
		  this.physics.add.collider(player, platforms);

		  this.physics.add.collider(player, bombs, this.hitBomb, null, this);
		  
		  
		  
		   
		}
		
		createPlatforms() {
			platforms = this.physics.add.staticGroup();
			platforms.create(400, 568, 'ground').setScale(2).refreshBody();
			platforms.create(400, 300, 'ground').setScale(1.5).refreshBody();;

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
			
			player = this.physics.add.sprite(400, 200, 'dude');
			player.setCircle(14, 2, 17);
			player.setBounce(0.2);
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
		
		
		
		createBombs() {
			bombs = this.physics.add.group();
			this.physics.add.collider(bombs, platforms);
			this.physics.add.collider(player, bombs, this.hitBomb, null, this);
			var bomb = bombs.create(200, 16, 'bomb');
		}
		
		createStars() {
			stars = this.physics.add.group({
				key: 'star',
				repeat: 4,
				setXY: { x: 200, y: 0, stepX: 100 }
			});

			stars.children.iterate((child) => {

				child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
				child.setCircle(12);

			});
			
			this.physics.add.collider(stars, platforms);
			this.physics.add.overlap(player, stars, this.collectStar, null, this);
		}
		
		collectStar (player, star) {
			this.starMusic = this.sound.add('starsMusic', {volume: 0.1});
		    this.starMusic.play();
			star.disableBody(true, true);
			
			particles.emitParticleAt(star.x, star.y, 50);
			starCollected += 1;
			
			starsCollectedText.setText('Stars collected: ' + starCollected);
			
				totalScore += 10;
			    totalScoreText.setText('Score: ' + totalScore);
				
			
			
		
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
			console.log(goJump)
			player.setVelocityY(-200);
		  }
		  
		 
		  
		  
		  if(starCollected === 5 && blocklyScriptCompleted && !runOnce) {
			       
					if(level1won === 0){
						localStorage.setItem("level1firsttimewon", level1time + time);
					}
					
					level1won = 1;
					
				}
				
				if(blocklyScriptCompleted && !runOnce){
					/////////////
					localStorage.setItem("level1won", level1won);
					localStorage.setItem("level1score", totalScore + blocklyPoints);
					localStorage.setItem("level1start", startBlock);
					localStorage.setItem("level1moveleft", moveLeft);
					localStorage.setItem("level1moveright", moveRight);
					localStorage.setItem("level1time", level1time + time);
					localStorage.setItem("level1timesreseted", level1timesreseted + gameTimesReseted);
					localStorage.setItem("level1attempts", level1attempts + blocks +"\n\n");
					localStorage.setItem("level1stars", starCollected);
					localStorage.setItem("level1badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level1Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level1won="+level1won+"&level1start="+startBlock+"&level1moveleft="+moveLeft+"&level1moveright="+moveRight+"&level1time="+(level1time + time)+"&level1score="+ (totalScore + blocklyPoints)+"&level1firsttimewon="+ Number(localStorage.getItem("level1firsttimewon"))+"&level1timesreseted="+(level1timesreseted + gameTimesReseted)+"&level1attempts='"+ ( level1attempts + blocks +"\n\n")+ "'&level1stars="+starCollected +"&level1badge="+levelBadge+"&gender='"+playerGender+"'");
					
					 runOnce = true;
					 blocklyScriptCompleted = false;
					 
				}

		  


		}
		
		updateTimer() {
			time++;
			timeText.setText('Time: '+ (parseInt(time / 60)) +':'+ (time % 60));
		}

		 hitBomb(player, bomb) {
		  this.physics.pause();

		  player.setTint(0xff0000);

		  player.anims.play('turn');

		  gameOver = true;
		}
		
		  
		
	}
	// END OF: Level 1 Phaser Scene
	
	
	//Reset Game Button Action
	function resetGame() {
		    gameTimesReseted++;
			music.stop();
			levelWon = false;
			game.scene.start("level1");
			//demoWorkspace.clear();
			resetInterpreter();
            resetStepUi(false);
			goToTheRight = false;
			goToTheLeft = false;
			goJump = false;
			
			runButton.disabled = '';	
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
			  gravity: { y: 300 },
			  debug: false
			}
		},
        scene: Level1
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore;
		var platforms;
		var bombs;
		var starsCollectedText;
		var totalScoreText;
		var gameEndedText;
		var music;
		var victoryMusic;
		var stars;
		var particles;
		var starCollected;
		var levelWon = false;
		var gameTimesReseted = 0;
		var timeEvent;
		var time = 0 ;
		var timeText;
		
		var levelBadge;
		
		var runOnce, runOnce1;
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;