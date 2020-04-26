import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../common/login/login';

import { Storage } from '@ionic/storage';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage,
    public service: CommonServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    // remove current user info
    this.storage.remove('user');
    Parse.User.logOut().then(() => {
      console.log('Logged out successfully');
      this.navCtrl.setRoot(LoginPage);
    }, err => {
      console.log('Error logging out', err);
      this.service.toastErrorSubmit(err);
      return this.navCtrl.setRoot(LoginPage);
    })
  }

}


