import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobListPage } from './job-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    JobListPage,
  ],
  imports: [
    IonicPageModule.forChild(JobListPage),
    ComponentsModule
  ],
})
export class JobListPageModule { }
