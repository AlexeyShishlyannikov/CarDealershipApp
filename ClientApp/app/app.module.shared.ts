import { ContactService } from './services/contact.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleService } from './services/vehicle.service';
import { ModelService } from './services/model.service';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        VehicleListComponent,
        VehicleFormComponent,
        VehicleViewComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{ path: 'vehicles/edit/:id', component: VehicleFormComponent },
			{ path: 'vehicles/:id', component: VehicleViewComponent },
			{ path: 'vehicles/new', component: VehicleFormComponent },
			{ path: 'vehicles', component: VehicleListComponent },
            { path: '**', redirectTo: 'home' }
        ])
	],
	providers: [
		VehicleService,
		ModelService,
		ContactService
	]
})
export class AppModuleShared {
}
