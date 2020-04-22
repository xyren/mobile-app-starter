import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadInitPage } from './load-init';

@NgModule({
  declarations: [
    LoadInitPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadInitPage),
  ],
})
export class LoadInitPageModule {}
