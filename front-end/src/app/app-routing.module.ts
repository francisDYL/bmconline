import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoGuard } from './guard/demo.guard';
import { DashboardGuard } from './guard/dashboard.guard';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';

const routes: Routes = [
	{
		path: '',
		component: AppComponent,
		children: [
			{
				path: '',
				component: LandingComponent
			}
		]
	},
	{
		path: 'signin',
		component: SignInComponent
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path: 'demo',
		loadChildren: './demo/demo.module#DemoModule',
		canActivate: [DemoGuard]
	},
	{
		path: 'dashboard',
		loadChildren: './dashboard/dashboard.module#DashboardModule',
		canActivate: [DashboardGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
