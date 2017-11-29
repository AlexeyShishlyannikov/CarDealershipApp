import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { SaveVehicle, Vehicle } from '../../models/vehicle';
import { ActivatedRoute, Router } from '@angular/router/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';


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
		private vehicleService: VehicleService,
		private route: ActivatedRoute,
		private router: Router
	) {
		route.params.subscribe(p => {
			if (p['id'])
				this.vehicle.id = +p['id'] || 0;
		});
	 }

	ngOnInit() {
		var sources = [
			this.vehicleService.getMakes()
		];
		if(this.vehicle.id > 0){
			sources.push(this.vehicleService.getVehicle(this.vehicle.id));
		}
			Observable.forkJoin(sources).subscribe(data => {
				this.makes = data[0];
				if(this.vehicle.id > 0){
					this.setVehicle(data[1]);
				}
				this.populateModels();
			}, err => {
				if(err.status == 404){
					this.router.navigate(['/home']);
				}
			});
	}

	private setVehicle(v: Vehicle){
		this.vehicle.makeId = v.make.id;	
		this.vehicle.modelId = v.model.id;
		this.vehicle.yearMade = v.yearMade;
		this.vehicle.price = v.price;
		this.vehicle.vinNumber = v.vinNumber;
		this.vehicle.transmissionType = v.transmissionType;
		this.vehicle.mileage = v.mileage;
		this.vehicle.color = v.color;
		this.vehicle.mpg = v.mpg;
		this.vehicle.features = v.features;
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
		if (this.vehicle.id > 0) {
			this.vehicleService.updateVehicle(this.vehicle.id, this.vehicle)
				.subscribe(x => console.log(this.vehicle, "UPDATED"));
		} else {
			this.vehicleService.addVehicle(this.vehicle)
				.subscribe(x => {
					console.log(this.vehicle, "CREATED");
				});
		}
		
	}
}
