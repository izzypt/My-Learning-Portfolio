   const Board = {
   square1: document.getElementById("quadrado1"),
   square2: document.getElementById("quadrado2"),
   square3: document.getElementById("quadrado3"),
   square4: document.getElementById("quadrado4"),
   square5: document.getElementById("quadrado5"),
   square6: document.getElementById("quadrado6"),
   square7: document.getElementById("quadrado7"),
   square8: document.getElementById("quadrado8"),
   square9: document.getElementById("quadrado9"),
   }
   
   let CheckingWinner = function CheckWinner(){
      DrawWinningLine();
   if (Board.square1.innerText == "X" && Board.square2.innerText == "X" && Board.square3.innerText == "X")
   return  alert(namePlayer1 + " has won the match");
   else if(Board.square1.innerText == "O" && Board.square2.innerText == "O" && Board.square3.innerText == "O")
   return alert( namePlayer2 + ` has won the match`);
   else if (Board.square4.innerText == "X" && Board.square5.innerText == "X" && Board.square6.innerText == "X")
   return alert(namePlayer1 + " has won the match");
   else if(Board.square4.innerText == "O" && Board.square5.innerText == "O" && Board.square6.innerText == "O")
   return alert(namePlayer2 + ` has won the match`);
   else if (Board.square7.innerText == "X" && Board.square8.innerText == "X" && Board.square9.innerText == "X")
   return alert(namePlayer1 + " has won the match");
   else if(Board.square7.innerText == "O" && Board.square8.innerText == "O" && Board.square9.innerText == "O")
   return alert(namePlayer2 + ` has won the match`);
   if (Board.square1.innerText == "X" && Board.square4.innerText == "X" && Board.square7.innerText == "X")
   return  alert(namePlayer1 + " has won the match");
   else if(Board.square1.innerText == "O" && Board.square4.innerText == "O" && Board.square7.innerText == "O")
   return alert( namePlayer2 + ` has won the match`);
   if (Board.square2.innerText == "X" && Board.square5.innerText == "X" && Board.square8.innerText == "X")
   return  alert(namePlayer1 + " has won the match");
   else if(Board.square2.innerText == "O" && Board.square5.innerText == "O" && Board.square8.innerText == "O")
   return alert( namePlayer2 + ` has won the match`);
   if (Board.square3.innerText == "X" && Board.square6.innerText == "X" && Board.square9.innerText == "X")
   return  alert(namePlayer1 + " has won the match");
   else if(Board.square3.innerText == "O" && Board.square6.innerText == "O" && Board.square9.innerText == "O")
   return alert( namePlayer2 + ` has won the match`);
   if (Board.square1.innerText == "X" && Board.square5.innerText == "X" && Board.square9.innerText == "X")
   return  alert(namePlayer1 + " has won the match");
   else if(Board.square1.innerText == "O" && Board.square5.innerText == "O" && Board.square9.innerText == "O")
   return alert( namePlayer2 + ` has won the match`);
   if (Board.square3.innerText == "X" && Board.square5.innerText == "X" && Board.square7.innerText == "X")
   return  alert(namePlayer1 + " has won the match");
   else if(Board.square3.innerText == "O" && Board.square5.innerText == "O" && Board.square7.innerText == "O")
   return alert( namePlayer2 + ` has won the match`);

}

   function DrawWinningLine(){
      if (Board.square1.innerText == "X" && Board.square2.innerText == "X" && Board.square3.innerText == "X" || Board.square1.innerText == "O" && Board.square2.innerText == "O" && Board.square3.innerText == "O")
      return document.getElementById("line1stLeft").style.visibility = "visible";
      if (Board.square4.innerText == "X" && Board.square5.innerText == "X" && Board.square6.innerText == "X" || Board.square4.innerText == "O" && Board.square5.innerText == "O" && Board.square6.innerText == "O")
     return document.getElementById("line2ndLeft").style.visibility = "visible";
     if (Board.square7.innerText == "X" && Board.square8.innerText == "X" && Board.square9.innerText == "X" || Board.square7.innerText == "O" && Board.square8.innerText == "O" && Board.square9.innerText == "O")
     return document.getElementById("line3rdLeft").style.visibility = "visible";
     if (Board.square1.innerText == "X" && Board.square4.innerText == "X" && Board.square7.innerText == "X" || (Board.square1.innerText == "O" && Board.square4.innerText == "O" && Board.square7.innerText == "O" ))
     return document.getElementById("line1stTop").style.visibility = "visible";
     if (Board.square2.innerText == "X" && Board.square5.innerText == "X" && Board.square8.innerText == "X" || (Board.square2.innerText == "O" && Board.square5.innerText == "O" && Board.square8.innerText == "O" ))
     return document.getElementById("line2ndTop").style.visibility = "visible";
     if (Board.square3.innerText == "X" && Board.square6.innerText == "X" && Board.square9.innerText == "X" || (Board.square3.innerText == "O" && Board.square6.innerText == "O" && Board.square9.innerText == "O" ))
     return document.getElementById("line3rdTop").style.visibility = "visible";
     if (Board.square1.innerText == "X" && Board.square5.innerText == "X" && Board.square9.innerText == "X" || (Board.square1.innerText == "O" && Board.square5.innerText == "O" && Board.square9.innerText == "O" ))
     return document.getElementById("line1stDiagonal").style.visibility = "visible";
     if (Board.square3.innerText == "X" && Board.square5.innerText == "X" && Board.square7.innerText == "X" || (Board.square3.innerText == "O" && Board.square5.innerText == "O" && Board.square7.innerText == "O" ))
     return document.getElementById("line2ndDiagonal").style.visibility = "visible";
   }

   const Game = {
   start: document.getElementById("Start"),
   restart: document.getElementById("Restart"),
   ChangeTurn: document.getElementById("ChangeTurn"),
   }

   const rounds = {
   turn : 0,
   PlayerTurn: document.getElementById("PlayerTurn"),
   };

   let namePlayer1 = "";
   let namePlayer2 = "";

   

   Game.start.onclick = function Start(){ 
      namePlayer1 = prompt("Hello Player 1 ! What is your name?");
      namePlayer2 = prompt("Hello Player 2 ! What is your name?");    
   return alert(namePlayer1 + "- You have the symbol 'X'.\n"+ namePlayer2 + "- You have the symbol 'O'.\nClick Change Player to start!")}



   Game.restart.onclick = function Restart(){
   return window.location.reload()
   }; 

   Game.ChangeTurn.onclick = function () {
      TurnOf();
   return console.log(rounds.turn++);
   }

   function TurnOf(){
      if (rounds.turn == 0 || rounds.turn == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 ) 
      return rounds.PlayerTurn.innerText = "It's " + namePlayer1 + " turn!" ;
      else if ( rounds.turn  == 1 || rounds.turn  == 3 || rounds.turn == 5 || rounds.turn == 7 )
      return rounds.PlayerTurn.innerText = "It's " + namePlayer2 + " turn!" ;
      else{
         return rounds.PlayerTurn.innerText = "The board is full or the game is over!!"
      }
      }


   Board.square1.onclick = function CheckSquare1() {
       if (Board.square1.innerText == "X") 
      return Board.square1.innerText = ""
      else if (Board.square1.innerText == "O") {
       return Board.square1.innerText = ""
       }
      else{
        AssignSymbolSquare1();
        CheckingWinner();
        BlockOtherSquares();
       }
  };

