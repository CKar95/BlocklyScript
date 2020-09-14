		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		//CHANGE THIS
		var totalStarsCollected = Number(localStorage.getItem("level10Stars")) || 0;
		var beamCounter;
		
		
		window.addEventListener('load', function() {
			document.getElementById('nextLevel').disabled = true;
			var x = document.getElementsByClassName("spanPlayerName");
			var i;
			for (i = 0; i < x.length; i++) {
			  x[i].innerHTML= playerName;
			} 
		})
		
		// Level 11 Phaser Scene
		class Level11 extends Phaser.Scene {
			
			constructor() {
			super('level11');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/planet_example.png');
		  this.load.image('ground', '../assets/platform.png');
		  this.load.image('star', '../assets/star.png');
		  this.load.image('bomb', '../assets/bomb.png');
		  this.load.image('spikes', '../assets/spikes.png');
		  this.load.image('beam', '../assets/beam.png');
		  this.load.image('wall', '../assets/wall.jpg');
		  this.load.image('balloon', '../assets/balloon.png');
		  this.load.image('door', '../assets/door.png');
		  
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
		  this.load.audio('doorOpens', ['../assets/door_2.mp3']);
		  
		}
		
		// ===============================================================
		// Create
		 create() {
			 
			 restoreStars = false;
		     restoreStarsOnce = false;
			 openTheDoor = false;
			 openTheDoorOnce = true;
			 loseMusicPlayOnce = false;
			 wallHits = 0;
			 wallIsBroken = true;
			 beamCounter = 0;
			 
		  	if(!levelWon) {
			  levelScore = 0;
		  }	
		  runOnce = true;
		  starCollected = 0;
		  victoryMusic = this.sound.add('victoryMusic', { rate: 0.9, volume: 0.1});
		  loseMusic = this.sound.add('heroHurt', { rate: 0.9, volume: 0.1});
		  
		  music = this.sound.add('theme', {loop: true, rate: 1.0, volume: 0.1});
		  music.play();
		  
		  //this.add.image(400, 300, 'sky');
		  
			////
		  //this.add.image(400, 300, 'sky');
		  this.createParticles();
		  this.createPlatforms();
		  this.createPlayer();
		  this.createStars();
		  this.createSpikes();
		  this.createEnemies();
		  this.createLaserBeams();
		  
		  
		  
		  
		  
		this.blocklyLandText = this.add.text(290, 280, 'Blocklyland', { fontSize: '50px', fill: '#00e600',fontFamily:'Times New Roman' });

		  starsCollectedText = this.add.text(0, 0, '', { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  totalScoreText = this.add.text(250, 0,'', { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
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

			
		}
		
		changeScene() {
			this.add.image(400, 300, 'sky');
			this.blocklyLandText = this.add.text(290, 280, 'Blocklyland', { fontSize: '50px', fill: '#00e600',fontFamily:'Times New Roman' });
			var particles = this.add.particles('star');

		    var emitter1 = particles.createEmitter({tint: 0x0000FF});
			emitter1.setPosition(100, 100);
			emitter1.setSpeed(8);
			
			emitter1.setBlendMode(Phaser.BlendModes.ADD);
			var emitter2 = particles.createEmitter({tint: 0xFF0000});
			emitter2.setPosition(200, 50);
			emitter2.setSpeed(8);
			emitter2.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter({tint: 0x008000});
			emitter3.setPosition(220, 100);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter();
			emitter3.setPosition(40, 40);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter4 = particles.createEmitter();
			emitter4.setPosition(550, 120);
			emitter4.setSpeed(8);
			emitter4.setBlendMode(Phaser.BlendModes.ADD);
			var emitter5 = particles.createEmitter({tint: 0x008000});
			emitter5.setPosition(600, 40);
			emitter5.setSpeed(8);
			emitter5.setBlendMode(Phaser.BlendModes.ADD);
			/////
			var emitter1 = particles.createEmitter();
			emitter1.setPosition(100, 200);
			emitter1.setSpeed(8);
			emitter1.setBlendMode(Phaser.BlendModes.ADD);
			var emitter2 = particles.createEmitter();
			emitter2.setPosition(200, 180);
			emitter2.setSpeed(8);
			emitter2.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter({tint: 0xFF0000});
			emitter3.setPosition(300, 70);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter();
			emitter3.setPosition(380, 40);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter4 = particles.createEmitter({tint: 0x0000FF});
			emitter4.setPosition(500, 60);
			emitter4.setSpeed(8);
			emitter4.setBlendMode(Phaser.BlendModes.ADD);
			var emitter5 = particles.createEmitter();
			emitter5.setPosition(700, 80);
			emitter5.setSpeed(8);
			emitter5.setBlendMode(Phaser.BlendModes.ADD);
			/////
			var emitter1 = particles.createEmitter({tint: 0xFF0000});
			emitter1.setPosition(50, 300);
			emitter1.setSpeed(8);
			emitter1.setBlendMode(Phaser.BlendModes.ADD);
			var emitter2 = particles.createEmitter({tint: 0x008000});
			emitter2.setPosition(100, 400);
			emitter2.setSpeed(8);
			emitter2.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter({tint: 0x0000FF});
			emitter3.setPosition(75, 500);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter();
			emitter3.setPosition(150, 300);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter4 = particles.createEmitter({tint: 0xFF0000});
			emitter4.setPosition(200, 400);
			emitter4.setSpeed(8);
			emitter4.setBlendMode(Phaser.BlendModes.ADD);
			var emitter5 = particles.createEmitter({tint: 0x008000});
			emitter5.setPosition(170, 500);
			emitter5.setSpeed(8);
			emitter5.setBlendMode(Phaser.BlendModes.ADD);
			//////////
			var emitter1 = particles.createEmitter({tint: 0x0000FF});
			emitter1.setPosition(600, 200);
			emitter1.setSpeed(8);
			emitter1.setBlendMode(Phaser.BlendModes.ADD);
			var emitter2 = particles.createEmitter();
			emitter2.setPosition(650, 300);
			emitter2.setSpeed(8);
			emitter2.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter({tint: 0x008000});
			emitter3.setPosition(600, 400);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter({tint: 0xFF0000});
			emitter3.setPosition(680, 500);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter4 = particles.createEmitter({tint: 0x0000FF});
			emitter4.setPosition(580, 500);
			emitter4.setSpeed(8);
			emitter4.setBlendMode(Phaser.BlendModes.ADD);
			var emitter5 = particles.createEmitter({tint: 0xFF0000});
			emitter5.setPosition(780, 400);
			emitter5.setSpeed(8);
			emitter5.setBlendMode(Phaser.BlendModes.ADD);
			
			/////
			
			var emitter1 = particles.createEmitter();
			emitter1.setPosition(700, 380);
			emitter1.setSpeed(8);
			emitter1.setBlendMode(Phaser.BlendModes.ADD);
			var emitter2 = particles.createEmitter();
			emitter2.setPosition(700, 240);
			emitter2.setSpeed(8);
			emitter2.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter();
			emitter3.setPosition(75, 500);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter3 = particles.createEmitter();
			emitter3.setPosition(300, 550);
			emitter3.setSpeed(8);
			emitter3.setBlendMode(Phaser.BlendModes.ADD);
			var emitter4 = particles.createEmitter();
			emitter4.setPosition(400, 570);
			emitter4.setSpeed(8);
			emitter4.setBlendMode(Phaser.BlendModes.ADD);
			var emitter5 = particles.createEmitter();
			emitter5.setPosition(500, 520);
			emitter5.setSpeed(8);
			emitter5.setBlendMode(Phaser.BlendModes.ADD);
		}
		
		createBalloon(x, y, color){
			var balloon;
			balloon = stars.create(x, y, 'balloon');
			balloon.body.allowGravity = false;
			balloon.createdY = 800;
			balloon.moveDown = true;
			balloon.color = "red";
			balloon.type = 'balloon';
			balloon.boomOnce = false;
			balloon.setVelocityY(-145);
			
			if(color === 'red'){
				balloon.setTint(0xFF0000);
			}else if(color === 'green'){
				balloon.setTint(0x008000);
			}else{
				balloon.setTint(0x0000FF);
			}
			
			return balloon;
		}
		
		createEmitterStars() {
			
			if(restoreStars && !restoreStarsOnce){
			this.starMusic = this.sound.add('starsMusic', {volume: 0.1});	
			stars = this.physics.add.group();
			
			//row 1
			balloon1 = this.createBalloon(200, 800, 'red');
			balloon2 = this.createBalloon(400, 800, 'green');
			balloon3 = this.createBalloon(600, 800, 'blue');
			
			//row 2
			balloon4 = this.createBalloon(100, 900, 'blue');
			balloon5 = this.createBalloon(300, 900, 'red');
			balloon6 = this.createBalloon(500, 900, 'red');
			balloon7 = this.createBalloon(700, 900, 'green');
			
			//row 3
			balloon8 = this.createBalloon(200, 1000, 'green');
			balloon9 = this.createBalloon(400, 1000, 'blue');
			balloon10 = this.createBalloon(600, 1000, 'red');
			
			//row 4
			balloon11 = this.createBalloon(100, 1100, 'green');
			balloon12 = this.createBalloon(300, 1100, 'red');
			balloon13 = this.createBalloon(500, 1100, 'green');
			balloon14 = this.createBalloon(700, 1100, 'blue');
			
			//row 5
			balloon15 = this.createBalloon(200, 1200, 'red');
			balloon16 = this.createBalloon(400, 1200, 'blue');
			balloon17 = this.createBalloon(600, 1200, 'green');
			
	
			
			

			
			this.time.addEvent({ delay: 5000, callback: this.changeScene, callbackScope: this });
			
			
			
			restoreStarsOnce = true;
			
			}
		}
		
		checkballoonHight(balloon, hight) {
			if(balloon.y <= hight) {
				if(!balloon.boomOnce){
					this.starMusic.play();
					balloon.disableBody(true, true);
					particles.emitParticleAt(balloon.x, balloon.y, 50);
					balloon.boomOnce = true;
				}
			}
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
			
			player = this.physics.add.sprite(1000, 1000, 'dude');
			player.setVisible(true);
			player.setOffset(15, 5);
			player.setSize(20, 42, false);
			player.setBounce(0);
			player.setCollideWorldBounds(false);
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
			// enemy2 = this.physics.add.sprite(400, 500, 'alienWalkLeft');
			// enemy1 = this.physics.add.sprite(300, 300, 'alienWalkLeft');
			// enemy3 = this.physics.add.sprite(600, 100, 'alienWalkLeft');
		
			
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
			// enemies.add(enemy2);
			// enemy2.createdX = 500;
			// enemy2.moveLeft = true;
			// enemy2.body.allowGravity = false;
			
			// enemies.add(enemy1);
			// enemy1.createdX = 500;
			// enemy1.moveLeft = true;
			// enemy1.body.allowGravity = false;
			
			// enemies.add(enemy3);
			// enemy3.createdX = 500;
			// enemy3.moveLeft = true;
			// enemy3.body.allowGravity = false;
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
				 
				 if(enemy1.moveLeft && (enemy1.x > enemy1.createdX - 200)){
					
					 enemy1.setVelocityX(-50);
					 enemy1.anims.play('alienLeft', true);
				 }else if(enemy1.moveLeft && (enemy1.x <= enemy1.createdX - 200)){
					 
					 enemy1.setVelocityX(50);
					  enemy1.anims.play('alienRight', true);
					 enemy1.moveLeft = false;
				 }else if(!enemy1.moveLeft && (enemy1.x >= enemy1.createdX + 200)){
					 enemy1.moveLeft = true;
					  
				 }
				 
				 if(enemy3.moveLeft && (enemy3.x > enemy3.createdX - 200)){
					
					 enemy3.setVelocityX(-50);
					 enemy3.anims.play('alienLeft', true);
				 }else if(enemy3.moveLeft && (enemy3.x <= enemy3.createdX - 200)){
					 
					 enemy3.setVelocityX(50);
					  enemy3.anims.play('alienRight', true);
					 enemy3.moveLeft = false;
				 }else if(!enemy3.moveLeft && (enemy3.x >= enemy3.createdX + 200)){
					 enemy3.moveLeft = true;
					  
				 }
			
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
			
			starsCollectedText.setText('Stars collected: ' + starCollected);
			if(!levelWon){
				
			    totalScoreText.setText('Score: ' + (totalScore + levelScore));
				if(starCollected === 10) {

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
		  
		  //this.moveEnemies();
		  this.checkGameEndResult();
		  this.createInstanceOFLaserBeam();
		  
		  if(openTheDoor && openTheDoorOnce)
		  {
			  var doorOpensMusic = this.sound.add('doorOpens', { rate: 1.0, volume: 0.1});
			  doorOpensMusic.play();
			  myDoor.setVisible(false);
		      myDoor.body.enable = false;
			  openTheDoorOnce = false;
		  }
		  
		  this.createEmitterStars();
		  if(restoreStars){
			  //row1
			   this.checkballoonHight(balloon1, 100);
			   this.checkballoonHight(balloon2, 100);
			   this.checkballoonHight(balloon3, 100);
			   //row2
			   this.checkballoonHight(balloon4, 200);
			   this.checkballoonHight(balloon5, 200);
			   this.checkballoonHight(balloon6, 200);
			   this.checkballoonHight(balloon7, 200);
			   //row3
			   this.checkballoonHight(balloon8, 300);
			   this.checkballoonHight(balloon9, 300);
			   this.checkballoonHight(balloon10, 300);
			    //row4
			   this.checkballoonHight(balloon11, 400);
			   this.checkballoonHight(balloon12, 400);
			   this.checkballoonHight(balloon13, 400);
			   this.checkballoonHight(balloon14, 400);
			   //row5
			   this.checkballoonHight(balloon15, 500);
			   this.checkballoonHight(balloon16, 500);
			   this.checkballoonHight(balloon17, 500);
		  }
		 
		  



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
		
				
		
				
				if(totalBlocksUsed > 1 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					//gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					
						blocklyPoints = 100;
						outputArea.value +=  '\n Congratulations. You restored the stars to the sky. You saved Blocklyland and it\'s citizens! ! !'
					
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					localStorage.setItem("level11Score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					localStorage.setItem("level11Stars", totalStarsCollected + starCollected);
					localStorage.setItem("level11Time", time);
					
				}else if(runOnce){
					
					music.stop();
					if(!loseMusicPlayOnce){
						loseMusic.play();
					}
					runOnce = false;


					gameEndedText.setText('Try again.\n Collect every star.');
					
					
					
					outputArea.value +=  '\n Restore the stars to the sky';
					
					
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 11 Phaser Scene
	function losePoints(){
		if(gameTimesReseted * 10 < 100) {
			return (gameTimesReseted * 10);
		}else {
			return 100;
		}
			
	}
	
	
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level11");
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
		
		function restoreStarsFun(){
			restoreStars = true;
			levelWon = true;
			
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
        scene: Level11
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level10Score"));
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
		
		var timeEvent;
		var time = 0 ;
		var timeText;

		var laserBeams;
		var beamLeft;
		var beamRight;
		
		var programEnded = false;
		var runOnce;

		var enemy1, enemy2, enemy3;
		
		var loseMusicPlayOnce;
		
		
		var wallHits = 0;
		var wallIsBroken = true;
		
		var collectColorfulStar;
		var starColorOverlap = 'none';
		var starHasBalloon;
		
		var collectColorfulBalloon;
		
		var balloon1, balloon2, balloon3, balloon4;
		var balloon5, balloon6, balloon7, balloon8;
		var balloon9, balloon10, balloon11, balloon12;
		var balloon13, balloon14;
		var balloon15, balloon16, balloon17, balloon18;
		
		var openTheDoor, openTheDoorOnce;
		var myDoor;
		
		var restoreStars;
		var restoreStarsOnce;
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;