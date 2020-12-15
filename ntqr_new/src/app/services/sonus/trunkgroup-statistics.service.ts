import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class TgStatsService {

  baseUrl = environment.baseUrl; 
   constructor(private http: HttpClient) { }

   api: string = this.baseUrl+'/ntqrGUI/sonus/manageTrunkgroup/getTgDetails';
   searchApi: string = this.baseUrl+'/ntqrGUI/sonus/manageTrunkgroup/searchTrunkGroup';
   tgDetailsApi: string = this.baseUrl+'/ntqrGUI/sonus/manageTrunkgroup/searchTrunkGroupPopup';
   addWatchlistApi: string = this.baseUrl+'/ntqrGUI/sonus/manageTrunkgroup/addToWatchlist';
   getTgEditApi: string = this.baseUrl + '/ntqrGUI/sonus/manageTrunkgroup/getTgEdit';
   updateTgApi: string = this.baseUrl + '/ntqrGUI/sonus/manageTrunkgroup/editTrunkgroup';
   csvApi: string = this.baseUrl+'/ntqrGUI/sonus/manageTrunkgroup/downloadCsv';
   csvPopupApi: string = this.baseUrl+'/ntqrGUI/sonus/manageTrunkgroup/downloadCsvPopup';


  getAll(): Observable<any> {
    return this.http.get(this.api)
    .pipe(
      catchError(this.handleError)
    );
  }

  searchTg(obj): Observable<any> {
    return this.http.post(this.searchApi,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTgDetails(obj) {
    return this.http.post(this.tgDetailsApi,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  addTgToWatchlist(tgId, username) {
    return this.http.get(this.addWatchlistApi + "?tgId="+tgId + "&username=" + username)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTgEdit(tgId){
    return this.http.get(this.getTgEditApi + "?tgId="+tgId)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateTg(obj){
    return this.http.post(this.updateTgApi, obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  downloadCsv(obj): Observable<any> {
    return this.http.post(this.csvApi,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  downloadCsvPopup(obj): Observable<any> {
    return this.http.post(this.csvPopupApi,obj)
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