// Создаем элементы игрового поля
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Задаем размеры игрового поля
const ROW = 20;
const COL = 10;
const SQ = 30;
const VACANT = "#ffffff"; // цвет пустой ячейки

// Отрисовываем квадратик
function drawSquare(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * SQ, y * SQ, SQ, SQ);

  context.strokeStyle = "#000000";
  context.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// Создаем игровое поле
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// Отрисовываем игровое поле
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

// Создаем фигуры
const Z = [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ]
  ];
  
  const S = [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  ];
  
  const T = [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  ];
  
  const O = [
    [
      [1, 1],
      [1, 1]
    ]
  ];
  
  const L = [
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ]
  ];
  
  const I = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ]
  ];
  
  const J = [
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ]
  ];
  
const PIECES = [
  [Z, "#f44336"],
  [S, "#4caf50"],
  [T, "#9c27b0"],
  [O, "#ffeb3b"],
  [L, "#03a9f4"],
  [I, "#ff9800"],
  [J, "#795548"]
];

// Генерируем случайную фигуру
function randomPiece() {
  let r = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();

// Конструктор фигуры
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0; // текущая степень вращения
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // Позиция фигуры
  this.x = 3;
  this.y = -2;
}

// Заполняем фигуру
Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
}

// Удаляем фигуру
Piece.prototype.unfill = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, VACANT);
      }
    }
  }
}

// Перемещаем фигуру вниз
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unfill();
    this.y++;
    this.fill(this.color);
  } else {
    // Фиксируем фигуру на игровом поле и создаем новую случайную фигуру
    this.lock();
    p = randomPiece();
  }
}

// Перемещаем фигуру влево
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unfill();
    this.x--;
    this.fill(this.color);
  }
}

// Перемещаем фигуру вправо
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unfill();
    this.x++;
    this.fill(this.color);
  }
}

// Вращаем фигуру
Piece.prototype.rotate = function () {
  let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
  let kick = 0;

  if (this.collision(0, 0, nextPattern)) {
    if (this.x > COL / 2) {
      // сдвигаем влево
      kick = -1;
    } else {
      // сдвигаем вправо
      kick = 1;
    }
  }

  if (!this.collision(kick, 0, nextPattern)) {
    this.unfill();
    this.x += kick;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.fill(this.color);
  }
}

// Фиксируем фигуру на игровом поле
Piece.prototype.lock = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (!this.activeTetromino[r][c]) {
        continue;
      }

      if (this.y + r < 0) {
        // Конец игры
        alert("Game Over");
        // Очищаем игровое поле при завершении игры
        board.forEach(row => row.fill(VACANT));
      }

      board[this.y + r][this.x + c] = this.color;
    }
  }

  // Удаляем полностью заполненные строки
  for (r = 0; r < ROW; r++) {
    let isRowFull = true;
    for (c = 0; c < COL; c++) {
      isRowFull = isRowFull && (board[r][c] != VACANT);
    }
    if (isRowFull) {
      // Сдвигаем все строки выше текущей вниз
      for (let y = r; y > 1; y--) {
        for (c = 0; c < COL; c++) {
          board[y][c] = board[y - 1][c];
        }
      }
      // Заполняем верхнюю строку пустыми ячейками
      for (c = 0; c < COL; c++) {
        board[0][c] = VACANT;
      }
    }
  }

  // Отрисовываем обновленное игровое поле
  drawBoard();
}

// Проверяем столкновение
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
      if (!piece[r][c]) {
        continue;
      }

      let newX = this.x + c + x;
      let newY = this.y + r + y;

      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }

      if (newY < 0) {
        continue;
      }

      if (board[newY][newX] != VACANT) {
        return true;
      }
    }
  }
  return false;
}

// Обрабатываем нажатия клавиш
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
  if (event.keyCode == 37) {
    p.moveLeft();
  } else if (event.keyCode == 38) {
    p.rotate();
  } else if (event.keyCode == 39) {
    p.moveRight();
  } else if (event.keyCode == 40) {
    p.moveDown();
  }
}

// Устанавливаем функцию обратного вызова для автоматического движения вниз каждые 1000 миллисекунд:

// Устанавливаем интервал для автоматического движения вниз
setInterval(() => p.moveDown(), 1000);