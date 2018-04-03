/* 26-03-2018 */
/* Pierre Jablonski */
/* Ironhack Module 1 Project : Demineur */




// Creates a empty table of size n x m with zeros
function table (n,m){
    Table=[];
    for (var i = 0; i<n; i++){
      Table.push([0]);
      for (var k = 0; k < m-1; k++){
        Table[i].push(0);
      }
    }
    return Table;
  }
  



// Creates a list of randomly chosen positions between 1 and n*p, correesponding to bombs placement
// Nbombs is the number of bombs
function randomPositions(Nbombs, n, m){
    list = [];
    for (var i = 0; i < Nbombs; i++){
      random = Math.floor(Math.random()*n*m);
      for(var j = 0; j < list.length; j++){
        // Making sure there is no repitition
        while (list[j] == random){ 
          random = Math.floor(Math.random()*n*m);
        }
      }
      list[i] = random;
    }
    return (list)
  }
  


// Convert a random numbers (between 0 and n*p -1) to positions (i,j) in matrix (n,m)
function conversionBomb(Bombs, n, m){
    for (var i = 0; i < Bombs.length; i++){
      quotient = Math.floor(Bombs[i] / m) ;
      remainder = Bombs[i] % m;
      Bombs[i] = [quotient, remainder];
    }
    return Bombs
  }
  


// Bomb being positionned in the empty matrix, can be distinguished by their value : 9 
// (chosen because it is impossible to have 9 bombs around, 8 is the maximum)
function bombs(emptyTable, bombPos){
  for (var i = 0; i < bombPos.length; i++){
    row = bombPos[i][0];
    column = bombPos[i][1];
    emptyTable[row][column] = 9;
  }
  return emptyTable
}


// Giving back the number of bombs around for each position in the matrix
// Giving back 9 in case of a bomb
function oneNeighbor(Inposition, i, j){
  counter = 0;
  if (i === 0){
    for (var k = i; k < i+2; k++){
      for (var l = j-1; l < j+2; l++){
        if(0 <= k < Inposition.length && 0 <= l < Inposition[0].length && Inposition[k][l] === 9){
          counter += 1;
        }
      }
    }
  } else if (i === Inposition.length - 1){
    for (var k = i-1; k < i+1; k++){
      for (var l = j-1; l < j+2; l++){
        if(0 <= k < Inposition.length && 0 <= l < Inposition[0].length && Inposition[k][l] === 9){
          counter += 1;
        }
      }
    }
  } else {
    for (var k = i-1; k < i+2; k++){
      for (var l = j-1; l < j+2; l++){
        if(0 <= k < Inposition.length && 0 <= l < Inposition[0].length && Inposition[k][l] === 9){
          counter += 1;
        }
      }
    }
  }

  if (Inposition[i][j] === 9){
    counter = 9;
  }
  return counter
}


// Executing the previous function for all the positions, i.e. all position is assigned the number of bombs around it 
function allNeighbors(Inposition){
  neighbors = [];
  for (var i = 0; i < Inposition.length; i++){
    neighbors.push([]);
    for (var j = 0; j < Inposition[0].length; j++){
      neighbors[i].push(oneNeighbor(Inposition, i, j));
    }
  }
  return neighbors
}


Nnumbers = 0;
Nflags = 0;
// Demineur function 
// Sends back the demineur matrix 
function Demineur(density, n, m){
  Nbombs = Math.floor(density*n*m);
  Nnumbers = n*m - Nbombs; 
  Nflags = Nbombs;
  emptyTab = table(n,m);
  randomPos = randomPositions(Nbombs, n, m);
  bombPositions = conversionBomb(randomPos, n, m);
  bombInPosition = bombs(emptyTab, bombPositions);
  return allNeighbors(bombInPosition)
}


//console.log(Demineur(0.5, 30, 16));
  