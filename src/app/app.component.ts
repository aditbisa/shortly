import { Component } from '@angular/core';

interface UserLink {
  url: string;
  shortUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** UI State */
  popupMenuVisible: boolean = false;

  /** Data */
  userLinks: UserLink[] = [
    { url: 'https://adit-bisa.com', shortUrl: 'https://adit.bisa' },
    { url: 'https://brimvoid.com', shortUrl: 'https://re.link/aJw' },
  ];
}
