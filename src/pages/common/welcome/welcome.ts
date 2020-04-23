import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterInvitationPage } from '../register-invitation/register-invitation';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  registerInvitation() {
  	const modal = this.modalCtrl.create(RegisterInvitationPage);
    modal.present();
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
