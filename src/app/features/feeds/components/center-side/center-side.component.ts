import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../shared/services/posts/posts.service';
import { Iposts, User } from '../../../../core/models/iposts.interface';
import { CommentsComponent } from '../comments/comments.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { UsernamePipe } from '../../../../shared/pipes/username-pipe';

@Component({
  selector: 'app-center-side',
  imports: [
    CommentsComponent,
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    TitleCasePipe,
    UsernamePipe,
  ],
  templateUrl: './center-side.component.html',
  styleUrl: './center-side.component.css',
})
export class CenterSideComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(NgxSpinnerService);

  imgFile!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>('');
  currentPage = signal(1);
  totalPages = signal(1);
  isLoading = signal(false);
  allPosts: WritableSignal<Iposts[]> = signal([]);
  postBody = new FormControl();
  postPrivacy = new FormControl('public');
  isHidden = true;
  openMenuId: string | null = null;
  loggedUser: WritableSignal<User> = signal({} as User);
  ngOnInit(): void {
    this.getAllPosts();
    this.savedUserData();
  }
  getAllPosts(page: number = 1) {
    // this.isLoading.set(true);
    // this.spinner.show();

    this.postsService.getAllPosts(page).subscribe({
      next: (res) => {
        // console.log(res.data.posts);

        this.allPosts.set(res.data.posts);
        this.currentPage.set(res.meta.pagination.currentPage);
        this.totalPages.set(res.meta.pagination.numberOfPages);
        // this.isLoading.set(false);
        // this.spinner.hide();
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        // this.isLoading.set(false);
        this.spinner.hide();
      },
    });
  }
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.getAllPosts(this.currentPage() + 1);
    }
  }
  previousPage() {
    if (this.currentPage() > 1) {
      this.getAllPosts(this.currentPage() - 1);
    }
  }
  preparedUploadedFile(e: Event) {
    let input = e.target as HTMLInputElement;
    if (input) {
      if (input.files) {
        this.imgFile = input.files[0];
        // console.log(this.imgFile);
        this.readFile();
      }
    }
  }
  readFile() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.imgFile);
    fileReader.onload = (e) => {
      this.imgUrl.set(e.target?.result);
      // console.log(this.imgUrl);
    };
  }
  createPost(e: SubmitEvent, form: HTMLFormElement) {
    e.preventDefault();
    console.log(this.postBody.value);
    console.log(this.postPrivacy.value);
    console.log(this.imgFile);
    let formData = new FormData();
    if (this.postBody.value) {
      formData.append('body', this.postBody.value);
    }
    if (this.imgFile) {
      formData.append('image', this.imgFile);
    }

    if (this.postPrivacy.value) {
      formData.append('privacy', this.postPrivacy.value);
    }
    this.postsService.creatPosts(formData).subscribe({
      next: (res) => {
        console.log(res);
        form.reset();
        this.imgUrl.set('null');
        this.getAllPosts();
        this.toastr.success('Added Success');
      },
      error: (err) => {
        this.toastr.error(err.error.message);

        // console.log(err);
      },
    });
    this.getAllPosts();
  }

  toggleDiv() {
    this.isHidden = !this.isHidden;
  }

  toggleMenu(postId: string) {
    if (this.openMenuId === postId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = postId;
    }
  }
  savedUserData() {
    this.loggedUser.set(JSON.parse(localStorage.getItem('socialUser')!));
  }
  deletePost(postId: string) {
    this.postsService.deleteSinglPost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts();
        this.toastr.warning('Post Deleated');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      },
    });
  }
  savePost(postId: string) {
    this.postsService.bookMarkPost(postId).subscribe({
      next: (res) => {
        this.getAllPosts();
        this.toastr.info('Post Saved');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
}
