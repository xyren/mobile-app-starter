import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Events, LoadingController } from 'ionic-angular';

import { UserRolesAddPage } from '../user-roles-add/user-roles-add';
import { UserRolesEditPage } from '../user-roles-edit/user-roles-edit';
import { UserRolesViewPage } from '../user-roles-view/user-roles-view';
import { UserRolesDeletePage } from '../user-roles-delete/user-roles-delete';


import { Storage } from '@ionic/storage';
import Parse from 'parse';
import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';
/**
 * Generated class for the UserRolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-roles',
  templateUrl: 'user-roles.html',
})
export class UserRolesPage {

	roleAccess: any = null;
  syncErrorVal: string = 'roles';
  dataHandler: any = [];

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
  	public events: Events,
    public storage: Storage,
  	public service: CommonServiceProvider
  	) {
		
    this.events.subscribe('admin:role', () => {
      console.log('subscribe admin Role');
      // this.roleAccess = null;
      this.initializePage(true, false);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRolesPage');

    // sync error data check
    const errorSync = new Promise((resolve, reject) => {
      resolve(this.service.inSyncError(this.syncErrorVal));
    });

    // process to be valid roles data
    errorSync.then((val) => {
      console.log("Sync checkError value returned:", val);
      if (val == true){
        // force sync
        this.initializePage(true);
        console.log('is in error sync');  
      } else {
        this.initializePage();
      }

    });
  }

  // get total invitation
  getRoles() {
    const RoleAccess = Parse.Object.extend('RoleAccess');
    const query = new Parse.Query(RoleAccess);
    // query.equalTo('name', 'Admin');
    return query.find().then(results => {
      console.log('resolve pending');

      // remove in error sync if done.
      this.service.RemoveSyncError(this.syncErrorVal);
      return results;
    })
    .catch(error => {

      console.log('sync error handler')
      // add to list of error sync
      this.service.SaveSyncError(this.syncErrorVal);
      this.service.toastErrorSubmit(error);
      return null;
    });
  }

  initializePage(sync: boolean = false, viewToast: boolean = true) {

  	// load local storage
  	if( sync == false ) {
  		
	    // retrieve from local storage
	    let roles = this.storage.get('roles');
	    roles.then((val) => {
	      this.roleAccess = val;
	    });
  		return;
  	}

  	// sync data from server
    const roles = new Promise((resolve, reject) => {
      resolve(this.getRoles());
    });

    // process to be valid roles data
    roles.then((val) => {
      console.log("Roles value returned:", val);
      
      if (val == null){
        return this.roleAccess = null;
      }

      this.dataHandler = val;

      let roles = new Array();
      this.dataHandler.forEach(function (role) {
      	console.log(role);
        roles.push({
        	id: role.id,
        	name: role.get('name'),
        	status: role.get('status'),
        	access: role.get('access').split(';'),
        });
      });
      this.roleAccess = roles;

      // save to local storage
      this.storage.set('roles', this.roleAccess);

      if (viewToast == true) {
        let toast = this.service.toastSuccess('Data sync completed.');
        toast.present();
      }

    }).catch(error => {
      // error data retrieve

      return;
    });
  }

  addRole() {
    const modal = this.modalCtrl.create( UserRolesAddPage );
    modal.present();
  }

  editRole(item) {
    const modal = this.modalCtrl.create( UserRolesEditPage, {
      data: item
    });
    modal.present();
  }

  viewRole(item) {
    const modal = this.modalCtrl.create( UserRolesViewPage, {
      data: item
    });
    modal.present();
  }

  deleteRole(item) {
    let alert = this.alertCtrl.create({
      title: 'Delete Role',
      message: 'Are you sure you want to delete this Role? <b>'
       + item.name 
       + '</b><br><span>All users in this role will be transfer regular user</span>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');            
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete confirmed');
            const modal = this.modalCtrl.create( UserRolesDeletePage, {delete: item });
            modal.present();
          }
        }
      ]
    });
    alert.present();
  }

  // pull refresh
  doRefresh(event) {
    this.initializePage(true);
    console.log('Begin async operation');

    setTimeout(() => {
      
      console.log('Async operation has ended');
      event.complete();
    }, 1500);
  }
}
