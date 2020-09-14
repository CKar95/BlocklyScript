# BlocklyScript: An online educational game for cultivating Computational Thinking skills to young students

![](BlocklyScriptGame/Game/assets/BlocklyGame.png)

## This repository includes:
1. The files of the online game (BlocklyScriptGame)
2. The SQL dump which stores data of player's progression (BlocklyScriptDataBase)

### The BlocklyScriptGame folder
* This folder contains the pages of your BlocklyScript website.
* In order to login to the site open a browser and visit the BlocklyScriptGame/login.php
* From login.php you can login to the home page of the game or redirect to register page where you can create a new account

### The BlocklyScriptDataBase folder
* This folder contais the sql dump (exported database) used for saving user's progression inside the game.
* You will have to create a database and import the id14854195_blocklyscript.sql

### Use phpMyAdmin to create a database and import the id14854195_blocklyscript.sql
* Open phpMyAdmin and create a database
* Select the database you just created and find the import tab on the left panel
* Open the id14854195_blocklyscript.sql and click "Go"
* Done

### Last important step. Connect website with the database
* This step will connect the code of the game with the database
* Go to BlocklyScriptGame/server.php and change the parameters of line 9 "$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');"
* The parameters should match the DB Host, DB User, DB Password, DB Name (in the exact same order) of your own database.
* Afterwards you must change every file that use this mysqli_connect command. Specifically you will have to go to BlocklyScriptGame/Game/ and from there change the LevelX/levelXUpdate.php and LevelX-GR/leveXUpdate.php (X is the number of the level).
* Do this from levels 1 till 11 (level 12 does not require a connection with the database).
* Done. Your site is ready and you can create an account.

### Play the game here: https://blocklyscript.000webhostapp.com/login.php

## Enjoy :)

