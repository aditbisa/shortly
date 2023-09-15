import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { NAVIGATOR } from '@app/platform.token';
import { ShortenResponse } from '@schemas/api.schema';
import { UserLink } from '@schemas/shortly.schema';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ShortlyService {
  constructor(
    @Inject(NAVIGATOR) private navigator: Navigator,
    private apiService: ApiService,
    private storageService: StorageService,
  ) {
    this.load();
  }

  /** Data */
  private linksSubject = new BehaviorSubject<UserLink[]>([]);
  get links$(): Observable<UserLink[]> {
    return this.linksSubject.asObservable();
  }

  /**
   * Shorten the url.
   *
   * @param url
   * @returns - Observable of short link.
   * @throws - Error
   */
  short(url: string): Observable<ShortenResponse> {
    return this.apiService.shorten(url).pipe(
      tap((data: ShortenResponse) => {
        if (!data.ok) {
          throw new Error(data.error || 'Api Error');
        }
        this.save({
          url,
          shortUrl: data.result.full_short_link,
        });
      }),
    );
  }

  /**
   * Copy url to clipboard.
   */
  copy(url: string) {
    this.navigator.clipboard.writeText(url);
  }

  /**
   * Save link to storage and publish.
   */
  private save(link: UserLink) {
    const links = this.linksSubject.value;
    links.push(link);
    this.storageService.save(links);
    this.linksSubject.next(links);
  }

  /**
   * Load user links from storage and publish.
   */
  private load() {
    const links = this.storageService.load();
    this.linksSubject.next(links);
  }
}
