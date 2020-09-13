import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as transactions from '../../assets/transactions.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recentTransferData: { amount: string; categoryCode: string; merchant: string; merchantLogo: string; transactionDate: number; transactionType: string; }[];
  transferForm = new FormGroup({
    toAccount: new FormControl(''),
    amount: new FormControl(0.00)
  });
  dropListCatalog: string[];
  selectedValues = "";
  totalMoney = 5824.76;
  depositAmount: any;
  
  constructor() { }

  ngOnInit(): void {
    this.recentTransferData = transactions.data;
    this.dropListCatalog = [...new Set(transactions.data.map(value => value.merchant))];
    console.log('recent Transfer Data :O', this.recentTransferData);
    console.log('type of rtd', typeof this.recentTransferData);
    console.log('droplist catalog', this.dropListCatalog);
    console.log('selected values', this.selectedValues);
    // console.log('uniq droplist', [...new Set(this.dropListCatalog)]);
  }



  transferData(): void {
    console.log('hello world!');
    console.log('selectedvalues', this.selectedValues);
    // const reg = new RegExp(/^-?\d+\.?\d*$/);
    // console.log('tiene letras?', reg.test(this.depositAmount));
    console.log('deposit amount', this.depositAmount, Number(this.depositAmount));
    if (Number(this.depositAmount)){
      if (this.totalMoney - this.depositAmount > -500) {
        this.totalMoney -= this.depositAmount;
        console.log('nuevo monto', this.totalMoney);
        const indexDestination = this.recentTransferData.map(val => val.merchant).indexOf(this.selectedValues);
        console.log('index of destination', indexDestination);
        const newTransaction = this.recentTransferData[indexDestination];
        console.log('new transaction values antes :O', newTransaction);
        const d = new Date();
        const n = d.getTime();
        newTransaction.amount = this.depositAmount;
        newTransaction.transactionDate = n;
        console.log('new transaction values despues :O', newTransaction);
        this.recentTransferData.push(newTransaction);
      }
    }
  }

  // tslint:disable-next-line:typedef
  amountChange(e) {
    console.log('y aqui que?', e);
  }

}
