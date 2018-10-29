import React from 'react';
import Board from '../Board/Board';
import { calculateWinner } from '../../helpers/winner';

export default class Game extends React.Component {
    state = {
        history: [{
            squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        isXNext: true,
    }

    jumpToClickHandler = step => {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    squareClickHandler = i => {
        const { isXNext } = this.state;
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = isXNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares }]),
            stepNumber: history.length,
            isXNext: !isXNext,
        });
    }

    render() {
        const { history, isXNext } = this.state;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move
                ? `Go to move # ${move}`
                : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpToClickHandler(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${isXNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        squareClickHandler={this.squareClickHandler}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
