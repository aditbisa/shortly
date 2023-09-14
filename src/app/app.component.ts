import { Component } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

import { ShortlyService } from '@services/shortly.service';
import { UserLink } from '@schemas/shortly.schema';

interface UserLinkView extends UserLink {
  copied: boolean;
}

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
  userLinks: UserLinkView[] = [
    {
      url: 'https://adit-bisa.com',
      shortUrl: 'https://adit.bisa',
      copied: false,
    },
    {
      url: 'https://brimvoid.com',
      shortUrl: 'https://re.link/aJw',
      copied: false,
    },
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
    this.shortly
      .short(this.inputUrl)
      .pipe(
        tap((shortUrl: string) => {
          this.userLinks.push({
            url: this.inputUrl,
            shortUrl,
            copied: false,
          });
          this.inputUrl = '';
        }),
        catchError((err: Error) => {
          this.errorMsg = 'Error shortening the link';
          return of(null);
        }),
      )
      .subscribe(() => {
        this.processing = false;
      });
  }

  /**
   * Copy url.
   */
  copy(link: UserLinkView) {
    this.shortly.copy(link.shortUrl);
    link.copied = true;
    setTimeout(() => (link.copied = false), 5_000);
  }
}
