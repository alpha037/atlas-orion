import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { SnackService } from 'src/app/services/shared/snack.service';

import { AboutDialogComponent } from '../dialogs/about-dialog.component';
import { CustomerDetails } from '../models/customerDetails.model';
import { CustomerList } from '../models/customerList.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  customers: CustomerList[];
  subscription: Subscription;

  constructor(
    private snackService: SnackService,
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.customerService
      .getCustomerList()
      .subscribe((customers) => (this.customers = customers));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AboutDialogComponent, {
      width: '500px',
      data: {},
      autoFocus: false,
      restoreFocus: true,
    });

    dialogRef.afterClosed().subscribe(async (data: CustomerDetails) => {
      if (!data) return;

      const customerId = await this.customerService.addCustomer(data);
      this.snackService.newCustomerAdded(customerId);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
