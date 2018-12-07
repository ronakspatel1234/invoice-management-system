
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'userprofile',
    loadChildren: './user-profile/user-profile.module#UserProfileModule'
  },
  {
    path: 'quotation',
    loadChildren: './quotations/quotations.module#QuotationsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
