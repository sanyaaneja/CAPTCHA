//initialisating values
let canvas = document.getElementById("canvas_example"); 
let context = canvas.getContext("2d");
let cntB = 0;
let cntC = 0;
let border = new Array(0,0,0,0,0);
let ques = new Array('B','B','B','B','B');
let msg = document.getElementById('text');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const NUM_CELLS = 5;
let CELL_WIDTH = canvas.width / NUM_CELLS; 

let countFail = 0;

function select(v){
    let x;
    x = Math.random()*10; 
    y = parseInt(x);

    //randomly assigning the image to be selected 
    if (y%2 == 0) {
        z = "button";
    }

    else{
        z = "chessboard";
    }
    
    //displaying seperate message for 
    if (v == 0){
        msg.innerHTML = "Select all the grid cells that contain a " + z;}
    else if (v== 1){
        msg.innerHTML = "Try again. Select all the grid cells that contain a " + z;
    }


    //returning value to compare while verifying
    return z.charAt(0).toUpperCase();
}

function chessboard(x,y) {
    //creating chessboard using elipses and rectangles
    context.fillStyle = "rgb(0,0,0)";
    context.beginPath();
    context.rect(x+10,y+10,80,80); 
    context.fill();

    context.fillStyle = "rgb(255,255,255)";
    context.beginPath();
    context.rect(x+12.5,y+12.5,15,15); 
    context.rect(x+27.5,y+27.5,15,15); 
    context.rect(x+12.5,y+42.5,15,15); 
    context.rect(x+42.5,y+42.5,15,15);
    context.rect(x+42.5,y+12.5,15,15); 
    context.rect(x+27.5,y+57.5,15,15);
    context.rect(x+57.5,y+27.5,15,15);
    context.rect(x+42.5,y+72.5,15,15); 
    context.rect(x+72.5,y+42.5,15,15); 
    context.rect(x+57.5,y+57.5,15,15); 
    context.rect(x+57.5,y+57.5,15,15); 
    context.rect(x+12.5,y+72.5,15,15); 
    context.rect(x+72.5,y+12.5,15,15); 
    context.rect(x+72.5,y+72.5,15,15); 
    context.fill(); }

function button(x,y) {
    //creating button using elipses
    context.fillStyle = "rgb(69,190,216)";
    context.beginPath();
    context.ellipse(x+50,y+50,40,40,0,0,2*Math.PI);
    context.fill();

    context.fillStyle = "rgb(12,151,179)";
    context.beginPath();
    context.ellipse(x+50,y+50,35,35,0,0,2*Math.PI);
    context.fill();

    context.fillStyle = "rgb(255,255,255)";
    context.beginPath();
    context.ellipse(x+44,y+46,4,4,0,0,2*Math.PI);
    context.fill();

    context.fillStyle = "rgb(255,255,255)";
    context.beginPath();
    context.ellipse(x+56,y+46,4,4,0,0,2*Math.PI);
    context.fill();

    context.fillStyle = "rgb(255,255,255)";
    context.beginPath();
    context.ellipse(x+56,y+58,4,4,0,0,2*Math.PI);
    context.fill();

    context.fillStyle = "rgb(255,255,255)";
    context.beginPath();
    context.ellipse(x+44,y+58,4,4,0,0,2*Math.PI);
    context.fill(); }

function randomise(a,b){
    x = Math.random()*10; 
    y = parseInt(x);
    
    //randomly 
    if (cntC == 4){
        button(a,b);
        Res = "B";
    }
    else if (cntB == 4){
        chessboard(a,b);
        Res = "C";
    }
    else{
        if (y%2 == 0) {
            button(a,b);
            Res = "B";
            cntB+=1;
        }
        else{
            chessboard(a,b);
            Res = "C";
            cntC+=1;
        } 
    }
    return Res;
}

function fail(){
    clear();
    checkButton.disabled = true;
    msg.innerHTML = "FAILED";

    context.strokeStyle = "rgb(255,0,0)";
    context.lineWidth = "10";
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(100,100);
    context.stroke();

    context.beginPath();
    context.moveTo(100,0);
    context.lineTo(0,100);
    context.stroke(); }

