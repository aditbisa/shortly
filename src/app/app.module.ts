import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuIconComponent } from './components/menu-icon/menu-icon.component';
import { LinkFormComponent } from './components/link-form/link-form.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MenuIconComponent,
    LinkFormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
