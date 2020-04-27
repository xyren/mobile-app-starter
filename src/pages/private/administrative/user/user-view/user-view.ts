import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, ViewController } from 'ionic-angular';


import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';
import Parse from 'parse'; 

/**
 * Generated class for the UserViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})
export class UserViewPage {

	userId: string = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingController: LoadingController,
    public events: Events,
    public viewCtrl: ViewController,
    public service: CommonServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserViewPage');
    this.initializePage();
  }

	initializePage() {

    this.userId = this.navParams.get('id');
    if (this.userId !== null && this.userId !== undefined) {

    	console.log('userId pass', this.userId);
    	
    } else {
    	this.service.toastError('User data not found.');
    	this.viewCtrl.dismiss();
    	return;
    }
  }

}
