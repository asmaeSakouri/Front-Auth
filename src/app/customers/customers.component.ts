import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {CustomerModel} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers!:Observable<Array<CustomerModel>>;
  errorMessage:string |undefined;
  searchFormGroup: FormGroup|undefined;
  constructor(private customerService:CustomerService,
              private fb:FormBuilder,
              private router:Router){ }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    // ? car il se peut d'avoir une valeur undefined( au lieu de if)
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return  throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: CustomerModel) {
    let conf=confirm("u sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe(
      {
        next:(value) => {
          this.customers=this.customers.pipe(
            map(data=>{
              let index=data.indexOf(c);
              data.slice(index,1);
              return data;
            })
          );
        },
        error:err => {
          console.log(err);
        }
      }
    )
  }

  handleCustomerAccounts(c: CustomerModel) {
        this.router.navigateByUrl("/admin/customer-accounts/"+c.id,{state:c})
  }
}
