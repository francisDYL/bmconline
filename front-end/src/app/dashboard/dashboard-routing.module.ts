import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardDesignerComponent} from './dashboard-designer/dashboard-designer.component';

const routes: Routes = [
  {
    path : '',
    component: DashboardDesignerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
export const dashbordComponents = [DashboardDesignerComponent];
