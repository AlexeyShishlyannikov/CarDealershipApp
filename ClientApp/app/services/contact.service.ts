import { Contact } from './../models/contact';
import { Http } from '@angular/http/src/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactService {

	constructor(private http: Http) { }

	public getContacts(){
		this.http.get("/api/contacts/")
			.map(res => res.json());
	}

	public updateContacts(contacts: Contact) {
		this.http.put("/api/contacts/", contacts)
			.map(res => res.json());
	}
}