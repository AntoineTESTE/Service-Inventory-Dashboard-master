import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReposComponent } from './repos.component';



@NgModule({
  declarations: [
    ReposComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [ReposComponent]
})
export class ReposModule { }
