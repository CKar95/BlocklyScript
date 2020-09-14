		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		//CHANGE THIS
		var totalStarsCollected = Number(localStorage.getItem("level8stars")) || 0;
		var beamCounter;
		
		var userName = localStorage.getItem("userName") || '';
			 var level9won = Number(localStorage.getItem("level9won")) || 0;
			 var level9score; 
			 var level9time; 
			 var level9firsttimewon; 
			 var level9timesreseted = Number(localStorage.getItem("level9timesreseted")) || 0;
			 var level9attempts;
			 var level9stars; 
		
		
		window.addEventListener('load', function() {
			if(level9won){
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
		
		// Level 9 Phaser Scene
		class Level9 extends Phaser.Scene {
			
			constructor() {
			super('level9');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/hydro_background_800x600.png');
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
		  
		  this.load.audio('theme', ['../assets/Desert Theme.mp3']);
		  this.load.audio('starsMusic', ['../assets/Money.mp3']);
		  this.load.audio('victoryMusic', ['../assets/Victory!.wav']);
		  this.load.audio('heroHurt', ['../assets/Hero_Dies.mp3']);
		  this.load.audio('laserBeam', ['../assets/Laser.mp3']);
		  this.load.audio('alienHurt', ['../assets/Hero_Hurt.mp3']);
		}
		
		// ===============================================================
		// Create
		 create() {
			 
			 level9score = Number(localStorage.getItem("level9score")) || 0; 
			  level9time = Number(localStorage.getItem("level9time")) || 0;
			  level9firsttimewon = Number(localStorage.getItem("level9firsttimewon")) || 0;
			  level9attempts = localStorage.getItem("level9attempts") || ' ';	 
			  level9stars = Number(localStorage.getItem("level9stars")) || 0;
			  
			  
			 loseMusicPlayOnce = false;
			 wallHits = 0;
			 wallIsBroken = true;
			 beamCounter = 0;
			 
		  	
			  levelScore = 0;
		  	
		  runOnce = true;
		  starCollected = 0;
		  victoryMusic = this.sound.add('victoryMusic', { rate: 0.9, volume: 0.1});
		  loseMusic = this.sound.add('heroHurt', { rate: 0.9, volume: 0.1});
		  
		  music = this.sound.add('theme', {loop: true, rate: 1.0, volume: 0.1});
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
			
			platforms.create(70, 450, 'ground').setScale(0.5, 1).refreshBody();
			platforms.create(160, 500, 'wall').setScale(1, 1.4).refreshBody().setTint(0xFF0000);



			
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
			enemy2 = this.physics.add.sprite(400, 500, 'alienWalkLeft');
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
			enemy2.createdX = 400;
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
			 spikes.create(150, 320, 'spikes');
			 spikes.create(250, 320, 'spikes');
			 spikes.create(350, 320, 'spikes');
			 spikes.create(450, 320, 'spikes');
			 spikes.create(550, 320, 'spikes');
			
			 

			
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
			
			balloon4 = stars.create(400, 400, 'balloon');
			balloon4.body.allowGravity = false;
			balloon4.createdY = 400;
			balloon4.moveDown = true;
			balloon4.color = "blue";
			balloon4.setTint(0x0000FF);
			balloon4.type = 'balloon';
			
			/////////////////////////////////////
			balloon5 = stars.create(100, 200, 'balloon');
			balloon5.body.allowGravity = false;
			balloon5.createdY = 200;
			balloon5.moveDown = true;
			balloon5.color = "red";
			balloon5.setTint(0xFF0000);
			balloon5.type = 'balloon';
			
			balloon6 = stars.create(300, 200, 'balloon');
			balloon6.body.allowGravity = false;
			balloon6.createdY = 200;
			balloon6.moveDown = true;
			balloon6.color = "blue";
			balloon6.setTint(0x0000FF);
			balloon6.type = 'balloon';
			
			balloon7 = stars.create(400, 200, 'balloon');
			balloon7.body.allowGravity = false;
			balloon7.createdY = 200;
			balloon7.moveDown = true;
			balloon7.color = "green";
			balloon7.setTint(0x008000);
			balloon7.type = 'balloon';
			
			balloon8 = stars.create(600, 200, 'balloon');
			balloon8.body.allowGravity = false;
			balloon8.createdY = 200;
			balloon8.moveDown = true;
			balloon8.color = "blue";
			balloon8.setTint(0x0000FF);
			balloon8.type = 'balloon';
			/////////////////////////////////////
			
			
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
			
			var blueStar1 = stars.create(400, 500, 'star');
			blueStar1.color = "blue";
			blueStar1.setTint(0x0000FF);
			blueStar1.hasBalloon = true;
			
			// var blueStar1 = stars.create(700, 500, 'star');
			// blueStar1.color = "blue";
			// blueStar1.setTint(0x0000FF);
			
			
			stars.create(700, 350, 'star');
			
			
			
			var redStar1 = stars.create(100, 300, 'star');
			redStar1.color = "red";
			redStar1.setTint(0xFF0000);
			redStar1.hasBalloon = true;
			
			var greenStar3 = stars.create(500, 300, 'star');
			greenStar3.color = "green";
			greenStar3.setTint(0x008000);
			var greenStar4 = stars.create(400, 300, 'star');
			greenStar4.color = "green";
			greenStar4.setTint(0x008000);
			greenStar4.hasBalloon = true;
			
			
			var blueStar4 = stars.create(200, 300, 'star');
			blueStar4.color = "blue";
			blueStar4.setTint(0x0000FF);
			var blueStar2 = stars.create(300, 300, 'star');
			blueStar2.color = "blue";
			blueStar2.setTint(0x0000FF);
			blueStar2.hasBalloon = true;
			var blueStar3 = stars.create(600, 300, 'star');
			blueStar3.color = "blue";
			blueStar3.setTint(0x0000FF);
			blueStar3.hasBalloon = true;
			

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
				if(starCollected === 20) {

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
		  this.moveBalloons(balloon4);
		  this.moveBalloons(balloon5);
		  this.moveBalloons(balloon6);
		  this.moveBalloons(balloon7);
		  this.moveBalloons(balloon8);
		  
		  
		 
		  
		  
		  
		  


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
			 music.stop();
			 var heroHurtMusic = this.sound.add('heroHurt', {rate: 0.9, volume: 0.1});
			 heroHurtMusic.play();
			 loseMusicPlayOnce = true;
		  this.physics.pause();

		  player.setTint(0xff0000);

		  player.anims.play('turn');

		  
		}
		
		hitSpike(player, spike) {
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
		
				
		
				
				if(starCollected === 20 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 31){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Χρησιμοποίησες τον ελάχιστο αριθμό μπλοκ για να κερδίσεις το Επίπεδο 9. Θα ανταμειφτείς με +100 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 31){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  'Συμβουλή: Εάν χρησιμοποίησες δύο ή περισσότερα μπλοκ του ίδιου τύπου το ένα κάτω από το άλλο, τότε θα έπρεπε να χρησιμοποιήσεις το repeat N times μπλοκ για να κερδίσεις περισσότερους πόντους';
						outputArea.value +=  '\n';
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 9. Ωστόσο χρησιμοποίησες περισσότερα μπλοκ για να κερδίσεις το Επίπεδο 9 από ότι χρειαζόταν και για αυτόν το λόγο θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}else if(totalBlocksUsed < 31){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 9 αλλά μάλλον δεν χρησιμοποίησες το "if"(συνθήκη) μπλοκ. Θα πρέπει να χρησιμοποίησείς το συγκεκριμένο μπλοκ για να κερδίσεις περισσότερους πόντους. Θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					
					/////////////////////////////
					
					if(level9won === 0){
						localStorage.setItem("level9firsttimewon", level9time + time);
					}
					
					level9won = 1;
					
					localStorage.setItem("level9won", level9won);
					localStorage.setItem("level9timesreseted", level9timesreseted + gameTimesReseted);
					localStorage.setItem("level9score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level9time", level9time + time);
					
					localStorage.setItem("level9attempts", level9attempts + blocks +"\n\n");
					localStorage.setItem("level9stars", starCollected);
					localStorage.setItem("level9badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level9Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level9won="+level9won+"&level9time="+(level9time + time)+"&level9score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level9firsttimewon="+ Number(localStorage.getItem("level9firsttimewon"))+"&level9timesreseted="+(level9timesreseted + gameTimesReseted)+"&level9attempts='"+ ( level9attempts + blocks +"\n\n")+ "'&level9stars="+starCollected+"&level9badge="+levelBadge);
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					music.stop();
					if(!loseMusicPlayOnce){
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value +=  '\n';
					outputArea.value +=  'Συμβουλή: Δημιούργησε μια μέθοδο και ονόμασε την. Η μέθοδος δεν θα πρέπει να συνδεθεί με το Start μπλοκ. Μέσα στην μέθοδο πρόσθεσε μπλοκ τα οποία θα σε βοηθήσουν να ελέγξεις το χρώμα του αστεριού πίσω από το οποίο βρίσκεται ο/η εξερευνητής/τρια και να μαζέψεις τα μπαλόνια και τα αστέρια. Πρώτα θα πρέπει να ελέγξεις το χρώμα του αστεριού με την βοήθεια του "if" μπλοκ. Μετά μέσα στο "if" μπλοκ τοποθέτησε ένα δεύτερο (εμφωλευμένο)"if" μπλοκ το οποίο θα ελέγχει εάν το αστέρι έχει ένα μπαλόνι από πάνω του. Εάν υπάρχει μπαλόνι θα πρέπει να χρησιμοποιήσεις το "jump and collect option balloon" μπλοκ μέσα στο εμφωλευμένο "if" μπλοκ. Έπειτα έξω από το εμφωλευμένο "if" μπλοκ χρησιμοποίησε το "collect option star" μπλοκ. Επανάλαβε του ελέγχους και για τα υπόλοιπα χρώματα των αστεριών. Όταν τελειώσεις με την μέθοδο, κάλεσε την κάτω από το start μπλοκ στην σωστή θέση.';
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					outputArea.value +=  'Θυμήσου: Ο/Η εξερευνητής/τρια θα πρέπει να βρίσκεται πίσω από το πολύχρωμο αστέρι προκειμένου να μπορεί να το μαζέψει με το collect "option" star μπλοκ';
					outputArea.value +=  '\n';

					gameEndedText.setText('Try again.\n Collect every star.');
					
					for( var i=0; i < blocks.length; i++) {
						if( i === 0){
							if(blocks[i].type !== "start_point") {
								outputArea.value +=  '\nΞεκίνησε χρησιμοποιώντας το start μπλοκ \n';
								break;
							}
						}else if(i === 1) {
							if(blocks[i].type !== "repeat_until") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "repeat untill wall is option" μπλοκ. Έλεγξε την επιλογή σου. \n';
								break;
							}
						}else if(i === 2) {
							if(blocks[i].type !== "laser_beam") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "use laser beam" μπλοκ μέσα στο repeat μπλοκ.\n';
								break;
							}
						}else if(i === 3) {
							if(blocks[i].type !== "laser_beamdirection") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "shoot beam option" μπλοκ εδώ. \n';
								break;
							}
						}else if(i === 4) {
							if(blocks[i].type !== "laser_beam") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "use laser beam" μπλοκ για να επιτεθείς τον εξωγήινο \n';
								break;
							}
						}else if(i === 5) {
							if(blocks[i].type !== "laser_beamdirection") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "shoot beam option" μπλοκ.\n';
								break;
							}
						}else if(i === 6) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "repeat N times" μπλοκ.\n';
								break;
							}
						}else if(i === 7) {
							if(blocks[i].type !== "move_right") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "move right" μπλοκ μέσα στο repeat μπλοκ.\n';
								break;
							}
						}else if(i === 8) {
							if(blocks[i].type !== "procedures_callnoreturn") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Κάλεσε την μέθοδο που δημιούργησες εδώ. Έλεγξε ότι το όνομα του call method μπλοκ είναι το ίδιο με το όνομα της μεθόδους που δημιούργησες. \n';
								break;
							}
						}			
						
					}
					
					if( (9 < blocks.length) && (blocks.length < 31)){
						outputArea.value +=  '\nΒρίσκεσαι κοντά στην λύση. Σκέψου προσεκτικά.\n';
					}
					
					if(blocks.length < 31){
						outputArea.value +=  '\nΑπό ότι φαίνεται δεν τα κατάφερες. Χρησιμοποίησε περισσότερα μπλοκ για να κερδίσεις το επίπεδο.\n';
					}
					
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					localStorage.setItem("level9won", level9won);
					localStorage.setItem("level9timesreseted", level9timesreseted + gameTimesReseted);
					localStorage.setItem("level9score", ( totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level9time", level9time + time);
					
					localStorage.setItem("level9attempts", level9attempts + blocks +"\n\n");
					localStorage.setItem("level9stars", starCollected);
					localStorage.setItem("level9badge", levelBadge);
					
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level9Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level9won="+level9won+"&level9time="+(level9time + time)+"&level9score="+ (( totalScore + levelScore)  - losePoints())+"&level9firsttimewon="+ Number(localStorage.getItem("level9firsttimewon"))+"&level9timesreseted="+(level9timesreseted + gameTimesReseted)+"&level9attempts='"+ ( level9attempts + blocks +"\n\n")+ "'&level9stars="+starCollected+"&level9badge="+levelBadge);
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 9 Phaser Scene
	function losePoints(){
		if((level9timesreseted + gameTimesReseted) * 10 < 200) {
			return ((level9timesreseted + gameTimesReseted) * 10);
		}else {
			return 200;
		}
			
	}
	
	
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level9");
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
        scene: Level9
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level8score"));
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

		var enemy1, enemy2;
		
		var loseMusicPlayOnce;
		
		
		var wallHits = 0;
		var wallIsBroken = true;
		
		var collectColorfulStar;
		var starColorOverlap = 'none';
		var starHasBalloon;
		
		var collectColorfulBalloon;
		
		var balloon1, balloon2, balloon3, balloon4;
		var balloon5, balloon6, balloon7, balloon8;
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;