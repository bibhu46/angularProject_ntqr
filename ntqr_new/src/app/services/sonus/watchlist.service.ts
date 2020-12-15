import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class WatchlistService {

  baseUrl = environment.baseUrl; 
   constructor(private http: HttpClient) { }

   api: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/getFolderList';
   searchapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/searchTrunkgroups';
   saveapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/saveFolder';
   removeapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/removeFolder';
   editapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/editFolder';
   shareapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/shareFolder';
   csvapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/downloadCsv';
   removetgapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/removeTg';
   notifytgapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/notificationToTg';
   notifyalltgapi: string = this.baseUrl+'/ntqrGUI/sonus/manageWatchlist/notificationToAllTg';
   moveApi: string = this.baseUrl + "/ntqrGUI/sonus/manageWatchlist/moveFolder";
   thresholdApi: string = this.baseUrl + "/ntqrGUI/sonus/manageWatchlist/saveWatchlistThreshold";
   

   getAll(): Observable<any> {
    return this.http.get(this.api+"?username="+localStorage.getItem("username"))
    .pipe(
      catchError(this.handleError)
    );
  }

  saveFolder(folderName): Observable<any> {
    return this.http.get(this.saveapi+"?folderName="+folderName+"&username="+localStorage.getItem("username"))
    .pipe(
      catchError(this.handleError)
    );
  }

  removeFolder(folderName): Observable<any> {
    return this.http.get(this.removeapi+"?folderName="+folderName+"&username="+localStorage.getItem("username"))
    .pipe(
      catchError(this.handleError)
    );
  }

  editFolder(folderName,folderNameBeforeEdit): Observable<any> {
    return this.http.get(this.editapi+"?folderName="+folderName+"&folderNameBeforeEdit="+folderNameBeforeEdit+"&username="+localStorage.getItem("username"))
    .pipe(
      catchError(this.handleError)
    );
  }

  shareFolder(folderName,user): Observable<any> {
    return this.http.get(this.shareapi+"?folderName="+folderName+"&recipientUserName="+user+"&username="+localStorage.getItem("username"))
    .pipe(
      catchError(this.handleError)
    );
  }

  moveFolder(obj): Observable<any> {
    return this.http.post(this.moveApi, obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  removeTg(tgId,folderName): Observable<any> {
    return this.http.get(this.removetgapi+"?tgId="+tgId+"&username="+localStorage.getItem("username")+"&folderName="+folderName)
    .pipe(
      catchError(this.handleError)
    );
  }

  notifyToAllTg(obj): Observable<any> {
    return this.http.post(this.notifyalltgapi, obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  notifyToTg(obj): Observable<any> {
    return this.http.post(this.notifytgapi, obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateThreshold(obj): Observable<any> {
    return this.http.post(this.thresholdApi+"?username="+localStorage.getItem("username"), obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  searchTrunkgroups(searchType,folderName,fromDate,toDate,date): Observable<any> {
    if(fromDate==''){
      return this.http.get(this.searchapi+"?searchType="+searchType+"&folderName="+folderName+"&date="+date)
      .pipe(
        catchError(this.handleError)
      );
    }else{
      return this.http.get(this.searchapi+"?searchType="+searchType+"&folderName="+folderName+"&fromDate="+fromDate+"&toDate="+toDate)
      .pipe(
        catchError(this.handleError)
      );
    }
  }

  downloadCsv(searchType,folderName,fromDate,toDate,date): Observable<any> {
    if(fromDate==''){
      return this.http.get(this.csvapi+"?searchType="+searchType+"&folderName="+folderName+"&date="+date)
      .pipe(
        catchError(this.handleError)
      );
    }else{
      return this.http.get(this.csvapi+"?searchType="+searchType+"&folderName="+folderName+"&fromDate="+fromDate+"&toDate="+toDate)
      .pipe(
        catchError(this.handleError)
      );
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