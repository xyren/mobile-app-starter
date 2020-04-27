import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewPage } from './user-view';

@NgModule({
  declarations: [
    UserViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewPage),
  ],
})
export class UserViewPageModule {}
