import { InjectionToken } from '@angular/core';

export const NAVIGATOR = new InjectionToken<Navigator>('Navigator', {
  providedIn: 'root',
  factory: () => navigator,
});

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});
