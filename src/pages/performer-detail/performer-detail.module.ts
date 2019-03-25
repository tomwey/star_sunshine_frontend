import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerformerDetailPage } from './performer-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PerformerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PerformerDetailPage),
    PipesModule
  ],
})
export class PerformerDetailPageModule { }
