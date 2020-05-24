import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NoteComponent } from './note/note.component';
import {AddNoteDialogComponent} from './add-note-dialog/add-note-dialog.component';
import {AngularMaterialModules} from '../angularMaterialImport';
import { FormsModule } from '@angular/forms';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ChatcontainerComponent } from './chatcontainer/chatcontainer.component';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';

@NgModule({
  declarations: [NoteComponent, AddNoteDialogComponent, EditProjectComponent, ChatcontainerComponent, AddProjectDialogComponent],
  imports: [
	CommonModule,
	SharedRoutingModule,
	FormsModule,
	...AngularMaterialModules
  ],
  exports: [NoteComponent, AddNoteDialogComponent, EditProjectComponent, ChatcontainerComponent, AddProjectDialogComponent]
})
export class SharedModule { }
