import { Component, OnInit } from '@angular/core';
import * as transactions from '../../assets/transactions.json';
// import {map, startWith} from 'rxjs/operators';
// import {combineLatest, Observable, of} from 'rxjs';
// import {FormControl} from '@angular/forms';
// import {Transaction, recentTransactions} from '../services/transactions';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {

  recentTransferData: { amount: string; categoryCode: string; merchant: string; merchantLogo: string; transactionDate: number; transactionType: string; }[];
  backData: { amount: string; categoryCode: string; merchant: string; merchantLogo: string; transactionDate: number; transactionType: string; }[];
  value: string;
  activeAmount = false;
  activeBeneficiary = false;
  activeDate = false;
  searchField = '';
  noBeneficiary = false;
  noAmount = false;
  // transactions$: Observable<Transaction[]>;
  // filteredTransactions$: Observable<Transaction[]>;
  // filter: FormControl;
  // filter$: Observable<string>;
  constructor() {
    // this.transactions$ = of(recentTransactions);
    // this.filter = new FormControl('');
    // this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    // this.filteredTransactions$ = combineLatest(this.transactions$, this.filter$).pipe(
    //   map(([recentTransactions, filterString]) => recentTransactions.filter(recTran => recTran.merchant.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    // );
   }

  ngOnInit(): void {
    this.recentTransferData = transactions.data;
  }

  ascendingDate() {
    this.recentTransferData.sort((a, b) => (a.transactionDate - b.transactionDate));
    if (this.noAmount) {
      this.noAmount = false;
      this.activeAmount = !this.activeAmount;
    }
    if (this.noBeneficiary) {
      this.noBeneficiary = false;
      this.activeBeneficiary = !this.activeBeneficiary;
    }
  }

  descendingDate() {
    console.log('para abajoooo!!');
    if (this.noAmount) {
      this.noAmount = false;
      this.activeAmount = !this.activeAmount;
    }
    if (this.noBeneficiary) {
      this.noBeneficiary = false;
      this.activeBeneficiary = !this.activeBeneficiary;
    }
    this.recentTransferData.sort((a, b) => (b.transactionDate - a.transactionDate));
  }

  sortBeneficiary() {
    console.log('taraaaa');
    if (this.noAmount) {
      this.noAmount = false;
      this.activeAmount = !this.activeAmount;
    }
    if (this.activeBeneficiary) {
      console.log('que sucede?');
      this.recentTransferData.sort((a, b) => (b.merchant > a.merchant) ? 1 : ((a.merchant > b.merchant) ? -1 : 0));
      this.activeBeneficiary = false;
    } else {
      console.log('que sucede? 2!');
      this.recentTransferData.sort((a, b) => (a.merchant > b.merchant) ? 1 : ((b.merchant > a.merchant) ? -1 : 0));
      this.activeBeneficiary = true;
    }
    this.noBeneficiary = true;
  }

  sortAmount() {
    console.log('shuper shuper');
    if (this.noBeneficiary) {
      this.noBeneficiary = false;
      this.activeBeneficiary = !this.activeBeneficiary;
    }
    if (this.activeAmount) {
      this.recentTransferData.sort((a, b) => (Number(b.amount) - Number(a.amount)));
      this.activeAmount = false;
    } else {
      this.recentTransferData.sort((a, b) => (Number(a.amount) - Number(b.amount)));
      this.activeAmount = true;
    }
    this.noAmount = true;
  }

  clearSearchField() {
    this.searchField = "";
    this.recentTransferData = this.backData;
  }

  search(e) {
    this.backData = this.recentTransferData;
    console.log('presionaron enter', e);
    console.log('filtered data', this.recentTransferData.filter(data => data['merchant'].includes(e)));
    this.recentTransferData = this.recentTransferData.filter(data => data['merchant'].includes(e));
    console.log('back up es', this.backData);
  }

}
