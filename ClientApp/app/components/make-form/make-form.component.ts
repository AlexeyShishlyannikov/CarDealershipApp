import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-make-form',
	templateUrl: './make-form.component.html',
	styleUrls: ['./make-form.component.css',
		'../vehicle-list/vehicle-list.component.css',
		'../../styles/styles.css',
		'../vehicle-form/vehicle-form.component.css']
})
export class MakeFormComponent implements OnInit {
	makes: any[];
	model : any = {
		makeId: 0,
		name: ''
	};
	selectedMake: any = {
		name: 'Make',
		id: 0
	};
	models: any[] = [];
	constructor(
		private	modelService: ModelService,
		private	vehicleSevice: VehicleService,
		private router: Router
	) { }

	ngOnInit() {
		this.vehicleSevice.getMakes()
			.subscribe(makes => {
				this.makes = makes;
			});
		
	}
	addModel(){
		if(this.model.makeId == 0 || this.model.name.length == 0){
			console.log("Wrong inputs", this.model);
			return ;
		}
		this.modelService.addVehicleModel(this.model)
			.subscribe(x =>{
				this.router.navigate(['/vehicles/new']);
			});
	}
	onMakeChange() {
		this.model.makeId = this.selectedMake.id;
	}

	private clearMake() {
		delete this.selectedMake;
	}
	private makeChange(makeId: number) {
		this.selectedMake = this.makes.find(m => m.id == makeId);
		this.onMakeChange();
	}
}
