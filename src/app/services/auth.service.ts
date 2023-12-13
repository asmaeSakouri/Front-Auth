import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean=false;
  roles:any;
  username:any;
  accessToken!:any;

  constructor(private http:HttpClient,private router:Router) { }
  public login(username:string,password:string){
      let options={
        headers:new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
      }
      let params=new HttpParams()
        .set("username",username).set("password",password)
      return this.http.post("http://localhost:8090/authenticate/login",
        params,options)
  }

  loadProfile(value: any) {
    this.isAuthenticated=true;
    this.accessToken=value['access token'];
    console.log(this.accessToken)
    let jwtDecoder:any =jwtDecode(this.accessToken)
    this.username=jwtDecoder.sub;
    this.roles=jwtDecoder.scope;
    window.localStorage.setItem("jwt-token",this.accessToken)
  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.roles=undefined;
    this.username=undefined;
    window.localStorage.removeItem("jwt-token")
    this.router.navigateByUrl("/login")

  }

  loadJwtTokenFromLocalStorage() {
    let token=window.localStorage.getItem("jwt-token");
    if(token){
      this.loadProfile({"access token":token});
      this.router.navigateByUrl("/admin/customers");
    }
  }
}
