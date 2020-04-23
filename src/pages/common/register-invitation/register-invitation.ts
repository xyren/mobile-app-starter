import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { LoadInitPage } from '../load-init/load-init';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the RegisterInvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-invitation',
  templateUrl: 'register-invitation.html',
})
export class RegisterInvitationPage {

  email: string;
  code: string;
  username: string;
  password: string;
  confirmpassword: string;
  fullname: string;
  position: string;
  role: number = 0;

  invalidCode: boolean;
  registrationForm: boolean;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
		public loadingController: LoadingController,
		public service: CommonServiceProvider
  	) {

  	this.initializePage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterInvitationPage');
  }

  initializePage() {
    this.invalidCode = true;
    this.registrationForm = false;
  }

  success() {
    // this.navCtrl.setRoot(WelcomePage);
  }

  validateCode() {

    // empty checking
    if (!this.code || this.code == undefined ) {
      return this.service.toastError('Invitation Code is requried');
    }

    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    // search if already have 
    // parse query search for email - invitation
    const Invitation = Parse.Object.extend("Invitation");
    const query = new Parse.Query(Invitation);

    query.equalTo('objectId', this.code);
    query.withCount();
    query.find().then(results => {

      loading.dismiss();

      if (results.count > 0) {
        this.invalidCode = false;
        let toast = this.service.toastSuccess('Validation success');
        toast.onDidDismiss(() => {
          this.registrationForm = true;
        });
        toast.present();

        let result = results.results[0];
        this.email = result.get('email');
        this.fullname = result.get('fullname');
        this.position = result.get('position');
        this.role = result.get('role');

        if (!this.role || this.role == undefined ) {
          this.role = 0;
        }

      } else {
        return this.service.toastError('Invitation code invalid');
      }
    })
    .catch(error => {
      console.log(error);
      loading.dismiss();
      loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(error);
      });
    });
  }

  register() {

    // empty checking
    if (
      (!this.username || this.username == undefined ) || 
      (!this.password || this.password == undefined ) || 
      (!this.confirmpassword || this.confirmpassword == undefined )
    ) {
      return this.service.toastError();
    }

    if (this.service.validUsername(this.username) == false) {
      return this.service.toastError('Invalid username format(Alphanumeric)');
    }
    if (this.username.length < 4) {
      return this.service.toastError('Username minimum of 4 chars');
    }

    if (this.password.length < 4) {
      return this.service.toastError('Password minimum of 4 chars');
    }

    // password not match
    if ( this.password != this.confirmpassword ) {
      return this.service.toastError('Password not matched');
    }

    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    const User = Parse.Object.extend("User");
    const user = new User();
    user.set('username', this.username.toLowerCase());
    user.set('password', this.password);
    user.set('fullname', this.fullname);
    user.set('position', this.position);
    user.set('email', this.email);
    user.set('invitationCode', this.code);
    user.set('role', this.role);
    user.set('status', 1);
    user.save()
    .then((user) => {

      loading.dismiss();
      this.invalidCode = false;
      this.registrationForm = false;

      let toast = this.service.toastSuccess('Registration success');

      // do the auto-login 
      Parse.User.logIn(this.username.toLowerCase(), this.password).then((resp) => {
        console.log('Logged in successfully', resp);

        // let toast = this.service.toastSuccess('Logged-in successfully');
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
          loading.dismiss();
          this.navCtrl.setRoot(LoadInitPage)
        });
        toast.present();
      }, err => {
        loading.onDidDismiss(() => {
          return this.service.toastErrorSubmit(err);
        });
      });
    }, (error) => {

      console.log(error);
      loading.dismiss();
      loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(error);
      });

    });
  }
}
