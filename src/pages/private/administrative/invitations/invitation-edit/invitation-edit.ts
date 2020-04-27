import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Events } from 'ionic-angular';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';

/**
 * Generated class for the InvitationEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitation-edit',
  templateUrl: 'invitation-edit.html',
})
export class InvitationEditPage {

	code: string;
	email: string;
  position: string;
  fullname: string;

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
    console.log('ionViewDidLoad InvitationEditPage');
    this.initializePage();
  }

	initializePage() {

    let data = this.navParams.get('data');
    if (data !== null && data !== undefined) {

    	console.log('data pass', data);
    	this.code = data.id;
    	this.email = data.email;
		  this.position = data.position;
		  this.fullname = data.fullname;

    } else {
    	this.service.toastError('Data invitation not found.');
    	this.viewCtrl.dismiss();
    	return;
    }
  }

  processRequest() {

    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    // parse query search for email - invitation
    const Invitation = Parse.Object.extend("Invitation");
    const query = new Parse.Query(Invitation);

    query.equalTo('objectId', this.code);
    query.equalTo('email', this.email);
    query.withCount();
    return query.find().then(results => {

      loading.dismiss();

      if (results.count > 0) {

      	let result = results.results[0];
      	console.log(results);

				result.set('position', this.position);
				result.set('fullname', this.fullname);
				result.set('status', 1); // to bypass the send invitation
		    return result.save()
		    .then((user) => {

		      loading.dismiss();
		      this.events.publish('admin:invitation');
	         this.viewCtrl.dismiss();

		      let toast = this.service.toastSuccess('Invitation successfully update');
	        toast.present();
	        return 'success';

		    }, (error) => {

		      console.log('error save', error);
		      loading.dismiss();
		      loading.onDidDismiss(() => {
		        return this.service.toastErrorSubmit(error);
		      });
		    });
		  } else {
		  	return this.service.toastError('Invitation data not found.');
		  }
    })
    .catch(error => {
      console.log('error find ', error);
      loading.dismiss();
      loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(error);
      });
    });
  }

  saveChanges() {

  	// empty checking
    if ( ( !this.email || this.email == undefined ) ||
        ( !this.position || this.position == undefined ) ||
        ( !this.fullname || this.fullname == undefined ) 
      ){
      return this.service.toastError();
    }

    // sync error data check
    const resquestToServer = new Promise((resolve, reject) => {
      resolve(this.processRequest());
    });

    resquestToServer.then((val) => {
      console.log("Request value returned:", val);
      if (val == 'success'){
        // force sync
        // this.initializePage(true);
        console.log('changes saved');  
      } else {
      	console.log('reult error', val)
        // this.initializePage();
      }

    });

  }

}
