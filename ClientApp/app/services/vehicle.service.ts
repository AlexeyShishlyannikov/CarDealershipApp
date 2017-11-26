import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Vehicle } from '../models/vehicle';
import { Model } from '../models/model';

@Injectable()
export class VehicleService {

	constructor(
		private http: Http
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

	// Single Vehicle Methods
	public getVehicle(id: number){
		return this.http.get(`/api/vehicles/${id}`)
			.map(res => res.json());
	}
	public updateVehicle(id: number, vehicle: Vehicle){
		return this.http.put(`/api/vehicles/${id}`, vehicle)
			.map(res => res.json());
	}
	public addVehicle(id: number, vehicle: Vehicle) {
		return this.http.post(`/api/vehicles/${id}`, vehicle)
			.map(res => res.json());
	}
	public deleteVehicle(id: number){
		return this.http.delete(`/api/vehicle/${id}`);
	}

	// Vehicle Model Methods
	public addVehicleModel(model: Model){
		return this.http.post(`/api/models/`, model)
			.map(res => res.json());
	}
	public deleteVehicleModel(id: number) {
		return this.http.delete(`/api/models/${id}`)
			.map(res => res.json());
	}
}
