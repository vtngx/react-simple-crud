import React from 'react'

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={() => { props.onClick() }}
    >
      {props.value}
    </button>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return `Winner: ${squares[a]}`
  }

  if (squares.indexOf(null) === -1)
    return 'Draw Game'

  return null
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
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
    )
  }
}

class TicTacToe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xTurn: true,
      step: 0
    }
  }

  init() {
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      xTurn: true,
      step: 0
    })
  }

  handleCLick(i) {
    const history = this.state.history.slice(0, this.state.step + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (squares[i] || calculateWinner(squares))
      return

    squares[i] = this.state.xTurn ? 'X' : 'O'
    this.setState({
      xTurn: !this.state.xTurn,
      step: history.length,
      history: history.concat([{ squares }])
    })
  }

  jumpTo(move) {
    this.setState({
      step: move,
      xTurn: (move % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.step]
    const winner = calculateWinner(current.squares)
    const status = winner
      ? `${winner}`
      : `Next player: ${this.state.xTurn ? 'X' : 'O'}`

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move}`
        : `Go to game start`
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleCLick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.init()}>
              Restart Game
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default TicTacToe