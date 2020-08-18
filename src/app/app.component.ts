import { Component, OnInit } from '@angular/core';
import { BoardService } from './services/kanban/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'atlas-prods';

  constructor(private readonly boardService: BoardService) {
    this.boardService.getBoards().subscribe((boards) => {
      console.log(boards);
      // this.boardService.sortBoards(boards);
    });
  }

  async ngOnInit() {
    // await this.create();
  }

  async create() {
    await this.boardService.createBoard({
      title: `Bravo's Board`,
    });
  }
}
