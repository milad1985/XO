import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick(this.props.number)}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        number={i}
        onClick={this.props.onClick}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: false,
    };
  }

  clickHandle = (i) => {
    let result = this.calculateWin();
    const squares = this.state.squares.slice();
    if (result || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "O" : "X";
    console.log(squares);
    this.setState({ squares, xIsNext: !this.state.xIsNext }, () => {
      console.log(this.state.squares);
      this.calculateWin();
    });
  };

  calculateWin = () => {
    const squares = this.state.squares.slice();
    let win = false;
    const wineLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    wineLine.map((c) => {
      if (
        squares[c[0]] &&
        squares[c[0]] === squares[c[1]] &&
        squares[c[0]] === squares[c[2]]
      )
        win = true;
      return win;
    });
    if (win) {
      alert("Congratulation!! Winner is " + (this.state.xIsNext ? "X" : "O"));
      return true;
    }
  };

  render() {
    const status = "Next player: " + (this.state.xIsNext ? "O" : "X");

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board squares={this.state.squares} onClick={this.clickHandle} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
