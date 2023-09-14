import { Inject, Injectable } from '@angular/core';

import { BROWSER_STORAGE } from '@app/platform.token';
import { UserLink } from '@schemas/shortly.schema';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}

  /** Storage Key */
  private readonly storageKey = 'user-links';

  /**
   * Save user links.
   */
  save(links: UserLink[]) {
    const value = JSON.stringify(links);
    this.storage.setItem(this.storageKey, value);
  }

  /**
   * Load user links.
   */
  load(): UserLink[] {
    const value = this.storage.getItem(this.storageKey);
    try {
      /** @todo Data validation from storage */
      return JSON.parse(value || '[]');
    } catch (err) {}
    return [];
  }
}
