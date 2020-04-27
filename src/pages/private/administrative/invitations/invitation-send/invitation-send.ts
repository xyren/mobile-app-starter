import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Events } from 'ionic-angular';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';

/**
 * Generated class for the InvitationSendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitation-send',
  templateUrl: 'invitation-send.html',
})
export class InvitationSendPage {

	classContent: string = 'content-hide';
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

    console.log('ionViewDidLoad InvitationSendPage');
    this.initializePage();
  }

  initializePage() {

    if (this.resendCheck() == true ) {
      return;
    }
  }

  resendCheck() {
    let resend = this.navParams.get('resend');

    console.log('resend data', resend);

    if (resend !== null && resend !== undefined) {

      console.log('hide');
      this.classContent = 'content-hide';
      this.resendRequest(resend);
      return true;
    } else {
      this.classContent = 'content-show';
      return false;
    }
  }

  resendRequest(item) {

    this.events.publish('admin:invitation');

    // loading 
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    Parse.Cloud.run('ResendInvitation', { 
        invitationId: item.id,
        email: item.email,
        resend: (item.resend + 1),
      }).then((resp) => {
      console.log('Password successfully changed');

      loading.dismiss();
      
      let toast = this.service.toastSuccess("Invitation resend to '"+ item.email + "'. ");
      toast.present();
      this.viewCtrl.dismiss();

    }, err => {
      
      loading.dismiss();
      loading.onDidDismiss(() => {
        this.viewCtrl.dismiss();
        return this.service.toastErrorSubmit(err);
      });
    });
  }

  sendInvite() {

    // empty checking
    if ( ( !this.email || this.email == undefined ) ||
        ( !this.position || this.position == undefined ) ||
        ( !this.fullname || this.fullname == undefined ) 
      ){
      return this.service.toastError();
    }

    // invalid email format
    if (!this.service.validEmail(this.email)) {
      return this.service.toastError('Invalid email-ad format.');
    }

    this.events.publish('admin:invitation');

    // loading 
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    const Invitation = Parse.Object.extend("Invitation");
    const invitation = new Invitation();
    invitation.set("email", this.email.toLowerCase());
    invitation.set("position", this.position.toLowerCase());
    invitation.set("fullname", this.fullname.toLowerCase());
    invitation.set("status", 0);
    invitation.save()
    .then((invitation) => {
      loading.dismiss();
      let toast = this.service.toastSuccess('Invitation successfully sent to '+ this.email );
      toast.onDidDismiss(() => {
        this.fullname = '';
        this.email = '';
        this.position = '';
        // this.viewCtrl.dismiss();
      });
      toast.present();
    }, (error) => {
      console.log(error);
      loading.dismiss();
      return this.service.toastErrorSubmit(error);
    });
  }

}
