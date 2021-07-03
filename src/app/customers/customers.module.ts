import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../services/customers/customer.service';
import { SeoService } from '../services/customers/seo.service';
import { SnackService } from '../services/shared/snack.service';
import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { AboutDialogComponent } from './dialogs/about-dialog.component';
import { ListPageComponent } from './list-page/list-page.component';

@NgModule({
  declarations: [ListPageComponent, DetailPageComponent, AboutDialogComponent],
  imports: [CommonModule, CustomersRoutingModule, SharedModule, FormsModule],
  providers: [CustomerService, SeoService, SnackService],
})
export class CustomersModule {}
