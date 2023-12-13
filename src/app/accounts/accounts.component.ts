import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  accountFormGroup:FormGroup|undefined;
  currentPage:number=0;
  pageSize:number=5;
  accountObservable!:Observable<AccountDetails>;
  // $ => Observable
  operationFormGroup:FormGroup|undefined;
  errorMessage!:string;
  constructor(private fb:FormBuilder,
              private accountService:AccountsService,
             public authService:AuthService) {
  }
  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      id:this.fb.control(''),
    });
    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    });
  }

  handleSearchAccount() {
    let id:string=this.accountFormGroup?.value.id;
    this.accountObservable=this.accountService.getAccount(id,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message
        return throwError(err);
      })
    );
  }

  goToPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
      let accountId:string=this.accountFormGroup?.value.id;
      let operationType:string=this.operationFormGroup?.value.operationType;
      let amount:number=this.operationFormGroup?.value.amount;
      let description:string=this.operationFormGroup?.value.description;
      if(operationType=='debit'){
          this.accountService.debit(accountId,amount,description).subscribe({
            next:(data)=>{
              alert("debit has successed");
              this.handleSearchAccount()
              this.operationFormGroup?.reset()

            },
            error:err => {
              console.log(err);
            }
          });
      }else if(operationType=='credit'){
        this.accountService.credit(accountId,amount,description).subscribe({
          next:(data)=>{
            alert("credit has successed");
            this.handleSearchAccount()
            this.operationFormGroup?.reset()

          },
          error:err => {
            console.log(err);
          }
        });
      }else if(operationType=='transfer'){
          let accountDes:string=this.operationFormGroup?.value.accountDestination;
          this.accountService.transfer(accountId,accountDes,amount).subscribe({
            next:(data)=>{
              alert("transfer has successed");
              this.handleSearchAccount()
              this.operationFormGroup?.reset()


            },
            error:err => {
              console.log(err);
            }
          });
      }
  }
}
