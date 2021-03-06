import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CryptocurrenciesComponent } from './cryptocurrencies/cryptocurrencies.component';

import { AuthguardService } from './services/authguard.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'login', component: LoginComponent},
	{path: 'registration', component: RegistrationComponent},
	{path: 'cryptocurrencies', component: CryptocurrenciesComponent, canActivate: [AuthguardService] },
	{path: 'user', component: UserComponent, canActivate: [AuthguardService]},
	// { path: '**', component: PageNotFoundComponent } TODO create PageNotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
