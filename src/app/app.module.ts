import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReposModule } from './repos/repos.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReposModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
