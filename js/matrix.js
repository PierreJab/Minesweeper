
function game(){
    
  matrix = Demineur(0.3, 8, 12);
  over = false;
  console.log("Free boxes: " + Nnumbers);
  console.log("Bombs: " + Nflags);
  n = matrix.length;
  m = matrix[0].length;
  document.getElementById("Nflag").innerHTML = "<span style='color: white' class='glyphicon glyphicon-flag'></span> " + Nflags;


counter0 = 0;
for (var i = 0; i < n; i++){
  for (var j = 0; j < m; j++){
    if (matrix[i][j]=== 0){
      counter0 += 1;
    }
  }
}


  for (var i = 0; i < n; i++){

    var line = "";
    for (var j = 0; j < m; j++){
      // Concatenate the content of a new line
      // Numbers on a entire line
        if (matrix[i][j] === 9){
          line += "<li id='" + matrix[i][j].toString()+ " " + i + "-" + j + "' class='" + matrix[i][j].toString() + " hiden'><button type='button' class='hiden' data-toggle='modal' data-target='#myModal'></button></li>";
      
        } else {
          line += "<li id='" + matrix[i][j].toString()+ " " + i + "-" + j + "' class='" + matrix[i][j].toString() + " hiden'></li>";
      }
    }

    // Creating the new line and adding the content (li) into it
    var newLine = $("<ul class='line'>" + line + "</ul>");

    // Insert the new line into the table
    $(".table").append(newLine);
  }

  // Nombre de nombres découverts qui est égal à n*m - Nbombs
Ndiscovered = 0;
  $("li").click(function(){
    number = parseInt($(this).attr("id")[0]);
    $(this).removeClass("hiden");

    if (Ndiscovered === 0 && over === false){
      $(".0").removeClass("hiden");
      $(".0").html(0);
      $(".0").addClass("discovered");
      $("#message p").html("Hurry up !");
    }

    if (number === 9 && Ndiscovered < Nnumbers && over === false){
      $("#message > p").html("GAME OVER !");
      over = true;
      console.log("bomb");
      $(this).addClass("wrong");
      $(".9").addClass("bomb");
      $(".9").removeClass("hiden");

      $(".9").html("<img class='bomb' style='color :white' src='./Images/glyphicon-bomb.png' alt='bomb'>");
      // $(this).html("<span style='color: white' class='glyphicon glyphicon-bomb'></span>")
    } else if (Ndiscovered === Nnumbers - 1 - counter0 && over === false){
      $(this).html(number);
      $(this).addClass("discovered");
      $("#message p").html("Congratulations! You won!");
      over = true;
      console.log("you won !");
    } else{
      if (over === false){
        Ndiscovered += 1;
        $(this).html(number);
        $(this).addClass("discovered");
      }
      
    }
    // console.log($(this)[0]);
    // console.log($(this).html());
    // console.log($(this).attr("id"));
    
  })

  $("li").contextmenu(function(){
    event.preventDefault();
    console.log("("+$(this).html()+")");
    if (over === false && $(this).html() === '<span style="color: white" class="glyphicon glyphicon-flag"></span>'){
      Nflags += 1; 
      $(this).html(" ");
      document.getElementById("Nflag").innerHTML = "<span style='color: white' class='glyphicon glyphicon-flag'></span> " + Nflags;
      console.log("remove flag");
      
    } else {
      if (over === false){
        Nflags -= 1; 
        $(this).html("<span style='color: white' class='glyphicon glyphicon-flag'></span>");
        document.getElementById("Nflag").innerHTML = "<span style='color: white' class='glyphicon glyphicon-flag'></span> " + Nflags;
      }
    }
    
  });


  $("#start-again").click(function(){
    console.log($(".line").hide());
    $("#message p").html("Click on any cell to start");
    game();
  });


  $("#lost").click(function(){
    console.log($(".line").hide());
    $("#message p").html("Click on any cell to start");
    game();
  });



  // ---------- TIMER
  // ---------- TIMER


  /*la fonction getElementByTagName renvoie une liste des éléments portant le nom de balise donné ici "span".*/
  // var sp = document.getElementsByTagName("span");
  var btn_start=$(".start");
  var btn_stop=$("#stop");
  var t;
  var ms=0,s=0,mn=0,h=0;

  /*La fonction "start" démarre un appel répétitive de la fonction update_chrono par une cadence de 100 milliseconde en utilisant setInterval et désactive le bouton "start" */
  function start(){
      t =setInterval(update_chrono,100);
      btn_start.disabled=true;
  }

  /*La fonction update_chrono incrémente le nombre de millisecondes par 1 <==> 1*cadence = 100 */
  function update_chrono(){
      ms+=1;
      /*si ms=10 <==> ms*cadence = 1000ms <==> 1s alors on incrémente le nombre de secondes*/
      if(ms==10){
          ms=1;
          s+=1;
      }
      /*on teste si s=60 pour incrémenter le nombre de minute*/
      if(s==60){
          s=0;
          mn+=1;
      }
      /*afficher les nouvelle valeurs*/
      document.getElementById("minutes").innerHTML = mn;
      document.getElementById("seconds").innerHTML = s;
      document.getElementById("millisec").innerHTML = ms;
  }

      /*on arrête le "timer" par clearInterval ,on réactive le bouton start */
      function stop(){
      clearInterval(t);
      btn_start.disabled=false;
          
      }
  /*dans cette fonction on arrête le "timer" ,on réactive le bouton "start" et on initialise les variables à zéro */
  function reset(){
      clearInterval(t);
      btn_start.disabled=false;
      ms=0,s=0,mn=0;
      /*on accède aux différents span par leurs indice*/
      document.getElementById("minutes").innerHTML = mn;
      document.getElementById("seconds").innerHTML = s;
      document.getElementById("millisec").innerHTML = ms;
      }


  // ---------- TIMER
  // ---------- TIMER
}


game()