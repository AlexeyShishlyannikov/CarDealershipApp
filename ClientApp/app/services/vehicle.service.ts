import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Vehicle, SaveVehicle } from '../models/vehicle';
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
	public updateVehicle(id: number, vehicle: SaveVehicle){
		return this.http.put(`/api/vehicles/${id}`, vehicle)
			.map(res => res.json());
	}
	public addVehicle(vehicle: SaveVehicle) {
		return this.http.post(`/api/vehicles/`, vehicle)
			.map(res => res.json());
	}
	public deleteVehicle(id: number){
		return this.http.delete(`/api/vehicle/${id}`);
	}
}
