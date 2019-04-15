import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerformerListPage } from './performer-list';
import { ComponentsModule } from '../../components/components.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [
    PerformerListPage,
  ],
  imports: [
    IonicPageModule.forChild(PerformerListPage),
    ComponentsModule,
    VirtualScrollerModule,
  ],
})
export class PerformerListPageModule { }
