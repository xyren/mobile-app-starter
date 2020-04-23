import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterInvitationPage } from './register-invitation';

@NgModule({
  declarations: [
    RegisterInvitationPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterInvitationPage),
  ],
})
export class RegisterInvitationPageModule {}
