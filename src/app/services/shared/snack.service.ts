import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBar.open('You must be logged in to use this feature!', 'Ok', {
      duration: 5000,
      // panelClass: ['mat-accent'],
    });

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(tap((_) => this.router.navigate(['/login'])))
      .subscribe();
  }

  newCustomerAdded(customerId: string) {
    this.snackBar.open(
      'Hurray! Your about page has been created!',
      'Take Me There',
      {
        duration: 10000,
        panelClass: ['notification-success'],
      }
    );

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(tap((_) => this.router.navigate(['/customers', customerId])))
      .subscribe();
  }

  creatingCustomer() {
    this.snackBar.open('Atlas-SSR is creating your page..', 'Okay');
  }

  copiedToClipboard() {
    this.snackBar.open('Copied to Clipboard!', 'Nice', {
      duration: 4000,
    });
  }
}
