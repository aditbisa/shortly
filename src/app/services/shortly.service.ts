import { Inject, Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { NAVIGATOR } from '@app/platform.token';

@Injectable({ providedIn: 'root' })
export class ShortlyService {
  constructor(@Inject(NAVIGATOR) private navigator: Navigator) {}

  /**
   * Shorten the url.
   *
   * @param url
   * @returns - Observable of short link.
   */
  short(url: string): Observable<string> {
    return of('https://short.url/asd').pipe(delay(500));
  }

  /**
   * Copy url to clipboard.
   */
  copy(url: string) {
    this.navigator.clipboard.writeText(url);
  }
}
