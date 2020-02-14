import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NoteComponent } from './note/note.component';
import {AddNoteDialogComponent} from './add-note-dialog/add-note-dialog.component';
import {AngularMaterialModules} from '../angularMaterialImport';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NoteComponent, AddNoteDialogComponent],
  imports: [
	CommonModule,
	SharedRoutingModule,
	FormsModule,
	...AngularMaterialModules
  ],
  exports: [NoteComponent, AddNoteDialogComponent]
})
export class SharedModule { }
