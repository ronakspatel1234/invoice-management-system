/**
 * @author: Yamini Gala
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//--------------------------------------------------------
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { ItemDesTestComponent } from './item-des-test/item-des-test.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule
  ],
  declarations: [AddComponent, ViewComponent, DetailsComponent,ItemDesTestComponent]
 
})
export class InvoicesModule { }
