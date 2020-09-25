import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: 'pconnection',
  loadChildren: () => import('./pconnection/pconnection.module').then(m => m.PconnectionModule)
}];

const rootRoutes = RouterModule.forRoot(routes)
// console.log(rootRoutes);

@NgModule({
  imports: [rootRoutes],
  exports: [RouterModule]
})
export class AppRoutingModule { }
