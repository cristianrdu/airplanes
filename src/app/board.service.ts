import { Injectable } from '@angular/core';
import { Board } from './board.model'

@Injectable()
export class BoardService {

  board: Board;

  constructor() { }

  createBoard(size:number = 5) : BoardService {
    let tiles = [];
    // create tiles for board
    for(let i=0; i < size; i++) {
      tiles[i] = [];
      for(let j=0; j< size; j++) {
        tiles[i][j] = { used: false, value: 0, status: '' };
      }
    }
    // generate a random airplane for the board
    tiles = this.positionRandomAirplane(tiles, size);
    // create board
    let board = new Board({
      tiles: tiles
    });
    this.board = board;
    return this;
  }
  
  positionRandomAirplane(board: Object[], len: number) : Object[] {
    len = len - 1;
    let ranRow = this.getRandomInt(0, len),
    ranCol = this.getRandomInt(0, len);
    board[ranRow][ranCol].value = 1;

    return board;
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getBoard() : Board {
    return this.board;
  }
}
