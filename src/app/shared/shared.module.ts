import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
// ------------------------------------------- //
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { CustomCurrencyPipe } from './custome-currency.pipe';
import { OrderByComponent } from './order-by/order-by.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
   // ReactiveFormsModule

  ],
  declarations: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    CustomCurrencyPipe
  ],
  exports: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    CustomCurrencyPipe
  ]
})
export class SharedModule { }
