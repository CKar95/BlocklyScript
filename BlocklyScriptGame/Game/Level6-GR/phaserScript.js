		var playerName = localStorage.getItem("explorerName") || "player";
		var playerGender = localStorage.getItem("playerGender") || "girl";
		//CHANGE THIS
		var totalStarsCollected = Number(localStorage.getItem("level5stars")) || 0;
		var beamCounter;
		
		var userName = localStorage.getItem("userName") || '';
			 var level6won = Number(localStorage.getItem("level6won")) || 0;
			 var level6score; 
			 var level6time; 
			 var level6firsttimewon; 
			 var level6timesreseted = Number(localStorage.getItem("level6timesreseted")) || 0;
			 var level6attempts;
			 var level6stars; 
		
		
		window.addEventListener('load', function() {
			if(level6won){
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
		
		// Level 6 Phaser Scene
		class Level6 extends Phaser.Scene {
			
			constructor() {
			super('level6');
			
			
		}
			
		// ===============================================================
		// Preload	
		 preload() {

		  this.load.image('sky', '../assets/maxresdefault.jpg');
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
		}
		
		// ===============================================================
		// Create
		 create() {
			 
			  level6score = Number(localStorage.getItem("level6score")) || 0; 
			  level6time = Number(localStorage.getItem("level6time")) || 0;
			  level6firsttimewon = Number(localStorage.getItem("level6firsttimewon")) || 0;
			  level6attempts = localStorage.getItem("level6attempts") || ' ';	 
			  level6stars = Number(localStorage.getItem("level6stars")) || 0;
			  
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
		  //this.createEnemies();
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
		//	platforms.create(660, 450, 'ground').setScale(1.1, 1).refreshBody();
		//	platforms.create(300 , 330, 'ground').setScale(1.7, 1).refreshBody();
		//	platforms.create(280 , 210, 'ground').setScale(0.2, 1).refreshBody();
		//	platforms.create(500 , 210, 'ground').setScale(0.7, 1).refreshBody();
			
			platforms.create(200, 475, 'ground').setScale(0.1, 1).refreshBody();
			platforms.create(300, 450, 'ground').setScale(0.1, 1).refreshBody();
			platforms.create(400, 425, 'ground').setScale(0.1, 1).refreshBody();
			platforms.create(500, 400, 'ground').setScale(0.1, 1).refreshBody();
			platforms.create(600, 375, 'ground').setScale(0.1, 1).refreshBody();
			platforms.create(700, 270, 'ground').setScale(0.2, 1).refreshBody();

			platforms.create(500, 150, 'ground').setScale(0.7, 1).refreshBody();
			//platforms.create(450, 500, 'wall').setScale(1, 1.3).refreshBody().setTint(0xff0000);
			
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
			
			player = this.physics.add.sprite(700, 500, 'dude');
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
			stars = this.physics.add.group();
			
			//floor 0
			stars.create(200, 500, 'star');
			stars.create(300, 500, 'star');
			stars.create(600, 500, 'star');
			
			var redStar1 = stars.create(400, 500, 'star');
			redStar1.color = "red";
			redStar1.setTint(0xFF0000);
			var redStar2 = stars.create(500, 500, 'star');
			redStar2.color = "red";
			redStar2.setTint(0xFF0000);
			var redStar3 = stars.create(100, 500, 'star');
			redStar3.color = "red";
			redStar3.setTint(0xFF0000);
			

			
			
			//floor 1
			stars.create(200, 200, 'star');

			stars.create(400, 200, 'star');
			stars.create(500, 200, 'star');

			stars.create(700, 200, 'star');
			
			var redStar4 = stars.create(300, 200, 'star');
			redStar4.color = "red";
			redStar4.setTint(0xFF0000);
			var redStar5 = stars.create(600, 200, 'star');
			redStar5.color = "red";
			redStar5.setTint(0xFF0000);
			
			//floor 2
			stars.create(600, 50, 'star');
			stars.create(500, 50, 'star');
			stars.create(400, 50, 'star');

			
			
			
			
		

			stars.children.iterate((child) => {

				child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
				child.setCircle(12);
				if (child.color !=='red'){
					child.color = 'none';
				}

			});
			this.physics.add.overlap(player, stars, this.collectStar, null, this);
			
			this.physics.add.collider(stars, platforms);
			
		}
		
		collectStar (player, star) {
			this.starMusic = this.sound.add('starsMusic', {volume: 0.1});
			
			 if (star.color === 'none') {
				starColorOverlap = 'none';
			}else if(star.color === 'red'){
				starColorOverlap = 'red';
			}
			
			if(star.color === 'red' && collectColorfulStar === 'red')
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
		  
		  //this.moveEnemies();
		  this.checkGameEndResult();
		  this.createInstanceOFLaserBeam();
		  
		  
		 
		  
		  
		  
		  


		}

		hitAlien(beam, alien) {
			
			beam.setVisible(false);
			beam.body.enable =false;
			alien.setVisible(false);
			alien.body.enable =false;
			
			
			
	
		}
		
		hitWall(beam, wall) {
			
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
		
				
		
				
				if(starCollected === 15 && runOnce) {
					
					music.stop();
					victoryMusic.play();
					runOnce = false;
					document.getElementById('nextLevel').disabled = false;
					gameEndedText.setText('Congratulations!\n You WIN!');
					outputArea.value +=  '\n';
					if(totalBlocksUsed === 15){
						blocklyPoints = 100;
						document.getElementById("levelbadge").src="../assets/first.png";
						levelBadge = 1;
						outputArea.value +=  '\n Συγχαρητήρια. Χρησιμοποίησες τον ελάχιστο αριθμό μπλοκ για να κερδίσεις το Επίπεδο 6. Θα ανταμειφτείς με +100 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: '+((blocklyPoints + totalScore + levelScore) - Number(losePoints())) + "";
						
					}else if(totalBlocksUsed > 15){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  'Συμβουλή: Εάν χρησιμοποίησες δύο ή περισσότερα μπλοκ του ίδιου τύπου το ένα κάτω από το άλλο, τότε θα έπρεπε να χρησιμοποιήσεις το repeat N times μπλοκ για να κερδίσεις περισσότερους πόντους';
						outputArea.value +=  '\n';
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 6. Ωστόσο χρησιμοποίησες περισσότερα μπλοκ για να κερδίσεις το Επίπεδο 6 από ότι χρειαζόταν και για αυτόν το λόγο θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου! Το συνολικό σου σκορ είναι: ' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}else if(totalBlocksUsed < 15){
						blocklyPoints = 40;
						document.getElementById("levelbadge").src="../assets/second.png";
						levelBadge = 2;
						outputArea.value +=  '\n Καλή προσπάθεια. Ολοκλήρωσες το Επίπεδο 6 αλλά μάλλον δεν χρησιμοποίησες το "if"(συνθήκη) μπλοκ. Θα πρέπει να χρησιμοποιήσεις το συγκεκριμένο μπλοκ για να κερδίσεις περισσότερους πόντους. Θα ανταμειφτείς με +40 πόντους, οι οποίοι θα προστεθούν στο τρέχον σκορ σου:' +((blocklyPoints + totalScore + levelScore)  - Number(losePoints()))+ "";
						
					}
					outputArea.value +=  '\n ';
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value +=  '\n ';
					
					outputArea.value += '\n<< Program completed >>';
					
					/////////////////////////////
					
					if(level6won === 0){
						localStorage.setItem("level6firsttimewon", level6time + time);
					}
					
					level6won = 1;
					
					localStorage.setItem("level6won", level6won);
					localStorage.setItem("level6timesreseted", level6timesreseted + gameTimesReseted);
					localStorage.setItem("level6score", (blocklyPoints + totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level6time", level6time + time);
					
					localStorage.setItem("level6attempts", level6attempts + blocks +"\n\n");
					localStorage.setItem("level6stars", starCollected);
					localStorage.setItem("level6badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level6Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level6won="+level6won+"&level6time="+(level6time + time)+"&level6score="+ ((blocklyPoints + totalScore + levelScore)  - losePoints())+"&level6firsttimewon="+ Number(localStorage.getItem("level6firsttimewon"))+"&level6timesreseted="+(level6timesreseted + gameTimesReseted)+"&level6attempts='"+ ( level6attempts + blocks +"\n\n")+ "'&level6stars="+starCollected+"&level6badge="+levelBadge);
					
				}else if(runOnce){
					
					document.getElementById("levelbadge").src="../assets/third.png";
					levelBadge = 3;
					if(!levelLost) {
						music.stop();
						loseMusic.play();
					}
					runOnce = false;
					outputArea.value +=  '\n';
					outputArea.value +=  'Συμβουλή:  Το If (συνθήκη) μπλοκ θα εκτελέσει μια φορά τα μπλοκ που θα τοποθετήσεις μέσα του , εάν η συνθήκη είναι αληθής. Έαν η συνθήκη είναι ψευδής τότε τα μπλοκ που τοποθετήσες μέσα στο If (συνθήκη) μπλοκ δεν θα εκτελεστούν.';
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
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "repeat N times" μπλοκ. \n';
								break;
							}
						}else if(i === 2) {
							if(blocks[i].type !== "move_left") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "move left" μπλοκ μέσα στο repeat N times μπλοκ. Πρώτα πρέπει να μετακινήσεις τον/την εξερευνητής/τρια και μετά να ελέγξεις το χρώμα του αστεριού.\n';
								break;
							}
						}else if(i === 3) {
							if(blocks[i].type !== "controls_if") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "if" μπλοκ εδώ. \n';
								break;
							}
						}else if(i === 4) {
							if(blocks[i].type !== "star_color") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "star has: \'option\' color" εδώ. Έλεγξε εάν ο/η εξερευνητής/τρια βρίσκεται πίσω από το χρώμα του αστεριού που επέλεξες \n';
								break;
							}
						}else if(i === 5) {
							if(blocks[i].type !== "collect_star") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "collect \'option\' star block εδώ. Επέλεξε το σωστό χρώμα.\n';
								break;
							}
						}else if(i === 6) {
							if(blocks[i].type !== "controls_repeat") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το repeat N times μπλοκ.\n';
								break;
							}
						}else if(i === 7) {
							if(blocks[i].type !== "move_up") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το jump μπλοκ μέσα στο repeat N times μπλοκ.\n';
								break;
							}
						}else if(i === 8) {
							if(blocks[i].type !== "move_right") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το move right μπλοκ εδώ.\n';
								break;
							}
						}
						else if(i === 9) {
							if(blocks[i].type !== "controls_if") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "if" μπλοκ εδώ. \n';
								break;
							}
						}else if(i === 10) {
							if(blocks[i].type !== "star_color") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "star has: \'option\' color" εδώ. Έλεγξε εάν ο/η εξερευνητής/τρια βρίσκεται πίσω από το χρώμα του αστεριού που επέλεξες \n';
								break;
							}
						}else if(i === 11) {
							if(blocks[i].type !== "collect_star") {
								outputArea.value +=  '\nBlock '+(i + 1)+': Χρησιμοποίησε το "collect \'option\' star μπλοκ εδώ. Επέλεξε το σωστό χρώμα.\n';
								break;
							}
						}
						
						
					}
					if( (12 < blocks.length) && (blocks.length < 15)){
						outputArea.value +=  '\nΒρίσκεσαι κοντά στην λύση. Σκέψου προσεκτικά.\n';
					}
					
					if(blocks.length < 15){
						outputArea.value +=  '\nΑπό ότι φαίνεται δεν τα κατάφερες. Χρησιμοποίησε περισσότερα μπλοκ για να κερδίσεις το επίπεδο.\n';
					}
					
					outputArea.value +=  '\n';
					outputArea.value +=  '\n';
					
					outputArea.value +=  '\n' + blocksUsedText;
					outputArea.value += '\n<< Program completed >>';
					
					
					localStorage.setItem("level6won", level6won);
					localStorage.setItem("level6timesreseted", level6timesreseted + gameTimesReseted);
					localStorage.setItem("level6score", (  totalScore + levelScore)  - losePoints());
					
					localStorage.setItem("level6time", level6time + time);
					
					localStorage.setItem("level6attempts", level6attempts + blocks +"\n\n");
					localStorage.setItem("level6stars", starCollected);
					localStorage.setItem("level6badge", levelBadge);
					
					
					const xhr = new XMLHttpRequest();
					xhr.open("POST", "level6Update.php");
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send("username="+userName+"&level6won="+level6won+"&level6time="+(level6time + time)+"&level6score="+ (( totalScore + levelScore)  - losePoints())+"&level6firsttimewon="+ Number(localStorage.getItem("level6firsttimewon"))+"&level6timesreseted="+(level6timesreseted + gameTimesReseted)+"&level6attempts='"+ ( level6attempts + blocks +"\n\n")+ "'&level6stars="+starCollected+"&level6badge="+levelBadge);
					
				}
				
                
			
			

			}
			
		}
		
		isPlayerMoving(){
			return ( player.body.velocity.x !== 0);
		}
		
		  
		
	}
	// END OF: Level 6 Phaser Scene
	function losePoints(){
		if((level6timesreseted + gameTimesReseted) * 10 < 150) {
			return ((level6timesreseted + gameTimesReseted) * 10);
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
			game.scene.start("level6");
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
        scene: Level6
    };

		var game = new Phaser.Game(config);
		
		//Global Game Variables
		var player;
		var totalScore = Number(localStorage.getItem("level5score"));
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
		////
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
		
		//Level 6
		var wallHits = 0;
		var wallIsBroken = true;
		
		var collectColorfulStar;
		var starColorOverlap = 'none';
		
		
		//Global Game Movement Variables
		var goToTheRight = false;
		var goToTheLeft = false;
		var goJump = false;