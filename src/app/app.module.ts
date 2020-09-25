import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PconnectionModule} from "./pconnection/pconnection.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PconnectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
