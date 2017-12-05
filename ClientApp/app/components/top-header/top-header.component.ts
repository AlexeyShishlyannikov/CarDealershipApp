import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
	contacts: Contact = {
		id: 0,
		contactName: '',
		phone: '',
		street: '',
		city: '',
		zipCode: '',
		facebookUrl: '',
		InstagramUrl: ''
	};
	constructor(private contactService: ContactService) { }

	ngOnInit() {
		this.contactService.getContacts()
			.subscribe(c => this.contacts = c);
	}
}
