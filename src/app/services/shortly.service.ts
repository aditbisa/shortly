import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShortlyService {
  /**
   * Shorten the url.
   *
   * @param url
   * @returns - Observable of short link.
   */
  short(url: string): Observable<string> {
    return of('https://short.url/asd').pipe(delay(500));
  }
}
