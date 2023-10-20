function Game() {

  this.onload = function onload() {

    this.board = Array(9).fill(null);

    this.computerPlayer = PLAYER.X;
    this.humanPlayer = PLAYER.O;

    this.score = { X: 0, O: 0 };
    this.winner = null;
    this.hardness = HARDNESS.HARD;

    console.log("Game :: onload :: this.board", this.board);

    console.log("Game :: onload :: this.computerPlayer", this.computerPlayer);
    console.log("Game :: onload :: this.humanPlayer", this.humanPlayer);

    console.log("Game :: onload :: this.score", this.score);
    console.log("Game :: onload :: this.winner", this.winner);
    console.log("Game :: onload :: this.hardness", this.hardness);

    const move = this.getBestMove(this.board, true).cell;
    this.board[move] = this.computerPlayer;
  };

  this.reset = function reset() {

    this.board = Array(9).fill(null);
    this.winner = null;

    if (this.computerPlayer === PLAYER.X) {

      const move = this.hardness === HARDNESS.EASY ? 
        this.getRandomMove(this.board).cell : 
        this.getBestMove(this.board, true).cell;

      this.board[move] = this.computerPlayer;
    }
  };

  this.play = function play(move) {

    if (this.board[move] !== null) return;
    if (this.winner !== null) return;

    // human player
    this.board[move] = this.humanPlayer;
    this.evaluate(this.board, true);
    if (this.winner) return;
    
    // computer player
    const nextMove = this.hardness === HARDNESS.EASY ? 
      this.getRandomMove(this.board).cell : 
      this.getBestMove(this.board, true).cell;

    this.board[nextMove] = this.computerPlayer;
    this.evaluate(this.board, true);
    if (this.winner) return;
  };

  this.switchHardness = function switchHardness(hardness) {
    
    switch (hardness) {
      case HARDNESS.EASY:
        this.hardness = HARDNESS.EASY;
        this.reset();
        break;
    
      default:
        this.hardness = HARDNESS.HARD;
        this.reset();
        break;
    }
  };

  this.togglePlayAs = function togglePlayAs() {

    this.computerPlayer = this.computerPlayer === PLAYER.X ? PLAYER.O : PLAYER.X;
    this.humanPlayer = this.humanPlayer === PLAYER.X ? PLAYER.O : PLAYER.X;
    this.score = { X: this.score.O, O: this.score.X };
    this.reset();
  };

  this.getRandomMove = function getRandomMove(board) {

    const emptyCells = [];

    for (let index in board)
      if (board[index] === null) emptyCells.push(index);

    return { cell: emptyCells[Math.floor(Math.random() * emptyCells.length)] }
  };

  this.getBestMove = function getBestMove(board, isMax) {

    const emptyCells = [];

    for (let index in board)
      if (board[index] === null) emptyCells.push(index);

    const result = this.evaluate(board);

    if (emptyCells.length === board.length) return { cell: Math.floor(Math.random() * 9) };
    if (result === RESULT.T) return { score: 0 };
    if (result === this.computerPlayer) return { score: emptyCells.length + 1 };
    if (result === this.humanPlayer) return { score: (emptyCells.length + 1) * -1 };

    if (isMax) {

      let bestMove = { score: Number.NEGATIVE_INFINITY };

      for (const emptyCell of emptyCells) {

        const newBoard = [...board];
        newBoard[emptyCell] = this.computerPlayer;
        const move = getBestMove.call(this, newBoard, !isMax);

        if (move.score > bestMove.score) {
          bestMove.score = move.score;
          bestMove.cell = emptyCell;
        }
      }

      return bestMove;
    }
    else {

      let bestMove = { score: Number.POSITIVE_INFINITY };

      for (const emptyCell of emptyCells) {

        const newBoard = [...board];
        newBoard[emptyCell] = this.humanPlayer;
        const move = getBestMove.call(this, newBoard, !isMax);

        if (move.score < bestMove.score) {
          bestMove.score = move.score;
          bestMove.cell = emptyCell;
        }
      }

      return bestMove;
    }
  };

  this.evaluate = function evaluate(board, deepEvaluate=false) {

    let result;

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // vertical
      [0, 4, 8], [2, 4, 6]              // diagonal
    ];

    for (let winningCombination of winningCombinations) {
      if (board[winningCombination[0]] &&
        board[winningCombination[0]] === board[winningCombination[1]] &&
        board[winningCombination[1]] === board[winningCombination[2]]) {

        result = board[winningCombination[0]] === PLAYER.X ? RESULT.X : RESULT.O;
        break;
      }
    }

    if (!result && !board.includes(null)) result = RESULT.T;

    if (deepEvaluate && result) {

      this.winner = result;

      switch (result) {
        case RESULT.X:
  
          this.score.X += 1;
          break;
  
        case RESULT.O:
          this.score.O += 1;
          break;
  
        case RESULT.T:
          break;
      }
    }
    
    return result;
  };   
}
