import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationEditPage } from './invitation-edit';

@NgModule({
  declarations: [
    InvitationEditPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationEditPage),
  ],
})
export class InvitationEditPageModule {}
