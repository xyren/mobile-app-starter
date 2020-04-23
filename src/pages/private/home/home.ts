import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { LogoutPage } from '../logout/logout';


import { CommonServiceProvider } from '../../../providers/common-service/common-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public service: CommonServiceProvider, ) {
  	this.initializePage();
  }

  initializePage() {
  	return this.service.toastError('testing service error handler');
  }

  testButton() {
    this.navCtrl.setRoot(LogoutPage);
  }

}
