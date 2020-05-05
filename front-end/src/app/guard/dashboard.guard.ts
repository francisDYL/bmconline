import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate  {
	constructor(private router: Router, private storageService: StorageService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(this.storageService.isUserData()){
			return true;
		}
		else{
			this.router.navigate(['/']);
			return false;
		}
	}

}
