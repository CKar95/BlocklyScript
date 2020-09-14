		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		//CHANGE THIS
		var totalStarsCollected = Number(localStorage.getItem("levelsStars")) || 0;
		var beamCounter;
		
		var userName = localStorage.getItem("userName") || '';
			 var level7won = Number(localStorage.getItem("level7won")) || 0;
			 var level7score; 
			 var level7time; 
			 var level7firsttimewon; 
			 var level7timesreseted = Number(localStorage.getItem("level7timesreseted")) || 0;
			 var level7attempts;
			 var level7stars; 
		
		
		window.addEventListener('load', function() {
			if(level7won){
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
		
		// Level 7 Phaser Scene
		class Level7 extends Phaser.Scene {
			
			constructor() {
			super('level7');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/purple_tree_forest_game_background_dribbble.jpg');
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
			 
			 level7score = Number(localStorage.getItem("level7score")) || 0; 
			  level7time = Number(localStorage.getItem("level7time")) || 0;
			  level7firsttimewon = Number(localStorage.getItem("level7firsttimewon")) || 0;
			  level7attempts = localStorage.getItem("level7attempts") || ' ';	 
			  level7stars = Number(localStorage.getItem("level7stars")) || 0;
			  
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
		  //this.createSpikes();
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
			platforms.create(600, 430, 'ground').setScale(0.2, 1).refreshBody();
			platforms.create(700, 300, 'ground').setScale(0.2, 1).refreshBody();
			platforms.create(300, 170, 'ground').setScale(1.8, 1).refreshBody();
		//	platforms.create(660, 450, 'ground').setScale(1.1, 1).refreshBody();
		//	platforms.create(300 , 330, 'ground').setScale(1.7, 1).refreshBody();
		//	platforms.create(280 , 210, 'ground').setScale(0.2, 1).refreshBody();
		//	platforms.create(500 , 210, 'ground').setScale(0.7, 1).refreshBody();
			
			platforms.create(550, 80, 'wall').setScale(1.5, 3).refreshBody().setTint(0xFF0000);


			
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
			enemy2 = this.physics.add.sprite(500, 500, 'alienWalkLeft');
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
			enemy2.createdX = 500;
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
			stars = this.physics.add.group();
			
			//floor 0
			
			
			
			var redStar1 = stars.create(400, 500, 'star');
			redStar1.color = "red";
			redStar1.setTint(0xFF0000);
			var redStar2 = stars.create(500, 500, 'star');
			redStar2.color = "red";
			redStar2.setTint(0xFF0000);
			var redStar3 = stars.create(200, 500, 'star');
			redStar3.color = "red";
			redStar3.setTint(0xFF0000);
			
			var greenStar1 = stars.create(300, 500, 'star');
			greenStar1.color = "green";
			greenStar1.setTint(0x008000);
			var greenStar2 = stars.create(600, 500, 'star');
			greenStar2.color = "green";
			greenStar2.setTint(0x008000);
			
			var blueStar1 = stars.create(700, 500, 'star');
			blueStar1.color = "blue";
			blueStar1.setTint(0x0000FF);
			
			stars.create(600, 300, 'star');
			stars.create(700, 200, 'star');
			
			
			stars.create(600, 100, 'star');
			stars.create(100, 100, 'star');
			stars.create(300, 100, 'star');
			stars.create(400, 100, 'star');
			
			var greenStar3 = stars.create(200, 100, 'star');
			greenStar3.color = "green";
			greenStar3.setTint(0x008000);
			var greenStar4 = stars.create(500, 100, 'star');
			greenStar4.color = "green";
			greenStar4.setTint(0x008000);
			

			
			
			// floor 1
			// stars.create(200, 200, 'star');

			// stars.create(400, 200, 'star');
			// stars.create(500, 200, 'star');

			// stars.create(700, 200, 'star');
			
			// var redStar4 = stars.create(300, 200, 'star');
			// redStar4.color = "red";
			// redStar4.setTint(0xFF0000);
			// var redStar5 = stars.create(600, 200, 'star');
			// redStar5.color = "red";
			// redStar5.setTint(0xFF0000);
			
			// floor 2
			// stars.create(600, 50, 'star');
			// stars.create(400, 50, 'star');
			// stars.create(500, 50, 'star');

			
			
			
			
		

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
			
			
			if(star.color === 'red' && collectColorfulStar === 'red')
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
				if(starCollected === 14) {

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
		
				
		
				
				if(starCollected === 14 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 25){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Χρησιμοποίησες τον ελάχιστο αριθμό μπλοκ για να κερδίσεις το Επίπεδο 7. Θα ανταμειφτείς με +100 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 25){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  'Συμβουλή: Εάν χρησιμοποίησες δύο ή περισσότερα μπλοκ του ίδιου τύπου το ένα κάτω από το άλλο, τότε θα έπρεπε να χρησιμοποιήσεις το repeat N times μπλοκ για να κερδίσεις περισσότερους πόντους';
						outputArea.value +=  '\n';
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 7. Ωστόσο χρησιμοποίησες περισσότερα μπλοκ για να κερδίσεις το Επίπεδο 7 από ότι χρειαζόταν και για αυτόν το λόγο θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}else if(totalBlocksUsed < 25){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 7 αλλά μάλλον δεν χρησιμοποίησες το "if"(συνθήκη) μπλοκ. Θα πρέπει να χρησιμοποιήσεις το συγκεκριμένο μπλοκ για να κερδίσεις περισσότερους πόντους. Θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					
					/////////////////////////////
					
					if(level7won === 0){
						localStorage.setItem("level7firsttimewon", level7time + time);
					}
					
					level7won = 1;
					
					localStorage.setItem("level7won", level7won);
					localStorage.setItem("level7timesreseted", level7timesreseted + gameTimesReseted);
					localStorage.setItem("level7score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level7time", level7time + time);
					
					localStorage.setItem("level7attempts", level7attempts + blocks +"\n\n");
					localStorage.setItem("level7stars", starCollected);
					localStorage.setItem("level7badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level7Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level7won="+level7won+"&level7time="+(level7time + time)+"&level7score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level7firsttimewon="+ Number(localStorage.getItem("level7firsttimewon"))+"&level7timesreseted="+(level7timesreseted + gameTimesReseted)+"&level7attempts='"+ ( level7attempts + blocks +"\n\n")+ "'&level7stars="+starCollected+"&level7badge="+levelBadge);
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					if(!levelLost) {
						music.stop();
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value +=  '\n';
					outputArea.value +=  'Συμβουλή:  Το If (συνθήκη) μπλοκ θα εκτελέσει όλα τα μπλοκ που θα τοποθετήσεις μέσα του μια φορά, εάν η συνθήκη είναι αληθής. Εάν η συνθήκη είναι ψευδής τότε τα μπλοκ εντολών δεν θα εκτελεστούν. Επιπλέον έχεις την δυνατότητα να επεκτείνεις το if μπλοκ και να προσθέσεις περισσότερες else if ή else  εντολές κάτω από την αρχική if εντολή. Με αυτόν τον τρόπο μπορείς να ελέγχεις εάν ο/η εξερευνητής/τρια βρίσκεται πίσω από ένα πολύχρωμο αστέρι.';
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
							if(blocks[i].type !== "laser_beam") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "use laser beam" μπλοκ. \n';
								break;
							}
						}else if(i === 2) {
							if(blocks[i].type !== "laser_beamdirection") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "shoot beam direction" μπλοκ.\n';
								break;
							}
						}else if(i === 3) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "control N times" μπλοκ εδώ. \n';
								break;
							}
						}else if(i === 4) {
							if(blocks[i].type !== "move_right") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "move right" μπλοκ μέσα στο repeat μπλοκ \n';
								break;
							}
						}else if(i === 5) {
							if(blocks[i].type !== "controls_if") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "if" μπλοκ εδώ. Θα πρέπει να το επεκτείνεις και να προσθέσεις μια "else if" και μια "else" εντολή έτσι ώστε να ελέγξεις όλα τα χρώματα των αστεριών.\n';
								break;
							}
						}else if(i === 6) {
							if(blocks[i].type !== "star_color") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "star has option color" μπλοκ δίπλα στο if μπλοκ.\n';
								break;
							}
						}else if(i === 7) {
							if(blocks[i].type !== "collect_star") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το collect option star μπλοκ μέσα στο if μπλοκ.\n';
								break;
							}
						}else if(i === 8) {
							if(blocks[i].type !== "star_color") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "star has option color" μπλοκ δίπλα στην else if εντολή. Εάν δεν έχεις την else if εντολή τότε επέκτεινε το if μπλοκ και πρόσθεσε μια else if εντολή.\n';
								break;
							}
						}
						else if(i === 9) {
							if(blocks[i].type !== "collect_star") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το collect option star μπλοκ μέσα στο if μπλοκ.\n';
								break;
							}
						}else if(i === 10) {
							if(blocks[i].type !== "collect_star") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Εάν έχεις χρησιμοποιήσει 2 else if εντολές μεσα στο αρχικό if μπλοκ τότε θα πρέπει να αφαιρέσεις την τελευταία else if εντολή και στην θέση της να τοποθετήσεις μια else εντολή. Με αυτόν το τρόπο δεν θα χρειαστεί να χρησιμοποιήσεις ένα παραπάνω star has option color μπλοκ. Μέσα στην ετνολή else χρησιμοποίησε το collect option star μπλοκ. \n';
								break;
							}
						}
						
						
					}
					if( (11 < blocks.length) && (blocks.length < 25)){
						outputArea.value +=  '\nΒρίσκεσαι κοντά στην λύση. Σκέψου προσεκτικά.\n';
					}
					
					if(blocks.length < 25){
						outputArea.value +=  '\nΑπό ότι φαίνεται δεν τα κατάφερες. Χρησιμοποίησε περισσότερα μπλοκ για να κερδίσεις το επίπεδο.\n';
					}
					
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					localStorage.setItem("level7won", level7won);
					localStorage.setItem("level7timesreseted", level7timesreseted + gameTimesReseted);
					localStorage.setItem("level7score", ( totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level7time", level7time + time);
					
					localStorage.setItem("level7attempts", level7attempts + blocks +"\n\n");
					localStorage.setItem("level7stars", starCollected);
					localStorage.setItem("level7badge", levelBadge);
					
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level7Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level7won="+level7won+"&level7time="+(level7time + time)+"&level7score="+ (( totalScore + levelScore)  - losePoints())+"&level7firsttimewon="+ Number(localStorage.getItem("level7firsttimewon"))+"&level7timesreseted="+(level7timesreseted + gameTimesReseted)+"&level7attempts='"+ ( level7attempts + blocks +"\n\n")+ "'&level7stars="+starCollected+"&level7badge="+levelBadge);
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 7 Phaser Scene
	function losePoints(){
		if((level7timesreseted + gameTimesReseted) * 10 < 140) {
			return ((level7timesreseted + gameTimesReseted) * 10);
		}else {
			return 140;
		}
			
	}
	
	
	
	//Reset Game Button Action
	function resetGame() {
			blocklyScriptCompleted = false;
			gameTimesReseted++;
			levelWon = false;			
			music.stop();
			game.scene.start("level7");
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
        scene: Level7
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level6score"));
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
		
		//Level 7
		var wallHits = 0;
		var wallIsBroken = true;
		
		var collectColorfulStar;
		var starColorOverlap = 'none';
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;