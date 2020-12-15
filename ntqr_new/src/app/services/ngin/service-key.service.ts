import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceKeyService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  api: string = this.baseUrl+'/ntqrGUI/ngin/manageServiceKeys/getNginServiceKeys';
  editKeys: string = this.baseUrl+'/ntqrGUI/ngin/manageServiceKeys/getEditNginServiceKeys';
  addNewKeys: string = this.baseUrl+'/ntqrGUI/ngin/manageServiceKeys/getAddServiceKeys';
  viewKeys: string = this.baseUrl+'/ntqrGUI/ngin/manageServiceKeys/viewNginServiceKeys';
  removeCountry : string = this.baseUrl+'/ntqrGUI/ngin/manageServiceKeys/removeCountryGroup';
  removeKeys : string = this.baseUrl+'/ntqrGUI/ngin/manageServiceKeys/getNginServiceKeys';
  addedSubmitKeys: string = this.baseUrl+'/ntqrGUI/ngin/manageServiceKeys/addServiceKeys';

  getAll(): Observable<any> {
    return this.http.get(this.api)
    .pipe(
      catchError(this.handleError)
    );
  }

  addServiceKey(): Observable<any> {
    return this.http.get(this.addNewKeys)
    .pipe(
      catchError(this.handleError)
    );
  }

  editServiceKey(id): Observable<any> {
    return this.http.get(this.editKeys+"?serviceKeyId="+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  viewServiceKey(id): Observable<any> {
    return this.http.get(this.viewKeys+"?serviceKeyId="+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  submitServiceKey(obj): Observable<any> {
    return this.http.post(this.addedSubmitKeys, obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  removeCountryGroup(id): Observable<any> {
    return this.http.get(this.removeCountry+"?serviceKeyId="+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  removeServiceKey(id): Observable<any> {
    return this.http.get(this.removeKeys+"?serviceKeyId="+id)
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
