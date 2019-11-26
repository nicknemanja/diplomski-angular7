import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../services/cryptocurrency.service';
import { LoggerService } from '../services/logger.service';
import { BaseComponent } from '../base/base.component';

import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent extends BaseComponent implements OnInit {

  CONVERT_CRYPTOCURRENCIES_API = "https://min-api.cryptocompare.com/data/pricemulti";
  API_KEY = "34d57fe96dc0d6ac74a21983e960ead7a35189dedc28c92abf33544d6f809169";
  
  FROM_VALUTES = ["BTC", "XRP", "ETH", "LTC"];
  TO_VALUTES = ["USD", "EUR", "BTC",  "XRP", "ETH", "LTC"];

  valutesFrom = [];
  valutesTo = [];
  result = {};

  hideData = true;

  lastUserAction;
  userActionResponse = {};

  errorMessage: string = "";

  status = 'DEFAULT';
  isConnected = true;

  constructor(
    private cryptocurrencyService: CryptocurrencyService,
    loggerService: LoggerService,
    private connectionService: ConnectionService) 
  {
    super(loggerService);
    this.connectionService.monitor().subscribe(isConnected => {
      console.log("Online status:" + isConnected);
    });
  
  }

  ngOnInit() { }

  convertCriptocurrencies() {
  	let from = this.getSelectedOptions("selectBoxFrom");
    let to = this.getSelectedOptions("selectBoxTo");
    
    if(from.toString().trim().length == 0 || to.toString().trim().length == 0) {
      this.setErrorMessage("Both values must be selected.");
      return;
    }

    this.clearErrorMessage();
    
    let apiRequest = this.getApiConvertValutesRequest(from, to);
    
    //for logging
    this.lastUserAction = apiRequest;

  	this.cryptocurrencyService.getCryptocurrencyDetails(apiRequest).subscribe(data => this.handleResponse(data));
  }

  getSelectedOptions(selectBoxId) {
  	var selectBox = <any>document.getElementById(""+selectBoxId);
    var selectedOptions = [];
    for (var i = 0; i < selectBox.options.length; i++) {
        if (selectBox.options[i].selected) selectedOptions.push(selectBox.options[i].value);
    }
    return selectedOptions;
  }

  handleResponse(data) {

    this.logUserAction(this.getUsername(), this.lastUserAction, JSON.stringify(data));

    this.valutesFrom = Object.keys(data);

    var index = 0;
    for(let i=0; i < this.valutesFrom.length; i++ ) {
      this.result[this.valutesFrom[i]] = Object.values(data[this.valutesFrom[i]]);
    }

    var firstValute = this.valutesFrom[0];
    this.valutesTo = Object.keys(data[firstValute]);

    this.hideData = false;
  }

  getApiConvertValutesRequest(from, to) {
  	let paramFromValutes = "fsyms=" + from.join();
  	let paramToValutes = "tsyms=" + to.join();
  	let paramApiKey = "api_key=" + this.API_KEY;

  	return this.CONVERT_CRYPTOCURRENCIES_API + "?" + paramFromValutes + "&" + paramToValutes + "&" + paramApiKey;
  }

  handleLoggingingResponse(loggingResponse) {
    // nothing to do
  }

  getUsername() {
    return (localStorage.getItem("username") != null) ? localStorage.getItem("username") : "";
  }

  setErrorMessage(message: string) : void {
    this.errorMessage = message;
  }

  clearErrorMessage() : void {
    this.errorMessage = "";
  }

}
