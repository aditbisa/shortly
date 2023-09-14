import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.svg',
  standalone: true,
})
export class MenuIconComponent {
  @Input() class: string = '';
}
