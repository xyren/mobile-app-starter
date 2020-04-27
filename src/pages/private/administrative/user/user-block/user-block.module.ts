import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBlockPage } from './user-block';

@NgModule({
  declarations: [
    UserBlockPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBlockPage),
  ],
})
export class UserBlockPageModule {}
