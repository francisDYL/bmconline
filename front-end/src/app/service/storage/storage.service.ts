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
	private projectAddedSubject = new Subject<Project>();

	constructor() {
		this.storage = window[environment.storageKey];
	}

	clear() {
		this.storage.removeItem(environment.tokenKey);
		this.storage.removeItem(environment.userKey);
	}

	save(token: string, currentUser: any) {
		this.clear();

		this.storage.setItem(environment.tokenKey, token);
		this.storage.setItem(environment.userKey, JSON.stringify(currentUser));
	}

	getToken(): string {
		return this.storage.getItem(environment.tokenKey);
	}

	getCurrentUser(): User {
		return JSON.parse(this.storage.getItem(environment.userKey));
	}

	isTokenPresent(): boolean {
		const token = this.getToken();
		return token && token.length > 0;
	}

	getUserProjects() {
		const user = this.getCurrentUser();
		const projects = user.projects;
		return projects;
	}

	addProjectToUser(project: Project) {
		const user = this.getCurrentUser();
		user.projects.push(project);
		this.storage.removeItem(environment.userKey);
		this.storage.setItem(environment.userKey, JSON.stringify(user));

		this.announceNewProjectAdded(project);
	}

	subscribeToNewProjectAdded(): Observable<Project> {
		return this.projectAddedSubject.asObservable();
	}

	announceNewProjectAdded(project: Project) {
		this.projectAddedSubject.next(project);
	}

}
