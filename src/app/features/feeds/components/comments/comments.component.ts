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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../core/models/iposts.interface';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly toastr = inject(ToastrService);
  allComments: WritableSignal<Icomments[]> = signal([]);

  postId: InputSignal<string> = input.required();
  loggedUser: WritableSignal<User> = signal({} as User);

  commentBody = new FormControl('');
  commentFile: File | null = null;
  commentImgUrl = signal<string | ArrayBuffer | null | undefined>('');

  ngOnInit(): void {
    this.getPostComment();
    this.savedUserData();
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
  preparedCommentFile(e: Event) {
    let input = e.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.commentFile = input.files[0];
      this.readCommentFile();
    }
  }
  readCommentFile() {
    if (!this.commentFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.commentFile);
    fileReader.onload = (e) => {
      this.commentImgUrl.set(e.target?.result);
    };
  }
  createComment(e: SubmitEvent, form: HTMLFormElement) {
    e.preventDefault();
    console.log(this.commentBody.value);
    console.log(this.commentFile);
    let formData = new FormData();
    if (this.commentBody.value) {
      formData.append('content', this.commentBody.value);
    }
    if (this.commentFile) {
      formData.append('image', this.commentFile);
    }

    this.commentsService.createComments(this.postId(), formData).subscribe({
      next: (res) => {
        console.log(res);
        form.reset();
        this.commentImgUrl.set('');
        this.commentFile = null;
        this.getPostComment();
        this.toastr.success('Added Success');
      },
      error: (err) => {
        this.toastr.error(err.error.message);

        console.log(err);
      },
    });
    this.getPostComment();
  }
  savedUserData() {
    this.loggedUser.set(JSON.parse(localStorage.getItem('socialUser')!));
  }
  deleteComment(commentId: string) {
    this.commentsService.deleteComments(this.postId(), commentId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostComment();
        this.toastr.success('Deleted Success');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        console.log(err);
      },
    });
  }
}
