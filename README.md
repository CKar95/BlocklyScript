# BlocklyScript: An online educational game for cultivating Computational Thinking skills to young students

![](BlocklyScriptGame/Game/assets/BlocklyGame.png)

## This repository includes:
1. The files of the online game (BlocklyScriptGame)
2. The SQL dump which data of player's progression (BlocklyScriptDataBase)

### The BlocklyScriptGame folder
* This folder contains the pages of your BlocklyScript website.
* In order to login to the site open a browser and visit the BlocklyScriptGame/login.php
* From login.php you can login to the home page of the game or redirect to register page where you can create a new account

### The BlocklyScriptDataBase folder
* This folder contais the sql dump (exported database) used for saving user's progression inside the game.
* You will have to create a database and import the id14854195_blocklyscript.sql

### Use phpMyAdmin to create and import the id14854195_blocklyscript.sql
* Open phpMyAdmin and create a database
* Select the database you just created and find the import tab on the left panel
* Open the id14854195_blocklyscript.sql and click "Go"

### Last important step. Connect website with the database
* This step will connect the code of the game with the database
* Go to BlocklyScriptGame/server.php and change the parameters of line 9 "$db = mysqli_connect('localhost', 'root', '', 'blocklyscript');"
* The parameters should match the host name, username, password, databasename

