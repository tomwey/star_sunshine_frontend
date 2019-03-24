import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerformerListPage } from './performer-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PerformerListPage,
  ],
  imports: [
    IonicPageModule.forChild(PerformerListPage),
    ComponentsModule
  ],
})
export class PerformerListPageModule { }
