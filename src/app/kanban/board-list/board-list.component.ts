import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/services/kanban/board.service';

import { Board } from '../models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[];
  subscription: Subscription;

  constructor(
    private readonly boardService: BoardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.boardService
      .getBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '500px',
      data: {},
      autoFocus: false,
      restoreFocus: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.boardService.createBoard({
          title: data,
          priority: this.boards.length,
        });
    });
  }

  dragAndDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
