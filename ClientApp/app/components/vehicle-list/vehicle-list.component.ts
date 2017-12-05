import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { PhotoService } from '../../services/photo.service';
import { UserService } from '../../services/user.service';


@Component({
	selector: 'app-vehicle-list',
	templateUrl: './vehicle-list.component.html',
	styleUrls: ['./vehicle-list.component.css',
							'../../styles/styles.css']
})
export class VehicleListComponent implements OnInit {
	vehicles : any[];
	sortingParam: string;
	sortAsc: string;
	makes: any[];
	selectedMake: any;	
	models: any[];
	selectedModel: any;
	photos: any[];
	status: boolean;

	constructor(
		private vehicleService: VehicleService,
		private photoService: PhotoService,
		private userService : UserService
	) {
	 }

	ngOnInit() {
		this.populateVehicles();
		this.vehicleService.getMakes()
			.subscribe(makes => {
				this.makes = makes;
				this.vehicleService.countMakes(this.vehicles, this.makes);
			});
		this.userService.authNavStatus$.subscribe(status => this.status = status);
	}
	

	private populateVehicles() {
		this.vehicleService.getVehicles()
			.subscribe(vehicles => { 
				this.vehicles = vehicles;
				this.populatePictures();
			});
	}
	private populatePictures(){
		this.vehicles.forEach(vehicle => {
			this.photoService.getPhotos(vehicle.id).subscribe(photos => vehicle.photos = photos);
		});
	}

	public onSortByChange(){
		var sortBy = this.sortingParam;
		var sortAsc = this.sortAsc;
		this.vehicleService.formatVehicleDate(this.vehicles);		
		this.vehicles.sort(function (a, b){
			if(sortAsc)
				return sortAsc == 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
			else
				return a[sortBy] - b[sortBy];
		});
	}

	private onMakeChange(){
		this.populateModels();
		delete this.selectedModel;
		this.filterCars();
	}
	


	private filterCars(){
		var selectedMake = this.selectedMake;
		var selectedModel = this.selectedModel;
		this.vehicleService.getVehicles()
			.subscribe(vehicles => {
				this.vehicles = vehicles;
				this.populatePictures();				
				if (selectedMake) {
					this.vehicles = this.vehicles.filter(function (vehicle) {
						if (selectedModel)
							return vehicle.model.id == selectedModel;
						return vehicle.make.id == selectedMake;
					});
				}
			});
	}

	private populateModels() {
		var selectedMake = this.makes.find(m => m.id == this.selectedMake);
		this.models = selectedMake ? selectedMake.models : [];
	}
}
