import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostComponent } from '../../../../shared/components/post/post.component';
import { PostsService } from '../../../../shared/services/posts/posts.service';
import { Iposts, User } from '../../../../core/models/iposts.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from '../comments/comments.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-post',
  imports: [PostComponent, CommentsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './my-post.component.html',
  styleUrl: './my-post.component.css',
})
export class MyPostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly toastr = inject(ToastrService);

  private readonly authService = inject(AuthService);
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
  userId = signal('');
  isEditMode = signal<boolean>(false);
  editPostId = signal<string | null>(null);

  ngOnInit(): void {
    this.getProfile();
    this.savedUserData();
  }
  getAllPosts(page: number = 1) {
    console.log(this.userId());

    // this.isLoading.set(true);
    this.authService.getUserPosts(this.userId()).subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.allPosts.set(res.data.posts);
        this.currentPage.set(res.meta.pagination.currentPage);
        this.totalPages.set(res.meta.pagination.numberOfPages);
        // this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        // this.isLoading.set(false);
      },
    });
  }
  getProfile() {
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        console.log(res.data.user);
        console.log(res.data.user._id);
        this.userId.set(res.data.user._id);
        console.log(this.userId());
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
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
        console.log(this.imgFile);
        this.readFile();
      }
    }
  }
  readFile() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.imgFile);
    fileReader.onload = (e) => {
      this.imgUrl.set(e.target?.result);
      console.log(this.imgUrl);
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
      },
      error: (err) => {
        console.log(err);
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
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Edit Post
  editPost(postId: string, postBody: string, postPrivacy: string, postImage?: string) {
    this.isEditMode.set(true);
    this.editPostId.set(postId);
    this.postBody.setValue(postBody);
    this.postPrivacy.setValue(postPrivacy);
    if (postImage) {
      this.imgUrl.set(postImage);
    }
    this.openMenuId = null;
    this.isHidden = false;
  }

  updatePost(e: SubmitEvent, form: HTMLFormElement) {
    e.preventDefault();
    if (this.editPostId()) {
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
      this.postsService.updateSinglPost(this.editPostId()!, formData).subscribe({
        next: (res) => {
          console.log(res);
          form.reset();
          this.imgUrl.set('null');

          this.toastr.success('Post Updated');
          this.isEditMode.set(false);
          this.editPostId.set(null);
          this.getAllPosts();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        },
      });
    }
  }
}
