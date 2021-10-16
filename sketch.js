var database;
var play, playimg;
var playerReal;
var gameState = 'start';
var playerNumber;
var objective, objectiveimg;
var playerNumbertemp;
var grid, gridimg;
var square, squareimg;
var down, right, up, left;
var downimg, rightimg, upimg, leftimg;
var locationTracker;
var moveOnce;
var movedTracker;
var shotTracker;
var characterTracker;
var OPlocationTracker;
var OPhealthTracker;
var ifshotTracker;
var OPifshotTracker;
var OPmovedTracker;
var alertTracker;
var OPcharacterTracker;
var healthTracker;
var endturnlock;
var lockTracker;

var OPcood;

var downS, rightS, upS, leftS;
var downimgS, rightimgS, upimgS, leftimgS;

var shotgun, soldier, tank, bomber, ranger, scouter, enforcer;
var shotgunimg, soldierimg, tankimg, bomberimg, rangerimg, scouterimg, enforcerimg;
var picker, pickerimg;
var pickvalue;




function preload() {

  playimg = loadImage('images/Play.png');
  objectiveimg = loadImage('images/EndTurnB.png');
  gridimg = loadImage('images/Grid.png');
  squareimg = loadImage('images/Player.png');
  downimg = loadImage('images/Down.png');
  rightimg = loadImage('images/Right.png');
  upimg = loadImage('images/Up.png');
  leftimg = loadImage('images/Left.png');

  downimgS = loadImage('images/Down.png');
  rightimgS = loadImage('images/Right.png');
  upimgS = loadImage('images/Up.png');
  leftimgS = loadImage('images/Left.png');

  shotgunimg = loadImage('images/Shotgun.png');
  rangerimg = loadImage('images/Ranger.png');
  bomberimg = loadImage('images/Bomber.png');
  soldierimg = loadImage('images/Soldier.png');
  tankimg = loadImage('images/Tank.png');
  scouterimg = loadImage('images/Scouter.png');
  enforcerimg = loadImage('images/Enforcer.png');
  pickerimg = loadImage('images/Player.png');

}

function setup(){

  canvas = createCanvas(1600,750);
  
  
  play = createSprite(800,175,200,200);
  play.addImage(playimg);
  play.scale = 1;

  objective = createSprite(1400,100,200,200);
  objective.addImage(objectiveimg);
  objective.scale = 1;
  objective.visible = false;

  grid = createSprite(800,400,200,200);
  grid.addImage(gridimg);
  grid.scale = 1;
  grid.visible = false;

  square = createSprite(590,630,200,200);
  square.addImage(squareimg);
  square.scale = 1;
  square.visible = false;

  down = createSprite(300,100,200,200);
  down.addImage(downimg);
  down.scale = 0.3;
  down.visible = false;

  up = createSprite(100,100,200,200);
  up.addImage(upimg);
  up.scale = 0.3;
  up.visible = false;

  left = createSprite(100,200,200,200);
  left.addImage(leftimg);
  left.scale = 0.3;
  left.visible = false;

  right = createSprite(300,200,200,200);
  right.addImage(rightimg);
  right.scale = 0.3;
  right.visible = false;

  downS = createSprite(300,500,200,200);
  downS.addImage(downimgS);
  downS.scale = 0.3;
  downS.visible = false;

  upS = createSprite(100,500,200,200);
  upS.addImage(upimgS);
  upS.scale = 0.3;
  upS.visible = false;

  leftS = createSprite(100,600,200,200);
  leftS.addImage(leftimgS);
  leftS.scale = 0.3;
  leftS.visible = false;

  rightS = createSprite(300,600,200,200);
  rightS.addImage(rightimgS);
  rightS.scale = 0.3;
  rightS.visible = false;

  shotgun = createSprite(400, 200, 200,200);
  shotgun.addImage(shotgunimg);
  shotgun.scale = 0.3;
  shotgun.visible = true;

  soldier = createSprite(400, 100, 200,200);
  soldier.addImage(soldierimg);
  soldier.scale = 0.3;
  soldier.visible = true;

  tank = createSprite(400, 300, 200,200);
  tank.addImage(tankimg);
  tank.scale = 0.3;
  tank.visible = true;

  ranger = createSprite(400, 400, 200,200);
  ranger.addImage(rangerimg);
  ranger.scale = 0.3;
  ranger.visible = true;

  bomber = createSprite(400, 500, 200,200);
  bomber.addImage(bomberimg);
  bomber.scale = 0.3;
  bomber.visible = true;

  scouter = createSprite(400, 600, 200,200);
  scouter.addImage(scouterimg);
  scouter.scale = 0.3;
  scouter.visible = true;

  enforcer = createSprite(400, 700, 200,200);
  enforcer.addImage(enforcerimg);
  enforcer.scale = 0.3;
  enforcer.visible = true;

  picker = createSprite(250, 105, 200,200);
  picker.addImage(pickerimg);
  picker.scale = 0.5;
  picker.visible = true;

  playerNumbertemp = 0;

  movedTracker = 0;

  pickvalue = 1;

  endturnlock = 0;

  database = firebase.database();
}

