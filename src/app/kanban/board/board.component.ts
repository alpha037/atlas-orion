import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from 'src/app/services/kanban/board.service';

import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input('board') board: Board;

  constructor(
    private readonly boardService: BoardService,
    private dialog: MatDialog
  ) {}

  taskDragAndDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openTaskDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true },
      autoFocus: false,
      restoreFocus: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.isNew)
          this.boardService.updateTasks(this.board.id, [
            ...this.board.tasks,
            data.task,
          ]);
        else {
          this.board.tasks.splice(data.idx, 1, data.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }
}
