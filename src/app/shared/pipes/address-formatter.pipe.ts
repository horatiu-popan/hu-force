import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../../employee/employee-addresses/model/address.model';

@Pipe({
  name: 'addressFormatter'
})
export class AddressFormatterPipe implements PipeTransform {

  transform(address: Address): string {
    return `${address.street} ${address.number}, ${address.city}, ${address.county}, ${address.country}`;
  }

}
