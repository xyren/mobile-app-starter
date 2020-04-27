import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationSendPage } from './invitation-send';

@NgModule({
  declarations: [
    InvitationSendPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationSendPage),
  ],
})
export class InvitationSendPageModule {}
