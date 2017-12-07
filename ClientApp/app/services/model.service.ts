import { Injectable } from '@angular/core';
import { Model } from '../models/model';
import { Http } from '@angular/http/';

@Injectable()
export class ModelService {
	// originUrl: string = "http://localhost:50181";
	originUrl: string = 'http://autocity1.azurewebsites.net';

	constructor(private http: Http) { }

	// Vehicle Model Methods
	public addVehicleModel(model: Model) {
		return this.http.post(`${this.originUrl }/api/models/`, model)
			.map(res => res.json());
	}
	public deleteVehicleModel(id: number) {
		return this.http.delete(`${this.originUrl }/api/models/${id}`)
			.map(res => res.json());
	}
}
