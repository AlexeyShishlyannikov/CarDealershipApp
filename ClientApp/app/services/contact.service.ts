import { Contact } from './../models/contact';
import { Http } from '@angular/http/';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ContactService {
	// originUrl: string = "http://localhost:50181";
	originUrl: string = 'http://autocity1.azurewebsites.net';

	constructor(
		private http: Http,
	) { }

	public getContacts(){
		return this.http.get(`${this.originUrl }/api/contacts/`)
			.map(res => res.json());
	}

	public updateContacts(contacts: Contact) {
		return this.http.put(`${this.originUrl }/api/contacts/`, contacts)
			.map(res => res.json());
	}
}
