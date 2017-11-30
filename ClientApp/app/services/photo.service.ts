import { Injectable } from '@angular/core';
import { Http } from '@angular/http/';

@Injectable()
export class PhotoService {

	constructor(private http: Http) { }

	uploadPhoto(vehicleId: number, photo: any){
		var formData = new FormData();
		formData.append('file', photo);
		return this.http.post(`/api/vehicles/${vehicleId}/photos/`, formData).map(res=> res.json());
	}
	getPhotos(vehicleId:number){
		return this.http.get(`/api/vehicles/${vehicleId}/photos/`)
			.map(res => res.json());
	}
	deletePhoto(vehicleId: number, photoId: number){
		return this.http.delete(`/api/vehicles/${vehicleId}/photos/${photoId}`);
	}
}
