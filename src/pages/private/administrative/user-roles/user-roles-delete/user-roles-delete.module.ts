import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRolesDeletePage } from './user-roles-delete';

@NgModule({
  declarations: [
    UserRolesDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(UserRolesDeletePage),
  ],
})
export class UserRolesDeletePageModule {}
