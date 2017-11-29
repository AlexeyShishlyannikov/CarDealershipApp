export interface KeyValuePair{
	id: number,
	name: string
}
export interface Vehicle {
	id: number,
	model: any,
	make: any,
	yearMade: number,
	lastUpdate: string,
	price: number,
	vinNumber: string,
	transmissionType: string,
	mileage: number,
	color: string,
	mpg: number,
	features: string
}

export interface SaveVehicle {
	id: number,
	makeId: number,
	modelId: number,
	yearMade: number,
	price: number,
	vinNumber: string,
	transmissionType: string,
	mileage: number,
	color: string,
	mpg: number,
	features: string
}