$(document).ready(function(){
    var canvas = document.getElementById('Cam');
    var ctx = canvas.getContext("2d");

    //cambiamos tamaño del canvas al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //dibujar un fondo
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    //agrandamos un pixel
    var canvasX = Math.abs(canvas.width / 10).toFixed(0); //toFixed para que no de numeros decimales
    var canvasY = Math.abs(canvas.height / 10).toFixed(0);

    //creamos un render
    var matrix = [];

    function randomMatrix(){

        for(var i = 0; i < canvasX; i++){
            matrix[i] = [];
            for(var j = 0; j < canvasY; j++){

                //generamos valores random para nuestro vector
                matrix[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }

    function clearMatrix(){
        for(var i = 0; i < canvasX; i++){
            matrix[i] = [];
            for(var j = 0; j < canvasY; j++){

                //generamos valores random para nuestro vector
                matrix[i][j] = 0;
            }
        }
    }


    function renderMatrix(){
        for(var i = 0; i < canvasX; i++){

            for(var j = 0; j < canvasY; j++){

                if(matrix[i][j] == 0){
                    ctx.fillStyle = "black";
                    ctx.fillRect(i*10, j*10, 10, 10);
                } else{
                    ctx.fillStyle = "white";
                    ctx.fillRect(i*10, j*10, 10, 10);
                }
            }
        }
    }

    function drawGrid(){
        for(let i = 0; i < canvas.width; i+=10){
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,canvas.height);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 0.1;

            ctx.stroke();
        }

        for(let i = 0; i < canvas.height; i+=10){
            ctx.beginPath();
            ctx.moveTo(0,i);
            ctx.lineTo(canvas.width,i);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 0.1;

            ctx.stroke();
        }
    }

    var game = {
        level: 1
    }

    var player = {
        x: 0,
        y: 0,
        dir: 0,
        dirBefore: 0,
        tam: 1,
        points: 0,
        vel: 20,
        time: 0,
        arrayQueue: [],
        xBefore: 0,
        yBefore: 0
    }

    var food = {
        x: 0,
        y: 0,
        food: 1
    }

    function createFood(){
        //crea un punto en cualquier punto del canvas
        food.x = Math.floor(Math.random() * canvasX);
        food.y = Math.floor(Math.random() * canvasY);
    }

    function renderFood(){
        if(food.food == 1) matrix[food.x][food.y] = 1;
    }

    function renderPlayer(){
        if(player.dir == 1){
            if(player.dirBefore == 3){
                player.dir = 3;
            } else player.x++;
        }

        if(player.dir == 3){
            if(player.dirBefore == 1){
                player.dir = 1;
            } else player.x--;
        }

        if(player.dir == 0){
            if(player.dirBefore == 2){
                player.dir = 2;
            } else player.y--;
        }

        if(player.dir == 2){
            if(player.dirBefore == 0){
                player.dir = 0;
            } else player.y++;
        }

        player.dirBefore = player.dir;

        
        //dibujar cola
        
        for(let i = 0; i < player.arrayQueue.length; i++){
            let x = player.arrayQueue[i][0];
            let y = player.arrayQueue[i][1];

            matrix[x][y] = 1;
        }

        //recorremos la matrix

        for(let i = 0; i < player.arrayQueue.length; i++){
            if(i == player.arrayQueue.length-1){
                player.arrayQueue[i][0] = player.xBefore;
                player.arrayQueue[i][1] = player.yBefore;
            } else{
                player.arrayQueue[i][0] = player.arrayQueue[i+1][0];
                player.arrayQueue[i][1] = player.arrayQueue[i+1][1];
            }
        }

        if(player.x > canvasX-1){
            player.x = 0;
        } else if(player.x < 0){
            player.x = canvasX + 1;
        } else if(player.y > canvasY - 1){
            player.y = 0;
        } else if(player.y < 0){
            player.y = canvasY - 1;
        }

        matrix[player.x][player.y] = 1;

        if(player.x == food.x && player.y == food.y){
            console.log("Comiendo");
            createFood();

            player.arrayQueue.push([player.x, player.y]);

            player.points++;
            console.log(player.arrayQueue);
            console.log(player.points);
        }

        player.xBefore = player.x;
        player.yBefore = player.y;
    }

    function renderPoints(){
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";

        ctx.fillText("Score: " + player.points,20,30);
    }

    clearMatrix();

    //agrega un valor de comida aleatorio
    createFood()
    setInterval(function(){
        //pone la matrix en 0
        clearMatrix();
        
        //agrega 1 a esa posición
        renderFood();

        renderPlayer();

        //renderiza la capa matrix
        renderMatrix();

        //renderiza la capa canvas
        drawGrid();

        renderPoints();
    }, 100);

    document.addEventListener("keydown", function(e){
        if(e.keyCode == 37){ //izquierda
            player.dir = 3;
        }else if(e.keyCode == 38){ //arriba
            player.dir = 0;
        }else if(e.keyCode == 39){ //derecha
            player.dir = 1;
        }else if(e.keyCode == 40){ //abajo
            player.dir = 2
        }
    });

});