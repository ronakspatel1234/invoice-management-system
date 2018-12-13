import { SharedModule } from './shared/shared.module';
/**
 * @author - Ronak Patel.
 * @description - Create class for root module.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// ------------------------------- //
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
