import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SaveVehicle, Vehicle } from '../../models/vehicle';
import { ActivatedRoute, Router } from '@angular/router/';
import { Observable } from 'rxjs/Observable';
import { PhotoService } from '../../services/photo.service';


@Component({
	selector: 'app-vehicle-form',
	templateUrl: './vehicle-form.component.html',
	styleUrls: ['./vehicle-form.component.css',
		'../vehicle-list/vehicle-list.component.css']
})
export class VehicleFormComponent implements OnInit {
	@ViewChild('fileInput') fileInput: ElementRef;
	vehicle: SaveVehicle = {
		id: 0,
		makeId: 0,
		modelId: 0,
		yearMade: 2017,
		price: 0,
		vinNumber: '',
		transmissionType: '',
		mileage: 0,
		color: '',
		mpg: 0,
		features: ''
	};
	makes : any[] = [];
	photos: any[];
	selectedMake: any = {
		name: 'Make',
		id: 0
	};
	models: any[] = [];
	selectedModel: any = {
		name: 'Model',
		id: 0
	};
	validationErrors: string[] = [];
	constructor(
		private vehicleService: VehicleService,
		private route: ActivatedRoute,
		private router: Router,
		private photoService: PhotoService
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
					this.router.navigate(['/vehicles']);
				}
			});
		this.photoService.getPhotos(this.vehicle.id)
			.subscribe(photos => this.photos = photos);
	}

	public clearMake() {
		delete this.selectedMake;
		delete this.selectedModel;
		delete this.vehicle.makeId;
		delete this.vehicle.modelId;
		this.populateModels();
	}
	public makeChange(makeId: number) {
		this.selectedMake = this.makes.find(m => m.id == makeId);
		this.vehicle.makeId = this.selectedMake.id;
		delete this.selectedModel;
		delete this.vehicle.modelId;
		this.populateModels();
	}

	public clearModel() {
		delete this.selectedModel;
		delete this.vehicle.modelId;
		
	}
	public changeModel(modelId: number) {
		this.selectedModel = this.models.find(m => m.id == modelId);
		this.vehicle.modelId = this.selectedModel.id;		
	}
	public changeTransmission(transmissionType: string){
		this.vehicle.transmissionType = transmissionType;
	}

	public setVehicle(v: Vehicle){
		this.vehicle.makeId = v.make.id;
		this.selectedMake = v.make;	
		this.vehicle.modelId = v.model.id;
		this.selectedModel = v.model;
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
	
	public populateModels() {
		var selectedMake = this.selectedMake ? this.makes.find(m => m.id == this.selectedMake.id) : null;
		this.models = selectedMake ? selectedMake.models : [];
	}
	uploadPhoto() {
		this.validationErrors = this.vehicleService.vehicleValidate(this.vehicle, this.validationErrors);
		if (this.validationErrors.length > 0) {
			return;
		}
		var nativeElement: any = this.fileInput.nativeElement;		
		if(this.vehicle.id){
			this.photoService.uploadPhoto(this.vehicle.id, nativeElement.files[0])
				.subscribe(photo => {
					this.photos.push(photo);
				});		
		} else {
			this.vehicleService.addVehicle(this.vehicle)
				.subscribe(vehicle => {
					this.vehicle.id = vehicle.id;
					this.photoService.uploadPhoto(this.vehicle.id, nativeElement.files[0])
						.subscribe(photo => {
							this.photos.push(photo);
						});
					this.router.navigate([`/vehicles/edit/${vehicle.id}`]);
					
				});
			
		}
		
	}

	deletePicture(vehicleId : number, pictureId : number){
		this.photoService.deletePhoto(vehicleId, pictureId).subscribe();
		this.photos.splice(this.photos.findIndex(p => p.id == pictureId),1);
	}

	submit(){
		this.validationErrors = this.vehicleService.vehicleValidate(this.vehicle, this.validationErrors);
		if(this.validationErrors.length > 0){
			return ;
		}
		if (this.vehicle.id > 0) {
			this.vehicleService.updateVehicle(this.vehicle.id, this.vehicle)
				.subscribe(x =>{
					console.log(this.vehicle, "UPDATED");
					this.router.navigate(['/vehicles']);
				}
					);
		} else {
			this.vehicleService.addVehicle(this.vehicle)
				.subscribe(x => {
					console.log(this.vehicle, "CREATED");
					this.router.navigate(['/vehicles']);
				});
		}
		
	}
	delete(){
		this.vehicleService.deleteVehicle(this.vehicle.id)
			.subscribe(x => this.router.navigate(['/vehicles']));
	}
}
