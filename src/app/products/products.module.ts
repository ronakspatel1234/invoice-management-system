import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module'
import { ProductsRoutingModule } from './products-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
import {ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { ProductsService } from './products.service';
import {FormsModule} from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsRoutingModule
  ],
  providers:[ProductsService],
  declarations: [ViewComponent, DetailsComponent, AddComponent],
  exports:[AddComponent]
})
export class ProductsModule { }
