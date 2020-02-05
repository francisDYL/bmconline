import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient, private storageService: StorageService) { }

	signin(email: string, password: string): Observable<any> {
		return this.http.post(`${environment.apiUrl}/user/signin`, {
			email,
			password
		});
	}

	signup(user: User): Observable<any> {
		return this.http.post(`${environment.apiUrl}/user/signup`, user);
	}

	saveLoginData(data) {
		this.storageService.save(data.token, data.user);
	}

	getCurrentUser() {
		return this.storageService.getCurrentUser();
	}


	logout(): void {
		this.storageService.clear();
	}
}
