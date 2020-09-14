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


Blockly.Blocks['move_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("jump")
        .appendField(new Blockly.FieldImage("../assets/arrowUp.png", 15, 15, { alt: "Up", flipRtl: "FALSE" }));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['laser_beam'] = {
  init: function() {
    this.appendValueInput("beamDirection")
        .setCheck("String")
        .appendField("use laser beam")
		.appendField(new Blockly.FieldImage("../assets/beam.png", 15, 15, { alt: "Up", flipRtl: "FALSE" }));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("Use laser beam");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['laser_beamdirection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("shoot beam")
        .appendField(new Blockly.FieldDropdown([["left","LEFT"], ["right","RIGHT"]]), "beamDirection");
    this.setOutput(true, "String");
    this.setColour(345);
 this.setTooltip("Use laser beam");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['wall_exists'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("wall is")
        .appendField(new Blockly.FieldDropdown([["broken","Broken"], ["not broken","NotBroken"]]), "wallOptions");
    this.setOutput(true, "Boolean");
    this.setColour(100);
 this.setTooltip("Give information about the wall");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_while'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repeat while wall is")
        .appendField(new Blockly.FieldDropdown([["broken","BROKEN"], ["not broken","NOTBROKEN"]]), "brokenOrNot");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("repeat while");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_until'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repeat until wall is")
        .appendField(new Blockly.FieldDropdown([["broken","BROKEN"], ["not broken","NOTBROKEN"]]), "brokenOrNot");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("repeat until");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['star_color'] = {
  init: function() {
	  var field = new Blockly.FieldColour('#FF0000');
	  field.setColours(
        ['#FF0000', '#008000', '#0000FF'],
        ['red', 'green', 'blue']);
		field.setColumns(3);
    this.appendDummyInput()
        .appendField("star has:")
        .appendField(field, 'COLOUR')
        .appendField("color");
    this.setOutput(true, "Boolean");
    this.setColour(210);
 this.setTooltip("Check star's color");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['collect_star'] = {
  init: function() {
	  var field = new Blockly.FieldColour('#FF0000');
	  field.setColours(
        ['#FF0000', '#008000', '#0000FF'],
        ['red', 'green', 'blue']);
		field.setColumns(3);
    this.appendDummyInput()
        .appendField("collect ")
        .appendField(field, 'COLOUR')
        .appendField("star");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
 this.setTooltip("Collect colorful star");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['star_hasballon'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("star has balloon on top");
    this.setOutput(true, "Boolean");
    this.setColour(210);
 this.setTooltip("Checks if the star has a balloon on top of it.");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['collect_balloon'] = {
  init: function() {
	var field = new Blockly.FieldColour('#FF0000');
	  field.setColours(
        ['#FF0000', '#008000', '#0000FF'],
        ['red', 'green', 'blue']);
		field.setColumns(3);  
    this.appendDummyInput()
        .appendField("jump and collect ")
		.appendField(field, 'COLOUR')
		.appendField("balloon");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
 this.setTooltip("Jumps and collects the balloon on top of the star");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['open_door'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("open door with password :")
        .appendField(new Blockly.FieldVariable("password"), "getPass");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['restore_stars'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Restore Stars");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

