import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';

/**
 * Generated class for the UserRolesViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-roles-view',
  templateUrl: 'user-roles-view.html',
})
export class UserRolesViewPage {

	role: any;
	rolename: string;
	roleId: string;
	roleAccess: any;
  roleAllAccess: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: CommonServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRolesViewPage');
  }

  ionViewWillEnter() {
    let role = this.navParams.get('data');
    this.roleId = role.id;
    this.rolename = role.name;
    this.roleAccess = role.access;
    this.roleAllAccess = this.service.getAllAccess();
  }

}

