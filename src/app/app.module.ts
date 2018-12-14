import { SharedModule } from './shared/shared.module';
/**
 * @author - Ronak Patel.
 * @description - Create class for root module.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
// ---------------------------------------------------------------------------------------//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
// import {NgbdModalFocus} from './shared/confirmation-box/confirmation-box.component'

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    // NgbModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule
    // NgbdModalFocus
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
