// import React from 'react'

// export default function Shop() {
//   return (
//     <div>Shop</div>
//   )
// }

import React, { useState, useEffect } from "react";

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function Square({ value, onClick }) {
  return (
    <div onClick={onClick} className="square" style={squareStyle}>
      {value}
    </div>
  );
}

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [computerThinking, setComputerThinking] = useState(false);

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  };

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setComputerThinking(false);
  };

  const computerMove = () => {
    const availableMoves = squares
      .map((square, index) => {
        return square === null ? index : null;
      })
      .filter((index) => index !== null);

    const randomMove =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return randomMove;
  };

  const handleClick = (i) => {
    if (squares[i] || winner || computerThinking) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);

    if (calculateWinner(newSquares)) {
      setWinner(newSquares[i]);
    }

    setXIsNext(!xIsNext);
    setComputerThinking(true);
  };

  useEffect(() => {
    if (!xIsNext && !winner && computerThinking) {
      const computerMoveIndex = computerMove();
      setTimeout(() => {
        const newSquares = squares.slice();
        newSquares[computerMoveIndex] = "O";
        setSquares(newSquares);

        if (calculateWinner(newSquares)) {
          setWinner("O");
        }

        setXIsNext(true);
        setComputerThinking(false);
      }, 2000); // 2秒的思考时间延迟
    }
  }, [computerThinking]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        {getStatus()}
      </div>
      <button style={buttonStyle} onClick={resetBoard}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={{ display: "flex" }}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={{ display: "flex" }}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={{ display: "flex" }}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
