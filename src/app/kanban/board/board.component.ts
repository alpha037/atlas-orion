import { Component, Input } from '@angular/core';
import { BoardService } from 'src/app/services/kanban/board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Board } from '../models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input('board') board: Board;

  constructor(private readonly boardService: BoardService) {}

  taskDragAndDrop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }
}
