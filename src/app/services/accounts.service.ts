import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  host:string="http://localhost:8090";

  constructor(private http:HttpClient) { }
  public getAccount(id:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.host+
      "/accounts/"+id+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(id:string,amount:number,description:string){
    return this.http.post(this.host+"/accounts/debit",{
      accountId:id,
      amount:amount,
      description:description
    });
  }

  public credit(id:string,amount:number,description:string){
    return this.http.post(this.host+"/accounts/credit",{
      accountId:id,
      amount:amount,
      description:description
    });
  }

  public transfer(sourceId:string,destinationId:string,amount:number){
    return this.http.post(this.host+"/accounts/transfer",{
      accountSource:sourceId,
      accountDestination:destinationId,
      amount:amount
    });
  }
}
