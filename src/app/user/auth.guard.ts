import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

import { DialogService } from '../services/shared/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    // private snack: SnackService,
    private dialog: DialogService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
      // this.snack.authError();
      this.dialog.authError();
      // this.router.navigate(['/']);
    }

    return isLoggedIn;
  }
}
