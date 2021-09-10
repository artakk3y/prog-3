let GrassMulTick = 8 ;

let GrassEaterMulTick = 8;
let GrassEaterEnergyAdd = 1 ;
let GrassEaterEnergyMin = 3 ;
let GrassEaterMulEnergy = 5 ;

let PredatorMulTick = 8;
let PredatorEnergyAdd = 16;
let PredatorEnergyMin = 3;
let PredatorMulEnergy = 5;

let BearMulTick = 8;
let BearEnergyAdd = 3;
let BearEnergyMin = 3;
let BearMulEnergy = 5;

let HunterVsGrass = 3;
let HunterVsGrassEater = 6;
let HunterVsPredator = 1;
let HunterVsBear = 4;



class Grass{
    constructor(x, y, index) {
       this.x = x;
       this.y = y;
       this.index = index;
       this.multiply = 0;
       this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1]
    ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
     
     }
     mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
 
        // console.log(emptyCells);
        if(newCell && this.multiply >= GrassMulTick){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
 
            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
 
 
    
     
}

class GrassEater {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
        this.multiply = 0;
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
     
     }
     mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
 
        // console.log(emptyCells);
        if(newCell && this.multiply >= GrassEaterMulTick && this.energy > GrassEaterMulEnergy ){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
 
            var newGrass = new GrassEater(newX, newY, 2);
            grassEaterArr.push(newGrass);
            this.multiply = 0;
            this.energy -= GrassEaterEnergyMin;
        }
    }
    getNewCoordinates(){
        this.directions = [
     [this.x - 1, this.y - 1],
         [this.x    , this.y - 1],
         [this.x + 1, this.y - 1],
             [this.x - 1, this.y    ],
             [this.x + 1, this.y    ],
             [this.x - 1, this.y + 1],
             [this.x    , this.y + 1],
             [this.x + 1, this.y + 1]
        ];
     }
     move(){
         this.energy--;
         var emptyCells = this.chooseCell(0);
         var newCell = random(emptyCells);
         if (this.energy > 0 && newCell ) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX]= matrix[this.y][this.x];
            matrix[this.y][this.x] =0;
            this.y = newY;
            this.x = newX;
         }
         else {
             this.die()
         }

     }
     eat(){
         var emptyCells = this.chooseCell(1);
         var newCell = random(emptyCells);
         if (newCell) {
             this.energy += GrassEaterEnergyAdd;
             var newX = newCell[0];
             var newY = newCell[1];
             matrix[newY][newX] = matrix[this.y][this.x];
             matrix[this.y][this.x] = 0;
             this.y = newY;
             this.x = newX;

             for (var i in grassArr) {
                 if (newX == grassArr[i].x && newY == grassArr[i].y) {
                     grassArr.splice(i, 1);
                     break;
                 }
             }
         }
         else {
            this.move()
         }
         this.mul ()
     }
    
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
     
     
}

class Predator {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
        this.multiply = 0;
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
     
     }
     mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
 
        // console.log(emptyCells);
        if(newCell && this.multiply >= PredatorMulTick && this.energy > PredatorMulEnergy ){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
 
            var predator = new Predator(newX, newY, 3);
            predatorArr.push(predator);
            this.multiply = 0;
            this.energy -= PredatorEnergyMin;
        }
    }
    getNewCoordinates(){
        this.directions = [
     [this.x - 1, this.y - 1],
         [this.x    , this.y - 1],
         [this.x + 1, this.y - 1],
             [this.x - 1, this.y    ],
             [this.x + 1, this.y    ],
             [this.x - 1, this.y + 1],
             [this.x    , this.y + 1],
             [this.x + 1, this.y + 1]
        ];
     }
     move(){
         this.energy--;
         var emptyCells = this.chooseCell(0);
         var newCell = random(emptyCells);
         if (this.energy > 0 && newCell ) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX]= matrix[this.y][this.x];
            matrix[this.y][this.x] =0;
            this.y = newY;
            this.x = newX;
         }
         else {
             this.die()
         }

     }
     eat(){
         var emptyCells = this.chooseCell(2);
         var newCell = random(emptyCells);
         if (newCell) {
             this.energy += PredatorEnergyAdd;
             var newX = newCell[0];
             var newY = newCell[1];
             matrix[newY][newX] = matrix[this.y][this.x];
             matrix[this.y][this.x] = 0;
             this.y = newY;
             this.x = newX;

             for (var i in grassEaterArr) {
                 if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                     grassEaterArr.splice(i, 1);
                     break;
                 }
             }
         }
         else {
            this.move()
         }
         this.mul ()
     }
    
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
     
     
}

