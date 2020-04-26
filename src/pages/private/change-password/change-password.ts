import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';

import { LogoutPage } from '../logout/logout';

import { Storage } from '@ionic/storage';
import Parse from 'parse';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	username: string;
  email: string;
	newpassword: string;
	confirmpassword: string;
  activeUser: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public loadingController: LoadingController, 
  	public viewCtrl: ViewController,
    public storage: Storage,
  	public service: CommonServiceProvider
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');

    // retrieve username
    let currentUser = this.storage.get('user');
    currentUser.then((val) => {
      this.username = val.username;
      this.email = val.email;
    });
  }

  changePassword() {

	  // empty checking
	  if (
	  	(!this.confirmpassword || this.confirmpassword == undefined ) || 
	  	(!this.newpassword || this.newpassword == undefined )
	  	) {
	  	return this.service.toastError();
	  }

	  // minimum length
	  if (this.newpassword.length < 4) {
      return this.service.toastError('New Password minimum of 4 chars');
    }

	  // password not match
	  if ((this.newpassword != this.confirmpassword )) {
	  	return this.service.toastError('New password not matched to repeat field');
	  }

    // username verification in session
    if (!this.username || this.username == undefined ){
      return this.service.toastError('Session data retrieve. Please allow application to use local storage.');
    }

  	let loading = this.loadingController.create({content: "Please wait..."});
   	loading.present();

		Parse.Cloud.run('ChangePassword', { 
				email: this.email,
        username: this.username,
				newpassword: this.newpassword
			}).then((resp) => {
			console.log('Password successfully changed');

			loading.dismiss();
			
      let toast = this.service.toastSuccess('Password changed. You will be logging out.');
      toast.onDidDismiss(() => {
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot(LogoutPage)
      });
  		toast.present();
    }, err => {
    	
    	loading.dismiss();
    	loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(err);
    	});
    });

  }


}
