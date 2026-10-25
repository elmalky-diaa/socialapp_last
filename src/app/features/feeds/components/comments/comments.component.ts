import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommentsService } from '../../../../shared/services/comments/comments.service';
import { Icomments } from '../../../../core/models/icomments.interface';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [DatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly toastr = inject(ToastrService);
  allComments: WritableSignal<Icomments[]> = signal([]);

  postId: InputSignal<string> = input.required();

  ngOnInit(): void {
    this.getPostComment();
  }
  getPostComment() {
    this.commentsService.getPostsComments(this.postId()).subscribe({
      next: (res) => {
        // console.log(res);
        this.allComments.set(res.data.comments);
        // console.log(this.allComments());
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
}
