import { PconnectionRoutingModule } from './pconnection-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [HomeComponent, CreateComponent],
  imports: [
    CommonModule,
    PconnectionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent, CreateComponent
  ]
})
export class PconnectionModule { }
