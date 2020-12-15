import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class DeviceKpiService {

  baseUrl = environment.baseUrl; 
   constructor(private http: HttpClient) { }

   api: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpi/getDeviceKpiSearch';
   searchApi: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpi/getDeviceBySearch';
   kpiApi: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpi/getKpiDescriptions';
   dtApi: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpi/copyDeviceOrDeviceType';
   csvApi: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpi/downloadDeviceStatsCsv';
   saveKpiApi: string = this.baseUrl+'/ntqrGUI/sonus/manageDeviceKpi/saveDescription';

  getAll(val): Observable<any> {
    return this.http.get(this.api+"?selectedStatisticsGroup="+val)
    .pipe(
      catchError(this.handleError)
    );
  }

  getKpis(): Observable<any> {
    return this.http.get(this.kpiApi)
    .pipe(
      catchError(this.handleError)
    );
  }

  searchDevice(obj): Observable<any> {
    return this.http.post(this.searchApi,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  saveKpi(obj): Observable<any> {
    return this.http.post(this.saveKpiApi,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDevicesByType(obj): Observable<any> {
    return this.http.post(this.dtApi,obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  onClickdwnldcsv(obj): Observable<any> {
    return this.http.post(this.csvApi,obj)
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