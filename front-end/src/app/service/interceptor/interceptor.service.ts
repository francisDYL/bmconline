import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

	TOKEN_HEADER_KEY = 'Authorization';

	constructor(private storageService: StorageService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): import ('rxjs').Observable<HttpEvent<any>> {
		let authReq = req;

		if (this.storageService.getToken() != null) {
			authReq = req.clone({ headers: req.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + this.storageService.getToken()) });
		}

		return next.handle(authReq);
	}

}
