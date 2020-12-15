import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class DashboardService {

  baseUrl = environment.baseUrl; 
   constructor(private http: HttpClient) { }

   api: string = this.baseUrl + '/ntqrGUI/sonus/manageDashboard/getDashboardDetails';
   csvapi: string = this.baseUrl + '/ntqrGUI/sonus/manageDashboard/downloadCsv';


getAll(): Observable<any> {
    return this.http.get(this.api)
    .pipe(
      catchError(this.handleError)
    );
  }

  downloadCsv(): Observable<any> {
    return this.http.get(this.csvapi)
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