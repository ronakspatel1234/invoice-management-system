/**
 * @author - Ronak Patel.
 * @description -
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
// ---------------------------------------------------------------------------------------//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {ProductsModule} from './products/products.module'
// import {NgbdModalFocus} from './shared/confirmation-box/confirmation-box.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // NgbModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    ProductsModule,
    CoreModule,
    // NgbdModalFocus
  ],
  
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
