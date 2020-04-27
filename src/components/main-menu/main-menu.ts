import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/private/home/home';
// import { ViewPostPage } from '../../pages/common/view-post/view-post';
import { UserProfilePage } from '../../pages/private/profile/user-profile/user-profile';
// import { NotificationPage } from '../../pages/common/notification/notification';
// import { SettingsPage } from '../../pages/common/settings/settings';
// import { OfficeMatesPage } from '../../pages/common/office-mates/office-mates';
import { AdminMenuPage } from '../../pages/private/admin-menu/admin-menu';


/**
 * Generated class for the MainMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.html'
})
export class MainMenuComponent {

  shadowClass: string = 'text-shadow';
	isAdmin: boolean = false;
	pages: any = [];
	@Input('active') active: string;
  @Input('shadow') shadow: boolean = true;
	@Input('menuColor') menuColor: string = 'text-black';

  constructor(public navCtrl: NavController,) {
    console.log('Hello MainMenuComponent Component');

    this.initializeMenu();
  }

	initializeMenu() {

		this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home' },
      { title: 'Profile', component: UserProfilePage, icon: 'ios-person'},
      { title: 'Notifications', component: HomePage, icon: 'ios-notifications'},
      { title: 'Settings', component: HomePage, icon: 'ios-settings'},
      { title: 'Office Mates', component: HomePage, icon: 'ios-contacts'},
      { title: 'Others', component: AdminMenuPage, icon: 'menu'},
    ];    
	}

  ngAfterViewInit() {
    if (this.shadow == false ) {
      this.shadowClass = 'text-no-shadow';
    }
  }

  viewPage(page) {
    // console.log(this.menu , isSelf);
    // this.navCtrl.setRoot(page.component, {}, {animate: true, animation: 'fadeInUp', duration: 1000});
    this.navCtrl.setRoot(page.component, {}, {animate: true, direction: 'forward'});
    // this.navCtrl.setRoot(page.component, {}, {animate: true, animation: 'ios-transition'});
  }

}
