import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
	selector: 'app-make-form',
	templateUrl: './make-form.component.html',
	styleUrls: ['./make-form.component.css']
})
export class MakeFormComponent implements OnInit {
	makes: any[];
	models: any[];
	selectedMake: any = {
		id: 0,
		name: ''
	};
	model : any = {
		makeId: 0,
		name: ''
	};
	constructor(
		private	modelService: ModelService,
		private	vehicleSevice: VehicleService
	) { }

	ngOnInit() {
		this.vehicleSevice.getMakes()
			.subscribe(makes => {
				this.makes = makes;
			});
		
	}
	addModel(){
		this.modelService.addVehicleModel(this.model)
			.subscribe();
	}
	onMakeChange() {
		this.model.makeId = this.selectedMake.id;
		console.log(this.selectedMake.id);
	}


}
