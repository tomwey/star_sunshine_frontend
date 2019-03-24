import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home'; 
import { MediaListPage } from '../pages/media-list/media-list';
import { TopicListPage } from '../pages/topic-list/topic-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from '../provider/Utils';
import { Tools } from '../provider/Tools';
import { Users } from '../provider/Users';
import { ApiService } from '../provider/api-service';
import { AppManager } from '../provider/AppManager';
import { Redpacks } from '../provider/Redpacks';
import { Pays } from '../provider/Pays';
import { Wechat } from '../provider/Wechat';
import { iOSFixedScrollFreeze } from '../provider/iOSFixedScrollFreeze';
import { jsClipboard } from '../provider/jsClipboard';
import { Media } from '../provider/Media';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { PipesModule } from '../pipes/pipes.module';
import { IonicImageViewerModule } from 'ionic-img-viewer';
// import { APIs } from '../provider/APIs';
// import { ApiService } from '../provider/api-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MediaListPage,
    TopicListPage,
    SettingPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    PipesModule,
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MediaListPage,
    TopicListPage,
    SettingPage,
    TabsPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils,
    // APIs,
    Tools,
    // ApiService,
    Users,
    ApiService,
    AppManager,
    Redpacks,
    Pays,
    Wechat,
    iOSFixedScrollFreeze,
    jsClipboard,
    Media,
  ]
})
export class AppModule {}
