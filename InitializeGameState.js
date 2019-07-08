export const initializeGame = function (game) {
    game.setState({gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        currentPlayer: 1 
      })
  }