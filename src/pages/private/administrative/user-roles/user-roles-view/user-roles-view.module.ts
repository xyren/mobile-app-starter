import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRolesViewPage } from './user-roles-view';

@NgModule({
  declarations: [
    UserRolesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRolesViewPage),
  ],
})
export class UserRolesViewPageModule {}
