import { TestBed } from '@angular/core/testing';

import { UserLink } from '@schemas/shortly.schema';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  const mockData: UserLink[] = [
    { url: 'https://a.a/aaa', shortUrl: 'https://a.a/a' },
    { url: 'https://b.b/bbb', shortUrl: 'https://b.b/b' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.removeItem(service['storageKey']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data', () => {
    service.save(mockData);
    expect(localStorage.getItem(service['storageKey'])).toBe(
      JSON.stringify(mockData),
    );
  });

  it('should load data', () => {
    localStorage.setItem(service['storageKey'], JSON.stringify(mockData));
    expect(service.load()).toEqual(mockData);
  });
});
