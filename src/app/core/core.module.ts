import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule
  ],
  declarations: [FooterComponent],
  exports: [NavbarModule, FooterComponent]
})
export class CoreModule { }
