import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


import { LogoutPage } from '../logout/logout';
import { ChangePasswordPage } from '../change-password/change-password';
import { UserProfilePage } from '../user-profile/user-profile';


import { CommonServiceProvider } from '../../../providers/common-service/common-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public service: CommonServiceProvider) {
  	this.initializePage();
  }

  initializePage() {
  	return this.service.toastError('testing service error handler');
  }

  logout() {
    this.navCtrl.setRoot(LogoutPage);
  }

  profile() {
    this.navCtrl.setRoot(UserProfilePage);
  }

  changePassword() {
    const modal = this.modalCtrl.create(ChangePasswordPage);
    modal.present();
  }


  


}
