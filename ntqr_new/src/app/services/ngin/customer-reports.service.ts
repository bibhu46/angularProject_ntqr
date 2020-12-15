import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerReportsService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  api: string = this.baseUrl+'/ntqrGUI/ngin/manageCustomerReports/getCustomerReports';
  customerListApi: string = this.baseUrl+'/ntqrGUI/ngin/manageCustomerReports/customerList';
  searchApi: string = this.baseUrl+'/ntqrGUI/ngin/manageCustomerReports/searchCustomerReports';
  addCustomer: string = this.baseUrl+'/ntqrGUI/ngin/manageCustomerReports/addCustomer';
  editCustomer: string = this.baseUrl+'/ntqrGUI/ngin/manageCustomerReports/editCustomer';
  deleteCustomer: string = this.baseUrl+'/ntqrGUI/ngin/manageCustomerReports/deleteCustomer';

  getAll(): Observable<any> {
    return this.http.get(this.api)
    .pipe(
      catchError(this.handleError)
    );
  }

  getRecord(obj): Observable<any> {
    return this.http.post(this.searchApi,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCustomerList(): Observable<any> {
    return this.http.get(this.customerListApi)
    .pipe(
      catchError(this.handleError)
    );
  }

  addCustomerInList(obj): Observable<any> {
    return this.http.post(this.addCustomer,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  editCustomerInList(obj): Observable<any> {
    return this.http.post(this.editCustomer,obj)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  deleteCustomerInList(name): Observable<any> {
    return this.http.get(this.deleteCustomer+"?name="+name)
    .pipe(
      catchError(this.handleError)
    );
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
