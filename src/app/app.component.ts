import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

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
   * Copy url.
   */
  copy(link: UserLinkView) {
    this.shortly.copy(link.shortUrl);
    link.copied = true;
    setTimeout(() => (link.copied = false), 5_000);
  }
}
