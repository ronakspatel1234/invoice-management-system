/**
 * @author - Ronak Patel.
 * @description -
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// --------------------------------------------------------------------------------------------------------//
import { FooterComponent } from './footer/footer.component';
import { NavbarModule } from './navbar/navbar.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    AuthModule
  ],
  declarations: [FooterComponent],
  exports: [NavbarModule,
    FooterComponent]
})
export class CoreModule { }
