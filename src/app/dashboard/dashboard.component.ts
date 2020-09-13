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
  }



  transferData(): void {
    if (Number(this.depositAmount)){
      if (this.totalMoney - this.depositAmount > -500) {
        this.totalMoney -= this.depositAmount;
        const indexDestination = this.recentTransferData.map(val => val.merchant).indexOf(this.selectedValues);
        const newTransaction = this.recentTransferData[indexDestination];
        const d = new Date();
        const n = d.getTime();
        newTransaction.amount = this.depositAmount;
        newTransaction.transactionDate = n;
        this.recentTransferData.push(newTransaction);
      }
    }
  }
}
