import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageDeletePage } from './page-delete';

@NgModule({
  declarations: [
    PageDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(PageDeletePage),
  ],
})
export class PageDeletePageModule {}
