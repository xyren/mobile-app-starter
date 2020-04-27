import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Configuration } from '../config';

import { InstallationPage } from '../pages/installation/installation';
import { LoadInitPage } from '../pages/common/load-init/load-init';
import { WelcomePage } from '../pages/common/welcome/welcome';
import { LoginPage } from '../pages/common/login/login';
import { RegisterInvitationPage } from '../pages/common/register-invitation/register-invitation';
import { ForgotPasswordPage } from '../pages/common/forgot-password/forgot-password';

// Private pages - user should be logged-in
import { HomePage } from '../pages/private/home/home';
import { LogoutPage } from '../pages/private/logout/logout';

import { UserProfilePage } from '../pages/private/profile/user-profile/user-profile';
import { UserProfileEditPage } from '../pages/private/profile/user-profile-edit/user-profile-edit';

import { ChangePasswordPage } from '../pages/private/change-password/change-password';
import { AdminMenuPage } from '../pages/private/admin-menu/admin-menu';

// Administrative Pages
import { UserRolesPage } from '../pages/private/administrative/user-roles/user-roles/user-roles';
import { UserRolesAddPage } from '../pages/private/administrative/user-roles/user-roles-add/user-roles-add';
import { UserRolesEditPage } from '../pages/private/administrative/user-roles/user-roles-edit/user-roles-edit';
import { UserRolesViewPage } from '../pages/private/administrative/user-roles/user-roles-view/user-roles-view';
import { UserRolesDeletePage } from '../pages/private/administrative/user-roles/user-roles-delete/user-roles-delete';

import { InvitationsPage } from '../pages/private/administrative/invitations/invitations/invitations';
import { InvitationSendPage } from '../pages/private/administrative/invitations/invitation-send/invitation-send';
import { InvitationEditPage } from '../pages/private/administrative/invitations/invitation-edit/invitation-edit';
import { InvitationDeletePage } from '../pages/private/administrative/invitations/invitation-delete/invitation-delete';

import { UserListPage } from '../pages/private/administrative/user/user-list/user-list';
import { UserViewPage } from '../pages/private/administrative/user/user-view/user-view';
import { UserAddPage } from '../pages/private/administrative/user/user-add/user-add';
import { UserEditPage } from '../pages/private/administrative/user/user-edit/user-edit';
import { UserBlockPage } from '../pages/private/administrative/user/user-block/user-block';

import { PageListPage } from '../pages/private/administrative/page/page-list/page-list';
import { PageViewPage } from '../pages/private/administrative/page/page-view/page-view';
import { PageAddPage } from '../pages/private/administrative/page/page-add/page-add';
import { PageEditPage } from '../pages/private/administrative/page/page-edit/page-edit';
import { PageDeletePage } from '../pages/private/administrative/page/page-delete/page-delete';


// Custom Components
import { MainMenuComponent } from '../components/main-menu/main-menu';
import { PageHeaderComponent } from '../components/page-header/page-header';

// Services
import { CommonServiceProvider } from '../providers/common-service/common-service';

@NgModule({
  declarations: [
    MyApp,
    
    LoadInitPage,
    InstallationPage,

    WelcomePage,
    LoginPage,
    RegisterInvitationPage,
    ForgotPasswordPage,

    HomePage,
    LogoutPage,
    UserProfilePage,
    ChangePasswordPage,
    UserProfileEditPage,
    AdminMenuPage,

    UserRolesPage,
    UserRolesAddPage,
    UserRolesEditPage,
    UserRolesViewPage,
    UserRolesDeletePage,

    InvitationsPage,
    InvitationSendPage,
    InvitationEditPage,
    InvitationDeletePage,

    UserListPage,
    UserViewPage,
    UserAddPage,
    UserEditPage,
    UserBlockPage,

    PageListPage,
    PageViewPage,
    PageAddPage,
    PageEditPage,
    PageDeletePage,

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
    InstallationPage,
    
    WelcomePage,
    LoginPage,
    RegisterInvitationPage,
    ForgotPasswordPage,

    HomePage,
    LogoutPage,
    UserProfilePage,
    ChangePasswordPage,
    UserProfileEditPage,
    AdminMenuPage,

    UserRolesPage,
    UserRolesAddPage,
    UserRolesEditPage,
    UserRolesViewPage,
    UserRolesDeletePage,
    
    InvitationsPage,
    InvitationSendPage,
    InvitationEditPage,
    InvitationDeletePage,

    UserListPage,
    UserViewPage,
    UserAddPage,
    UserEditPage,
    UserBlockPage,

    PageListPage,
    PageViewPage,
    PageAddPage,
    PageEditPage,
    PageDeletePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonServiceProvider,
    Configuration,
  ]
})
export class AppModule {}
