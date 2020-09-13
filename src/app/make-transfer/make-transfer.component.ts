import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as transactions from '../../assets/transactions.json';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit {
  recentTransferData: { amount: string; categoryCode: string; merchant: string; merchantLogo: string; transactionDate: number; transactionType: string; }[];
  transferForm = new FormGroup({
    toAccount: new FormControl(''),
    amount: new FormControl(0.00)
  });
  dropListCatalog: string[];
  selectedValues = '';
  totalMoney = 5824.76;
  depositAmount: '';
  messageModal = '';
  errorMsg = true;

  constructor() { }

  ngOnInit(): void {
    this.recentTransferData = transactions.data;
    this.dropListCatalog = [...new Set(transactions.data.map(value => value.merchant))];
    console.log('recent Transfer Data :O', this.recentTransferData);
    console.log('type of rtd', typeof this.recentTransferData);
    console.log('droplist catalog', this.dropListCatalog);
    console.log('selected values', this.selectedValues);
  }

  transferData(): void {
    this.errorMsg = false;
    console.log('hello world!');
    console.log('selectedvalues', this.selectedValues);
    // const reg = new RegExp(/^-?\d+\.?\d*$/);
    // console.log('tiene letras?', reg.test(this.depositAmount));
    console.log('deposit amount', this.depositAmount);
    if (Number(this.depositAmount) && this.selectedValues.length > 1){
      if (this.totalMoney - Number(this.depositAmount) > -500) {
        this.messageModal = `Are you sure you want to deposit ${this.depositAmount} to ${this.selectedValues}`;
        $('#exampleModalCenter').modal('toggle');
      } else {
        this.errorMsg = true;
        console.log('excede la cantidad');
        this.messageModal = 'Your balance can`t go below -$500.00';
        $('#exampleModalCenter').modal('toggle');
        // document.getElementById('exampleModalCenter').style.display = "block";
      }
    } else {
      this.errorMsg = true;
      this.messageModal = 'Please fill all the fields (To account and Amount)';
      $('#exampleModalCenter').modal('toggle');
    }
  }

  makeTransfer() {
    this.totalMoney -= Number(this.depositAmount);
    console.log('nuevo monto', this.totalMoney);
    const indexDestination = this.recentTransferData.map(val => val.merchant).indexOf(this.selectedValues);
    console.log('index of destination', indexDestination);
    const data = this.recentTransferData[indexDestination];
    const d = new Date();
    const n = d.getTime();
    const newTransaction = {
      ...data,
      amount: this.depositAmount,
      transactionDate: n,
    };
    console.log('new transaction values antes :O', newTransaction);
    console.log('new transaction values despues :O', newTransaction);
    this.recentTransferData.push(newTransaction);
    $('#exampleModalCenter').modal('hide');
  }

}
