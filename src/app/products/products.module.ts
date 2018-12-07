import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  declarations: [ViewComponent, DetailsComponent, AddComponent]
})
export class ProductsModule { }
