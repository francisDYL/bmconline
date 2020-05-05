import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {dashbordComponents} from './dashboard-routing.module';

import { AngularMaterialModules } from '../angularMaterialImport';
import {SharedModule} from '../shared/shared.module';

import { AddNoteDialogComponent } from '../shared/add-note-dialog/add-note-dialog.component';
import {EditProjectComponent} from '../shared/edit-project/edit-project.component';
@NgModule({
  declarations: [...dashbordComponents],
  entryComponents: [AddNoteDialogComponent,EditProjectComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ...AngularMaterialModules,
    SharedModule
  ]
})
export class DashboardModule { }
