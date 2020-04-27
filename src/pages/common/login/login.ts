import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { LoadInitPage } from '../load-init/load-init';
import { WelcomePage } from '../welcome/welcome';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { InstallationPage } from '../../installation/installation';

import { Storage } from '@ionic/storage';
import Parse from 'parse';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';

import { Configuration } from '../../../config';

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
    public storage: Storage,
    private config: Configuration, 
  	public service: CommonServiceProvider
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  welcome() {
    this.navCtrl.setRoot(WelcomePage, {}, {animate: true, animation: 'fadeInLeft'});
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

    // loading modal
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    // superadmin installation
    const userAdmin = this.config.SUPERADMIN;

    console.log(userAdmin, this.username, this.password)
    if ((this.username == userAdmin.username ) && (this.password == userAdmin.password )) {
      loading.dismiss();
      let toast = this.service.toastSuccess('Super-Admin Logged-in successfully');
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.setRoot(InstallationPage);
      });
      toast.present();

      return;
    }

    // verify in parse server request
 		Parse.User.logIn(this.username.toLowerCase(), this.password).then((resp) => {
      console.log('Logged in successfully', resp);

      // save current user data to local storage
      this.service.initializeActiveUser(resp);

      let toast = this.service.toastSuccess('Logged-in successfully');
      loading.dismiss();
  		toast.present();
      this.navCtrl.setRoot(LoadInitPage)

    }, err => {
    	
    	loading.dismiss();
    	loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(err);
    	});
    });
  }

}