function draw(){

  background('grey');

  drawSprites();

  constUpdate();
  constUpdate2();
  constUpdate3();
  constUpdate4();
  constUpdate5();
  constUpdate6();
  constUpdate7();
  constUpdate8();
  constUpdate9();
  constUpdate10();
  constUpdate11();
  constUpdate12();
  constUpdate13();

  dead();

  if (gameState === 'start') {

    playPressed();
    pickerf();
    textSize(20);
    fill('black');
    text("Press P to play", 740, 260);

  }

  if (gameState === 'play') {

    turn();
    hit();
    convert();

  }

  if (movedTracker === false) {

    textSize(20);
    fill('black');

    text("Press U", 50, 60);
    text("Press D", 250, 60);
    text("Press L", 50, 245);
    text("Press R", 250, 245);
    text("MOVE BUTTONS", 100, 20);

  }

  if (movedTracker === true) {

    right.visible = false;
    up.visible = false;
    down.visible = false;
    left.visible = false;

  }

  if (shotTracker === false) {

    textSize(20);
    fill('black');

    text("Press P", 50, 460);
    text("Press O", 250, 460);
    text("Press F", 50, 645);
    text("Press I", 250, 645);
    text("SHOOT BUTTONS", 100, 420);

  }

  if (shotTracker === true) {

    rightS.visible = false;
    upS.visible = false;
    downS.visible = false;
    leftS.visible = false;

  }

  

  


}

function pickerf() {

  if (keyWentDown(DOWN_ARROW)) {

    if (pickvalue === 7) {

      picker.y = 105;
      pickvalue = 1;
      
    }

    else {
      pickvalue = pickvalue + 1;
      picker.y = picker.y+100;
    }

  }

  if (keyWentDown(UP_ARROW)) {

    if (pickvalue === 1) {

      picker.y = 705;
      pickvalue = 7;
      
    }
    else {
      pickvalue = pickvalue - 1;
      picker.y = picker.y-100;
    }

  }

}

function constUpdate() {

  database.ref('info/player').on("value",(data) => {

    playerReal = data.val();
    
  });

}

function constUpdate2() {

  if (playerNumber === 1) {
    database.ref('info/player1/location').on("value",(data) => {

      locationTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player2/location').on("value",(data) => {

      locationTracker = data.val();
      
    });

  }

}

function constUpdate3() {

  if (playerNumber === 1) {
    database.ref('info/player1/moved').on("value",(data) => {

      movedTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player2/moved').on("value",(data) => {

      movedTracker = data.val();
      
    });

  }


}

function constUpdate4() {

  if (playerNumber === 1) {
    database.ref('info/player1/shot').on("value",(data) => {

      shotTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player2/shot').on("value",(data) => {

      shotTracker = data.val();
      
    });

  }

}

function constUpdate5() {

  if (playerNumber === 1) {
    database.ref('info/player1/character').on("value",(data) => {

      characterTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player2/character').on("value",(data) => {

      characterTracker = data.val();
      
    });

  }

}

function constUpdate6() {

  if (playerNumber === 1) {
    database.ref('info/player2/location').on("value",(data) => {

      OPlocationTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player1/location').on("value",(data) => {

      OPlocationTracker = data.val();
      
    });

  }

}

function constUpdate7() {

  if (playerNumber === 1) {
    database.ref('info/player2/health').on("value",(data) => {

      OPhealthTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player1/health').on("value",(data) => {

      OPhealthTracker = data.val();
      
    });

  }

}

function constUpdate8() {

  if (playerNumber === 1) {
    database.ref('info/player2/ifshot').on("value",(data) => {

      OPifshotTracker = data.val();
      
    });
    database.ref('info/player1/ifshot').on("value",(data) => {

      ifshotTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player1/ifshot').on("value",(data) => {

      OPifshotTracker = data.val();
      
    });
    database.ref('info/player2/ifshot').on("value",(data) => {

      ifshotTracker = data.val();
      
    });

  }

}

