
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
  console.log(code);
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


function goRight() {
  player.setVelocityX(100);
  player.anims.play('right', true);

}

function goLeft() {
  player.setVelocityX(-100);
  player.anims.play('left', true);
}


/* added this function for easy testing */
