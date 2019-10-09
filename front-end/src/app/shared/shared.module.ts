import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NoteComponent } from './note/note.component';
import {AddNoteDialogComponent} from './add-note-dialog/add-note-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [NoteComponent, AddNoteDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    MatIconModule,
    TextFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [NoteComponent, AddNoteDialogComponent]
})
export class SharedModule { }
