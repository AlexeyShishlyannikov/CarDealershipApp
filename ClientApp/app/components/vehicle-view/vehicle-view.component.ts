import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { PhotoService } from '../../services/photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-vehicle-view',
	templateUrl: './vehicle-view.component.html',
	styleUrls: [
	 '../../styles/styles.css',
		'../vehicle-list/vehicle-list.component.css',
		'../vehicle-form/vehicle-form.component.css', './vehicle-view.component.css',]
})
export class VehicleViewComponent implements OnInit {
	vehicle: any ={
		make: {
			id: 0,
			name: ''
		},
		model: {
			id: 0,
			name: ''
		},
		yearMade: 0,
		price: 0,
		vinNumber: '',
		transmissionType: '',
		mileage: 0,
		color: '',
		mpg: 0,
		features: ''
	};
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
	photos: any[] = [];
	vehicleId: number;
	status: boolean;
	subscription: Subscription;
	
	constructor(
		private vehicleService: VehicleService,
		private photoService: PhotoService,
		private route: ActivatedRoute,
		private router: Router,
		private contactService: ContactService,
		private userService: UserService
	) {
		route.params.subscribe(p => {
			this.vehicleId = +p['id'];
			if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
				router.navigate(['/vehicles']);
				return;
			}
		});		
	 }

	ngOnInit() {
		this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
		this.photoService.getPhotos(this.vehicleId)
			.subscribe(photos => this.photos = photos);
		this.vehicleService.getVehicle(this.vehicleId)
			.subscribe(vehicle =>{
				this.vehicle = vehicle;
				$('.item').first().addClass("active");
			},
			err => {
				if(err.status == 404){
					this.router.navigate(['/vehicles']);
					return;
				}
			});
			this.contactService.getContacts()
				.subscribe(c => this.contacts = c);
	}

	

}
