import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NginInstNumberService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getCSVdataInstalledNumbers(values) {
    const params = new HttpParams()
      .set('date', values)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageNginInstalledNumbers/downloadInstalledNumbersCsv'
    return this.http.get(url, { params })
  }

  public getCSVdataCallAttempts(fromDate, toDate) {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageCallAttempts/downloadCallAttemptsCsv'
    return this.http.get(url, { params })
  }

  public getNginInstNumbers(values) {
    const params = new HttpParams()
      .set('date', values.date);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageNginInstalledNumbers/getNginInstalledNumbers'
    return this.http.get(url, { params })
  }

  public getObjectCapacity(values) {
    const params = new HttpParams()
      .set('date', values.date);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageObjectCapacity/getObjectCapacity'
    return this.http.get(url, { params });
  }

  public getSystemStatitics(values) {
    const params = new HttpParams()
      .set('fromDate', values.fromDate)
      .set('toDate', values.toDate);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageSystemStatistics/getSystemStatistics'
    return this.http.get(url, { params });
  }

  public getMrfStatistics(values) {
    const params = new HttpParams()
      .set('fromDate', values.fromDate)
      .set('toDate', values.toDate);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageMrfStatistics/getMrfStatistics'
    return this.http.get(url, { params });
  }
  public getCallAttempts(values) {
    const params = new HttpParams()
      .set('fromDate', values.fromDate)
      .set('toDate', values.toDate);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageCallAttempts/getCallAttempts'
    return this.http.get(url, { params });
  }

  public getImgPopDetails(countryId, date) {
    const params = new HttpParams()
      .set('type', "country")
      .set('countryId', countryId)
      .set('date', date)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageNginInstalledNumbers/getMonthHistoryInstalledNumbers'
   console.log('----'+date)
    return this.http.get(url, { params });
  }

  public getObjCapHistory(serviceId, desc, name, date) {
    const params = new HttpParams()
      .set('serviceType', serviceId)
      .set('serviceName', desc)
      .set('objectName', name)
      .set('date', date)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageObjectCapacity/getObjectCapacityHistory'
    return this.http.get(url, { params });

  }

  public getCallAtmptImgHistory(value) {
    const params = new HttpParams()
      .set('date', value)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageCallAttempts/getCallAttemptsHistory'
    return this.http.get(url, { params })
  }

  public getSysStatsImgHistory(date, host) {
    const params = new HttpParams()
      .set('date', date)
      .set('hostname', host)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageSystemStatistics/getSystemStatisticsHistory'
    return this.http.get(url, { params })
  }

  public getMrfStatsImgHistory(date, host) {
    const params = new HttpParams()
      .set('date', date)
      .set('hostname', host)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageMrfStatistics/getMrfStatisticsHistory'
    return this.http.get(url, { params })
  }

  public getMrfStatisticsCSV(fromDate, toDate) {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageMrfStatistics/mrfStatisticsCsv'
    return this.http.get(url, { params });
  }
  public getObCapPopUpCSVdownload(serviceType, serviceName, objectName, date) {
    const params = new HttpParams()
      .set('serviceType', serviceType)
      .set('serviceName', serviceName)
      .set('objectName', objectName)
      .set('date', date)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageObjectCapacity/downloadCsvHistory'
    return this.http.get(url, { params })
  }

  public getObjCapCSV(date) {
    const params = new HttpParams()
      .set('date', date)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageObjectCapacity/downloadCsv'
    return this.http.get(url, { params })
  }

  public getcallatmptHistCsv(date) {
    const params = new HttpParams()
      .set('date', date)
    let url = this.baseUrl + '/ntqrGUI/ngin/manageCallAttempts/downloadCsvHistory'
    return this.http.get(url, { params })
  }
  public getSystemStatiticsCSV(fromDate, toDate) {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageSystemStatistics/systemStatisticsCsv'
    return this.http.get(url, { params });
  }

  public getSystemStatiticsCSVHistory(date, hostName) {
    const params = new HttpParams()
      .set('date', date)
      .set('hostname', hostName);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageSystemStatistics/systemStatisticsHistoryCsv'
    return this.http.get(url, { params });
  }

  public getMrfStatisticsCSVhistory(date, hostname) {
    const params = new HttpParams()
      .set('date', date)
      .set('hostname', hostname);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageMrfStatistics/mrfStatisticsHistoryCsv'
    return this.http.get(url, { params });
  }

  public getServiceKeyInstalledNumbers(countryId, date) {
    const params = new HttpParams()
      .set('countryId', countryId)
      .set('date', date);
    let url = this.baseUrl + '/ntqrGUI/ngin/manageNginInstalledNumbers/getServiceKeyInstalledNumbers'
    return this.http.get(url, { params });
  }
}
