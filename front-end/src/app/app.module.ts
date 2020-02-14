import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { StorageService } from './service/storage/storage.service';
import {UserService} from './service/user/user.service';
import {AngularMaterialModules} from './angularMaterialImport';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
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
		HttpClientModule,
		AppRoutingModule,
		...AngularMaterialModules,
		BrowserAnimationsModule,
		NgxSpinnerModule,
		ToastrModule.forRoot()
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
