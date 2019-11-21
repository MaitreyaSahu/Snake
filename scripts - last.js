var size = 10;
var theblock = [];
var direction = "up";
var prevDirection = "";
var timer;
var segment;
var speed = 500;


$(function () {
    var element = document.getElementById("game-body");
    var mc = new Hammer(element);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    mc.on("swipeleft", function () {
        //direction = "left";
        direction = prevDirection != "right" ? "left" : direction;
    });
    mc.on("swiperight", function () {
        //direction = "right";
        direction = prevDirection != "left" ? "right" : direction;
    });
    mc.on("swipeup", function () {
        //direction = "up";
        direction = prevDirection != "down" ? "up" : direction;
    });
    mc.on("swipedown", function () {
        //direction = "down";
        direction = prevDirection != "up" ? "down" : direction;
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
    theblock = [{ x: Math.floor(size / 2), y: Math.floor(size / 2) }, { x: Math.floor(size / 2), y: Math.floor(size / 2) + 1}];
    drawBlock();
    createSegment();
    start();
}

function drawBlock() {
    var parent = document.getElementById("grid");
    theblock.forEach(function (item, index) {
        parent.rows[item.y].cells[item.x].style.backgroundColor = "black";
     });
    //parent.rows[theblock.y].cells[theblock.x].style.backgroundColor = "black";    
}

function move() {
    var parent = document.getElementById("grid");
    var tail = theblock[theblock.length - 1];
    parent.rows[tail.y].cells[tail.x].style.backgroundColor = "white";
    var x = 0, y = 0;
    switch (direction) {
        case "up":
            //theblock.y--;
            y--;
            break;
        case "down":
            //theblock.y++;
            y++;
            break;
        case "right":
            //theblock.x++;
            x++;
            break;
        case "left":
            //theblock.x--;
            x--;
            break;
    }

    theblock.forEach(function (item, index) {
        if (index != 0) {
            item.x = theblock[index - 1].x;
            item.y = theblock[index - 1].y;
        }
    });
    theblock[0].x += x;
    theblock[0].y += y;

    //if border game over else move the block
    var head = theblock[0];
    if (head.x >= size || head.x < 0 || head.y >= size || head.y < 0) {
        clearInterval(timer)
        alert("Game Over");
        load();
    }
    else {
        drawBlock();
        //parent.rows[theblock.y].cells[theblock.x].style.backgroundColor = "black";
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
    prevDirection = direction;
    if (e.keyCode == '38') {
        // up arrow
        //alert('up');
        direction = prevDirection != "down" ? "up" : direction;
    }
    else if (e.keyCode == '40') {
        // down arrow
        //alert('down');
        direction = prevDirection != "up" ? "down" : direction;
        //direction = "down";
    }
    else if (e.keyCode == '37') {
        // left arrow
        //alert('left');
        direction = prevDirection != "right" ? "left" : direction;
        //direction = "left";
    }
    else if (e.keyCode == '39') {
        // right arrow
        //alert('right');
        direction = prevDirection != "left" ? "right" : direction;
        //direction = "right";
    }
    //move();
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
    }while(isOverlapping(segment));

    //segment = { x: randomX, y: randomY };

    var parent = document.getElementById("grid");
    parent.rows[segment.y].cells[segment.x].style.backgroundColor = "red";
}

function isOverlapping(segment) {
    var isTrue = false;
    //console.log(segment);
    theblock.forEach(function (item, index) {
        //console.log(item);
        //console.log(index);
        if (segment.x == item.x && segment.y == item.y) {
            isTrue = true;
        }
        //console.log(isTrue);
    });
    return isTrue;
}



function checkCollision() {
    var head = theblock[0];
    if (segment.x == head.x && segment.y == head.y) {
        createSegment();
        addNewBlock();
    }

}

function addNewBlock() {
    var tail = theblock[theblock.length - 1];
    var isBoundry = false;
    var newX = tail.x;
    var newY = tail.y;
    switch (direction) {
        case "up":                    
            isBoundry = tail.x == size - 1 ? true : false;
            newX++;
            break;
        case "down":
            isBoundry = tail.x == 0 ? true : false;
            newX--;
            break;
        case "right":
            isBoundry = tail.y == 0 ? true : false;
            newY--;
            break;
        case "left":
            isBoundry = tail.y == size - 1 ? true : false;
            newY++;
            break;
    }

    theblock.push({ x: newX, y: newY });
    drawBlock()
}