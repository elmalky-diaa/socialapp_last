import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Saved } from '../../../../core/models/saved.interface';

@Component({
  selector: 'app-saved',
  imports: [],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css',
})
export class SavedComponent implements OnInit {
  private readonly authService = inject(AuthService);
  allbookmarks: WritableSignal<Saved[]> = signal([]);
  ngOnInit(): void {
    this.getBookmarks();
  }
  getBookmarks() {
    this.authService.getBookmarks().subscribe({
      next: (res) => {
        console.log(res.data.bookmarks);
        this.allbookmarks.set(res.data.bookmarks);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
