import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ShortenResponse } from '@schemas/api.schema';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should shorten user link', () => {
    const userLink = 'https://some-long.com/with/deep/path.heh';
    const result = { ok: true } as ShortenResponse;
    const apiUrl =
      service['apiUrl'] + '/shorten?url=' + encodeURIComponent(userLink);

    service.shorten(userLink).subscribe((res) => expect(res).toEqual(result));

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(result);
  });
});
