const UI = {

  board: document.querySelector(".board"),
  cells: document.querySelectorAll(".board .cell"),
  hardness: document.querySelector("#slt-hardness"),
  toggleXO: document.querySelector("#btn-xo"),
  reset: document.querySelector("#btn-reset"),
  scoreBoardX: document.querySelector(".container-score-x"),
  scoreBoardO: document.querySelector(".container-score-o"),
  overlay: document.querySelector(".overlay")
}

const game = new Game(MODE.SINGLE_PLAYER, PLAYER.O);
game.onload();
updateBoardUI();
updateScoreBoardUI();

document.addEventListener("click", function (event) {

  if (event.target.getAttribute("disabled")) return;

  if (event.target.classList.contains("cell")) {

    handleClickOnCell(parseInt(event.target.getAttribute("data-cell-index")));
    return;
  }

  switch (event.target) {
    case UI.reset:
      handleClickOnReset(event);
      break;

    case UI.toggleXO:
      handleClickOnToggleXO(event);
      break;

    case UI.overlay: 
      hideOverlay(event);
      break;
  }
});

document.addEventListener("change", function (event) {

  if (event.target.getAttribute("disabled")) return;

  switch (event.target) {
    case UI.hardness:
      handleChangeOnHardness(event);
      break;
  }
});

function handleClickOnReset() {

  game.reset();
  updateBoardUI();
}

function handleClickOnToggleXO() {

  game.togglePlayAs();
  UI.toggleXO.innerText = `Play as ${game.computerPlayer}`;
  updateBoardUI();
  updateScoreBoardUI();
}

function handleClickOnCell(move) {

  game.play(move);
  updateBoardUI();
  updateScoreBoardUI();

  const winner = game.winner;

  if (winner === game.computerPlayer) showOverlay(`${winner} has won 🎉🎉🎉`);
  if (winner === game.humanPlayer) showOverlay(`${winner} has won 🎉🎉🎉`);
  if (winner === RESULT.T) showOverlay("It's a tie :)");
}

function showOverlay(message) {

  UI.overlay.innerText = message;
  UI.overlay.classList.remove("hide");
  UI.overlay.classList.add("show");
}

function hideOverlay() {

  UI.overlay.classList.remove("show");
  UI.overlay.classList.add("hide");
  UI.reset.click();
}

function updateBoardUI() {

  const board = game.board;

  for (cellIndex in board) {

    const cell = board[cellIndex];
    const cellUI = document.querySelector(`.board .cell[data-cell-index='${cellIndex}']`);

    if (cell === PLAYER.X) {

      cellUI.classList.add("bg-x");
      cellUI.classList.add("tx-x");
      cellUI.classList.remove("bg-o");
      cellUI.classList.remove("tx-o");
    }
    else if (cell === PLAYER.O) {

      cellUI.classList.add("bg-o");
      cellUI.classList.add("tx-o");
      cellUI.classList.remove("bg-x");
      cellUI.classList.remove("tx-x");
    }
    else {

      cellUI.classList.remove("bg-o");
      cellUI.classList.remove("tx-o");
      cellUI.classList.remove("bg-x");
      cellUI.classList.remove("tx-x");
    }

    cellUI.innerText = cell;
  }
}

function updateScoreBoardUI() {

  UI.scoreBoardX.innerText = game.score.X;
  UI.scoreBoardO.innerText = game.score.O;
}

function handleChangeOnHardness() {
  
  game.switchHardness(UI.hardness.value);
  updateBoardUI();
}
