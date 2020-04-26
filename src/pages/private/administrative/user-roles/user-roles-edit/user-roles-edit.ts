import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ViewController } from 'ionic-angular';

import Parse from 'parse';
import { CommonServiceProvider } from '../../../../../providers/common-service/common-service';

/**
 * Generated class for the UserRolesEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-roles-edit',
  templateUrl: 'user-roles-edit.html',
})
export class UserRolesEditPage {

	role: any;
	rolename: string;
	roleId: string;
	roleAccess: any;
  roleAllAccess: any;
  roleNewAccess: any = [];

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
    console.log('ionViewDidLoad UserRolesViewPage');
  }

  ionViewWillEnter() {
    let role = this.navParams.get('data');
    this.roleId = role.id;
    this.rolename = role.name;
    this.roleAccess = role.access;

    const rolesAcessSet = new Promise((resolve, reject) => {
      resolve(this.service.getAllAccess());
    });

    // process to be valid roles data
    rolesAcessSet.then((val) => {
      console.log("Sync checkError value returned:", val);
      
      this.roleAllAccess = val;
	    this.roleAllAccess.forEach((k, i) => {
	      k.options.forEach( (option, v) => {
	      	let valueAcess = this.roleAllAccess[i].options[v].value;
		      if ( this.roleAccess.includes(valueAcess, 0) == true) {
		        this.roleAllAccess[i].options[v].access = true;
		      }
	      });
	    });
    });
  }

  saveRole() {

  	const unique = (val, index, self) => {
  		return self.indexOf(val) === index
  	}

    let access = [];

    this.roleAllAccess.forEach(function (options) {
      options.options.forEach(function (option, index) {
        if(option.access == true)
          access.push(option.value);
      });
    });
    
    const filteredAccess = access.filter(unique);

    // empty checking
    if (!this.rolename || this.rolename == undefined ) {
      return this.service.toastError('Rolename is requried');
    }

    // not access checked
    if ( filteredAccess.length <= 0 ) {
      return this.service.toastError('Access should be atleast one');
    }

    // loading 
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();

    // magical way to process - let the server process the request conditionally
    Parse.Cloud.run('UpdateRoleAccess', { 
				name: this.rolename.toLowerCase(),
				roleId: this.roleId,
				access: filteredAccess.join(';'),
				status: true
			}).then((resp) => {
			console.log('User Role successfully update.', resp);

			loading.dismiss();
			let toast = this.service.toastSuccess('User Role successfully update.');
      toast.onDidDismiss(() => {
        this.events.publish('admin:role');
        this.viewCtrl.dismiss();
      });
  		toast.present();
    }, err => {
    	
    	loading.dismiss();
    	loading.onDidDismiss(() => {
        return this.service.toastErrorSubmit(err);
    	});
    });


    // const RoleAccess = Parse.Object.extend("RoleAccess");
    // const role = new RoleAccess();
    // role.set('roleId', this.roleId);
    // role.set('name', this.rolename.toLowerCase());
    // role.set('access', filteredAccess.join(';'));
    // role.set('status', true);
    // role.save()
    // .then((role) => {
    //   loading.dismiss();
    //   let toast = this.service.toastSuccess('User Role successfully update.');
    //   toast.onDidDismiss(() => {
    //     this.events.publish('admin:role');
    //     this.viewCtrl.dismiss();
    //   });
    //   toast.present();
    // }, (error) => {
    //   loading.dismiss();
    //   loading.onDidDismiss(() => {        
    //     return this.service.toastErrorSubmit(error);
    //   });
    // });
    
    

  }

}



//   }

// }
