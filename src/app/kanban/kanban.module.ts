import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog.component';

@NgModule({
  declarations: [BoardListComponent, BoardComponent, BoardDialogComponent, TaskDialogComponent],
  imports: [CommonModule, KanbanRoutingModule, SharedModule, FormsModule],
})
export class KanbanModule {}
