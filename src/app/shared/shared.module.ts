/**
 * @author - Shahbaz Shaikh
 * @description - This shared module are used for reusable Component, pipe and directives in application.
 */
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
// ------------------------------------------- //
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { CustomCurrencyPipe } from './custome-currency.pipe';
import { OrderByComponent } from './order-by/order-by.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { StatusDirective } from './table/status.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        // ReactiveFormsModule

    ],
    declarations: [
        ItemDescriptionComponent,
        OrderByComponent,
        PaginationComponent,
        SearchComponent,
        TableComponent,
        StatusDirective,
        CustomCurrencyPipe
    ],
    exports: [
        ItemDescriptionComponent,
        OrderByComponent,
        PaginationComponent,
        SearchComponent,
        TableComponent,
        StatusDirective,
        CustomCurrencyPipe
    ]
})
export class SharedModule { }
