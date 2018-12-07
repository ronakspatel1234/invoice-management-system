import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ------------------------------------------------ //
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule'
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
