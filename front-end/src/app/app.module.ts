import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { HttpClientModule} from '@angular/common/http';
import { StorageService } from './service/storage/storage.service';
import {UserService} from './service/user/user.service';
import {AngularMaterialModules} from './angularMaterialImport';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
@NgModule({
	declarations: [
		AppComponent,
		LandingComponent,
		SignInComponent,
		SignUpComponent
	],
	imports: [
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		AngularFireAuthModule,
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
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
