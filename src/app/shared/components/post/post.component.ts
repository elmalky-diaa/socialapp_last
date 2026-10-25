import { Component } from '@angular/core';
import { CommentsComponent } from '../../../features/feeds/components/comments/comments.component';

@Component({
  selector: 'app-post',
  imports: [CommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {}
