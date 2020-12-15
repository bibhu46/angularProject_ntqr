import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod';
import * as moment from "moment";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  baseUrl = environment.baseUrl;
  decoded_token: string = "";

  constructor(private http:HttpClient, private route: Router, private jwtHelperService: JwtHelperService) { }   
  userapi: string =this.baseUrl+"/getUserDetails?username=";
  updateuser: string=this.baseUrl+"/updateUser";
  
  getUser(): Observable<any> {
    return this.http.get(this.userapi+localStorage.getItem('username'))
    .pipe(
      catchError(this.handleError)
    );
  }

  public updateUser(obj){
    return this.http.post<any>(this.updateuser,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  public generateToken(request){
    let url = this.baseUrl + '/authenticate';
    return this.http.post<any>(url,request).
    pipe(
     map(
      userData => {
        localStorage.setItem('username',request.username);
        let tokenStr= userData.response.token;
        localStorage.setItem('token', tokenStr);
        return userData;
       }
     ))
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  check_expiry(){
    if(localStorage.getItem('token')){
      let token = localStorage.getItem("token");

      let actual_token = token.substr(8, token.length);
      this.decoded_token = this.jwtHelperService.decodeToken(actual_token);
      
      let moment_expiry = moment.unix(this.decoded_token['exp']).toISOString();
      let moment_expiry_iat = moment.unix(this.decoded_token['iat']).toISOString();
      let moment_today = moment();

      let expiry_count = moment(moment_expiry).diff(moment_today);      

      if(expiry_count < 0){
        this.logOut();
      }
      
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error.message)

    } else {
      console.log(error.status)
    }
    return throwError(
      console.log('Something is wrong!'));
  };

}
