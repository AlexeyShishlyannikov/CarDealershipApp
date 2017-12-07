import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
	styleUrls: [
	'./navmenu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
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
	status: boolean;
	subscription: Subscription;

	constructor(
		private userService: UserService,
		private contactService: ContactService
	) {}
	ngOnInit() {
		this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
		this.contactService.getContacts()
			.subscribe(c => {
				this.contacts = c;
				this.contacts.phone = this.formatPhoneNumber(this.contacts.phone);
			});
	}
	formatPhoneNumber(num : string) {

	var matched = num.match(/\d+\.?\d*/g) || '';

	// 10 digit
	if (matched.length === 3) {
		return '(' + matched[0] + ') ' + matched[1] + '-' + matched[2];
		// 7 digit
	} else if (matched.length === 2) {
		return matched[0] + '-' + matched[1];
	}
	// no formatting attempted only found integers (i.e. 1234567890)
	else if (matched.length === 1) {
		// 10 digit
		if (matched[0].length === 10) {
			return '(' + matched[0].substr(0, 3) + ') ' + matched[0].substr(3, 3) + '-' + matched[0].substr(6);
		}
		// 7 digit
		if (matched[0].length === 7) {
			return matched[0].substr(0, 3) + '-' + matched[0].substr(3);
		}
	}

	// Format failed, return number back
	return num;
}

	logout() {
		this.userService.logout();
	}

	ngOnDestroy() {
		// prevent memory leak when component is destroyed
		this.subscription.unsubscribe();
	}
}
