import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;

  type: 'signup' | 'login' | 'reset' = 'signup';
  loading: boolean = false;

  serverMessage: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  changeType(type) {
    this.type = type;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    return this.type !== 'signup'
      ? true
      : this.password.value === this.passwordConfirm.value;
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value as string;
    const password = this.password.value as string;

    try {
      if (this.isLogin)
        await this.afAuth.signInWithEmailAndPassword(email, password);

      if (this.isSignup)
        await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage =
          'A password reset link has been sent. Check your email.';
      }
    } catch (error) {
      this.serverMessage = error;
    }

    this.loading = false;
  }
}
