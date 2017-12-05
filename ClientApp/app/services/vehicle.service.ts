import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Vehicle, SaveVehicle } from '../models/vehicle';
import { Model } from '../models/model';
import { forEach } from '@angular/router/src/utils/collection';
import { PhotoService } from './photo.service';

@Injectable()
export class VehicleService {

	constructor(
		private http: Http,
		private photoService: PhotoService
	) { }

	// Makes Method
	public getMakes(){
		return this.http.get("/api/makes/")
		.map(res => res.json());
	}

	// Multiple Vehicle Methods
	public getVehicles(){
		return this.http.get("/api/vehicles/")
			.map(res => res.json());
	}

	public countMakes(vehicles : any[], makes: any[]){
		vehicles.forEach(vehicle => {
			var totalNumber = makes[vehicle.make.id - 1].totalNumber;
			if(totalNumber){
				makes[vehicle.make.id - 1].totalNumber++;
			}
			else
				makes[vehicle.make.id - 1].totalNumber = 1;
		});
	}

	// Single Vehicle Methods
	public getVehicle(id: number){
		return this.http.get(`/api/vehicles/${id}`)
			.map(res => res.json());
	}
	public updateVehicle(id: number, vehicle: SaveVehicle){
		return this.http.put(`/api/vehicles/${id}`, vehicle)
			.map(res => res.json());
	}
	public addVehicle(vehicle: SaveVehicle) {
		return this.http.post(`/api/vehicles/`, vehicle)
			.map(res => res.json());
	}
	public deleteVehicle(id: number){
		this.photoService.getPhotos(id).subscribe(photos => {
			photos.forEach((photo : any) => {
				this.photoService.deletePhoto(id, photo.id)
					.subscribe();
			});
		});
		return this.http.delete(`/api/vehicles/${id}`);
	}
	public formatVehicleDate(vehicles: any[]){
		vehicles.forEach(vehicle => {
			vehicle.lastUpdateParsed = Date.parse(vehicle.lastUpdate);
		});
	}
	public vehicleValidate(vehicle: any, validationErrors: string[]){
		validationErrors = [];
		if(vehicle.makeId == 0){
			validationErrors.push('Make is not provided');
		}
		if(vehicle.modelId == 0){
			validationErrors.push('Model is not provided');
		}
		if(vehicle.transmissionType.length == 0){
			validationErrors.push("Transmission is not provided");
		}
		if(vehicle.mileage == 0){
			validationErrors.push("Mileage is not provided");
		}
		if(vehicle.price == 0){
			validationErrors.push("Price is not provided")
		}
		return validationErrors;
	}
}
