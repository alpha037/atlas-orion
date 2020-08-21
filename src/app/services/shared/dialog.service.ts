import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthErrorComponent } from 'src/app/shared/auth-error/auth-error.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  authError() {
    this.dialog.open(AuthErrorComponent, {
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      width: '500px',
    });
  }
}
