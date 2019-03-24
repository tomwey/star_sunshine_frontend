import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaDetailPage } from './media-detail';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    MediaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaDetailPage),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    PipesModule,
  ],
})
export class MediaDetailPageModule {}
