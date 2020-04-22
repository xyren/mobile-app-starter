import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoadInitPage } from '../pages/common/load-init/load-init';

import Parse from 'parse';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoadInitPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // initialize Parse connection
    const deployLocal = true;
    if (deployLocal ){
      Parse.initialize("myAppId", "masterKey");
      Parse.serverURL = 'http://localhost:1337/parse';
    } else {
      Parse.initialize("***", "**"); // place your appID and master key here
      Parse.serverURL = 'https://parseapi.back4app.com';
    }

  }
}

