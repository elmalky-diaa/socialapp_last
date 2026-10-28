import { Directive, HostListener, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appUserProfile]',
})
export class UserProfile {
  constructor() {}
  private readonly router = inject(Router);

  @Input('appUserProfile') userId!: string;

  @HostListener('click')
  onClick(): void {
    const localUserData = localStorage.getItem('socialUser');
    const loggedInUserId = localUserData ? JSON.parse(localUserData)._id : null;
    if (this.userId === loggedInUserId) {
      this.router.navigate(['/profile']);
      console.log('Logged-in User ID:', loggedInUserId);
    } else {
      this.router.navigate(['/profile', this.userId]);
      console.log('User ID:', this.userId);
    }
  }
}