function constUpdate9() {

  if (playerNumber === 1) {
    database.ref('info/player2/moved').on("value",(data) => {

      OPmovedTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player1/moved').on("value",(data) => {

      OPmovedTracker = data.val();
      
    });

  }

}

function constUpdate10() {

  if (playerNumber === 1) {
    database.ref('info/player1/alert').on("value",(data) => {

      alertTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player2/alert').on("value",(data) => {

      alertTracker = data.val();
      
    });

  }

}

function constUpdate11() {

  if (playerNumber === 1) {
    database.ref('info/player2/character').on("value",(data) => {

      OPcharacterTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player1/character').on("value",(data) => {

      OPcharacterTracker = data.val();
      
    });

  }

}

function constUpdate12() {

  if (playerNumber === 1) {
    database.ref('info/player1/health').on("value",(data) => {

      healthTracker = data.val();
      
    });
  }

  if (playerNumber === 2) {

    database.ref('info/player2/health').on("value",(data) => {

      healthTracker = data.val();
      
    });

  }

}

function constUpdate13() {

  database.ref('info/lock').on("value",(data) => {

    lockTracker = data.val();
      
  });
}

function playPressed() {

  if (keyWentDown('p')) {

    if (lockTracker === false) {

      play.visible = false;
      shotgun.visible = false;
      ranger.visible = false;
      tank.visible = false;
      bomber.visible = false;
      soldier.visible = false;
      picker.visible = false;
      scouter.visible = false;
      enforcer.visible = false;

      database.ref('info/player').on("value",(data) => {

        playerNumbertemp = data.val();
        
      });

      playerNumber = playerNumbertemp;

      database.ref('info/').update({

        player: playerReal+1

      });

      if (playerReal === 3) {

        database.ref('info/').update({

          player: 1,
          lock: true

        });

      }

      gameState = 'play';

      if (playerNumber === 1) {

        square.x = 590;
        square.y = 630;
        if (pickvalue === 1) {
          database.ref('info/player1/').update({

            character: 'soldier'

          });
        }
        if (pickvalue === 2) {
          database.ref('info/player1/').update({

            character: 'shotgun'

          });
        }
        if (pickvalue === 3) {
          database.ref('info/player1/').update({

            character: 'tank',
            health: 5

          });
        }
        if (pickvalue === 4) {
          database.ref('info/player1/').update({

            character: 'ranger'

          });
        }
        if (pickvalue === 5) {
          database.ref('info/player1/').update({

            character: 'bomber'

          });
        }
        if (pickvalue === 6) {
          database.ref('info/player1/').update({

            character: 'scouter'

          });
        }
        if (pickvalue === 7) {
          database.ref('info/player1/').update({

            character: 'enforcer'

          });
        }

      }

      if (playerNumber === 2) {

        square.x = 1095;
        square.y = 127;
        if (pickvalue === 1) {
          database.ref('info/player2/').update({

            character: 'soldier'

          });
        }
        if (pickvalue === 2) {
          database.ref('info/player2/').update({

            character: 'shotgun'

          });
        }
        if (pickvalue === 3) {
          database.ref('info/player2/').update({

            character: 'tank',
            health: 5

          });
        }
        if (pickvalue === 4) {
          database.ref('info/player2/').update({

            character: 'ranger'

          });
        }
        if (pickvalue === 5) {
          database.ref('info/player2/').update({

            character: 'bomber'

          });
        }
        if (pickvalue === 6) {
          database.ref('info/player2/').update({

            character: 'scouter'

          });
        }
        if (pickvalue === 7) {
          database.ref('info/player2/').update({

            character: 'enforcer'

          });
        }

      }

    }

  }

}

