		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		//CHANGE THIS
		var totalStarsCollected = Number(localStorage.getItem("level7stars")) || 0;
		var beamCounter;
		
		var userName = localStorage.getItem("userName") || '';
			 var level8won = Number(localStorage.getItem("level8won")) || 0;
			 var level8score; 
			 var level8time; 
			 var level8firsttimewon; 
			 var level8timesreseted = Number(localStorage.getItem("level8timesreseted")) || 0;
			 var level8attempts;
			 var level8stars; 
		
		window.addEventListener('load', function() {
			if(level8won){
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
		
		// Level 8 Phaser Scene
		class Level8 extends Phaser.Scene {
			
			constructor() {
			super('level8');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/BG1.png');
		  this.load.image('ground', '../assets/platform.png');
		  this.load.image('star', '../assets/star.png');
		  this.load.image('bomb', '../assets/bomb.png');
		  this.load.image('spikes', '../assets/spikes.png');
		  this.load.image('beam', '../assets/beam.png');
		  this.load.image('wall', '../assets/wall.jpg');
		  this.load.image('balloon', '../assets/balloon.png');
		  
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
			 
			 level8score = Number(localStorage.getItem("level8score")) || 0; 
			  level8time = Number(localStorage.getItem("level8time")) || 0;
			  level8firsttimewon = Number(localStorage.getItem("level8firsttimewon")) || 0;
			  level8attempts = localStorage.getItem("level8attempts") || ' ';	 
			  level8stars = Number(localStorage.getItem("level8stars")) || 0;
			  
			  
			 loseMusicPlayOnce = false;
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
		  
		  


		  starsCollectedText = this.add.text(0, 0, 'Stars-Balloons collected: 0', { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  totalScoreText = this.add.text(400, 0, 'Score: '+ (levelScore + totalScore), { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  gameEndedText = this.add.text(150, 120, '', { fontSize: '70px', fontFamily:'Times New Roman', align:'center', color:'rgb(204, 0, 0)',backgroundColor:'rgb(30, 20, 100)' });
		  gameEndedText.setText('');
		  
		  this.physics.add.collider(player, platforms);

		  this.physics.add.collider(player, bombs, this.hitBomb, null, this);
		  
		  timeEvent = this.time.addEvent({
				delay: 1000,
				callback: this.updateTimer,
				loop: true
			});	
		  
		  timeText = this.add.text(620, 0, 'Time: ' + time, { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  
		   
		}
		
		updateTimer() {
			time++;
			timeText.setText('Time: '+ (parseInt(time / 60)) +':'+ (time % 60));
		}
		
		createPlatforms() {
			platforms = this.physics.add.staticGroup();
			platforms.create(400, 568, 'ground').setScale(2).refreshBody();
			platforms.create(700, 450, 'ground').setScale(0.3, 1).refreshBody();
			platforms.create(300, 350, 'ground').setScale(1.8, 1).refreshBody();
		



			
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
			enemy2 = this.physics.add.sprite(300, 300, 'alienWalkLeft');
			//enemy1 = this.physics.add.sprite(300, 275, 'alienWalkLeft');
		
			
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
			enemy2.createdX = 300;
			enemy2.moveLeft = true;
			enemy2.body.allowGravity = false;
			
			// enemies.add(enemy1);
			// enemy1.createdX = 400;
			// enemy1.moveLeft = true;
			// enemy1.body.allowGravity = false;
		}
		
		moveEnemies() {
				 if(enemy2.moveLeft && (enemy2.x > enemy2.createdX - 200)){
					
					 enemy2.setVelocityX(-50);
					 enemy2.anims.play('alienLeft', true);
				 }else if(enemy2.moveLeft && (enemy2.x <= enemy2.createdX - 200)){
					 
					 enemy2.setVelocityX(50);
					  enemy2.anims.play('alienRight', true);
					 enemy2.moveLeft = false;
				 }else if(!enemy2.moveLeft && (enemy2.x >= enemy2.createdX + 200)){
					 enemy2.moveLeft = true;
					  
				 }
				 
				 // if(enemy1.moveLeft && (enemy1.x > enemy1.createdX - 100)){
					
					 // enemy1.setVelocityX(-50);
					 // enemy1.anims.play('alienLeft', true);
				 // }else if(enemy1.moveLeft && (enemy1.x <= enemy1.createdX - 100)){
					 
					 // enemy1.setVelocityX(50);
					  // enemy1.anims.play('alienRight', true);
					 // enemy1.moveLeft = false;
				 // }else if(!enemy1.moveLeft && (enemy1.x >= enemy1.createdX + 100)){
					 // enemy1.moveLeft = true;
					  
				 // }
			
		}
		
		moveBalloons(balloon) {
			
			 if(balloon.moveDown && (balloon.y > balloon.createdY - 10)){
					
					 balloon.setVelocityY(-10);
					
				 }else if(balloon.moveDown && (balloon.y <= balloon.createdY - 10)){
					 
					 balloon.setVelocityY(10);
					  
					 balloon.moveDown = false;
				 }else if(!balloon.moveDown && (balloon.y >= balloon.createdY + 10)){
					 balloon.moveDown = true;
					  
				 }
				 
				 
			
		}
		
		createSpikes() {
			spikes = this.physics.add.group();
			this.physics.add.collider(spikes, platforms);
			this.physics.add.collider(player, spikes, this.hitSpike, null, this);
			 spikes.create(150, 520, 'spikes');
			 spikes.create(250, 520, 'spikes');
			 spikes.create(350, 520, 'spikes');
			 spikes.create(450, 520, 'spikes');
			 spikes.create(550, 520, 'spikes');
			 spikes.create(650, 520, 'spikes');
			 

			
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
			stars = this.physics.add.group();
			
			//floor 0
			
			balloon1 = stars.create(200, 400, 'balloon');
			balloon1.body.allowGravity = false;
			balloon1.createdY = 400;
			balloon1.moveDown = true;
			balloon1.color = "red";
			balloon1.setTint(0xFF0000);
			balloon1.type = 'balloon';
			
			balloon2 = stars.create(500, 400, 'balloon');
			balloon2.body.allowGravity = false;
			balloon2.createdY = 400;
			balloon2.moveDown = true;
			balloon2.color = "red";
			balloon2.setTint(0xFF0000);
			balloon2.type = 'balloon';
			
			balloon3 = stars.create(600, 400, 'balloon');
			balloon3.body.allowGravity = false;
			balloon3.createdY = 400;
			balloon3.moveDown = true;
			balloon3.color = "green";
			balloon3.setTint(0x008000);
			balloon3.type = 'balloon';
			
			var redStar1 = stars.create(400, 500, 'star');
			redStar1.color = "red";
			redStar1.setTint(0xFF0000);
			var redStar2 = stars.create(500, 500, 'star');
			redStar2.color = "red";
			redStar2.setTint(0xFF0000);
			redStar2.hasBalloon = true;
			var redStar3 = stars.create(200, 500, 'star');
			redStar3.color = "red";
			redStar3.setTint(0xFF0000);
			redStar3.hasBalloon = true;
			
			
			var greenStar1 = stars.create(300, 500, 'star');
			greenStar1.color = "green";
			greenStar1.setTint(0x008000);
			var greenStar2 = stars.create(600, 500, 'star');
			greenStar2.color = "green";
			greenStar2.setTint(0x008000);
			greenStar2.hasBalloon = true;
			
			// var blueStar1 = stars.create(700, 500, 'star');
			// blueStar1.color = "blue";
			// blueStar1.setTint(0x0000FF);
			
			
			stars.create(700, 350, 'star');
			
			
			stars.create(600, 300, 'star');
			stars.create(100, 300, 'star');
			stars.create(300, 300, 'star');
			
			
			var blueStar1 = stars.create(200, 300, 'star');
			blueStar1.color = "blue";
			blueStar1.setTint(0x0000FF);
			var blueStar2 = stars.create(400, 300, 'star');
			blueStar2.color = "blue";
			blueStar2.setTint(0x0000FF);
			var blueStar3 = stars.create(500, 300, 'star');
			blueStar3.color = "blue";
			blueStar3.setTint(0x0000FF);
			

			stars.children.iterate((child) => {

				child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
				child.setCircle(12);
				if (child.color !=='red' && child.color !=='green' && child.color !=='blue'){
					child.color = 'none';
				}

			});
			this.physics.add.overlap(player, stars, this.collectStar, null, this);
			
			this.physics.add.collider(stars, platforms);
			
		}
		
		collectStar (player, star) {
			this.starMusic = this.sound.add('starsMusic', {volume: 0.1});
			
			if(star.color === 'red'){
				starColorOverlap = 'red';
			}else if(star.color === 'green'){
				starColorOverlap = 'green';
			}else if(star.color === 'blue'){
				starColorOverlap = 'blue';
			}else if (star.color === 'none') {
				starColorOverlap = 'none';
			}
			
			if(star.hasBalloon) {
				starHasBalloon = true;
			}else {
				starHasBalloon = false;
			}
			
			
			if(star.type === 'balloon') {
				if(star.color === 'red' && collectColorfulBalloon === 'red'){
					starCollected += 1;
				levelScore += 10;
				this.starMusic.play();
				star.disableBody(true, true);
				particles.emitParticleAt(star.x, star.y, 50);
				}else if(star.color === 'green' && collectColorfulBalloon === 'green'){
					starCollected += 1;
				levelScore += 10;
				this.starMusic.play();
				star.disableBody(true, true);
				particles.emitParticleAt(star.x, star.y, 50);
				}else if(star.color === 'blue' && collectColorfulBalloon === 'blue'){
					starCollected += 1;
				levelScore += 10;
				this.starMusic.play();
				star.disableBody(true, true);
				particles.emitParticleAt(star.x, star.y, 50);
				}
				
			}else if(star.color === 'red' && collectColorfulStar === 'red')
			{
				starCollected += 1;
				levelScore += 10;
				this.starMusic.play();
				star.disableBody(true, true);
				particles.emitParticleAt(star.x, star.y, 50);
			}else if(star.color === 'green' && collectColorfulStar === 'green')
			{
				starCollected += 1;
				levelScore += 10;
				this.starMusic.play();
				star.disableBody(true, true);
				particles.emitParticleAt(star.x, star.y, 50);
			}else if(star.color === 'blue' && collectColorfulStar === 'blue')
			{
				starCollected += 1;
				levelScore += 10;
				this.starMusic.play();
				star.disableBody(true, true);
				particles.emitParticleAt(star.x, star.y, 50);
			}else if(star.color === 'none'){
				levelScore += 10;
				starCollected += 1;
				this.starMusic.play();
				star.disableBody(true, true);
				particles.emitParticleAt(star.x, star.y, 50);
			}			
			
			starsCollectedText.setText('Stars-Balloons collected: ' + starCollected);
			if(!levelWon){
				
			    totalScoreText.setText('Score: ' + (totalScore + levelScore));
				if(starCollected === 15) {

					levelWon = true;
				}
			}
			
		
		//	this.scoreText.setText('Score: ' + this.score);
			
			
		}
		
		
		

		
		// ===============================================================
		// Update
		 update() {
			 
			 if(!this.physics.world.overlap(player, stars)) {
			  starColorOverlap = 'none';
			  collectColorfulStar = 'none';
			  starHasBalloon = false;
		  }
	

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
			player.setVelocityY(-400);
		  }
		  
		  this.moveEnemies();
		  this.checkGameEndResult();
		  this.createInstanceOFLaserBeam();
		  
		  this.moveBalloons(balloon1);
		  this.moveBalloons(balloon2);
		  this.moveBalloons(balloon3);
		  
		  
		 
		  
		  
		  
		  


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
			
			if(wallHits < 7) {
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
			 loseMusicPlayOnce = true;
		  this.physics.pause();

		  player.setTint(0xff0000);

		  player.anims.play('turn');

		  
		}
		
		hitSpike(player, spike) {
			levelLost = true;
			music.stop();
			
		  var heroHurtMusic = this.sound.add('heroHurt', {rate: 0.9, volume: 0.1});
		  heroHurtMusic.play();
		  loseMusicPlayOnce = true;
		  this.physics.pause();

		  player.setTint(0xff0000);

		  player.anims.play('turn');


		  
		}

		checkGameEndResult() {
			var moving = this.isPlayerMoving();
			if(blocklyScriptCompleted && !moving) {
		
				
		
				
				if(starCollected === 15 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 24){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Congratulations. You used the minimum number of blocks in order to complete Level 8. You are rewarded with +100 points, added to your current Score! Your total score is: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 24){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  'Tip: If you used two or more blocks of the same type under each other, then you should use a repeat N times block to earn more points';
						outputArea.value +=  '\n';
						outputArea.value +=  '\n Well done. You completed Level 8. However you used more blocks than Level 8 needed so you are rewarded with +40 points, added to your current Score! Your total score is: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}else if(totalBlocksUsed < 24){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  '\n Well done. You completed Level 8, but you probably didn\'t use the "if"(condition) block the right way. You should try to use them in order to get more points. You are rewarded with +40, added to your current Score."' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					
					/////////////////////////////
					
					if(level8won === 0){
						localStorage.setItem("level8firsttimewon", level8time + time);
					}
					
					level8won = 1;
					
					localStorage.setItem("level8won", level8won);
					localStorage.setItem("level8timesreseted", level8timesreseted + gameTimesReseted);
					localStorage.setItem("level8score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level8time", level8time + time);
					
					localStorage.setItem("level8attempts", level8attempts + blocks +"\n\n");
					localStorage.setItem("level8stars", starCollected);
					localStorage.setItem("level8badge", levelBadge);
					
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level8Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level8won="+level8won+"&level8time="+(level8time + time)+"&level8score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level8firsttimewon="+ Number(localStorage.getItem("level8firsttimewon"))+"&level8timesreseted="+(level8timesreseted + gameTimesReseted)+"&level8attempts='"+ ( level8attempts + blocks +"\n\n")+ "'&level8stars="+starCollected+"&level8badge="+levelBadge);
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					music.stop();
					if(!loseMusicPlayOnce){
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value +=  '\n';
					outputArea.value +=  'Tip:  Check the image at the instructions which explains how nested if works. Inside your nested if block you should only use the jump and collect option balloon block. After that, use the collect option star block outside of your Nested if block and inside your first If block';
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					outputArea.value +=  'Remember: The adventurer must step on the colorful star in order to collect it with the collect "option" star block';
					outputArea.value +=  '\n';

					gameEndedText.setText('Try again.\n Collect every star.');
					
					for( var i=0; i < blocks.length; i++) {
						if( i === 0){
							if(blocks[i].type !== "start_point") {
								outputArea.value +=  '\nStart by using the start block \n';
								break;
							}
						}else if(i === 1) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "repeat N times" block. \n';
								break;
							}
						}else if(i === 2) {
							if(blocks[i].type !== "move_up") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "jump" block inside your repeat block.\n';
								break;
							}
						}else if(i === 3) {
							if(blocks[i].type !== "move_right") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "move right" block here. \n';
								break;
							}
						}else if(i === 4) {
							if(blocks[i].type !== "controls_if") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "if" block \n';
								break;
							}
						}else if(i === 5) {
							if(blocks[i].type !== "star_color") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "star has option color" block next to the if block.\n';
								break;
							}
						}else if(i === 6) {
							if(blocks[i].type !== "controls_if") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "if" block. This "if" block should be inside (or nested) a previous "if" block where you checked the color of the star.\n';
								break;
							}
						}else if(i === 7) {
							if(blocks[i].type !== "star_hasballon") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "star has balloon on top" block next to the nested if block.\n';
								break;
							}
						}else if(i === 8) {
							if(blocks[i].type !== "collect_balloon") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "jump and collect options balloon" block inside your nested "if" block.\n';
								break;
							}
						}
						else if(i === 9) {
							if(blocks[i].type !== "collect_star") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "collect option star" block outside of your nested "if" block.\n';
								break;
							}
						}else if(i === 10) {
							if(blocks[i].type !== "star_color") {
								outputArea.value +=  '\nBlock '+(i + 1)+': You should expand your first simple "if" block and make it a "if-else" block.Try to use a "star has option color" block next to the "else if".\n';
								break;
							}
						}else if(i === 11) {
							if(blocks[i].type !== "controls_if") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "if" block. This "if" block should be inside (or nested) a previous "if" block where you checked the color of the star.\n';
								break;
							}
						}else if(i === 12) {
							if(blocks[i].type !== "star_hasballon") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "star has balloon on top" block next to the nested if block.\n';
								break;
							}
						}else if(i === 13) {
							if(blocks[i].type !== "collect_balloon") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "jump and collect options balloon" block inside your nested "if" block.\n';
								break;
							}
						}
						else if(i === 14) {
							if(blocks[i].type !== "collect_star") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Try to use a "collect option star" block outside of your nested "if" block.\n';
								break;
							}
						}
						
						
					}
					
					if( (15 < blocks.length) && (blocks.length < 24)){
						outputArea.value +=  '\nYou are almost there. Think carefully about the solution.\n';
					}
					
					if(blocks.length < 24){
						outputArea.value +=  '\nIt seems like you didn t made it. Add more blocks in order to complete this level.\n';
					}
					
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					localStorage.setItem("level8won", level8won);
					localStorage.setItem("level8timesreseted", level8timesreseted + gameTimesReseted);
					localStorage.setItem("level8score", ( totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level8time", level8time + time);
					
					localStorage.setItem("level8attempts", level8attempts + blocks +"\n\n");
					localStorage.setItem("level8stars", starCollected);
					localStorage.setItem("level8badge", levelBadge);
					
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level8Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level8won="+level8won+"&level8time="+(level8time + time)+"&level8score="+ (( totalScore + levelScore)  - losePoints())+"&level8firsttimewon="+ Number(localStorage.getItem("level8firsttimewon"))+"&level8timesreseted="+(level8timesreseted + gameTimesReseted)+"&level8attempts='"+ ( level8attempts + blocks +"\n\n")+ "'&level8stars="+starCollected+"&level8badge="+levelBadge);
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 8 Phaser Scene
	function losePoints(){
		if((level8timesreseted + gameTimesReseted) * 10 < 150) {
			return ((level8timesreseted + gameTimesReseted) * 10);
		}else {
			return 150;
		}
			
	}
	
	
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level8");
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
        scene: Level8
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level7score"));
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
		
		var loseMusicPlayOnce;
		
		
		var wallHits = 0;
		var wallIsBroken = true;
		
		var collectColorfulStar;
		var starColorOverlap = 'none';
		var starHasBalloon;
		
		var collectColorfulBalloon;
		
		var balloon1, balloon2, balloon3, balloon4;
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;