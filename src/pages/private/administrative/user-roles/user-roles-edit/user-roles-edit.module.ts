import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRolesEditPage } from './user-roles-edit';

@NgModule({
  declarations: [
    UserRolesEditPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRolesEditPage),
  ],
})
export class UserRolesEditPageModule {}
