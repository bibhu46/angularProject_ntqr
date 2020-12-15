import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  api: string = this.baseUrl+'/ntqrGUI/manageThreshold/getThresholdDetails';
  nginThreshold: string = this.baseUrl+'/ntqrGUI/manageNewNginThreshold/getNewNginThresholdDetails';
  updateSonus: string = this.baseUrl+'/ntqrGUI/manageThreshold/updateThreshold';
  updateNgin: string = this.baseUrl+'/ntqrGUI/manageNewNginThreshold/updateNewNginThreshold';
  cardInfoDetails: string = this.baseUrl+'/ntqrGUI/manageCardInfo/getCardInfoDetails';
  cardInfoEdit: string = this.baseUrl+'/ntqrGUI/manageCardInfo/getCardInfo';
  updateCardInfoApi: string = this.baseUrl+'/ntqrGUI/manageCardInfo/updateCardInfo';

  getAllThreshold(): Observable<any> {
    return this.http.get(this.api)
    .pipe(
      catchError(this.handleError)
    );
  }
  getnginThreshold(): Observable<any> {
    return this.http.get(this.nginThreshold)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateSonusThreshold(obj): Observable<any> {
    return this.http.post(this.updateSonus,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateNGINThreshold(obj): Observable<any> {
    return this.http.post(this.updateNgin,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCardInfoDetails(): Observable<any> {
    return this.http.get(this.cardInfoDetails)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCardInfoEdit(deviceId,shelf,slot): Observable<any> {
    return this.http.get(this.cardInfoEdit+"?deviceId="+deviceId+"&shelf="+shelf+"&slot="+slot)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCardInfo(obj): Observable<any> {
    return this.http.post(this.updateCardInfoApi,obj)
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
