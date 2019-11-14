var size = 10;
var theblock;
var direction = "up";
var timer;
var segment;
var speed = 300;


$(function () {
    var element = document.getElementsByTagName("html");
    var mc = new Hammer(element);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    mc.on("swipeleft", function () {
        direction = "left";        
    });
    mc.on("swiperight", function () {
        direction = "right";
    });
    mc.on("swipeup", function () {
        direction = "up";
    });
    mc.on("swipedown", function () {
        direction = "down";
    });


    //load the game
    load();
});


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
    timer = setInterval(function () { move(); }, speed);
}


function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        //alert('up');
        direction = "up";
    }
    else if (e.keyCode == '40') {
        // down arrow
        //alert('down');
        direction = "down";
    }
    else if (e.keyCode == '37') {
        // left arrow
        //alert('left');
        direction = "left";
    }
    else if (e.keyCode == '39') {
        // right arrow
        //alert('right');
        direction = "right";
    }
}

function getRandomPosition(){
    var randomX = Math.floor(Math.random() * size);
    var randomY = Math.floor(Math.random() * size);

    return { x: randomX, y: randomY };
}

function createSegment() {
    //var randomX = Math.floor(Math.random() * size);
    //var randomY = Math.floor(Math.random() * size);
    
    do{
        segment = getRandomPosition();
    }while(segment.x == theblock.x && segment.y == theblock.y);

    //segment = { x: randomX, y: randomY };

    var parent = document.getElementById("grid");
    parent.rows[segment.y].cells[segment.x].style.backgroundColor = "red";
}



function checkCollision() {
    if (segment.x == theblock.x && segment.y == theblock.y) {
        createSegment();
    }

}