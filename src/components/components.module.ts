import { NgModule } from '@angular/core';
import { JobItemComponent } from './job-item/job-item';
import { PerformItemComponent } from './perform-item/perform-item';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { QuillModule } from 'ngx-quill';
import { FormFieldsComponent } from './form-fields/form-fields';

@NgModule({
	declarations: [JobItemComponent,
		PerformItemComponent, FormFieldsComponent],
	imports: [IonicModule, IonicPageModule, QuillModule],
	exports: [JobItemComponent,
		PerformItemComponent, FormFieldsComponent]
})
export class ComponentsModule { }
