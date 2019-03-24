import { NgModule } from '@angular/core';
import { JobItemComponent } from './job-item/job-item';
import { PerformItemComponent } from './perform-item/perform-item';
import { IonicModule, IonicPageModule } from 'ionic-angular';
@NgModule({
	declarations: [JobItemComponent,
		PerformItemComponent],
	imports: [IonicModule, IonicPageModule],
	exports: [JobItemComponent,
		PerformItemComponent]
})
export class ComponentsModule { }
