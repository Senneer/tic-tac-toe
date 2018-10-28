import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = props => {
    const { value, onClick } = props;

    return (
        <button
            className="square"
            onClick={onClick}
        >
            {value}
        </button>
    );
};

class Board extends React.Component {
    state = {
        squares: Array(9).fill(null),
        isXNext: true,
    }

    squareClickHandler = (i) => {
        const { squares, isXNext } = this.state;

        this.setState({
            squares: [
                ...squares.slice(0, i),
                isXNext ? 'X' : 'O',
                ...squares.slice(i + 1),
            ],
            isXNext: !isXNext,
        });
    }

    renderSquare(i) {
        const { squares } = this.state;

        return (
            <Square
                value={squares[i]}
                onClick={() => this.squareClickHandler(i)}
            />
        );
    }

    render() {
        const { isXNext } = this.state;
        const status = `Next player: ${isXNext ? 'X' : 'O'}`;

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
