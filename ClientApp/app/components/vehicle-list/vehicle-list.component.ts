import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
	selector: 'app-vehicle-list',
	templateUrl: './vehicle-list.component.html',
	styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
	vehicles : Vehicle[] = [];
	makes: KeyValuePair[];

	constructor(private vehicleService: VehicleService) { }

	ngOnInit() {
		this.vehicleService.getMakes()
			.subscribe(makes => this.makes = makes);
		
			this.populateVehicles();
	}

	private populateVehicles() {
		this.vehicleService.getVehicles()
			.subscribe(vehicles => {
				this.vehicles =vehicles;
			});
	}
}
