import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayHistoryPage } from './play-history';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PlayHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayHistoryPage),
    PipesModule
  ],
})
export class PlayHistoryPageModule {}
