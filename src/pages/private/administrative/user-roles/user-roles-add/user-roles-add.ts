import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Events } from 'ionic-angular';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';

/**
 * Generated class for the UserRolesAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-roles-add',
  templateUrl: 'user-roles-add.html',
})
export class UserRolesAddPage {

	rolename: string;
  rolesAccess: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingController: LoadingController,
    public viewCtrl: ViewController,
    public events: Events,
    public service: CommonServiceProvider
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRolesAddPage');
    
    this.initializePage();
  }

  initializePage() {

    this.rolesAccess = this.service.getAllAccess();
  }

  selection(myVal, parentVal) {
  	if (myVal == false) {
  		parentVal.access = false;
  	}
  }

  saveRole() {
    let access = [];
  	console.log(this.rolesAccess);
    this.rolesAccess.forEach(function (options) {
      options.options.forEach(function (option, index) {
        if(option.access == true)
          access.push(option.value);
      });
    });

    // empty checking
    if (!this.rolename || this.rolename == undefined ) {
      return this.service.toastError('Rolename is requried');
    }

    // not access checked
    if ( access.length <= 0 ) {
      return this.service.toastError('Access should be atleast one');
    }

    // loading 
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    const RoleAccess = Parse.Object.extend("RoleAccess");
    const role = new RoleAccess();
    role.set('name', this.rolename.toLowerCase());
    role.set('access', access.join(';'));
    role.set('status', true);
    role.save()
    .then((role) => {
      loading.dismiss();
      this.events.publish('admin:role');
      this.viewCtrl.dismiss();
      let toast = this.service.toastSuccess('New User Role successfully saved.');
      toast.present();
    }, (error) => {
      loading.dismiss();
      loading.onDidDismiss(() => {        
        return this.service.toastErrorSubmit(error);
      });
    });
  }
}
