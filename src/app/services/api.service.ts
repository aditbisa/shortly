import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ShortenResponse } from '@app/schemas/api.schema';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  /** API Url */
  private readonly apiUrl = 'https://api.shrtco.de/v2';

  /**
   * Shorten url.
   *
   * @param userUrl
   * @returns - Shorten response.
   */
  shorten(userUrl: string): Observable<ShortenResponse> {
    const safeUrl = encodeURIComponent(userUrl);
    const url = `${this.apiUrl}/shorten?url=${safeUrl}`;
    return this.http.get<ShortenResponse>(url);
  }
}
