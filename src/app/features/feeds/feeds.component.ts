import { Component } from '@angular/core';
import { LeftSideComponent } from './components/left-side/left-side.component';
import { CenterSideComponent } from './components/center-side/center-side.component';
import { RightSideComponent } from './components/right-side/right-side.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feeds',
  imports: [LeftSideComponent, CenterSideComponent, RightSideComponent, RouterOutlet],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
})
export class FeedsComponent {
  actvieState: string = 'community';

  changeFeed(eventInfo: PointerEvent) {
    let targetElement = eventInfo.target as HTMLElement;
    this.actvieState = targetElement?.innerText.toLowerCase();
  }
}
