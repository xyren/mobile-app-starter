import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRolesAddPage } from './user-roles-add';

@NgModule({
  declarations: [
    UserRolesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRolesAddPage),
  ],
})
export class UserRolesAddPageModule {}
