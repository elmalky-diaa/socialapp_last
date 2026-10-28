import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FllowSuggestion } from '../../../../core/models/fllow-suggestion.interface';
import { FilterionPipe } from '../../../../shared/pipes/filterion-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-side',
  imports: [FilterionPipe, FormsModule],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.css',
})
export class RightSideComponent implements OnInit {
  private readonly authService = inject(AuthService);
  allSuggestions: WritableSignal<FllowSuggestion[]> = signal([]);
  searchTerm = signal('');

  ngOnInit(): void {
    this.getFollowSuggestions();
  }

  getFollowSuggestions() {
    this.authService.GetFollowSuggestions().subscribe({
      next: (res) => {
        console.log(res.data.suggestions);
        this.allSuggestions.set(res.data.suggestions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
