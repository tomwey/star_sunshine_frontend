import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTopicPage } from './new-topic';

@NgModule({
  declarations: [
    NewTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTopicPage),
  ],
})
export class NewTopicPageModule {}
