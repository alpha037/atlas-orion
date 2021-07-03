import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { CustomerList } from '../models/customerList.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  customers: CustomerList[];
  subscription: Subscription;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.subscription = this.customerService
      .getCustomerList()
      .subscribe((customers) => (this.customers = customers));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
