import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
  canDelete: boolean;
  @Input('isDialog') isDialog: boolean = false;
  @Output('delete') delete = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  prepareForDeletion() {
    this.canDelete = true;
  }

  cancelDeletion() {
    this.canDelete = false;
  }

  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = false;

    if (this.isDialog) this.dialog.closeAll();
  }
}
