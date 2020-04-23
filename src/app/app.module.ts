import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { LoadInitPage } from '../pages/common/load-init/load-init';
import { WelcomePage } from '../pages/common/welcome/welcome';
import { LoginPage } from '../pages/common/login/login';
import { RegisterInvitationPage } from '../pages/common/register-invitation/register-invitation';
import { ForgotPasswordPage } from '../pages/common/forgot-password/forgot-password';

// Private pages - user should be logged-in
import { HomePage } from '../pages/private/home/home';
import { LogoutPage } from '../pages/private/logout/logout';
import { UserProfilePage } from '../pages/private/user-profile/user-profile';

// Administrative Pages


// Custom Components
import { MainMenuComponent } from '../components/main-menu/main-menu';
import { PageHeaderComponent } from '../components/page-header/page-header';

// Services
import { CommonServiceProvider } from '../providers/common-service/common-service';

@NgModule({
  declarations: [
    MyApp,
    
    LoadInitPage,
    WelcomePage,
    LoginPage,
    RegisterInvitationPage,
    ForgotPasswordPage,

    HomePage,
    LogoutPage,
    UserProfilePage,

    MainMenuComponent,
    PageHeaderComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    LoadInitPage,
    WelcomePage,
    LoginPage,
    RegisterInvitationPage,
    ForgotPasswordPage,

    HomePage,
    LogoutPage,
    UserProfilePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonServiceProvider
  ]
})
export class AppModule {}
