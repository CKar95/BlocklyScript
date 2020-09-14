		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		var totalStarsCollected = Number(localStorage.getItem("level4stars")) || 0;
		var beamCounter;
		
		var userName = localStorage.getItem("userName") || '';
			 var level5won = Number(localStorage.getItem("level5won")) || 0;
			 var level5score; 
			 var level5time; 
			 var level5firsttimewon; 
			 var level5timesreseted = Number(localStorage.getItem("level5timesreseted")) || 0;
			 var level5attempts;
			 var level5stars; 
		
		
		window.addEventListener('load', function() {
			if(level5won){
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
		
		// Level 5 Phaser Scene
		class Level5 extends Phaser.Scene {
			
			constructor() {
			super('level5');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/high_mountain_nature_game_background_dribbble.png');
		  this.load.image('ground', '../assets/platform.png');
		  this.load.image('star', '../assets/star.png');
		  this.load.image('bomb', '../assets/bomb.png');
		  this.load.image('spikes', '../assets/spikes.png');
		  this.load.image('beam', '../assets/beam.png');
		  this.load.image('wall', '../assets/wall.jpg');
		  this.load.spritesheet('WalkRight', '../assets/'+playerGender+'WalkRight.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('WalkLeft', '../assets/'+playerGender+'WalkLeft.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('Idle', '../assets/'+playerGender+'Idle.png', { frameWidth: 56, frameHeight: 48 });
		  this.load.spritesheet('alienWalkLeft', '../assets/alienWalkLeft.png', { frameWidth: 50, frameHeight: 40 });
		  this.load.spritesheet('alienWalkRight', '../assets/alienWalkRight.png', { frameWidth: 50, frameHeight: 40 });
		  
		  this.load.audio('theme', ['../assets/Mushroom Theme.mp3']);
		  this.load.audio('starsMusic', ['../assets/Money.mp3']);
		  this.load.audio('victoryMusic', ['../assets/Victory!.wav']);
		  this.load.audio('heroHurt', ['../assets/Hero_Dies.mp3']);
		  this.load.audio('laserBeam', ['../assets/Laser.mp3']);
		  this.load.audio('alienHurt', ['../assets/Hero_Hurt.mp3']);
		}
		
		// ===============================================================
		// Create
		 create() {
			 
			 level5score = Number(localStorage.getItem("level5score")) || 0; 
			  level5time = Number(localStorage.getItem("level5time")) || 0;
			  level5firsttimewon = Number(localStorage.getItem("level5firsttimewon")) || 0;
			  level5attempts = localStorage.getItem("level5attempts") || ' ';	 
			  level5stars = Number(localStorage.getItem("level5stars")) || 0;
			  
			  
			 wallHits = 0;
			 wallIsBroken = true;
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
			platforms.create(660, 450, 'ground').setScale(1.1, 1).refreshBody();
			platforms.create(300 , 330, 'ground').setScale(1.7, 1).refreshBody();
			platforms.create(280 , 210, 'ground').setScale(0.2, 1).refreshBody();
			platforms.create(500 , 210, 'ground').setScale(0.7, 1).refreshBody();
			
			platforms.create(450, 500, 'wall').setScale(1, 1.3).refreshBody().setTint(0xff0000);
			
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
			enemy2 = this.physics.add.sprite(200, 275, 'alienWalkLeft');
			enemy1 = this.physics.add.sprite(300, 275, 'alienWalkLeft');
		
			
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
			enemy2.createdX = 200;
			enemy2.moveLeft = true;
			enemy2.body.allowGravity = false;
			
			enemies.add(enemy1);
			enemy1.createdX = 400;
			enemy1.moveLeft = true;
			enemy1.body.allowGravity = false;
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
				 
				 if(enemy1.moveLeft && (enemy1.x > enemy1.createdX - 100)){
					
					 enemy1.setVelocityX(-50);
					 enemy1.anims.play('alienLeft', true);
				 }else if(enemy1.moveLeft && (enemy1.x <= enemy1.createdX - 100)){
					 
					 enemy1.setVelocityX(50);
					  enemy1.anims.play('alienRight', true);
					 enemy1.moveLeft = false;
				 }else if(!enemy1.moveLeft && (enemy1.x >= enemy1.createdX + 100)){
					 enemy1.moveLeft = true;
					  
				 }
			
		}
		
		createSpikes() {
			spikes = this.physics.add.group();
			this.physics.add.collider(spikes, platforms);
			this.physics.add.collider(player, spikes, this.hitSpike, null, this);
			 spikes.create(450, 180, 'spikes');
			 spikes.create(550, 180, 'spikes');
			 

			
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
			this.physics.add.collider(laserBeams, platforms, this.hitWall, null, this);
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
				repeat: 6,
				setXY: { x: 100, y: 500, stepX: 100 }
			});
			
			//floor 1
			stars.create(500, 400, 'star');
			stars.create(600, 400, 'star');
			stars.create(700, 400, 'star');

			
			
			//floor 2
			stars.create(200, 300, 'star');
			stars.create(300, 300, 'star');
			stars.create(400, 300, 'star');
			stars.create(500, 300, 'star');
			stars.create(600, 300, 'star');
			
			//floor 3
			stars.create(300, 180, 'star');
			stars.create(400, 180, 'star');
			stars.create(500, 180, 'star');
			stars.create(600, 180, 'star');
			
			
		

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
				if(starCollected === 19) {

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
		
		hitWall(beam, wall) {
			
			var alienHurtMusic = this.sound.add('alienHurt', {rate: 0.9, volume: 0.1});
			 alienHurtMusic.play();
			beam.setVisible(false);
			beam.body.enable =false;
			
			if(wallHits < 4) {
				wallHits++;
			}else {
				wall.setVisible(false);
				wall.body.enable =false;
				wallIsBroken = false;
				}

			
			
			
			
	
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
		
				
		
				
				if(starCollected === 19 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 21){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Congratulations. You used the minimum number of blocks in order to complete Level 5. You are rewarded with +100 points, added to your current Score! Your total score is: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 21){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  'Tip: If you used two or more blocks of the same type under each other, then you should use a repeat N times block to earn more points';
						outputArea.value +=  '\n';
						outputArea.value +=  '\n Well done. You completed Level 5. However you used more blocks than Level 5 needed so you are rewarded with +40 points, added to your current Score! Your total score is: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}else if(totalBlocksUsed < 21){
						blocklyPoints = 150;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Wow you are a genius. You completed Level 5 with less blocks than needed. You are rewarded with +150 points, added to your current Score! Your total score is: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					
					/////////////////////////////
					
					if(level5won === 0){
						localStorage.setItem("level5firsttimewon", level5time + time);
					}
					
					level5won = 1;
					
					localStorage.setItem("level5won", level5won);
					localStorage.setItem("level5timesreseted", level5timesreseted + gameTimesReseted);
					localStorage.setItem("level5score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level5time", level5time + time);
					
					localStorage.setItem("level5attempts", level5attempts + blocks +"\n\n");
					localStorage.setItem("level5stars", starCollected);
					localStorage.setItem("level5badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level5Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level5won="+level5won+"&level5time="+(level5time + time)+"&level5score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level5firsttimewon="+ Number(localStorage.getItem("level5firsttimewon"))+"&level5timesreseted="+(level5timesreseted + gameTimesReseted)+"&level5attempts='"+ ( level5attempts + blocks +"\n\n")+ "'&level5stars="+starCollected+"&level5badge="+levelBadge);
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					if(!levelLost) {
						music.stop();
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value +=  '\n';
					outputArea.value +=  'Tip: The "Repeat until wall is" block will repeat all the block commands you used inside it if the condition (broken or not broken) is not true.';
					outputArea.value +=  '\n';

					gameEndedText.setText('Try again.\n Collect every star.');
					
					for( var i=0; i < blocks.length; i++) {
						if( i === 0){
							if(blocks[i].type !== "start_point") {
								outputArea.value +=  '\nStart by using the start block \n';
								break;
							}
						}else if(i === 1) {
							if(blocks[i].type !== "repeat_until") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "repeat until wall is" block with the right condition. If you don\'t use this block here you will have to use one more repeat N times block later. \n';
								break;
							}
						}else if(i === 2) {
							if(blocks[i].type !== "laser_beam") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "use laser beam" block inside you repeat while block. \n';
								break;
							}
						}else if(i === 3) {
							if(blocks[i].type !== "laser_beamdirection") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Did you give directions for the laser beam?. \n';
								break;
							}
						}else if(i === 4) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a repeat N times block here. This block should be outside of the reapeat while block \n';
								break;
							}
						}else if(i === 5) {
							if(blocks[i].type !== "move_right") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a move right block here. This block should be inside of the reapeat N times block\n';
								break;
							}
						}else if(i === 6) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a repeat N times block.\n';
								break;
							}
						}else if(i === 7) {
							if(blocks[i].type !== "move_left") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a move left block outside the repeat N times block.\n';
								break;
							}
						}else if(i === 8) {
							if(blocks[i].type !== "move_up") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a jump block here.\n';
								break;
							}
						}
						else if(i === 9) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a repeat N times block.\n';
								break;
							}
						}else if(i === 10) {
							if(blocks[i].type !== "move_right") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a move right block inside the repeat N times block.\n';
								break;
							}
						}else if(i === 11) {
							if(blocks[i].type !== "move_up") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a jump block outside the repeat block.\n';
								break;
							}
						}else if(i === 12) {
							if(blocks[i].type !== "move_left") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a move left block.\n';
								break;
							}
						}else if(i === 13) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a repeat N times block.\n';
								break;
							}
						}else if(i === 14) {
							if(blocks[i].type !== "laser_beam") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a use laser beam block inside the repeat block.\n';
								break;
							}
						}else if(i === 15) {
							if(blocks[i].type !== "laser_beamdirection") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a shoot beam direction block here.\n';
								break;
							}
						}else if(i === 16) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a repeat N times block.\n';
								break;
							}
						}else if(i === 17) {
							if(blocks[i].type !== "move_left") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a move left block inside the repeat block.\n';
								break;
							}
						}
						
						
					}
					if( (18 < blocks.length) && (blocks.length < 21)){
						outputArea.value +=  '\nYou are almost there. Think carefully about the solution.\n';
					}
					
					if(blocks.length < 21){
						outputArea.value +=  '\nIt seems like you didn t made it. Add more blocks in order to complete this level.\n';
					}
					
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					localStorage.setItem("level5won", level5won);
					localStorage.setItem("level5timesreseted", level5timesreseted + gameTimesReseted);
					localStorage.setItem("level5score", (  totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level5time", level5time + time);
					
					localStorage.setItem("level5attempts", level5attempts + blocks +"\n\n");
					localStorage.setItem("level5stars", starCollected);
					localStorage.setItem("level5badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level5Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level5won="+level5won+"&level5time="+(level5time + time)+"&level5score="+ (( totalScore + levelScore)  - losePoints())+"&level5firsttimewon="+ Number(localStorage.getItem("level5firsttimewon"))+"&level5timesreseted="+(level5timesreseted + gameTimesReseted)+"&level5attempts='"+ ( level5attempts + blocks +"\n\n")+ "'&level5stars="+starCollected+"&level5badge="+levelBadge);
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 5 Phaser Scene
	function losePoints(){
		if( (level5timesreseted + gameTimesReseted)* 10 < 190) {
			return ((level5timesreseted + gameTimesReseted) * 10);
		}else {
			return 190;
		}
			
	}
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level5");
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
		
		function checkWall() {
			var x = wallIsBroken;
			console.log("Is wall alive? "+wallIsBroken);
			console.log(x);
			return x;
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
        scene: Level5
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level4score"));
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
		/////
		var loseMusic;
		var stars;
		var particles;
		var starCollected;
		var levelWon = false;
		var levelBadge;
		
		var timeEvent;
		var time = 0 ;
		var timeText;

		var laserBeams;
		var beamLeft;
		var beamRight;
		
		var programEnded = false;
		var runOnce;
		var levelLost;

		var enemy1, enemy2;
		
		//Level 5
		var wallHits = 0;
		var wallIsBroken = true;
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;