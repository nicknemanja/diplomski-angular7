import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

  CONVERT_CRYPTOCURRENCIES_API = "https://min-api.cryptocompare.com/data/pricemulti";
  API_KEY = "34d57fe96dc0d6ac74a21983e960ead7a35189dedc28c92abf33544d6f809169";
  
  FROM_VALUTES = ["BTC", "XRP", "ETH", "LTC"];
  TO_VALUTES = ["USD", "EUR", "BTC",  "XRP", "ETH", "LTC"];

  constructor() { }

  ngOnInit() {
  }

  convertCriptocurrencies() {
  	let from = this.getSelectedOptions("selectBoxFrom");
  	let to = this.getSelectedOptions("selectBoxTo");
  	let apiRequest = this.getApiConvertValutesRequest(from, to);
	
  	
	
  }

  getSelectedOptions(selectBoxId) {
  	let selectBox = document.getElementById(selectBoxId);
    let selectedOptions = [];
    for (let i = 0; i < selectBox.length; i++) {
        if (selectBox.options[i].selected) selectedOptions.push(selectBox.options[i].value);
    }

    return selectedOptions;
  }

  getApiConvertValutesRequest(from, to) {
  	let paramFromValutes = "fsyms=" + from.join();
  	let paramToValutes = "tsyms=" + to.join();
  	let paramApiKey = "api_key=" + this.API_KEY;

  	return this.CONVERT_CRYPTOCURRENCIES_API + "?" + paramFromValutes + "&" + paramToValutes + paramApiKey;
  }

}
