import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header';
import { MainMenuComponent } from './main-menu/main-menu';
@NgModule({
	declarations: [PageHeaderComponent,
    MainMenuComponent],
	imports: [],
	exports: [PageHeaderComponent,
    MainMenuComponent]
})
export class ComponentsModule {}
