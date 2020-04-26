import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { LogoutPage } from '../private/logout/logout';


import Parse from 'parse';
import { CommonServiceProvider } from '../../providers/common-service/common-service';

/**
 * Generated class for the InstallationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-installation',
  templateUrl: 'installation.html',
})
export class InstallationPage {

	username: string;
	email: string;
	password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, public service: CommonServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstallationPage');
  }

  logout() {
  	this.navCtrl.setRoot(LogoutPage, {}, {animate: true, direction: 'forward'});
  }

  createAdmin() {

    // loading modal
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

  	Parse.Cloud.run('InstallApplication', { 
				action: 'createUser',
				username: this.username.toLowerCase(),
				password: this.password,
        role: '10',
				email: this.email.toLowerCase()
			}).then((resp) => {

			console.log('Admin Account create', resp);

			loading.dismiss();
			// this.viewCtrl.dismiss();
      let toast = this.service.toastSuccess('New password successfully sent to your email.');
  		toast.present();
    }, err => {
    	
    	loading.dismiss();
    	loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(err);
    	});
    });

  }


  // InstallApplication

}
