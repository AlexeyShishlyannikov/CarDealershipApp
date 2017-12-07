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
import { FooterComponent } from './components/footer/footer.component';
import { PhotoService } from './services/photo.service';
import { MakeFormComponent } from './components/make-form/make-form.component';
import { UserService } from './services/user.service';
import { BaseService } from './services/base.service';
import { RegistrationFormComponent } from './account/components/registration-form/registration-form.component';
import { LoginFormComponent } from './account/components/login-form/login-form.component';
import { AuthGuard } from './auth.guard';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { NoAuthGuard } from './no-auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        VehicleListComponent,
        VehicleFormComponent,
        VehicleViewComponent,
        FooterComponent,
				MakeFormComponent,
				RegistrationFormComponent,
				LoginFormComponent,
				TopHeaderComponent,
				JumbotronComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
				FormsModule,
				
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
						{ path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
						{ path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },	
						{ path: 'vehicles/:id', component: VehicleViewComponent },
						{ path: 'vehicles', component: VehicleListComponent },
						{ path: 'register', component: RegistrationFormComponent, canActivate: [NoAuthGuard]  },
						{ path: 'login', component: LoginFormComponent, canActivate: [NoAuthGuard]  },
						{ path: 'makes', component: MakeFormComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: '' },
        ])
	],
	providers: [
		VehicleService,
		ModelService,
		ContactService,
		PhotoService,
		UserService,
		AuthGuard,
		NoAuthGuard
	]
})
export class AppModuleShared {
}
