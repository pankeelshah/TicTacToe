// Return 1 if Player 1 wins, -1 if Player 2 wins, 0 if no one
export const getWinner = function (board) {
    const LENGTH = 3;
    var sum;
    var arr = board;
  
    //Check rows
    for (var i = 0; i < LENGTH; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) return 1;
      else if (sum == -3) return -1;
    }
  
    //Check columns
    for (var i = 0; i < LENGTH; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) return 1;
      else if (sum == -3) return -1;
    }
  
    //Check left to right diagonal
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) return 1;
    else if (sum == -3) return -1;
  
    //Check right to left diagonal
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) return 1;
    else if (sum == -3) return -1;
  
    return 0;
  };