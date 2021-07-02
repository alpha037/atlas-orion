import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CustomerService } from '../services/customers/customer.service';
import { SeoService } from '../services/customers/seo.service';

@NgModule({
  declarations: [ListPageComponent, DetailPageComponent],
  imports: [CommonModule, CustomersRoutingModule],
  providers: [CustomerService, SeoService],
})
export class CustomersModule {}
