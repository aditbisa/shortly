import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-icon',
  templateUrl: './spinner-icon.component.svg',
  standalone: true,
})
export class SpinnerIconComponent {
  @Input() class: string = '';
}
