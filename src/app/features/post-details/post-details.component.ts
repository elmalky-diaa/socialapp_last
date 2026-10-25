import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { PostsService } from '../../shared/services/posts/posts.service';
import { Iposts, User } from '../../core/models/iposts.interface';
import { CommentsComponent } from '../feeds/components/comments/comments.component';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink, CommentsComponent, RouterOutlet],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  private readonly router = inject(Router);
  postData: WritableSignal<Iposts> = signal({} as Iposts);

  postId = signal('');
  isHidden = true;

  openMenuId: string | null = null;

  loggedUser: WritableSignal<User> = signal({} as User);

  ngOnInit(): void {
    this.readUrl();
    this.savedUserData();
  }
  readUrl() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        console.log(res.get('id'));
        this.postId.set(res.get('id')!);
        this.getPostDetails();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPostDetails() {
    this.postsService.getSinglPost(this.postId()).subscribe({
      next: (res) => {
        console.log(res.data.post);
        this.postData.set(res.data.post);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  toggleMenu(postId: string) {
    if (this.openMenuId === postId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = postId;
    }
  }
  toggleDiv() {
    this.isHidden = !this.isHidden;
  }
  savedUserData() {
    this.loggedUser.set(JSON.parse(localStorage.getItem('socialUser')!));
  }
  deletePost(postId: string) {
    this.postsService.deleteSinglPost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/feeds']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  savePost(postId: string) {
    this.postsService.bookMarkPost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostDetails();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
