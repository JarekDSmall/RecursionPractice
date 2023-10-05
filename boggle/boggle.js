function makeBoard(boardString) {
  /** Make a board from a string. */
  const letters = boardString.split(/\s+/);

  const board = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return board;
}

function find(board, word) {
  /** Can word be found in board? */

  const rows = board.length;
  const cols = board[0].length;

  function isValid(x, y, visited) {
    return x >= 0 && y >= 0 && x < rows && y < cols && !visited[`${x},${y}`];
  }

  function search(x, y, index, visited) {
    if (index === word.length) return true;
    if (!isValid(x, y, visited) || board[x][y] !== word[index]) return false;

    visited[`${x},${y}`] = true;

    // NEWS directions
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let [dx, dy] of directions) {
      if (search(x + dx, y + dy, index + 1, { ...visited })) {
        return true;
      }
    }

    visited[`${x},${y}`] = false;
    return false;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (search(i, j, 0, {})) return true;
    }
  }

  return false;
}

// EXAMPLE TEST

const board = makeBoard(`N C A N E
                         O U I O P
                         Z Q Z O N
                         F A D P L
                         E D E A Z`);

// `NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4):
console.log(find(board, "NOON"), true);

// `NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4):
console.log(find(board, "NOPE"), true);

// `CANON` can't be found (`CANO` starts at (0, 1) but can't find
// the last `N` and can't re-use the N):
console.log(find(board, "CANON"), false);

// You cannot travel diagonally in one move, which would be required
// to find `QUINE`:
console.log(find(board, "QUINE"), false);

// We can recover if we start going down a false path (start 3, 0):
console.log(find(board, "FADED"), true);

// An extra tricky case --- it needs to find the `N` toward the top right,
// and then go down, left, up, up, right to find all four `O`s and the `S`:
const board2 = makeBoard(`E D O S Z
                          N S O N R
                          O U O O P
                          Z Q Z O R
                          F A D P L`);

console.log(find(board2, "NOOOOS"), true);
