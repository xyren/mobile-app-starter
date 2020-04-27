import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, ViewController } from 'ionic-angular';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';

/**
 * Generated class for the InvitationDeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitation-delete',
  templateUrl: 'invitation-delete.html',
})
export class InvitationDeletePage {

	code: string;
	email: string;
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
    console.log('ionViewDidLoad InvitationDeletePage');
  this.initializePage();
  }

  initializePage() {

		let data = this.navParams.get('delete');
    if (data !== null && data !== undefined) {

    	console.log('data pass', data);
      const deleteReq = new Promise((resolve, reject) => {
        resolve(this.processDeleteRequest(data));
      });

      // process to be valid roles data
      deleteReq.then((val) => {
        console.log('returned', val);
        this.events.publish('admin:invitation');
				this.viewCtrl.dismiss();
				return;
      }).catch(error => {
        // error data-delete retrieve
        return;
      });
    } else {
    	this.service.toastError('Data invitation not found.');
    	this.viewCtrl.dismiss();
    	return;
    }
  }

  processDeleteRequest(item) {

    // loading 
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    const Invitation = Parse.Object.extend('Invitation');
    const query = new Parse.Query(Invitation);
    query.equalTo('objectId', item.id );
    query.equalTo('email', item.email );
    return query.find().then(results => {
      console.log('resolve pending delete request');
      console.log(results);
      if ( results.length > 0 ) {
        // delete request to server
        results[0].destroy({});

        loading.dismiss();
        let toast = this.service.toastSuccess('Invitation successfully deleted.');
        toast.present();

      } else {
      	loading.dismiss();
        this.service.toastError('Cant find the invitation data.');
        return false;
      }
    })
    .catch(error => {
    	loading.dismiss();
      console.log('sync error delete handler')
      this.service.toastErrorSubmit(error);
      return false;
    });
  }

}
