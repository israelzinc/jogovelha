import React, {Component} from 'react'
import Square from '../Square'
import './board.css'
import { playBot2 } from './ai'

class Board extends Component {
  
  state = {
      squares: Array(9).fill(null),
      xIsNext: false
  }

  botPlay(){
    if(this.state.squares.filter(e=>e==null).length < 1) {
      return
    }
    if(this.state.xIsNext) {      
      // let idx = playBot(this.state.squares)            
      let idx = playBot2(this.state.squares)              
      this.handleClick(idx)
    } 
    // } else {      
    //   let idx = playBot2(this.state.squares,"O")      
    //   this.handleClick(idx)
    // }
    
  }  

  handleClick(i) {
    const squares = this.state.squares.slice()
    const winner = this.calculateWinner(squares)
    
    if (winner || squares[i]) {      
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  calculateWinner(squares) {
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
        return lines[i];
      }
    }
    return null;
  }

  renderSquare() {
    const squares = this.state.squares.slice()
    const winner = this.calculateWinner(squares)

    const renderSquare = squares.map((square, index) => {
    let classCss = ''
    
    if (winner) {
      classCss = winner ? (winner.indexOf(index) !== -1 ? 'square-score' : '') : ''            
    } else {
      if (squares.indexOf(null) === -1) {
        classCss = 'square-draw'
      }
    }

    return (
            <Square 
                key={index}
                classCss={ classCss }
                value={square}
                onClick={() => this.handleClick(index)}
            />
        )
    })

    return renderSquare
  }

  restart() {
    let whoStart = Math.floor(Math.random() * 2);    
    // let whoStart = 0;
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: whoStart===0?true:false,      
      // xIsNext:false
    })
  }

  render() {
    const squares = this.state.squares.slice()
    const winner = this.calculateWinner(squares)
    let status;
    let reset = false

    this.botPlay()

    if (winner) {
      reset = true
      status = 'Winner: ' + squares[winner[0]];
    } else {
      if (squares.indexOf(null) !== -1) {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      }else{
          reset = true
          status = 'Draw.';
      }
    }

    let version = '0.0.4';

    return (
      <div>
        <div className="status">
        Version: {version}
        <br/>
        { reset ? <button className="btn-restart" onClick={() => this.restart()} >Restart</button> : ''}
        {status}
        
        </div> 
          <div className="board">
            {this.renderSquare()}
          </div>
      </div>
    );
  }
}

export default Board