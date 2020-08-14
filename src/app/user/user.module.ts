import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRoutingModule } from './user-routing.module';
import { GoogleLoginDirective } from './google-login.directive';

@NgModule({
  declarations: [LoginPageComponent, GoogleLoginDirective],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
