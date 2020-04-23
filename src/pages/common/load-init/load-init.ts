import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../../private/home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  	this.initializePage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadInitPage');
  }

  initializePage() {

    let install = new Parse.Installation();
    // install.set('email', this.email);
    install.save(null, {
      success: (install) => {
        // Execute any logic that should take place after the object is saved.
        // this.result = 'New object created with objectId: ' + install.id;
      },
      error: (install, error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        // this.result = ('Failed to create new object, with error code:' + error.message.toString());
      }
    });

    // check if user is logged-in
    Parse.User.currentAsync().then(user => {
      if (user === undefined || user === null) {
        setTimeout(() => {
            this.navCtrl.setRoot(WelcomePage)
          }, 3000);
        return;
      }

      console.log('Logged user', user);
      let page = user ? HomePage : WelcomePage;
      this.events.publish('user:loggedIn',user);

      setTimeout(() => {
        this.navCtrl.setRoot(page)
      }, 3000);
    }, err => {

      console.log('Error getting logged user');
      setTimeout(() => {
        this.navCtrl.setRoot(WelcomePage)
      }, 3000);
    })
  }

}
