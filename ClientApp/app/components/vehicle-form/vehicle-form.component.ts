import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { SaveVehicle } from '../../models/vehicle';

@Component({
	selector: 'app-vehicle-form',
	templateUrl: './vehicle-form.component.html',
	styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
	vehicle: SaveVehicle = {
		id: 0,
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
	makes : any[];
	models : any[];
	constructor(
		private vehicleService: VehicleService
	) { }

	ngOnInit() {
		this.vehicleService.getMakes()
			.subscribe(makes => this.makes = makes);
	}

	onMakeChange() {
		this.populateModels();
		delete this.vehicle.modelId;
	}
	private populateModels() {
		var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
		this.models = selectedMake ? selectedMake.models : [];
	}

	submit(){
		this.vehicleService.addVehicle(this.vehicle)
			.subscribe(x=>{
				console.log(this.vehicle, "CREATED");
			});
	}
}
