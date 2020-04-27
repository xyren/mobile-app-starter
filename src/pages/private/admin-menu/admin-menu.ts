import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LogoutPage } from '../logout/logout';
import { UserRolesPage } from '../administrative/user-roles/user-roles/user-roles';
import { InvitationsPage } from '../administrative/invitations/invitations/invitations';
import { UserListPage } from '../administrative/user/user-list/user-list';
import { PageListPage } from '../administrative/page/page-list/page-list';
/**
 * Generated class for the AdminMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-menu',
  templateUrl: 'admin-menu.html',
})
export class AdminMenuPage {
  pages: any;
  activeUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMenuPage');
    this.initializePage();
  }

  initializePage() {

    this.pages = [
      { title: 'Administrative Control', list:
        [
          { title: 'Users Account', component: UserListPage, icon: 'ios-people' },
          { title: 'User Roles', component: UserRolesPage, icon: 'ios-body' },
          { title: 'Invitations', component: InvitationsPage, icon: 'ios-paper-plane' },
          { title: 'Manage In-App Page', component: PageListPage, icon: 'ios-document' },
        ]
      },
      { title: 'The 2Success Company', list: 
        [
          { title: 'About 2Success Company', component: AdminMenuPage, icon: 'ios-body-outline' },
          { title: 'Vision & Mission', component: AdminMenuPage, icon: 'ios-people-outline' },
          { title: 'Terms and Conditions', component: AdminMenuPage, icon: 'ios-people-outline' },
          { title: 'Privacy Policy', component: AdminMenuPage, icon: 'ios-paper-plane-outline' },
        ]
      },
      { list: 
        [
          { title: 'About the Application', component: AdminMenuPage, icon: 'ios-people-outline' },
          { title: 'Report Bug', component: AdminMenuPage, icon: 'ios-paper-plane-outline' },
          { title: 'Contact the Developer', component: AdminMenuPage, icon: 'ios-paper-plane-outline' },
        ]
      },
      { list: 
        [
          { title: 'Logout your Account', type: 'root', component: LogoutPage, icon: 'ios-exit-outline', highlight: true }
        ]
      },
    ];
    


    let activeUser = this.storage.get('user');
    activeUser.then((val) => {

      console.log('activeUser', val);
    });


    // this.pages = [
    //   { title: 'Users Account', component: UsersPage, icon: 'ios-people-outline', category: 'User' },
    //   { title: 'Invitation', component: InvitationPage, icon: 'ios-paper-plane-outline', category: 'User' },
    //   { title: 'Roles', component: AdminRolesPage, icon: 'ios-body-outline', category: 'Administrator' },
    //   { title: 'Logout', component: LogoutPage, icon: 'ios-exit-outline', category: 'User' }
    // ];
  }
  
  logout() {
    this.navCtrl.setRoot(LogoutPage);
  }

  viewPage(page) {
    if(page.type !== null && page.type == 'root') {
      this.navCtrl.setRoot(page.component);
    } else {
      console.log(page);
      const modal = this.modalCtrl.create(page.component);
      modal.present();
    }
  }

}

