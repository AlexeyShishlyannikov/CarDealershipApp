import { Injectable } from '@angular/core';
import { Http } from '@angular/http/';

@Injectable()
export class PhotoService {
	// originUrl: string = "http://localhost:50181";
	originUrl: string = 'http://autocity1.azurewebsites.net';

	constructor(private http: Http) { }

	uploadPhoto(vehicleId: number, photo: any){
		var formData = new FormData();
		formData.append('file', photo);
		return this.http.post(`${this.originUrl }/api/vehicles/${vehicleId}/photos/`, formData).map(res=> res.json());
	}
	getPhotos(vehicleId:number){
		return this.http.get(`${this.originUrl }/api/vehicles/${vehicleId}/photos/`)
			.map(res => res.json());
	}
	deletePhoto(vehicleId: number, photoId: number){
		return this.http.delete(`${this.originUrl }/api/vehicles/${vehicleId}/photos/${photoId}`);
	}
}
