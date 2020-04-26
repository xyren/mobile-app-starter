import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRolesPage } from './user-roles';

@NgModule({
  declarations: [
    UserRolesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRolesPage),
  ],
})
export class UserRolesPageModule {}