class Bear {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
        this.multiply = 0;
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
     
     }
     mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
 
        
        if(newCell && this.multiply >= BearMulTick && this.energy > BearMulEnergy ){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
 
            var br = new Bear(newX, newY, 4);
            bearArr.push(br);
            this.multiply = 0;
            this.energy -= BearEnergyMin;
        }
    }
    getNewCoordinates(){
        this.directions = [
     [this.x - 1, this.y - 1],
         [this.x    , this.y - 1],
         [this.x + 1, this.y - 1],
             [this.x - 1, this.y    ],
             [this.x + 1, this.y    ],
             [this.x - 1, this.y + 1],
             [this.x    , this.y + 1],
             [this.x + 1, this.y + 1]
        ];
     }
     move(){
         this.energy--;
         var emptyCells = this.chooseCell(0);
         var newCell = random(emptyCells);
         if (this.energy > 0 && newCell ) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX]= matrix[this.y][this.x];
            matrix[this.y][this.x] =0;
            this.y = newY;
            this.x = newX;
         }
         else {
             this.die()
         }

     }
     eat(){
        let test = this.chooseCell(2);
        if (test.length>0) {
            var emptyCells = this.chooseCell(2);
            var num = 2;
        } else {
            var emptyCells = this.chooseCell(1);
            var num = 1;
        }
        //  console.log(emptyCells);
         var newCell = random(emptyCells);
         if (newCell) {
             this.energy += BearEnergyAdd;
             var newX = newCell[0];
             var newY = newCell[1];
             matrix[newY][newX] = matrix[this.y][this.x];
             matrix[this.y][this.x] = 0;
             this.y = newY;
             this.x = newX;
             if (num == 1) {

                 for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                 }
                 
                 
             } else if (num == 2){
                   for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                 } 
                }
             
         }
         else {
            this.move()
         }
         this.mul ()
     }
    
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in bearArr) {
            if (this.x == bearArr[i].x && this.y == bearArr[i].y) {
                bearArr.splice(i, 1);
                break;
            }
        }
    }
     
     
}

class Hunter {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
        this.multiply = 0;
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
     
     }
     
    getNewCoordinates(){
        this.directions = [
     [this.x - 1, this.y - 1],
         [this.x    , this.y - 1],
         [this.x + 1, this.y - 1],
             [this.x - 1, this.y    ],
             [this.x + 1, this.y    ],
             [this.x - 1, this.y + 1],
             [this.x    , this.y + 1],
             [this.x + 1, this.y + 1]
        ];
     }
     move(){
         this.energy--;
         var emptyCells = this.chooseCell(0);
         var newCell = random(emptyCells);
         if (this.energy > 0 && newCell ) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX]= matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
         }
         else {
             this.die()
         }

     }
     eat(){
        let test = this.chooseCell(2);
        if (test.length>0) {
            var emptyCells = this.chooseCell(2);
            var num = 2;
        } else if (test = this.chooseCell(4), test.length>0){
            var emptyCells = this.chooseCell(4);
            var num = 4;
        }
        else if (test = this.chooseCell(1), test.length>0){
            var emptyCells = this.chooseCell(1);
            var num = 1;
        }
        else {
            var emptyCells = this.chooseCell(3);
            var num = 3;
        }

        
         var newCell = random(emptyCells);
         if (newCell) {
             var newX = newCell[0];
             var newY = newCell[1];
             matrix[newY][newX] = matrix[this.y][this.x];
             matrix[this.y][this.x] = 0;
             this.y = newY;
             this.x = newX;
             if (num == 1) {

                 for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        this.energy += HunterVsGrass;
                        grassArr.splice(i, 1);
                        break;
                    }
                 }
                 
                 
             } else if (num == 2){
                   for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        this.energy += HunterVsGrassEater;
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                 } 
                }
                else if (num == 3){
                    for (var i in predatorArr) {
                     if (newX == predatorArr[i].x && newY ==predatorArr[i].y) {
                         this.energy += HunterVsPredator;
                         predatorArr.splice(i, 1);
                         break;
                     }
                  } 
                 }
                 else if (num == 4){
                    for (var i in bearArr) {
                     if (newX == bearArr[i].x && newY == bearArr[i].y) {
                         this.energy += HunterVsBear;
                         bearArr.splice(i, 1);
                         break;
                     }
                  } 
                 }
             
         }
         else {
            this.move()
         }
         
     }
    
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);
                break;
            }
        }
    }
     
     
}