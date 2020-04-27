import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageListPage } from './page-list';

@NgModule({
  declarations: [
    PageListPage,
  ],
  imports: [
    IonicPageModule.forChild(PageListPage),
  ],
})
export class PageListPageModule {}
