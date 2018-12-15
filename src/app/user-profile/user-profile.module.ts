/**
 * @author - Ronak Pate.
 * @description - Create class  for user profile module.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ----------------------------------------------------------------------------------------------------//
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InformationComponent } from './user-profile/information/information.component';
import { PasswordSettingComponent } from './user-profile/password-setting/password-setting.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ],
  declarations: [UserProfileComponent,
    InformationComponent,
    PasswordSettingComponent]
})
export class UserProfileModule { }
