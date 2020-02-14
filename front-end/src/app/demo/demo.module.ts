import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DesignerComponent } from './designer/designer.component';
import { AddNoteDialogComponent } from '../shared/add-note-dialog/add-note-dialog.component';
import { AngularMaterialModules } from '../angularMaterialImport';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [DesignerComponent],
  entryComponents: [AddNoteDialogComponent],
  imports: [
	CommonModule,
	DemoRoutingModule,
	SharedModule,
	...AngularMaterialModules
  ]
})
export class DemoModule { }
