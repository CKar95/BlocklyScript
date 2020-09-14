Blockly.Blocks['move_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move left")
		.appendField(new Blockly.FieldImage("../assets/arrowLeft.png", 15, 15, { alt: "Left", flipRtl: "FALSE" }));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("Move player to the left.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move right")
		.appendField(new Blockly.FieldImage("../assets/arrowRight.png", 15, 15, { alt: "Right", flipRtl: "FALSE" }));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("Move player to the right.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['start_point'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("START")
		.appendField(new Blockly.FieldImage("../assets/startFlag.png", 15, 15, { alt: "Start", flipRtl: "FALSE" }));
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("This is your starting point");
 this.setHelpUrl("");
  }
};