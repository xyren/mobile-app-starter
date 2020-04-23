import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

	username: string;
	email: string;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public loadingController: LoadingController, 
  	public viewCtrl: ViewController,
  	public service: CommonServiceProvider
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  forgotpassword() {

	  // empty checking
	  if ((!this.username || this.username == undefined ) || (!this.email || this.email == undefined )) {
	  	return this.service.toastError();
	  }

	  if (this.service.validUsername(this.username) == false) {
	  	return this.service.toastError('Invalid username format.');
	  }
	  if (this.service.validEmail(this.email) == false) {
	  	return this.service.toastError('Invalid email format.');
	  }

  	let loading = this.loadingController.create({content: "Please wait..."});
   	loading.present();

		Parse.Cloud.run('ForgotPassword', { 
				username: this.username.toLowerCase(),
				email: this.email.toLowerCase()
			}).then((resp) => {
			console.log('New Password successfully sent', resp);

			loading.dismiss();
			this.viewCtrl.dismiss();
      let toast = this.service.toastSuccess('New password successfully sent to your email.');
  		toast.present();
    }, err => {
    	
    	loading.dismiss();
    	loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(err);
    	});
    });
  }

}
