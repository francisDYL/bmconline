import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DesignerComponent } from './designer/designer.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {MatSidenavModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddNoteDialogComponent } from '../shared/add-note-dialog/add-note-dialog.component';

@NgModule({
  declarations: [DesignerComponent],
  entryComponents: [AddNoteDialogComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    FormsModule,
    SharedModule,
    MatSidenavModule,
    DragDropModule,
    MatDialogModule,
    TextFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DemoModule { }
