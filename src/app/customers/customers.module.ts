/**
 * @author Vaibhavi Prajapati
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------------------------//
import { ViewComponent } from './view/view.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  declarations: [ViewComponent, DetailComponent, AddComponent]
})
export class CustomersModule { }
