import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoadInitPage } from '../pages/common/load-init/load-init';

import Parse from 'parse';
import { Configuration } from '../config';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoadInitPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private config: Configuration, 
    ) {

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

    // configuration values
    const env = this.config.ENV;
    const parseConfig = this.config.parse[env];

    // initialize Parse connection
    Parse.initialize( parseConfig.appId , parseConfig.masterKey );
    Parse.serverURL = parseConfig.serverURL;

    console.log('Application ENV: ' + env);
    console.log('Parse Server: ' + parseConfig.serverURL);

  }
}

