var blocklyPoints;
var blocklyScriptCompleted;

var blocks;
var moveRight;
var moveLeft;
var startBlock;
var jumpBlock;
var totalBlocksUsed;
var blocksUsedText;
var gameTimesReseted = 0;

var repeatNTimes;
var useLaserBeam;
var shootBeamDir;

var repeatWhile;
var wallBroken;

var blocklyDiv = document.getElementById('blocklyDiv');
			var demoWorkspace = Blockly.inject('blocklyDiv',
				{toolbox: document.getElementById('toolbox'),
				collapse : false, 
				comments : false, 
				disable : false, 
				maxBlocks : Infinity, 
				trashcan : true, 
				horizontalLayout : false, 
				toolboxPosition : 'start', 
				css : true, 
				media : 'https://blockly-demo.appspot.com/static/media/', 
				rtl : false, 
				maxInstances: {
					'start_point': 1
				},
				sounds : true, 
				oneBasedIndex : true, 
				grid : {
					spacing : 40, 
					length : 9, 
					colour : 'red', 
					snap : true
				}, 
				zoom : {
					controls : true, 
					wheel : true, 
					startScale : 1, 
					maxScale : 3, 
					minScale : 0.3, 
					scaleSpeed : 1.1
				}
				});
			// Compute the absolute coordinates and dimensions of blocklyArea.
			
			
    // Exit is used to signal the end of a script.
    Blockly.JavaScript.addReservedWords('exit');
	demoWorkspace.addChangeListener(Blockly.Events.disableOrphans);
	
	// demoWorkspace.addChangeListener(Blockly.Events.disableOrphans);

    var outputArea = document.getElementById('output');
    var runButton = document.getElementById('runButton');
    var myInterpreter = null;
    var runner;
	var waitProgram;

    function initApi(interpreter, scope) {
      // Add an API function for the alert() block, generated for "text_print" blocks.
      var wrapper = function (text) {
        text = text ? text.toString() : '';
        outputArea.value = outputArea.value + '\n' + text;
      };
      interpreter.setProperty(scope, 'alert',
        interpreter.createNativeFunction(wrapper));


      // Add an API function for the prompt() block.
      var wrapper = function (text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(1);
      };
      interpreter.setProperty(scope, 'prompt',
        interpreter.createNativeFunction(wrapper));
		
		 var wrapper = function() {
			return checkWall();
		  };
		  interpreter.setProperty(scope, 'checkWall',
			  interpreter.createNativeFunction(wrapper));
			  
		
      
      

      // Add all the custom block api calls here
      
      initInterpreterGoLeft(interpreter, scope);
	  initInterpreterGoRight(interpreter, scope);
	  initInterpreterGoUp(interpreter, scope);
	  initInterpreterUseLaserBeam(interpreter, scope);
	  initInterpreterCheckWall(interpreter, scope);
	  // initInterpreterWallExists(interpreter, scope);
      
      // Add an API function for highlighting blocks.
      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(highlightBlock(id));
      };
      interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));

      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return goRightX(id);
        //return interpreter.createPrimitive(highlightBlock(id));
      };
      interpreter.setProperty(scope, 'bb',
        interpreter.createNativeFunction(wrapper));
		
		/////////////////////////////////////////////
		
		 var wrapper = function (text) {
        text = text ? text.toString() : '';
        //return interpreter.createPrimitive(prompt(text));
      };
      interpreter.setProperty(scope, 'laser_beamdirection',
        interpreter.createNativeFunction(wrapper));
		
	
		
    }
	

    var highlightPause = false;
    var latestCode = '';

    function highlightBlock(id) {
      demoWorkspace.highlightBlock(id);
      highlightPause = true;
    }

    function resetStepUi(clearOutput) {
      demoWorkspace.highlightBlock(null);
      highlightPause = false;
      

      if (clearOutput) {
        outputArea.value = '  Program output:\n  =================';
      }
    }

    function generateCodeAndLoadIntoInterpreter() {
      // Generate JavaScript code and parse it.
      Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      Blockly.JavaScript.addReservedWords('highlightBlock');
	 
		

		latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace);
      resetStepUi(true);
    }

    function resetInterpreter() {
      myInterpreter = null;
      if (runner) {
        clearTimeout(runner);
        runner = null;
      }
    }

    function speak(){
      displayText.setText('Score: ' );
    }

    function runCode() {
      if (!myInterpreter) {
		  
        // First statement of this code.
        // Clear the program output.
        resetStepUi(true);
        runButton.disabled = 'disabled';
		
		/////////////////////////////////////////
		blocks = demoWorkspace.getAllBlocks(true);
		
		moveRight = 0;
		moveLeft = 0;
		startBlock = 0;
		jumpBlock = 0;
		totalBlocksUsed = 0;
		blocksUsedText = '';
		
		repeatNTimes = 0;
		useLaserBeam = 0;
		shootBeamDir = 0; 
		
		repeatWhile = 0;
		wallBroken = 0;
		
		blocklyPoints = 0;
		blocklyScriptCompleted = false;
		
		for( var i=0; i < blocks.length; i++) {
			if(blocks[i].type === "move_right") {
				moveRight++
			}else if (blocks[i].type === "move_left"){
				moveLeft++;
			}else if (blocks[i].type === "start_point") {
				startBlock++;
			}else if (blocks[i].type === "move_up") {
				jumpBlock++;
			}else if (blocks[i].type === "laser_beam") {
				useLaserBeam++;
			}else if (blocks[i].type === "laser_beamdirection") {
				shootBeamDir++;
			}else if (blocks[i].type === "controls_repeat") {
				repeatNTimes++;
			}else if (blocks[i].type === "repeat_while") {
				repeatWhile++;
			}else if (blocks[i].type === "wall_exists") {
				wallBroken++;
			}else {
			}
		}
		
		totalBlocksUsed = (moveLeft + startBlock + moveRight + jumpBlock) + (useLaserBeam + shootBeamDir + repeatNTimes) + repeatWhile;
			
		blocksUsedText = "Start μπλοκ που χρησιμοποίηθηκαν: " + startBlock + "\n";
		blocksUsedText += "Move left μπλοκ που χρησιμοποίηθηκαν: " + moveLeft + "\n";
		blocksUsedText += "Move right μπλοκ που χρησιμοποίηθηκαν: " + moveRight + "\n";
		blocksUsedText += "Jump μπλοκ που χρησιμοποίηθηκαν: " + jumpBlock + "\n";
		blocksUsedText += "Repeat N Times μπλοκ που χρησιμοποίηθηκαν: " + repeatNTimes + "\n";
		blocksUsedText += "Use laser beam μπλοκ που χρησιμοποίηθηκαν: " + useLaserBeam + "\n";
		blocksUsedText += 'Shoot beam "direction" μπλοκ που χρησιμοποίηθηκαν: ' + shootBeamDir + "\n";
		blocksUsedText += "Repeat while wall is μπλοκ που χρησιμοποίηθηκαν: " + repeatWhile + "\n";
		blocksUsedText += "Συνολικά μπλοκ που χρησιμοποίηθηκαν: " + totalBlocksUsed + "\n";
		blocksUsedText += "\nΦορές που επανέλαβες το Επίπεδο 4: " + (level4timesreseted + gameTimesReseted) +"\n";
		blocksUsedText +="Θα χάσεις "+(losePoints())+" πόντους από το συνολικό σου σκορ.\n"

		/////////////////////////////////////////

        // And then show generated code in an alert.
        // In a timeout to allow the outputArea.value to reset first.
setTimeout(function () {


          // Begin execution
          highlightPause = false;
          myInterpreter = new Interpreter(latestCode, initApi);
          runner = function () {
            if (myInterpreter) {
              var hasMore = myInterpreter.run();
 
              if (hasMore) {
                // Execution is currently blocked by some async call.
                // Try again later.
				
                setTimeout(runner, 10);
              } else {
                // Program is complete.
				
				//My Code
				
				
                resetInterpreter();
                resetStepUi(false);
				setTimeout(function () {
					blocklyScriptCompleted = true;
				  }, 500);
				
              }
            }
          };
          runner();
        }, 1);
        return;
      }
    }

    // Load the interpreter now, and upon future changes.
    generateCodeAndLoadIntoInterpreter();
    demoWorkspace.addChangeListener(function (event) {
      if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        resetInterpreter();
        generateCodeAndLoadIntoInterpreter();
      }
    });
			