function clear(){
    //clearing canvas
    context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function success(){
    msg.innerHTML = "SUCCESS";
    clear();

    context.strokeStyle = "rgb(0,255,0)";
    context.lineWidth = "10";

    context.beginPath();
    context.moveTo(50,65);
    context.lineTo(50,100);
    context.stroke(); 

    context.beginPath();
    context.moveTo(150,0);
    context.lineTo(50,100);
    context.stroke(); 
    
    checkButton.disabled = true;
}

function grid(){
    context.strokeStyle = "rgb(0,0,0)";
    context.lineWidth = "2";

    let starty = 0;

    for (let startx = 0; startx < 500; startx+=100) {

        r = randomise(startx,starty);
        ques[startx/100] = r;

        context.beginPath();
        context.moveTo(startx,starty);
        context.lineTo(startx,starty+100);
        context.stroke(); 
        
        context.beginPath();
        context.moveTo(startx,starty+100);
        context.lineTo(startx+100,starty+100);
        context.stroke(); 

        context.beginPath();
        context.moveTo(startx+100,starty+100);
        context.lineTo(startx+100,starty);
        context.stroke(); 

        context.beginPath();
        context.moveTo(startx+100,starty);
        context.lineTo(startx,starty);
        context.stroke(); 
        
    }
}

function getMouseXY(e) {
    //locating x,y position of mouse
    return {x: e.offsetX, y: e.offsetY};
  }

function whichCell(x, y) {
    if (x < 0) x = 0; 
    if (y < 0) y = 0;
    if (x >= CANVAS_WIDTH) x = CANVAS_WIDTH - 1; if (y >= CANVAS_HEIGHT) y = CANVAS_HEIGHT - 1;
    let cell = Math.floor(x / CELL_WIDTH); 
    return cell; }

function doSomething(evt) {
    //locating the selected cell
    let pos = getMouseXY(evt);
    let cell = whichCell(pos.x, pos.y);

    //highlighting the selected cell with a red border
    //removing red border when clicked twice 
    if (border[cell] == 1){
        context.strokeStyle = "rgb(0,0,0)";
        border[cell] = 0;}
    else{
        border[cell] = 1;
        context.strokeStyle = "rgb(255,0,0)";}
    
    context.lineWidth = "2";
    
    valx = cell*100;
    valy = 0;

    context.beginPath();
    context.moveTo(valx,valy);
    context.lineTo(valx,valy+100);
    context.stroke();

    context.beginPath();
    context.moveTo(valx,valy+100);
    context.lineTo(valx+100,valy+100);
    context.stroke(); 

    context.beginPath();
    context.moveTo(valx+100,valy+100);
    context.lineTo(valx+100,valy);
    context.stroke(); 

    context.beginPath();
    context.moveTo(valx+100,valy);
    context.lineTo(valx,valy);
    context.stroke();
}

function reinitialise(){
    //reinitialisation of variables
    cntB = 0;
    cntC = 0;
    border = new Array(0,0,0,0,0);
    ques = new Array('B','B','B','B','B');

    //displaying "Try again" with "Select images" message if 
    if (countFail == 1){
        ch = select(1);    // 
    }
    else{
        ch = select(0);}
    
    //clearing canvas and resetting screen 
    clear();
    checkButton.disabled=false;
    grid();

    if (checkButton){checkButton.addEventListener('click', verify);}

}

function verify(){
    flag = 0;
    for (let i=0; i<NUM_CELLS; i++) {
        //comparing border array and ques array to verify result
        console.log(i, border[i], ques[i], ch, border[i] == 1, ques[i] == ch)
        if ((border[i] == 1 && ques[i] == ch) || (border[i] == 0 && ques[i] != ch)){
            flag = 0;
        }
        else{
            flag = 1;
            break;
        }
    }
    
    if (flag == 0){
        success();
        countFail=0;
    }
    else{
        //displaying failed message if the user selects wrong set of images for a second time
        countFail+=1;
        reinitialise()
        if (countFail==2){
            fail();
            countFail = 0;
        }
    }
}

//defining verify function on click event by locating button element using id
let checkButton = document.getElementById('verify');
if (checkButton){checkButton.addEventListener('click', verify);}

//defining verify function on click event by locating button element using id
let buttonElement = document.getElementById('reinitialise');
if (buttonElement){buttonElement.addEventListener('click', reinitialise, false);}

//main code
grid();
ch = select(0);

canvas.addEventListener('click', doSomething);


