import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Iuser } from '../../../core/models/iuser.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  userPrifile: WritableSignal<Iuser> = signal({} as Iuser);
  userId = signal('');

  ngOnInit(): void {
    this.getProfile();
    initFlowbite();
  }
  navbarLogut() {
    this.authService.logout();
  }

  getProfile() {
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        console.log(res.data.user);
        this.userPrifile.set(res.data.user);
        this.userId.set(res.data.user._id);
        console.log('userPrifile', this.userPrifile().name);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
