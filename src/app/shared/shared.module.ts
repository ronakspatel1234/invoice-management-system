import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------------------------- //
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { OrderByComponent } from './order-by/order-by.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent
  ],
  exports: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent
  ]
})
export class SharedModule { }
