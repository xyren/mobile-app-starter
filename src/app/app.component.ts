import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoadInitPage } from '../pages/common/load-init/load-init';

import Parse from 'parse';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // @ViewChild(Nav) nav: Nav;

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
      Parse.initialize("9UcrqJaBvZpPO6LKrf2x3ajTaUmYxWNAMCONw1nQ", "Ylfo7XhEXuEl84M1do4oS3tChgbIWqaK6FTj0kjJ");
      Parse.serverURL = 'https://parseapi.back4app.com';
    }

  }
}

