import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerService } from '../services/customers/customer.service';
import { SeoService } from '../services/customers/seo.service';
import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ListPageComponent } from './list-page/list-page.component';

@NgModule({
  declarations: [ListPageComponent, DetailPageComponent],
  imports: [CommonModule, CustomersRoutingModule, SharedModule],
  providers: [CustomerService, SeoService],
})
export class CustomersModule {}
