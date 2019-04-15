import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePerformerPage } from './create-performer';

@NgModule({
  declarations: [
    CreatePerformerPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePerformerPage),
  ],
})
export class CreatePerformerPageModule {}
