import { Component } from '@angular/core';
import { Observable, Subscription, catchError, map, of, tap } from 'rxjs';

import { ShortlyService } from '@services/shortly.service';
import { UserLink } from '@schemas/shortly.schema';

interface UserLinkView extends UserLink {
  copied: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private shortly: ShortlyService) {}

  /** UI State */
  popupMenuVisible: boolean = false;
  processing: boolean = false;
  inputUrl: string = '';
  errorMsg: string = '';

  /** Data */
  userLinks: UserLinkView[] = [];
  subs: Subscription[] = [];

  /** Angular LifeCycle: OnInit. */
  ngOnInit() {
    const s1 = this.shortly.links$.subscribe((links: UserLink[]) => {
      this.userLinks = links.map((link: UserLink) => {
        return { ...link, copied: false };
      });
    });
    this.subs.push(s1);
  }

  /** Angular LifeCycle: OnDestroy. */
  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

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
        tap(() => {
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
