import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: [
	'./footer.component.css']
})
export class FooterComponent implements OnInit {
	contacts: Contact = {
		id: 0,
		contactName: '',
		phone: '',
		street: '',
		city: '',
		zipCode: '',
		facebookUrl: '',
		instagramUrl: ''
	};
	constructor(private contactService: ContactService) { }

	ngOnInit() {
		this.contactService.getContacts()
			.subscribe(c => this.contacts = c);
	}
}
