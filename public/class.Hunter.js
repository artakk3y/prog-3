let HunterVsGrass = 3;
let HunterVsGrassEater = 6;
let HunterVsPredator = 1;
let HunterVsBear = 4;



class Hunter {
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
        } else if (test = this.chooseCell(4), test.length > 0) {
            var emptyCells = this.chooseCell(4);
            var num = 4;
        }
        else if (test = this.chooseCell(1), test.length > 0) {
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


            } else if (num == 2) {
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        this.energy += HunterVsGrassEater;
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (num == 3) {
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        this.energy += HunterVsPredator;
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (num == 4) {
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