import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerformerListPage } from './performer-list';

@NgModule({
  declarations: [
    PerformerListPage,
  ],
  imports: [
    IonicPageModule.forChild(PerformerListPage),
  ],
})
export class PerformerListPageModule {}
