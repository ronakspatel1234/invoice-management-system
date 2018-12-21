import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// ------------------------------------------------ //
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InformationComponent } from './user-profile/information/information.component';
import { PasswordSettingComponent } from './user-profile/password-setting/password-setting.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileService } from './user-profile.service';
import { PasswordDirective } from './password.directive';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserProfileComponent,
    InformationComponent,
    PasswordSettingComponent,
    PasswordDirective
  ],
  exports: [
    PasswordDirective
  ],
  providers: [
    UserProfileService
  ]
})
export class UserProfileModule { }
