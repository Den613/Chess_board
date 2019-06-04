function chessLetters(){ // буквы
  var letters = [];

  var charA = "A";
  var charH = "H";

  var i = charA.charCodeAt(0);
  var j = charH.charCodeAt(0);

  for(; i <= j; i++)
    letters.push(String.fromCharCode(i));

  return letters;

}

function chessTable(){ // доска

  var table = [];

  var rows = 12;
  var cols = chessLetters().length+4;

  for(var i = 0; i < rows; i++){
    table.push([]);
    table[i].push( new Array(cols));
    for(var j = 0; j < cols; j++){
      if((i > 1 && i < 10) && (j > 1 && j < 10))
        table[i][j] = chessLetters()[j-2]+(1+i-2);
      else
        table[i][j] = 0;
    }
  }
  return table;

}

function stepHorse(step){ //функция возможных ходов конем

  var n = 10;
  var test = [];
  var turn_options = ["нет такого хода!!! "];

  for(var i = 2; i < n; i++){
    for(var j = 2; j < n; j++){
      if(chessTable()[i][j] == step){
        // ходы коня
        var step1 = chessTable()[i-2][j-1];
        var step2 = chessTable()[i-2][j+1];
        var step3 = chessTable()[i-1][j+2];
        var step4 = chessTable()[i+1][j+2];
        var step5 = chessTable()[i+2][j+1];
        var step6 = chessTable()[i+2][j-1];
        var step7 = chessTable()[i-1][j-2];
        var step8 = chessTable()[i+1][j-2];

        var Sp = [step1, step2, step3, step4, step5, step6, step7, step8];

        for(var s = 0; s < Sp.length; s++){
          if(Sp[s] != 0){
            turn_options.push(Sp[s]);
            delete turn_options[0];

          }
        }
      }
    }
  }

  for(var i = 1; i < turn_options.length; i++)
    document.getElementById(turn_options[i]).style.backgroundColor = 'green'; //окрашиваем возможные ходы зеленым
}

function createTable(){ //функция построения доски

  var word = chessLetters().length;
  // размещаем буквы на доске
  for(var i = 0; i < word+2; i++){
    if(i == 0 || i == 9){
      document.getElementById('abc-top').innerHTML += '<th></th>';
      document.getElementById('abc-botton').innerHTML += '<th></th>';
    } else {
      document.getElementById('abc-top').innerHTML += '<th>'+chessLetters()[i-1]+'</th>';//на верхней стороне доски
      document.getElementById('abc-botton').innerHTML += '<th>'+chessLetters()[i-1]+'</th>'; //на нижней
    }

  }

  for(var i = 0; i < word; i++){
    for(var j = 0; j < word+2; j++){

      if(j == 0 || j == 9){
        document.getElementById(String(8-i)).innerHTML += '<th>'+(8-i)+'</th>'; // размещаем цифры

      }else{
        // создаем квадраты проверяя на четность
        if(i%2 == 0){
          if((j-1)%2 == 0)
            document.getElementById(String(8-i)).innerHTML += '<td class = "white" id = "'+chessLetters()[j-1]+(8-i)+'"></td>';
          else
            document.getElementById(String(8-i)).innerHTML += '<td class = "black" id = "'+chessLetters()[j-1]+(8-i)+'"></td>';

          } else {

            if((j-1)%2 == 0)
              document.getElementById(String(8-i)).innerHTML += '<td class = "black" id = "'+chessLetters()[j-1]+(8-i)+'"></td>';
            else
              document.getElementById(String(8-i)).innerHTML += '<td class = "white" id = "'+chessLetters()[j-1]+(8-i)+'"></td>';

        }
      }
    }
  }
}



function step(hod,color){
  for(var j = 0; j < 8; j++){
    for(var i = 1; i <= 8; i++){
      // проверки четности ходов при переходи на новый ход квадрат окрашивается в тот цвет который изначально был
      if(j%2 == 0){

        if((i-1)%2 == 0){

          if(hod == chessLetters()[j]+i)
            document.getElementById(hod).style.backgroundColor = color;

          else
            document.getElementById(chessLetters()[j]+i).style.backgroundColor = 'black';

        } else {

          if(hod == chessLetters()[j]+i)
            document.getElementById(hod).style.backgroundColor = color;

          else
            document.getElementById(chessLetters()[j]+i).style.backgroundColor = '#FFFFFF';

        }
      } else {

        if((i-1)%2 == 0){

          if(hod == chessLetters()[j]+i)
            document.getElementById(hod).style.backgroundColor = color;
          else
            document.getElementById(chessLetters()[j]+i).style.backgroundColor = '#FFFFFF';

        } else {

          if(hod == chessLetters()[j]+i)
            document.getElementById(hod).style.backgroundColor = color;
          else
            document.getElementById(chessLetters()[j]+i).style.backgroundColor = 'black';

        }
      }
    }
  }
}

window.onload = function(){

  createTable();//функция создания таблицы

    document.getElementById('box').onclick = function(event) { //отслеживаем нажатия

      step(event.target.id,'blue'); //функция отображения хода
      stepHorse(event.target.id); //функция отображения возможных ходов конем

  }
}
