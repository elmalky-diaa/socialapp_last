import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Iposts, User } from '../../core/models/iposts.interface';
import { Iuser } from '../../core/models/iuser.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  userPrifile: WritableSignal<Iuser> = signal({} as Iuser);
  userPosts: WritableSignal<Iposts[]> = signal([]);
  userId = signal('');

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        console.log(res.data.user);
        this.userPrifile.set(res.data.user);
        this.userId.set(res.data.user._id);
        this.getUserPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getUserPosts() {
    this.authService.getUserPosts(this.userId()).subscribe({
      next: (res) => {
        console.log(this.userId());

        console.log('userPosts: ', res.data.posts);
        this.userPosts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
