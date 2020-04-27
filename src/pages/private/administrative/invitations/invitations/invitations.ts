import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Events} from 'ionic-angular';

import { InvitationSendPage } from '../invitation-send/invitation-send';
import { InvitationEditPage } from '../invitation-edit/invitation-edit';
import { InvitationDeletePage } from '../invitation-delete/invitation-delete';
import { UserViewPage } from '../../user/user-view/user-view';

import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';
import Parse from 'parse'; 
/**
 * Generated class for the InvitationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitations',
  templateUrl: 'invitations.html',
})
export class InvitationsPage {
  
  searchResults: any = [];
  showFooter: boolean = true;
  searchTerm: string = '';
  searching: boolean = false;
  dataHandler: any = [];

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
  	public events: Events,
  	public service: CommonServiceProvider
  	) {

    this.events.subscribe('admin:invitation', () => {
      console.log('subscribe admin invitation');
      this.searchTerm = '';
      this.showFooter = true;
      this.searchResults = [];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationsPage');
  }

  searchFocus() {
    console.log('focus');
    this.showFooter = false;
  }

  searchBlur() {
    // if (this.searchTerm.length == 0) {
      // this.searchResults = [];
    // }
    this.showFooter = true;
  }

  // search to server
  makeSearch() {
    console.log('start');
    this.searching = true;
    this.searchResults = [];
    return Parse.Cloud.run('SearchKeyword', { 
      field: 'email',
      keyword: this.searchTerm.toLowerCase(),
      invitation: true,
      user: true
    }).then((resp) => {
      
      console.log('done');
      this.searching = false;
      return resp;
    }, err => {
      
      console.log(err);
      this.service.toastErrorSubmit(err);
      this.searching = false;
      return [];
    });
  }
  
  // search button
  search() {
    // minimum of 3 chars to search
    if (this.searchTerm.length >= 3) {

      // sync data from server
      const searchPending = new Promise((resolve, reject) => {
        resolve(this.makeSearch());
      });
      // process to be valid roles data
      searchPending.then((val) => {        
        if (val == null){
          return null;
        }

        this.dataHandler = val;
        // pendingVal = val;
        // console.log(val.length, 'result', val);

        if (this.dataHandler.length > 0) {
          let results = new Array();
          this.dataHandler.forEach(function (search) {

            let fullname = search.get('fullname') ? search.get('fullname') : '';
            let email = search.get('email_read') ? search.get('email_read') : search.get('email');
            let searchType = search.get('username') ? 'user' : 'invitation';
            let position = search.get('position') ? search.get('position') : 'N/A';
            let resend = search.get('resend') ? search.get('resend') : 0;

            results.push({
              id: search.id,
              email: email,
              fullname: fullname,
              position: position,
              type: searchType,
              resend: resend,
            });

          });
          this.searchResults = results;
        }
      }).catch( error => {

        console.log('error - search result', error);
        return;
      });

      this.showFooter = false;
    } else if (this.searchTerm.length == 0) {
      this.searchResults = [];
      this.showFooter = true;
    }
  }

  sendInvitation() {
  	const modal = this.modalCtrl.create( InvitationSendPage );
    modal.present();
  }

  // the send invitation page handle the request of resend - hook
  resend(item) {

    let alert = this.alertCtrl.create({
      title: 'Resend Invitations?',
      message: 'Are you sure you want to resend an invitation to <b>'
       + item.fullname 
       + '</b><br>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');            
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('confirmed Resend');

            const modal = this.modalCtrl.create( InvitationSendPage, {resend: item });
            modal.present();
          }
        }
      ]
    });
    alert.present();
  }

  // delete invitation page handle the request to separate code - hook
  deleteInvite(item) {

    let alert = this.alertCtrl.create({
      title: 'Delete Invitations?',
      message: 'Are you sure you want to DELETE an invitation for <br>'
       + '<b>' + item.fullname + '</b><br>'
       + '<b>' + item.position + '</b>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');            
          }
        },
        {
          text: 'DELETE',
          handler: () => {
            console.log('confirmed Delete');
            const modal = this.modalCtrl.create( InvitationDeletePage, {delete: item });
            modal.present();
          }
        }
      ]
    });
    alert.present();
  }

  editInvitation(item) {
    const modal = this.modalCtrl.create( InvitationEditPage, {data: item });
    modal.present();
  }

  viewUser(item) {
    const modal = this.modalCtrl.create( UserViewPage, {id: item.id });
    modal.present();
  }

  
  
}
