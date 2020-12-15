import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class NgindatadashboardService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public getNginDataDashboard(){
    let url = this.baseUrl+'/ntqrGUI/ngin/manageDataAvailability/getDataAvailability'
    return this.http.get(url)
  }
 
}
