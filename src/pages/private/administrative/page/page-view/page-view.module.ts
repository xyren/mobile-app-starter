import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageViewPage } from './page-view';

@NgModule({
  declarations: [
    PageViewPage,
  ],
  imports: [
    IonicPageModule.forChild(PageViewPage),
  ],
})
export class PageViewPageModule {}
