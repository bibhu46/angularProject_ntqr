import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SonusdataavailService {

  baseUrl = environment.baseUrl;
   constructor(private http: HttpClient) { }

  public getSonusDataAvail(){
    let url = this.baseUrl + '/ntqrGUI/sonus/manageSonusDataAvailability/getDataAvailability';
    return this.http.get(url);
  }
  public editDeviceDesc(device_name, device_descr){
    let url = this.baseUrl + '/ntqrGUI/sonus/manageSonusDataAvailability/updateDevice';
    return this.http.get(url+"?deviceName="+ device_name + "&description="+ device_descr);
  }
}
