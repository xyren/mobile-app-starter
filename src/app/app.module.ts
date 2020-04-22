import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { LoadInitPage } from '../pages/common/load-init/load-init';
import { HomePage } from '../pages/common/home/home';
import { WelcomePage } from '../pages/common/welcome/welcome';

import { CommonServiceProvider } from '../providers/common-service/common-service';

@NgModule({
  declarations: [
    MyApp,
    
    HomePage,
    LoadInitPage,
    WelcomePage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    HomePage,
    LoadInitPage,
    WelcomePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonServiceProvider
  ]
})
export class AppModule {}
