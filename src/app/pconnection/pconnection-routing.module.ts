import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateComponent} from "./create/create.component";

const routes: Routes = [
  {path: '', redirectTo: 'pconnection/home', pathMatch: 'full'},
  {path: 'pconnection/home', component: HomeComponent},
  {path: 'pconnection/create', component: CreateComponent},
  {path: 'pconnection/create/:pconnectionId', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PconnectionRoutingModule {
}
