class Base {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 0;
        this.directions = [];
        
    }
    chooseCell(character) {
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
    

}