function turn() {

  if (playerNumber === playerReal) {

    if (movedTracker === false) {

      move();
      right.visible = true;
      up.visible = true;
      down.visible = true;
      left.visible = true;

    }

    if (shotTracker === false) {

      shot();
      rightS.visible = true;
      upS.visible = true;
      downS.visible = true;
      leftS.visible = true;

    }

    textSize(20);
    fill('black');
    text("Press E to end turn", 1325, 150);
    objective.visible = true;
    grid.visible = true;
    square.visible = true;
    moveOffMap();
    textSize(40);
    fill('blue');
    text(characterTracker+": "+healthTracker,1300, 500);
    textSize(40);
    fill('red');
    text(OPcharacterTracker+": "+OPhealthTracker,1300, 600);
   

    gameState = "play";
  
    if (keyWentDown('e')) {

      if (endturnlock === 1) {


        if (playerNumber === 1) {

          database.ref('info/').update({

            player: 2
    
          });

          database.ref('info/player1/').update({

            moved: true

          });

          database.ref('info/player2/').update({

            moved: false

          });

          database.ref('info/player1/').update({

            shot: true

          });

          database.ref('info/player2/').update({

            shot: false

          });

        }

        if (playerNumber === 2) {

          database.ref('info/').update({

            player: 1
    
          });

          database.ref('info/player2/').update({

            moved: true

          });

          database.ref('info/player1/').update({

            moved: false

          });

          database.ref('info/player2/').update({

            shot: true

          });

          database.ref('info/player1/').update({

            shot: false

          });

        }

        endturnlock = 0;

      }

    }

    

  }

  if (playerNumber !== playerReal) {

    objective.visible = false;
    grid.visible = false;
    square.visible = false;

    right.visible = false;
    up.visible = false;
    down.visible = false;
    left.visible = false;

    rightS.visible = false;
    upS.visible = false;
    downS.visible = false;
    leftS.visible = false;
    

  }



}

function move() {

  if (keyWentDown('w')) {

    endturnlock = 1;

    right.visible = false;
    up.visible = false;
    down.visible = false;
    left.visible = false;

    square.y = square.y-84;

    if (playerNumber === 1) {
      database.ref('info/player1/').update({

        location: locationTracker - 1

      });

      database.ref('info/player1/').update({

        moved: true

      });
    }

    if (playerNumber === 2) {
      database.ref('info/player2/').update({

        location: locationTracker - 1

      });

      database.ref('info/player2/').update({

        moved: true

      });
    }

  }

  if (keyWentDown('s')) {

    endturnlock = 1;

    right.visible = false;
    up.visible = false;
    down.visible = false;
    left.visible = false;

    square.y = square.y+84;
    if (playerNumber === 1) {
      database.ref('info/player1/').update({

        location: locationTracker + 1

      });

      database.ref('info/player1/').update({

        moved: true

      });
    }

    if (playerNumber === 2) {
      database.ref('info/player2/').update({

        location: locationTracker + 1

      });

      database.ref('info/player2/').update({

        moved: true

      });
    }

    
    

  }

  if (keyWentDown('d')) {

    endturnlock = 1;

    right.visible = false;
    up.visible = false;
    down.visible = false;
    left.visible = false;

    square.x = square.x+84;
    if (playerNumber === 1) {
      database.ref('info/player1/').update({

        location: locationTracker + 10 

      });
      database.ref('info/player1/').update({

        moved: true

      });
    }

    if (playerNumber === 2) {
      database.ref('info/player2/').update({

        location: locationTracker + 10

      });
      database.ref('info/player2/').update({

        moved: true

      });
    }

    
    

  }

  if (keyWentDown('a')) {

    endturnlock = 1;

    right.visible = false;
    up.visible = false;
    down.visible = false;
    left.visible = false;

    square.x = square.x-84;
    if (playerNumber === 1) {
      database.ref('info/player1/').update({

        location: locationTracker - 10

      });
      database.ref('info/player1/').update({

        moved: true

      });
    }

    if (playerNumber === 2) {
      database.ref('info/player2/').update({

        location: locationTracker - 10

      });
      database.ref('info/player2/').update({

        moved: true

      });
    }
  }

}

