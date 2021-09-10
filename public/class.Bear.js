let BearMulTick = 8;
let BearEnergyAdd = 3;
let BearEnergyMin = 3;
let BearMulEnergy = 5;

class Bear {
    constructor(x, y, index) {
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= BearMulTick && this.energy > BearMulEnergy) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var br = new Bear(newX, newY, 4);
            bearArr.push(br);
            this.multiply = 0;
            this.energy -= BearEnergyMin;
        }
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (this.energy > 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
        }
        else {
            this.die()
        }

    }
    eat() {
        let test = this.chooseCell(2);
        if (test.length > 0) {
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


            } else if (num == 2) {
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
        this.mul()
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