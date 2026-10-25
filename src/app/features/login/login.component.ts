import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  loading: WritableSignal<boolean> = signal(false);
  msError: WritableSignal<string> = signal('');
  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
      ],
    ],
  });

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
  //   ]),
  // });
  login() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      console.log(this.loginForm.value);
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(this.loginForm.value);
          localStorage.setItem('socialToken', res.data.token);
          localStorage.setItem('socialUser', JSON.stringify(res.data.user));

          this.router.navigate(['/feeds']);
        },
        error: (err) => {
          console.log(err.error.message);
          this.msError.set(err.error.message);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePass(pass: any) {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  }
}
