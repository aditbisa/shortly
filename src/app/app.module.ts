import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuIconComponent } from './components/menu-icon/menu-icon.component';
import { SpinnerIconComponent } from './components/spinner-icon/spinner-icon.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MenuIconComponent,
    SpinnerIconComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
