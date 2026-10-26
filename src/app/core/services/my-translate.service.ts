import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly translateService = inject(TranslateService);
  private readonly platformid = inject(PLATFORM_ID);
  constructor() {
    if (isPlatformBrowser(this.platformid)) {
    }
  }
}
