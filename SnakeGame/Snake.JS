

window.requestAnimationFrame(GameRefresh) //requestAnimationFrame() solicita que o browser chame uma função antes do frame da página. A função GameRefresh() vai ser chamada antes da actualização do frame.
let LastTimeStamp = 0;
let snake_speed = 4; // aumentar ou diminuir para reduzir ou aumentor o ritmo do jogo
let tabuleiro = document.getElementById("PlayingArea");
let snake = document.createElement("div");
let BodySnake = document.createElement("div");
let Initial_x = 5;
let Initial_y = 5;
let x = 0;
let y = 0;
let FoodX = null;
let FoodY = null;
let food = null;
let StoreSnakeBody = [];
let SnakePositionX = [5]; // guarda a posição inicial da snake + os seus incrementos em X.
let SnakePositionY = [5]; // guarda a posião incial da snake + os seus incrementos em Y.
CreateFood(); // Cria e posiciona um pedaço de comida aleatório.


//GameRefresh vai ter como argumento um TIMESTAMP(carimbo de tempo) que indica o tempo decorrido entre a chamada da função e o time origin (+- o ponto em que o browser fez load do documento)
//Invocando novamente o método AnimationFrame dentro da função vamos criar um loop , pois : AnimationFrame() -> GameRefresh()->AnimationFrame()
function GameRefresh(TimeStamp){
  window.requestAnimationFrame(GameRefresh);
    let SecondsSinceLastRender = (TimeStamp - LastTimeStamp)/1000;
    if (SecondsSinceLastRender < 1 / snake_speed) return

     LastTimeStamp = TimeStamp;
     CreateSnake();
     SnakeGrow();
     EatFood(); 
     NewFood();
     GameOver();
     console.log("A posição da cobra em X é :" + SnakePositionX[SnakePositionX.length - 1])
     console.log("A posição da cobra em Y é :" + SnakePositionY[SnakePositionY.length - 1])
};




function CreateSnake(){
  tabuleiro.appendChild(snake);
   snake.style.gridColumnStart = Initial_x + x;
   snake.style.gridRowStart = Initial_y + y;
   snake.classList.add("snake");
  };


  tabuleiro.addEventListener("keydown" , function(keydown){
    if(keydown.key == "ArrowRight"){
      moveSnakeRight();
            
    }
    else if(keydown.key == "ArrowLeft"){
      moveSnakeLeft();
            
    }
    else if(keydown.key == "ArrowUp"){
      moveSnakeUp();
      
    }

    else if(keydown.key == "ArrowDown"){
      moveSnakeDown();
      
    }
      });


function moveSnakeRight(){   
  x++;
  SnakePositionX.push(Initial_x + x );
  SnakePositionY.push(Initial_y + y);
  UpdateSnakeBody();
} 


function moveSnakeLeft(){
  x--;
  SnakePositionX.push(Initial_x + x );
  SnakePositionY.push(Initial_y + y);
  UpdateSnakeBody();
}

function moveSnakeDown(){
  y++;
  SnakePositionX.push(Initial_x + x );
  SnakePositionY.push(Initial_y + y);
  UpdateSnakeBody();
}

function moveSnakeUp(){
    y--;
  SnakePositionX.push(Initial_x + x );
  SnakePositionY.push(Initial_y + y);
  UpdateSnakeBody()
}

function remove(){
  snake.remove()
}


 function CreateFood(){
      food = document.createElement("div");
      FoodX = Math.floor(Math.random()*10+1)
      FoodY = Math.floor(Math.random()*10+1)
    food.style.gridColumnStart = FoodX;
    food.style.gridRowStart = FoodY;
 
    food.classList.add("food")
 
    document.getElementById("PlayingArea").appendChild(food);
  };

function EatFood (){
  if( Initial_y + y == FoodY && Initial_x + x == FoodX ){
     food.remove();
  }
}

function NewFood(){
  if( Initial_y + y == FoodY && Initial_x + x == FoodX )
   CreateFood();
}

function SnakeGrow(){
  if( Initial_y + y == FoodY && Initial_x + x == FoodX ) 
   SnakeBody();      
}

function SnakeBody(){
  BodySnake = document.createElement("div");
  tabuleiro.appendChild(BodySnake); 
  BodySnake.classList.add("snakeBody");
  StoreSnakeBody.push(BodySnake); 
  BodySnake.style.gridRowStart = Initial_y + y ;
  BodySnake.style.gridColumnStart = Initial_x + x ;
}


function UpdateSnakeBody(){
  StoreSnakeBody.forEach((BodySnake, i) => { 
    BodySnake.style.gridRowStart =  SnakePositionY[SnakePositionY.length - i -2]
    BodySnake.style.gridColumnStart = SnakePositionX[SnakePositionX.length - i -2]
  })
};


function GameOver(){
  if( Initial_x + x > 10 || Initial_x + x < 1 || Initial_y + y > 10 || Initial_y + y < 1)
  return GameOver2();
};

function GameOver2(){
document.getElementById("popup").style.visibility = "visible"
document.getElementById("PlayingArea").blur()
;}

function ReloadPage(){
  return window.location.reload()
}

function StartGame(){
  document.getElementById("startpopup").style.visibility = "hidden";
  document.getElementById("PlayingArea").focus()
}