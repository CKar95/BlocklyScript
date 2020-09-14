Blockly.JavaScript['move_left'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'goLeftBlock();\n'; // make sure to keep the \n or it will not work correctly
  return code;
};


function initInterpreterGoLeft(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  
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

Blockly.JavaScript['start_point'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  return code;
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
