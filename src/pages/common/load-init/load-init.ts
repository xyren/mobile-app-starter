import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../../private/home/home';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import Parse from 'parse';
/**
 * Generated class for the LoadInitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-load-init',
  templateUrl: 'load-init.html',
})
export class LoadInitPage {
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events, 
    public service: CommonServiceProvider,
    public storage: Storage
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadInitPage');
    this.initializePage();
  }

  initializePage() {

    // let install = new Parse.Installation();
    // // install.set('email', this.email);
    // install.save(null, {
    //   success: (install) => {
    //     // Execute any logic that should take place after the object is saved.
    //     // this.result = 'New object created with objectId: ' + install.id;
    //   },
    //   error: (install, error) => {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     // this.result = ('Failed to create new object, with error code:' + error.message.toString());
    //   }
    // });

    // const pendingSave = new Promise((resolve, reject) => {
    //     resolve(this.service.ActiveUser());
    //   });

    //   pendingSave.then((val) => {
    //     console.log("Pending value returned:",val);

    //     console.log('currentUser', val);

    //   });

    // check if user is logged-in
    Parse.User.currentAsync().then(user => {
      if (user === undefined || user === null) {
        setTimeout(() => {
            this.navCtrl.setRoot(WelcomePage)
          }, 800);
        return;
      }

      console.log('active', user);

      let page = user ? HomePage : WelcomePage;
      this.events.publish('user:loggedIn',user);

      setTimeout(() => {
        this.navCtrl.setRoot(page)
      }, 800);
    }, err => {

      console.log('Error getting logged user');
      setTimeout(() => {
        this.navCtrl.setRoot(WelcomePage)
      }, 3000);
    })
  }

}
