		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		//CHANGE THIS
		var totalStarsCollected = Number(localStorage.getItem("level9stars")) || 0;
		var beamCounter;
		
		var userName = localStorage.getItem("userName") || '';
			 var level10won = Number(localStorage.getItem("level10won")) || 0;
			 var level10score; 
			 var level10time; 
			 var level10firsttimewon; 
			 var level10timesreseted = Number(localStorage.getItem("level10timesreseted")) || 0;
			 var level10attempts;
			 var level10stars; 
		
		
		window.addEventListener('load', function() {
			if(level10won){
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
		
		// Level 10 Phaser Scene
		class Level10 extends Phaser.Scene {
			
			constructor() {
			super('level10');
			
			
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
			 
			 level10score = Number(localStorage.getItem("level10score")) || 0; 
			  level10time = Number(localStorage.getItem("level10time")) || 0;
			  level10firsttimewon = Number(localStorage.getItem("level10firsttimewon")) || 0;
			  level10attempts = localStorage.getItem("level10attempts") || ' ';	 
			  level10stars = Number(localStorage.getItem("level10stars")) || 0;
			  
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
		  
		  timeText = this.add.text(620, 0, 'Time: ' + time, { fontSize: '32px', fill: '#000',fontFamily:'Times New Roman' });
		  
		   
		}
		
		updateTimer() {
			time++;
			timeText.setText('Time: '+ (parseInt(time / 60)) +':'+ (time % 60));
		}
		
		createPlatforms() {
			platforms = this.physics.add.staticGroup();
			platforms.create(400, 568, 'ground').setScale(2).refreshBody();
			platforms.create(300, 450, 'ground').setScale(1.8, 1).refreshBody();
			platforms.create(500, 350, 'ground').setScale(1.8, 1).refreshBody();
			platforms.create(300, 250, 'ground').setScale(1.8, 1).refreshBody();
			platforms.create(500, 150, 'ground').setScale(1.8, 1).refreshBody();
			
			
			



			
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
			
			player = this.physics.add.sprite(200, 500, 'dude');
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
			enemy1 = this.physics.add.sprite(300, 300, 'alienWalkLeft');
			enemy3 = this.physics.add.sprite(600, 100, 'alienWalkLeft');
		
			
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
			enemy2.createdX = 500;
			enemy2.moveLeft = true;
			enemy2.body.allowGravity = false;
			
			enemies.add(enemy1);
			enemy1.createdX = 500;
			enemy1.moveLeft = true;
			enemy1.body.allowGravity = false;
			
			enemies.add(enemy3);
			enemy3.createdX = 500;
			enemy3.moveLeft = true;
			enemy3.body.allowGravity = false;
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
			
			//floor 0
			
			stars.create(300, 500, 'star');
			stars.create(400, 500, 'star');
			stars.create(500, 500, 'star');
			stars.create(600, 500, 'star');
			stars.create(700, 500, 'star');
			
			//floor 1
			stars.create(100, 400, 'star');
			stars.create(200, 400, 'star');
			stars.create(300, 400, 'star');
			stars.create(400, 400, 'star');
			stars.create(500, 400, 'star');
			stars.create(600, 400, 'star');
			
			//floor 2
			stars.create(200, 300, 'star');
			stars.create(300, 300, 'star');
			stars.create(400, 300, 'star');
			stars.create(500, 300, 'star');
			stars.create(600, 300, 'star');
			stars.create(700, 300, 'star');
			
			//floor 3
			stars.create(100, 200, 'star');
			stars.create(200, 200, 'star');
			stars.create(300, 200, 'star');
			stars.create(400, 200, 'star');
			stars.create(500, 200, 'star');
			stars.create(600, 200, 'star');
			
			//floor 4
			stars.create(200, 100, 'star');
			stars.create(300, 100, 'star');
			stars.create(400, 100, 'star');
			stars.create(500, 100, 'star');
			stars.create(600, 100, 'star');
			stars.create(700, 100, 'star');
			

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
				if(starCollected === 29) {

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
		
				
		
				
				if(starCollected === 29 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 17){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Χρησιμοποίησες τον ελάχιστο αριθμό μπλοκ για να κερδίσεις το Επίπεδο 10. Θα ανταμειφτείς με +100 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 17){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  'Συμβουλή: Εάν χρησιμοποίησες δύο ή περισσότερα μπλοκ του ίδιου τύπου το ένα κάτω από το άλλο, τότε θα έπρεπε να χρησιμοποιήσεις το repeat N times μπλοκ για να κερδίσεις περισσότερους πόντους';
						outputArea.value +=  '\n';
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 10. Ωστόσο χρησιμοποίησες περισσότερα μπλοκ για να κερδίσεις το Επίπεδο 10 από ότι χρειαζόταν και για αυτόν το λόγο θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}else if(totalBlocksUsed < 17){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Ολοκλήρωσες το Επίπεδο 10. Θα ανταμειφτείς με +100 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					
					/////////////////////////////
					
					if(level10won === 0){
						localStorage.setItem("level10firsttimewon", level10time + time);
					}
					
					level10won = 1;
					
					localStorage.setItem("level10won", level10won);
					localStorage.setItem("level10timesreseted", level10timesreseted + gameTimesReseted);
					localStorage.setItem("level10score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level10time", level10time + time);
					
					localStorage.setItem("level10attempts", level10attempts + blocks +"\n\n");
					localStorage.setItem("level10stars", starCollected);
					localStorage.setItem("level10badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level10Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level10won="+level10won+"&level10time="+(level10time + time)+"&level10score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level10firsttimewon="+ Number(localStorage.getItem("level10firsttimewon"))+"&level10timesreseted="+(level10timesreseted + gameTimesReseted)+"&level10attempts='"+ ( level10attempts + blocks +"\n\n")+ "'&level10stars="+starCollected+"&level10badge="+levelBadge);
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					music.stop();
					if(!loseMusicPlayOnce){
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value +=  '\n';
					outputArea.value +=  'Συμβουλή:  Χρησιμοποίησε κάτω από το Start μπλοκ μόνο "call method" τύπους μπλοκ. Δίπλα στο Start μπλοκ δημιούργησε 2 μεθόδους. Μέσα στην πρώτη μέθοδο, θα πρέπει να χρησιμοποιήσεις το laser beam μπλοκ , να κινηθείς δεξιά πολλαπλές φορές και μετά να χρησιμοποιήσεις το jump μπλοκ. Στη δεύτερη μέθοδο θα πρέπει να κινηθείς αριστερά πολλαπλές φορές και μετά να χρησιμοποιήσεις το jump και το move right μπλοκ.';
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n';

					gameEndedText.setText('Try again.\n Collect every star.');
					
					
					if( (10 < blocks.length) && (blocks.length < 17)){
						outputArea.value +=  '\nΒρίσκεσαι κοντά στην λύση. Σκέψου προσεκτικά.\n';
					}
					
					if(blocks.length < 17){
						outputArea.value +=  '\nΑπό ότι φαίνεται δεν τα κατάφερες. Χρησιμοποίησε περισσότερα μπλοκ για να κερδίσεις το επίπεδο.\n';
					}
					
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					
					localStorage.setItem("level10won", level10won);
					localStorage.setItem("level10timesreseted", level10timesreseted + gameTimesReseted);
					localStorage.setItem("level10score", (totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level10time", level10time + time);
					
					localStorage.setItem("level10attempts", level10attempts + blocks +"\n\n");
					localStorage.setItem("level10stars", starCollected);
					localStorage.setItem("level10badge", levelBadge);
					
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level10Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level10won="+level10won+"&level10time="+(level10time + time)+"&level10score="+ (( totalScore + levelScore)  - losePoints())+"&level10firsttimewon="+ Number(localStorage.getItem("level10firsttimewon"))+"&level10timesreseted="+(level10timesreseted + gameTimesReseted)+"&level10attempts='"+ ( level10attempts + blocks +"\n\n")+ "'&level10stars="+starCollected+"&level10badge="+levelBadge);
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 10 Phaser Scene
	function losePoints(){
		if((level10timesreseted + gameTimesReseted) * 10 < 290) {
			return ((level10timesreseted + gameTimesReseted) * 10);
		}else {
			return 290;
		}
			
	}
	
	
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level10");
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
        scene: Level10
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level9score"));
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
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;