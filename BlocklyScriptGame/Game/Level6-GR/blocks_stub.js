
Blockly.JavaScript['move_left'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'goLeftBlock();\n'; // make sure to keep the \n or it will not work correctly
  return code;
};


function initInterpreterGoLeft(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('goLeftBlock');
  var wrapper = interpreter.createAsyncFunction(
    function(callback) {
      goToTheLeft = true;

	  console.log("i am left"+ wallIsBroken);
          setTimeout(function(){ 
            // next stop moving to the left
            goToTheLeft = false; 
            callback(); },  1000);


    });
  interpreter.setProperty(scope, 'goLeftBlock', wrapper);
}


Blockly.JavaScript['move_right'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'goRightBlock();\n'; // make sure to keep the \n or it will not work correctly
  return code;
};


function initInterpreterGoRight(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('goRightBlock');
  var wrapper = interpreter.createAsyncFunction(
    function(callback) {
      goToTheRight = true;
	  console.log("i am right"+ wallIsBroken);
          setTimeout(function(){ 
            // next stop moving to the left
            goToTheRight = false; 
            callback(); },  1000);


    });
  interpreter.setProperty(scope, 'goRightBlock', wrapper);
}

Blockly.JavaScript['move_up'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'goUpBlock();\n'; // make sure to keep the \n or it will not work correctly
  return code;
};


function initInterpreterGoUp(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('goUpBlock');
  var wrapper = interpreter.createAsyncFunction(
    function(callback) {
      goJump = true;
          setTimeout(function(){ 
            // next stop moving to the left
            goJump = false; 
            callback(); },  200);


    });
  interpreter.setProperty(scope, 'goUpBlock', wrapper);
}

Blockly.JavaScript['start_point'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  return code;
};

Blockly.JavaScript['laser_beam'] = function(block) {
  var value_beamdirection = Blockly.JavaScript.valueToCode(block, 'beamDirection', Blockly.JavaScript.ORDER_ATOMIC);
  var x = String(value_beamdirection);
  x = x.replace(/\(/g, '');
  x = x.replace(/\)/g, '');
  console.log("wtf: "+x);
  
  x = String(x);
  console.log(x);
  var s;
  if(x === "LEFT"){
	  s = 1;
  }else if(x === "RIGHT"){
	   s = 2;
  }
  // TODO: Assemble JavaScript into code variable.
  var code = 'useLaserBeam('+ s +');\n';
  return code;
};

function initInterpreterUseLaserBeam(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('useLaserBeam');
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
	
	console.log("eeee" + x);
		if(x === 1)
		{
		
			beamLeft = true;

          setTimeout(function(){ 
            // next stop moving to the left
            beamLeft = false; 
			
            callback(); },  1000);
		}else if(x === 2){
		  beamRight = true;

          setTimeout(function(){ 
            // next stop moving to the left
            beamRight = false; 
            callback(); },  1000);
		}else {
			setTimeout(function(){ 
            callback(); },  1000);
		}
			

		
      

    });
  interpreter.setProperty(scope, 'useLaserBeam', wrapper);
}

Blockly.JavaScript['laser_beamdirection'] = function(block) {
  var dropdown_beamdirectionlist = block.getFieldValue('beamDirection');
  // TODO: Assemble JavaScript into code variable.
  
  var code = dropdown_beamdirectionlist;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['wall_exists'] = function(block) {
  var dropdown_walloptions = block.getFieldValue('wallOptions');
  
  // TODO: Assemble JavaScript into code variable.

  var code = "checkWall()";

  console.log(dropdown_walloptions);
  console.log("Times "+code);
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['repeat_while'] = function(block) {
  var dropdown_brokenornot = block.getFieldValue('brokenOrNot');
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  // TODO: Assemble JavaScript into code variable.
  console.log("check: "+dropdown_brokenornot);
  console.log(statements_do);
  
  var code = "while(true){\n"+statements_do+"}";
  var checkInput = dropdown_brokenornot === "BROKEN";
  console.log("check2: "+checkInput);
  
  if(statements_do && !checkInput){
	  code = "while(" +"checkWall()" +"){\n"+statements_do+"}";
  }else if(statements_do && checkInput) {
	  code = "while(false){\n"+statements_do+"}";
  }else{
	  code = "while(true){\ngoRightBlock();\ngoLeftBlock();}";
  }
  console.log(code);
  return code;
};

Blockly.JavaScript['repeat_until'] = function(block) {
  var dropdown_brokenornot = block.getFieldValue('brokenOrNot');
  var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
  // TODO: Assemble JavaScript into code variable.
  console.log("check: "+dropdown_brokenornot);
  console.log(statements_do);
  
  var code = "while(true){\n"+statements_do+"}";
  var checkInput = dropdown_brokenornot === "BROKEN";
  console.log("check2: "+checkInput);
  
  if(statements_do && !checkInput){
	  code = "while(false){\n"+statements_do+"}";
  }else if(statements_do && checkInput) {
	  	  code = "while(" +"checkWall()" +"){\n"+statements_do+"}";
  }else{
	  code = "while(true){\ngoRightBlock();\ngoLeftBlock();}";
  }
  console.log(code);
  return code;
};


Blockly.JavaScript['star_color'] = function(block) {
  var colour_starcolor = block.getFieldValue('COLOUR');

  // TODO: Assemble JavaScript into code variable.
  console.log(colour_starcolor);
   
  var code = false;
  
  if( String(colour_starcolor) === '#ff0000')
   {
	   code = "checkStarsOverlap("+1+")";
   }else if(String(colour_starcolor) === '#008000') {
	   code = "checkStarsOverlap("+2+")";
   }else {
	   code = "checkStarsOverlap("+3+")";
   }
   
  
 
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

function initInterpreterCheckStarOverlap(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('checkStarsOverlap');
  var wrapper = interpreter.createNativeFunction(
    function(x, callback) {
      if(x === 1 && starColorOverlap === 'red'){
			console.log("trueeeeeee");
			return true;
		}else {
			console.log("falseeeeee");
			return false;
		}
    });
  interpreter.setProperty(scope, 'checkStarsOverlap', wrapper);
}




Blockly.JavaScript['collect_star'] = function(block) {
  var colour_starcolor = block.getFieldValue('COLOUR');
  // TODO: Assemble JavaScript into code variable.
  var code = '\n';
  
  if( String(colour_starcolor) === '#ff0000')
   {
	   code = "collectColorfulStar("+1+");\n";
   }else if(String(colour_starcolor) === '#008000') {
	   code = "collectColorfulStar("+2+");\n";
   }else {
	   code = "collectColorfulStar("+3+");\n";
   }
  return code;
};

function initInterpreterCollectColorfulStar(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('collectColorfulStar');
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
		setTimeout(function(){ 
              if(x === 1){
				collectColorfulStar = 'red';
				console.log("Color:" + collectColorfulStar);
			}
            callback(); },  1000);
    });
  interpreter.setProperty(scope, 'collectColorfulStar', wrapper);
}

function initInterpreterCheckWall(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('checkWallExist');
  var wrapper = interpreter.createAsyncFunction(
    function(callback) {
      console.log("22222222: "+wallIsBroken);
          setTimeout(function(){ 
            // next stop moving to the left
            
            callback(); },  500);

		return wallIsBroken;
    });
  interpreter.setProperty(scope, 'checkWallExist', wrapper);
}





function goRight() {
  player.setVelocityX(100);
  player.anims.play('right', true);

}

function goLeft() {
  player.setVelocityX(-100);
  player.anims.play('left', true);
}


/* added this function for easy testing */
