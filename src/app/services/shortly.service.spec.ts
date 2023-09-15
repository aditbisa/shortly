import { TestBed } from '@angular/core/testing';
import { catchError, of } from 'rxjs';

import { NAVIGATOR } from '@app/platform.token';
import { ShortenResponse } from '@schemas/api.schema';
import { UserLink } from '@schemas/shortly.schema';
import { ShortlyService } from './shortly.service';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';

describe('ShortlyService', () => {
  let service: ShortlyService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let navigatorSpy: jasmine.SpyObj<Navigator>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['shorten']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'save',
      'load',
    ]);
    navigatorSpy = jasmine.createSpyObj('Navigator', [], {
      clipboard: {
        writeText: jasmine.createSpy(),
      },
    });

    storageServiceSpy.load.and.returnValue([]);

    TestBed.configureTestingModule({
      providers: [
        { provide: NAVIGATOR, useValue: navigatorSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    });
    service = TestBed.inject(ShortlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should short user link and save to storage', () => {
    const userLink = 'https://some-long.com/with/deep/path.heh';
    const result = {
      url: userLink,
      shortUrl: 'http://s.a/a',
    } as UserLink;

    apiServiceSpy.shorten.and.returnValue(
      of({
        ok: true,
        result: {
          full_short_link: 'http://s.a/a',
        },
      } as ShortenResponse),
    );

    service.short(userLink).subscribe((res) => expect(res).toEqual(result));

    expect(storageServiceSpy.save).toHaveBeenCalledWith([result]);
  });

  it('should throw error on api error', () => {
    const userLink = 'https://some-long.com/with/deep/path.heh';

    apiServiceSpy.shorten.and.returnValue(
      of({
        ok: false,
        error: 'Fail',
      } as ShortenResponse),
    );

    service
      .short(userLink)
      .pipe(
        catchError((err: Error) => {
          expect(err.message).toBe('Fail');
          return of(null);
        }),
      )
      .subscribe();

    expect(storageServiceSpy.save).not.toHaveBeenCalled();
  });

  it('should copy user link', async () => {
    const userLink = 'https://some-long.com/with/deep/path.heh';

    await service.copy(userLink);

    expect(navigatorSpy.clipboard.writeText).toHaveBeenCalledWith(userLink);
  });
});
