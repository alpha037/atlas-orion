import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CustomerDetail } from 'src/app/customers/models/customerDetail.model';
import { CustomerList } from 'src/app/customers/models/customerList.model';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private db: AngularFirestore, private seoService: SeoService) {}

  getDatabaseRef() {
    return this.db.collection('customers');
  }

  async addCustomer(customer: CustomerDetail): Promise<string> {
    if (!customer.image) customer.image = 'assets/unknown.png';

    const newCustomer = await this.getDatabaseRef().add(customer);
    return newCustomer.id;
  }

  getCustomerList(): Observable<CustomerList[]> {
    return this.getDatabaseRef()
      .valueChanges()
      .pipe(
        map((customers) => {
          let customerList: CustomerList[] = [];

          customers.forEach((customer) =>
            customerList.push({
              name: customer['name'],
              tagline: customer['tagline'],
            })
          );

          return customerList;
        })
      );
  }

  getCustomerDetails(customerId: string): Observable<CustomerDetail> {
    return this.getDatabaseRef()
      .doc<CustomerDetail>(customerId)
      .valueChanges()
      .pipe(
        tap((customer) =>
          this.seoService.generateTags({
            title: customer.name,
            description: customer.bio,
            image: customer.image,
          })
        )
      );
  }
}
