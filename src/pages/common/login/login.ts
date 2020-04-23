import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { LoadInitPage } from '../load-init/load-init';
import { WelcomePage } from '../welcome/welcome';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
  password: string;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
  	public loadingController: LoadingController,
  	public service: CommonServiceProvider
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  welcome() {
    this.navCtrl.setRoot(WelcomePage);
  }

  forgotpassword() {
    const modal = this.modalCtrl.create(ForgotPasswordPage);
    modal.present();
  }

  signIn() {

	  // empty checking
	  if ((!this.username || this.username == undefined ) || (!this.password || this.password == undefined )) {
	  	return this.service.toastError();
	  }

  	let loading = this.loadingController.create({content: "Please wait..."});
   	loading.present();

 		Parse.User.logIn(this.username.toLowerCase(), this.password).then((resp) => {
      console.log('Logged in successfully', resp);

      let toast = this.service.toastSuccess('Logged-in successfully');
		  toast.onDidDismiss(() => {
		    console.log('Dismissed toast');
		    loading.dismiss();
		    this.navCtrl.setRoot(LoadInitPage)
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
