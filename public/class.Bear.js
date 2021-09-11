let BearMulTick = 8;
let BearEnergyAdd = 3;
let BearEnergyMin = 3;
let BearMulEnergy = 5;

class Bear extends Base{
    
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)

    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);


        if (newCell && this.multiply >= 8 && this.energy > 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var br = new Bear(newX, newY);
            bearArr.push(br);
            this.multiply = 0;
            this.energy -= 3;
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
            this.energy += 3;
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