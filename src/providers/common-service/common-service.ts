import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import Parse from 'parse';

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {

  constructor(public toastCtrl: ToastController) {
    console.log('Hello CommonServiceProvider Provider');
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
