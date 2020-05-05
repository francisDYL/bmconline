import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Project} from '../../model/project';
import {User} from '../../model/user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

	private storage: Storage;

	constructor() {
		this.storage = window.sessionStorage;
	}

	clear() {
		if(this.isUserData) this.storage.removeItem(environment.userKey);
	}

	save(data: any) {
		this.clear();
		this.storage.setItem(environment.userKey, JSON.stringify(data));
	}

	getLoginData(){
		return JSON.parse(this.storage.getItem(environment.userKey));
	}

	isUserData(){
		const user = this.storage.getItem(environment.userKey);
		return (user !== null && user !== undefined)
	}
}
