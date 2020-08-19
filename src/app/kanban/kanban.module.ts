import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [BoardListComponent, BoardComponent],
  imports: [CommonModule, KanbanRoutingModule, SharedModule, FormsModule],
})
export class KanbanModule {}
