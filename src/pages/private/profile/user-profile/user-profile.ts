import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { HomePage } from '../../home/home';
import { UserProfileEditPage } from '../user-profile-edit/user-profile-edit';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }


  home() {
    this.navCtrl.setRoot(HomePage);
  }

  editProfile() {
    const modal = this.modalCtrl.create(UserProfileEditPage);
    modal.present();
  }

}
