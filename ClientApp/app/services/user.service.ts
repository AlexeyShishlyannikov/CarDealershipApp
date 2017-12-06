import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/userRegistration';

import { BaseService } from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { LocalStorage } from '../helper/local-storage';
//import * as _ from 'lodash';

// Add the RxJS Observable operators we need in this app.


@Injectable()

export class UserService {

	baseUrl: string = '/api';

	// Observable navItem source
	private _authNavStatusSource = new BehaviorSubject<boolean>(false);
	// Observable navItem stream
	authNavStatus$ = this._authNavStatusSource.asObservable();

	private loggedIn : boolean;

	constructor(
		private http: Http
	) {
		
		
		// ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
		// header component resulting in authed user nav links disappearing despite the fact user is still logged in
		this._authNavStatusSource.next(this.checkIfLoggedIn());
	}

	hasStorage(){
		try {
			localStorage.setItem('mod', 'mod');
			localStorage.getItem('mod');
			localStorage.removeItem('mod');
			return true;
		} catch (exception) {
			return false;
		}
	}

	register(email: string, password: string, firstName: string, lastName: string, location: string) {
		let body = JSON.stringify({ email, password, firstName, lastName, location });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.baseUrl + "/accounts", body, options)
			.map(res => true);
	}

	login(userName: string, password: string) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.post(
			this.baseUrl + '/auth/login',
			JSON.stringify({ userName, password }), { headers }
			)
			.map(res => res.json())
			.map(res => {
				localStorage.setItem('auth_token', res.auth_token);
				this.loggedIn = true;
				this._authNavStatusSource.next(true);
				return true;
			});
	}

	logout() {
		
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
		this._authNavStatusSource.next(false);
	}

	checkIfLoggedIn(){
		if (this.hasStorage()) {
			this.loggedIn = localStorage.getItem('auth_token') ? true : false;
			return this.loggedIn;
		}
		return false;
	}
}

