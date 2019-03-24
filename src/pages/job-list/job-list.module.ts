import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobListPage } from './job-list';

@NgModule({
  declarations: [
    JobListPage,
  ],
  imports: [
    IonicPageModule.forChild(JobListPage),
  ],
})
export class JobListPageModule {}
