import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { MatSidenavModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { StorageService } from './service/storage/storage.service';
import {UserService} from './service/user/user.service';
@NgModule({
	declarations: [
		AppComponent,
		LandingComponent,
		SignInComponent,
		SignUpComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule
	],
	providers: [
		StorageService,
		UserService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
