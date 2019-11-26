import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService extends LoggerService {

  title = 'connectionDetector';
  status = 'ONLINE'; //initializing as online by default
  isConnected = true;

  constructor(http : HttpClient) {
      super(http);
   }

  getCryptocurrencyDetails(requestUrl: string) {
    return this.http.get<any>(requestUrl);
  }
};
