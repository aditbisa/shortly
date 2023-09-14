import { Component } from '@angular/core';

import { ShortlyService } from '@services/shortly.service';
import { UserLink } from '@schemas/shortly';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private shortly: ShortlyService) {}

  /** UI State */
  popupMenuVisible: boolean = false;
  processing: boolean = false;
  inputUrl: string = '';
  errorMsg: string = '';

  /** Data */
  userLinks: UserLink[] = [
    { url: 'https://adit-bisa.com', shortUrl: 'https://adit.bisa' },
    { url: 'https://brimvoid.com', shortUrl: 'https://re.link/aJw' },
  ];

  /**
   * Process input url.
   */
  short() {
    this.errorMsg = '';
    try {
      new URL(this.inputUrl);
    } catch (err) {
      this.errorMsg = 'Please provide a link';
      return;
    }

    this.processing = true;
    this.shortly.short(this.inputUrl).subscribe((shortUrl: string) => {
      this.userLinks.push({
        url: this.inputUrl,
        shortUrl,
      });
      this.processing = false;
      this.inputUrl = '';
    });
  }
}
