import { Injectable } from '@angular/core';
import { Model } from '../models/model';
import { Http } from '@angular/http/src/http';

@Injectable()
export class ModelService {

	constructor(private http: Http) { }

	// Vehicle Model Methods
	public addVehicleModel(model: Model) {
		return this.http.post(`/api/models/`, model)
			.map(res => res.json());
	}
	public deleteVehicleModel(id: number) {
		return this.http.delete(`/api/models/${id}`)
			.map(res => res.json());
	}
}
