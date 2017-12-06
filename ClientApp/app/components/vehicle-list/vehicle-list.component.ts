import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { PhotoService } from '../../services/photo.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
	selector: 'app-vehicle-list',
	templateUrl: './vehicle-list.component.html',
	styleUrls: ['./vehicle-list.component.css',
							'../../styles/styles.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {
	vehicles : any[];
	sortingParam: any = {
		param:'',
		name: 'Order by',
		asc: ''
	};
	sortAsc: string;
	makes: any[] = [];
	selectedMake: any = {
		name:'Make',
		id:0
	};	
	models: any[] =[];
	selectedModel: any = {
		name: 'Model',
		id: 0
	};
	photos: any[];
	status: boolean;
	subscriptionVehicles: Subscription;
	subscriptionMakes: Subscription;
	constructor(
		private vehicleService: VehicleService,
		private photoService: PhotoService,
		private userService : UserService
	) {
	 }

	ngOnInit() {
		this.populateVehicles();
		this.userService.authNavStatus$.subscribe(status => this.status = status);
	}
	ngOnDestroy(){
		this.subscriptionVehicles.unsubscribe();
		this.subscriptionMakes.unsubscribe();
	}

	public populateVehicles() {
		this.subscriptionVehicles = this.vehicleService.getVehicles()
			.subscribe(vehicles => { 
				this.vehicles = vehicles;
				this.populatePictures();
				this.populateMakes();
			});
	}
	public populateMakes(){
		this.subscriptionMakes = this.vehicleService.getMakes()
			.subscribe(makes => {
				this.vehicleService.countMakes(this.vehicles, makes);
				makes.forEach((m: any) => {
					if (m.totalNumber > 0) {
						this.makes.push(m);
					}
				});
			});
	}
	public populatePictures(){
		this.vehicles.forEach(vehicle => {
			this.photoService.getPhotos(vehicle.id).subscribe(photos => vehicle.photos = photos);
		});
	}

	public changeSortParam(name:string, param : string, asc: string){
		this.sortingParam.param = param;
		this.sortingParam.name = name;
		this.sortingParam.asc = asc;
		this.onSortByChange();
	}

	public onSortByChange(){
		var sortBy = this.sortingParam.param;
		var sortAsc = this.sortingParam.asc;
		this.vehicleService.formatVehicleDate(this.vehicles);		
		this.vehicles.sort(function (a, b){
			if(sortAsc)
				return sortAsc == 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
			else
				return a[sortBy] - b[sortBy];
		});
	}

	public clearMake(){
			delete this.selectedMake;
			delete this.selectedModel; 
		this.populateModels();
			
			this.filterCars();		
	}
	public makeChange(makeId: number){
		this.selectedMake = this.makes.find(m => m.id == makeId);
		delete this.selectedModel;		
		this.populateModels();
		this.filterCars();
	}
	
	public clearModel(){
		delete this.selectedModel;
				
		this.filterCars();
		
	}
	public changeModel(modelId : number){
		this.selectedModel = this.models.find(m => m.id == modelId);
		this.filterCars();
	}
	

	public filterCars(){
		var selectedMake = this.selectedMake;
		var selectedModel = this.selectedModel;
		this.vehicleService.getVehicles()
			.subscribe(vehicles => {
				this.vehicles = vehicles;
				this.populatePictures();				
				if (selectedMake) {
					this.vehicles = this.vehicles.filter(function (vehicle) {
						if (selectedModel)
							return vehicle.model.id == selectedModel.id;
						return vehicle.make.id == selectedMake.id;
					});
				}
			});
	}

	public populateModels() {
		var selectedMake = this.selectedMake ? this.makes.find(m => m.id == this.selectedMake.id) : null;
		this.models = selectedMake ? selectedMake.models : [];
	}
}
