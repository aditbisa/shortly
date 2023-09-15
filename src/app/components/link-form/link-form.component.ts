import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';

import { ShortlyService } from '@services/shortly.service';
import { SpinnerIconComponent } from '@components/spinner-icon/spinner-icon.component';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  standalone: true,
  imports: [FormsModule, SpinnerIconComponent],
})
export class LinkFormComponent {
  constructor(private shortly: ShortlyService) {}

  /** UI State */
  processing: boolean = false;
  inputUrl: string = '';
  errorMsg: string = '';

  /**
   * Process input url.
   */
  short() {
    this.errorMsg = '';
    try {
      new URL(this.inputUrl);
    } catch (err) {
      this.errorMsg = 'Please provide a link';
      return;
    }

    this.processing = true;
    this.shortly
      .short(this.inputUrl)
      .pipe(
        tap(() => {
          this.inputUrl = '';
        }),
        catchError((err: Error) => {
          this.errorMsg = 'Error shortening the link';
          return of(null);
        }),
      )
      .subscribe(() => {
        this.processing = false;
      });
  }
}
