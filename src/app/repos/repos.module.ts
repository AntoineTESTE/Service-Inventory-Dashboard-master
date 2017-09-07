import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReposComponent } from './repos.component';

@NgModule({
  declarations: [
    ReposComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [],
  exports: [ReposComponent]
})

export class ReposModule { }
