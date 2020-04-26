import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

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
  	// return this.service.toastError('testing service error handler');
  }

}
