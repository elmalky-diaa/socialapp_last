import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loading: WritableSignal<boolean> = signal(false);
  msError: WritableSignal<string> = signal('');
  msSuccess: WritableSignal<string> = signal('');

  changePasswordForm: FormGroup = this.fb.group({
    currentPassword: [null, [Validators.required]],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
      ],
    ],
  });

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      this.loading.set(true);
      this.msError.set('');
      this.msSuccess.set('');

      this.authService.changPass(this.changePasswordForm.value).subscribe({
        next: (res) => {
          this.msSuccess.set('Password changed successfully');

          setTimeout(() => {
            this.router.navigate(['/feeds']);
          }, 1500);
        },
        error: (err) => {
          console.error(err);
          this.msError.set(err.error?.message);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  togglePass(pass: any): void {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  }
}
