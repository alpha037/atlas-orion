import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/services/kanban/board.service';

import { Board } from '../models/board.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[];
  subscription: Subscription;

  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.subscription = this.boardService
      .getBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  dragAndDrop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
