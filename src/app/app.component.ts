import { Component } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
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


      // if(window.ParsePushPlugin){
      //     ParsePushPlugin.getInstallationId(function(id) {
      //        // note that the javascript client has its own installation id,
      //        // which is different from the device installation id.
      //         alert("device installationId: " + id);
      //     }, function(e) {
      //         alert('error');
      //     });

      //     ParsePushPlugin.getSubscriptions(function(subscriptions) {
      //         alert(subscriptions);
      //     }, function(e) {
      //         alert('error');
      //     });

      //     ParsePushPlugin.subscribe('SampleChannel', function(msg) {
      //         alert('OK');
      //     }, function(e) {
      //         alert('error');
      //     });

      //     ParsePushPlugin.unsubscribe('SampleChannel', function(msg) {
      //         alert('OK');
      //     }, function(e) {
      //         alert('error');
      //     });

      //     ParsePushPlugin.on('receivePN', function(pn){
      //         alert('yo i got this push notification:' + JSON.stringify(pn));
      //     });
      //   }

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

