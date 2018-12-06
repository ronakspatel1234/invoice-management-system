/**
 * @author Sonal Prajapati
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// ----------------------------------//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotationsModule } from './quotations/quotations.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    QuotationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
