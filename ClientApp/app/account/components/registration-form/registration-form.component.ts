import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../../../models/userRegistration';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: [
		'../../../components/vehicle-list/vehicle-list.component.css',
		'../../../styles/styles.css',
		'../../../components/vehicle-form/vehicle-form.component.css', './registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
	errors: string;
	isRequesting: boolean;
	submitted: boolean = false;

	constructor(
		private userService: UserService, 
		private router: Router
	) { }

	ngOnInit() {
	}

	registerUser({value, valid}: {value: UserRegistration, valid:boolean}){
		this.submitted = true;
		this.isRequesting = true;
		this.errors = '';
		if(valid){
			this.userService.register(value.email,value.password,value.firstName,value.lastName,value.location)
				.finally(()=> this.isRequesting = false)
				.subscribe(
					result => {
						if(result){
							this.router.navigate(['/login'],
						{queryParams:{brandNew:true,
						email:value.email}});
						}
					},
					err => this.errors = err
				)
		}
	}
}
