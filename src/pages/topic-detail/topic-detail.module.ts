import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicDetailPage } from './topic-detail';
import { PipesModule } from '../../pipes/pipes.module';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    TopicDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicDetailPage),
    PipesModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicImageViewerModule,
  ],
})
export class TopicDetailPageModule {}
