import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './services/user.service';
import { LocalStorage } from './helper/local-storage';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class NoAuthGuard implements CanActivate {
	subscription: Subscription;
	status: boolean;

	constructor(
		private user: UserService,
		private router: Router,
		@Inject(LocalStorage) private localStorage: any
	) { }
	canActivate() {
		if (this.isLoggedIn()) {
			this.router.navigate(['/']);
			console.log(!this.isLoggedIn());
			return false;
		}


		return true;
	}

	isLoggedIn() {
		this.user.authNavStatus$.subscribe(status => this.status = status);
		console.log(this.status);
		return this.status;
	}
}
