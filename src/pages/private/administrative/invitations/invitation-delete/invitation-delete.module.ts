import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationDeletePage } from './invitation-delete';

@NgModule({
  declarations: [
    InvitationDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationDeletePage),
  ],
})
export class InvitationDeletePageModule {}