function AssignSymbolSquare1(){
 if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square1.innerText = "X" ;
 else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square1.innerText = "O" ;
 else {
   return alert("Click Start button then Change Player of the game!")     }
};


Board.square2.onclick = function CheckSquare2() {
 if (Board.square2.innerText == "X") 
    return Board.square2.innerText = ""
    else if (Board.square2.innerText == "O") {
       return Board.square2.innerText = ""
    }
    else{
      AssignSymbolSquare2();
      CheckingWinner();
    }
};

function AssignSymbolSquare2(){
  if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
  return Board.square2.innerText = "X"
  else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
  return Board.square2.innerText = "O"
  else {
    return alert("Click Start button then Change Player of the game!")     }
}


Board.square3.onclick = function CheckSquare3() {
 if (Board.square3.innerText == "X") 
    return Board.square3.innerText = ""
    else if (Board.square3.innerText == "O") {
       return Board.square3.innerText = ""
    }
    else{
      AssignSymbolSquare3();
      CheckingWinner();
    }
};

function AssignSymbolSquare3(){
   if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square3.innerText = "X"
   else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square3.innerText = "O"
  else {
   return alert("Click Start button then Change Player of the game!")     }
}

Board.square4.onclick = function CheckSquare4() {
 if (Board.square4.innerText == "X") 
    return Board.square4.innerText = ""
    else if (Board.square4.innerText == "O") {
       return Board.square4.innerText = ""
    }
    else{
      AssignSymbolSquare4();
      CheckingWinner();
    }
};