function shot() {

  if (characterTracker === "soldier") {

    if (playerNumber === 1) {

      if (keyWentDown('p')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker - 2;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = locationTracker + 2;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = locationTracker - 20;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = locationTracker + 20;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }

    if (playerNumber === 2) {

      if (keyWentDown('p')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker - 2;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = locationTracker + 2;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = locationTracker - 20;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = locationTracker + 20;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }

  }

  //================================================================

  if (characterTracker === "shotgun") {

    if (playerNumber === 1) {

      if (keyWentDown('p')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = (locationTracker - 1) + 10;
        var tile3 = (locationTracker - 1) - 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = (locationTracker + 1) + 10;
        var tile3 = (locationTracker + 1) - 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = (locationTracker - 10) + 1;
        var tile3 = (locationTracker - 10) - 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = (locationTracker + 10) + 1;
        var tile3 = (locationTracker + 10) - 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }

    if (playerNumber === 2) {

      if (keyWentDown('p')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = (locationTracker - 1) + 10;
        var tile3 = (locationTracker - 1) - 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = (locationTracker + 1) + 10;
        var tile3 = (locationTracker + 1) - 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = (locationTracker - 10) + 1;
        var tile3 = (locationTracker - 10) - 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = (locationTracker + 10) + 1;
        var tile3 = (locationTracker + 10) - 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-2
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+2
    
          });
          alert("You have hit the opponent for 2 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }

  }

  //========================================================================================

  if (characterTracker === "ranger") {

    if (playerNumber === 1) {

      if (keyWentDown('p')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker - 2;
        var tile3 = locationTracker - 3;
        var tile4 = locationTracker - 4;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = locationTracker + 2;
        var tile3 = locationTracker + 3;
        var tile4 = locationTracker + 4;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = locationTracker - 20;
        var tile3 = locationTracker - 30;
        var tile4 = locationTracker - 40;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = locationTracker + 20;
        var tile3 = locationTracker + 30;
        var tile4 = locationTracker + 40;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }

    if (playerNumber === 2) {

      if (keyWentDown('p')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker - 2;
        var tile3 = locationTracker - 3;
        var tile4 = locationTracker - 4;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = locationTracker + 2;
        var tile3 = locationTracker + 3;
        var tile4 = locationTracker + 4;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = locationTracker - 20;
        var tile3 = locationTracker - 30;
        var tile4 = locationTracker - 40;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = locationTracker + 20;
        var tile3 = locationTracker + 30;
        var tile4 = locationTracker + 40;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile4 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }

  }

  //======================================================================================

  if (characterTracker === "tank") {

    if (playerNumber === 1) {

      if (keyWentDown('p')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker - 10;
        var tile3 = locationTracker + 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = locationTracker + 10;
        var tile3 = locationTracker - 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = locationTracker - 1;
        var tile3 = locationTracker + 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = locationTracker + 1;
        var tile3 = locationTracker - 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }

    if (playerNumber === 2) {

      if (keyWentDown('p')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker - 10;
        var tile3 = locationTracker + 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = locationTracker + 10;
        var tile3 = locationTracker - 10;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }
 
      }

      if (keyWentDown('f')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = locationTracker - 1;
        var tile3 = locationTracker + 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = locationTracker + 1;
        var tile3 = locationTracker - 1;

        if (tile1 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (tile2 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else if (tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

    }
      
  }

  //=====================================================================================

  if (characterTracker === "bomber") {

    if (playerNumber === 1) {

      if (keyWentDown('p') || keyWentDown('o') || keyWentDown('f') || keyWentDown('i')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker + 1;
        var tile3 = locationTracker - 10;
        var tile4 = locationTracker + 10;
        var tile5 = locationTracker - 1 - 10;
        var tile6 = locationTracker + 1 + 10;
        var tile7 = locationTracker - 10 + 1;
        var tile8 = locationTracker + 10 - 1;
        
        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker || tile4 === OPlocationTracker || tile5 === OPlocationTracker || tile6 === OPlocationTracker || tile7 === OPlocationTracker || tile8 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }   
        
    }

    if (playerNumber === 2) {

      if (keyWentDown('p') || keyWentDown('o') || keyWentDown('f') || keyWentDown('i')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = locationTracker + 1;
        var tile3 = locationTracker - 10;
        var tile4 = locationTracker + 10;
        var tile5 = locationTracker - 1 - 10;
        var tile6 = locationTracker + 1 + 10;
        var tile7 = locationTracker - 10 + 1;
        var tile8 = locationTracker + 10 - 1;
        
        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker || tile4 === OPlocationTracker || tile5 === OPlocationTracker || tile6 === OPlocationTracker || tile7 === OPlocationTracker || tile8 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }   
        
    }

  }

  //====================================================================================
 
  if (characterTracker === 'scouter') {

    if (playerNumber === 1) {

      if (keyWentDown('p')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = (locationTracker - 2) + 10;
        var tile3 = (locationTracker - 2) - 10;
        var rtile1 = locationTracker - 3;
        var rtile2 = (locationTracker - 3) + 10;
        var rtile3 = (locationTracker - 3) - 10;
        var rtile4 = (locationTracker - 4) + 10;
        var rtile5 = (locationTracker - 4) - 10;
        var rtile6 = (locationTracker - 4) + 20;
        var rtile7 = (locationTracker - 4) - 20;


        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = (locationTracker + 2) + 10;
        var tile3 = (locationTracker + 2) - 10;
        var rtile1 = locationTracker + 3;
        var rtile2 = (locationTracker + 3) + 10;
        var rtile3 = (locationTracker + 3) - 10;
        var rtile4 = (locationTracker + 4) + 10;
        var rtile5 = (locationTracker + 4) - 10;
        var rtile6 = (locationTracker + 4) + 20;
        var rtile7 = (locationTracker + 4) - 20;


        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }
    
      }

      if (keyWentDown('f')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = (locationTracker - 20) + 1;
        var tile3 = (locationTracker - 20) - 1;
        var rtile1 = locationTracker - 30;
        var rtile2 = (locationTracker - 30) + 1;
        var rtile3 = (locationTracker - 30) - 1;
        var rtile4 = (locationTracker - 40) + 1;
        var rtile5 = (locationTracker - 40) - 1;
        var rtile6 = (locationTracker - 40) + 2;
        var rtile7 = (locationTracker - 40) - 2;


        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player1/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = (locationTracker + 20) + 1;
        var tile3 = (locationTracker + 20) - 1;
        var rtile1 = locationTracker + 30;
        var rtile2 = (locationTracker + 30) + 1;
        var rtile3 = (locationTracker + 30) - 1;
        var rtile4 = (locationTracker + 40) + 1;
        var rtile5 = (locationTracker + 40) - 1;
        var rtile6 = (locationTracker + 40) + 2;
        var rtile7 = (locationTracker + 40) - 2;
        
        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player2/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player1/').update({

            ifshot: ifshotTracker+10
    
          });

        }
        
      }

    }

    if (playerNumber === 2) {

      if (keyWentDown('p')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 1;
        var tile2 = (locationTracker - 2) + 10;
        var tile3 = (locationTracker - 2) - 10;
        var rtile1 = locationTracker - 3;
        var rtile2 = (locationTracker - 3) + 10;
        var rtile3 = (locationTracker - 3) - 10;
        var rtile4 = (locationTracker - 4) + 10;
        var rtile5 = (locationTracker - 4) - 10;
        var rtile6 = (locationTracker - 4) + 20;
        var rtile7 = (locationTracker - 4) - 20;


        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('o')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 1;
        var tile2 = (locationTracker + 2) + 10;
        var tile3 = (locationTracker + 2) - 10;
        var rtile1 = locationTracker + 3;
        var rtile2 = (locationTracker + 3) + 10;
        var rtile3 = (locationTracker + 3) - 10;
        var rtile4 = (locationTracker + 4) + 10;
        var rtile5 = (locationTracker + 4) - 10;
        var rtile6 = (locationTracker + 4) + 20;
        var rtile7 = (locationTracker + 4) - 20;


        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }
    
      }

      if (keyWentDown('f')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker - 10;
        var tile2 = (locationTracker - 20) + 1;
        var tile3 = (locationTracker - 20) - 1;
        var rtile1 = locationTracker - 30;
        var rtile2 = (locationTracker - 30) + 1;
        var rtile3 = (locationTracker - 30) - 1;
        var rtile4 = (locationTracker - 40) + 1;
        var rtile5 = (locationTracker - 40) - 1;
        var rtile6 = (locationTracker - 40) + 2;
        var rtile7 = (locationTracker - 40) - 2;


        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player2').update({

            ifshot: ifshotTracker+10
    
          });

        }

      }

      if (keyWentDown('i')) {

        database.ref('info/player2/').update({

          shot: true
  
        });

        var tile1 = locationTracker + 10;
        var tile2 = (locationTracker + 20) + 1;
        var tile3 = (locationTracker + 20) - 1;
        var rtile1 = locationTracker + 30;
        var rtile2 = (locationTracker + 30) + 1;
        var rtile3 = (locationTracker + 30) - 1;
        var rtile4 = (locationTracker + 40) + 1;
        var rtile5 = (locationTracker + 40) - 1;
        var rtile6 = (locationTracker + 40) + 2;
        var rtile7 = (locationTracker + 40) - 2;
        
        if (tile1 === OPlocationTracker || tile2 === OPlocationTracker || tile3 === OPlocationTracker) {

          database.ref('info/player1/').update({

            health: OPhealthTracker-1
    
          });
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+1
    
          });
          alert("You have hit the opponent for 1 damage");
          
        }

        else if (rtile1 === OPlocationTracker || rtile2 === OPlocationTracker || rtile3 === OPlocationTracker || rtile4 === OPlocationTracker || rtile5 === OPlocationTracker || rtile6 === OPlocationTracker || rtile7 === OPlocationTracker) {

          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });
          alert("You have revealed the opponent, the opponent is at "+OPcood);

        }

        else {

          alert("You have missed");
          database.ref('info/player2/').update({

            ifshot: ifshotTracker+10
    
          });

        }
        
      }

    }

  }

  //====================================================================================

  if (characterTracker === "enforcer") {



  }

}

