import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService extends LoggerService {

  constructor(http : HttpClient) {
      super(http);
   }

  getCryptocurrencyDetails(requestUrl) {
  	return this.http.get<any>(requestUrl);
  }

}