function AssignSymbolSquare4(){
   if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square4.innerText = "X"
   else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square4.innerText = "O"
  else {
    return alert("Click Start button then Change Player of the game!")       }
}

Board.square5.onclick = function CheckSquare5() {
 if (Board.square5.innerText == "X") 
    return Board.square5.innerText = ""
    else if (Board.square5.innerText == "O") {
       return Board.square5.innerText = ""
    }
    else{
      AssignSymbolSquare5();
      CheckingWinner();
    }
};

function AssignSymbolSquare5(){
   if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square5.innerText = "X"
   else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square5.innerText = "O"
   else {
    return alert("Click Start button then Change Player of the game!")    }
}

Board.square6.onclick = function CheckSquare6() {
 if (Board.square6.innerText == "X") 
    return Board.square6.innerText = ""
    else if (Board.square6.innerText == "O") {
       return Board.square6.innerText = ""
    }
    else{
      AssignSymbolSquare6();
      CheckingWinner();
    }
};

function AssignSymbolSquare6(){
   if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square6.innerText = "X"
   else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square6.innerText = "O"
   else {
    return alert("Click Start button then Change Player of the game!")      }
}

Board.square7.onclick = function CheckSquare7() {
 if (Board.square7.innerText == "X") 
    return Board.square7.innerText = ""
    else if (Board.square7.innerText == "O") {
       return Board.square7.innerText = ""
    }
    else{
      AssignSymbolSquare7();
      CheckingWinner();
    }
};

function AssignSymbolSquare7(){
   if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square7.innerText = "X"
   else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square7.innerText = "O"
   else {
    return alert("Click Start button then Change Player of the game!") }
}

Board.square8.onclick = function CheckSquare8() {
 if (Board.square8.innerText == "X") 
    return Board.square8.innerText = ""
    else if (Board.square8.innerText == "O") {
       return Board.square8.innerText = ""
    }
    else{
      AssignSymbolSquare8();
      CheckingWinner();
    }
};

function AssignSymbolSquare8(){
   if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square8.innerText = "X"
   else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square8.innerText = "O"
   else {
    return alert("Click Start button then Change Player of the game!") }
}

Board.square9.onclick = function CheckSquare9() {
 if (Board.square9.innerText == "X") 
    return Board.square9.innerText = ""
    else if (Board.square9.innerText == "O") {
       return Board.square9.innerText = ""
    }
    else{
      AssignSymbolSquare9();
      CheckingWinner();
    }
};

function AssignSymbolSquare9(){
   if (rounds.turn == 1 || rounds.turn == 3 || rounds.turn  == 5 || rounds.turn == 7 || rounds.turn == 9 ) 
   return Board.square9.innerText = "X"
   else if ( rounds.turn  == 2 || rounds.turn  == 4 || rounds.turn == 6 || rounds.turn == 8 )
   return Board.square9.innerText = "O"
  else {
    return alert("Click Start button then Change Player of the game!") }};

