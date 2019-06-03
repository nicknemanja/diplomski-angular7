import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { RegistrationService } from './services/registration.service';
import { LoginService } from './services/login.service';
import { CryptocurrenciesComponent } from './cryptocurrencies/cryptocurrencies.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CryptocurrenciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RegistrationService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
