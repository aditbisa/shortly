import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';

import { UserLink } from '@schemas/shortly.schema';
import { ShortlyService } from '@services/shortly.service';
import { LinkFormComponent } from './link-form.component';

fdescribe('LinkFormComponent', () => {
  let fixture: ComponentFixture<LinkFormComponent>;
  let shortlyServiceSpy: jasmine.SpyObj<ShortlyService>;

  beforeEach(() => {
    shortlyServiceSpy = jasmine.createSpyObj('ShortlyService', ['short']);

    TestBed.configureTestingModule({
      imports: [LinkFormComponent],
      providers: [{ provide: ShortlyService, useValue: shortlyServiceSpy }],
    });
    fixture = TestBed.createComponent(LinkFormComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should shorten url from input', fakeAsync(() => {
    const comp = fixture.componentInstance;
    const userLink = 'https://long.com/path/file';
    shortlyServiceSpy.short.and.returnValue(of({} as UserLink));

    const input = fixture.nativeElement.querySelector('input');
    input.value = userLink;
    input.dispatchEvent(new Event('input'));
    tick();

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    tick();

    expect(comp.errorMsg).toBe('');
    expect(comp.inputUrl).toBe(userLink);
    expect(comp.successUrl).toBe(userLink);
    expect(shortlyServiceSpy.short).toHaveBeenCalledWith(userLink);
  }));

  it('should display error for invalid url', fakeAsync(() => {
    const comp = fixture.componentInstance;
    const invalidLink = 'long.com/path/file';

    const input = fixture.nativeElement.querySelector('input');
    input.value = invalidLink;
    input.dispatchEvent(new Event('input'));
    tick();

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    tick();

    expect(comp.errorMsg).toBe('Please provide a link');
    expect(comp.inputUrl).toBe(invalidLink);
    expect(comp.successUrl).toBe('');
    expect(shortlyServiceSpy.short).not.toHaveBeenCalled();
  }));
});
