

function generator(matLen, gr, grEat , pred, bear, hunt) {

    let matrix = [];

    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];

    for (let j = 0; j < matLen; j++) {
        matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);

    if (matrix[x][y] == 0) {
        matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);

    if (matrix[x][y] == 0) {
        matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);

    if (matrix[x][y] == 0) {
        matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < bear; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);

        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < hunt; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);

        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

let length = 45;
let grassCount = 400 ;
let grassEaterCount = 25;
let predatorCount = 25;
let bearCount = 2;
let hunterCout = 2;
let side = 20;
var matrix = generator(length, grassCount, grassEaterCount, predatorCount, bearCount, hunterCout);
let grassArr =[];
let grassEaterArr = [];
let predatorArr = [];
let bearArr = [];
let hunterArr = [];

 


function setup() {
    frameRate(7);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for(var y = 0; y < matrix.length; ++y){
        for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass(x,y);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                var grea = new GrassEater(x,y);
                grassEaterArr.push(grea);
            }
            else if(matrix[y][x] == 3){
                var pr = new Predator(x,y,3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var br = new Bear(x, y, 4);
                bearArr.push(br);
            }
            else if (matrix[y][x] == 5) {
                var ht = new Hunter(x, y, 5);
                hunterArr.push(ht);
            }
        }
     }
   
 }
 
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
 
            if (matrix[y][x] == 1) {
                fill("green");
   
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("brown");
            }
            else if (matrix[y][x] == 5) {
                fill("#c9a45c");
            }
         
            rect(x * side, y * side, side, side);
            
        }
        
    }

    for(var i in grassEaterArr){
        grassEaterArr[i].eat();
        

    }
    for (const j in grassArr) {
        grassArr[j].mul();
    }
    for (const k in predatorArr) {
        predatorArr[k].eat();
    }
    for (const l in bearArr) {
        bearArr[l].eat();
    }
    for (const h in hunterArr) {
        hunterArr[h].eat();
    }
    document.getElementById("grass").value = grassArr.length;
    document.getElementById("grassEater").value = grassEaterArr.length;
    document.getElementById("predator").value = predatorArr.length;
    document.getElementById("bear").value = bearArr.length;
    document.getElementById("hunter").value = hunterArr.length;

 }

