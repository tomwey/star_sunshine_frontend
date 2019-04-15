import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePerformerPage } from './create-performer';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreatePerformerPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePerformerPage),
    ComponentsModule
  ],
})
export class CreatePerformerPageModule { }
