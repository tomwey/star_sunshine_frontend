import { NgModule } from '@angular/core';
import { JobItemComponent } from './job-item/job-item';
import { PerformItemComponent } from './perform-item/perform-item';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { QuillModule } from 'ngx-quill';
import { FormFieldsComponent } from './form-fields/form-fields';

@NgModule({
	declarations: [JobItemComponent,
		PerformItemComponent, FormFieldsComponent],
	imports: [IonicModule, IonicPageModule, QuillModule.forRoot({
		modules: {
			toolbar: [
				['bold', 'italic', 'underline', 'strike'],        // toggled buttons
				['blockquote', 'code-block'],
				[{ 'header': 1 }, { 'header': 2 }],               // custom button values
				[{ 'list': 'ordered' }, { 'list': 'bullet' }],
				[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
				[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
				[{ 'direction': 'rtl' }],                         // text direction
				// [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
				// [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

				[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
				// [{ 'font': [] }],
				[{ 'align': [] }],
				['clean'],                                         // remove formatting button
				['link', 'image']
			]
		},
		placeholder: '输入内容'
	})],
	exports: [JobItemComponent,
		PerformItemComponent, FormFieldsComponent]
})
export class ComponentsModule { }
