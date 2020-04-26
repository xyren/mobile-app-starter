import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ToastController, Events } from 'ionic-angular';

import Parse from 'parse';

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {

  constructor(public toastCtrl: ToastController, public events: Events, public storage: Storage) {
    console.log('Hello CommonServiceProvider Provider');

    // this.events.subscribe('user:loggedIn', (user) => {
    //   this.storage.set('user', user);
    // });
  }

  /**
   * Email validation
   * @param  {string}   email
   * @return {boolean}
   */
  validEmail (email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  /**
   * Username validation
   * @param  {string}   username
   * @return {boolean}
   */
  validUsername(username: string) {
    return /^[0-9a-zA-Z]+$/.test(username);
  }

  toastSuccess(msg: string = 'Request successfully process.', duration: number = 1500) {
  	return this.toastCtrl.create({
	    message: msg,
	    duration: duration,
	    position: 'top',
      cssClass: 'toast-success'
	  });
  }
	
	toastError(msg: string = 'All fields requried', duration: number = 2000) {
  	this.toastCtrl.create({
      message: 'Error: ' + msg,
      duration: duration,
      cssClass: 'toast-error'
    }).present();
		return;
	 }

  toastErrorSubmit(error) {
    if (error.code === Parse.Error.CONNECTION_FAILED)
    	return this.toastError("Couldn't even connect to the server!");
    
    return this.toastError(error.message);
  }

  initializeActiveUser(request) {
    this.storage.set('user',{
      'id': request.id,
      'username': request.get('username'),
      'role': request.get('role'),
      'email': request.get('email'),
      'session': request,
    });
  }

  inSyncError(key: string) {
    let syncError = this.storage.get('sync-error');
    return syncError.then((val) => {
      console.log('search in error sync');
      if (val == null){
        return false;
      }
      // to be valid array
      let lists = val.split(';');

      console.log('error sync list', lists);
      return lists.includes(key, 0);
    });
  }

  SaveSyncError(key: string) {
    let syncError = this.storage.get('sync-error');
    syncError.then((val) => {

      if(val == null){
        val = '';
      }
      let lists = val.split(';');
      if ( lists.includes(key, 0) == false) {
        lists.push(key);
      }
      console.log('error sync list - updated');
      this.storage.set('sync-error', lists.join(';'));
    });
  }

  RemoveSyncError(key: string) {
    let syncError = this.storage.get('sync-error');
    syncError.then((val) => {

      if(val == null){
        val = '';
      }
      let lists = val.split(';');
      let index = lists.indexOf(key);
      if ( index > -1 ) {
        lists.splice(index, 1);
        console.log('error sync list - removed');
      }
      this.storage.set('sync-error', lists.join(';'));
    });
  }

  getAllAccess() {

    const rolesAccess = [
      {
        name: 'Users Management', access: false, 
        options: [
          {name: 'Users List', subtitle: 'List all users', value: 'user-list', access: false},
          {name: 'Add New User', subtitle: 'Able to add new user', value: 'user-add', access: false},
          {name: 'Update User Info', subtitle: 'Update some users information', value: 'user-edit', access: false},
          {name: 'Ban/ Lock User Account', subtitle: 'Can banned users on lock theire account', value: 'user-lock', access: false}
        ]
      },
      {
        name: 'Invitation Management', access: false, 
        options: [
          {name: 'Send Invitation', value: 'invitation-send', access: false},
        ]
      },
      {
        name: 'User Roles', access: false, 
        options: [
          {name: 'User Roles List', subtitle: 'List all users', value: 'role-list', access: false},
          {name: 'Add Roles', subtitle: 'Able to add new user', value: 'role-add', access: false},
          {name: 'Update Roles Info', subtitle: 'Update some users information', value: 'role-edit', access: false},
          {name: 'Delete Roles', subtitle: 'Can banned users on lock theire account', value: 'role-delete', access: false}
        ]
      },
      {
        name: 'Post Content', access: false, 
        options: [
          {name: 'Can Post Survey', subtitle: 'List all users', value: 'role-list', access: false},
          {name: 'Can Post News', subtitle: 'Able to add new user', value: 'role-add', access: false},
          {name: 'Can Post Announcement', subtitle: 'Update some users information', value: 'role-edit', access: false},
          {name: 'Can Post Gallery', subtitle: 'Can banned users on lock theire account', value: 'role-delete', access: false},
          {name: 'Can Post Upcoming Events', subtitle: 'Can banned users on lock theire account', value: 'role-delete', access: false},
        ]
      },
    ];

    return rolesAccess;
  }

}
