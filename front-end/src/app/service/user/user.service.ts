import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(private storageService: StorageService,
				public afs: AngularFirestore, 
				public afAuth: AngularFireAuth,
				private router: Router,
				) { 
					this.afAuth.authState.subscribe(data => {
						if (data) {
							const user : User = {
								uid: data.uid,
								email : data.email,
								emailVerified: data.emailVerified,
								displayName: data.displayName,
								photoURL: data.photoURL,
								phoneNumber: data.phoneNumber,
								isAnonymous: data.isAnonymous
							}
							this.storageService.save(user);
							userSubject.next(user);

						} else {
						  this.storageService.clear();
						}
					  });
				}

	signin(email: string, password: string) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	signup(email: string, password: string){
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	saveLoginData(data) {
		this.storageService.save(data);
	}

	user$(): Observable<User> {
		return userSubject.asObservable();
	}

	isUserLogIn(){
		return this.storageService.isUserData();
	}
	logout(): void {
		this.afAuth.auth.signOut();
		this.storageService.clear();
		this.router.navigate(['/']);
	}
}
