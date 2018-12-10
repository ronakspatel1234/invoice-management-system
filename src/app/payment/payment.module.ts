/**
 * @author - Shahbaz Shaikh
 * @description - This module file are fetures module for payment.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------------------------------- //
import { PaymentRoutingModule } from './payment-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { PaymentService } from './payment.service';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule
  ],
  declarations: [
    ViewComponent,
    AddComponent,
    DetailsComponent
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
