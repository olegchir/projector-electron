import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailsComponent} from "./details/details.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";

const routes: Routes = [
  {path: '', redirectTo: 'pconnection/home', pathMatch: 'full'},
  {path: 'pconnection/home', component: HomeComponent},
  {path: 'pconnection/details/:pconnectionId', component: DetailsComponent},
  {path: 'pconnection/create', component: CreateComponent},
  {path: 'pconnection/update/:pconnectionId', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PconnectionRoutingModule {
}