function dead() {

  if (OPhealthTracker < 1) {

    alert("YOU WON!, Please reload the page to play again.");
    database.ref('info/').update({

      player: 1,
      lock: false
      
    });
    database.ref('info/player1/').update({

      character: "soldier",
      health: 3,
      ifshot: 0,
      location: 17,
      moved: false,
      shot: false,
      alert: false

    });
    database.ref('info/player2/').update({

      character: "soldier",
      health: 3,
      ifshot: 0,
      location: 71,
      moved: true,
      shot: true,
      alert: false

    });

  }

  if (healthTracker < 1) {

    alert("You Lost, Please reload the page to play again.");

  }
    
}




function hit() {

  if (playerNumber === 1) {
 
    if (OPifshotTracker === 1) {

      database.ref('info/player2/').update({

        ifshot: 0

      });

      if (OPmovedTracker === true) {
        alert("You took 1 damage, opponent moved and is now at "+OPcood);
      }
      if (OPmovedTracker === false) {
        alert("You took 1 damage, opponent was at "+OPcood);
      }
    }

    if (OPifshotTracker === 2) {

      database.ref('info/player2/').update({

        ifshot: 0

      });
      if (OPmovedTracker === true) {
        alert("You took 2 damage, opponent moved and is now at "+OPcood);
      }
      if (OPmovedTracker === false) {
        alert("You took 2 damage, opponent was at "+OPcood);
      }
      
    }

    if (OPifshotTracker === 10) {

      database.ref('info/player2/').update({

        ifshot: 0

      });
      if (OPmovedTracker === true) {
        alert("You took 0 damage, opponent moved and is now at "+OPcood);
      }
      if (OPmovedTracker === false) {
        alert("You took 0 damage, opponent was at "+OPcood);
      }
      
    }

  }
  
  if (playerNumber === 2) {
 
    if (OPifshotTracker === 1) {

      database.ref('info/player1/').update({

        ifshot: 0

      });
      if (OPmovedTracker === true) {
        alert("You took 1 damage, opponent moved and is now at "+OPcood);
      }
      if (OPmovedTracker === false) {
        alert("You took 1 damage, opponent was at "+OPcood);
      }
    
    }

    if (OPifshotTracker === 2) {

      database.ref('info/player1/').update({

        ifshot: 0

      });
      if (OPmovedTracker === true) {
        alert("You took 2 damage, opponent moved and is now at "+OPcood);
      }
      if (OPmovedTracker === false) {
        alert("You took 2 damage, opponent was at "+OPcood);
      }
      
    }

    if (OPifshotTracker === 10) {

      database.ref('info/player1/').update({

        ifshot: 0

      });
      if (OPmovedTracker === true) {
        alert("You took 0 damage, opponent moved and is now at "+OPcood);
      }
      if (OPmovedTracker === false) {
        alert("You took 0 damage, opponent was at "+OPcood);
      }
      
    }

  }

}

