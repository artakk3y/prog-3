let HunterVsGrass = 3;
let HunterVsGrassEater = 6;
let HunterVsPredator = 1;
let HunterVsBear = 4;



class Hunter extends Base{
    
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
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
                        this.energy += 3;
                        grassArr.splice(i, 1);
                        break;
                    }
                }


            } else if (num == 2) {
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        this.energy += 6;
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (num == 3) {
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        this.energy += 1;
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (num == 4) {
                for (var i in bearArr) {
                    if (newX == bearArr[i].x && newY == bearArr[i].y) {
                        this.energy += 4;
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