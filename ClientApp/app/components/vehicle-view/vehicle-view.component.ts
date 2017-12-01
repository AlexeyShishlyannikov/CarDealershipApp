import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { PhotoService } from '../../services/photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
	selector: 'app-vehicle-view',
	templateUrl: './vehicle-view.component.html',
	styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {
	vehicle: any ={
		makeId: 0,
		modelId: 0,
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
	photos: any[];
	vehicleId: number;
	constructor(
		private vehicleService: VehicleService,
		private photoService: PhotoService,
		private route: ActivatedRoute,
		private router: Router,
		private contactService: ContactService
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
