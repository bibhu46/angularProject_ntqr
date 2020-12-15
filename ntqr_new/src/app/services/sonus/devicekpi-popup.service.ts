import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class DeviceKpiPopupService {

  baseUrl = environment.baseUrl; 
   constructor(private http: HttpClient) { }

   api: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpiPopup/dailyOrMonthlyPopup';
   csvapi: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpiPopup/downloadCsv';

   getMonthHistory(obj): Observable<any> {
    return this.http.post(this.api,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  downloadCsv(obj): Observable<any> {
    return this.http.post(this.csvapi,obj)
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