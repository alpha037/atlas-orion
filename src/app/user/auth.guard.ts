import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // const user = await this.afAuth.currentUser;
    // const isLoggedIn = !!user;

    // if (!isLoggedIn) {
    //   // this.snack.authError();
    //   this.dialog.authError();
    //   // this.router.navigate(['/']);
    // }

    // return isLoggedIn;

    return this.afAuth.authState.pipe(
      map((auth) => {
        const isLoggedIn = !!auth;

        if (!isLoggedIn) this.dialog.authError();

        return isLoggedIn;
      })
    );
  }
}
