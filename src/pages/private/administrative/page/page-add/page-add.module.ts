import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageAddPage } from './page-add';

@NgModule({
  declarations: [
    PageAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PageAddPage),
  ],
})
export class PageAddPageModule {}
