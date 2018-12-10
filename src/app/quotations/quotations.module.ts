/**
 * @author Sonal Prajapati
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// -------------------------------//
import { QuotationRoutingModule } from './quotations-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    QuotationRoutingModule
  ],
  declarations: [ViewComponent, AddComponent, DetailsComponent]
})
export class QuotationsModule { }
