import { Component } from '@angular/core';

import { HomePage } from '../home/home'; 
import { MediaListPage } from '../media-list/media-list';
import { TopicListPage } from '../topic-list/topic-list';

import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MediaListPage;
  tab3Root = TopicListPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
