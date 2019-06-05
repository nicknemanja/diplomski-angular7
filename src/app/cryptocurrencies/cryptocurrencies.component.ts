import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

  cryptocurrenciesApi = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=34d57fe96dc0d6ac74a21983e960ead7a35189dedc28c92abf33544d6f809169";

  apiKey = "34d57fe96dc0d6ac74a21983e960ead7a35189dedc28c92abf33544d6f809169";

  fromValutes = ["BTC", "XRP", "ETH", "LTC"];
  toValutes = ["USD", "EUR", "BTC",  "XRP", "ETH", "LTC"];

  constructor() { }

  ngOnInit() {
  }

  convertCriptocurrencies(){
  	//alert("Submiting...");
  	//console.log(JSON.stringify(document.querySelectorAll('#selectBoxTo option:checked');));
  }

}
