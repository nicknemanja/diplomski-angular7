import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {

  constructor(private http : HttpClient) { }

  getCryptocurrencyDetails(requestUrl) {
  	return this.http.get<any>(requestUrl);
  }

}
