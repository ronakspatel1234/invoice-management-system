import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ------------------------------------------------ //
import { SharedModule } from './shared/shared.module';


const routes: Routes = [
  {
    path: 'invoice',
   loadChildren:'./invoices/invoices.module#InvoicesModule'
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
