import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { SnackService } from 'src/app/services/shared/snack.service';
import { CustomerDetails } from '../models/customerDetails.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit, OnDestroy {
  customer: CustomerDetails;
  subscription: Subscription;
  url: string;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private clipboard: Clipboard,
    private snackService: SnackService
  ) {}

  get customerId() {
    return this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.subscription = this.customerService
      .getCustomerDetails(this.customerId)
      .subscribe((customer) => {
        this.customer = customer;
        this.url = `https://orion.shubhranil.com/customers/${this.customerId}`;
      });
  }

  copyContentToClipboard(): void {
    this.clipboard.copy(this.url);
    this.snackService.copiedToClipboard();
  }

  // handleBrowserBackEvent(): void {
  //   window.history.back();
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
