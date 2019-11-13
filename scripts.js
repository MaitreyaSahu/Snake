var size = 10;
var theblock;
var direction = "up";
var timer;
var segment;
var speed = 300;

//load the game
load();

function drawGrid() {
    $("#grid tbody tr").remove();
    for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");

        for (var x = 0; x < size; x++) {
            var cell = document.createElement("td");
            row.appendChild(cell);
        }

        $("#grid tbody").append(row);
        //document.getElementById("grid").appendChild(row);
    }
}

function load() {
    drawGrid();
    theblock = { x: Math.floor(size / 2), y: Math.floor(size / 2) };
    drawBlock();
    createSegment();
    start();
}

function drawBlock() {
    var parent = document.getElementById("grid");
    parent.rows[theblock.y].cells[theblock.x].style.backgroundColor = "black";
    //parent.rows[theblock.y].cells[theblock.x].classList = [];//.classList.add('black');
    //parent.rows[theblock.y].cells[theblock.x].classList.add('black');
}

function move() {
    var parent = document.getElementById("grid");
    parent.rows[theblock.y].cells[theblock.x].style.backgroundColor = "white";
    //parent.rows[theblock.y].cells[theblock.x].classList = [];//.classList.add('white');
    //parent.rows[theblock.y].cells[theblock.x].classList.add('white');
    switch (direction) {
        case "up":
            theblock.y--;
            break;
        case "down":
            theblock.y++;
            break;
        case "right":
            theblock.x++;
            break;
        case "left":
            theblock.x--;
            break;
    }

    //if border game over else move the block
    if (theblock.x >= size || theblock.x < 0 || theblock.y >= size || theblock.y < 0) {
        clearInterval(timer)
        alert("Game Over");
        load();
    }
    else{
        parent.rows[theblock.y].cells[theblock.x].style.backgroundColor = "black";
        //parent.rows[theblock.y].cells[theblock.x].classList.remove('white');
    //parent.rows[theblock.y].cells[theblock.x].classList.add('black');
        checkCollision();
    }
}


function start() {
    document.onkeydown = checkKey;
   // timer = setInterval(function () { move(); }, speed);
}


function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        direction = "up";
    }
    else if (e.keyCode == '40') {
        // down arrow
        direction = "down";
    }
    else if (e.keyCode == '37') {
        // left arrow
        direction = "left";
    }
    else if (e.keyCode == '39') {
        // right arrow
        direction = "right";
    }
}


function createSegment() {
    var randomX = Math.floor(Math.random() * size);
    var randomY = Math.floor(Math.random() * size);

    segment = { x: randomX, y: randomY };

    var parent = document.getElementById("grid");
    parent.rows[segment.y].cells[segment.x].style.backgroundColor = "red";
}



function checkCollision() {
    if (segment.x == theblock.x && segment.y == theblock.y) {
        createSegment();
    }

}


var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var gestureZone = document.getElementById('game-body');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendX <= touchstartX) {
        direction = "left";
    }
    
    if (touchendX >= touchstartX) {
        direction = "right";
    }
    
    if (touchendY <= touchstartY) {
        direction = "up";
    }
    
    if (touchendY >= touchstartY) {
        direction = "down";
    }
    
    if (touchendY === touchstartY) {
        console.log('Tap');
    }
}