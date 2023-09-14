import { Inject, Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { NAVIGATOR } from '@app/platform.token';
import { ShortenResponse } from '@schemas/api.schema';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ShortlyService {
  constructor(
    @Inject(NAVIGATOR) private navigator: Navigator,
    private apiService: ApiService,
  ) {}

  /**
   * Shorten the url.
   *
   * @param url
   * @returns - Observable of short link.
   * @throws - Error
   */
  short(url: string): Observable<string> {
    return this.apiService.shorten(url).pipe(
      tap((data: ShortenResponse) => {
        if (!data.ok) {
          throw new Error(data.error || 'Api Error');
        }
      }),
      map((data: ShortenResponse) => data.result.full_short_link),
    );
  }

  /**
   * Copy url to clipboard.
   */
  copy(url: string) {
    this.navigator.clipboard.writeText(url);
  }
}
