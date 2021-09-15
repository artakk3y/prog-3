let PredatorEnergyAdd = 16;
let PredatorEnergyMin = 3;
let PredatorMulEnergy = 5;

class Predator extends Base {
    constructor(x, y) {
        super(x, y)
        this.arr = predatorArr
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)

    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        // console.log(emptyCells);
        if (newCell && this.multiply >= 8 && this.energy > PredatorMulEnergy) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var predator = new Predator(newX, newY);
            predatorArr.push(predator);
            this.multiply = 0;
            this.energy -= PredatorEnergyMin;
        }
    }
    eat() {
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
        this.mul()
    }

}
