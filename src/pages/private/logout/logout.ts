import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../common/login/login';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';


import Parse from 'parse';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: CommonServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');

    Parse.User.logOut().then((resp) => {

      console.log('Logged out successfully', resp);
      this.navCtrl.setRoot(LoginPage);
    }, err => {
      console.log('Error logging out', err);
      this.service.toastErrorSubmit(err);
      return this.navCtrl.setRoot(LoginPage);
    })
  }

}