//======================================================================================

function convert() {

  if (OPlocationTracker === 11) {
    OPcood = 'A1'
  }
  if (OPlocationTracker === 12) {
    OPcood = 'A2'
  }
  if (OPlocationTracker === 13) {
    OPcood = 'A3'
  }
  if (OPlocationTracker === 14) {
    OPcood = 'A4'
  }
  if (OPlocationTracker === 15) {
    OPcood = 'A5'
  }
  if (OPlocationTracker === 16) {
    OPcood = 'A6'
  }
  if (OPlocationTracker === 17) {
    OPcood = 'A7'
  }

  if (OPlocationTracker === 21) {
    OPcood = 'B1'
  }
  if (OPlocationTracker === 22) {
    OPcood = 'B2'
  }
  if (OPlocationTracker === 23) {
    OPcood = 'B3'
  }
  if (OPlocationTracker === 24) {
    OPcood = 'B4'
  }
  if (OPlocationTracker === 25) {
    OPcood = 'B5'
  }
  if (OPlocationTracker === 26) {
    OPcood = 'B6'
  }
  if (OPlocationTracker === 27) {
    OPcood = 'B7'
  }

  if (OPlocationTracker === 31) {
    OPcood = 'C1'
  }
  if (OPlocationTracker === 32) {
    OPcood = 'C2'
  }
  if (OPlocationTracker === 33) {
    OPcood = 'C3'
  }
  if (OPlocationTracker === 34) {
    OPcood = 'C4'
  }
  if (OPlocationTracker === 35) {
    OPcood = 'C5'
  }
  if (OPlocationTracker === 36) {
    OPcood = 'C6'
  }
  if (OPlocationTracker === 37) {
    OPcood = 'C7'
  }

  if (OPlocationTracker === 41) {
    OPcood = 'D1'
  }
  if (OPlocationTracker === 42) {
    OPcood = 'D2'
  }
  if (OPlocationTracker === 43) {
    OPcood = 'D3'
  }
  if (OPlocationTracker === 44) {
    OPcood = 'D4'
  }
  if (OPlocationTracker === 45) {
    OPcood = 'D5'
  }
  if (OPlocationTracker === 46) {
    OPcood = 'D6'
  }
  if (OPlocationTracker === 47) {
    OPcood = 'D7'
  }

  if (OPlocationTracker === 51) {
    OPcood = 'E1'
  }
  if (OPlocationTracker === 52) {
    OPcood = 'E2'
  }
  if (OPlocationTracker === 53) {
    OPcood = 'E3'
  }
  if (OPlocationTracker === 54) {
    OPcood = 'E4'
  }
  if (OPlocationTracker === 55) {
    OPcood = 'E5'
  }
  if (OPlocationTracker === 56) {
    OPcood = 'E6'
  }
  if (OPlocationTracker === 57) {
    OPcood = 'E7'
  }

  if (OPlocationTracker === 61) {
    OPcood = 'F1'
  }
  if (OPlocationTracker === 62) {
    OPcood = 'F2'
  }
  if (OPlocationTracker === 63) {
    OPcood = 'F3'
  }
  if (OPlocationTracker === 64) {
    OPcood = 'F4'
  }
  if (OPlocationTracker === 65) {
    OPcood = 'F5'
  }
  if (OPlocationTracker === 66) {
    OPcood = 'F6'
  }
  if (OPlocationTracker === 67) {
    OPcood = 'F7'
  }

  if (OPlocationTracker === 71) {
    OPcood = 'G1'
  }
  if (OPlocationTracker === 72) {
    OPcood = 'G2'
  }
  if (OPlocationTracker === 73) {
    OPcood = 'G3'
  }
  if (OPlocationTracker === 74) {
    OPcood = 'G4'
  }
  if (OPlocationTracker === 75) {
    OPcood = 'G5'
  }
  if (OPlocationTracker === 76) {
    OPcood = 'G6'
  }
  if (OPlocationTracker === 77) {
    OPcood = 'G7'
  }



}

