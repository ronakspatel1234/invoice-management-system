import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'ng2-toastr';
import {FormsModule} from '@angular/forms'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// ------------------------------------------- //
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { OrderByComponent } from './order-by/order-by.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { StatusDirective } from './table/status.directive';
// import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    NgbModalModule
  ],
  declarations: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    StatusDirective,
    // ConfirmationBoxComponent,
    
  ],
  exports: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    StatusDirective,
    // ConfirmationBoxComponent
  ]
})
export class SharedModule { }
