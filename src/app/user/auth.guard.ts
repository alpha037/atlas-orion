import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DialogService } from '../services/shared/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private dialog: DialogService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    /**
     * * Promise based approach
     */
    // const user = await this.afAuth.currentUser;
    // const isLoggedIn = !!user;

    // if (!isLoggedIn) this.dialog.authError();

    // return isLoggedIn;

    /**
     * * Observable based approach
     */
    return this.afAuth.user.pipe(
      map((user) => !!user),
      tap((isLoggedIn) => {
        if (!isLoggedIn) this.dialog.authError();
      })
    );
  }
}
