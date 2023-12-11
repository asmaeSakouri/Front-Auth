import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerModel} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  host="http://localhost:8090";
  constructor(private http:HttpClient) { }
  public getCustomers():Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(this.host+"/customers")
  }
  public searchCustomers(keyword:string):Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(this.host+"/customers/search?keyword="+keyword)
  }
  public saveCustomer(customer:CustomerModel):Observable<CustomerModel>{
    return this.http.post<CustomerModel>(this.host+"/customers",customer)
  }
  public deleteCustomer(id:number){
    return this.http.delete(this.host+"/customers/"+id)
  }

}