//======================================================================================

function moveOffMap() {

  if (locationTracker > 0 && locationTracker < 8) {

    if (playerNumber === 1) {

      square.x = square.x+84;

      database.ref('info/player1/').update({

        location: locationTracker + 10

      });

      database.ref('info/player1/').update({

        moved: false

      });

    }

    if (playerNumber === 2) {

      square.x = square.x+84;

      database.ref('info/player2/').update({

        location: locationTracker + 10

      });

      database.ref('info/player2/').update({

        moved: false

      });

    }
    
  }

  if (locationTracker > 80 && locationTracker < 88) {

    if (playerNumber === 1) {

      square.x = square.x-84;

      database.ref('info/player1/').update({

        location: locationTracker - 10

      });

      database.ref('info/player1/').update({

        moved: false

      });

    }

    if (playerNumber === 2) {

      square.x = square.x-84;

      database.ref('info/player2/').update({

        location: locationTracker - 10

      });

      database.ref('info/player2/').update({

        moved: false

      });

    }

  }

  if (locationTracker < 71 && locationTracker > 9 && locationTracker % 10 === 0) {

    if (playerNumber === 1) {

      square.y = square.y+84;

      database.ref('info/player1/').update({

        location: locationTracker + 1

      });

      database.ref('info/player1/').update({

        moved: false

      });

    }

    if (playerNumber === 2) {

      square.y = square.y+84;

      database.ref('info/player2/').update({

        location: locationTracker + 1

      });

      database.ref('info/player2/').update({

        moved: false

      });

    }

  }

  if (locationTracker === 18 || locationTracker === 28 || locationTracker === 38 || locationTracker === 48 || locationTracker === 58 || locationTracker === 68 || locationTracker === 78) {

    if (playerNumber === 1) {

      square.y = square.y-84;

      database.ref('info/player1/').update({

        location: locationTracker - 1

      });

      database.ref('info/player1/').update({

        moved: false

      });

    }

    if (playerNumber === 2) {

      square.y = square.y-84;

      database.ref('info/player2/').update({

        location: locationTracker - 1

      });

      database.ref('info/player2/').update({

        moved: false

      });

    }

  }

}






    

  









