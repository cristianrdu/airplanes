import { Component } from '@angular/core';
import { BoardService } from './board.service'
import { Board } from './board.model'
import { MatchScore } from './match-score.model';

const BOARD_SIZE = 5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BoardService]
})

export class AppComponent {
  playable: boolean = true;
  score: number = 0;
  secondsPlayed: number = 0;
  interval: any;
  matchScoreList: MatchScore[] = [];
  constructor(
    private boardService: BoardService,
  ) {
    this.createBoard();
    this.playable = true;
  }
  /**
   * Strikes the clicked tile to find airplane 
   */
  strike(e:any) : AppComponent {
    const id = e.target.id,
      row = id.substring(1,2), col = id.substring(2,3),
      tile = this.board.tiles[row][col];
    if (!this.checkValidHit(tile)) {
      return this;
    }

    if (this.board.shotsFired === 0) {
      this.startTimer();
    }

    this.board.shotsFired++;
    // check if the airplane is in the targetted tile
    if (tile.value == 1) {
      this.board.tiles[row][col].status = 'win';
      this.score++;
      this.playable = false;
      
      this.matchScoreList.push({
        secondsPlayed: this.secondsPlayed,
        date: this.getDateTime(),
        shotsFired: this.board.shotsFired
      });
      // sort the match list by the shots fired
      this.matchScoreList.sort((a,b) => b.shotsFired - a.shotsFired)
      // stop timer for next game
      this.stopTimer();
    } else {
      this.board.tiles[row][col].status = 'fail'
    }
    this.board.tiles[row][col].used = true;
    this.board.tiles[row][col].value = "X";
    return this;
  }
  /**
   * Initialize a new board to be used in the game 
   */
  createBoard() : AppComponent {
    this.boardService.createBoard(BOARD_SIZE);
    return this;
  }
  /**
   * Checks if the given tile is eligible to be struck
   * @param tile given tile
   * @returns {boolean} of the check
   */
  checkValidHit(tile: any) : boolean {
    if (!this.playable) {
      return false;
    }
    if(tile.value == "X") {
      return false;
    }
    return true;
  }
  /**
   * board property
   */
  get board () : Board {
    return this.boardService.getBoard()
  }
  /**
   * Resets the game values and enables play flag.
   */
  resetGame(): void {
    this.createBoard();
    this.playable = true;
  }
  /**
   * Starts the match timer which counts the seconds
   */
  private startTimer(): void {
    this.interval = setInterval(() => {
      this.secondsPlayed++;
    },1000)
  }
  /**
   * Stops the match timer
   */
  private stopTimer(): void {
    clearInterval(this.interval);
    // resets the seconds for next game
    this.secondsPlayed = 0;
  }
  /**
   * Get the current Date Time
   * @returns {string} of the current date time
   */
  private getDateTime(): string {
    const today = new Date();

    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date+' '+time;
  }
}
